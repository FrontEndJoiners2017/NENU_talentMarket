<template>
<div id="markInterviewHome">
  <!-- 搜索框 -->
  <el-card class="box-card">
    <div class="text item">
      <h1 style="display:inline-block">市场走访详细信息列表</h1>
      <!-- 普通按钮 -->
      <router-link :to="{name:'markInterviewAdd'}">
        <el-button>添加信息</el-button>
      </router-link>
      <br>
      <!-- 搜索部分 -->
      <el-select v-model="year" placeholder="请选择年份">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入关键词" v-model="keyword" 
        style="display:inline-block;width:200px">
      </el-input>
      <el-button @click="search" type="primary" icon="el-icon-search"  plain>检索</el-button>
    </div>
  </el-card>
	<!-- 表格 -->
  <el-card class="box-card">
    <div class="text item">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="年份"
        >
      </el-table-column>
      <el-table-column
        prop="company_name"
        label="单位名称"
        >
      </el-table-column>
      <el-table-column
        prop="company_nature"
        label="单位性质"
        >
      </el-table-column>
      <el-table-column
        prop="company_place"
        label="所在城市"
        >
      </el-table-column>
      <el-table-column
        prop="visitor_name"
        label="走访人员"
        >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="走访联系人"
        >
      </el-table-column>
      <el-table-column
        prop="mobiephone"
        label="联系方式"
        >
      </el-table-column>
      <el-table-column
        label="详细信息"
      >
        <template slot-scope="scope">
          <!-- <router-link :to="{name:'markInterviewDetails'}"> -->
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
  </el-card>

  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {
          //检索部分
          year:'',
          keyword:'',
          // 表格部分
          tableData: [],
          // 下拉列表
          options: [{
          value: '2019',
          label: '2019'
        },
        {
          value:'2018',
          label:'2018'
        }],
        //分页
        //当前页数
        currentPage: 1,
        //每页装的元组
        pagesize: 10,
        //元组总数目
        total: 0,

        }
    },//data结束
    mounted() {
      // this.list = this.states.map(item => {
      //   return { search: item, label: item };
      // });
      //得到全部数据
      axios({
        method:'get',
        url:this.backendUrl+'/interview/listAll',
      }).then(response=>{
        let len=response.data.visitorList.length
        for (let i = 0; i < len; i++) {
          this.tableData.push({time:response.data.visitorList[i].time,
                              company_name:response.data.visitorList[i].company_name,
                              company_nature:response.data.visitorList[i].company_nature,
                              company_place:response.data.visitorList[i].company_place,
                              visitor_name:response.data.visitorList[i].visitor_name,
                              contact:response.data.positionList[i].contact,
                              mobiephone:response.data.positionList[i].mobiephone})
        }
        // 去掉第一个空对象
        this.tableData.splice(0,1)
        this.total=response.data.visitorList.length
      }).catch(error=>{
        console.log(error)
      })

    },
    methods: {
      //表格点击查看
      handleClick(row) {
        let params={
          companyName:row.company_name,
          visitorName:row.visitor_name,
          time:row.time
        }
        this.$router.push({
          path: '/markInterview/Details',
          name: 'markInterviewDetails',
          params: params
        })
      },
      //分页
      current_change(currentPage){
        this.currentPage = currentPage;
      },
      // 搜索
      search(){
        // let data=qs.stringify({
        //   "year":this.year,
        //   "keyword":this.keyword
        // })
        axios({
          method:'post',
          url:this.backendUrl+'/interview/queryInterview?year='+this.year+"&keyword="+this.keyword,
          // data:data,
        }).then(response=>{
          console.log(response)
          // 清空数组
          this.tableData.splice(0)
          let len=response.data.visitorList.length
          for (let i = 0; i < len; i++) {
            this.tableData.push({time:response.data.visitorList[i].time,
                                company_name:response.data.visitorList[i].company_name,
                                company_nature:response.data.visitorList[i].company_nature,
                                company_place:response.data.visitorList[i].company_place,
                                visitor_name:response.data.visitorList[i].visitor_name,
                                contact:response.data.positionList[i].contact,
                                mobiephone:response.data.positionList[i].mobiephone})
          }
          this.total=response.data.visitorList.length
        }).catch(error=>{
          console.log(error)
        })
      },


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
