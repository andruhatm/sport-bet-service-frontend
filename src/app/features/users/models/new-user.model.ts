import {MediaArr} from "../../media-file/models/media-arr.model";
import {FileMedia} from "../../media-file/models/file-media.model";
import {CountryModel} from "../../other-model/country.model";
import {CityModel} from "../../other-model/city.model";

export interface NewUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  createdBy?: number;
  medias: FileMedia[];
  country?: CountryModel;
  cityDTO?: CityModel;
}


