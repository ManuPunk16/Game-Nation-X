import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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
    return this.db.collection(this.dbPath, ref => ref.orderBy('name'));
  }

  getCategoryById(id: string): AngularFirestoreDocument<Category> {
    return this.categoryRef.doc(id);
  }

  createCategory(categories: Category): any {
    return this.categoryRef.add({ ...categories});
  }

  updateCategory(id: string, data: any): Promise<void> {
    return this.categoryRef.doc(id).update(data);
  }

  deleteCategory(id: string): Promise<void> {
    return this.categoryRef.doc(id).delete();
  }
}
