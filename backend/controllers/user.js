const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const avatar = await cloudinary.uplouder.upload(req.body.avatar, {
    folder: "avatars",
    width: 130,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(500)
      .json({ message: "Böyle bir kullanıcı zaten var!!!" });
  }

  if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Şifreniz en az 6 karakter olmalıdır!!!" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  });

  const token = jwt.sign({ id: newUser._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ message: "Böyle bir kullanıcı yok!!!" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(500).json({ message: "Şifreniz hatalı!!!" });
  }

  const token = jwt.sign({ id: user._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("token", null, cookieOptions)
    .json({ message: "Başarıyla çıkış yapıldı!!!" });
};

const forgotPassword = async (req, res) => {
  const user = await User.findone({ email: req.user.email });

  if (!user) {
    return res.status(500).json({ message: "Böyle bir kullanıcı yok!!!" });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;

  await user.save({ validateBforeSave: false });

  const passwordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset/${resetToken}`;

  const message = `şifreni sıfırlamak için kullanacağın token : ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      secure: true, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "youremail@gmail.com",
        pass: "password",
      },
    });

    const mailData = {
      from: "youremail@gmail.com", // gönderici adresi
      to: req.body.email, // alıcı adresleri
      subject: "Şİfre sıfırlama ",
      text: message, // metin tabanlı e-posta içeriği
    };
    await transporter.sendMail(mailData);

    res.status(200).json({ message: "mailinizi kontrol ediniz" });
  } catch (error) {
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBforeSave: false });

    res
      .status(500)
      .json({ message: "şifreniz sıfırlama işlemi başarısız oldu!!!" });
  }
};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(500).json({ message: "geçersiz token" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" });

  const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, cookieOptions).json({ user, token });
};

const userDetail = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
};

module.exports = {
  register,
  resetPassword,
  login,
  forgotPassword,
  logout,
  userDetail,
};
