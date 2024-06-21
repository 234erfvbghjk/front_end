  <script setup>
import {reactive} from 'vue'
import {login} from '../../api/admin/auth.js'
import useAuthAdminStore from '../../stores/admin/AuthAdminStore.js'
import {useRouter} from "vue-router";
import { ElMessage } from 'element-plus'

const router = useRouter()

const { saveToken } = useAuthAdminStore()

// do not use same name with ref
const form = reactive({
  username: '', password: ''
})

const onSubmit = () => {
  login(form).then((res) => {
    const token = res.token;
    const state = saveToken({token});
    if (state) {
      router.push('/');
      ElMessage.success("登陆成功")
    } else {
      router.push('/login')
      ElMessage.error('登录失败')
    }
  });
}

const onRegister =()=>{
  router.push('/register');
}
</script>

<template>

  <div class="page">
    <div class="from_box">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: azure;
}

.from_box {
  width: 300px;
  height: 200px;
  background-color: beige;
  box-shadow: 0 0 10px 10px #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px;
}
</style>