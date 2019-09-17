/**
 * 本页是方便大家管理后端的url地址的
 * 使用哪个的时候，就把哪个激活
 * 其他的注释掉即可
 */

//url部分
//肖瑶的工作室电脑
// let url = "http://10.108.118.124";
//粱佳悦的工作室电脑
// let url = "http://10.108.16.244";
//Join阿里云服务器
let url = "http://47.103.10.220";

//端口号部分
let post = ":8081";
//拼接
let backendUrl = url + post;

export default {
    backendUrl
}