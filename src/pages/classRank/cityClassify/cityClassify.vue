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
                    <el-table-column align="center" label="序号" type="index" width="130px">
                        <template slot-scope="scope">
                            <span>{{(currentPage1 - 1) * pagesize + scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="cityRank" label="城市分级"></el-table-column>
                    <el-table-column align="center" prop="cityGrading" label="权重分析"></el-table-column>
                    <el-table-column align="center" prop="road" label="一带一路政策"></el-table-column>
                    <el-table-column align="center" label="详细信息">
                        <template slot-scope="scope">
                            <el-button type="text" @click="detialInfor(scope)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="修改">
                        <template slot-scope="scope">
                            <el-button type="info" icon="el-icon-edit" @click="changeInfor(scope)" plain>修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div id="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total1" @current-change="current_change1"></el-pagination>
                </div>
            </el-card>
            
            <!-- 修改 -->
            <el-dialog :visible.sync="changeInforDialog" title="修改" :close-on-click-modal="false" width="33%" center>
                <el-form :model="changeDetailInfor" label-width="120px">
                    <el-form-item label="城市名：">
                        <el-row>
                            <el-col :span="9">
                                <span>{{changeDetailInfor.changeCityName}}</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="城市分级：" prop="changeClassify">
                        <el-row class="changeRow">
                            <el-col :span="9">
                                <el-select @change="changeClassify" v-model="changeDetailInfor.changeClassify">
                                    <el-option v-for="item in optionClassify" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="权重分析：" prop="weightAnalysis">
                        <el-row class="changeRow">
                            <el-col :span="9">
                                <el-select @change="changeWeight" v-model="changeDetailInfor.weightAnalysis">
                                    <el-option v-for="item in optionWeight" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="一带一路政策：" prop="policy">
                        <el-row class="changeRow">
                            <el-col :span="9">
                                <el-select @change="changePolicy" v-model="changeDetailInfor.policy">
                                    <el-option v-for="item in optionPolicy" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" icon="el-icon-check" @click="changeCityClassify()" plain>确定</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="changeInforDialog=false" plain>取消</el-button>
                </div>
            </el-dialog>

            <!-- 查看详情 -->
            <!-- 标题 -->
            <el-card class="classify-boxCard" v-if="detail">
                <el-row>
                    <el-col class="Title" :span="21">
                        <span>城市详情信息</span>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" icon="el-icon-back" @click="normal=true; detail=false;" plain>返回</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <!-- 城市信息 -->
            <el-card class="classify-boxCard detail-boxCard" v-model="cityDetail" v-if="detail">
                <el-row class="detailRow">
                    <el-col :span="4">
                        <span>城市名称：{{ cityDetail.cityName }}</span>
                    </el-col>
                    <el-col :span="4">
                        <span>走访次数：{{}}</span>
                    </el-col>
                </el-row>
                <el-row class="detailRow">
                    <el-col>
                        <span>所属省份：{{ cityDetail.province }}</span>
                    </el-col>
                </el-row>
                <el-row class="detailRow">
                    <el-col>城市分级：{{ cityDetail.cityRank}}</el-col>
                </el-row>
            </el-card>

            <!-- 单位列表 -->
            <el-card class="classify-boxCard classifyTable" v-if="detail">
                <el-form :model="companyList">
                    <el-row class="detailRow">
                        <el-col :span="2" style="text-align: left">
                            <span>单位列表</span>
                        </el-col>
                        <!-- <el-col :span="5" style="text-align: left">
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
                        </el-col> -->
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
import qs from 'qs';
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

            //修改窗口
            changeInforDialog: false,
            changeDetailInfor: {
                id: '',
                changeCityName: '',
                province: '',
                changeClassify: '',
                weightAnalysis: '',
                policy: ''
            },
            //修改变量
            submitClassify: '',
            submitWeight: '',
            submitPolicy: '',
            optionClassify: [
                {
                    value: 1,
                    label: '一线城市'
                },
                {
                    value: 2,
                    label: '新一线城市'
                },
                {
                    value: 3,
                    label: '二线城市'
                },
                {
                    value: 4,
                    label: '三线城市'
                },
                {
                    value: 5,
                    label: '四线城市'
                },
                {
                    value: 6,
                    label: '五线城市'
                }
            ],
            optionWeight: [
                {
                    value: 1,
                    label: 'A'
                },
                {
                    value: 2,
                    label: 'B'
                },
                {
                    value: 3,
                    label: 'C'
                },
                {
                    value: 4,
                    label: 'D'
                }
            ],
            optionPolicy: [
                {
                    value: 1,
                    label: '是'
                },
                {
                    value: 2,
                    label: '否'
                }
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
            console.log(this.searchBox.searchInput);
            this.$ajax({
                method: "post",
                url: "http://47.103.10.220:8081/cityLevel/queryByKeyword?key="+this.searchBox.searchInput,
                //keyword与后端代码中的局部变量相同
                // data:{
                //     key: this.searchBox.searchInput,
                // },
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
            }).then(resolve => {
                console.log(resolve);
                this.tableData1 = resolve.data;
                //将元组总数目设为数据的总数目
                this.total1 = resolve.data.length;
                this.classifyoading = false;
            },reject =>{
                this.classifyLoading = true;
                console.log("失败"+reject);
            })
        },

        //修改选择
        changeClassify(change) {
           if(change == 1) {
                this.submitClassify = "一线城市";
            }
            else if(change == 2) {
                this.submitClassify = "新一线城市";
            }
            else if(change == 3) {
                this.submitClassify = "二线城市";
            }
            else if(change == 4) {
                this.submitClassify = "三线城市";
            }
            else if(change == 5) {
                this.submitClassify = "四线城市";
            }
            else if(change == 6){
                this.submitClassify = "五线城市";
            } 
        },
        changeWeight(change) {
            if(change == 1) {
                this.submitWeight = "A";
            }
            else if(change == 2) {
                this.submitWeight = "B";
            }
            else if(change == 3) {
                this.submitWeight = "C";
            }
            else if(change == 4){
                this.submitWeight = "D";
            }
        },
        changePolicy(change) {
            if(change == 1) {
                this.submitPolicy = "是";
            }
            else if(change == 2){
                this.submitPolicy = "否";
            }
        },
        //修改信息
        changeInfor(scope) {
            console.log(scope.row);
            this.changeDetailInfor.id = scope.row.id;
            this.changeDetailInfor.province = scope.row.province;
            this.changeDetailInfor.changeCityName = scope.row.cityName;
            this.changeDetailInfor.changeClassify = scope.row.cityRank;
            this.changeDetailInfor.weightAnalysis = scope.row.cityGrading;
            this.changeDetailInfor.policy = scope.row.road;
            this.changeInforDialog = true;
        },

        //查看详情
        detialInfor(scope) {
            console.log(scope.row.id);
            var listId = scope.row.id;
            this.$ajax({
                method: "post",
                url: "http://10.108.118.124:8080//city/cityDetails?id="+listId,
                // url: "http://47.103.10.220:8081/cityLevel/queryById",
                // data: {
                //     id: listId
                // },
                crossDomain: true,
                cache: false,
                transformRequest(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
            }).then(resolve => {
                console.log(resolve);
                this.cityDetail = resolve.data;
                this.detail = true;
                this.normal = false;
            }, reject => {
                console.log(reject);
            });
        },

        //提交修改
        changeCityClassify() {
            console.log(this.changeDetailInfor.changeClassify);
            console.log(this.changeDetailInfor.weightAnalysis);
            console.log(this.changeDetailInfor.policy);
            //一带一路政策
            if(this.submitClassify == '') {
                this.submitClassify = this.changeDetailInfor.changeClassify;
            }
            if(this.submitWeight == '') {
                this.submitWeight = this.changeDetailInfor.weightAnalysis;
            }
            if(this.submitPolicy == '') {
                this.submitPolicy = this.changeInforDialog.policy
            }
            console.log(this.submitClassify, this.submitWeight, this.submitPolicy);
            this.$ajax({
                method: "post",
                url: "http://47.103.10.220:8081/cityLevel/updateCityLevel?id="+this.changeDetailInfor.id+"&cityGrading="+this.submitWeight+"&cityRank="+this.submitClassify+"&road="+this.submitPolicy,
                // url: "http://47.103.10.220:8081/cityLevel/updateCityLevel",
                // data: {
                //     //id
                //     id: this.changeDetailInfor.id,
                //     cityGrading: this.submitClassify,
                //     //权重分析
                //     cityRank: this.submitWeight,
                //     //一带一路
                //     road: this.submitPolicy,
                // },
                crossDomain: true,
                cache: false,
                transformRequest(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
            }).then(resolve => {
                console.log(resolve);
                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                });
                this.changeInforDialog = false;
                //再重新请求数据
                this.$ajax({
                    method: "post",
                    url: "http://47.103.10.220:8081/cityLevel/listAll",
                    dataType: "json",
                    //跨域
                    crossDomain: true,
                    //保证每次请求得到的数据都是最新的而不是缓存的数据
                    cache: false,
                }).then(resolve => {
                    console.log(resolve);
                    this.tableData1 = resolve.data;
                    //将元组总数目设为数据的总数目
                    this.total1 = resolve.data.length;
                    this.classifyLoading = false;        
                }, reject => {
                    this.classifyLoading = true;
                    console.log("失败",reject);
                });
            }, reject => {
                console.log(reject);
                this.$notify.error({
                    title: '失败',
                    message: '添加失败',
                })
            });
        },
    },
    //请求数据
    created() {
        this.$ajax({
            method: "post",
            url: "http://47.103.10.220:8081/cityLevel/listAll",
            dataType: "json",
            //跨域
            crossDomain: true,
            //保证每次请求得到的数据都是最新的而不是缓存的数据
            cache: false,
        }).then(resolve => {
            console.log(resolve);
            this.tableData1 = resolve.data;
            //将元组总数目设为数据的总数目
            this.total1 = resolve.data.length;
            this.classifyLoading = false;        
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
    .changeRow {
        margin-top: 1%;
        margin-bottom: 1%;
    }
    .dialog-footer {
        text-align: right;
        margin-right: 4%;
    }
</style>

