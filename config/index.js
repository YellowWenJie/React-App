// 配置文件
const env = process.env.NODE_ENV; //环境参数

//配置
let MYSQL_CONF;
let NAME_CONF = "❤";
let TOKEN_CONF = {
  //加密和解密的token的秘钥
  jwtSecretKey: "itheima No1. ^_^",
  //token的有效期
  expiresIn: "10h",
};

// 开发环境
if (env === "dev") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "blog",
  };
}
// 线上环境
if (env === "production") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "blog",
  };
}
console.log(env);

module.exports = { MYSQL_CONF, NAME_CONF, TOKEN_CONF };
