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
    const data = { ...check, user: req.user };
    const serviceResult = await createCheckService(data);
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
    const data = { check, user: req.user };
    const serviceResult = await updateCheckService(req.params.id, data);
    res.status(serviceResult.status).json({ ...serviceResult });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteCheck = async (req, res) => {
  if (!req.params.id) return res.status(404).end();
  try {
    const data = { docId: req.params.id, user: req.user };
    const serviceResult = await deleteCheckService(data);
    res.status(serviceResult.status).json({ ...serviceResult });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
