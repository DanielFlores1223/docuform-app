import { User } from "src/auth/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";

@Entity('dynamic-forms')
export class DynamicForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { length: 100 })
    name: string;

    @Column('character varying', { length: 255 })
    description: string;

    @ManyToOne(() => User, (user) => user.dymanicForms)
    @JoinColumn({ name: 'id_user' })
    user: User

    @OneToMany(() => FormField, (formField) => formField.dynamicForm)
    formFields: FormField;
}
