// axios 进行二次封装
import axios from "axios";

// nprogress 的 start() 进度条开始，done() 进度条结束
import nprogress from "nprogress";

// 引入 nprogress 进度条样式
import "nprogress/nprogress.css";

//1.利用 axios 对象的方法 create ，去创建一个 axios 实例
//2.request 就是 axios ，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发送请求的时候，路径当中会出现/
  baseURL: "http://localhost:8000/",
  //代表请求超时的时间
  timeout: 5000
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之后做一些事情
requests.interceptors.request.use(config => {
  //config:配置对象，对象里面有一个属性很重要，headers请求头
  //进度条开始
  nprogress.start();
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  res => {
    //成功的回调：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
  },
  error => {
    //响应失败的回调函数
    console.error("无法访问服务端");
    return Promise.reject(new Error(error));
  }
);

export default requests;