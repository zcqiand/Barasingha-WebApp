<template>
  <el-dialog :title="'菜单授权'" :visible.sync="dialogVisible">
    <el-form label-position="left">
      <el-tree ref="tree" :data="menus" show-checkbox default-expand-all node-key="id" :props="defaultProps"></el-tree>
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
    menus: Array
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  updated() {
    this.setCheckedKeys()
  },
  methods: {
    setCheckedKeys() {
      if (this.selectedItem.MenuIds) {
        this.$refs.tree.setCheckedKeys(this.selectedItem.MenuIds)
      }
      else
      {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    save() {
      this.selectedItem.MenuIds = this.$refs.tree.getCheckedKeys()
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
