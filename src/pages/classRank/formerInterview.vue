<template>
	<div id="former">
		<el-container>
			<el-main>
				<div id="intercity">
					<el-card class="box-card">
  						<div slot="header" class="clearfix">
    						<span>回访城市排名检索</span>
    						<el-button style="padding: 3px 0" type="text">导入</el-button>
    						<el-button style="padding: 3px 0" type="text">导出</el-button>
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
				
				<div id="for_inter_tab">
					<el-table :data="tableData" style="width: 100%">
      					<el-table-column prop="order" label="序号" width="155"></el-table-column>
      					<el-table-column prop="type" label="类型" width="155"></el-table-column>
      					<el-table-column prop="city" label="城市" width="155"></el-table-column>
      					<el-table-column prop="province" label="省份" width="155"></el-table-column>
      					<el-table-column prop="intercount" label="走访次数" width="155"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析" width="155"></el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息" width="155">
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
	  methods: {
      handleClick(row) {
        console.log(row);
        }
      },
    
      data() {
        return {
          tableData: [{
            order: '1',
            type: '教育',
            city:'长春市',
            province:'吉林省',
            intercount:'12',
            weightanalysis:'A',
          }, {
            order: '2',
            type: '教育',
            city:'沈阳市',
            province:'辽宁省',
            intercount:'12',
            weightanalysis:'A',
          }]
        }
      }
    }
	
	
</script>

<style>
	#for_inter_tab{
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