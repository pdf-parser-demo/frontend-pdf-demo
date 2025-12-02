import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';


@Component({
  selector: 'app-data-preview',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './data-preview.component.html',
  styleUrl: './data-preview.component.css'
})
export class DataPreviewComponent {

}
