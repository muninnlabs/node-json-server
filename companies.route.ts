import { Request, Response } from "express";
import fs from "fs";
import { readJsonFile } from "./utils";

const companyDbFile = "./db-companies.json";

export const getCompanies = async (req: Request, res: Response) => {
  const body = req.body;
  const companyDb: any = await readJsonFile(companyDbFile);
  console.log("getCompanies", companyDb);
  res.status(200).json(companyDb);
};

export const getCompanyById = async (req: Request, res: Response) => {
  const companyId = req.params["id"];
  const companyDb: any = await readJsonFile(companyDbFile);
  const company = companyDb.find(
    (company: { id: string }) => company.id == companyId
  );

  console.log("getCompanyId", company);

  setTimeout(() => {
    console.log("company by id", company);
    company && Object.keys(company).length > 0 && company.constructor === Object
      ? res.status(200).json(company)
      : res.status(404).json({ message: "Company not found" });
  }, 1000);
};

export const getCompanyByName = async (req: Request, res: Response) => {
  const companyName = req.params["name"];
  const companyDb: any = await readJsonFile(companyDbFile);
  const company = companyDb.find(
    (company: { name: string }) =>
      company.name.toLowerCase() == companyName.toLocaleLowerCase()
  );

  setTimeout(() => {
    console.log();
    company && Object.keys(company).length > 0 && company.constructor === Object
      ? res.status(200).json(company)
      : res.status(404).json({ message: "Company not found" });
  }, 1000);
};

export const createCompany = async (req: Request, res: Response) => {
  const body = req.body;
  const companyDb: any = await readJsonFile(companyDbFile);
  const company = companyDb.find((company: any) => {
    return company.name == body.name;
  });

  console.log("createCompany", req.body, company?.name, body.name);

  if (company) {
    res.status(409).json({ message: "Company already exists", id: company.id });
  } else {
    const newID =
      Math.max(...companyDb.map((company: { id: number }) => company.id)) + 1;
    const newCompany = {
      name: body.name,
      id: newID,
    };

    companyDb.push(newCompany);

    fs.writeFile(companyDbFile, JSON.stringify(companyDb, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        setTimeout(() => {
          res.status(201).json(newCompany);
        }, 1000);
      }
    });
  }
};
