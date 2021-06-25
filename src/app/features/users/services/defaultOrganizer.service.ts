import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DefaultOrganizer } from '../models/default-organizer.model';
import { FileMedia } from '../../media-file/models/file-media.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultOrganizerService {
  getDefaultOrganizer(): Observable<DefaultOrganizer> {
    const media: FileMedia[] = [
      {
        fileName: 'AQK9llTnbmtTZv9yzw44-JlSGpZzvvb8eFT9MK-hwNljIrF0-0xi8zlEfOrnNB0S90B-kdaN_mhyxlo.jpg',
        categories: {
          categoryFileId: 1
        }
      }
    ];
    return of({
      //поменять id на настоящий
      defaultOrganizerId: '123',
      defaultOrganizerName: 'SmartEvent bot',
      defaultOrganizerIdMedia: media
    });
  }
}
