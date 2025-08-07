import BaseTable from '@/components/base-table';
import getUserColumns from '@/components/columns/user-columns';
import UserModal from '@/components/modals/user-modal';
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
import { Role } from '@/types/role';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: Role[];
}

interface UserPageProps {
    users: {
        data: User[];
    } & Pagination;
    roles: Role[];
    filters: FilterData;
}

const UserPage = ({ users, roles, filters }: UserPageProps) => {
    const [rowAction, setRowAction] = useState<DataTableRowAction<User> | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const deleteAction = useDeleteAction('User');
    const columns = useMemo(() => getUserColumns({ setRowAction, deleteUser: deleteAction }), [setRowAction, deleteAction]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <PageLayout title="Users">
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
                            <ActionsDropdown selectedItems={selectedUsers.map((user) => user.id)} actionDelete="users.bulk-delete" instance="User" />
                            <DropdownHideColumn table={table} />
                            <Button onClick={() => setRowAction({ variant: 'create' })} variant="default" className="cursor-pointer text-white">
                                + Add User
                            </Button>
                        </>
                    )}
                </BaseTable>
                <UserModal
                    open={rowAction?.variant == 'create' || rowAction?.variant == 'update'}
                    onOpenChange={() => setRowAction(null)}
                    mode={rowAction?.variant == 'create' ? 'create' : 'update'}
                    roles={roles}
                    userData={rowAction?.row?.original ?? null}
                />
            </PageLayout>
        </AppLayout>
    );
};

export default UserPage;
