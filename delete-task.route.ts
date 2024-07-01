import { Request, Response } from 'express';
import fs from 'fs';
import { readJsonFile } from './utils';
const tasksDbFile = './db-tasks.json';

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params['id'];
  const tasks: any = await readJsonFile(tasksDbFile);
  let task = tasks.find((task: { id: string }) => task.id == taskId);

  if (task && Object.keys(task).length > 0 && task.constructor === Object) {
    const filteredTasks = tasks.filter(
      (task: { id: string }) => task.id != taskId
    );
    fs.writeFile(tasksDbFile, JSON.stringify(filteredTasks, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};
