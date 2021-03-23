<template>
  <el-dialog :title="dialogType === 'add' ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible">
    <el-tabs v-model="activeTab" @tab-click="tabClick">
      <el-tab-pane label="基本信息" name="基本信息">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="序号">
            <el-input v-model="selectedItem.No" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="selectedItem.UserName" autocomplete="off" />
          </el-form-item>
          <el-form-item v-show="dialogType === 'add'" label="用户密码">
            <el-input v-model="selectedItem.Password" show-password autocomplete="off" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="selectedItem.AvatarUrl" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="selectedItem.NickName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="selectedItem.Gender">
              <el-radio v-for="item in genders" :key="item.Value" :label="item.Value">{{ item.Name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="selectedItem.Disabled" :active-value="false" :inactive-value="true" active-text="启用" inactive-text="禁用" />
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group v-model="selectedItem.RoleIds">
              <el-checkbox v-for="item in roles" :key="item.Id" :label="item.Id">{{ item.Name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安全问题" name="安全问题">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="密码问题">
            <el-input v-model="selectedItem.PasswordQuestion" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码回答">
            <el-input v-model="selectedItem.PasswordAnswer" autocomplete="off" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
    genders: Array,
    roles: Array
  },
  data() {
    return {
      activeTab: '基本信息'
    }
  },
  methods: {
    // 切换tab栏
    tabClick(tab) {
      this.activeTab = tab.name
    },
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
