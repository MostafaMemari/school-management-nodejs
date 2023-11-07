const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require("../../controller/academics/programController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");

const programRouter = require("express").Router();

programRouter.route("/").post(isLogin, isAdmin, createProgram).get(isLogin, isAdmin, getPrograms);

programRouter.route("/:id").get(isLogin, isAdmin, getProgram).put(isLogin, isAdmin, updateProgram).delete(isLogin, isAdmin, deleteProgram);

module.exports = { programRouter };
