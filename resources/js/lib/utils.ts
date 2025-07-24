import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => void>(func: T, delay = 500) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
