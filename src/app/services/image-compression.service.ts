import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {

  constructor(private http: HttpClient) {}

  compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // Redimensionar la imagen si es necesario
            const MAX_WIDTH = 720;
            const MAX_HEIGHT = 960;
            let width = img.width;
            let height = img.height;

            if (width > height && width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            } else if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }

            canvas.width = width;
            canvas.height = height;

            // Dibujar la imagen en el canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Obtener el Blob de la imagen comprimida
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('No se pudo generar el blob comprimido.'));
              }
            }, 'image/webp', 0.7); // Ajusta el valor de calidad según tus necesidades (0.7 en este ejemplo)
          } else {
            reject(new Error('No se pudo obtener el contexto 2D del lienzo.'));
          }
        };

        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}
