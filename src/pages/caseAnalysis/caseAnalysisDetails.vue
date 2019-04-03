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
                <h4>走访信息</h4>
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
                    prop="interviewTimesForYear"
                    label="走访次数"
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
        </el-card>
        <!-- 宣讲信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h4>宣讲信息</h4>
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
        </el-card>
        <!-- 签约信息 -->
        <el-card class="box-card">
            <div  class="text item">
                <h4>签约信息</h4>
            </div>
            <el-table
            :data="signedTableData"
            style="width: 100%">
                <el-table-column
                prop="stuName"
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
                prop="diploma"
                label="学历">
                </el-table-column>
                <el-table-column
                prop="grade"
                label="年级">
                </el-table-column>
                <el-table-column
                prop="jobSort"
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
                prop="birthPlace"
                label="生源地">
                </el-table-column>
                <el-table-column
                prop="position"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="signedYear"
                label="年份">
                </el-table-column>
            </el-table>
        </el-card>                       
    </div>
</template>

<script>
export default {
    data() {
        return {
          interviewTableData: [{
            interviewYear: '',
            interviewTimesForYear: '',
            contacts: '',
            position:'',
            method:'',
            staff:'',
            schoolfellow:''
          }],
          speechTableData:[{
              speechYear:'',
              speechTime:'',
              speechStaff:'',
              jobVacancy:'',
              signedNum:'',
              speechAddress:''
          }],
          signedTableData:[{
              stuName:'',
              sex:'',
              nation:'',
              diploma:'',
              grade:'',
              jobSort:'',
              college:'',
              major:'',
              birthPlace:'',
              position:'',
              signedYear:''
          }]
        }
      }
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 100%;
}
</style>

