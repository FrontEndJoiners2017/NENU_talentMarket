<template>
    <el-container>
        <div id="classifyHome">
        <!-- 搜索框部分 -->
            <el-card class="classify-boxCard" v-if="normal">
                <el-form :model="searchBox">
                    <el-row>
                        <el-col :span="16" class="Title">
                            <span>城市分级排名检索</span>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="searchInput">
                                <el-input v-model="searchBox.searchInput" placeholder="关键字搜索" id="searchIn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="search()" plain>检索</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            
            <!-- 表格 -->
            <el-card class="classify-boxCard classifyTable" v-if="normal">
                <el-table v-loading="classifyLoading" :data="tableData1.slice((currentPage1-1)*pagesize,currentPage1*pagesize)" style="width: 100%" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="id" label="序号"></el-table-column>
                    <el-table-column align="center" prop="city_name" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="city_exception" label="城市分级"></el-table-column>
                    <el-table-column align="center" prop="city_sign" label="权重分析"></el-table-column>
                    <el-table-column align="center" prop="city_studentFrom" label="一带一路政策"></el-table-column>
                    <el-table-column align="center" prop="city_visit" label="往届走访"></el-table-column>
                    <el-table-column align="center" label="详细信息">
                        <template slot-scope="scope">
                            <el-button type="text" @click="detialInfor(scope)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="修改">
                        <template slot-scope="scope">
                            <el-button type="info" icon="el-icon-edit" @click="changeInfor(scope)" plain circle>修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div id="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total1" @current-change="current_change1"></el-pagination>
                </div>
            </el-card>

            <!-- 查看详情 -->
            <!-- 标题 -->
            <el-card class="classify-boxCard" v-if="detail">
                <el-row>
                    <el-col class="Title">
                        <span>城市详情信息</span>
                    </el-col>
                </el-row>
            </el-card>

            <!-- 城市信息 -->
            <el-card class="classify-boxCard detail-boxCard" v-model="cityDetail" v-if="detail">
                <el-row class="detailRow">
                    <el-col :span="4">
                        <span>城市名称：{{}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span>走访次数：{{}}</span>
                    </el-col>
                </el-row>
                <el-row class="detailRow">
                    <el-col>
                        <span>所属省份：{{}}</span>
                    </el-col>
                </el-row>
                <el-row class="detailRow">
                    <el-col>城市分级：{{}}</el-col>
                </el-row>
            </el-card>

            <!-- 单位列表 -->
            <el-card class="classify-boxCard classifyTable" v-if="detail">
                <el-form :model="companyList">
                    <el-row class="detailRow">
                        <el-col :span="2" style="text-align: left">
                            <span>单位列表</span>
                        </el-col>
                        <el-col :span="5" style="text-align: left">
                            <el-form-item>
                                <el-select v-model="companyList.year" placeholder="请选择年份">
                                    <el-option v-for="item in optionsYear" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" style="text-align: left">
                            <el-form-item>
                                <el-select v-model="companyList.companyKind" placeholder="请选择单位类型">
                                    <el-option v-for="item in optionsCompanyKind" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align: left">
                            <el-button type="primary" icon="el-icon-search" @click="search()" plain>检索</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table v-loading="detailLoading" :data="tableData2.slice((currentPage2-1)*pagesize,currentPage2*pagesize)" style="width: 100%" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="id" label="序号"></el-table-column>
                    <el-table-column align="center" prop="city_score" label="单位名称"></el-table-column>
                    <el-table-column align="center" prop="city_name" label="单位性质"></el-table-column>
                    <el-table-column align="center" prop="province" label="年份"></el-table-column>
                    <el-table-column align="center" prop="city_exception" label="签约总人数"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="签约本科"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="签约研究生"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="签约来校宣讲次数"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="走访情况"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total2" @current-change="current_change2"></el-pagination>
                </div>
            </el-card>
        </div>
    </el-container>
</template>

<script>
// 引入表格

export default {
    data() {
        return{
            //城市排名/查看详情
            normal: true,
            detail: false,

            pagesize: 10,
            //城市排名：
            tableData1: [],
            currentPage1: 1,
            total1: 0,
            //城市详情
            tableData2: [],
            currentPage2: 1,
            total2: 0, 

            //搜索部分
            searchBox: {
                //搜索输入框
                searchInput: '',
            },
            //加载
            classifyLoading: true,
            detailLoading: true,

            //城市详细信息
            cityDetail: [],
            
            //单位列表
            companyList: {
                year: '',
                companyKind: '',
            },

            //年份
            optionsYear: [
                {
                    value: 1,
                    label: '2022'
                },
                {
                    value: 2,
                    label: '2021'
                },
                {
                    value: 3,
                    label: '2020'
                },
                {
                    value: 4,
                    label: '2019'
                },
                {
                    value: 5,
                    label: '2018'
                },
                {
                    value: 6,
                    label: '2017'
                },
                {
                    value: 7,
                    label: '2016'
                },
                {
                    value: 8,
                    label: '2015'
                },
            ],
            //单位类型
            optionsCompanyKind: [
                {
                    value: 1,
                    label: '签约单位'
                },
                {
                    value: 2,
                    label: '来校宣讲'
                },
                {
                    value: 3,
                    label: '走访单位'
                },
            ],
        }
    },
    methods: {
        //传入分页的当前页，令定义的当前页=分页的当前页
        //第一个表格
        current_change1(currentPage){
            this.currentPage = currentPage1;
        },
        //详细信息
        current_change2(currentPage){
            this.currentPage = currentPage2;
        },

        //进行搜索
        search(){
            console.log(this.searchBox.detailDigital);
            this.$ajax({
                method: "post",
                url: "http://localhost:8088/testBoot/selectEducationByKeyword",
                //keyword与后端代码中的局部变量相同
                data:{
                    keyword: this.searchBox.searchInput,
                },
                crossDomain: true,
                cache: false,
                // 加"transformRequest"属性对请求数据进行格式化
                transformRequest(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
            }).then(response => {
                this.tableData = response.data;
                this.total = response.data.length;
                this.classifyLoading = false;
                console.log(response.data);
            },reject =>{
                this.classifyLoading = true;
                console.log("失败"+reject);
            })
        },
        //修改信息
        changeInfor(scope) {
            console.log(scope);
        },
        //查看详情
        detialInfor(scope) {
            console.log(scope);
        },
    },
    created() {
        this.$ajax({
            method: "post",
            url: "http://localhost:8088/testBoot/listAll",
            dataType: "json",
            //跨域
            crossDomain: true,
            //保证每次请求得到的数据都是最新的而不是缓存的数据
            cache: false,
        }).then(resolve => {
            this.tableData = resolve.data;
            //将元组总数目设为数据的总数目
            this.total = resolve.data.length;
            this.classifyoading = false;        
            console.log(resolve.data);
        }, reject => {
            this.classifyLoading = true;
            console.log("失败",reject);
        })
    },
}
</script>
<style scoped>
    #classifyHome {
        width: 100%;
        margin-top: 1%;        
    }
    .classify-boxCard {
        /* position: relative; */
        text-align: center;
        border-radius: 10px;
    }
    .detail-boxCard {
        margin-top: 1%;
    }
    .el-form-item {
        margin-bottom: 0;
    }
    .Title {
        text-align: left;
        font-size: 19px;
        /* border: 1px solid red; */
    }
    .classifyTable{
        color: #333;
        margin-top: 1%;
    }
    .detailRow {
        text-align: left;
        margin-top: 0.5%;
        margin-bottom: 0.5%;
    }
    #pagination {
        text-align: center;
    }
</style>

