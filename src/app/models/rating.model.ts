import firebase from 'firebase/app';
import 'firebase/firestore';

export interface Rating {
  id: string;
  gameId: firebase.firestore.DocumentReference;
  username: string;
  email: string;
  photoURL: string;
  rating: number;
  comment: string;
  updatedAt: firebase.firestore.Timestamp;
}
