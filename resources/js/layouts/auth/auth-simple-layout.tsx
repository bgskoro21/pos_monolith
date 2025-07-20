import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

interface HeroSlider {
    url: string;
    description?: string;
}

const authImageSlider: HeroSlider[] = [
    {
        url: '/img/slider-1.png',
    },
    {
        url: '/img/slider-2.png',
    },
];

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="hidden bg-primary p-4 md:block">
                <Carousel
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    className="flex h-full w-full items-center rounded-tr-4xl rounded-br-4xl"
                >
                    <CarouselContent>
                        {authImageSlider.map((slider: HeroSlider, index: number) => (
                            <CarouselItem key={index}>
                                <div className="w-full">
                                    <img
                                        src={slider.url}
                                        alt={slider.description || `Slider image ${index + 1}`}
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="col-span-1 flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:col-span-2 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">{description}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
