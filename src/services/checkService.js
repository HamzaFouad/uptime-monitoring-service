import { serviceResult } from "./serviceResult";
import {
  createCheckRepository,
  updateCheckRepository,
  deleteCheckRepository,
} from "../repository/checkRepository";

import { execPollingSchedule } from "./pollingService";

export const createCheckService = async (check) => {
  try {
    const result = await createCheckRepository(check);
    if (!result) return serviceResult(null, 400, "Invalid request");

    const task = execPollingSchedule(result);

    saveCheckTask(task);
    return serviceResult(result, 201, null);
  } catch (e) {
    console.error(e);
    return serviceResult(null, 500, "Something went wrong while inserting check in database.");
  }
};

export const updateCheckService = async (id, check) => {
  try {
    const result = await updateCheckRepository(id, check);
    if (!result) return serviceResult(null, 400, "Invalid request");
    return serviceResult(result, 200, null);
  } catch (e) {
    console.error(e);
    return serviceResult(null, 500, "Something went wrong while updating check in database.");
  }
};

export const deleteCheckService = async (data) => {
  try {
    const result = await deleteCheckRepository(data);
    if (result === false) return serviceResult(null, 404, "Invalid Id");
    if (!result) return serviceResult(null, 204, "");
    return serviceResult(result, 204, null);
  } catch (e) {
    console.error(e);
    return serviceResult(null, 500, "Something went wrong while delete check from database.");
  }
};

const saveCheckTask = (task) => {
  console.log("check Task is saved!");
};
