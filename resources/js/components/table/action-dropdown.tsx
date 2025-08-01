import { ChevronDown, FileSpreadsheet, FileText, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface ActionsDropdownProps {
    selectedItems: number[];
    onDelete?: (ids: number[]) => void;
    onExportExcel?: (ids: number[]) => void;
    onExportPdf?: (ids: number[]) => void;
    disabled?: boolean;
}

const ActionsDropdown = ({ selectedItems, onDelete, onExportExcel, onExportPdf, disabled = false }: ActionsDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto" disabled={disabled}>
                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {onDelete && (
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => onDelete(selectedItems)} disabled={selectedItems.length === 0}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                )}
                {onExportExcel && (
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => onExportExcel(selectedItems)} disabled={selectedItems.length === 0}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
                    </DropdownMenuItem>
                )}
                {onExportPdf && (
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => onExportPdf(selectedItems)} disabled={selectedItems.length === 0}>
                        <FileText className="mr-2 h-4 w-4" /> Export PDF
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsDropdown;
