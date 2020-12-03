<template>
  <div style="height: 100%">
    <el-table
        :data="tableData"
        height="94%"
        border
        style="width: 100%">

      <el-table-column
          prop="id"
          label="id"
          width="70">
      </el-table-column>

      <el-table-column
          prop="name"
          label="姓名"
          width="160">
      </el-table-column>

      <el-table-column
          prop="stunum"
          label="学号"
          width="250">
      </el-table-column>

      <el-table-column
          prop="company"
          label="实习单位"
          width="300"
      >
      </el-table-column>

      <el-table-column
          prop="classnamess"
          label="专业班级"
          width="300">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="213">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delete1(scope.row)" type="text" size="small" v-if="show_teacher">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="9"
        :total="totle"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
const axios = require("axios");
    export default {
        data(){
          return{
            tableData:null,//表格数据
            totle:null,//查询到的记录总数   totle/page-size = 总页数
            path1:null,//记录当前的访问路径（teacher,student,admin）
            show_teacher:null,
          }
        },
        methods:{
          //修改学生信息
          handleClick(row) {
            this.$router.push({
              path:this.path1+'/updata',
              query:{
                stunum:row.stunum
              }
            });
          },

          //翻页方法
          page:function (CurrentChange) {
            axios.get('http://localhost:8181/Student/findAll/'+CurrentChange+'/9',{
              headers:{
                'token':this.getToken()
              }
            }).then(res=>{
              console.log(res);
              this.tableData = res.data.content;
            })
          },

          //删除学生信息
          delete1(row){
            const _this = this;
            axios.delete("http://localhost:8181/Student/delete/"+row.stunum).then(function () {
              _this.$alert(row.name+'删除成功', '消息提示', {
                confirmButtonText: '确定',
                callback:()=> {
                  //路由跳转到查询页面
                  _this.$router.go(0);
                }
              });
            });
          },

      },
        created() {
          axios.get("http://localhost:8181/Student/findAll/1/9",{
            headers:{
              'token':this.getToken()
            }
          }).then(res=>{
            this.tableData = res.data.content;
            this.totle = res.data.totalElements;
          })
          this.path1 = this.$route.matched[0].path;
          if(this.$route.matched[0].path === 'teacher'){
            this.show_teacher = true;
          }else {this.show_teacher = false}

          console.log(this.getToken());
        }
    }
</script>

<style scoped>

</style>