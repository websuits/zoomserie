<?php

/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Elightwalk\CheckoutCustomFieldGraphql\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

class UpdateCustomCheckoutFields implements ResolverInterface
{
    public function __construct(
        \Magento\CustomerGraphQl\Model\Customer\GetCustomer $getCustomer,
        \Magento\Quote\Model\QuoteFactory $quoteFactory,
        \Magento\QuoteGraphQl\Model\Cart\GetCartForUser $getCartForUser,
        \Magento\Framework\Json\Helper\Data $jsonHelper
    ) {
        $this->getCustomer = $getCustomer;
        $this->quoteFactory = $quoteFactory;
        $this->getCartForUser = $getCartForUser;
        $this->jsonHelper = $jsonHelper;
    }

    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (true === $context->getExtensionAttributes()->getIsCustomer()) {
            $customer = $this->getCustomer->execute($context);
            $quote = $this->quoteFactory->create()->loadByCustomer($customer);
        }else{

            if (empty($args['cart_id'])) {
                throw new GraphQlInputException(__('Required parameter "cart_id" is missing'));
            }

            $maskedCartId = $args['cart_id'];
            unset($args['cart_id']);
            $storeId = (int)$context->getExtensionAttributes()->getStore()->getId();
            $currentUserId = $context->getUserId();
            $quote = $this->getCartForUser->execute($maskedCartId, $currentUserId, $storeId);
        }

        $returnArray   = [
            'status'=>false,
            'message'=> __('Custom field set successfully.')
        ];

        $data = [];
        $customField = $quote->getBssCustomfield();
        if ($customField) {
            $data = $this->jsonHelper->jsonDecode($customField);
        }
        if (is_array($data) && !empty($args)) {
            foreach ($args as $key => $val) {
                $data[$key] = $val;
            }
        }
        $quote->setBssCustomfield($this->jsonHelper->jsonEncode($data));
        $quote->save();

        return $returnArray;
    }
}
