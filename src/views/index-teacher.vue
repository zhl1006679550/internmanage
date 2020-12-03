<template>
    <el-container style="height: 100%; border: 1px solid #eee">
      <!--左侧导航栏-->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <!--菜单最外层-->
            <el-menu :default-openeds="['0','1']" router>
               <!--一级菜单-->
                <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''"  v-if="item.show_teacher">
                    <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                <!--二级菜单-->
                    <el-menu-item v-for="item2 in item.children" :index="item2.path" :class="$route.path===item2.path?'is-active':''" v-if="item2.show_teacher">{{item2.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!--右侧内容区-->
        <el-container>
            <!--右侧头部导航-->
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="SignOut">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            <!--右侧切换内容区-->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'Index_teacher',
      methods:{
          SignOut(){
            this.$router.push("/");
          }
      }
    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
