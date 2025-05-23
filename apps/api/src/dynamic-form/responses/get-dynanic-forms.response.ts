import { ApiProperty } from "@nestjs/swagger";
import { IGetDynamicFormsResponse } from "global-interfaces";
import { ResponseModel } from "../../common/config";

export class GetDynamicFormsResponse extends ResponseModel<IGetDynamicFormsResponse> {
    @ApiProperty()
    id: number = 0;
    @ApiProperty()
    name: string = '';
    @ApiProperty()
    description: string = '';

    constructor(attrs: IGetDynamicFormsResponse) {
        super();
        this.mapAttributes(this, attrs)
    }
}