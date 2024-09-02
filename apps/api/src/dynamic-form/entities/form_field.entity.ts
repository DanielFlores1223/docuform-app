import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DynamicForm } from "./dynamic-form.entity";
import { FieldType } from "./field_type.entity";

@Entity('form_fields')
export class FormField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { length: 50 })
    name: string;

    @ManyToOne(() => DynamicForm, (dynamicForm) => dynamicForm.formFields)
    @JoinColumn({ name: 'id_dynamic_form' })
    dynamicForm: DynamicForm

    @ManyToOne(() => FieldType, (fieldType) => fieldType.formFields)
    @JoinColumn({ name: 'id_field_type' })
    fieldType: FieldType
}