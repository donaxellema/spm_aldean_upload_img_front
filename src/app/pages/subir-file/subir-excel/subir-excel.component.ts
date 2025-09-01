import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';


import * as XLSX from 'xlsx';

import { UploadExcelService } from 'src/app/services/subir_files/upload-excel.service';

@Component({
  selector: 'app-subir-excel',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subir-excel.component.html',
  styleUrl: './subir-excel.component.scss'
})
export class SubirExcelComponent {

  constructor( 
    private router: Router,
    private excelService: UploadExcelService
  ) {}
    
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileName: string = '';
  jsonData: any[] = [];
  isDragOver = false;
  isLoading = false; // 👈 bandera para la barra de progreso


  // Manejar archivo seleccionado desde explorador
  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    this.handleFile(file);
  }

  // Manejar archivo arrastrado
  onFileDropped(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
    this.archivoSeleccionado = file;

  }

  // Validar y leer archivo
  private handleFile(file: File) {
    if (!file) return;

    this.fileName = file.name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log('Datos Excel:', this.jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  // Eliminar archivo cargado
  removeFile() {
     // 🔹 Reinicia estado después de procesar
     this.archivoSeleccionado = null;
     this.fileName = '';
     this.jsonData = [];
     if (this.fileInput) {
       this.fileInput.nativeElement.value = '';
     }
     this.mensaje='';
     this.actProcess
     /*
    this.fileName = '';
    this.jsonData = [];
    this.fileInput.nativeElement.value = '';
    */
  }

  // Eventos drag
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }







  archivoSeleccionado: File | null = null;
  mensaje: string = "";
  actProcess: boolean= false;
  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
    this.mensaje= '';
  }

  onUpload() {
    
    this.isLoading = true; // 👈 activa la barra

    //console.log("archivo seleccionado")
    //console.log(this.archivoSeleccionado)
    if (this.archivoSeleccionado != null) {
      this.excelService.subirExcel(this.archivoSeleccionado!).subscribe({
        next: (res) => 
          {
            this.isLoading = false; // 👈 desactiva la barra
            this.mensaje = `✅ ${res.mensaje}, Total imágenes: ${res.total}`;
            this.isLoading = false; // 👈 desactiva la barra
            this.actProcess= true;
          }
        ,error: (err) => {
          this.mensaje = `❌ Error: ${err.error.error}`;
          this.isLoading = false; // 👈 desactiva la barra
        }
      });
    } else {
      this.mensaje = "Por favor selecciona un archivo";
    }
  }

}
