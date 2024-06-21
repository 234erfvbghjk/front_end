<!--<script setup>-->
<!--import {ref} from 'vue'-->
<!--import {fetchUser, putUser, delUser} from '../../../api/admin/AdminUserApi.js'-->
<!--import {ElMessage} from "element-plus";-->
<!--import {putCar} from "../../../api/admin/Cars.js";-->

<!--const tableData = ref([])-->
<!--const editCategoryDialogVisible = ref(false)-->

<!--// 弹窗输入框-->
<!--const inputUsername = ref('');-->
<!--const inputPassword = ref('')-->
<!--const inputRole =ref('')-->

<!--// 修改用户的id-->
<!--const currentUserId = ref('')-->


<!--const _fetchUser = async () => {-->
<!--  try {-->
<!--    const res = await fetchUser()-->
<!--    tableData.value = res-->
<!--    console.log(res)-->
<!--  } catch (error) {-->
<!--    console.error("Failed to fetch users:", error);-->
<!--  }-->
<!--}-->

<!--// 修改-->
<!--const edit = (userId) => {-->
<!--  editCategoryDialogVisible.value = true-->
<!--  currentUserId.value = userId-->
<!--}-->

<!--const _putUser = async () => {-->
<!--  await putUser(currentUserId.value, {-->
<!--    username: inputUsername.value,-->
<!--    password: inputPassword.value,-->
<!--    role: inputRole.value-->
<!--  });-->
<!--  ElMessage({-->
<!--    message: '修改成功',-->
<!--    type: 'success',-->
<!--  });-->
<!--  editCarDialogVisible.value = false;-->
<!--  _fetchCar();-->
<!--};-->


<!--// 删除用户-->
<!--const _delUser = async (id) => {-->
<!--  try {-->
<!--    await delUser(id)-->
<!--    ElMessage({-->
<!--      message: '删除成功',-->
<!--      type: 'success',-->
<!--    });-->
<!--    _fetchUser()-->
<!--  } catch (err) {-->
<!--    console.error("删除失败", err);-->
<!--    ElMessage({-->
<!--      message: '删除失败，请稍后重试',-->
<!--      type: 'error',-->
<!--    });-->
<!--  }-->
<!--}-->


<!--_fetchUser()-->

<!--</script>-->

<!--<template>-->
<!--  <h1>用户列表</h1>-->
<!--  <el-breadcrumb separator="/">-->
<!--    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>-->
<!--    <el-breadcrumb-item>用户列表</el-breadcrumb-item>-->
<!--  </el-breadcrumb>-->
<!--  <el-card style="min-width: 700px; max-height: 500px; margin-top: 20px;">-->
<!--    <el-table :data="tableData" border style="width: 100%">-->
<!--      <el-table-column prop="userId" label="用户id" width="100px"/>-->
<!--      <el-table-column prop="username" label="用户名" width="100px"/>-->
<!--      <el-table-column prop="password" label="密码" width="200px"/>-->
<!--      <el-table-column prop="role" label="管理员/用户" width="200px"/>-->
<!--      <el-table-column label="编辑">-->
<!--        <template #default="{ row }">-->
<!--          <el-button @click="edit(row.cid)">修改</el-button>-->
<!--          <el-button @click="_delUser(row.userId)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </el-card>-->
<!--  <el-dialog-->
<!--      v-model="editCategoryDialogVisible"-->
<!--      title="修改分类"-->
<!--      width="600"-->
<!--  >-->
<!--    <el-input v-model="inputUsername" style="width: 240px" placeholder="修改用户名"/>-->
<!--    <el-input v-model="inputPassword" style="width: 240px" placeholder="修改密码"/>-->
<!--    <el-input v-model="inputRole" style="width: 240px" placeholder="修改职位"/>-->
<!--    <template #footer>-->
<!--      <div class="dialog-footer">-->
<!--        <el-button @click="editCategoryDialogVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="_putUser">确认修改</el-button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->

<script setup>
import {ref} from 'vue'
import {fetchUser, putUser, delUser} from '../../../api/admin/AdminUserApi.js'
import {ElMessage} from "element-plus";

const tableData = ref([])
const editCategoryDialogVisible = ref(false)

// 弹窗输入框
const inputUsername = ref('');
const inputPassword = ref('')
const inputRole =ref('')

// 修改用户的id
const currentUserId = ref('')

const _fetchUser = async () => {
  try {
    const res = await fetchUser()
    tableData.value = res
    console.log(res)
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

// 修改
const edit = (userId) => {
  editCategoryDialogVisible.value = true
  currentUserId.value = userId
}

const _putUser = async () => {
  try {
    await putUser(currentUserId.value, {
      username: inputUsername.value,
      password: inputPassword.value,
      role: inputRole.value
    });
    ElMessage({
      message: '修改成功',
      type: 'success',
    });
    editCategoryDialogVisible.value = false;
    await _fetchUser();
  } catch (error) {
    console.error("Failed to update user:", error);
    ElMessage({
      message: '修改失败，请稍后重试',
      type: 'error',
    });
  }
};

// 删除用户
const _delUser = async (id) => {
  try {
    await delUser(id)
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    _fetchUser()
  } catch (err) {
    console.error("删除失败", err);
    ElMessage({
      message: '删除失败，请稍后重试',
      type: 'error',
    });
  }
}

_fetchUser()
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="min-width: 700px; max-height: 500px; margin-top: 20px;">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="用户id" width="100px"/>
      <el-table-column prop="username" label="用户名" width="100px"/>
      <el-table-column prop="password" label="密码" width="200px"/>
      <el-table-column prop="role" label="管理员/用户" width="200px"/>
      <el-table-column label="编辑">
        <template #default="{ row }">
          <el-button @click="edit(row.userId)">修改</el-button>
          <el-button @click="_delUser(row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
      v-model="editCategoryDialogVisible"
      title="修改分类"
      width="600"
  >
    <el-input v-model="inputUsername" style="width: 240px" placeholder="修改用户名"/>
    <el-input v-model="inputPassword" style="width: 240px" placeholder="修改密码"/>
    <el-input v-model="inputRole" style="width: 240px" placeholder="修改职位"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="_putUser">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>