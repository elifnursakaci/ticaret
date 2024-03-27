const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authhenticationMid = async (req, res, next) => {
  const { token } = req.headers.autohorization.split("")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  const decodedData = jwt.verify(token, "SECRETTOKEN");

  if (!decodedData) {
    return res.status(401).json({ message: "erişim tokeni geçersiz !!" });
  }

  req.user = await User.findById(decodedData.id);
  next();
};

const roleChecked = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: "Giriş için izniniz bulunmamaktadır." });
    }
    next();
  };
};

module.exports = { authhenticationMid, roleChecked };
