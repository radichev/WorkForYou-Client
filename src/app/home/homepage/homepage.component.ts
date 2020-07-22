import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }

  isLoggedIn: boolean;
  private loggedInSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

}
