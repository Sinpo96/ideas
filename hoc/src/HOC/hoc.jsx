/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 22:03:15
 * @LastEditTime: 2019-09-22 22:30:17
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';

class Demo extends Component {
    render() {
        return(
            <div style={this.props}>
                {JSON.stringify(this.props)}
            </div>
        )
    }
}

const getDisplayName = (component) => {
    return component.displayName || component.name || 'Component';
}

// 属性代理的方式
const withHeader = (WrappedComponent) => (title = '没传入') => {
    class HOC extends Component{
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
        render() {
            const newProps = {
                id: Math.random().toString(36).substring(2).toUpperCase()
            }
            return (
                <div>
                    <h1>{title}</h1>
                    <WrappedComponent {...this.props} {...newProps}/>
                </div>
            )
        }
    }
    return HOC;
}

const EnhanceDemo1 = withHeader(Demo)('Demo1');
const EnhanceDemo2 = withHeader(Demo)();
const EnhanceDemo3 = withHeader(Demo)('Demo3');

export {
    EnhanceDemo1,
    EnhanceDemo2,
    EnhanceDemo3,
}