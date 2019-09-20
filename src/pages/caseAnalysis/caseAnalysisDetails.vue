<template>
    <div id="caseAnalysisDetails">
        <!-- 单位信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h4>XXX</h4>
                <h4>单位性质：</h4>
                <h4>单位地址：</h4>
                <h4>所在地：</h4>
            </div>
        </el-card>
        <!-- 走访信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h1>走访信息</h1>
            </div>
                <el-table
                :data="interviewTableData"
                style="width: 100%">
                    <el-table-column
                    prop="interviewYear"
                    label="年份"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="走访联系人">
                    </el-table-column>
                    <el-table-column
                    prop="position"
                    label="职务">
                    </el-table-column>
                    <el-table-column
                    prop="method"
                    label="联系方式">
                    </el-table-column>
                    <el-table-column
                    prop="staff"
                    label="走访人员">
                    </el-table-column>
                    <el-table-column
                    prop="schoolfellow"
                    label="校友">
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination background layout="prev, pager, next" :total="total1" @current-change="current_change1"></el-pagination>
        </el-card>
        <!-- 宣讲信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h4>宣讲信息</h4>
                <el-select v-model="speechSearch" @change="searchSpeech()">
                    <el-option v-for="item in speech_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-table
            :data="speechTableData"
            style="width: 100%">
                <el-table-column
                prop="speechYear"
                label="年份"
                width="180">
                </el-table-column>
                <el-table-column
                prop="speechTime"
                label="来校宣讲时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="speechStaff"
                label="宣讲人员">
                </el-table-column>
                <el-table-column
                prop="jobVacancy"
                label="招聘职位">
                </el-table-column>
                <el-table-column
                prop="signedNum"
                label="招聘人数">
                </el-table-column>
                <el-table-column
                prop="speechAddress"
                label="宣讲会地点">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total2" @current-change="current_change2"></el-pagination>
        </el-card>
        <!-- 签约信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h4>签约信息</h4>
                <el-select v-model="signSearch" @change="searchSign()">
                    <el-option v-for="item in sign_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-table
            :data="signedTableData"
            style="width: 100%">
                <el-table-column
                prop="studentName"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别"
                width="180">
                </el-table-column>
                <el-table-column
                prop="nation"
                label="民族">
                </el-table-column>
                <el-table-column
                prop="education"
                label="学历">
                </el-table-column>
                <el-table-column
                prop="grade"
                label="年级">
                </el-table-column>
                <el-table-column
                prop="signType"
                label="签约类别">
                </el-table-column>
                <el-table-column
                prop="college"
                label="学院">
                </el-table-column>
                <el-table-column
                prop="major"
                label="专业">
                </el-table-column>
                <el-table-column
                prop="studentFrom"
                label="生源地">
                </el-table-column>
                <el-table-column
                prop="position"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="student_year"
                label="年份">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total3" @current-change="current_change3"></el-pagination>
        </el-card>                       
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {
        interviewTableData: [],
        speechTableData:[],
        signedTableData:[],
        //签约搜索
        signSearch:'',
        sign_options:[
            {value:'2016',label:'2016'},
            {value:'2017',label:'2017'},
            {value:'2018',label:'2018'},
            {value:'2019',label:'2019'}
        ],
        //宣讲搜索
        speechSearch:'',
        speech_options:[
            {value:'2016',label:'2016'},
            {value:'2017',label:'2017'},
            {value:'2018',label:'2018'},
            {value:'2019',label:'2019'}
        ],
        //当前页数
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1,
        //每页装的元组
        pagesize: 10,
        //元组总数目
        total1: 0,
        total2: 0,
        total3: 0,

        }//return结束
      },//data结束
      mounted(){
        //   let data=qs.stringify({
        //       "companyIdStr":2,
        //   })
          axios({
            method:'post',
            url:this.backendUrl+'/student/listStudentByCompany?companyIdStr=2',
            crossDomain: true,
            cache: false,
            //   data:data
          }).then(response=>{
              console.log(response)
              this.signedTableData=response.data
              this.total3=response.data.length
          }).catch(error=>{
              console.log(error)
          })
          axios({
            method:'post',
            url:'47.103.10.220:8081/preach/listByName?unitName=join',
            crossDomain: true,
            cache: false,
            //   data:data
          }).then(response=>{
              console.log(response)
              this.speechTableData=response.data
              this.total2=response.data.length
          }).catch(error=>{
              console.log(error)
          })
          axios({
            method:'post',
            url:this.backendUrl+'/interview/queryCompany?companyName=join',
            crossDomain: true,
            cache: false,
          }).then(response=>{
              console.log(response)
              this.interviewTableData.interviewYear=response.data.visitorList.time
              this.interviewTableData.contacts=response.data.positionList.contact
              this.interviewTableData.position=response.data.positionList.position
              this.interviewTableData.method=response.data.positionList.mobiephone
              this.interviewTableData.staff=response.data.visitorList.visitor_name
              this.interviewTableData.schoolfellow=response.data.schoolFellowList.name

              this.total1=response.data.visitorList.length
          }).catch(error=>{
              console.log(error)
          })
      },
    methods:{
        //分页
        current_change1(currentPage){
            this.currentPage1 = currentPage;
        },
        current_change2(currentPage){
            this.currentPage2 = currentPage;
        },
        current_change3(currentPage){
            this.currentPage3 = currentPage;
        },
        //搜索宣讲信息
        searchSpeech(){
            axios({
                method:'post',
                url:'47.103.10.220:8081/preach/queryByTime?time='+this.speechSearch,
                crossDomain: true,
                cache: false,
            }).then(response=>{
                console.log(response)
                this.speechTableData=response.data
                this.total2=response.data.length
            }).catch(error=>{
                console.log(error)
            })
        },
        //签约信息搜索
        searchSign(){
            axios({
                method:'post',
                url:this.backendUrl+'/student/queryStudentByYear?studentYearStr='+this.signSearch,
                crossDomain: true,
                cache: false,
            }).then(response=>{
                console.log(response)
                this.signedTableData=response.data
                this.total3=response.data.length
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
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

