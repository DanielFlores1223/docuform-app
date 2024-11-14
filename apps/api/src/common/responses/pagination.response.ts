import { ApiProperty } from "@nestjs/swagger";
import { IPaginationResponse } from "global-interfaces";

export class PaginationResponse<T> implements IPaginationResponse<T> {
    @ApiProperty()
    total: number;
    @ApiProperty()
    records: T[];
}