import BaseTable from '@/components/base-table';
import getColumns from '@/components/columns/category-columns';
import CategoryModal from '@/components/modals/category-modal';
import ActionsDropdown from '@/components/table/action-dropdown';
import DropdownHideColumn from '@/components/table/hide-column-dropdown';
import { Button } from '@/components/ui/button';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import PageLayout from '@/layouts/page-layout';
import { BreadcrumbItem } from '@/types';
import { DataTableRowAction } from '@/types/data-table';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

interface CategoryPageProps {
    categories: {
        data: Category[];
    } & Pagination;
    filters: FilterData;
}

const ProductCategoryPage = ({ categories, filters }: CategoryPageProps) => {
    const [rowAction, setRowAction] = useState<DataTableRowAction<Category> | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const deleteAction = useDeleteAction('Category');
    const columns = useMemo(() => getColumns({ setRowAction, deleteAction }), [setRowAction, deleteAction]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            <PageLayout title="Categories">
                <BaseTable
                    columns={columns}
                    data={categories.data}
                    pagination={categories}
                    filters={filters}
                    routeName="categories.index"
                    onSelectionChange={setSelectedCategories}
                >
                    {(table) => (
                        <>
                            <ActionsDropdown
                                selectedItems={selectedCategories.map((user) => user.id)}
                                actionDelete="categories.bulk-delete"
                                instance="Categories"
                            />
                            <DropdownHideColumn table={table} />
                            <Button onClick={() => setRowAction({ variant: 'create' })} variant="default" className="cursor-pointer text-white">
                                + Add Category
                            </Button>
                        </>
                    )}
                </BaseTable>
                <CategoryModal
                    open={rowAction?.variant == 'create' || rowAction?.variant == 'update'}
                    onOpenChange={() => setRowAction(null)}
                    mode={rowAction?.variant == 'create' ? 'create' : 'update'}
                    categoryData={rowAction?.row?.original}
                />
            </PageLayout>
        </AppLayout>
    );
};

export default ProductCategoryPage;
