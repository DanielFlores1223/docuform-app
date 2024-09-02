import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { FormFieldsPayload } from "global-interfaces";

export class FieldsDto implements FormFieldsPayload {
    @IsInt()
	@IsPositive()
    @ApiProperty()
    idFieldType: number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @ApiProperty()
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    @ApiProperty()
    scannedDocumentSeparator: string;
}