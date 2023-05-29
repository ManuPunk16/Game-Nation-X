import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Platform } from '../models/games.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  private dbPath = '/platforms';
  gamesRef: AngularFirestoreCollection<Platform>;

  constructor(private db: AngularFirestore) {
    this.gamesRef = db.collection(this.dbPath);
  }

  getAllPlatforms(): AngularFirestoreCollection<Platform> {
    return this.db.collection(this.dbPath, ref => ref.orderBy('name', 'asc'));
  }

  getPlatformById(id: string): AngularFirestoreDocument<Platform> {
    return this.gamesRef.doc(id);
  }

  getPlatformByName(name: string): AngularFirestoreCollection<Platform> {
    return this.db.collection('platforms', ref => ref.where('platforms', 'array-contains', name));
  }

  getPlatformCountByName(name: string): Observable<number> {
    const collection = this.db.collection<Platform>('platforms', ref => ref.where('categories', 'array-contains', name));
    return collection.valueChanges().pipe(
      map(games => games.length)
    );
  }

  createPlatform(platform: Platform): any {
    return this.gamesRef.add({ ...platform});
  }

  updatePlatform(id: string, data: any): Promise<void> {
    return this.gamesRef.doc(id).update(data);
  }

  deletePlatform(id: string): Promise<void> {
    return this.gamesRef.doc(id).delete();
  }
}
