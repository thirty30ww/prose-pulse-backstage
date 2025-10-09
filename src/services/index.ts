import authMatrixApi from "@auth-matrix/services"
import {userApi} from "@backstage/services/api/user.ts";

/**
 * 合并所有 API 模块
 */
const api = {
    ...authMatrixApi,
    user: userApi
}

export default api;