import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';


import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookDisplay } from '../models/book-display';
import { DisplaySlider } from '../models/display-slider-model';
import { BookDisplayCollection } from '../models/book-display-collection';

@Component({
  selector: 'app-add-update-display-collection',
  templateUrl: './add-update-display-collection.component.html',
  styleUrls: ['./add-update-display-collection.component.css']
})
export class AddUpdateDisplayCollectionComponent implements OnInit {

  

  bookDisplayCollection:BookDisplay[] = [];
  updateButtonShouldEnable:boolean = false;

  private loadingIndicator : MatDialogRef<any>;

  constructor(private angularFireStorage: AngularFireStorage, private fireStore: AngularFirestore, private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadDisplayCollection();
  }

  loadDisplayCollection(){

    
    this.showLoading();
    this.fireStore.collection('app_info').doc('meta_data')
    .get()
    .toPromise()
    .then(document => {

      this.hideLoading();
      this.openSnackBar("Success...!..data loaded.", "Done");
      console.log(document?.data()?.bookDisplayCollection?.length);
      for(let i = 0; i < document?.data()?.bookDisplayCollection?.length; ++i){
        let bookDisplay:BookDisplay = new BookDisplay();
        Object.assign(bookDisplay, document?.data()?.bookDisplayCollection[i]);
        this.bookDisplayCollection.push(bookDisplay);
      }
      this.updateButtonShouldEnable = true;
    } )
     .catch((error)=>{
      this.hideLoading();
      this.updateButtonShouldEnable = false;
      this.openSnackBar("failed! could not load data.", "Try Again");
    });
    
  }

  removeCategory(position){
    this.bookDisplayCollection.splice(position, 1);
  }
  addCategory(position){
    let bookDisplay:BookDisplay = new BookDisplay();
    let displaySliders:DisplaySlider[] = [];
    bookDisplay.setBookDisplaySliders(displaySliders);
    bookDisplay.setHeaderTitle('');
    this.bookDisplayCollection.splice(position, 0 , bookDisplay);
  }
  removeInCategory(display, position){
    display.getBookDisplaySliders().splice(position, 1);
  }
  addInCategory(bookDisplay, position){

    console.log("bookDisplay: "+JSON.stringify(bookDisplay));

    let displaySlider: DisplaySlider = new DisplaySlider();
    displaySlider.setName('');
    displaySlider.setBookId('');
    displaySlider.setPicUrl('');
    displaySlider.setType('');

    let display:BookDisplay = new BookDisplay();

    Object.assign(display, bookDisplay);

    console.log("bookDisplay: "+JSON.stringify(display.getBookDisplaySliders()));

    display.getBookDisplaySliders().splice(position, 0, displaySlider);
  }

  updateDisplay(){
    
    if(!this.bookDisplayCollection || this.bookDisplayCollection?.length <= 0){
      this.openSnackBar("Invalid data!", "Try Again");
      return;
    }

    let bookDisplayCollection:BookDisplayCollection = new BookDisplayCollection();

    bookDisplayCollection.setBookDisplayCollection(this.bookDisplayCollection);

    this.showLoading();
    this.fireStore.collection('test').doc('meta')
    .set(JSON.parse(JSON.stringify(Object.assign({}, bookDisplayCollection))), {merge:true})
    .then(()=>{
      this.hideLoading();
      this.openSnackBar("Success....!...server updated.", "Done");
    })
    .catch((error)=>{
      this.hideLoading();
      this.openSnackBar("failed! error occured could not save", "Try Again");
    })
  }

  private showLoading():void{
    this.loadingIndicator = this.matDialog.open(LoadingDialogComponent, {disableClose: true});
  }
  private hideLoading():void{
    if(this.loadingIndicator){
      this.loadingIndicator.close();
    }   

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
