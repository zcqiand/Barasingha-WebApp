<template>
  <div class="app-container">
    <el-card class="table-container" shadow="never">
      <span>菜单列表</span>
      <el-button type="primary" style="float: right" size="small" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" stripe default-expand-all :tree-props="{ children: 'ChildNodes' }">
        <el-table-column prop="Name" label="菜单名称" sortable width="180" />
        <el-table-column prop="NavigateUrl" label="连接地址" />
        <el-table-column prop="ComponentPath" label="组件路径" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.Id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.Id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="form-container">
      <MenuDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" :parent-items="parentItems" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import { gettree, getselect, get, create, update, del } from '@/api/menu'
import MenuDialog from './MenuDialog.vue'

export default {
  components: {
    MenuDialog
  },
  data() {
    return {
      items: [],
      loading: true,
      parentItems: [],
      selectedItem: {},
      dialogType: 'add',
      dialogVisible: false
    }
  },
  async created() {
    this.loading = true
    await this.getselect()
    this.gettree()
  },
  methods: {
    gettree() {
      gettree().then((response) => {
        this.items = response.data
        this.loading = false
      })
    },
    getselect() {
      getselect().then((response) => {
        this.parentItems = response.data
      })
    },
    async add() {
      console.log(this.parentItems)
      this.selectedItem = {}
      this.selectedItem.ParentNodeId = '891b4930-e858-4f62-96e8-13f9b82efd50'
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    async edit(id) {
      await get(id).then((response) => {
        this.selectedItem = response.data
      })

      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    async save(item) {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await this.update(item)
      } else {
        await this.create(item)
      }
      this.loading = true
      await this.getselect()
      this.gettree()
      this.selectedItem = {}
      this.dialogVisible = false
    },
    async create(item) {
      await create(item)
    },
    async update(item) {
      await update(item.Id, item)
    },
    async del(id) {
      this.loading = true
      await del(id)
      await this.getselect()
      this.gettree()
    },
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>
