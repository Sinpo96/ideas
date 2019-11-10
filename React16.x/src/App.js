import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    //componentDidMount、componentDidUpdate、componentWillUnmount合成的API
    useEffect(() => {
        document.title = `这是点击的第${count}次`;
        return () => {
            alert('走进它的回调啦');
        }
    });

    return (
        <div className="App" id={'app'}>
            <span>{count}</span>
            <button onClick={() => {
                setCount(count + 1);
            }}>点击
            </button>
        </div>
    );
}

export default App;
