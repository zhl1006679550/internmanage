<template>
  <div style="height: 100%">
    <el-table :data="tableData" height="93%" border style="width: 100%">

<!--      <el-table-column prop="id" label="id" width="50">-->
<!--      </el-table-column>-->

      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>

      <el-table-column prop="company" label="实习单位" width="230">
      </el-table-column>

      <el-table-column prop="address" label="实习单位地址" width="250">
      </el-table-column>

      <el-table-column prop="sign_address" label="签到地址" width="280">
      </el-table-column>

      <el-table-column prop="time" label="签到时间">
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="6"
        :total="totle"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
const axios = require ('axios');
export default {
  data() {
    return {
      tableData: null,
      totle:null,
      path1:null,
      stunum:null
    }
  },
  methods:{
    //页面跳转
    page:function (CurrentChange) {
      axios.get('http://localhost:8181/viewsign/findByStunum/'+this.stunum+'/'+CurrentChange+'/6').then(res=>{
        this.tableData = res.data.content;
      })
    }
  },
  created() {
    //获取个人的签到记录
    const dataB = JSON.parse(sessionStorage.getItem('stunuma'));
    this.stunum = dataB.stunum;
    axios.get('http://localhost:8181/viewsign/findByStunum/'+dataB.stunum+'/1/6').then(res=>{
          this.tableData = res.data.content;
          this.totle = res.data.totalElements;
        }
    );
    this.path1 = this.$route.matched[0].path;
  }
}
</script>