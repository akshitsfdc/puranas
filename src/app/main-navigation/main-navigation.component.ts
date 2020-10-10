import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute) {}

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
}
