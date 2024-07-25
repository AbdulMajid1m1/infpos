const { Op } = require('sequelize');
const { isEmpty, isNull } = require('lodash');

const createEntity = async (Model, data, res) => {
  try {
    const newEntity = await Model.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.success(newEntity);
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

const updateEntity = async (Model, id, data, res) => {
  try {
    const entity = await Model.findByPk(id);
    if (isNull(entity)) {
      throw { status: 404, message: `${Model.name} not found` };
    }

    await Model.update(data, {
      where: { id },
    });

    const updatedEntity = await Model.findByPk(id);
    res.success(updatedEntity);
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

const deleteEntity = async (Model, id, res) => {
  try {
    const entity = await Model.findByPk(id);
    if (isNull(entity)) {
      throw { status: 404, message: `${Model.name} not found` };
    }

    await entity.destroy();
    res.success({ message: `${Model.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

const getEntities = async (Model, page, limit, res, include = []) => {
  try {
    const offset = (page - 1) * limit;
    const entities = await Model.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include,
    });

    if (isEmpty(entities.rows)) {
      throw { status: 404, message: `No ${Model.name}s found` };
    }

    res.success({
      data: entities.rows,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(entities.count / limit),
      totalEntities: entities.count,
    });
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

const searchEntities = async (Model, search, page, limit, res, include = []) => {
  try {
    if (isEmpty(search)) {
      throw { status: 400, message: "Search query is required" };
    }

    const offset = (page - 1) * limit;
    const entities = await Model.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include,
    });

    if (isEmpty(entities.rows)) {
      throw { status: 404, message: `No ${Model.name}s found` };
    }

    res.success({
      data: entities.rows,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(entities.count / limit),
      totalEntities: entities.count,
    });
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

module.exports = {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  searchEntities,
};
