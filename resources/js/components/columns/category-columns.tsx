import { Category } from '@/pages/categories';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { getSelectColumn } from '../table/utils';
import { Button } from '../ui/button';

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

export default getColumns;
