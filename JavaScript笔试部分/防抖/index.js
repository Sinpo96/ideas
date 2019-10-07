/**
 * @description: 防抖函数
 * @param {fun} func 待包装的函数
 * @return: func 包装完的函数
 */
const debounce = (func = null, immediate = false, interval = 1000) => {
    if (!func) {
        // 未传入则不管
        return;
    }
    // 初始化定时器
    let timer = null;
    // 采用闭包的方式维护同一个 timer 在内存中
    return function() {
        const self = this;
        // 进入执行一次
        if (immediate && timer == null) {
            func.apply(self, arguments);
        }
        // 存在说明要重新计时了
        if(timer) {
            clearTimeout(timer);
        }
        // 设置定时器
        timer = setTimeout(() => {
            func.apply(self, arguments);
            timer = null;
        }, interval);
    }
}