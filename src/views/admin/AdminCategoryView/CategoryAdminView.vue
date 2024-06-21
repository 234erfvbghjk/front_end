<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { fetchCategory, putCategory, delCategory } from '../../../api/admin/category.js';

const editCategoryDialogVisible = ref(false);
const tableData = ref([]);
const inputCategory = ref('');
const currentCategoryId = ref('');
// 列表
const _fetchCategory = async () => {
  try {
    const res = await fetchCategory();
    tableData.value = res;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
// 修改
const edit = (cid) => {
  editCategoryDialogVisible.value = true;
  currentCategoryId.value = cid;
};

const _putCategory = async () => {
  try {
    await putCategory(currentCategoryId.value, { name: inputCategory.value });
    ElMessage({
      message: '修改成功',
      type: 'success',
    });
    editCategoryDialogVisible.value = false;
    _fetchCategory();
  } catch (error) {
    console.error("Failed to update category:", error);
    ElMessage({
      message: '修改失败，请稍后重试',
      type: 'error',
    });
  }
};
// 删除
const del = async (cid) => {
  try {
    await delCategory(cid);
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    _fetchCategory();
  } catch (error) {
    console.error("Failed to delete category:", error);
    ElMessage({
      message: '删除失败，请稍后重试',
      type: 'error',
    });
  }
};

_fetchCategory();
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/front_end/public">分类页</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>分类列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="min-width: 700px; max-height: 500px">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cid" label="列表id" width="200px"/>
      <el-table-column prop="name" label="列表名称" width="300px"/>
      <el-table-column label="编辑">
        <template #default="{ row }">
          <el-button @click="edit(row.cid)">修改</el-button>
          <el-button @click="del(row.cid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
      v-model="editCategoryDialogVisible"
      title="修改分类"
      width="600"
  >
    <el-input v-model="inputCategory" style="width: 240px" placeholder="请修改该物品信息"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="_putCategory">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>