import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallbackPageComponent } from "./page/callback-page/callback-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'callback',
        component: CallbackPageComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralRoutingModule {}