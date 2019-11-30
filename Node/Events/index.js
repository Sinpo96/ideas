const EventEmitter = require('events');
const oneDayPlanRun = {
    "6:00": function() {
        console.log(`现在是早上 6:00，起床，开始新的一天加油！`);
    },
    "7:00": function() {
        console.log(`现在是早上 7:00，吃早饭！`);
    }
};

function OneDayPlan() {
    EventEmitter.call(this);
}

Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype);
// console.log(OneDayPlan.prototype.__proto__);
Object.setPrototypeOf(OneDayPlan, EventEmitter);
console.log(OneDayPlan.emit(1));