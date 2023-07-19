import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Developers, Editors, Franchise } from '../models/games.model';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DevelopersEditorsService {
  private dbPathDev = '/developers';
  private dbPathEdit = '/editors';
  private dbPathFran = '/franchises';

  developerRef: AngularFirestoreCollection<Developers>;
  editorRef: AngularFirestoreCollection<Editors>;
  franchiseRef: AngularFirestoreCollection<Franchise>;

  constructor(private db: AngularFirestore) {
    this.developerRef = db.collection(this.dbPathDev);
    this.editorRef = db.collection(this.dbPathEdit);
    this.franchiseRef = db.collection(this.dbPathFran);
  }

  //GET ALL DATA
  getAllDevelopers(): AngularFirestoreCollection<Developers> {
    return this.db.collection(this.dbPathDev, ref => ref.orderBy('name', 'asc'));
  }

  getAllEditors(): AngularFirestoreCollection<Editors> {
    return this.db.collection(this.dbPathEdit, ref => ref.orderBy('name', 'asc'));
  }

  getAllFranchises(): AngularFirestoreCollection<Franchise> {
    return this.db.collection(this.dbPathFran, ref => ref.orderBy('name', 'asc'));
  }

  //GET ALL DATA BY ID
  getAllDevelopersById(id: string): AngularFirestoreDocument<Developers> {
    return this.developerRef.doc(id);
  }

  getAllEditorsById(id: string): AngularFirestoreDocument<Editors> {
    return this.editorRef.doc(id);
  }

  getAllFranchisesById(id: string): AngularFirestoreDocument<Franchise> {
    return this.franchiseRef.doc(id);
  }

  //CREATE DATA
  createDeveloper(developer: Developers): any {
    return this.developerRef.add({ ...developer});
  }

  createEditor(editor: Editors): any {
    return this.editorRef.add({ ...editor});
  }

  createFranchise(franchise: Franchise): any {
    return this.franchiseRef.add({ ...franchise});
  }

  //UPDATE DATA
  updateDeveloper(id: string, data: any): Promise<void> {
    return this.developerRef.doc(id).update(data);
  }

  updateEditor(id: string, data: any): Promise<void> {
    return this.editorRef.doc(id).update(data);
  }

  updateFranchise(id: string, data: any): Promise<void> {
    return this.franchiseRef.doc(id).update(data);
  }

  //DELETE DATA
  deleteDeveloper(id: string): Promise<void> {
    return this.developerRef.doc(id).delete();
  }

  deleteEditor(id: string): Promise<void> {
    return this.editorRef.doc(id).delete();
  }

  deleteFranchise(id: string): Promise<void> {
    return this.franchiseRef.doc(id).delete();
  }
}
