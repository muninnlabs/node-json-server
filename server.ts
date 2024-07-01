// import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { getAllTasks, getTasksById } from './get-tasks.route';

const app: Express = express();

import cors from 'cors';
import { authUser } from './auth.route';
import { createCompany, getCompanies, getCompanyById, getCompanyByName } from './companies.route';
import { createTask } from './create-task.route';
import { createUser } from './create-user.route';
import { deleteTask } from './delete-task.route';
import { updateTask } from './update-task.route';

app.use(cors({ origin: true }));

app.use(express.json());

app.route('/api/tasks').get(getAllTasks);
app.route('/api/task/:id').get(getTasksById);
app.route('/api/update/:id').put(updateTask);
app.route('/api/delete/:id').delete(deleteTask);
app.route('/api/create/').post(createTask);
app.route('/api/auth/').post(authUser);
app.route('/api/createUser/').post(createUser);
app.route('/api/companies').get(getCompanies);
app.route('/api/company/:id').get(getCompanyById);
app.route('/api/company/:name').get(getCompanyByName);
app.route('/api/create-company').post(createCompany);


const httpServer: any = app.listen(9000, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
      httpServer.address().port
  );
});
