<?php
/**
 * BSS Commerce Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://bsscommerce.com/Bss-Commerce-License.txt
 *
 * @category   BSS
 * @package    Bss_CheckoutCustomField
 * @author     Extension Team
 * @copyright  Copyright (c) 2018-2019 BSS Commerce Co. ( http://bsscommerce.com )
 * @license    http://bsscommerce.com/Bss-Commerce-License.txt
 */

namespace Bss\CheckoutCustomField\Plugin;

use Bss\CheckoutCustomField\Helper\Data as HelperData;

/**
 * Class GetHelperObject
 * @package Bss\CheckoutCustomField\Plugin
 */
class GetHelperObject
{
    /**
     * @var HelperData
     */
    protected $helperData;

    /**
     * @var \Magento\Store\Model\App\Emulation
     */
    private $appEmulation;

    /**
     * @var \Magento\Framework\Locale\ResolverInterface
     */
    protected $_localeResolver;

    /**
     * GetHelperObject constructor.
     * @param HelperData $data
     */
    public function __construct(
        HelperData $data,
        \Magento\Store\Model\App\Emulation $appEmulation,
        \Magento\Framework\Locale\ResolverInterface $_localeResolver
    ) {
        $this->helperData = $data;
        $this->appEmulation = $appEmulation;
        $this->_localeResolver = $_localeResolver;
    }

    /**
     * @return HelperData
     */
    public function afterGetHelperObject()
    {
        return $this->helperData;
    }

    /**
     * @return \Magento\Store\Model\App\Emulation
     */
    public function afterGetAppEmulation(): \Magento\Store\Model\App\Emulation
    {
        return $this->appEmulation;
    }

    /**
     * @return \Magento\Framework\Locale\ResolverInterface
     */
    public function afterGetLocaleResolver()
    {
        return $this->_localeResolver;
    }
}
