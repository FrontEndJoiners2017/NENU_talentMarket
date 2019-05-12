<template>
<div id="markInterviewHome">
  <!-- 搜索框 -->
  <el-card class="box-card">
    <div class="text item">
      <h1>市场走访详细信息列表</h1>
      <!-- 普通按钮 -->
      <router-link :to="{name:'markInterviewAdd'}">
        <el-button>添加信息</el-button>
      </router-link>
      <!-- 下拉列表 -->
      <el-select v-model="year" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <!-- 远程搜索 -->
      <el-select
      v-model="search"
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
      <el-button type="primary" icon="el-icon-search"  plain>检索</el-button>
    </div>
  </el-card>
	<!-- 表格 -->
  <el-card class="box-card">
    <div class="text item">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="年份"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="单位名称"
        >
      </el-table-column>
      <el-table-column
        prop="property"
        label="单位性质"
        >
      </el-table-column>
      <el-table-column
        prop="city"
        label="所在城市"
        >
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        >
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="走访联系人"
        >
      </el-table-column>
      <el-table-column
        prop="staff"
        label="走访人员"
        >
      </el-table-column>
      <el-table-column
        prop="method"
        label="联系方式"
        >
      </el-table-column>
      <el-table-column
        prop="details"
        label="详细信息"
        >
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <router-link :to="{name:'markInterviewDetails'}">
              <el-button type="text" size="small">
                  查看
              </el-button>
          </router-link>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-card>

  </div>
</template>

<script>
export default {
    data() {
        return {
          //检索部分
          year:'',
          // 表格部分
          tableData: [{
            date: '',
            name: '',
            property: '',
            city:'',
            province:'',
            contacts:'',
            staff:'',
            method:'',
            details:''
          }],
          // 远程搜索部分
          options: [],
          search: [],
          list: [],
          loading: false,
          states: [],
          // 下拉列表
          options: [{
          value: '选项1',
          label: '2019'
        }]
        }
    },//data结束
    mounted() {
      this.list = this.states.map(item => {
        // return { value: item, label: item };
        return { search: item, label: item };
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
    },//method结束

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
}
</style>
