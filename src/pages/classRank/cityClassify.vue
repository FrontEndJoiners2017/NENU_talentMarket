<template>
	<div id="former">
		<el-container>
			<el-main>
				<div id="city_rank_search">
					<el-card class="box-card">
  						<div slot="header" class="clearfix">
    						<span>回访城市排名检索</span>
    						<el-button style="padding: 3px 0" type="text">导入</el-button>
    						<el-button style="padding: 3px 0" type="text">导出</el-button>
    						<el-input placeholder="关键字检索" v-model="input10" clearable></el-input>
							<el-button>检索</el-button>
  						</div>
  						<div v-for="o in 4" :key="o" class="text item">{{'
    						<el-dropdown size="medium" split-button type="primary">
								教育类
								<el-dropdown-menu slot="dropdown">
								    <el-dropdown-item>教育类</el-dropdown-item>
								    <el-dropdown-item>非教育类</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
    						' + o }}
  						</div>
					</el-card>
				</div>
				
				<div id="city_classify_tab">
					<el-table :data="tableData" style="width: 100%">
      					<el-table-column prop="order" label="序号" width="136"></el-table-column>
      					<el-table-column prop="city" label="城市" width="136"></el-table-column>
      					<el-table-column prop="province" label="省份" width="136"></el-table-column>
      					<el-table-column prop="cityrank" label="城市分级" width="136"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析" width="136"></el-table-column>
      					<el-table-column prop="policy" label="一带一路政策" width="136"></el-table-column>
      					<el-table-column prop="modify" label="修改" width="136">
      						<template slot-scope="scope"><!--修改按钮-->
        						<el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
						    </template>
      					</el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息" width="136">
      						<template slot-scope="scope">
        						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						    </template>
      					</el-table-column>
    				</el-table>
				</div>
				
				<div class="block"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
			</el-main>
		</el-container>
    </div>
</template>

<script>
	export default {
      data() {
        return {
		  input10: '',
          tableData: [{
            order: '1',
            city:'北京市',
            province:'直辖市',
            cityrank:'一线城市',
            weightanalysis:'A',
            policy:'否',
          },{
          tableData: [{
            order: '1',
            city:'天津市',
            province:'直辖市',
            cityrank:'新一线城市',
            weightanalysis:'A',
            policy:'否',
          },{
          tableData: [{
            order: '1',
            city:'上海市',
            province:'直辖市',
            cityrank:'一线城市',
            weightanalysis:'A',
            policy:'否',
          }]
        }
      },
      methods: {
      handleClick(row) {
        console.log(row);
        }
     }
    }
	
	
</script>

<style>
#city_classify_tab{
	border: #909399 1px solid;
    color: #333;
    border-radius: 30px;
    margin: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
	
	
	/*card部分*/	
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>