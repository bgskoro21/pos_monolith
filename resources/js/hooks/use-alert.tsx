import Swal from 'sweetalert2';

export const useAlert = () => {
    return {
        confirm: async (title: string, text?: string) => {
            const result = await Swal.fire({
                title,
                text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            });

            return result.isConfirmed;
        },
        success: (title: string, text?: string) => {
            return Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonColor: '#3085d6',
            });
        },
        error: (title: string, text?: string) => {
            return Swal.fire({
                title,
                text,
                icon: 'error',
                confirmButtonColor: '#d33',
            });
        },
    };
};
