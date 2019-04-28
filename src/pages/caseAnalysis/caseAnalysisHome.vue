<template>
    <div id="caseAnalysisHome">
    <!-- 搜索框 -->
        <el-card class="box-card">
            <div class="text item">
                <h4>单位详情列表</h4>
                <!-- 远程搜索 -->
                <el-select
                v-model="keyWds"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button>检索</el-button>
            </div>
        </el-card>
        <!-- 表格 -->
        <el-card class="box-card">
            <div class="text item">
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                    prop="num"
                    label="序号"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="单位名称"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="property"
                    label="单位性质"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="所在城市"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="省份"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="interviewTimes"
                    label="历年走访次数"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="speechTimes"
                    label="来校宣讲次数"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="signedNum"
                    label="历年签约人数"
                    width="135">
                    </el-table-column>
                    <el-table-column
                    prop="details"
                    label="详细信息"
                    width="135">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <router-link to="caseAnalysisDetails">
                                <el-button type="text" size="small">
                                    查看
                                </el-button>
                            </router-link>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 分页 -->
        <el-card class="box-card">
            <div class="text item">
                <el-pagination
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
          // 表格部分
          tableData: [{
            num: '',
            name: '',
            property: '',
            city:'',
            province:'',
            interviewTimes:'',
            speechTimes:'',
            signedTimes:'',
            details:''
          }],
          // 远程搜索部分
          options: [],
          keyWds: [],
          list: [],
          loading: false,
          states: [],
          // 下拉列表
          options: [{
          value: '选项1',
          label: '2019'
        }]
        }
      },
    mounted() {
      this.list = this.states.map(item => {
        // return { value: item, label: item };
        return { keyWds: item, label: item };
      });
    },
    methods: {
        // 表格点击查看
        // handleClick(row) {
        //   console.log(row);
        // },

        // 远程查询
        remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },//methods结束
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
}
</style>

