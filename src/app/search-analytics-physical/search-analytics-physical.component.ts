import { SearchAnalytics } from './../models/search-analytics';
import { Component, OnInit } from '@angular/core';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';;
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-analytics-physical',
  templateUrl: './search-analytics-physical.component.html',
  styleUrls: ['./search-analytics-physical.component.css']
})
export class SearchAnalyticsPhysicalComponent implements OnInit {

  searchAnalyticsDataSet:SearchAnalytics[] = [];
  
  private limit:number = 100;

  private loadingIndicator : MatDialogRef<any>;
  
  constructor(private fireStore: AngularFirestore, private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData() {

    this.showLoading();

    this.fireStore.collection('search_analytics_physical', ref => ref.limit(this.limit).orderBy('timestamp', 'desc')).get()
    .toPromise()
    .then((querySnapshot)=>{
      this.hideLoading();
      if(querySnapshot && querySnapshot.size <= 0){
        this.openSnackBar("No result fetched!", "Ok");
        return;
      }

      querySnapshot.forEach(documentData => {

        let searchItem: SearchAnalytics = new SearchAnalytics();
        Object.assign(searchItem, documentData.data())

        this.searchAnalyticsDataSet.push(searchItem);

      });

     
    })
    .catch((error)=>{
      this.hideLoading();
      this.openSnackBar("Error! something went wrong.", "Try again");
     
    });

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
