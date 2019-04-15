<template>
    <div id="narkInterviewAdd">
      <!-- 卡片 -->
      <el-card class="box-card">
        <div class="text item">
          <h2>毕业生就业市场开拓走访信息反馈表</h2>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="走访人员">
              <el-input v-model="form.staff"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
             </el-col>
            </el-form-item>
            <el-form-item label="单位名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="单位性质">
              <el-input v-model="form.proto"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input v-model="form.stamp"></el-input>
            </el-form-item>
            <el-form-item label="参会意向">
              <el-checkbox-group v-model="form.type">
              <el-checkbox label="秋季非师范毕业生专场" name="type"></el-checkbox>
              <el-checkbox label="秋季精品洽谈月专场" name="type"></el-checkbox>
              <el-checkbox label="全国高校毕业生教育人才招聘会" name="type"></el-checkbox>
              <el-checkbox label="春季非师范毕业生专场" name="type"></el-checkbox>
              <el-checkbox label="春季精品洽谈月专场" name="type"></el-checkbox>
              <el-checkbox label="网上发布招聘信息" name="type"></el-checkbox>
              <el-checkbox label="暂不考虑参加招聘会" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="单位信息反馈">
             <el-input type="textarea" v-model="form.feedback"></el-input>
            </el-form-item>
            <el-form-item label="简要总结">
             <el-input type="textarea" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定添加</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
    name:'markTnterviewAdd',
    components:{
        Navigation,
        Header
    },
    data() {
      return {
        form: {
          staff: '',
          date: '',
          name:'',
          proto:'',
          address:'',
          stamp:'',
          type: [],
          feedback: '',
          summary:'',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
/* 全局 */
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-aside {
  /* background-color: #D3DCE6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  /* line-height: 60px; */
}
  
.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
/* 卡片 */
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 100%;
    margin: 30px 0;
    text-align: left;
}
</style>