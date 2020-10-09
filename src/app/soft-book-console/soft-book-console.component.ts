
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SoftBook } from '../models/soft-book';
import { AngularFirestore } from '@angular/fire/firestore';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-soft-book-console',
  templateUrl: './soft-book-console.component.html',
  styleUrls: ['./soft-book-console.component.css']
})
export class SoftBookConsoleComponent implements OnInit {


  
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

  ngOnInit() {

    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      language: new FormControl('Hindi', Validators.required),
      pages: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      downloadUrl: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      priority: new FormControl('1', Validators.required),
      free: new FormControl('', Validators.required),
      videoOption: new FormControl('true', Validators.required),
      booksInPart: new FormControl('false', Validators.required),
      picUrl: new FormControl(''), 
      isOneOfThePart: new FormControl('false'),
      coverUrl: new FormControl('',Validators.required)

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
  handleFileInput(files: FileList) {
    
    console.log("fileToUpload : "+this.fileToUpload);

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

    let bookId:string = (+ new Date()).toString();

    this.coverPicUrl = (this.coverUrl.value as string).trim();

    book.setName((this.name.value as string).trim());
    book.setDescription((this.description.value as string).trim());
    book.setDownloadUrl((this.downloadUrl.value as string).trim());
    book.setBookId(bookId);
    book.setFileName(bookId);
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
    book.setSearchKeywords(this.searchKeywords);
    return book;
    
  }
  private saveBook(book:SoftBook):void{
    this.fireStore.collection('digital_books').doc(book.getBookId())
    .set(Object.assign({}, book))
    .then(()=>{
      this.openSnackBar("Success...! Book saved.", "Done");
      this.resetControls();
    })
    .catch((error)=>{
      this.openSnackBar("Error! Could not save the book.", "Try Again");
    })
  }
  private resetControls():void{
    this.description.setValue('');
    this.downloadUrl.setValue('');
    this.coverUrl.setValue(''); 
    this.language.setValue('');
    this.free.setValue('');
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
