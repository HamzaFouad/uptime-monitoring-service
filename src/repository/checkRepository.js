import { Check } from "../entities/checkEntity";

export const createCheckRepository = async (check) => {
  const checkModel = await Check.create({ ...check });
  return checkModel;
};

export const updateCheckRepository = async (id, check) => {
  const checkModel = await Check.findOneAndUpdate({ _id: id }, check, { new: true }).lean().exec();
  return checkModel;
};
