const Router = require("koa-router");
const { addBlog, blogList } = require("../controllers/blog");
const uploads = require("../model/upload");
const router = new Router({ prefix: "/blog" });
// 查询博客信息
router.get("/bloglist", blogList);
// 添加博客
router.post("/add", uploads("blogcover", "blogcover"), addBlog);
module.exports = router;
