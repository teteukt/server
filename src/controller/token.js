const { token } = require("../database/models/token");
const { ForbiddenError, NotFoundError } = require("../_base/error");

exports.generateToken = async (userId) => {
  try {
    await token.deleteMany({ userId });
    const generatedToken = await token.create({ userId });

    return generatedToken;
  } catch (err) {
    throw err;
  }
};

exports.verifyToken = async (theToken) => {
  try {
    const foundToken = await token.findOne({ token: theToken });

    if (!foundToken) {
      throw new NotFoundError("Token not found.");
    }

    if (new Date() >= foundToken.expiresAt) {
      throw new ForbiddenError("Expired.");
    }

    return foundToken.userId;
  } catch (err) {
    throw err;
  }
};