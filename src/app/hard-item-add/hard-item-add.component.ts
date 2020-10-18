import { HardItem } from './../models/hard-item';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hard-item-add',
  templateUrl: './hard-item-add.component.html',
  styleUrls: ['./hard-item-add.component.css']
})
export class HardItemAddComponent implements OnInit {

  bookForm: FormGroup;
  filesToUpload: File[] = [];

  imageSrc: any[] = [];   
  requestResult: string = "Temp";
  private coverPicUrl:string;

  bookIdChipSelectable = true;
  bookIdChipRemovable = true;
  addChipOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  allPictures:string[] = [];
  searchKeywords:string[] = [];
 

  private loadingIndicator : MatDialogRef<any>;


  constructor(private angularFireStorage: AngularFireStorage, private fireStore: AngularFirestore, private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      language: new FormControl('Hindi'),
      pages: new FormControl('0'),
      stock: new FormControl(0, Validators.required),
      discount: new FormControl(0, Validators.required),
      deliveryCharge: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      material: new FormControl(''),
      type: new FormControl('', Validators.required),
      priority: new FormControl('1', Validators.required),
      isBook: new FormControl('true', Validators.required),
      available: new FormControl('true', Validators.required),
      picUrl: new FormControl(''), 
      coverUrl: new FormControl('',Validators.required),
      merchant: new FormControl('',Validators.required)

    });

  }
  addItemPic(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.allPictures.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeItemPic(bookId: string): void {
    const index = this.allPictures.indexOf(bookId);

    if (index >= 0) {
      this.allPictures.splice(index, 1);
    }
  }
  addSearchKey(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.searchKeywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSearchKey(key: string): void {
    const index = this.searchKeywords.indexOf(key);

    if (index >= 0) {
      this.searchKeywords.splice(index, 1);
    }
  }
  
  get coverUrl(){
    return this.bookForm.get('coverUrl');
  }
  get name(){
    return this.bookForm.get('name');
  }
  get merchant(){
    return this.bookForm.get('merchant');
  }
  get language(){
    return this.bookForm.get('language');
  }
  get pages(){
    return this.bookForm.get('pages');
  }
  get stock(){
    return this.bookForm.get('stock');
  }
  get discount(){
    return this.bookForm.get('discount');
  }
  get deliveryCharge(){
    return this.bookForm.get('deliveryCharge');
  }
  get price(){
    return this.bookForm.get('price');
  }
  
  get description(){
    return this.bookForm.get('description');
  }
  get material(){
    return this.bookForm.get('material');
  }
  get type(){
    return this.bookForm.get('type');
  }
  
  get priority(){
    return this.bookForm.get('priority');
  }
  get isBook(){
    return this.bookForm.get('isBook');
  }
  get available(){
    return this.bookForm.get('available');
  }

  
  get picUrl(){
    return this.bookForm.get('picUrl');
  }
  
  handleFileInput(files: FileList) {
    
    

      if (files) {

        for(let i=0; i < files.length; ++i){
          this.filesToUpload.push(files[i]);

          const reader = new FileReader();
          reader.onload = e => this.imageSrc.push(reader.result);

          reader.readAsDataURL(this.filesToUpload[i]);
        }

        console.log("this.filesToUpload : "+this.filesToUpload.length);
        
    }

  }

  onSubmit(f){

    if(f.valid){
      let book:HardItem = this.constructBookObject();
      this.saveItem(book);
    }
    //this.uploadCoverPic();
  }

  uploadCoverPic():void{

    this.allPictures = [];
    
    let type:string = (this.type.value as string).trim();

    if(!this.filesToUpload){
      this.openSnackBar("No file selected!", "Ok");
      return;
    }
    if(type.length <= 0){
      this.openSnackBar("No type has been selected!", "Ok");
      return;
    }

    this.showLoading();

    for(var i = 0; i < this.filesToUpload.length; ++i){
      const filePath = '/'+type+'_hard_item_covers/'+ this.filesToUpload[i].name;

      const fileRef = this.angularFireStorage.ref(filePath);
      const task = fileRef.put(this.filesToUpload[i]);

      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url=>{
              if(url){
                  
                  
                  this.allPictures.push(url);
                  this.coverPicUrl = this.allPictures[0];;
                  this.coverUrl.setValue(this.coverPicUrl);
                  this.hideLoading();
                  this.openSnackBar("Cover Picture has been uploaded to the server no. "+i, "Done");
              }
          })
          } )
      )
      .subscribe();
    }
    
  }

  private constructBookObject():HardItem{

    let book:HardItem = new HardItem();

    let bookId:string = (+ new Date()).toString();

    this.coverPicUrl = (this.coverUrl.value as string).trim();

    book.setName((this.name.value as string).trim());
    book.setDescription((this.description.value as string).trim());
    book.setBookId(bookId);
    book.setDeliveryCharge(this.deliveryCharge.value as number); 
    book.setDiscount(this.discount.value as number);
    book.setLanguage((this.language.value as string).trim());
    book.setAvailable(this.available.value === 'true');
    book.setPages(( this.pages.value as string).toString());
    book.setPicUrl(this.coverPicUrl);
    book.setPrice(this.price.value as number);
    book.setAllPicsUrls(this.allPictures);
    book.setMerchant((this.merchant.value as string).trim());
    book.setType((this.type.value as string).trim());
    book.setPriority(+this.priority.value);
    book.setStock(this.stock.value as number);
    book.setSearchKeywords(this.searchKeywords);
    book.setIsBook(this.isBook.value === 'true');
    book.setMaterial((this.material.value as string).trim());
    
    return book;
    
  }
  private saveItem(book:HardItem):void{

    console.log("Id : "+book.getBookId()+" Name : "+book.getName()+" Type : "+book.getType());
    console.log("Cover Url : "+book.getPicUrl());
    this.showLoading();
    this.fireStore.collection('physical_books').doc(book.getBookId())
    .set(Object.assign({}, book))
    .then(()=>{
      this.openSnackBar("Success...! Item added.", "Done");
      this.resetControls();
      this.hideLoading();
    })
    .catch((error)=>{
      this.hideLoading();
      this.openSnackBar("Error! Could not save the item.", "Try Again");
    })
  }
  private resetControls():void{
    this.description.setValue('');
    
    this.name.setValue('');
    this.coverUrl.setValue(''); 
    
    this.allPictures = [];
    this.searchKeywords = [];
    this.imageSrc = [];
    this.filesToUpload = [];
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
