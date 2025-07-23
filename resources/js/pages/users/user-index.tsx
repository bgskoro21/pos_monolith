import BaseTable from '@/components/base-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// const data: Payment[] = [
//     {
//         id: 'm5gr84i9',
//         amount: 316,
//         status: 'success',
//         email: 'ken99@example.com',
//     },
//     {
//         id: '3u1reuv4',
//         amount: 242,
//         status: 'success',
//         email: 'Abe45@example.com',
//     },
//     {
//         id: 'derv1ws0',
//         amount: 837,
//         status: 'processing',
//         email: 'Monserrat44@example.com',
//     },
//     {
//         id: '5kma53ae',
//         amount: 874,
//         status: 'success',
//         email: 'Silas22@example.com',
//     },
//     {
//         id: 'bhqecj4p',
//         amount: 721,
//         status: 'failed',
//         email: 'carmella@example.com',
//     },
// ];
export type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};
// export const columns: ColumnDef<Payment>[] = [
//     {
//         id: 'select',
//         header: ({ table }) => (
//             <Checkbox
//                 checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
//                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }) => (
//             <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: 'status',
//         header: 'Status',
//         cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
//     },
//     {
//         accessorKey: 'email',
//         header: ({ column }) => {
//             return (
//                 <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
//                     Email
//                     <ArrowUpDown />
//                 </Button>
//             );
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
//     },
//     {
//         accessorKey: 'amount',
//         header: () => <div className="text-right">Amount</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue('amount'));
//             // Format the amount as a dollar amount
//             const formatted = new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: 'USD',
//             }).format(amount);
//             return <div className="text-right font-medium">{formatted}</div>;
//         },
//     },
//     {
//         id: 'actions',
//         enableHiding: false,
//         cell: ({ row }) => {
//             const payment = row.original;
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>View payment details</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             );
//         },
//     },
// ];

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
}

const UserPage = ({ users }: UserPageProps) => {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <BaseTable
                    columns={columns}
                    data={users.data}
                    pagination={users}
                    filters={{ keyword: '', sort: 'name', direction: 'desc' }}
                    routeName="users.index"
                />
            </div>
        </AppLayout>
    );
};

export default UserPage;
