import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { initializeApp } from "firebase/app";



platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));
