import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private defaultUser = 'admin';
  private defaultPassword = '1234';

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Recuperar si está logueado (guardamos algo en localStorage)
    const user = localStorage.getItem('user');
    const password = localStorage.getItem('password');

    if (user === this.defaultUser && password === this.defaultPassword) {
      return true; // ✅ Puede acceder
    }

    // ❌ No autenticado → redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
