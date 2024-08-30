import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "global-interfaces";

export class ApiRestResponseModel<T> implements IApiResponse<T> {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    path: string;
    @ApiProperty()
    statusCode: number;
    @ApiProperty({
        nullable: true
    })
    error?: string | null;
    @ApiProperty({ example: 'string | string[]' })
    message: string | string[];
    @ApiProperty()
    result?: T;
}