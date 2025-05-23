import { ApiProperty } from "@nestjs/swagger";
import { IGetFormFileds as IGetFormFields, IGetDynamicFormResponse } from "global-interfaces";
import { ResponseModel } from "../../common/config";

export class GetFormFieldsResponse extends ResponseModel<IGetFormFields> {
    @ApiProperty()
    id: number = 0;
    @ApiProperty()
    name: string = '';
    @ApiProperty()
    scannedDocumentSeparator: string = '';

    constructor(attrs: IGetFormFields) {
        super();
        this.mapAttributes(this, attrs);
    }
}

export class GetDynamicFormResponse extends ResponseModel<IGetDynamicFormResponse> {
    @ApiProperty()
    id: number = 0;
    @ApiProperty()
    slug: string = '';
    @ApiProperty()
    name: string = '';
    @ApiProperty()
    description: string = '';
    @ApiProperty({ isArray: true, type: GetFormFieldsResponse })
    formFields: GetFormFieldsResponse[] = [];

    constructor(attrs: IGetDynamicFormResponse) {
        super();
        this.mapAttributes(this, attrs);
    }
}

