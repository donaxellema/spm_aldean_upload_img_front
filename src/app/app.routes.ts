import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { SubirExcelComponent } from './pages/subir-file/subir-excel/subir-excel.component';
import { AppSideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent
  },

  // rutas para el administrador
  {
    path: '',
    canActivate: [AuthGuard], //agregado 
    component: FullComponent,
    children: [
      

      /* {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      }, */
      
      //INICIO subir excel
      {
        path: 'subir_excel',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/subir-file/subirfile.routes').then(
            (m) => m.SubirFilesRoutes),
      },
      //FIN subir excel
      
      /*
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },*/
    ],
  },


  { path: '**', redirectTo: 'login' }

  /*
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  */
];
