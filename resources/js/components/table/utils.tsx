import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';

interface SelectColumnOptions {
    id?: string;
    enableToggleAll?: boolean;
}

export const getSelectColumn = <TData,>(options?: SelectColumnOptions): ColumnDef<TData> => ({
    id: options?.id ?? 'select',
    header: ({ table }) =>
        options?.enableToggleAll === false ? null : (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
});
