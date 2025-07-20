import { ReactNode } from 'react';
import { Input } from './ui/input';

interface InputSuffixIconProps extends React.ComponentProps<'input'> {
    icon: ReactNode;
    onIconClick?: VoidFunction;
}

const InputSuffixIcon = ({ className, type, icon, onIconClick, ...props }: InputSuffixIconProps) => {
    return (
        <div className="relative">
            <Input type={type} className={className} {...props} />
            <span
                onClick={onIconClick}
                className={`5 absolute top-1/2 right-1 -translate-1/2 ${onIconClick ? 'cursor-pointer' : 'pointer-events-none'}`}
            >
                {icon}
            </span>
        </div>
    );
};

export default InputSuffixIcon;
