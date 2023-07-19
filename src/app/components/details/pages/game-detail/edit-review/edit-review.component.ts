import { Component, Inject, OnInit } from '@angular/core';
import { Rating } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';
import { AuthServiceTsService } from 'src/app/services/auth.service.ts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as dayjs from 'dayjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  editRatingForm: FormGroup;
  userDataEdit: any;
  rating: number = 0;
  public ratingData?: Rating;
  values: number[] = [0, 1, 2, 3, 4, 5];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ratingService: RatingService,
    public authService: AuthServiceTsService,
    private afAuth: AngularFireAuth
  ) {
    this.editRatingForm = new FormGroup({
      comment: new FormControl('')
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userDataEdit = user;
        this.editRatingForm = new FormGroup({
          username: new FormControl(this.userDataEdit.displayName, Validators.required),
          email: new FormControl(this.userDataEdit.email, Validators.required),
          photoURL: new FormControl(this.userDataEdit.photoURL, Validators.required),
          rating: new FormControl('', Validators.required),
          comment: new FormControl(''),
          updatedAt: new FormControl(dayjs().toDate())
        });
        localStorage.setItem('user', JSON.stringify(this.userDataEdit));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  ngOnInit(): void {
    let ratingId = this.data;
    this.ratingService.getRatingById(ratingId).valueChanges().subscribe((data: Rating | undefined) => {
      this.ratingData = data;
      // console.log(this.ratingData);

      this.editRatingForm.patchValue({
        rating: this.ratingData?.rating,
        comment: this.ratingData?.comment
      });
    });
  }

  setRatingS(value: number): void {
    if (this.userDataEdit) {
      this.rating = value || 0;
      this.editRatingForm.patchValue({
        rating: this.ratingData?.rating
      });
    }
  }

  onUpdate(): void {
    let id = this.data;
    let data = this.editRatingForm.value;
    // console.log(id, data);
    this.ratingService.updateComment(id, data)
    .then(() => {
      console.log("Se ha actualizado tu comentario");
    })
    .catch(err => console.log(err));
  }

}
