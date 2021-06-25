export interface Picture {
  id: number;
  name: string;
  type: string;
  data: string;
}

export interface PictureCreate {
  name: string;
  type: string;
  data: string;
}
