<template>
  <UserListIndex>
    <template #user-dialog="{ visible, userData, onUpdateVisible, onSuccess }">
      <UserDialog
        :visible="visible"
        :user-data="userData"
        :extra-fields="extraFields"
        @update:visible="onUpdateVisible"
        @success="onSuccess"
      />
    </template>
  </UserListIndex>
</template>

<script setup lang="ts">
import UserListIndex from '@auth-matrix/views/user/list/Index.vue'
import UserDialog from '@auth-matrix/views/user/list/UserDialog.vue'
import type { FormExtraField } from '@auth-matrix/types/views'

/**
 * 扩展字段配置
 * 用于添加邮箱字段
 */
const extraFields: FormExtraField[] = [
  {
    key: 'email',
    label: '邮箱',
    required: true,
    placeholder: '请输入邮箱地址'
  }
]
</script>