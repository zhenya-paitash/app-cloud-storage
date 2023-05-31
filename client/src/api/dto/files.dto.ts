import { User } from "@api";

export interface FileItem {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  user: User;
  deletedAt: string | null;
  id: number;
}

export enum FileType {
  ALL = 'all',
  PHOTOS = 'photos',
  TRASH = 'trash',
}