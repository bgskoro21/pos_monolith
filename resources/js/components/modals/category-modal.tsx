import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

interface CategoryModalProps {
    open: boolean;
    mode: 'create' | 'update';
    categoryData?: { id?: number; name: string; description: string };
    onOpenChange: () => void;
}

type CategoryModalFormType = {
    id?: number;
    name: string;
    description: string;
};

const CategoryModal = ({ open, onOpenChange, mode, categoryData }: CategoryModalProps) => {
    const toast = useToast();
    const initialForm = useMemo(
        () => ({
            id: undefined,
            name: '',
            description: '',
        }),
        [],
    );

    const { data, setData, post, put, processing, errors, reset } = useForm<CategoryModalFormType>(initialForm);

    useEffect(() => {
        if (categoryData) {
            setData({
                ...initialForm,
                id: categoryData.id,
                name: categoryData.name,
                description: categoryData.description,
            });
        }
    }, [categoryData, setData, initialForm]);

    const title = mode == 'create' ? 'Add Category' : 'Edit Category';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = mode == 'create' ? post : put;
        action(route(mode == 'create' ? 'categories.store' : 'categories.update', data.id), {
            onSuccess: () => {
                toast.success(`Category ${mode == 'create' ? 'created' : 'updated'} successfully`);
                reset();
                onOpenChange();
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    reset();
                }
                onOpenChange();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input name="name" placeholder="Name" value={data.name} onChange={(e) => setData(e.target.name as 'name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData(e.target.name as 'description', e.target.value)}
                            className="w-full rounded-md border p-2"
                            rows={4}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                onOpenChange();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryModal;
