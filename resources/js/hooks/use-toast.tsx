import toast from 'react-hot-toast';

export const useToast = () => {
    return {
        success: (message: string) => toast.success(message),
        error: (message: string) => toast.success(message),
        loading: (message: string) => toast.success(message),
    };
};
