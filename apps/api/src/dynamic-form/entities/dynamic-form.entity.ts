import { User } from "src/auth/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { FormField } from "./form_field.entity";

@Entity('dynamic-forms')
@Unique('unique_name_user', ['name', 'user'])
export class DynamicForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { length: 100 })
    name: string;

    @Column('character varying', { length: 255 })
    slug: string;

    @Column('character varying', { length: 255 })
    description: string;

    @ManyToOne(() => User, (user) => user.dymanicForms)
    @JoinColumn({ name: 'id_user' })
    user: User

    @OneToMany(() => FormField, (formField) => formField.dynamicForm, { cascade: true })
    formFields: FormField[];
}
