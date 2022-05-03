// 导入react模块（组件）中的默认组件，并且命名为React
import React from 'react';
// react-dom的核心功能就是把虚拟Dom渲染到文档中变成真实Dom
import ReactDOM from 'react-dom/client';
// 引入样式文件
import './index.css';

// Square组件
class Square extends React.Component {
    // 在class中添加构造函数，来初始化state
    // constructor(props) {
    //     super(props);
    //     // 初始状态设置为null
    //     this.state = {
    //         // 只能用value,设置其他的不起作用?---相关的参数都要一致才能起作用
    //         value1: null
    //         // value1: 'O'
    //     }
    // }
    // render方法的返回值描述了希望在屏幕上看到的内容(返回的是一个React元素)
    render() {
        return (
            // 使用JSX语法进行书写,最后会进行编译
            <button
                className="square"
                // 为了避免this造成的困扰，使用箭头函数来进行事件处理
                // onClick={() => this.setState({ value1: 'X' })}
                onClick={() => this.props.onClick()}
            >
                {/*使用props将数据从Board(父)组件中传递到Square(子)组件中 使用props显示出来的是数字 */}
                {/* {this.props.value} */}
                {/* 使用state的显示出来的是X */}
                {/* {this.state.value1} */}
                {this.props.value1}
            </button>
        );
    }
}

// Board组件渲染了9个方块,用来模拟棋盘格子
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 用来保存子组件的state状态,再通过props将状态传递到子组件当中,可以方便组件状态数据之间的同步共享
            // 命名是否没有要求
            // 如何查看squares里面存的值呢
            squares: Array(9).fill(null)
        }
    }
    renderSquare(i) {
        // 将一个名为value的prop传递到Square中去
        // 依次将0-8的值通过prop从Board向下传递,从而让它们显示出来
        console.log(this.state.squares);
        return (<Square
            value1={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />);
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Game组件渲染了含有默认值的棋盘
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

// 创建了一个id名为root的Dom元素 得到一个React容器对象
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
