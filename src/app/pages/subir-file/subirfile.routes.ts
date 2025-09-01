import { Routes } from '@angular/router';

import { SubirExcelComponent } from './subir-excel/subir-excel.component';
//import { AppSideRegisterComponent } from './side-register/side-register.component';

export const SubirFilesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'subir_excel',
        component: SubirExcelComponent,
      },
    ],
  },
];
