<template>
<el-menu :default-openeds="['1','2']">
    <router-link to='DFU'>
        <div id="logoBox">
            <h1>东北师范大学</h1>
            <h1>就业市场数据</h1>
            <h1>分析系统</h1>
        </div>
    </router-link>
    <el-submenu index="1">
        <template slot="title"><!-- 标题 -->
            <i class="el-icon-star-on"></i><!-- 标题图标 -->
            <span>城市综合排名</span><!-- 标题名称 -->
        </template>
        <el-menu-item index="1-1">教育行业</el-menu-item>
        <el-menu-item index="1-2">非教育行业</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
        <template slot="title"><!-- 标题 -->
            <i class="el-icon-menu"></i><!-- 标题图标 -->
            <span>城市分类排名</span><!-- 标题名称 -->
        </template>
        <el-menu-item index="2-1">签约城市</el-menu-item>
        <el-menu-item index="2-2">意向城市</el-menu-item>
        <el-menu-item index="2-3">生源城市</el-menu-item>
        <el-menu-item index="2-4">往届走访</el-menu-item>
        <el-menu-item index="2-5">城市回访</el-menu-item>
        <el-menu-item index="2-6">城市分级</el-menu-item>
    </el-submenu>

    <router-link to="markInterviewHome">
        <el-menu-item index="3">
            <template slot="title"><!-- 标题 -->
                <i class="el-icon-sold-out"></i><!-- 标题图标 -->
                <span>市场走访管理</span><!-- 标题名称 -->
            </template>
        </el-menu-item>
    </router-link>
    <router-link to="caseAnalysisHome">
        <el-menu-item index="4">
            <template slot="title"><!-- 标题 -->
                <i class="el-icon-view"></i><!-- 标题图标 -->
                <span>单位情况分析</span><!-- 标题名称 -->
            </template>
        </el-menu-item>
    </router-link>
    
    <el-menu-item index="5">
        <template slot="title"><!-- 标题 -->
            <i class="el-icon-setting"></i><!-- 标题图标 -->
            <span>系统管理</span><!-- 标题名称 -->
        </template>
    </el-menu-item>
    <el-menu-item index="6">
        <template slot="title"><!-- 标题 -->
            <i class="el-icon-circle-plus"></i><!-- 标题图标 -->
            <span>人员管理</span><!-- 标题名称 -->
        </template>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: 'Navigation',
    data () {
        return {
        msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logoBox{
    background-color: #409EFF;
    color: #FFFFFF;
    padding: 30px 0;
}
#logoBox h1{
    margin: 5px 0;
}
</style>
