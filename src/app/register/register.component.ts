import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@app/error-dialog/error-dialog.component';
import { UserForm } from '@app/models/user-form';
import { AuthService } from '@app/services/auth.service';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: UserForm = new UserForm();

  constructor(private authService: AuthService,private dialog: MatDialog,private storage: StorageService) {}

  onSubmit() {
    const { username, email, password } = this.form;

    this.storage.saveUser({ username, email, password: "***" });

    this.authService.register(username,email,password).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
        this.dialog.open(ErrorDialogComponent,{
          data:{
            message: err.error.message
          }
        });
      }
    });
  }

}
