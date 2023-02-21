import { Component, OnInit, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously, getAuth, updateProfile, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, getDoc, Firestore, increment, orderBy, query, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';

export type Customers = {
  name: string,
  upboats: number,
  id: string,
  hasPendingWrites: boolean,
};

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  user: any = {};
  message: any;

  constructor(
    private readonly firestore: Firestore,
    @Optional() public auth: Auth
  ) {
    this.getProfile();
  }

  ngOnInit() {}
 
  // ℹ️ https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_1
  async getProfile(){
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const docRef = doc(this.firestore, 'customers', uid);
      const docSnap = await getDoc(docRef);
      this.user = docSnap.data();
      console.log("PROFILE:", this.user);
    } else {
      console.log("getProfile() | Null");
      return;
    }
  }
  // ℹ️ https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_8
  async update(){
    this.message = "Updating...";
    const user = this.auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(this.firestore, 'customers', uid);
      updateDoc(docRef, {
        bio: this.user.bio,
        link: this.user.link,
        tags: this.user.tags,
        // Set Google user data on firestore
        displayName: user.displayName,
        photoURL: user.photoURL,
      }).then(() => {
        this.message = "Updated";
      }).catch((error) => {
        console.log(error)
      })

      // Update Profile data retrieved from Google on my Firebase (not firestore)
      // const auth = getAuth();
      // updateProfile(auth.currentUser!, {
      //   displayName: user.displayName,
      //   photoURL: user.photoURL,
      // }).then(() => {
      //   this.message = "Updated";
      // }).catch((error) => {
      //   console.log(error)
      // });

    } else {
      console.log("update() | No user");
      return;
    }
  }

}