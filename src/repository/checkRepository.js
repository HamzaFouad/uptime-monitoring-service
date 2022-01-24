import { CheckConfig } from "../entities/checkConfigEntity";
import { Check } from "../entities/checkEntity";

export const createCheckRepository = async (data) => {
  try {
    const config = new CheckConfig(data);
    const configModel = await CheckConfig.create(config);
    const checkModel = await Check.create({ ...data, config: configModel._id });
    return checkModel;
  } catch (e) {
    return null;
  }
};

export const updateCheckRepository = async (id, check) => {
  try {
    const checkModel = await Check.findOneAndUpdate({ _id: id }, check, { new: true })
      .lean()
      .exec();
    return checkModel;
  } catch (e) {
    return null;
  }
};

export const deleteCheckRepository = async (id) => {
  try {
    const checkModel = await Check.findOneAndDelete({ _id: id }, { new: true }).lean().exec();
    return checkModel;
  } catch (e) {
    return false;
  }
};
