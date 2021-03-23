<template>
  <el-dialog :title="dialogType === 'edit' ? '编辑菜单' : '新增菜单'" :visible.sync="dialogVisible">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="父菜单">
        <treeselect v-model="selectedItem.ParentNodeId" :options="parentItems" :show-count="true" :default-expand-level="1" />
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="selectedItem.No" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="selectedItem.Name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="selectedItem.Icon" autocomplete="off" />
      </el-form-item>
      <el-form-item label="连接地址">
        <el-input v-model="selectedItem.NavigateUrl" autocomplete="off" />
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="selectedItem.ComponentPath" autocomplete="off" />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="selectedItem.Description" type="textarea" :rows="2" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  props: {
    selectedItem: Object,
    dialogVisible: Boolean,
    dialogType: String,
    parentItems: Array
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
