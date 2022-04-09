"use strict";
const nodemailer = require("nodemailer");
const path = require("path");
// 填入自己的账号和密码
let transporter = nodemailer.createTransport({
  host: "smtp.163.com",
  port: 465,
  secure: true, // 如果是 true 则port填写465, 如果 false 则可以填写其它端口号
  auth: {
    user: "mengtudong19960212@163.com", // 发件人邮箱
    pass: "ICSLJIVPPNESARNB", // 发件人密码(用自己的...)
  },
});

// 获取当前时间
let sendTime = new Date();
const sendEmail = (to, subject, message) => {
  return new Promise((resolve, reject) => {
    // 填写发件人, 收件人
    let mailOptions = {
      // 发件人地址
      from: '"YellowWenJie"<mengtudong19960212@163.com>',
      // 收件人列表, 向163邮箱, gmail邮箱, qq邮箱各发一封
      to: to,
      // 邮件主题
      subject: subject,
      // 文字内容
      text: "发送附件内容",
      // html内容
      html: `<div>
              <b>${sendTime}</b>
              </br>
                您的验证码为：${message}
              </div>
            `,
      // 附件内容 是一个列表, 第一个是目录下的pack.json文件, 第二是御坂美琴的头像, 第三是作者在拍的图片的zip包
      // attachments: [
      //   {
      //     filename: "package.json",
      //     path: path.resolve(__dirname, "package.json"),
      //   },
      // {
      //   filename: "图片",
      //   path: path.resolve(__dirname, "../public/img/avatar/10.jpg"),
      // },
      //   {
      //     filename: "room.zip",
      //     path: path.resolve(__dirname, "room.zip"),
      //   },
      // ],
    };
    nodemailer.createTestAccount((err, account) => {});
    // 发送邮件
    transporter.sendMail(mailOptions, (err, info) => {
      if (err!==null) {
        console.log(err);
        reject(err);
      }
      resolve(info);
    });
  });
};

module.exports = { sendEmail };
