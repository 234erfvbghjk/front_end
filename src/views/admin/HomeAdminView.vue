<script setup>

import useAuthAdminStore from '../../stores/admin/AuthAdminStore.js'
import {useRouter} from "vue-router";
import {Location} from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const router = useRouter()

// 退出登录
const exitLogin = () => {
  useAuthAdminStore().saveToken('')
  router.push('/login')
}

</script>

<template>
  <div class="common-layout">
    <el-container class="pdi-1">
      <el-header>
        <h1>汽车租赁系统</h1>
        <el-button @click="exitLogin">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  router
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>分类管理</span>
                  </template>
                  <el-menu-item-group title="管理员分类列表">
                    <el-menu-item index="/add/category">添加分类</el-menu-item>
                    <el-menu-item index="/category">分类列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>车辆管理</span>
                  </template>
                  <el-menu-item-group title="管理员管理分类">
                    <el-menu-item index="/add/car">添加车辆</el-menu-item>
                    <el-menu-item index="/car">车辆列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>租赁管理</span>
                  </template>
                  <el-menu-item-group title="管理员管理分类">
                    <el-menu-item index="/admin_borrow">租赁列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group title="管理员管理分类">
                    <el-menu-item index="/add/user_information">添加用户</el-menu-item>
                    <el-menu-item index="/user_information">用户列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
template{
  background-color: #eeeeee;
}

.el-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid red;
}

.el-main {
  background-color: #eeeeee;
  border-left: 1px solid red;
}

.el-aside{
  height: calc(100vh - 70px);
}

.el-container{
  border: 1px solid red;
}


</style>