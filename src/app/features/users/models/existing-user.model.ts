import { MediaArr } from '../../media-file/models/media-arr.model';
import { Role } from '../../../core/auth/role.model';
import { Picture } from '../../events/models/picture';

export interface ExistingUser {
  pictureId?: number;
  picture?: Picture;
  id?: string;
  balance: number;
  active: boolean;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  prem?: boolean;
  lastDatePrem?: string;
  roles?: [Role];
  createdAt?: string;
  createdBy?: number;
  medias?: MediaArr;
}
