<script setup>
import {ref} from 'vue'
import { postCategory } from '../../../api/admin/category.js'

const input  =ref('')
// 添加分类
const add =()=>{
    console.log(input.value)
    postCategory({name: input.value}).then((res) => {
        console.log(res)
    })
}

</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/front_end/public">分类页</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/category">分类列表</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>添加列表分类</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="min-width: 700px ; min-height: 800px; margin-top: 20px ;">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <el-button @click="add()">提交</el-button>
  </el-card>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>