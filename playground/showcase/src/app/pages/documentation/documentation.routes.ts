import { Routes } from '@angular/router';

export const documentationRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./documentation').then(m => m.Documentation)
    },
    {
        path: 'components',
        loadChildren: () => import('./components/components.routes').then(m => m.componentsRoutes)
    }
];