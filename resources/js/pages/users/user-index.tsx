import BaseTable from '@/components/base-table';
import { getSelectColumn } from '@/components/table/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DataTableRowAction } from '@/types/data-table';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, Pencil, Trash } from 'lucide-react';
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
                <div className="space-x-2">
                    <Button
                        onClick={() => setRowAction({ row, variant: 'delete' })}
                        className="cursor-pointer bg-blue-500 text-white duration-200 hover:bg-blue-600 hover:opacity-90"
                    >
                        <Pencil />
                    </Button>
                    <Button
                        onClick={() => setRowAction({ row, variant: 'delete' })}
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
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Users</h1>
                </div>
                <BaseTable
                    columns={columns}
                    data={users.data}
                    pagination={users}
                    filters={filters}
                    routeName="users.index"
                    onSelectionChange={setSelectedUsers}
                >
                    {(table) => (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                    <Button variant="outline" className="ml-auto">
                                        Actions <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onSelect={() => {
                                            console.log(selectedUsers);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Trash /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                    <Button variant="outline" className="ml-auto">
                                        Columns <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table.getAllColumns().map((column) => {
                                        return (
                                            column.getCanHide() && (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="default" className="cursor-pointer text-white">
                                + Add User
                            </Button>
                        </>
                    )}
                </BaseTable>
            </div>
        </AppLayout>
    );
};

export default UserPage;
