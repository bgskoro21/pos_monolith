import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

const ProductCategoryPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
        </AppLayout>
    );
};

export default ProductCategoryPage;
