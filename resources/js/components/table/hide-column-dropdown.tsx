import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface DropdownHideColumnProps<T> {
    table: Table<T>;
}

const DropdownHideColumn = <T,>({ table }: DropdownHideColumnProps<T>) => {
    return (
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
    );
};

export default DropdownHideColumn;
