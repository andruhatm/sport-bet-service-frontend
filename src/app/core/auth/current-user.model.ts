import { Role } from './role.model';
import { MediaArr } from '../../features/media-file/models/media-arr.model';
import { Picture } from '../../features/events/models/picture';

export interface LoggedUser {
  readonly pictureId?: number;
  readonly picture?: Picture;
  readonly id?: string;
  readonly authenticated: true;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly medias?: MediaArr;

  hasRole(role: Role): boolean;
}

export interface Anonymous {
  readonly authenticated: false;

  hasRole(role: Role): boolean;
}

export type CurrentUser = LoggedUser | Anonymous;
