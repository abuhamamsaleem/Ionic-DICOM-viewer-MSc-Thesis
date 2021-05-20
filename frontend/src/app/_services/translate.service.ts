import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  data: any = {};
  selectedLanguage = 'en';

  constructor(private http: HttpClient, private storage: Storage) {}

  async use(lang: string): Promise<{}> {
    const storageLang = await this.storage.get('lang');
    lang = lang ? lang : storageLang ? storageLang : 'en';
    return new Promise<{}>((resolve) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this.selectedLanguage = lang;
      this.storage.set('lang', this.selectedLanguage);
      this.http.get<{}>(langPath).subscribe(
        (translation) => {
          this.data = Object.assign({}, translation || {});
          return resolve(this.data);
        },
        () => {
          this.data = {};
          return resolve(this.data);
        }
      );
    });
  }

  get(): string {
    return this.selectedLanguage;
  }
}
