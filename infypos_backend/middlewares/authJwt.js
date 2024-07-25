const jwt = require("jsonwebtoken");
const config = require("../config");
const { Users } = require("../models");
const { isEmpty, isNull } = require("lodash");

module.exports = {
  verifyToken: (req, res, next) => {
    let token = extractToken(req);

    if (isEmpty(token)) {
      return res.send({
        success: false,
        error: "No token provided!",
        body: null,
      });
    }

    if (!token) {
      return res.send({
        success: false,
        error: "No token provided!",
        body: null,
      });
    }

    jwt.verify(token, config.get("auth.secret"), async (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          error: "Unauthorized!",
          body: null,
        });
      }

      const user = await Users.findOne({
        where: { id: decoded.id, email: decoded.email },
      });

      if (isNull(user)) {
        return res.status(404).send({
          success: false,
          error: "User doesn't exist",
          body: null,
        });
      }

      console.log("decoded", decoded);
    
      req.user_id = decoded.id;

      next();
    });
  },
};

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}
