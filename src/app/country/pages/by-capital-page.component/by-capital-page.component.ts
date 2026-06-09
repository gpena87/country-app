import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page.component',
  imports: [],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  onSearch( value: string ): void {
    console.log( value );
  }
}
