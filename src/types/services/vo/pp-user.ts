import type {UserVO} from "@/types";

/**
 * 拓展用户接口
 */
export interface PPUserVO extends UserVO {
    email?: string;
}