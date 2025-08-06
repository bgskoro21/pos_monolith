import { useAlert } from '@/hooks/use-alert';
import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { ChevronDown, FileSpreadsheet, FileText, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface ActionsDropdownProps {
    selectedItems: number[];
    onExportExcel?: (ids: number[]) => void;
    onExportPdf?: (ids: number[]) => void;
    actionDelete?: string;
    instance: string;
    disabled?: boolean;
}

const ActionsDropdown = ({ selectedItems, onExportExcel, onExportPdf, disabled = false, actionDelete, instance }: ActionsDropdownProps) => {
    const alert = useAlert();
    const toast = useToast();
    const handleBulkDelete = async (ids: number[]) => {
        const confirmed = await alert.confirm('Are you sure?', `You are about to delete ${ids.length} ${instance.toLowerCase()}`);

        if (confirmed) {
            console.log(actionDelete);
            router.post(
                route(actionDelete!),
                { ids },
                {
                    onSuccess: () => {
                        toast.success(`${ids.length} ${instance.toLowerCase()} deleted successfully!`);
                    },
                    onError: () => {
                        toast.error(`Error delete ${ids.length} ${instance.toLowerCase()}`);
                    },
                },
            );
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto" disabled={disabled}>
                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actionDelete && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleBulkDelete(selectedItems)}
                        disabled={selectedItems.length === 0}
                    >
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
