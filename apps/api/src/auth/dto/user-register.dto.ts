import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IRegisterUserPayload } from 'global-interfaces';

export class UserRegisterDto implements IRegisterUserPayload {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @ApiProperty()
    name: string;

    @IsString()
    @IsEmail()
    @MaxLength(255)
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    password: string;

}