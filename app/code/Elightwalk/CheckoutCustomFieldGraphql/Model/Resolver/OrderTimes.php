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

/**
 * @inheritdoc
 */
class OrderTimes implements ResolverInterface
{
    const ORDER_TIME = 'order_time';

    const XML_CUSTOM_FIELD_ORDER_PROCESSING_HOURS = 'custom_field/general/order_processing_hours';

    /**
     * @param ProductDataProvider $productDataProvider
     * @param ValueFactory $valueFactory
     * @param ProductFieldsSelector $productFieldsSelector
     */
    public function __construct(
        \Bss\CheckoutCustomField\Model\ResourceModel\Attribute\Collection $attributeCollection,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Bss\CheckoutCustomField\Block\Express\Review $reviewBlock,
        \Magento\Framework\Stdlib\DateTime\TimezoneInterface $date
    ) {
        $this->attributeCollection = $attributeCollection;
        $this->scopeConfig = $scopeConfig;
        $this->reviewBlock = $reviewBlock;
        $this->date = $date;
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

        if(date('Y-m-d', strtotime($date)) < date('Y-m-d')) {
            throw new GraphQlInputException(__("You shouldn't select past date."));
        }

        $storeId = (int) $context->getExtensionAttributes()->getStore()->getId();

        $response = [];

        $attribute = $this->attributeCollection
            ->addFieldToFilter(AttributeInterface::BSS_ATTRIBUTE_CODE, self::ORDER_TIME)
            ->addFieldToFilter(AttributeInterface::BSS_VISIBLE_FRONTEND, 1);

        if (count($attribute)) {
            $attribute = $attribute->getFirstItem();
            if($this->checkAttributeInStore($attribute->getStoreId(), $storeId)) {

                $options=$this->reviewBlock->getOptions($attribute);
                $fieldValue = $this->reviewBlock->getDefaultValue($attribute);

                if(count($options) && count($fieldValue)) {
                    foreach($options as $key => $value){
                        $options[$key]['is_default'] = false;
                        if($value['value'] == $fieldValue[0]) {
                            $options[$key]['is_default'] = true;
                        }
                    }
                }else if(count($options)){
                    foreach($options as $key => $value){
                        $options[$key]['is_default'] = false;
                    }
                }

                if(date('Y-m-d', strtotime($date)) != date('Y-m-d')) {
                    return $options;
                }

                $response = $this->getAvailabelOptions($options, $storeId);
            }
            
        }

        return $response;
    }

    private function getAvailabelOptions($options, $storeId)
    {
        $response = [];
        $currentHours = $this->date->date()->format('H');;
        $orderProcessingHours = $this->scopeConfig->getValue(
            self::XML_CUSTOM_FIELD_ORDER_PROCESSING_HOURS, 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE, 
            $storeId
        );

        $hours = (int) $currentHours + $orderProcessingHours;

        if (count($options)) {
            foreach ($options as $option) {
                if ((int) $option['label'] >= $hours) {
                    $response[] = $option;
                }
            }
        }
        
        return $response;
    }

    private function checkAttributeInStore($attributeStoreIds, $storeId) {
        $storeIds= explode(',', $attributeStoreIds);
        if(in_array($storeId, $storeIds)){
            return true;
        }
        return false;
    }   
}
