import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Rating } from '../models/rating.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private firestore: AngularFirestore) {}

  getAllComents(): AngularFirestoreCollection<Rating> {
    return this.firestore.collection<Rating>('reviews');
  }

  addRating(rating: Rating): Promise<DocumentReference> {
    return this.firestore.collection<Rating>('reviews').add({ ...rating});
  }

  getRatingById(id: string): AngularFirestoreDocument<Rating> {
    return this.firestore.collection<Rating>('reviews').doc(id);
  }

  updateComment(id: string, data: any): Promise<void> {
    return this.firestore.collection('reviews').doc(id).update(data);
  }

  getCommentsByGameId(gameId: string): Observable<Rating[]> {
    const gameIdRef = this.firestore.doc(gameId).ref;

    return this.firestore.collection<Rating>('reviews', ref =>
      ref.where('gameId', '==', gameIdRef).where('comment', '!=', '')
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data();
          return {...data, id  } as Rating;
        });
      })
    );
  }


  getAverageRating(gameId: string): Observable<number> {
    const gameIdRef = this.firestore.doc(gameId).ref;
    return this.firestore
      .collection<Rating>('reviews', ref => ref.where('gameId', '==', gameIdRef))
      .valueChanges()
      .pipe(
        map(ratings => {
          const totalRatings = ratings.length;
          const totalPoints = ratings.reduce((sum, rating) => sum + rating.rating, 0);
          return totalPoints / totalRatings;
        })
      );
  }

  checkEmailExists(gameId: string, email: string): Promise<boolean> {
    const query = this.firestore.collection<Rating>('reviews', ref => ref
      .where('gameId', '==', gameId)
      .where('email', '==', email)
    );

    return query.get().toPromise().then((querySnapshot) => {
      if (querySnapshot && !querySnapshot.empty) {
        // Si se obtuvieron resultados, significa que el correo ya existe
        return true;
      } else {
        // Si no se encontraron resultados, el correo no existe
        return false;
      }
    });
  }

}
