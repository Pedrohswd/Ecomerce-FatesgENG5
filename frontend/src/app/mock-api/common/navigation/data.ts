/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { AuthUtils } from 'app/core/auth/auth.utils';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'produtos',
        title: 'Produtos',
        type: 'basic',
        icon: 'heroicons_outline:receipt-percent',
        link: '/produtos',
    },
    {
        id: 'carrinho',
        title: 'Carrinho',
        type: 'basic',
        icon: 'heroicons_outline:shopping-cart',
        link: '/carrinho',
        hidden: (item: FuseNavigationItem) => {
            const role = AuthUtils.getUserRole();
            return !(role === 'ROLE_CLIENTE');
        },
    },
    {
        id: 'meus-pedidos',
        title: 'Meus pedidos',
        type: 'basic',
        icon: 'heroicons_outline:presentation-chart-line',
        link: '/meus-pedidos',
        hidden: (item: FuseNavigationItem) => {
            const role = AuthUtils.getUserRole();
            return !(role === 'ROLE_CLIENTE');
        },
    },
    {
        id: 'pedidos',
        title: 'Pedidos',
        type: 'basic',
        icon: 'heroicons_outline:presentation-chart-line',
        link: '/pedidos',
        hidden: (item: FuseNavigationItem) => {
            const role = AuthUtils.getUserRole();
            return !(role === 'ROLE_ADMIN');
        },
    },
    {
        id: 'cadastro',
        title: 'Cadastro',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/ecomerce',
        hidden: (item: FuseNavigationItem) => {
            const role = AuthUtils.getUserRole();
            return !(role === 'ROLE_ADMIN');
        },
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
