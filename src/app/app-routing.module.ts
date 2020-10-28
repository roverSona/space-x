import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    loadChildren: () => import('../app/spaces/spaces.module').then(m => m.SpacesModule)
}, { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
