import { FormFieldsPayload } from "./form-fields.payload";

export interface ICreateDynamicFormPayload {
    name: string;
    description: string;
    fields: FormFieldsPayload[]
}