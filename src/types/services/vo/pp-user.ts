import type {UserVO} from "@auth-matrix/types";

/**
 * 拓展用户接口
 */
export interface PPUserVO extends UserVO {
    email?: string;
}