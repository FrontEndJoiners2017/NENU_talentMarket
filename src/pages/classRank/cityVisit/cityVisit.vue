<template>
    <el-container>
        <div id="visitHome">
        <!-- 搜索框部分 -->
            <el-card class="visit-boxCard" v-if="normal">
                <el-form :model="searchBox">
                    <el-row>
                        <el-col :span="21" class="Title">
                            <span>回访城市排名检索</span>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" icon="el-icon-search" @click="search()" plain>检索</el-button>
                        </el-col>
                    </el-row>
                    <el-row id="selectBoxs">
                        <el-col :span="4">
                            <!-- 教育/非教育类型选择 -->
                            <el-form-item prop="kind">
                                <el-select @change="changeKind" v-model="searchBox.kind" placeholder="请选择类型">
                                    <el-option v-for="item in optionsKind" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="year">
                                <el-select @change="changeYear" v-model="searchBox.year" placeholder="请选择年份">
                                    <el-option v-for="item in optionsYear" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="searchInput">
                                <el-input v-model="searchBox.searchInput" placeholder="城市名称/省份" id="searchIn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="range">
                                <el-select v-model="searchBox.range" placeholder="请选择生源人数">
                                    <el-option v-for="item in optionsRange" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="weight">
                                <el-select v-model="searchBox.weight" placeholder="请选择权重">
                                    <el-option v-for="item in optionsWeight" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            
            <!-- 第一个表格 -->
            <el-card class="visit-boxCard visitTable" v-if="normal">
                <el-table v-loading="visitLoading1" :data="tableData1.slice((currentPage1-1)*pagesize,currentPage1*pagesize)" style="width: 100%" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="year" label="年份"></el-table-column>
                    <el-table-column align="center" label="序号" type="index">
                        <template slot-scope="scope">
                            <span>{{(currentPage1 - 1) * pagesize + scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="education_yon" label="类型"></el-table-column>
                    <el-table-column align="center" prop="city_name" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="visitCount" label="走访单位数"></el-table-column>
                    <el-table-column align="center" prop="returnCount" label="回访单位数"></el-table-column>
                    <el-table-column align="center" prop="city_recency" label="回访率"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="权重分析"></el-table-column>
                    <el-table-column align="center" label="详细信息">
                        <template slot-scope="scope">
                            <el-button type="text" @click="detialInfor(scope)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total1" @current-change="current_change1"></el-pagination>
                </div>
            </el-card>

            <!-- 对比上一年框 -->
            <!-- <el-card class="visit-boxCard compare-boxCard" v-if="normal">
                <el-form :model="compareBox">
                    <el-row>
                        <el-col :span="10" class="Title">
                            <span>回访率显著提升城市排名</span>
                            <span style="font-size: 13px;">(对比上一年)</span>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card> -->

            <!-- 第二个表格 -->
            <!-- <el-card class="visit-boxCard visitTable" v-if="normal">
                <el-table v-loading="visitLoading2" :data="tableData2.slice((currentPage2-1)*pagesize,currentPage2*pagesize)" style="width: 100%" id="elTable">
                    创建表格各列
                    <el-table-column align="center" prop="id" label="序号"></el-table-column>
                    <el-table-column align="center" prop="city_name" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="city_exception" label="城市分级"></el-table-column>
                    <el-table-column align="center" prop="city_sign" label="地区需求"></el-table-column>
                    <el-table-column align="center" prop="city_recency" label="本年度回访率"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="上年度回访率"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="提升"></el-table-column>
                </el-table>
                分页
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total2" @current-change="current_change2"></el-pagination>
                </div>
            </el-card> -->

            <!-- 查看详情 -->
            <!-- 标题 -->
            <!-- <el-card class="visit-boxCard" v-if="detail">
                <el-row>
                    <el-col class="Title">
                        <span>城市详情信息</span>
                    </el-col>
                </el-row>
            </el-card> -->

            <!-- 城市信息 -->
            <!-- <el-card class="visit-boxCard detail-boxCard" v-model="cityDetail" v-if="detail">
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
            </el-card> -->
            
            <!-- 单位列表 -->
            <!-- <el-card class="visit-boxCard visitTable" v-if="detail">
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
                <el-table v-loading="detailLoading" :data="tableData3.slice((currentPage3-1)*pagesize,currentPage3*pagesize)" style="width: 100%" id="elTable">
                    创建表格各列
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
                分页
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total3" @current-change="current_change3"></el-pagination>
                </div>
            </el-card> -->
        </div>
    </el-container>
</template>

<script>
// 引入表格
import Qs from 'qs';
export default {
    data() {
        return{
            //城市排名/查看详情
            normal: true,
            detail: false,

            //每页装的元组
            pagesize: 10,
            //表格1中的数据和分页
            tableData1: [],
            //当前页数
            currentPage1: 1,
            //元组总数目
            total1: 0,

            //表格2中的数据和分页
            tableData2: [],
            //当前页数
            currentPage2: 1,
            //元组总数目
            total2: 0,

            //城市详情的数据和分页
            tableData3: [],
            //当前页数
            currentPage3: 1,
            //元组总数目
            total3: 0,

            //搜索部分
            searchBox: {
                //教育/非教育类型
                kind: '',
                year: '',
                searchInput: '',
                //生源人数范围
                range: '',
                //权重
                weight: ''
            },
            //搜索变量
            submitKind: "",
            submitYear: "",
            //教育/非教育类的option
            optionsKind: [
                {
                    value: 1,
                    label: '教育类'
                },
                {
                    value: 2,
                    label: '非教育类'
                }
            ],
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
            //生源人数范围
            optionsRange: [
                {
                    value: '1',
                    label: "10以下"
                },
                {
                    value: '2',
                    label: "10-20"
                },
                {
                    value: '3',
                    label: "20-50"
                },
                {
                    value: '4',
                    label: "50-100"
                },
                {
                    value: '5',
                    label: "100以上"
                }
            ],
            //权重
            optionsWeight: [
                {
                    value: '1',
                    label: 'A'
                },
                {
                    value: '2',
                    label: 'B'
                },
                {
                    value: '3',
                    label: 'C'
                },
                {
                    value: '4',
                    label: 'D'
                },
            ],

            //对比上一年框
            compareBox: {
                
            },
            
            //城市详细信息
            cityDetail: [],

            //加载
            visitLoading1: true,
            visitLoading2: true,
            detailLoading: true,

            //单位列表
            companyList: {
                year: '',
                companyKind: '',
            },

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
        //第二个表格
        current_change2(currentPage){
            this.currentPage = currentPage2;
        },
        //单位列表
        current_change3(currentPage){
            this.currentPage = currentPage3;
        },

        //检索条件
        changeKind(change) {
            console.log(change);
            if(change == 1) {
                this.submitKind = "教育";
            }
            else if(change == 2) {
                this.submitKind = "非教育";
            }
        },
        changeYear(change) {
            console.log(change);
            if(change == 1) {
                this.submitYear = "2022";
            }
            else if(change == 2) {
                this.submitYear = "2021";
            }
            else if(change == 3) {
                this.submitYear = "2020";
            }
            else if(change == 4) {
                this.submitYear = "2019";
            }
            else if(change == 5) {
                this.submitYear = "2018";
            }
            else if(change == 6) {
                this.submitYear = "2017";
            }
            else if(change == 7) {
                this.submitYear = "2016";
            }
            else if(change == 8) {
                this.submitYear = "2015";
            }
        },
        //进行搜索
        search(){
            console.log(this.submitYear, this.submitKind);
            let postData = Qs.stringify({
                education: this.submitKind,
                Syear: this.submitYear,
                city_name: this.searchBox.searchInput,
            })
            this.$ajax({
                method: "post",
                // url: "http://47.103.10.220:8081/returnCity/select?education="+this.submitKind+"&Syear="+this.submitYear+"&city_name="+this.searchBox.searchInput,
                url: "http://47.103.10.220:8081/returnCity/select",
                //keyword与后端代码中的局部变量相同
                // data:{
                //     education: this.submitKind,
                //     Syear: this.submitYear,
                //     city_name: this.searchBox.searchInput,
                // },
                data: postData,
                crossDomain: true,
                cache: false,
                // 加"transformRequest"属性对请求数据进行格式化
                // transformRequest(obj){
                //     var str = [];
                //     for(var p in obj){
                //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     }
                //     return str.join("&");
                // },
            }).then(resolve => {
                console.log(resolve)
                //重新请求一次表格1
                // this.$ajax({
                //     method: "post",
                //     url: "http://47.103.10.220:8081/returnCity/listAll",
                //     dataType: "json",
                //     //跨域
                //     crossDomain: true,
                //     //保证每次请求得到的数据都是最新的而不是缓存的数据
                //     cache: false,
                // }).then(resolve => {
                //     this.tableData1 = resolve.data;
                //     //将元组总数目设为数据的总数目
                //     this.total1 = resolve.data.length;
                //     this.visitLoading1 = false;        
                //     console.log(resolve.data);
                // }, reject => {
                //     this.visitLoading1 = true;
                //     console.log("失败",reject);
                // })
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
        //表格1
        this.$ajax({
            method: "post",
            url: "http://47.103.10.220:8081/returnCity/listAll",
            dataType: "json",
            //跨域
            crossDomain: true,
            //保证每次请求得到的数据都是最新的而不是缓存的数据
            cache: false,
        }).then(resolve => {
            this.tableData1 = resolve.data;
            //将元组总数目设为数据的总数目
            this.total1 = resolve.data.length;
            this.visitLoading1 = false;        
            console.log(resolve.data);
        }, reject => {
            this.visitLoading1 = true;
            console.log("失败",reject);
        })
    },
}
</script>
<style scoped>
    #visitHome {
        width: 100%;
        margin-top: 1%;        
    }
    .visit-boxCard {
        /* position: relative; */
        text-align: center;
        border-radius: 10px;
    }
    .detail-boxCard {
        margin-top: 1%;
    }
    #selectBoxs {
        margin-top: 1.5%;
    }
    .compare-boxCard {
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
    .visitTable{
        color: #333;
        margin-top: 1%;
    }
    .detailRow {
        text-align: left;
        margin-top: 0.5%;
        margin-bottom: 0.5%;
    }
    .pagination {
        text-align: center;
    }
</style>

