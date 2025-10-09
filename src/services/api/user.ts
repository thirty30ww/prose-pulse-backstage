import http from "@auth-matrix/services/http.ts";
import type {PPUserVO} from "@backstage/types/services/vo/pp-user.ts";
import { userApi as authMatrixUserApi } from "@auth-matrix/services/api/user";

export const userApi = {

    // 继承用户接口
    ...authMatrixUserApi,

    /**
     * 覆盖获取当前用户信息
     */
    getUser() {
        return http.get<PPUserVO>('/pp/user/get');
    }
}