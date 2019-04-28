<template>
  <el-card class="box-card">
    <span>{{time}}, {{ userInfo.name }} 老师。</span>
    <div id="line">&nbsp</div>
    <el-button type="primary" icon="el-icon-edit" circle @click="toJoinFun"></el-button>
    <el-button type="success" @click="reloadFun">刷新系统</el-button>
    <el-button type="danger" @click="exitSysFun">退出系统</el-button>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      time: "早上好"
    };
  },
  methods: {
    reloadFun() {
      const h = this.$createElement;
      this.$notify({
        title: "即将刷新系统",
        type: "success",
        message: h("i", { style: "color: teal" }, "正在清理缓存......")
      });
      this.$router.push({ name: "Login" });
      this.$store.dispatch("removeAllAction");
      setTimeout("window.location.reload()", 1000);
    },
    exitSysFun() {
      this.$store.dispatch("logoutAction");
      this.$router.push({ name: "Login" });
      console.log("退出登录！");
    },
    toJoinFun() {
      this.$prompt("我们将第一时间解决", "给Joiners的反馈", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "请填写内容"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "我们已经收到"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters.getUserInfo
    }
  }
};
</script>
<style scoped>
.box-card {
  margin: 0;
  padding: 0;
  text-align: right;
}
#line {
  margin: 0 20px 0 10px;
  border-right: 1px #000000 solid;
  display: inline-block;
}
</style>