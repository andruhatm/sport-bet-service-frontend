import { ExistingUser } from '../../users/models/existing-user.model';
import { MediaArr } from '../../media-file/models/media-arr.model';

export interface ExistingEvent {
  eventId: string;
  id: string;
  date: string;
  name: string;
  home: string;
  away: string;
  dateTime: string;
  place: string;
  creation_date?: string;
  briefDescription: string;
  fullDescription: string;
  usersDTO: ExistingUser[];
  medias?: MediaArr;
  securityUrl?: string;
  rating: number;
  membersCount: number;


}
