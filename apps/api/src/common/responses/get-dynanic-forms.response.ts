import { ApiProperty } from "@nestjs/swagger";
import { IGetDynamicFormsResponse } from "global-interfaces";

export class GetDynamicFormsResponse implements IGetDynamicFormsResponse {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
}