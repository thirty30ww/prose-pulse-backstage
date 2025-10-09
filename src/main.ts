import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 🔥 使用 auth-matrix 的 App 组件
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入 auth-matrix 的样式
import '@/assets/style/index.css'

// 导入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入 auth-matrix 的核心功能
import { useAuthStore, useThemeStore } from '@/stores'
import { ensureRoutesLoaded } from '@/router/dynamicRoutes'
import { setupDirectives } from '@/directives'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 先初始化Pinia
app.use(pinia)

// 初始化 auth-matrix 的状态管理
const themeStore = useThemeStore()
const authStore = useAuthStore()

// 初始化主题色
if (authStore.userLoggedIn) {
    // 用户已登录，从后端初始化偏好设置
    await themeStore.initializeFromBackend()
    // 加载动态路由
    await ensureRoutesLoaded(router)
} else {
    // 用户未登录，使用本地存储初始化
    await themeStore.initThemeColors()
}

// 初始化路由
app.use(router)

app.use(ElementPlus, {
    locale: zhCn,
    button: { round: true }
})

// 注册全局指令
setupDirectives(app)

console.log('🚀 Backstage 应用启动完成，已集成 auth-matrix 功能')
app.mount('#app')