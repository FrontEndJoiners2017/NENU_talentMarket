<template>
	<div id="former">
		<el-container>
			<el-main>
				<div id="city_rank_search">
					<el-card id="box-card">
  						<div slot="header" class="clearfix" id="cardtitle">
    						<span>城市分级排名检索</span>
    						<el-button size="small" id="btn">导入</el-button>
    						<el-button size="small" id="btn1">导出</el-button>
    						<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item>
									<el-input id="fillin" size="small" placeholder="关键字检索" v-model="input10" clearable></el-input>
								</el-form-item>
								<el-form-item>
								    <el-button size="small" @click="onSubmit">检索</el-button>
								</el-form-item>
							</el-form>
  						</div>
  						
					</el-card>
				</div>
				
				<div id="city_classify_tab">
					<el-table :data="tableData" style="width: 100%" id="eltable">
      					<el-table-column prop="order" label="序号"></el-table-column>
      					<el-table-column prop="city" label="城市"></el-table-column>
      					<el-table-column prop="province" label="省份"></el-table-column>
      					<el-table-column prop="cityrank" label="城市分级"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析"></el-table-column>
      					<el-table-column prop="policy" label="一带一路政策"></el-table-column>
      					<el-table-column prop="modify" label="修改">
      						<template slot-scope="scope"><!--修改按钮-->
        						<el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
						    </template>
      					</el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息">
      						<template slot-scope="scope">
        						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						    </template>
      					</el-table-column>
    				</el-table>
				</div>
				
				<div class="block"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000" id="page"></el-pagination>
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
		            order: '1',
		            city:'天津市',
		            province:'直辖市',
		            cityrank:'新一线城市',
		            weightanalysis:'A',
		            policy:'否',
		        },{
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
	        },
	        onSubmit() {
          		console.log('submit!');
        	}
        }
    }
	
	
</script>

<style scoped>
	/*表格*/
	#eltable{
		border-radius: 10px;
        width: 100%;
        padding: 1% 2%;
        border: #cbcaca 1px solid;
        margin-top: 1%;
	}

	
	
	/*card部分*/	
	#box-card{
        padding: 0% 2%;
        border: #cbcaca 1px solid;
        border-radius: 10px;
        margin-top: 1%;
        margin-bottom: 25px;
        
	}
	#former{
		width: 100%;
        margin: 0 auto;
        margin-top: 1%;
	}
	#cardtitle{
		border: 0;
	}
	#cardtitle  span{float: left; margin-right: 15px;}
	#btn{
		float: left;
	}
	#btn1{
		float: left;
	}
	#select1{
		float: left;
	}
	#fillin{
		margin-top: 3px;
		float: left;
	}
	.el-card{
		box-shadow: 0;
	}
	.el-card__header{
		padding: 18px 0px;
		border-bottom: 0px;
	}
	.el-card__body {
    padding: 0px;
	}
	.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
	}
	
	
	
	
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


/*分页*/
	#page{
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
