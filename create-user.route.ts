import { Request, Response } from 'express';
import fs from 'fs';
import { cyrb53, readJsonFile } from './utils';

const userDbFile = './db-user.json';

export const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const userDb: any = await readJsonFile(userDbFile);
  const user = userDb.find((user: any) => {
    return user.email == body.email;
  });

  console.log('createUser', req.body);

  const userHashCode = cyrb53(body.email);

  if (user) {
    res.status(409).json({ message: 'User already exists' });
  } else {
    const newID =
      Math.max(...userDb.map((user: { id: number }) => user.id)) + 1;
    const newUser = {
      id: newID,
      email: body.email,
      password: body.password,
      userHashCode,
    };

    userDb.push(newUser);

    fs.writeFile(userDbFile, JSON.stringify(userDb, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        setTimeout(() => {
          res.status(201).json(newUser);
        }, 1000);
      }
    });
  }
};
