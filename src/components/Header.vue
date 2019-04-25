<template>
      <el-card class="box-card">
        <span>{{time}}, {{ UserName }} 老师。</span>
        <div id="line">&nbsp</div>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success">刷新系统</el-button>
        <el-button type="danger">退出系统</el-button>
      </el-card>
</template>
<script>
export default {
  data(){
    return{
      UserName:'monkeys',
      time:'早上好'
    }
  }
}
</script>
<style scoped>
.box-card{
  margin: 0;
  padding: 0;
  text-align: right;
}
#line{
  margin: 0 20px 0 10px;
  border-right: 1px #000000 solid;
  display: inline-block;
}
</style>