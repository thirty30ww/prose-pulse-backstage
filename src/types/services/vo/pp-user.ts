import type {AddUserDTO, UserVO} from "@auth-matrix/types";

/**
 * 拓展用户接口
 */
export interface PPUserVO extends UserVO {
    email?: string;
}

/**
 * 拓展添加用户接口
 */
export interface PPAddUserDTO extends AddUserDTO {
    email?: string;
}