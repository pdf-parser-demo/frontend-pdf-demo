import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist'

import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PdfParserService } from '../../services/pdf-parser.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  pages: string[] = [];
  totalPages = 0;
  selectedFile: any

  constructor(private pdfApi: PdfParserService) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFile = event.target.files[0];
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
      data: buffer
    }).promise;

    this.totalPages = pdf.numPages;
    this.pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvas,
        viewport
      }).promise;

      this.pages.push(canvas.toDataURL());
    }
  }

  async sendToApi() {
    if (!this.selectedFile) {
      alert('Seleccione un PDF válido')
      return
    };
    this.pdfApi.uploadPDF(this.selectedFile).subscribe({
      next: (res) => {
        alert('PDF enviado con éxito')
      },
      error: (err) => {
        alert(`Error al enviar PDF: ${err}`)
      }
    })
  }
}

