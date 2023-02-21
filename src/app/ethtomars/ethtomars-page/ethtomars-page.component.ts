import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './ethtomars-page.component.html',
  styleUrls: ['./ethtomars-page.component.scss']
})
export class EthtomarsPageComponent implements OnInit {

  constructor(
    private firestore: Firestore,
  ) {}

  // coursesCollection: AngularFirestoreCollection<Course>;
  // coursesObservable: Observable<Course[]>;

  ngOnInit() {
    // this.coursesCollection = this.firestore.collection('courses');
    // this.coursesObservable = this.coursesCollection.valueChanges();
  }

}
