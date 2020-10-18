import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private firebaseAuth: AuthService, private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
    this.openSoftBookConsole();
  }

  openSoftBookConsole(){
    this.router.navigate(['softbookadd'], { relativeTo: this.route });
  }
  openSoftBookUpdate(){
    this.router.navigate(['softbookupdate'], { relativeTo: this.route });
  }
  openHardItemAdd(){
    this.router.navigate(['harditemadd'], { relativeTo: this.route });
  }
  openHardItemUpdate(){
    this.router.navigate(['harditemupdate'], { relativeTo: this.route });
  }
  openBannerAddUpdate(){
    this.router.navigate(['bannerupdate'], { relativeTo: this.route });
  }
  openDisplayAddUpdate(){
    this.router.navigate(['displayupdate'], { relativeTo: this.route });
  }
  openSearchAnalytics(){
    this.router.navigate(['searchanalytics'], { relativeTo: this.route });
  }
  openSearchAnalyticsPhysical(){
    this.router.navigate(['searchanalyticsphysical'], { relativeTo: this.route });
  }
  logout(){
    this.firebaseAuth.signOut()
    .then(() => {
      this.router.navigate([''], { relativeTo: this.route });
    })
    .catch(() => {
      console.log("Could not log you out try again later!");
    });
    
  }
}
