import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";

@Entity('field_types')
export class FieldType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { length: 100 })
    name: string;

    @OneToMany(() => FormField, (formField) => formField.fieldType)
    formFields: FormField;
}