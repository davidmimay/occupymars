import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import { PaymentComponent } from './shared/payment.component';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), canActivate: [AuthGuard] },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
  { path: 'youtube', loadChildren: () => import('./youtube/youtube.module').then(m => m.YoutubeModule) },
  // Stripe
  { path: 'support', component: PaymentComponent },
  { path: 'privacy', component: PaymentComponent },
  { path: 'success', component: PaymentComponent },
  { path: 'success', component: PaymentComponent },
  { path: 'cancel', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
