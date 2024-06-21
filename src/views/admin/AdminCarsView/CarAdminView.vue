<script setup>
import { ref } from 'vue';
import { fetchCar, putCar, delCar } from '../../../api/admin/Cars.js';
import { ElMessage } from "element-plus";

const tableDataCar = ref([]);
const editCarDialogVisible = ref(false);

// 修改弹窗内容
const inputCarName = ref('');
const inputCarPrice = ref('');
const inputCarCid = ref('');
const inputCarImg = ref('');

// 修改车辆的ID
const currentCarId = ref('');

// 车辆列表渲染
const _fetchCar = () => {
  fetchCar().then(res => {
    tableDataCar.value = res.data.rows;
  });
};

// 车辆修改
const editCar = (car) => {
  console.log(car);
  editCarDialogVisible.value = true;
  currentCarId.value = car.CarId;
  inputCarName.value = car.CarName;
  inputCarPrice.value = car.CarPrice;
  inputCarCid.value = car.cid;
  inputCarImg.value = car.img;
};

const _putCar = async () => {
  console.log('Updating car with ID:', currentCarId.value, 'New data:', {
    CarName: inputCarName.value,
    CarPrice: inputCarPrice.value,
    cid: inputCarCid.value,
    img: inputCarImg.value
  });
  await putCar(currentCarId.value, {
    CarName: inputCarName.value,
    CarPrice: inputCarPrice.value,
    cid: inputCarCid.value,
    img: inputCarImg.value
  });
  ElMessage({
    message: '修改成功',
    type: 'success',
  });
  editCarDialogVisible.value = false;
  _fetchCar();
};

// 删除车辆
const _delCar = async (carId) => {
  try {
    console.log('Deleting car with ID:', carId);
    await delCar(carId);
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    _fetchCar();
  } catch (error) {
    console.error("Failed to delete car:", error);
    ElMessage({
      message: '删除失败，请稍后重试',
      type: 'error',
    });
  }
};

_fetchCar();
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home_admin_view' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>车辆列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="margin: 20px; min-width: 400px;">
    <el-table :data="tableDataCar" border style="width: 100%; margin-top: 20px; ">
      <el-table-column prop="CarId" label="车辆ID"/>
      <el-table-column prop="CarName" label="车辆名称"/>
      <el-table-column prop="CarPrice" label="价格"/>
      <el-table-column prop="cid" label="车辆类型"/>
      <el-table-column prop="img" label="车辆图片">
        <template #default="{ row }">
          <img :src="row.img" alt="Car Image" style="width: 100px; height: auto;">
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template #default="{ row }">
          <el-button @click="editCar(row)">修改</el-button>
          <el-button @click="_delCar(row.CarId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
      />
    </div>
  </el-card>

  <el-dialog
      v-model="editCarDialogVisible"
      title="修改车辆"
      width="600"
  >
    <el-input v-model="inputCarName" style="width: 240px" placeholder="请修改该车辆名字"/>
    <el-input v-model="inputCarPrice" style="width: 240px" placeholder="请修改该车辆价格"/>
    <el-input v-model="inputCarCid" style="width: 240px" placeholder="请修改该车辆分类"/>
    <el-input v-model="inputCarImg" style="width: 240px" placeholder="请修改该车辆图片"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCarDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="_putCar">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
