/**
 * 统一的路径配置
 * 用于运行时的 auth-matrix 路径管理
 */
export const AUTH_MATRIX_PATHS = {
    // auth-matrix 前端项目的根目录（相对于 backstage 项目根目录）
    ROOT: '../auth-matrix/frontend',

    // auth-matrix 前端源码目录
    SRC: '../auth-matrix/frontend/src',

    // auth-matrix 视图组件目录
    VIEWS: '../auth-matrix/frontend/src/views',
} as const;

/**
 * 运行时路径工具函数
 */
export const pathUtils = {
    /**
     * 格式化组件路径（运行时使用）
     * @param component 组件路径，如 '/user/list/Index'
     * @returns 完整的组件文件路径
     */
    formatComponentPath: (component: string): string => {
        return `${AUTH_MATRIX_PATHS.VIEWS}${component}.vue`;
    },

    /**
     * 获取 auth-matrix 资源路径（运行时使用）
     * @param resourcePath 资源相对路径
     * @returns 完整的资源路径
     */
    getAuthMatrixResource: (resourcePath: string): string => {
        return `${AUTH_MATRIX_PATHS.SRC}/${resourcePath}`;
    }
};