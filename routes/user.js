const Router = require("koa-router");
const {
  regUser,
  login,
  regEmailUser,
  updateUser,
  emailLogin,
  lodash
} = require("../controllers/user");
const schema = require("../model/schema");
// 导入 Joi 来定义验证规则
const { user, email } = require("../schema/user");
const uploads = require("../model/upload");
const router = new Router({ prefix: "/user" });

// 普通注册
router.post("/reguser", schema("post", user), regUser);
// 邮箱注册
router.post("/regEmailUser", schema("post", email), regEmailUser);

// 普通登录
router.post("/login", schema("post", user), login);

// 邮箱登陆
router.post("/emailLogin",schema("post",email),emailLogin);

// 更新用户基本信息
router.post("/updateUser", uploads("avatar", "avatar"), updateUser);

// lodash test
router.post("/lodash", lodash);

module.exports = router;
