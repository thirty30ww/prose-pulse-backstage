<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from 'shared-api'
import type { PPPermissionVO } from 'shared-api'
import { Expand, Fold } from '@element-plus/icons-vue'

const isLoading = ref(false)
const permissionTreeData = ref<PPPermissionVO[]>([])
const tableRef = ref()

// 加载权限数据
const loadPermissionData = async () => {
  isLoading.value = true
  try {
    const data = await api.f_permission.getTree()
    if (data) {
      permissionTreeData.value = data
    }
  } finally {
    isLoading.value = false
  }
}

// 展开全部
const handleExpandAll = () => {
  permissionTreeData.value.forEach(row => {
    tableRef.value?.toggleRowExpansion(row, true)
    expandChildren(row)
  })
}

// 递归展开子节点
const expandChildren = (row: PPPermissionVO) => {
  if (row.children && row.children.length > 0) {
    row.children.forEach(child => {
      tableRef.value?.toggleRowExpansion(child, true)
      expandChildren(child)
    })
  }
}

// 折叠全部
const handleCollapseAll = () => {
  permissionTreeData.value.forEach(row => {
    tableRef.value?.toggleRowExpansion(row, false)
    collapseChildren(row)
  })
}

// 递归折叠子节点
const collapseChildren = (row: PPPermissionVO) => {
  if (row.children && row.children.length > 0) {
    row.children.forEach(child => {
      tableRef.value?.toggleRowExpansion(child, false)
      collapseChildren(child)
    })
  }
}

onMounted(() => {
  loadPermissionData()
})
</script>

<template>
  <el-card>
    <!-- 操作按钮 -->
    <div class="action-bar">
      <div class="left-actions">
        <el-button @click="handleExpandAll">
          <el-icon class="el-icon--left"><Expand /></el-icon>
          展开全部
        </el-button>
        <el-button @click="handleCollapseAll">
          <el-icon class="el-icon--left"><Fold /></el-icon>
          折叠全部
        </el-button>
      </div>
    </div>
    
    <el-table
      ref="tableRef"
      :data="permissionTreeData"
      row-key="node.id"
      v-table-loading="{ loading: isLoading || false, text: '加载权限数据中...'}"
    >
      <el-table-column label="权限名称" min-width="200">
        <template #default="{ row }">
          <span>{{ row.node.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" min-width="200">
        <template #default="{ row }">
          <span>{{ row.node.path || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可见" min-width="100">
        <template #default="{ row }">
          <span>{{ row.node.isValid ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="100">
        <template #default="{ row }">
          <span>{{ row.node.type }}</span>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无权限数据" />
      </template>
    </el-table>
  </el-card>
</template>

<style scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-size-lg);
}

.left-actions {
  display: flex;
  align-items: center;
}
</style>