/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 22:03:15
 * @LastEditTime: 2019-09-22 22:38:32
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerText: '我的初始值是1'
        }
    }
    render() {
        return (
            <div style={this.props}>
                {this.state.innerText}
            </div>
        )
    }
}

const getDisplayName = (component) => {
    return component.displayName || component.name || 'Component';
}

// 反向继承的方式
const withHeader = (title = '没传入') => (WrappedComponent) => {
    class HOC extends WrappedComponent {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
        componentDidMount() {
            setTimeout(() => {
                this.setState({ innerText: '我的值变成了2' });
            }, 1000);
        }
        render() {
            return (
                <div>
                    <h1>{title}</h1>
                    {super.render()}
                </div>
            )
        }
    }
    return HOC;
}

const EnhanceDemo1 = withHeader('Demo1')(Demo);
const EnhanceDemo2 = withHeader('Demo2')(Demo);
export {
    EnhanceDemo1,
    EnhanceDemo2
}