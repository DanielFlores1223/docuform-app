import { ApiProperty } from "@nestjs/swagger";
import { IGetFormFileds as IGetFormFields, IGetDynamicFormResponse } from "global-interfaces";

class GetFormFieldsResponse implements IGetFormFields {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    scannedDocumentSeparator: string;
}

export class GetDynamicFormResponse implements IGetDynamicFormResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty({ isArray: true, type: GetFormFieldsResponse })
    formFields: GetFormFieldsResponse[];
}

