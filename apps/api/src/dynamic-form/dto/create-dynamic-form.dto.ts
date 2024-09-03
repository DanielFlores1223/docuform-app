import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { FieldsDto } from "./fields.dto";
import { ICreateDynamicFormPayload } from "global-interfaces";

export class CreateDynamicFormDto implements ICreateDynamicFormPayload {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @ApiProperty()
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    @ApiProperty()
    description: string;

    @IsArray()
	@ArrayMinSize(1)
	@ValidateNested()
	@Type(() => FieldsDto)
    @ApiProperty({ isArray: true, type: FieldsDto })
    fields: FieldsDto[]
}


