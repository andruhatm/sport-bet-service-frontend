import {FileMedia} from "../../media-file/models/file-media.model";

export interface MinimalInformationUser{
  userId?: string
  username?: string;
  firstName?: string;
  lastName?: string;
  medias?: FileMedia[];
  eventId?: string;
  prem?:boolean;
}
