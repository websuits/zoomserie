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
namespace Bss\CheckoutCustomField\Model\Plugin\Sales\Order\Pdf;

use Magento\Sales\Model\Order;

/**
 * Sales Order Invoice PDF model
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * @codingStandardsIgnoreFile
 */
class Invoice extends \Magento\Sales\Model\Order\Pdf\Invoice
{
    /**
     * @var \Bss\CheckoutCustomField\Helper\Data
     */
    protected $helper;

    /**
     * @var \Magento\Framework\Json\Helper\Data $jsonHelper
     */
    protected $jsonHelper;

    /**
     * @return \Bss\CheckoutCustomField\Helper\Data|null
     */
    public function getHelperObject()
    {
        return null;
    }

    /**
     * @return \Magento\Store\Model\App\Emulation|null
     */
    public function getAppEmulation()
    {
        return null;
    }

    /**
     * @return \Magento\Framework\Locale\ResolverInterface|null
     */
    public function getLocaleResolver()
    {
        return null;
    }

    /**
     * @param array $invoices
     * @return \Zend_Pdf
     * @throws \Zend_Pdf_Exception
     */
    public function getPdf($invoices = [])
    {
        $helper = $this->getHelperObject();
        $this->_beforeGetPdf();
        $this->_initRenderer('invoice');

        $pdf = new \Zend_Pdf();
        $this->_setPdf($pdf);

        $style = new \Zend_Pdf_Style();
        $this->_setFontBold($style, 10);

        foreach ($invoices as $invoice) {
            if ($invoice->getStoreId()) {
                if (!$helper->isLowerThan241Version()) {
                    $this->getAppEmulation()->startEnvironmentEmulation(
                        $invoice->getStoreId(),
                        \Magento\Framework\App\Area::AREA_FRONTEND,
                        true
                    );
                } else {
                    $this->getLocaleResolver()->emulate($invoice->getStoreId());
                }
                $this->_storeManager->setCurrentStore($invoice->getStoreId());
            }
            $page = $this->newPage();
            $order = $invoice->getOrder();
            /* Add image */
            $this->insertLogo($page, $invoice->getStore());
            /* Add address */
            $this->insertAddress($page, $invoice->getStore());
            /* Add head */
            $this->insertOrder(
                $page,
                $order,
                $this->_scopeConfig->isSetFlag(
                    self::XML_PATH_SALES_PDF_INVOICE_PUT_ORDER_ID,
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
                    $order->getStoreId()
                )
            );
            /* Add document text and number */
            $this->insertDocumentNumber($page, __('Invoice # ') . $invoice->getIncrementId());

            /* Add custom field*/
            if ($helper->showInPdf($order->getStore()->getId())) {
                $this->insertBssChekoutCustomField($page, $order);
            }

            /* Add table */
            $this->_drawHeader($page);
            /* Add body */
            foreach ($invoice->getAllItems() as $item) {
                if ($item->getOrderItem()->getParentItem()) {
                    continue;
                }
                /* Draw item */
                $this->_drawItem($item, $page, $order);
                $page = end($pdf->pages);
            }
            /* Add totals */
            $this->insertTotals($page, $invoice);
            if ($invoice->getStoreId()) {
                if (!$helper->isLowerThan241Version()) {
                    $this->getAppEmulation()->stopEnvironmentEmulation();
                } else {
                    $this->getLocaleResolver()->revert();
                }
            }
        }
        $this->_afterGetPdf();
        return $pdf;
    }

    /**
     * @param mixed $page
     * @param Order $order
     */
    public function insertBssChekoutCustomField(&$page, $order)
    {
        $helper = $this->getHelperObject();
        $customField = $order->getBssCustomfield();
        if ($customField && $helper->hasDataCustomFieldPdf($customField) && $helper->moduleEnabled()) {
            $bssCustomfield = $helper->getJsonHelper()->jsonDecode($customField);

            $this->y -= -8;
            $page->setFillColor(new \Zend_Pdf_Color_Rgb(0.93, 0.92, 0.92));
            $page->setLineColor(new \Zend_Pdf_Color_GrayScale(0.5));
            $page->setLineWidth(0.5);
            $page->drawRectangle(25, $this->y, 570, $this->y - 20);
            $yDraw = $this->returnYDraw($bssCustomfield);
            $page->setFillColor(new \Zend_Pdf_Color_Rgb(1, 1, 1));
            $page->drawRectangle(25, $this->y - 20, 570, $this->y - $yDraw);
            $page->setFillColor(new \Zend_Pdf_Color_RGB(0.1, 0.1, 0.1));
            $this->_setFontBold($page, 12);

            $page->drawText($helper->getTitle($order->getStore()->getId()), 35, $this->y - 13, 'UTF-8');
            $this->_setFontRegular($page, 10);

            $this->y -= $this->returnY($bssCustomfield, $page);
        }
    }

    /**
     * @param array $bssCustomfield
     * @return int
     */
    private function returnYDraw($bssCustomfield)
    {
        $yDraw = 33;
        foreach ($bssCustomfield as $field) {
            if ($field['show_in_pdf'] == '1' && ((is_array($field['value']) && !empty($field['value'])) || $field['value'] != "")) {
                $yDraw += 20;
            }
        }
        return $yDraw;
    }

    /**
     * @param array $bssCustomfield
     * @param mixed $page
     * @return int
     */
    private function returnY($bssCustomfield, $page)
    {
        $y = 33;

        foreach ($bssCustomfield as $field) {
            if ($field['show_in_pdf'] == '1' && ((is_array($field['value']) && !empty($field['value'])) || $field['value'] != "")) {
                $fieldText = $field['frontend_label'] . ': ';
                if (is_array($field['value'])) {
                    foreach ($field['value'] as $value) {
                        $fieldText .= $value . ",";
                    }
                } else {
                    $fieldText .= $field['value'];
                }
                $page->drawText($fieldText, 33, $this->y - $y, 'UTF-8');
                $y += 20;
            }
        }
        $y += 8;
        return $y;
    }
}
