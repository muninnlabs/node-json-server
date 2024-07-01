import { Request, Response } from 'express';
import fs from 'fs';
import { readJsonFile } from './utils';
const tasksDbFile = './db-tasks.json';

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params['id'];
  const tasks: any = await readJsonFile(tasksDbFile);

  let task = tasks.find((task: { id: string }) => task.id == taskId);

  const body = req.body;

  if (task && Object.keys(task).length > 0 && task.constructor === Object) {
    tasks.map(
      (task: {
        id: string;
        description: string;
        title: string;
        status: string;
      }) => {
        if (task.id == taskId) {
          task.title = body.title;
          task.description = body.description;
          task.status = body.status;
        }
      }
    );

    fs.writeFile(tasksDbFile, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        task = tasks.find((task: { id: string }) => task.id == taskId);
        console.log('task update', task);
        setTimeout(() => {
          task && Object.keys(task).length > 0 && task.constructor === Object
            ? res.status(200).json(task)
            : res.status(404).json({ message: 'Task not found' });
        }, 1000);
      }
    });
  } else {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
};
