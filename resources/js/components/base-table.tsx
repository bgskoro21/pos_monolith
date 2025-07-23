import { Pagination } from '@/types/pagination';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface BaseTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: Pagination;
    filters: {
        keyword?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    routeName: string;
}

const BaseTable = <TData, TValue>({ columns, data, pagination, filters, routeName }: BaseTableProps<TData, TValue>) => {
    const [search, setSearch] = useState(filters.keyword || '');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(), // No client-side row model
        manualSorting: true,
    });

    // Handle Search
    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route(routeName),
            {
                keyword: value,
                sort: filters.sort,
                direction: filters.direction,
                page: 1,
                limit: pagination.per_page,
            },
            { preserveState: true, replace: true },
        );
    };

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
                limit: pagination.per_page,
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
                limit: pagination.per_page,
            },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="w-full overflow-x-auto">
            {/* Search & Column Toggle */}
            <div className="flex items-center py-4">
                <Input placeholder="Search..." value={search} onChange={(e) => handleSearch(e.target.value)} className="max-w-sm" />

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
                                    <TableHead key={header.id} onClick={() => handleSort(header.id)} className="cursor-pointer">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {filters.sort === header.id && (filters.direction === 'asc' ? ' 🔼' : ' 🔽')}
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
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
    );
};

export default BaseTable;
