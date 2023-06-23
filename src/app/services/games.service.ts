import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Games, Category } from '../models/games.model';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private dbPath = '/games';
  gamesRef: AngularFirestoreCollection<Games>;
  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.gamesRef = db.collection(this.dbPath);
    this.items = this.gamesRef.valueChanges();
  }

  getGamesSitemap(): AngularFirestoreCollection<Games> {
    return this.db.collection<Games>('games', ref => ref
      .where('published', '==', true)
      .orderBy('updatedAt', 'asc')
    );
  }

  getAllGames(): AngularFirestoreCollection<Games> {
    return this.gamesRef;
  }

  getAllGamesByLatestUpload(): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(15)
    );
  }

  getAllGamesByLatestUpdated(): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .orderBy('updatedAt', 'desc')
      .limit(15)
    );
  }

  getGameById(id: string): AngularFirestoreDocument<Games> {
    return this.gamesRef.doc(id);
  }

  getCategoriesByName(name: string): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .where('categories', 'array-contains', name)
      .orderBy('publication_date', 'desc')
    );
  }

  getCategoriesCountByName(name: string): Observable<number> {
    return this.db.collection<Games>('games', ref => ref
      .where('published', '==', true)
      .where('categories', 'array-contains', name)
    ).valueChanges().pipe(
      map(games => games.length)
    );
  }

  getPlatformsByName(name: string): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .where('platforms', 'array-contains', name)
      .orderBy('publication_date', 'desc')
    );
  }

  getPlatformsCountByName(name: string): Observable<number> {
    return this.db.collection<Games>('games', ref => ref
      .where('published', '==', true)
      .where('platforms', 'array-contains', name)
    ).valueChanges().pipe(
      map(games => games.length)
    );
  }

  createGame(games: Games): any {
    return this.gamesRef.add({ ...games});
  }

  updateGame(id: string, data: any): Promise<void> {
    return this.gamesRef.doc(id).update(data);
  }

  deleteGame(id: string): Promise<void> {
    return this.gamesRef.doc(id).delete();
  }

  searchItems(keyword: string): Observable<Games[]> {
    return this.gamesRef.snapshotChanges().pipe(
      map(actions => {
        return actions
          .map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { id, ...data };
          })
          .filter(item => item.published === true)
          .filter(item => this.normalizeString(item.name).includes(this.normalizeString(keyword)));
      })
    );
  }

  normalizeString(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
