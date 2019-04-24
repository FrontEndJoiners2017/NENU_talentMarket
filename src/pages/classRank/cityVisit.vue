<template>
	<div id="visit">
		<el-container>
			<el-main>
				<div id="visitcity" class="bigblock">
					<el-card id="box-card">
  						<div slot="header" class="clearfix" id="cardtitle">
    						<span>回访城市排名检索</span>
    						<el-button size="small">导入</el-button>
    						<el-button size="small">导出</el-button>
  						</div>
  						<div  class="text item" id="searchbox">
  							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item label="" id="select1">
								    <el-select size="small" v-model="formInline.category" placeholder="教育类">
								        <el-option label="教育类" value="教育类"></el-option>
								      	<el-option label="非教育类" value="非教育类"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item label="">
								    <el-select size="small" v-model="formInline.year" placeholder="2019">
								        <el-option label="2019" value="2019"></el-option>
								      	<el-option label="2018" value="2018"></el-option>
								      	<el-option label="2017" value="2017"></el-option>
								      	<el-option label="2016" value="2016"></el-option>
								      	<el-option label="2015" value="2015"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item>
									<el-input id="fillin" size="small" placeholder="城市名称/省份" v-model="input10" clearable></el-input>
								</el-form-item>
								<el-form-item label="">
								    <el-select size="small" v-model="formInline.stnum" placeholder="生源人数">
								        <el-option label="生源人数" value="生源人数"></el-option>
								        <el-option label="100以上" value="100以上"></el-option>
								        <el-option label="50-100" value="50-100"></el-option>
								        <el-option label="20-50" value="20-50"></el-option>
								        <el-option label="10-20" value="10-20"></el-option>
								        <el-option label="10以下" value="10以下"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item label="">
								    <el-select size="small" v-model="formInline.rank" placeholder="A">
								        <el-option label="A" value="一等"></el-option>
								      	<el-option label="B" value="二等"></el-option>
								      	<el-option label="C" value="三等"></el-option>
								      	<el-option label="D" value="四等"></el-option>
								      	<el-option label="E" value="五等"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item>
								    <el-button size="small" @click="onSubmit">检索</el-button>
								</el-form-item>
							</el-form>
  						</div>
					</el-card>
				</div>
				
				<div id="city_visit_tab" class="bigblock">
					<el-table :data="tableData" style="width: 100%" id="eltable">
      					<el-table-column prop="year" label="年份"></el-table-column>
      					<el-table-column prop="order" label="序号"></el-table-column>
      					<el-table-column prop="type" label="类型"></el-table-column>
      					<el-table-column prop="city" label="城市"></el-table-column>
      					<el-table-column prop="province" label="省份"></el-table-column>
      					<el-table-column prop="intercom" label="走访单位数"></el-table-column>
      					<el-table-column prop="backcom" label="回访单位数"></el-table-column>
      					<el-table-column prop="returnrate" label="回访率"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析"></el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息" width="150">
      						<template slot-scope="scope">
        						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						    </template>
      					</el-table-column>
    				</el-table>
				</div>
				
				<div class="bigblock"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000" id="page"></el-pagination>
				</div>
				
				<div id="compare_title" class="bigblock">
					<el-card id="box-card1">
  						<div slot="header" class="clearfix" id="cardtitle">
    						<span>回访率显著提升城市排名检索（对比上一年）</span>
  						</div>
					</el-card>
				</div>
				
				<div id="higher_visit_tab" class="bigblock">
					<el-table :data="tableData1" style="width: 100%" id="eltable1">
      					<el-table-column prop="order" label="序号"></el-table-column>
      					<el-table-column prop="city" label="城市"></el-table-column>
      					<el-table-column prop="province" label="省份"></el-table-column>
      					<el-table-column prop="cityrank" label="城市分级"></el-table-column>
      					<el-table-column prop="regionaldemand" label="地区需求"></el-table-column>
      					<el-table-column prop="this_visitrate" label="本年度回访率"></el-table-column>
      					<el-table-column prop="last_visitrate" label="上年度回访率"></el-table-column>
      					<el-table-column prop="promote" label="提升" color="red"></el-table-column>
    				</el-table>
				</div>
				
				<div class="bigblock"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000" id="page1"></el-pagination>
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
        },
      onSubmit() {
          console.log('submit!');
        }
      },
    
      data() {
        return {
          formInline: {
            category: '',
            year:'',
            stnum:'',
            rank: ''
          },
          input10: '',
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
	/*表格*/
	
	#eltable{
		border-radius: 10px;
        width: 100%;
        padding: 1% 2%;
        border: #cbcaca 1px solid;
        margin-top: 1%;
	}
	#eltable1{
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
	#box-card1{
		padding: 0% 2%;
        border: #cbcaca 1px solid;
        border-radius: 10px;
        margin-top: 1%;
        margin-bottom: 25px;
        
	}
	#visitcity{
		width: 100%;
        margin: 0 auto;
        margin-top: 1%;
	}
	#cardtitle{
		border: 0;
	}
	#cardtitle  span{float: left;}
	#cardtitle1  span{float: left;}
	
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
	
	/*下拉框,输入框*/
	.el-select{
		width:140px;
		/*float: left;*/
	}
	.el-input{
		/*float: left;*/
		
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
	#page1{
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
