
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';


import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Banner } from '../models/banner';
import { BannerCollection } from '../models/banner-collection';

@Component({
  selector: 'app-add-update-banners',
  templateUrl: './add-update-banners.component.html',
  styleUrls: ['./add-update-banners.component.css']
})
export class AddUpdateBannersComponent implements OnInit {

  bannerCollection:Banner[] = [];
  updateButtonShouldEnable:boolean = false;

  private loadingIndicator : MatDialogRef<any>;

  constructor(private angularFireStorage: AngularFireStorage, private fireStore: AngularFirestore, private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadBannerCollection();
  }

  loadBannerCollection(){

    
    this.showLoading();
    this.fireStore.collection('app_info').doc('meta_data')
    .get()
    .toPromise()
    .then(document => {

      this.hideLoading();
      this.openSnackBar("Success...!..data loaded.", "Done");
      console.log(document?.data()?.bannerUrls?.length);
      for(let i = 0; i < document?.data()?.bannerUrls?.length; ++i){
        let banner:Banner = new Banner();
        Object.assign(banner, document?.data()?.bannerUrls[i]);
        this.bannerCollection.push(banner);
      }
      this.updateButtonShouldEnable = true;
    } )
     .catch((error)=>{
      this.hideLoading();
      this.updateButtonShouldEnable = false;
      this.openSnackBar("failed! could not load data.", "Try Again");
    });
    
  }
  removeBanner(position){

    this.bannerCollection.splice(position, 1);
    
  }
  addBanner(position){
    let banner:Banner = new Banner();
    this.bannerCollection.splice(position, 0, banner);
  }
  removeInCategory(display, position){
    display.getBookDisplaySliders().splice(position, 1);
  }

  updateDisplay(){
    
    if(!this.bannerCollection || this.bannerCollection?.length <= 0){
      this.openSnackBar("Invalid data!", "Try Again");
      return;
    }

    let collection:BannerCollection = new BannerCollection();

    collection.setBannerUrls(this.bannerCollection);

    this.showLoading();
    this.fireStore.collection('app_info').doc('meta_data')
    .set(JSON.parse(JSON.stringify(Object.assign({}, collection))), {merge:true})
    .then(()=>{
      this.hideLoading();
      this.openSnackBar("Success....!...server updated.", "Done");
    })
    .catch((error)=>{
      this.hideLoading();
      this.openSnackBar("failed! error occured could not save", "Try Again");
    })
  }

  handleFileInput(files: FileList, banner:Banner) {


      if (files && files[0]) {
        let file = files.item(0);
        // const reader = new FileReader();
        // reader.onload = e => this.imageSrc = reader.result;
        // reader.readAsDataURL(this.fileToUpload);
        this.uploadCoverPic(file, banner);
    }

  }

  uploadCoverPic(file: File, banner:Banner):void{


    if(!file){
      this.openSnackBar("No file selected!", "Ok");
      return;
    }

    this.showLoading();

    const filePath = 'homeSliderImages/'+ file.name;

    const fileRef = this.angularFireStorage.ref(filePath);
    const task = fileRef.put(file);

    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url=>{
            if(url){
                banner.setImageUrl(url);
                this.hideLoading();
                this.openSnackBar("Banner Picture has been uploaded to the server", "Done");
            }
         })
        } )
     )
    .subscribe();
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
