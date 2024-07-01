import { Request, Response } from 'express';
import { readJsonFile } from './utils';

const userDbFile = './db-user.json';

export const authUser = async (req: Request, res: Response) => {
  const body = req.body;
  const userDb: any = await readJsonFile(userDbFile);
  const user = userDb.find((user: any) => {
    console.log('find', user.email, body.email);
    return user.email == body.email;
  });

  console.log('authUser', user);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else if (user && user.password !== body.password) {
    res.status(401).json({ message: 'Invalid password' });
  } else if (user.password === body.password) {
    res.status(200).json(user);
  }
};
