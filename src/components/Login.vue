<template>
  <div id="loginBox">
    <div id="backTitle">
      <h1 id="NENU">NENU</h1>
      <h2>就业市场数据分析系统>>></h2>
    </div>
    <el-card class="box-card" v-loading="loading" element-loading-text="数据请求中">
      <h1>欢迎登录</h1>
      <hr>
      <el-form label-position="right" label-width="80px" :model="userInfo" ref="userInfo">
        <el-form-item label="账号">
          <el-input v-model="userInfo.ID"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-checkbox v-model="rememberID" label="true">记住账号</el-checkbox> -->
          <!-- <el-checkbox v-model="rememberPassword" label="false">记住密码</el-checkbox> -->
          <el-button type="primary" v-on:click="submitForm('userInfo')">登录</el-button>
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
        ID: "monkey",
        name: "Joiners",
        password: "111111"
      },
      rememberID: true,
      rememberPassword: false,
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (
          this.userInfo.ID == "monkey" &&
          this.userInfo.password == "111111"
        ) {
          //将登录状态写入store.state
          this.$store.dispatch("loginAction", {
            loginInfo: this.userInfo
          });
          //提示登录成功的信息
          console.log("登录成功！");
          //进入DFU页面
          this.$router.push({ name: "DFU" });
        } else {
          //提示登录失败的信息
          this.$notify.error({
            title: "登录失败",
            message: "请检查账号和密码"
          });
          console.log("登录失败！");
          return false;
        }
      });
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
