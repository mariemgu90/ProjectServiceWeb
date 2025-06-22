import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router'; // Import RouterOutlet ici
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Ajout de RouterOutlet dans les imports
  template: `<router-outlet></router-outlet>`
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // Configuration du router
    provideAnimations(), // Pour les animations
    provideHttpClient() // Pour les requêtes HTTP
  ]
}).catch(err => console.error(err)); // Gestion des erreurs de bootstrap