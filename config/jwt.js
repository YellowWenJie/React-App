const koaJWT = require("koa-jwt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { TOKEN_CONF } = require("./index");
const tokenStr = (user) => {
  //对用户的信息进行加密，生成token字符串jwj.sign（加密的对象，加密使用到SecretKey的值）
  const token = jwt.sign(user, TOKEN_CONF.jwtSecretKey, {
    expiresIn: TOKEN_CONF.expiresIn,
  });
  return token;
};

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证(这里需要注意，secret必须配置algorithms属性)
const verifyJWT = koaJWT({
  secret: TOKEN_CONF.jwtSecretKey,
  algorithms: ["HS256"],
}).unless({
  path: [/\/reguser/, /\/regEmailUse/, /\/login/, /\/emailLogin/, /\/lodash/],
});

// 解码
const decryptJWT = (ctx) => {
  if (!!ctx.header.authorization) {
    const token = ctx.header.authorization;
    const decoded = jwt_decode(token);
    return decoded;
  } else {
    return "header.authorization 为空";
  }
};
module.exports = {
  verifyJWT,
  tokenStr,
  decryptJWT,
};
