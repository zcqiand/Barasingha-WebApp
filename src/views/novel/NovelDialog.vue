<template>
  <el-dialog :title="dialogType === 'edit' ? '编辑作品' : '新增作品'" :visible.sync="dialogVisible">
    <el-form label-width="90px" label-position="left">
      <el-form-item label="作品小类">
        <el-select v-model="selectedItem.SubCategoryId" placeholder="请选择">
          <el-option v-for="item in subCategories" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="selectedItem.No" autocomplete="off" style="width: 200px" />
      </el-form-item>
      <el-form-item label="作品封面">
        <el-input v-model="selectedItem.Logo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作品名称">
        <el-input v-model="selectedItem.Name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作品作者">
        <el-select v-model="selectedItem.AuthorId" placeholder="请选择">
          <el-option v-for="item in authors" :key="item.Id" :label="item.NickName" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="作品介绍">
        <el-input v-model="selectedItem.Introduction" :rows="2" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="给读者的话">
        <el-input v-model="selectedItem.MessageToReader" :rows="2" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    selectedItem: Object,
    dialogVisible: Boolean,
    dialogType: String,
    subCategories: Array,
    authors: Array
  },
  methods: {
    save() {
      this.$emit('save', this.selectedItem)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
