const express= require("express")
const router = express.Router();

const{ register, forgotPassword, login, resetPassword, Verperfil }= require("../controllers/auth")

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/verperfil/:registeracademic").get(Verperfil)


module.exports = router;