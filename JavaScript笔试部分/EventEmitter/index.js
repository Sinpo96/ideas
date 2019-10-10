class EventEmitter {
    constructor() {
        // 初始化事件容器
        // 如果没有，则使用Map初始化它
        this._events = this._events || new Map();
    }

    /**
     * @description: 添加监听事件
     * @param  type 监听的类型
     * @param {func} fn 执行的方法，最好使用引用，使用匿名函数会导致无法取消监听
     */
    addEventListener = (type, fn) => {
        // 先查一下是否存在吧
        const handler = this._events.get(type);
        if (!handler) {
            // 如果handler不存在，那么存下它
            this._events.set(type, fn);
        } else if (typeof handler === 'function') {
            // 如果类型查出来是func，说明只有一个这个事件
            this._events.set(type, [handler, fn]);
        } else {
            // 去重
            if (!handler.includes(fn)) {
                // 这里的handler如果是个数组对象，那么就是引用类型的，直接push就ok
                handler.push(fn);
            }
        }
        // return this方便链式调用，.addEventListener().addEventListener().addEventListener()
        return this;
    }

    /**
     * @description: 移除监听事件
     */
    removeEventListener = (type, fn) => {
        const handler = this._events.get(type);
        if (!handler) {
        } else if (typeof handler === 'function') {
            this._events.delete(type);
        } else {
            const index = handler.indexOf(fn);
            handler.splice(index, 1);
            if (handler.length == 1) {
                // 说明只有一个事件了，没必要使用数组了
                this._events.set(type, handler[0]);
            }
        }
        return this;
    }

    /**
     * @description: 触发监听事件
     */
    emitEventListener = (type, ...args) => {
        const handler = this._events.get(type);
        if (!handler) {
        } else if (typeof handler === 'function') {
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        } else {
            // 走到这里说明是数组了吧
            handler.map(val => {
                if (args.length > 0) {
                    val.apply(this, args);
                } else {
                    val.call(this);
                }
            });
        }
        return this;
    }
}

const Event = new EventEmitter();

const fun1 = () => { console.log(1) }

const fun2 = () => { console.log(2) }

Event.addEventListener('click', fun1);

Event.addEventListener('click', fun2);

Event.emitEventListener('click');

console.log('--------------------------删除fun2---------------------------');

Event.removeEventListener('click', fun2);

Event.emitEventListener('click');