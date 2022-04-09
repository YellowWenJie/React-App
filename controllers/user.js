const bcrypt = require("bcryptjs");
const _ = require("lodash")
const { exec } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { NAME_CONF } = require("../config/index");
const { sendEmail } = require("../model/email");
const { randomString,judge } = require("../model/function");
const { tokenStr, decryptJWT } = require("../config/jwt");
// 储存邮箱注册验证码
let reqVerificationCode = [];
// 储存邮箱登陆验证码
let loginEmailVerificationCode = [
  {
    email:"1606354739@qq.com",
    verify:"666666"
  }];
class UserController {
  // 普通注册
  static async regUser(ctx) {
    const userinfo = ctx.request.body;
    const username = userinfo.username;
    let realname = userinfo.realname;
    const sqlStr = `select username from users where username='${username}'`;
    let dataBaseName = await exec(sqlStr);
    if (dataBaseName.length > 0) {
      ctx.body = new ErrorModel("用户名重复，重新取个名字吧");
      return;
    }
    //调用 bcrypt.hashSync (需要加密的值，10)10代表加密的程度对密码进行加密
    const password = bcrypt.hashSync(userinfo.password, 10);
    let random = Math.random();
    if (!realname) {
      realname = NAME_CONF + "_" + Math.floor(random * 1000000);
    }
    // let randomly = Math.floor(random * 10) < 5 ? ".png" : ".webp";
    let randomly = require("../model/readFile");
    let avatar = "/img/avatar/" + randomly();
    let reg_mode = "普通注册";
    let reg_time = new Date()
    const sql = `INSERT INTO users (username,password,realname,avatar,reg_mode,reg_time) VALUES ('${username}','${password}','${realname}','${avatar}','${reg_mode}','${reg_time}')`;
    await exec(sql)
      .then((result) => {
        if (result.length < 1) {
          ctx.body = new ErrorModel("注册失败");
        } else {
          ctx.body = new SuccessModel("注册成功");
        }
      })
      .catch((err) => {
        ctx.body = new ErrorModel(err);
      });
  }

  // 邮箱注册
  static async regEmailUser(ctx) {
    const userinfo = ctx.request.body;
    const email = userinfo.email;
    const verify = userinfo.verify;
    let realname = userinfo.realname;
    let username = userinfo.username;

    if (!verify && !!email) {
      console.log(reqVerificationCode);
      const sqlStr = `select email from users where email='${email}'`;
      let dataBaseName = await exec(sqlStr);
      if (dataBaseName.length > 0) {
        ctx.body = new ErrorModel("你已经注册过了");
        return;
      }
      let random = randomString();
      await sendEmail(email, "注册验证码", random)
        .then((res) => {
          ctx.body = new SuccessModel("验证码发送成功");
          removeCode();
          reqVerificationCode.push({
            email: email,
            verify: random,
          });
        })
        .catch((e) => {
          ctx.body = new ErrorModel("验证码发送失败");
        });
    } else if (!!verify && !!email) {
      const sqlStr = `select email from users where email='${email}'`;
      let dataBaseName = await exec(sqlStr);
      if (dataBaseName.length > 0) {
        ctx.body = new ErrorModel("你已经注册过了");
        return;
      }
      let emailVerificationCode;
      for (let i = 0; i < reqVerificationCode.length; i++) {
        if (reqVerificationCode[i].email === email) {
          emailVerificationCode = reqVerificationCode[i].verify;
        }
      }
      if (emailVerificationCode === verify) {
        let randomName = Math.random();
        if (!realname) {
          realname = NAME_CONF + "_" + Math.floor(randomName * 1000000);
        }
        // let randomly = Math.floor(random * 10) < 5 ? ".png" : ".webp";
        let randomly = require("../model/readFile");
        let avatar = "/img/avatar/" + randomly();
        let reg_mode = "邮箱注册";
        let reg_time = new Date()
        let name;
        if (!username) {
          name = Math.floor(randomName * 1000000);
        }
        // const sql = `INSERT INTO users (username,realname,avatar,reg_mode,email) VALUES ('${email}','${realname}','${avatar}','${reg_mode})','${email}'`;
        const sql = `INSERT INTO users (username,realname,avatar,reg_mode,email,reg_time) VALUES ('${name}','${realname}','${avatar}','${reg_mode}','${email}',${reg_time})`;
        await exec(sql)
          .then((result) => {
            if (result.length < 1) {
              ctx.body = new ErrorModel("添加失败");
            } else {
              ctx.body = new SuccessModel("注册成功");
              removeCode();
            }
          })
          .catch((err) => {
            ctx.body = new ErrorModel(err);
          });
      } else {
        ctx.body = new ErrorModel("验证码错误");
      }
    }
    function removeCode() {
      // 去重
      let arr = Array.from(new Set(reqVerificationCode));
      // 去除这个 email 中相同的验证码
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].email === email) {
          arr.splice(i, 1);
        }
      }
      reqVerificationCode = arr;
    }
  }

  // 普通登录
  static async login(ctx) {
    // 获取表单数据
    const userinfo = ctx.request.body;
    let username = userinfo.username;
    const sqlStr = `select * from users where username='${username}'`;
    let dataBase = await exec(sqlStr);
    if (dataBase.length < 1) {
      ctx.body = new ErrorModel("登录失败，未注册");
      return;
    }
    // 拿着用户输入的密码,和数据库中存储的密码进行对比，调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      dataBase[0].password
    );
    if (!compareResult) {
      ctx.body = new ErrorModel("登陆失败,密码不正确");
      return;
    }
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...dataBase[0], password: "" };
    //对用户的信息进行加密，生成token字符串jwj.sign（加密的对象，加密使用到SecretKey的值）
    const token = tokenStr(user);
    ctx.body = new SuccessModel("Bearer " + token);
  }

  // 邮箱登陆
  static async emailLogin(ctx) {
    const userinfo = ctx.request.body;
    const email = userinfo.email;
    const verify = userinfo.verify;
    if (!verify && !!email) {
      const sqlStr = `select email from users where email='${email}'`;
      let dataBaseName = await exec(sqlStr);
      if (dataBaseName.length < 0) {
        ctx.body = new ErrorModel("你还未注册，注册一个账号再登陆吧！");
        return;
      } else {
        let random = randomString();
        await sendEmail(email, "登陆验证码", random)
          .then((res) => {
            ctx.body = new SuccessModel('验证码发送成功');
            removeCode();
            loginEmailVerificationCode.push({
              email: email,
              verify: random,
            });
          })
          .catch((e) => {
            console.log(e);
            ctx.body = new ErrorModel('验证码发送失败');
          });
       } 
    } else if (!!verify && !!email) {
      let emailVerificationCode;
      for (let i = 0; i < loginEmailVerificationCode.length; i++) {
        if (loginEmailVerificationCode[i].email === email) {
          emailVerificationCode = loginEmailVerificationCode[i].verify;
        }
      }
      if (emailVerificationCode === verify) {
        const sqlStr = `select * from users where email='${email}'`;
        console.log(email);
        await exec(sqlStr).then(res=>{
          const user = { ...res[0], password: "" };
          const token = tokenStr(user);
          ctx.body = new SuccessModel("Bearer " + token);
          removeCode();
        })        
      } else {
        ctx.body = new ErrorModel("登陆失败，验证码错误");
      }
    } else {
      ctx.body = new ErrorModel("请输入您的邮箱");
    }
    function removeCode() {
      // 去重
      let arr = Array.from(new Set(loginEmailVerificationCode));
      // 去除这个 email 中相同的验证码
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].email === email) {
          arr.splice(i, 1);
        }
      }
      loginEmailVerificationCode = arr;
    }
  }

  // 更新用户信息
  static async updateUser(ctx) {
    const user = decryptJWT(ctx);
    const userinfo = ctx.request.body;
    let username = judge(userinfo,'username');
    let password = judge(userinfo,'password');
    let realname = judge(userinfo,'realname');
    let avatar;
    try {
      avatar = judge(userinfo,'avatar');
    } catch (e) {
      avatar = ` `;
    }
    let email = judge(userinfo,'email')
    let mobile = judge(userinfo,'mobile')
    const sql = `update users set ${username} ${password} ${realname} ${avatar} ${email} ${mobile} where id = ${user.id}`;
    await exec(sql)
          .then((result) => {
            if (result.length < 1) {
              ctx.body = new ErrorModel("添加失败");
            } else {
              ctx.body = new SuccessModel("注册成功");
              removeCode();
            }
          })
          .catch((err) => {
            ctx.body = new ErrorModel(err);
          });
  }

  // lodash test
  static async lodash(ctx){
    let arr = Object.keys(ctx.request.body);
    const body = _.pick(
      ctx.request.body,
      ...arr
    );
    ctx.body = body
  }
}

module.exports = UserController;
