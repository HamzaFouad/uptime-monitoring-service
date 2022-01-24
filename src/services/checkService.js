import { serviceResult } from "./serviceResult";
import { createCheckRepository, updateCheckRepository } from "../repository/checkRepository";

export const createCheckService = async (check) => {
  try {
    const checkResult = await createCheckRepository(check);
    return serviceResult(checkResult, 201, null);
  } catch (e) {
    console.error(e);
    return serviceResult(null, 500, "Something went wrong while inserting check in database.");
  }
};

export const updateCheckService = async (id, check) => {
  try {
    const checkResult = await updateCheckRepository(id, check);
    return serviceResult(checkResult, 200, null);
  } catch (e) {
    console.error(e);
    return serviceResult(null, 500, "Something went wrong while updating check in database.");
  }
};
