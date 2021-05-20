import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUrlComponent } from './components/add-url/add-url.component';
import { UrlListComponent } from './components/url-list/url-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'listurl', pathMatch: 'full' },
  { path: 'urladd', component: AddUrlComponent },
  { path: 'listurl', component: UrlListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
