<?php
namespace Magstart\Widget\Model;
 
class IsSlider implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return [
            ['value' => 'yes', 'label' => __('Yes')],
            ['value' => 'no', 'label' => __('No')]
        ];
    }
}