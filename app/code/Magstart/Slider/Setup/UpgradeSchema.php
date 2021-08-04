<?php

namespace Magstart\Slider\Setup;
use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;
 
class UpgradeSchema implements UpgradeSchemaInterface
{
    public function upgrade(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        if (version_compare($context->getVersion(), '1.0.0') < 0) {
            $connection = $setup->getConnection();
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_display',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to display'
                ]
            );
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_scroll',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to scroll'
                ]
            );
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_display_tablet',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to display tablet'
                ]
            );
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_scroll_tablet',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to scroll tablet'
                ]
            );
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_display_mobile',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to display mobile'
                ]
            );
            $connection->modifyColumn(
                $setup->getTable('scandiweb_slider'),
                'slides_to_scroll_mobile',
                [
                    'type' => Table::TYPE_FLOAT,
                    'length' => '10,1',
                    'nullable' => false,
                    'default' => '0.0',
                    'comment' => 'Slides to scroll mobile'
                ]
            );
         }
    }
}
