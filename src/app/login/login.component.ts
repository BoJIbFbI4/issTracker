import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  triggerLogin = () => this.authService.auth();
}
