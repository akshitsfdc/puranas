import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SoftBook } from '../models/soft-book';
import { AngularFirestore } from '@angular/fire/firestore';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-soft-book-update',
  templateUrl: './soft-book-update.component.html',
  styleUrls: ['./soft-book-update.component.css']
})
export class SoftBookUpdateComponent implements OnInit {

  bookForm: FormGroup;
  fileToUpload: File = null;

  imageSrc: any;
  requestResult: string = "Temp";
  private coverPicUrl:string;

  bookIdChipSelectable = true;
  bookIdChipRemovable = true;
  addChipOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  bookkPartIds:string[] = [];
  searchKeywords:string[] = [];

  private loadingIndicator : MatDialogRef<any>;

  constructor(private angularFireStorage: AngularFireStorage, private fireStore: AngularFirestore, private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      language: new FormControl('Hindi', Validators.required),
      pages: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      downloadUrl: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      priority: new FormControl('1', Validators.required),
      free: new FormControl('true', Validators.required),
      videoOption: new FormControl('true', Validators.required),
      booksInPart: new FormControl('false', Validators.required),
      picUrl: new FormControl(''), 
      isOneOfThePart: new FormControl('false'),
      //removing validation of picUrl for saving previous books : to be changed after that
      bookId: new FormControl('',Validators.required),
      coverUrl: new FormControl('',Validators.required),
      fileName: new FormControl('', Validators.required)

    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.bookkPartIds.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(bookId: string): void {
    const index = this.bookkPartIds.indexOf(bookId);

    if (index >= 0) {
      this.bookkPartIds.splice(index, 1);
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

  get bookId(){
    return this.bookForm.get('bookId');
  }
  
  get coverUrl(){
    return this.bookForm.get('coverUrl');
  }
  get name(){
    return this.bookForm.get('name');
  }
  
  get language(){
    return this.bookForm.get('language');
  }
  get pages(){
    return this.bookForm.get('pages');
  }
  get price(){
    return this.bookForm.get('price');
  }
  
  get description(){
    return this.bookForm.get('description');
  }
  get downloadUrl(){
    return this.bookForm.get('downloadUrl');
  }
  get type(){
    return this.bookForm.get('type');
  }
  
  get priority(){
    return this.bookForm.get('priority');
  }
  get free(){
    return this.bookForm.get('free');
  }

  get videoOption(){
    return this.bookForm.get('videoOption');
  }
  
  get booksInPart(){
    return this.bookForm.get('booksInPart');
  }
  
  get picUrl(){
    return this.bookForm.get('picUrl');
  }
  get isOneOfThePart(){
    return this.bookForm.get('isOneOfThePart');
  }
  get fileName(){
    return this.bookForm.get('fileName');
  }
  handleFileInput(files: FileList) {

      if (files && files[0]) {
        this.fileToUpload = files.item(0);

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.fileToUpload);
    }

  }

  onSubmit(f){

    if(f.valid){
      let book:SoftBook = this.constructBookObject();
      this.saveBook(book);
    }
    //this.uploadCoverPic();
  }

  uploadCoverPic():void{

    
    let type:string = (this.type.value as string).trim();

    if(!this.fileToUpload){
      this.openSnackBar("No file selected!", "Ok");
      return;
    }
    if(type.length <= 0){
      this.openSnackBar("No type has been selected!", "Ok");
      return;
    }

    this.showLoading();

    const filePath = '/'+type+'_soft_copy_covers/'+ this.fileToUpload.name;

    const fileRef = this.angularFireStorage.ref(filePath);
    const task = fileRef.put(this.fileToUpload);

    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url=>{
            if(url){
                this.coverPicUrl = url;
                this.coverUrl.setValue(this.coverPicUrl);
                this.hideLoading();
                this.openSnackBar("Cover Picture has been uploaded to the server", "Done");
            }
         })
        } )
     )
    .subscribe();
  }

  private constructBookObject():SoftBook{

    let book:SoftBook = new SoftBook();
    let bookId:string = (this.bookId.value as string).trim(); //(+ new Date()).toString();
    let fileName:string = (this.fileName.value as string).trim();
    this.coverPicUrl = (this.coverUrl.value as string).trim();

    book.setName((this.name.value as string).trim());
    book.setDescription((this.description.value as string).trim());
    book.setDownloadUrl((this.downloadUrl.value as string).trim());
    book.setBookId(bookId);
    book.setFileName(fileName);
    book.setLanguage((this.language.value as string).trim());
    book.setFree(this.free.value === 'true');
    book.setPages(( this.pages.value as string).toString());
    book.setPicUrl(this.coverPicUrl);
    book.setPrice(this.price.value as number);
    book.setVideoOption(this.videoOption.value === 'true');
    book.setBooksInPart(this.booksInPart.value === 'true');
    book.setBookParts(this.bookkPartIds);
    book.setType((this.type.value as string).trim());
    book.setPriority(+this.priority.value);
    book.setIsOneOfThePart(this.isOneOfThePart.value === 'true');
    book.setSearchKeywords(this.searchKeywords || []);

    return book;
    
  }
  private saveBook(book:SoftBook):void{

    this.showLoading();
    this.fireStore.collection('digital_books').doc(book.getBookId())
    .set(Object.assign({}, book))
    .then(()=>{
      console.log("Book Updated!");
      this.resetControls();
      this.bookkPartIds = [];
      this.searchKeywords = [];
      this.openSnackBar("Success...! book has been updated.", "Done");
      this.hideLoading();
    })
    .catch((error)=>{
     
      this.openSnackBar("Error! could not be updated.", "Try again");
      this.hideLoading();
    })
  }
  
  searchByName(){

    let name:string = (this.name.value as string).toString().trim();

    if(name.length <= 0){
      return;
    }
    this.showLoading();
    this.fireStore.collection('digital_books', ref => ref.where('name','==',name).limit(1))
    .get()
    .toPromise()
    .then((querySnapshot)=>{
      if(querySnapshot && querySnapshot.size <= 0){
        this.openSnackBar("No result fetched!", "Ok");
      }
      querySnapshot.forEach(documentData => {
        this.bookkPartIds = [];
        this.searchKeywords = [];
        let book:SoftBook = new SoftBook();// = (documentData.data() as SoftBook);
        Object.assign(book, documentData.data())
        console.log(book.getBookId());
        this.setFormWithData(book);
      });
      this.hideLoading();
    })
    .catch((error)=>{
      this.hideLoading();
      this.openSnackBar("Error! something went wrong.", "Try again");
     
    });
  }
  nameChanging(){

    this.resetControls();
    
  }
  private resetControls(){

      this.coverPicUrl = '';
      
      this.bookId.setValue(''); 
      this.fileName.setValue('');
      this.price.setValue(0);
      this.pages.setValue(0);
      this.description.setValue('');
      this.downloadUrl.setValue('');
      this.coverUrl.setValue('');
      this.searchKeywords = [];
      this.bookkPartIds =  [];
  }
  private setFormWithData(book:SoftBook):void{

    this.coverPicUrl = book.getPicUrl();

    this.name.setValue(book.getName());
    this.language.setValue(book.getLanguage());
    this.bookId.setValue(book.getBookId()); 
    this.fileName.setValue(book.getFileName());
    this.price.setValue(book.getPrice());
    this.pages.setValue(book.getPages());
    this.description.setValue(book.getDescription());
    this.downloadUrl.setValue(book.getDownloadUrl());
    this.coverUrl.setValue(book.getPicUrl());
    this.type.setValue(book.getType());
    this.priority.setValue(book.getPriority().toString());
    this.free.setValue(book.isFree()?'true':'false');
    this.videoOption.setValue(book.isVideoOption()?'true':'false');
    this.booksInPart.setValue(book.isBooksInPart()?'true':'false');

    this.searchKeywords = book.getSearchKeywords() || [];
    this.bookkPartIds = book.getBookParts() || [];
    this.isOneOfThePart.setValue(book.isIsOneOfThePart()?'true':'false');
    
   
  }

  bookInPartsChanged(){
    let value = this.booksInPart.value === 'true';

    if(value){
      this.isOneOfThePart.setValue('false');
    }
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
