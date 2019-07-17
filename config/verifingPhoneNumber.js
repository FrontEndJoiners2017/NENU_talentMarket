export function isvalidPhone(str) {
    //正则表达式
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    //返回验证结果
    return reg.test(str);
}