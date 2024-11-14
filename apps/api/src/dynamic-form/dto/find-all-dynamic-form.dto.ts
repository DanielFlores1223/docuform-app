import { ApiProperty,  } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto";

export class FindAllDynamicFormDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    search?: string;
}