import { FormFieldsPayload } from "./form-fields.payload";

export interface CreateDynamicFormPayload {
    name: string;
    description: string;
    fields: FormFieldsPayload[]
}