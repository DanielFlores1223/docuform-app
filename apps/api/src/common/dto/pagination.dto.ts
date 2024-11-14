import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsInt()
    @IsPositive()
    @ApiProperty({ example: 10 })
    limit: number;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 0 })
    offset: number
}