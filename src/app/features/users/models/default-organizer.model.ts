import {FileMedia} from "../../media-file/models/file-media.model";

export interface DefaultOrganizer{
  defaultOrganizerId:string;
  defaultOrganizerIdMedia: FileMedia[];
  defaultOrganizerName:string
}
