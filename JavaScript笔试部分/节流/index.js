/**
 * @description: throttle 节流函数
 * @param {type} 
 * @return: 
 */
const throttle = ( func = undefined, interval = 1000 ) => {
    if (!func) {
        return;
    }
    // 上一次的触发时间
    let flag = true;
    return function() {
        const self = this;
        if (!flag) {
            return;
        }
        flag = false;
        setTimeout(() => {
            func.apply(self, arguments);
            flag = true;
        }, interval);
    }
}