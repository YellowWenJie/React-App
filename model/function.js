// 随机验证码
const randomString = (len = 6) => {
  let chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let maxPos = chars.length;
  let data = "";
  for (i = 0; i < len; i++) {
    data += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return data;
};
// 修改数据时可以随便传多少参数
const judge = (userinfo={}, name) => {
  if (!!userinfo[name]) {
    let arr = Object.keys(userinfo);
    if (arr.length > 1) {
      if (name == arr[arr.length - 1]) {
        return `${name} = "${userinfo[name]}"`;
      } else {
        return `${name} = "${userinfo[name]}",`;
      }
    } else {
      return `${name} = "${userinfo[name]}"`;
    }
  } else {
    return ` `;
  }
}

module.exports = { randomString,judge };
