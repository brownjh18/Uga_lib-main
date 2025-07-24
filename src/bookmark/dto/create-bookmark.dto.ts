export class CreateBookmarkDto {
  userId: string;
  ebookId: number;
  pageNumber: number;
  note?: string;
}