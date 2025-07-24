import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateProfileDto {
    @IsString()
    fullName: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    dob?: string;

    @IsUUID()
    userId: string;
}
