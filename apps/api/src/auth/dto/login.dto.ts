import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { ILoginPayload } from "global-interfaces";

export class LoginDto implements ILoginPayload {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    password: string;
}