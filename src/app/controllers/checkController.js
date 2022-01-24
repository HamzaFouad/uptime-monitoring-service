import { validationResult } from "express-validator";
import {
  createCheckService,
  updateCheckService,
  deleteCheckService,
} from "../../services/checkService";
import { checkMapper } from "../mappers/checkModelMapper";

export const createCheck = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    const check = await checkMapper(req.body);
    const serviceResult = await createCheckService(check);
    res.status(serviceResult.status).json({ ...serviceResult });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateCheck = async (req, res) => {
  if (!req.params.id) return res.status(400).end();
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    const check = await checkMapper(req.body);
    const serviceResult = await updateCheckService(req.params.id, check);
    res.status(serviceResult.status).json({ ...serviceResult });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteCheck = async (req, res) => {
  if (!req.params.id) return res.status(404).end();
  try {
    const serviceResult = await deleteCheckService(req.params.id);
    res.status(serviceResult.status).json({ ...serviceResult });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
