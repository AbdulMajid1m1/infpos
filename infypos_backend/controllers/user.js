const { Users } = require("../models");
const { isNull, isEmpty } = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const { Op, Sequelize } = require("sequelize");
const checkEmptyFields = require("../utils/check_empty_field");

module.exports = {
  create: async (req, res) => {
    try {
      const userData = req.body;
      const requiredFields = [
        { name: "first_name", value: userData.first_name },
        { name: "last_name", value: userData.last_name },
        { name: "email", value: userData.email },
        { name: "password", value: userData.password },
        { name: "mobile", value: userData.mobile },
      ];
      const emptyFieldCheck = checkEmptyFields(requiredFields);

      if (!emptyFieldCheck.success) {
        throw { status: 400, message: emptyFieldCheck.error };
      }

      const existingUser = await Users.findOne({
        where: {
          [Op.or]: [{ email: userData.email }, { mobile: userData.mobile }],
        },
      });

      if (existingUser) {
        let errorMessage;
        if (existingUser.email === userData.email) {
          errorMessage = "Email already exists";
        } else if (existingUser.mobile === userData.mobile) {
          errorMessage = "Mobile number already exists";
        }
        throw { status: 400, message: errorMessage };
      }

      if (!validator.validate(userData.email)) {
        throw { status: 400, message: "Invalid Email" };
      }

      if (userData.password.length < 8) {
        throw {
          status: 400,
          message: "Password must be at least 8 characters long",
        };
      }

      userData.password = await bcrypt.hash(userData.password, 10);
      const newUser = await Users.create({
        ...userData,
      });
      res.success(newUser);
    } catch (error) {
      console.log(error);
      res.internalError(error);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const requiredFields = [
        { name: "email", value: email },
        { name: "password", value: password },
      ];
      const emptyFieldCheck = checkEmptyFields(requiredFields);
      if (!emptyFieldCheck.success) {
        throw { status: 400, message: emptyFieldCheck.error };
      }
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (isNull(user)) {
        throw { status: 404, message: "User Not found." };
      }
      if (user.role !== "admin") {
        throw {
          status: 403,
          message: "You are not authorized to perform this action.",
        };
      }
      const userPassword = user["password"];
      let passwordIsValid = await bcrypt.compare(password, userPassword);
      if (!passwordIsValid) {
        throw { status: 400, message: "Invalid Password!" };
      }
      let secretKey = config.get("auth.secret");
      let token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secretKey,
        {
          expiresIn: "182d",
        }
      );
      res.status(200).send({
        success: true,
        error: null,
        body: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          mobile: user.mobile,
          profile_picture: user.image_url,
          role: user.role,
          access_token: token,
        },
      });
    } catch (err) {
      res.internalError(err);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;

      const user = await Users.findByPk(id);
      if (isNull(user)) {
        throw { status: 404, message: "User not found" };
      }

      const { password, ...updatedData } = userData;

      await user.update({
        ...updatedData,
        updatedAt: Date.now(),
      });

      const updatedUser = await Users.findByPk(id);
      res.success(updatedUser);
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findByPk(id);
      if (!user) {
        throw { status: 404, message: "User not found" };
      }
      await user.destroy();
      res.success({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  getUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, role } = req.query;

      const offset = (page - 1) * limit;
      const whereClause = role ? { role } : {};

      const users = await Users.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      if (isEmpty(users.rows)) {
        throw { status: 404, message: "No users found" };
      }

      res.success({
        data: users.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(users.count / limit),
        totalUsers: users.count,
      });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  searchUsers: async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;

      if (isEmpty(search)) {
        throw { status: 400, message: "Search query is required" };
      }

      const offset = (page - 1) * limit;

      const users = await Users.findAndCountAll({
        where: Sequelize.literal(
          `CONCAT(first_name, ' ', last_name) LIKE '%${search}%'`
        ),
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      if (isEmpty(users.rows)) {
        throw { status: 404, message: "No users found" };
      }

      res.success({
        data: users.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(users.count / limit),
        totalUsers: users.count,
      });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
