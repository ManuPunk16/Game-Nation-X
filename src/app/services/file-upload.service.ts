import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise<string>((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url: string) => {
                resolve(url);
              },
              (error: any) => {
                reject(error);
              }
            );
          })
        )
        .subscribe();
    });
  }

  uploadMultipleImages(files: File[], gameName: string): Promise<string[]> {
    const promises = [];

    for (const file of files) {
      const filePath = `details/${gameName}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      promises.push(new Promise<string>((resolve, reject) => {
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(
                (url: string) => {
                  resolve(url);
                },
                (error: any) => {
                  reject(error);
                }
              );
            })
          )
          .subscribe();
        }));
      }
    return Promise.all(promises);
  }
}
