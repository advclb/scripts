import { NgModule } from "@angular/core";

import { Foobar } from "./foobar.component";

@NgModule({
  declarations: [Foobar],
  exports: [Foobar],
})
export class FoobarModule {}
