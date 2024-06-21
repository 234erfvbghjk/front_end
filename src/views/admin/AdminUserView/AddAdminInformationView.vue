<script setup>
import {ref} from 'vue'

const form = ref({
  username: '',
  password: '',
  role: '',
  img: null // 存储图片文件对象
});

</script>

<template>
    <h1>分类列表</h1>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/car">用户列表</a> </el-breadcrumb-item>
    <el-breadcrumb-item>添加用户</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 20px; border-radius: 20px; ">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="form.role" />
    </el-form-item>
<!--    -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>