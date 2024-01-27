import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasks(filterTask: GetTasksFilterDto): Task[] {
        let tasks = this.getAllTasks();
        const { status, search } = filterTask;

        if (status) {
            tasks = tasks.filter(tasks => tasks.status === status)
        }
        if (search) {
            tasks = tasks.filter(tasks => tasks.title.includes(search) || tasks.description.includes(search))
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`task not found with id:${id}`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;

    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status;
        return task;

    }
}
