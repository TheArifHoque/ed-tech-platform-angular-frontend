import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallbackPageComponent } from "./page/callback-page/callback-page.component";

const routes: Routes = [
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