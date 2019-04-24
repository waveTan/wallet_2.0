const IS_DEV = process.env.NODE_ENV !== 'production';
export const API_CHAIN_ID = 2;
//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = false;
//正式、测试网络的api
const API_URL = RUN_DEV ? 'https://api.nuls.io/' : 'http://116.62.135.185:8081/';
//Request url
export const API_ROOT = IS_DEV ? 'http://192.168.1.37:18003/' : API_URL;
//export const API_ROOT = IS_DEV ? 'http://apitn2.nulscan.io/' : API_URL;
//Request response time
export const API_TIME = IS_DEV ? '9000' : '8000';
