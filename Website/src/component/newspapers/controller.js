const newspaperService = require("./service");

exports.getNewspaper = async () => {
  try {
    return await newspaperService.getNewspaper();
  } catch (error) {
    null;
  }
};

exports.getNewspaperByID = async (id) => {
  try {
    return await newspaperService.getNewspaperID(id);
  } catch (error) {
    return null;
  }
};

exports.insert = async (newspaper) => {
  try {
    await newspaperService.insert(newspaper);
    console.log(">>>>>>>>>", newspaper);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (id, newspaper) => {
  try {
    await newspaperService.update(id, newspaper);
  } catch (error) {
    return null;
  }
};
