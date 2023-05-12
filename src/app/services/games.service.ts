import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Games, Category } from '../models/games.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private dbPath = '/games';
  gamesRef: AngularFirestoreCollection<Games>;

  constructor(private db: AngularFirestore) {
    this.gamesRef = db.collection(this.dbPath);
  }

  getAllGames(): AngularFirestoreCollection<Games> {
    return this.gamesRef;
  }

  getAllGamesByLatestUpload(): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
    );
  }

  getAllGamesByLatestUpdated(): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .orderBy('updatedAt', 'desc')
    );
  }

  getGameById(id: string): AngularFirestoreDocument<Games> {
    return this.gamesRef.doc(id);
  }

  getCategoriesByName(name: string): AngularFirestoreCollection<Games> {
    return this.db.collection('games', ref => ref
      .where('published', '==', true)
      .where('categories', 'array-contains', name)
    );
  }

  getCategoriesCountByName(name: string): Observable<number> {
    const collection = this.db.collection<Games>('games', ref => ref
      .where('published', '==', true)
      .where('categories', 'array-contains', name)
    );
    return collection.valueChanges().pipe(
      map(games => games.length)
    );
  }

  getPlatformsCountByName(name: string): Observable<number> {
    const collection = this.db.collection<Games>('games', ref => ref
      .where('published', '==', true)
      .where('platforms', 'array-contains', name)
    );
    return collection.valueChanges().pipe(
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
}
