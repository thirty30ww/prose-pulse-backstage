<template>
  <ProfileIndex :extraFields="extraFields" />
</template>

<script setup lang="ts">
import { Message } from '@element-plus/icons-vue'
import ProfileIndex from '@auth-matrix/views/profile/Index.vue'
import type { ExtraField } from '@auth-matrix/types/views'

const extraFields: ExtraField[] = [
  {
    key: 'email',
    label: '邮箱',
    icon: Message
  }
]
</script>