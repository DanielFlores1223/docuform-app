export interface IGetFormFileds {
    id: number;
    name: string;
    scannedDocumentSeparator: string;
}

export interface IGetDynamicFormResponse {
    id: number;
    name: string;
    slug: string;
    description: string;
    formFields: IGetFormFileds[];
}