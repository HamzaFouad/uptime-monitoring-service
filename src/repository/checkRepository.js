import { CheckConfig } from "../entities/checkConfigEntity";
import { Check } from "../entities/checkEntity";
import { User } from "../entities/userEntity";

export const createCheckRepository = async (data) => {
  const userId = data.user._id;
  console.log("userId type: ", typeof userId);
  try {
    const configModel = await CheckConfig.create({ ...data });
    const checkModel = await Check.create({ ...data, config: configModel._id });
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { observers: checkModel._id } }
    );
    return { userId, checkModel };
  } catch (e) {
    return null;
  }
};

export const updateCheckRepository = async (id, data) => {
  try {
    const config = new CheckConfig(data);
    let configModel;

    if (config) configModel = await CheckConfig.create(config);

    const checkModel = await Check.findOneAndUpdate(
      { _id: id },
      { ...data, configModel },
      { new: true }
    )
      .lean()
      .exec();

    return checkModel;
  } catch (e) {
    return null;
  }
};

export const deleteCheckRepository = async (data) => {
  const userId = data.user._id;
  try {
    const checkModel = await Check.findOneAndDelete({ _id: data.docId }, { new: true })
      .lean()
      .exec();
    await User.findByIdAndUpdate({ _id: userId }, { $pull: { observers: checkModel._id } });
    return checkModel;
  } catch (e) {
    return false;
  }
};

export const queryOneCheckRepository = async (query) => {
  try {
    const doc = await Check.findOne({ ...query })
      .lean()
      .exec();
    console.log("doc: ", doc);
    return doc;
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
