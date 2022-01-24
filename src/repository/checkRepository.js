import { Check } from "../entities/checkEntity";

export const createCheckRepository = async (check) => {
  const checkModel = await Check.create({ ...check });
  return checkModel;
};
