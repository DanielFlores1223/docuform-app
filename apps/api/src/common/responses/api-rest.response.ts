import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "global-interfaces";

export class ApiRestResponseModel<T> implements IApiResponse<T> {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    path: string;
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    error?: string;
    @ApiProperty()
    message: string | string[];
    @ApiProperty()
    result?: T;
}