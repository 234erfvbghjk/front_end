<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import { post } from "../../../utils/request";-->
<!--import { ElMessage } from 'element-plus';-->

<!--const form = ref({-->
<!--  CarPrice: '',-->
<!--  CarName: '',-->
<!--  cid: '',-->
<!--  img: null // 存储图片文件对象-->
<!--});-->
<!--const imageUrl = ref('');-->

<!--// 图片格式和大小校验-->
<!--const beforeAvatarUpload = (rawimg) => {-->
<!--  if (rawimg.type !== 'image/jpeg') {-->
<!--    ElMessage.error('Avatar picture must be JPG format!');-->
<!--    return false;-->
<!--  } else if (rawimg.size / 1024 / 1024 > 2) {-->
<!--    ElMessage.error('Avatar picture size can not exceed 2MB!');-->
<!--    return false;-->
<!--  }-->
<!--  return true;-->
<!--};-->

<!--// 图片选择和校验-->
<!--const handleChange = (file, fileList) => {-->
<!--  if (!beforeAvatarUpload(file.raw)) {-->
<!--    // 如果文件校验失败，清空图片和预览-->
<!--    imageUrl.value = '';-->
<!--    form.value.img = null;-->
<!--    return;-->
<!--  }-->
<!--  // 设置预览URL和图片文件-->
<!--  imageUrl.value = URL.createObjectURL(file.raw);-->
<!--  form.value.img = file.raw; // 确保这里保存的是文件对象-->
<!--};-->

<!--// 提交表单-->
<!--const onSubmit = async () => {-->
<!--  const formdata = new FormData();-->
<!--  formdata.append('CarName', form.value.CarName);-->
<!--  formdata.append('CarPrice', form.value.CarPrice);-->
<!--  formdata.append('cid', form.value.cid);-->
<!--  if (form.value.img) {-->
<!--    formdata.append('img', form.value.img);-->
<!--  } else {-->
<!--    ElMessage.error('Please select an image!');-->
<!--    return;-->
<!--  }-->
<!--  try {-->
<!--    const result = await post('/admin/cars', formdata);-->
<!--    console.log('Vehicle added:', result);-->
<!--    ElMessage.success('Vehicle added successfully!');-->
<!--  } catch (error) {-->
<!--    console.error('Error adding vehicle:', error);-->
<!--    ElMessage.error('Failed to add vehicle!');-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<template>-->
<!--  <el-breadcrumb separator="/">-->
<!--    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>-->
<!--    <el-breadcrumb-item><a href="/car">车辆列表</a> </el-breadcrumb-item>-->
<!--    <el-breadcrumb-item>添加车辆</el-breadcrumb-item>-->
<!--  </el-breadcrumb>-->
<!--  <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 20px;padding: 20px; background-color: #FFFFFF;border-radius: 20px;"  >-->
<!--    <el-form-item label="车名">-->
<!--      <el-input v-model="form.CarName" />-->
<!--    </el-form-item>-->
<!--    <el-form-item label="价格">-->
<!--      <el-input v-model="form.CarPrice" />-->
<!--    </el-form-item>-->
<!--    <el-form-item label="分类">-->
<!--      <el-input v-model="form.cid" />-->
<!--    </el-form-item>-->
<!--    <el-form-item label="车图">-->
<!--      <el-upload class="avatar-uploader" action="" :show-img-list="false"-->
<!--                 :before-upload="beforeAvatarUpload" :auto-upload="false" :on-change="handleChange" accept="image/*"-->
<!--                 list-type="picture-card">-->
<!--        <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--        <el-icon v-else class="avatar-uploader-icon">-->
<!--          <Plus />-->
<!--        </el-icon>-->
<!--      </el-upload>-->
<!--    </el-form-item>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" @click="onSubmit">Create</el-button>-->
<!--      <el-button>Cancel</el-button>-->
<!--    </el-form-item>-->

<!--  </el-form>-->

<!--</template>-->
<!--<style scoped>-->
<!--.avatar-uploader img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--</style>-->

<script setup>
import { ref } from "vue";
import { post } from "../../../utils/request";
import { ElMessage } from 'element-plus';

const form = ref({
  CarPrice: '',
  CarName: '',
  cid: '',
  img: null // 存储图片文件对象
});
const imageUrl = ref('');

// 图片格式和大小校验
const beforeAvatarUpload = (rawimg) => {
  if (rawimg.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawimg.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

// 图片选择和校验
const handleChange = (file, fileList) => {
  if (!beforeAvatarUpload(file.raw)) {
    // 如果文件校验失败，清空图片和预览
    imageUrl.value = '';
    form.value.img = null;
    return;
  }
  // 设置预览URL和图片文件
  imageUrl.value = URL.createObjectURL(file.raw);
  form.value.img = file.raw; // 确保这里保存的是文件对象
};

// 提交表单
const onSubmit = async () => {
  const formdata = new FormData();
  formdata.append('CarName', form.value.CarName);
  formdata.append('CarPrice', form.value.CarPrice);
  formdata.append('cid', form.value.cid);
  if (form.value.img) {
    formdata.append('img', form.value.img);
  } else {
    ElMessage.error('Please select an image!');
    return;
  }

  // Debugging: Log the FormData content
  for (let pair of formdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  try {
    const result = await post('/admin/cars', formdata);
    console.log('Vehicle added:', result);
    ElMessage.success('Vehicle added successfully!');
  } catch (error) {
    console.error('Error adding vehicle:', error);
    ElMessage.error('Failed to add vehicle!');
  }
};
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home_admin_view' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/car">车辆列表</a> </el-breadcrumb-item>
    <el-breadcrumb-item>添加车辆</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 20px;padding: 20px; background-color: #FFFFFF;border-radius: 20px;"  >
    <el-form-item label="车名">
      <el-input v-model="form.CarName" />
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.CarPrice" />
    </el-form-item>
    <el-form-item label="分类">
      <el-input v-model="form.cid" />
    </el-form-item>
    <el-form-item label="车图">
      <el-upload class="avatar-uploader" action="" :show-img-list="false"
                 :before-upload="beforeAvatarUpload" :auto-upload="false" :on-change="handleChange" accept="image/*"
                 list-type="picture-card">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.avatar-uploader img {
  width: 100%;
  height: 100%;
}
</style>