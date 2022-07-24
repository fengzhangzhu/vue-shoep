<!--模板-->
<template>
  <div class="login_container">
    <!-- 绘制登录盒子 -->
    <div class="login_box">
      <!-- 绘制默认头像,头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <!-- label-width：label占位 -->
      <!-- loginFormRef:表单实例对象，通过它可以调用resetFields函数，重置表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form"> 
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<!--行为-->
<script>
export default {
  data(){
    return{
      //这是登录表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456'
      },
      //这是表单的验证规则对象
      loginFormRules:{
        //验证用户名是否合法
        username:[
          //用户名为必填项，提示信息为“请输入登录名称”，触发时机：文本框失去焦点的时候(blur)
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password:[
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
    };
  },
  methods:{
    //点击重置按钮，重置登录表单
    resetLoginForm(){
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      /*获取表单的引用对象，然后用validate函数实现表单的预验证，
      valid是一个布尔值，可以查看是否验证通过*/
      /*某个方法的返回结果是promise可以用async与await简化操作*/
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;  //如果valid为false就不发起请求
        const {data: res} = await this.$http.post('login',this.loginForm);
        if(res.meta.status !== 200) return this.$message.error("登录失败!");
        this.$message.success("登录成功!");
        /*
        1.将登录成功之后的token,保存到客户端的sessionStorage中
          1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
          1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中*/
        window.sessionStorage.setItem("token",res.data.token);
        //2.通过编程式导航跳转到后台主页，路由地址是  /home
        this.$router.push("/home");

      });
    }
  }
};
</script>

<!--样式-->
<!--支持less语法，scoped为vue指令控制组件样式生效空间，
scoped:当前组件内生效，没有scoped就是全局生效-->
<style lang="less" scoped>
.login_container{
  background-color:#2b4b6b ;
  height: 100%;
}

// 设置登录盒子样式
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;  // 圆角边框
  position: absolute;  //页面上的位移
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

// 设置默认头像样式
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee; //边框
    border-radius: 50%;  //圆角边框
    padding: 10px;  //图片和边框之间有一定间隙
    box-shadow: 0 0 10px #ddd; //添加阴影向外扩散10px
    //头像居中
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%); //根据盒子高度位移
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  } 
}

.login_form{
  position: absolute;
  bottom: 0;  //底部对齐
  width: 100%; 
  padding: 0 20px;
  box-sizing: border-box;  //防止格子溢出
}

.btns{
  display: flex; //弹性盒模型
  justify-content: flex-end;  //尾部对齐
}
</style>