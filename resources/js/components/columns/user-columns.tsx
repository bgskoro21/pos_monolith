import { User } from '@/pages/users/user-index';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { getSelectColumn } from '../table/utils';
import { Button } from '../ui/button';

interface UserTableColumnsProps {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<User> | null>>;
    deleteUser: (url: string, name: string) => void;
}

const getUserColumns = ({ setRowAction, deleteUser }: UserTableColumnsProps): ColumnDef<User>[] => {
    return [
        getSelectColumn<User>(),
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => <span>{row.getValue('name')}</span>,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => <span>{row.getValue('email')}</span>,
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            cell: ({ row }) => {
                const roles = row.original.roles || [];
                return (
                    <div className="flex flex-wrap gap-1">
                        {roles.length > 0 ? (
                            roles.map((role) => (
                                <span key={role.id} className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
                                    {role.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 italic">No role</span>
                        )}
                    </div>
                );
            },
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
                        onClick={() => deleteUser(route('users.destroy', row.original.id), row.original.name)}
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

export default getUserColumns;
