import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateContentDto {
    @IsString()
    chapterTitle: string;

    @IsInt()
    pageNumber: number;

    @IsInt()
    ebookId: number;
}
