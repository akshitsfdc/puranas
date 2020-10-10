import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { SoftBookConsoleComponent } from './soft-book-console/soft-book-console.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SoftBookUpdateComponent } from './soft-book-update/soft-book-update.component';
import { HardItemAddComponent } from './hard-item-add/hard-item-add.component';
import { HardItemUpdateComponent } from './hard-item-update/hard-item-update.component';
import { AddUpdateBannersComponent } from './add-update-banners/add-update-banners.component';
import { AddUpdateDisplayCollectionComponent } from './add-update-display-collection/add-update-display-collection.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavigationComponent,
    HomeComponent,
    SoftBookConsoleComponent,
    SoftBookUpdateComponent,
    LoadingDialogComponent,
    HardItemAddComponent,
    HardItemUpdateComponent,
    AddUpdateBannersComponent,
    AddUpdateDisplayCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },

      { path: 'home', component: HomeComponent ,

        children: [
          {
            path: 'softbookadd', component: SoftBookConsoleComponent
          },
          {
            path: 'softbookupdate', component: SoftBookUpdateComponent
          },
          {
            path: 'harditemadd', component: HardItemAddComponent
          },
          {
            path: 'harditemupdate', component: HardItemUpdateComponent
          },
          {
            path: 'bannerupdate', component: AddUpdateBannersComponent
          },
          {
            path: 'displayupdate', component: AddUpdateDisplayCollectionComponent
          }
        ]
     }

    ]),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
