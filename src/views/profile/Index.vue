<template>
  <ProfileIndex :extraFields="extraFields" />
</template>

<script setup lang="ts">
import { Message } from '@element-plus/icons-vue'
import ProfileIndex from '@auth-matrix/views/profile/Index.vue'

const extraFields = [
  {
    key: 'email',
    label: '邮箱',
    icon: Message
  }
]
</script>