import BaseTable from '@/components/base-table';
import { getSelectColumn } from '@/components/table/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DataTableRowAction } from '@/types/data-table';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
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
    const columns = useMemo(() => getColumns({ setRowAction }), [setRowAction]);

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
                ></BaseTable>
            </div>
        </AppLayout>
    );
};

interface CategoryTableColumnsProps {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<Category> | null>>;
}

const getColumns = ({ setRowAction }: CategoryTableColumnsProps): ColumnDef<Category>[] => {
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
    ];
};

export default ProductCategoryPage;
