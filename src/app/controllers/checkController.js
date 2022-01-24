import { validationResult } from "express-validator";
import { createCheckService, updateCheckService } from "../../services/checkService";
import { checkMapper } from "../mappers/checkModelMapper";

export const createCheck = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    const check = await checkMapper(req.body);
    const checkModel = await createCheckService(check);
    res.status(201).json({ ...checkModel });
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
    const checkModel = await updateCheckService(req.params.id, check);
    res.status(200).json({ ...checkModel });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
