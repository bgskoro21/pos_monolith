import BaseTable from '@/components/base-table';
import { getSelectColumn } from '@/components/table/utils';
import { Button } from '@/components/ui/button';
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
        title: 'Users',
        href: '/users',
    },
];

interface UserTableColumnsProps {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<User> | null>>;
}

const getUserColumns = ({ setRowAction }: UserTableColumnsProps): ColumnDef<User>[] => {
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
            accessorKey: 'created_at',
            header: 'Created At',
            cell: ({ row }) => <span>{new Date(row.getValue('created_at')).toLocaleDateString()}</span>,
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }) => (
                <>
                    <Button
                        onClick={() => setRowAction({ row, variant: 'delete' })}
                        className="cursor-pointer bg-red-500 text-white duration-200 hover:bg-red-600 hover:opacity-90"
                    >
                        Delete
                    </Button>
                </>
            ),
            enableHiding: false,
        },
    ];
};

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface UserPageProps {
    users: {
        data: User[];
    } & Pagination;
    filters: FilterData;
}

const UserPage = ({ users, filters }: UserPageProps) => {
    const [rowAction, setRowAction] = useState<DataTableRowAction<User> | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const columns = useMemo(() => getUserColumns({ setRowAction }), [setRowAction]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <BaseTable
                    columns={columns}
                    data={users.data}
                    pagination={users}
                    filters={filters}
                    routeName="users.index"
                    onSelectionChange={setSelectedUsers}
                />
            </div>
        </AppLayout>
    );
};

export default UserPage;
