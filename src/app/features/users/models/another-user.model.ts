import { MediaArr } from '../../media-file/models/media-arr.model';

export interface AnotherUser {
  userId?: string;
  username?: string;
  prem?: boolean;
  firstName: string;
  lastName: string;
  email?: string;
  medias?: MediaArr;
  informationAboutYourself?: string;
}
