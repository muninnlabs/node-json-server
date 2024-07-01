import { Request, Response } from 'express';
import fs from 'fs';
import { readJsonFile } from './utils';
const tasksDbFile = './db-tasks.json';

export const createTask = async (req: Request, res: Response) => {
  const body = req.body;

  const tasks: any = await readJsonFile(tasksDbFile);
  const newID = Math.max(...tasks.map((task: { id: number }) => task.id)) + 1;

  const newTask = {
    id: newID,
    title: body.title,
    description: body.description,
    status: body.status,
  };

  tasks.push(newTask);

  fs.writeFile(tasksDbFile, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      setTimeout(() => {
        res.status(201).json(newTask);
      }, 1000);
    }
  });
};
