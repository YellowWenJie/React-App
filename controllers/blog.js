const { exec } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");
class BlogController {
  // 查询博客信息
  static async blogList(ctx) {
    const author = ctx.query.author;
    const keyword = ctx.query.keyword;
    console.log(ctx.query);
    let sql = `select * from blogs where 1=1 `;
    if (author) {
      sql += `and author='${author}'`;
    }
    if (keyword) {
      sql += `and title like '%${keyword}%'`;
    }
    sql += `order by createtime desc;`;
    // 返回 promise
    await exec(sql)
      .then((data) => {
        if (data.length == 0) {
          ctx.body = new ErrorModel("未找到");
        } else {
          ctx.body = new SuccessModel(data);
        }
      })
      .catch((err) => {
        ctx.body = new ErrorModel(err);
      });
  }
  // 添加博客
  static async addBlog(ctx) {
    const user = ctx.state.user;
    console.log("ctx.request.file", ctx.request.file);
    console.log("ctx.file", ctx.file);
    console.log("ctx.request.body", ctx.request.body);
    ctx.body = "done";
  }
}

module.exports = BlogController;
