export class CreateUserBookDto {
  userId: number;
  ebookId: number;
  isDownloaded?: boolean;
  isViewed?: boolean;
}