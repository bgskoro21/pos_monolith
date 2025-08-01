import { useForm } from '@inertiajs/react';
import { useAlert } from './use-alert';
import { useToast } from './use-toast';

export const useDeleteAction = (entity: string) => {
    const alert = useAlert();
    const toast = useToast();
    const { delete: destroy } = useForm({});

    const confirmAndDelete = async (url: string, name: string) => {
        const confirmed = await alert.confirm(`Delete ${entity}?`, `Are you sure you want to delete ${name}?`);

        if (confirmed) {
            destroy(url, {
                onSuccess: () => toast.success(`${entity} deleted successfully`),
                onError: () => toast.error(`Failed to delete ${entity}`),
            });
        }
    };

    return confirmAndDelete;
};
