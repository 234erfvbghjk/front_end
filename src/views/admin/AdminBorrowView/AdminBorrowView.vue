<script setup>
import { fetchBorrow, delBorrow, putBorrow } from '../../../api/admin/Borrow.js';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const tableData = ref([]);
const editBorrowDialogVisible = ref(false);
const inputstatus = ref('');
const currentBorrowId = ref('');

// Fetch borrow data
const _fetchBorrow = () => {
  fetchBorrow().then(res => {
    console.log(res);
    tableData.value = res.map(borrow => ({
      id: borrow.id,
      CarName: borrow.CarName,
      username: borrow.username,
      status: borrow.status,
    }));
  });
};

// Delete borrow item
const _delBorrow = async (id) => {
  await delBorrow(id);
  console.log(id);
  _fetchBorrow();
};

// Open edit dialog
const edit = (row) => {
  editBorrowDialogVisible.value = true;
  currentBorrowId.value = row.id;
  inputstatus.value = row.status; // Set the initial status
};

// Update borrow item
const _putBorrow = async () => {
  try {
    await putBorrow(currentBorrowId.value, { status: inputstatus.value });
    ElMessage({
      message: '修改成功',
      type: 'success',
    });
    editBorrowDialogVisible.value = false; // Close the dialog after success
    _fetchBorrow(); // Refresh the table data
  } catch (error) {
    console.error("Failed to update category:", error);
    ElMessage({
      message: '修改失败，请稍后重试',
      type: 'error',
    });
  }
};

_fetchBorrow();
</script>

<template>
  <h1>租赁模块AdminBorrowView</h1>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home_admin_view' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>租赁列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="min-width: 480px; margin-top: 20px;">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180"/>
      <el-table-column prop="CarName" label="车类型" width="180"/>
      <el-table-column prop="username" label="用户"/>
      <el-table-column prop="status" label="是否归还(0否,1归还,2续租)"/>
      <el-table-column label="编辑">
        <template #default="{ row }">
          <el-button @click="() => edit(row)">修改</el-button>
          <el-button @click="_delBorrow(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
      v-model="editBorrowDialogVisible"
      title="修改分类"
      width="600"
  >
    <el-input v-model="inputstatus" style="width: 240px" placeholder="请修改该物品信息"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editBorrowDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="_putBorrow">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>