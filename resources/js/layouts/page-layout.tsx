import React from 'react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
    return (
        <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
                <h1 className="text-4xl font-bold">{title}</h1>
            </div>
            {children}
        </div>
    );
};

export default PageLayout;
