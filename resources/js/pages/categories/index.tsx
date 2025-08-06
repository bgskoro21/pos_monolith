import BaseTable from '@/components/base-table';
import CategoryModal from '@/components/modals/category-modal';
import ActionsDropdown from '@/components/table/action-dropdown';
import DropdownHideColumn from '@/components/table/hide-column-dropdown';
import { getSelectColumn } from '@/components/table/utils';
import { Button } from '@/components/ui/button';
import { useDeleteAction } from '@/hooks/use-delete-action';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DataTableRowAction } from '@/types/data-table';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Category {
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
            <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Categories</h1>
                </div>
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
            </div>
        </AppLayout>
    );
};

interface CategoryTableColumnsProps {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<Category> | null>>;
    deleteAction: (url: string, name: string) => void;
}

const getColumns = ({ setRowAction, deleteAction }: CategoryTableColumnsProps): ColumnDef<Category>[] => {
    return [
        getSelectColumn<Category>(),
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => <span>{row.getValue('name')}</span>,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => <span>{row.getValue('description')}</span>,
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: ({ row }) => <span>{new Date(row.getValue('created_at')).toLocaleDateString()}</span>,
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }) => (
                <div className="space-x-2">
                    <Button
                        onClick={() => setRowAction({ row, variant: 'update' })}
                        className="cursor-pointer bg-primary text-white duration-200 duration-300 hover:opacity-80"
                    >
                        <Pencil />
                    </Button>
                    <Button
                        onClick={() => deleteAction(route('categories.destroy', row.original.id), row.original.name)}
                        className="cursor-pointer bg-red-500 text-white duration-200 hover:bg-red-600 hover:opacity-90"
                    >
                        <Trash />
                    </Button>
                </div>
            ),
            enableHiding: false,
        },
    ];
};

export default ProductCategoryPage;
