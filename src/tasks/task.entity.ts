import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";

export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus; 
}