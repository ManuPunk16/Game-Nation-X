import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../models/games.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private dbPath = '/categories';
  categoryRef: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoryRef = db.collection(this.dbPath);
  }

  getAllCategories(): AngularFirestoreCollection<Category> {
    return this.categoryRef;
  }

  createGame(categories: Category): any {
    return this.categoryRef.add({ ...categories});
  }

  updateGame(id: string, data: any): Promise<void> {
    return this.categoryRef.doc(id).update(data);
  }

  deleteGame(id: string): Promise<void> {
    return this.categoryRef.doc(id).delete();
  }
}
