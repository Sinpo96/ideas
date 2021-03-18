/**
 * 状态分析，仅有以下几种状态
 * 1、空格 space
 * 2、符号 sign
 * 3、数组 number
 * 4、其他 other
 *
 * 如果想将字符串转为数字，必然经过4个阶段
 * 1、start
 * 2、确认符号位
 * 3、数字拼接
 * 4、遇到other结束
 * ------------------------------------
 * 从上面4个状态和4个阶段可以推导出一个状态转换的表格
 * 状态地址 https://pic.leetcode-cn.com/0ee783ff33682169033d26832e12619ef5186cff4ec46fa7449ab548b458fb56-1585925170(1).png
 */
var myAtoi = function (str) {
	class AutoFactory {
		constructor (str) {
			this.str = str.split('');
			// 初始状态
			this.state = 'start';
			// 符号位
			this.sign = 1;
			// 状态机
			this.stateArr = {
				// 当前所处阶段：[(下一个字符)遇到space对应阶段，遇到sign对应阶段，遇到number对应阶段，遇到Other对应阶段]
				'start': ['start', 'signed', 'in_number', 'end'],
				'signed': ['end', 'end', 'in_number', 'end'],
				'in_number': ['end', 'end', 'in_number', 'end'],
				'end': ['end', 'end', 'end', 'end'],
			}
			// 最后的返回值
			this.res = 0;
		}

		isNumber (char) {
			const unicode = char.codePointAt(0);
			return unicode >= 48 && unicode <= 57;
		}

		getIndex (char) {
			if (char === ' ') {
				return 0;
			} else if (['+', '-'].includes(char)) {
				return 1;
			} else if (this.isNumber(char)) {
				return 2;
			} else {
				return 3
			}
		}

		calculate () {
			const currentChar = this.str.shift();
			if (!currentChar) {
				return;
			}
			this.state = this.stateArr[this.state][this.getIndex(currentChar)];
			if (this.state === 'end') {
				return;
			}
			if (this.state === 'in_number') {
				this.res = this.res * 10 + Number(currentChar);
				if (this.sign * this.res > Math.pow(2, 31) - 1) {
					this.res = Math.pow(2, 31) - 1;
				}
				if (this.sign * this.res < -Math.pow(2, 31)) {
					this.res = Math.pow(2, 31);
				}
			} else if (this.state === 'signed') {
				this.sign = currentChar === '-' ? -1 : 1;
			}
			this.calculate();
		}
	}

	const auto = new AutoFactory(str);
	auto.calculate();
	return auto.res * auto.sign;
};

myAtoi("-91283472332");
