<template>
  <div id="loginBox">
    <div id="backTitle">
      <h1 id="NENU">NENU</h1>
      <h2>就业市场数据分析系统>>></h2>
    </div>
    <el-card class="box-card" v-loading="loading" element-loading-text="数据请求中">
      <h1>欢迎登录</h1>
      <hr />
      <el-form label-position="right" label-width="80px" :model="userInfo" ref="userInfo">
        <el-form-item label="账号">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickLogin(userInfo)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        username: "test",
        name: "Joiners",
        password: "test"
      },
      rememberID: true,
      rememberPassword: false,
      loading: false
    };
  },
  methods: {
    clickLogin(userInfo) {
      //发送网络请求
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      xmlhttp.open(
        "POST",
        "http://10.108.118.124:8084/login?username=" +
          this.userInfo.username +
          "&password=" +
          this.userInfo.password,
        true
      );
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      function doResult() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let data = JSON.parse(xmlhttp.responseText);
          console.log(data);
          if (data.data == "ok") {
            // 将登录状态写入store.state
            self.$store.dispatch("loginAction", {
              loginInfo: self.userInfo
            });
            // 提示登录成功的信息
            console.log("登录成功！");
            //进入DFU页面
            self.$router.push({ name: "DFU" });
          } else if (data.data == "no such user") {
            self.$notify.error({
              title: "登录失败",
              message: "没有此用户"
            });
          } else if (data.data == "wrong password") {
            self.$notify.error({
              title: "登录失败",
              message: "密码错误"
            });
          }
        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
          //提示登录失败的信息
          self.$notify.error({
            title: "登录失败",
            message: "请检查网络"
          });
          console.log("登录失败！");
          return false;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  background-color: rgb(255, 255, 255);
  width: 480px;
  position: absolute;
  top: 55%;
  left: 70%;
  transform: translate(-50%, -80%);
  text-align: left;
  padding: 1em;
}
hr {
  margin: -15px 0 30px 0;
}
#backTitle {
  margin: 0 auto;
  text-align: left;
}
#backTitle h1 {
  color: #efefef;
  font-size: 300px;
  text-shadow: #ffffff 10px 10px;
  margin: 0 0 0 50px;
}
#backTitle h2 {
  color: #efefef;
  font-size: 50px;
  text-shadow: #ffffff 2px 2px;
  margin: -50px 0 0 100px;
}
</style>
