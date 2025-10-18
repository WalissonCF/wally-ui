import { Routes } from '@angular/router';

export const componentsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components').then(m => m.Components)
    },
    {
        path: 'button',
        loadComponent: () => import('./button-docs/button-docs').then(m => m.ButtonDocs)
    },
    {
        path: 'breadcrumb',
        loadComponent: () => import('./breadcrumb-docs/breadcrumb-docs').then(m => m.BreadcrumbDocs)
    },
    {
        path: 'input',
        loadComponent: () => import('./input-docs/input-docs').then(m => m.InputDocs)
    },
    {
        path: 'carousel',
        loadComponent: () => import('./carousel-docs/carousel-docs').then(m => m.CarouselDocs)
    },
    {
        path: 'tooltip',
        loadComponent: () => import('./tooltip-docs/tooltip-docs').then(m => m.TooltipDocs)
    },
    {
        path: 'dropdown-menu',
        loadComponent: () => import('./dropdown-menu-docs/dropdown-menu-docs').then(m => m.DropdownMenuDocs)
    },
    {
        path: 'selection-popover',
        loadComponent: () => import('./selection-popover-docs/selection-popover-docs').then(m => m.SelectionPopoverDocs)
    }
];
