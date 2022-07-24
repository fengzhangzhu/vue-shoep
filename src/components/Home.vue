<template>
  <el-container class="home-container">
  <!-- 头部区域 -->
  <el-header>
    <div>
      <img src="../assets/heima.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 页面主体区域 -->
  <el-container>
    <!-- 侧边栏 宽度根据isCollapse动态切换 -->
    <el-aside :width="isCollapse ? '64px' : '200px' ">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 侧边栏菜单区域  active-text-color为激活颜色-->
      <el-menu background-color="#545c64" text-color="#fff"
      active-text-color="#409EFF" :unique-opened="true" :collapse="isCollapse"
      :collapse-transition="false" :router="true" :default-active="activePath">
      <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
          <!-- 一级菜单模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconsObj[item.id]"></i>
            <!-- 文本 -->
            <span>{{item.authName}}</span>
          </template>
          
          <!-- 二级菜单 保存导航链接状态:saveNavState()-->
          <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id"
          @click="saveNavState('/'+ subItem.path)">
            <!-- 二级菜单模板区域 -->
            <template slot="title">
            <!-- 图标 -->
              <i class="el-icon-menu"></i>
            <!-- 文本 -->
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      // 左侧菜单数据
      menulist:[],
      // 所有一级菜单图标对象
      iconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',
      },
      // 是否折叠
      isCollapse:false,
      // 被激活的链接地址
      activePath:''
    }
  },
  // 生命周期函数
  created(){
    this.getMenuList()
    this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods:{
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath=activePath
    }
  }
};
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}

.el-header{
  background-color: #373d41;
  display: flex;
  // 左右贴标对齐
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;  //上下居中（退出按钮）
  color: #fff; //文本颜色
  font-size: 20px; //文本大小
  //左侧div（图标及文本）上下居中对齐
  > div{
    display: flex;
    align-items: center;  //纵向居中对齐
    span{
      margin-left: 15px;  //文本与图片间距
    }
  }

}

.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}

.el-main{
  background-color: #eaedf1;
}

.iconfont{
  margin-right: 10px ;  //图标与文本之间有一定间距
}

.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;  //线条彼此之间有间距
  cursor:pointer     //鼠标放上去变成小手


}
</style>