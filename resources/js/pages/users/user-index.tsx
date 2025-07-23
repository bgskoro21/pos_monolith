import BaseTable from '@/components/base-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <span>{row.getValue('id')}</span>,
    },
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
];

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <BaseTable columns={columns} data={users.data} pagination={users} filters={filters} routeName="users.index" />
            </div>
        </AppLayout>
    );
};

export default UserPage;
