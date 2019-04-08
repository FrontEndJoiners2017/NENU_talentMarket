<template>
	<div id="visit">
		<el-container>
			<el-main>
				<div id="visitcity" class="bigblock">
					<el-card class="box-card">
  						<div slot="header" class="clearfix">
    						<span>回访城市排名检索</span>
    						<el-button style="padding: 3px 0" type="text">导入</el-button>
    						<el-button style="padding: 3px 0" type="text">导出</el-button>
    						<el-button style="padding: 3px 0" type="text">检索</el-button>
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
				
				<div id="city_visit_tab" class="bigblock">
					<el-table :data="tableData" style="width: 100%">
      					<el-table-column prop="year" label="年份" width="109"></el-table-column>
      					<el-table-column prop="order" label="序号" width="109"></el-table-column>
      					<el-table-column prop="type" label="类型" width="109"></el-table-column>
      					<el-table-column prop="city" label="城市" width="109"></el-table-column>
      					<el-table-column prop="province" label="省份" width="109"></el-table-column>
      					<el-table-column prop="intercom" label="走访单位数" width="109"></el-table-column>
      					<el-table-column prop="backcom" label="回访单位数" width="109"></el-table-column>
      					<el-table-column prop="returnrate" label="回访率" width="109"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析" width="109"></el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息" width="109">
      						<template slot-scope="scope">
        						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						    </template>
      					</el-table-column>
    				</el-table>
				</div>
				
				<div class="block" class="bigblock"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
				
				<div id="compare_title" class="bigblock">
					<el-card class="box-card">
  						<div slot="header" class="clearfix">
    						<span>回访率显著提升城市排名检索（对比上一年）</span>
  						</div>
					</el-card>
				</div>
				
				<div id="higher_visit_tab" class="bigblock">
					<el-table :data="tableData1" style="width: 100%">
      					<el-table-column prop="order" label="序号" width="136"></el-table-column>
      					<el-table-column prop="city" label="城市" width="136"></el-table-column>
      					<el-table-column prop="province" label="省份" width="136"></el-table-column>
      					<el-table-column prop="cityrank" label="城市分级" width="136"></el-table-column>
      					<el-table-column prop="regionaldemand" label="地区需求" width="136"></el-table-column>
      					<el-table-column prop="this_visitrate" label="本年度回访率" width="136"></el-table-column>
      					<el-table-column prop="last_visitrate" label="上年度回访率" width="136"></el-table-column>
      					<el-table-column prop="promote" label="提升" width="136" color="red"></el-table-column>
    				</el-table>
				</div>
				
				<div class="block" class="bigblock"><!--分页-->
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
          	year:'2019',
            order: '1',
            type: '教育',
            city:'长春市',
            province:'吉林省',
            intercom:'12',
            backcom:'12',
            returnrate:'6%',
            weightanalysis:'A',
          }, {
            year:'2019',
            order: '1',
            type: '教育',
            city:'沈阳市',
            province:'辽宁省',
            intercom:'12',
            backcom:'12',
            returnrate:'5%',
            weightanalysis:'A',
          },{
            year:'2019',
            order: '1',
            type: '教育',
            city:'北京市',
            province:'直辖市',
            intercom:'12',
            backcom:'12',
            returnrate:'11%',
            weightanalysis:'A',
         }]
          
          
          
          
          ,tableData1: [{
            order: '1',
            city:'长春市',
            province:'吉林省',
            cityrank:'新一线城市',
            regionaldemand:'B',
            this_visitrate:'6%',
            last_visitrate:'6%',
            promote:'6%',
          }, {
            order: '2',
            city:'沈阳市',
            province:'辽宁省',
            cityrank:'新一线城市',
            regionaldemand:'B',
            this_visitrate:'5%',
            last_visitrate:'5%',
            promote:'5%',
          },{
            order: '3',
            city:'北京市',
            province:'直辖市',
            cityrank:'一线城市',
            regionaldemand:'A',
            this_visitrate:'11%',
            last_visitrate:'11%',
            promote:'11%',
          }]
        }
      }
    }
	
</script>

<style>
	#visitcity{
		border: #909399 1px solid;
	    color: #333;
	    border-radius: 30px;
	    margin: 5px;
	    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
	#city_visit_tab{
		border: #909399 1px solid;
	    color: #333;
	    border-radius: 30px;
	    margin: 5px;
	    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
	#compare_title{
		border: #909399 1px solid;
	    color: #333;
	    border-radius: 30px;
	    margin: 5px;
	    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
	#higher_visit_tab{
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