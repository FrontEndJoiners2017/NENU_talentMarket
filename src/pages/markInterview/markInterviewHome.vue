<template>
<div id="markInterviewHome">
  <!-- 搜索框 -->
  <el-card class="box-card">
    <div class="text item">
      <h4>市场走访详细信息列表</h4>
      <!-- 普通按钮 -->
      <router-link to="markInterviewAdd">
        <el-button>添加信息</el-button>
      </router-link>
      <!-- 下拉列表 -->
      <el-select v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <!-- 远程搜索 -->
      <el-select
      v-model="value9"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
        <el-option
        v-for="item in options4"
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
        prop="date"
        label="年份"
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
        prop="contacts"
        label="走访联系人"
        width="135">
      </el-table-column>
      <el-table-column
        prop="staff"
        label="走访人员"
        width="135">
      </el-table-column>
      <el-table-column
        prop="method"
        label="联系方式"
        width="135">
      </el-table-column>
      <el-table-column
        prop="details"
        label="详细信息"
        width="135">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <router-link to="markInterviewDetails">
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
    methods: {
      // 表格点击查看
      // handleClick(row) {
      //   console.log(row);
      // },
      // 远程查询
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        ];
      },
       querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      // strange！
      mounted() {
        this.restaurants = this.loadAll();
      }
    }
    ,data() {
        return {
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
          restaurants: [],
          state4: '',
          timeout:  null,
          // 下拉列表
          options: [{
          value: '选项1',
          label: '2019'
        }]
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
}
</style>
