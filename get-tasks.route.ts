import { Request, Response } from 'express';
import { readJsonFile } from './utils';

const tasksDbFile = './db-tasks.json';

export const getAllTasks = (req: Request, res: Response) => {
  readJsonFile(tasksDbFile)
    .then((tasks: any) => {
      setTimeout(() => {
        res.status(200).json({ tasks });
      }, 1000);
    })
    .catch((error) => {
      console.log('getAllTasks error', error);
      res.status(500).json({ message: 'An error occurred' });
    });
};

export const getTasksById = async (req: Request, res: Response) => {
  const taskId = req.params['id'];
  const tasks: any = await readJsonFile(tasksDbFile);
  const task = tasks.find((task: { id: string }) => task.id == taskId);

  console.log('getTaskById', task);

  setTimeout(() => {
    console.log();
    task && Object.keys(task).length > 0 && task.constructor === Object
      ? res.status(200).json(task)
      : res.status(404).json({ message: 'Task not found' });
  }, 1000);
};
