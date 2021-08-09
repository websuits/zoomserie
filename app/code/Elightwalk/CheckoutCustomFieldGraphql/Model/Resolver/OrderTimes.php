<?php

/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Elightwalk\CheckoutCustomFieldGraphql\Model\Resolver;

use Magento\CatalogGraphQl\Model\Resolver\Product\ProductFieldsSelector;
use Magento\CatalogGraphQl\Model\Resolver\Products\DataProvider\Deferred\Product as ProductDataProvider;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\Resolver\ValueFactory;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Bss\CheckoutCustomField\Api\Data\AttributeInterface;
use Bss\CheckoutCustomField\Api\Data\AttributeOptionInterface;

/**
 * @inheritdoc
 */
class OrderTimes implements ResolverInterface
{
    const ORDER_TIME = 'order_time';

    const XML_CUSTOM_FIELD_ORDER_PROCESSING_HOURS = 'custom_field\general\order_processing_hours';

    /**
     * @param ProductDataProvider $productDataProvider
     * @param ValueFactory $valueFactory
     * @param ProductFieldsSelector $productFieldsSelector
     */
    public function __construct(
        \Bss\CheckoutCustomField\Model\ResourceModel\Attribute\Collection $attributeCollection,
        \Bss\CheckoutCustomField\Model\ResourceModel\AttributeOption\Collection $attributeOptionsCollection,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        $this->attributeCollection = $attributeCollection;
        $this->attributeOptionsCollection = $attributeOptionsCollection;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * @inheritdoc
     */
    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        if (!isset($args['date'])) {
            throw new GraphQlInputException(__('Date is required params.'));
        }

        $date = $args['date'];

        file_put_contents(BP . '/var/log/fulllog.log', print_r($date,true)."\n", FILE_APPEND);

        if(date('Y-m-d', strtotime($date)) < date('Y-m-d')) {
            throw new GraphQlInputException(__("You shouldn't select past date."));
        }

        $storeId = (int) $context->getExtensionAttributes()->getStore()->getId();
        $storeId=1;
        file_put_contents(BP . '/var/log/fulllog.log', print_r('storeId => '.$storeId,true)."\n", FILE_APPEND);

        $response = [];

        $attribute = $this->attributeCollection
            ->addFieldToFilter(AttributeInterface::BSS_ATTRIBUTE_CODE, self::ORDER_TIME)
            ->addFieldToFilter(AttributeInterface::BSS_STORE_ID, ['in' => [$storeId]])
            ->addFieldToFilter(AttributeInterface::BSS_VISIBLE_FRONTEND, 1);

        if (count($attribute)) {
            $attribute = $attribute->getFirstItem();
            $options = $this->attributeOptionsCollection
                ->addFieldToFilter(AttributeOptionInterface::BSS_ATTRIBUTE_ID, $attribute->getAttributeId())
                ->addFieldToFilter(AttributeOptionInterface::BSS_STORE_ID, $storeId);

            if(date('Y-m-d', strtotime($date)) != date('Y-m-d')) {
                return $options;
            }

            $response = $this->getAvailabelOptions($options, $storeId);
        }

        file_put_contents(BP . '/var/log/fulllog.log', print_r(count($response),true)."\n", FILE_APPEND);

        return $response;
    }

    private function getAvailabelOptions($options, $storeId)
    {

        $response = [];
        $currentHours = date('H');
        $orderProcessingHours = $this->scopeConfig->getValue(
            self::XML_CUSTOM_FIELD_ORDER_PROCESSING_HOURS, 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE, 
            $storeId
        );

        $hours = (int) $currentHours + $orderProcessingHours;

        if (count($options)) {
            foreach ($options as $option) {
                if ((int) $option->getValue() >= $hours) {
                    $response[] = $option;
                }
            }
        }
        return $response;
    }
}
