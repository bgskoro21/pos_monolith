import { cn, debounce } from '@/lib/utils';
import { FilterData } from '@/types/filter';
import { Pagination } from '@/types/pagination';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface BaseTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: Pagination;
    filters: FilterData;
    routeName: string;
}

const BaseTable = <TData, TValue>({ columns, data, pagination, filters, routeName }: BaseTableProps<TData, TValue>) => {
    const [search, setSearch] = useState(filters.keyword || '');

    const dynamicColumns: ColumnDef<TData, TValue>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        ...columns,
    ];

    const table = useReactTable({
        data,
        columns: dynamicColumns,
        getCoreRowModel: getCoreRowModel(), // No client-side row model
        manualSorting: true,
        manualPagination: true,
    });

    // Handle Search
    const handleSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
            console.log(value);
            router.get(
                route(routeName),
                {
                    keyword: value,
                    sort: filters.sort,
                    direction: filters.direction,
                    page: 1,
                    limit: filters.limit,
                },
                { preserveState: true, replace: true },
            );
        }, 500),
        [],
    );

    // Handle Sorting
    const handleSort = (columnId: string) => {
        const direction = filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            route(routeName),
            {
                keyword: search,
                sort: columnId,
                direction: direction,
                page: pagination.current_page,
                limit: filters.limit,
            },
            { preserveState: true, replace: true },
        );
    };

    // Handle Pagination
    const handlePageChange = (page: number) => {
        router.get(
            route(routeName),
            {
                keyword: search,
                sort: filters.sort,
                direction: filters.direction,
                page,
                limit: filters.limit,
            },
            { preserveState: true, replace: true },
        );
    };

    // Handle per page change
    const handlePerPageChange = (limit: number) => {
        router.get(
            route(routeName),
            {
                keyword: search,
                sort: filters.sort,
                direction: filters.direction,
                page: 1, // reset ke halaman pertama
                limit,
            },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="w-full overflow-x-auto">
            {/* Search & Column Toggle */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    defaultValue={search}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <div
                                            onClick={() => header.column.getCanSort() && handleSort(header.id)}
                                            className={cn('py-2', header.column.getCanSort() && 'cursor-pointer', 'group flex items-center gap-2')}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <ArrowUpDown className="h-4 w-4 opacity-45 duration-300 group-hover:opacity-100" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={dynamicColumns.length} className="h-25 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                    <select value={pagination.per_page} onChange={(e) => handlePerPageChange(Number(e.target.value))} className="rounded border p-1">
                        {[10, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                    <div>
                        Showing {pagination.from} to {pagination.to} of {pagination.total} entries
                    </div>
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={pagination.current_page >= pagination.last_page}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BaseTable;
