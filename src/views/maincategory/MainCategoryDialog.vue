<template>
  <el-dialog :title="dialogType === 'edit' ? '编辑大类' : '新增大类'" :visible.sync="dialogVisible">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="序号">
        <el-input v-model="selectedItem.No" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="selectedItem.Name" autocomplete="off" />
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
    dialogType: String
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
