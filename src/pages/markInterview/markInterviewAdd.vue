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
            <el-form-item label="走访情况">
              <br>
              <!-- 增加 -->
              <el-button type="primary" @click="addRow(viewTableData)">新增</el-button>
              <!-- 走访情况表格 -->
                <el-table :data="viewTableData" style="width: 100%">
                <el-table-column prop="contact" label="联系人" width="180">
                    <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="contact"> -->
                          <el-input v-model="scope.row.contact" placeholder="姓名"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="position" label="职务" width="180">
                  <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="position"> -->
                          <el-input v-model="scope.row.position" placeholder="职务"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="phoneNum" label="手机">
                  <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="phoneNum"> -->
                          <el-input v-model="scope.row.phoneNum" placeholder="手机号码"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="fixedPhone" label="固话">
                  <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="fixedPhone"> -->
                          <el-input v-model="scope.row.fixedPhone" placeholder="固话"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="EMAIL">
                  <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="email"> -->
                          <el-input v-model="scope.row.email" placeholder="邮箱"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column prop="wechat" label="微信/QQ">
                  <template slot-scope="scope">
                      <!-- <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="wechat"> -->
                          <el-input v-model="scope.row.wechat" placeholder="微信/QQ"></el-input>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- <el-form :model="scope.row">
                        <el-form-item> -->
                          <el-button @click.native.prevent="deleteRow(scope.$index, viewTableData)" size="small">删除</el-button>
                        <!-- </el-form-item>
                      </el-form> -->
                    </template>
                </el-table-column>
              </el-table>
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
              <el-button type="primary" @click="onSubmit" plain>确定</el-button>
              <el-button type="info" plain>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
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
        },
        // 走访表格
        viewTableData:[],
      }
    },
    methods: {
      deleteRow(index, rows) {//删除改行
        rows.splice(index, 1);
      },
     addRow(tableData,event){
       tableData.push({ contact: '',position:'',phoneNum:'',fixedPhone:'',email:'',wechat:''
        })
     },
      onSubmit(){
        console.log("submit!")
      }

    }//methods结束
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
/* .text {
    font-size: 14px;
} */

.item {
    padding: 18px 0;
}

.box-card {
    width: 100%;
    margin: 30px 0;
    text-align: left;
}
</style>