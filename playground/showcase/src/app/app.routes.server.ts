import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'documentation',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/button',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/breadcrumb',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/carousel',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/tooltip',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/dropdown-menu',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/components/selection-popover',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'documentation/chat-sdk',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'components',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
