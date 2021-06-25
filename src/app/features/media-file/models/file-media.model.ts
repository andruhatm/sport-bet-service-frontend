export interface FileMedia {
  mediaUuid?: string;
  fileName: string;
  categories: Categories;
  width?:number;
  height?: number;
  securityUrl?: string;
}

export interface Categories {
  categoryFileId: number;
  categoryFileName?: string;
}
