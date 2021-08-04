<?php
namespace Magstart\Widget\Block\Product;
 
class ProductsList extends \Magento\CatalogWidget\Block\Product\ProductsList
{
    const DEFAULT_SORT_BY = 'id';
    
    const DEFAULT_SORT_ORDER = 'asc';
    
    public function createCollection()
    {
        $collection = $this->productCollectionFactory->create();
        $collection->setVisibility($this->catalogProductVisibility->getVisibleInCatalogIds());
        
        $collection = $this->_addProductAttributesAndPrices($collection)
            ->addStoreFilter()
            ->setPageSize($this->getPageSize())
            ->setCurPage($this->getRequest()->getParam($this->getData('page_var_name'), 1))
            ->setOrder($this->getSortBy(), $this->getSortOrder());
            
        $conditions = $this->getConditions();
        $conditions->collectValidatedAttributes($collection);
        $this->sqlBuilder->attachConditionToCollection($collection, $conditions);
        
        return $collection;
    }
    
    public function getSortBy()
    {
        if (!$this->hasData('products_sort_by')) {
            $this->setData('products_sort_by', self::DEFAULT_SORT_BY);
        }
        return $this->getData('products_sort_by');
    }
    
    public function getSortOrder()
    {
        if (!$this->hasData('products_sort_order')) {
            $this->setData('products_sort_order', self::DEFAULT_SORT_ORDER);
        }
        return $this->getData('products_sort_order');
    }
}