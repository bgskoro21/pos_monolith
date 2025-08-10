import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types/role';
import { useForm } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import { MultiSelect } from '../multi-select';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

interface UserModalProps {
    open: boolean;
    onOpenChange: () => void;
    mode: 'create' | 'update';
    userData?: { id?: number; name: string; email: string; roles: Role[] } | null;
    roles: Role[];
}

type UserModalFormType = {
    id?: number;
    name: string;
    email: string;
    roles: number[];
    password: string;
    password_confirmation: string;
};

const UserModal = ({ open, onOpenChange, mode, userData, roles }: UserModalProps) => {
    const toast = useToast();

    const initialForm = useMemo(
        () => ({
            id: undefined,
            name: '',
            email: '',
            roles: [] as number[],
            password: '',
            password_confirmation: '',
        }),
        [],
    );

    const { data, setData, post, put, processing, errors, reset } = useForm<UserModalFormType>(initialForm);

    // ✅ Sync userData when modal opens
    useEffect(() => {
        if (userData) {
            setData({
                ...initialForm,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                roles: userData.roles?.map((r) => r.id) || [],
            });
        }
    }, [userData, setData, reset, initialForm]);

    const title = mode === 'create' ? 'Add User' : 'Edit User';

    // ✅ Handle perubahan field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as 'name' | 'email', e.target.value);
    };

    // ✅ Submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = mode === 'create' ? post : put;
        action(route(mode === 'create' ? 'users.store' : 'users.update', data.id), {
            onSuccess: () => {
                toast.success('User updated successfully');
                reset();
                onOpenChange();
            },
        });
    };

    // Selected Roles
    const selectedRoleValues = useMemo(() => {
        return data.roles.map((id) => id.toString());
    }, [data.roles]);

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
            <DialogContent
                onInteractOutside={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                        target.closest('[data-multi-select]') || // wrapper
                        target.closest('.multi-select-dropdown') // popper dropdown
                    ) {
                        e.preventDefault(); // jangan tutup modal
                    }
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input name="name" placeholder="Name" value={data.name} onChange={handleInputChange} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Input name="email" placeholder="Email" value={data.email} onChange={handleInputChange} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <Input type="password" name="password" placeholder="Password" value={data.password} onChange={handleInputChange} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div>
                        <Input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmation Password"
                            value={data.password_confirmation}
                            onChange={handleInputChange}
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                    </div>

                    <div data-multi-select>
                        <MultiSelect
                            options={roles.map((role) => ({
                                label: role.name,
                                value: role.id.toString(),
                            }))}
                            defaultValue={selectedRoleValues}
                            onValueChange={(selectedValues) => setData('roles', selectedValues.map(Number))}
                        />

                        {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
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

export default UserModal;
