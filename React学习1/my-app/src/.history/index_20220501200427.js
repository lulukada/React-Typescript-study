// 导入react模块（组件）中的默认组件，并且命名为React
import React from 'react';
// react-dom的核心功能就是把虚拟Dom渲染到文档中变成真实Dom
import ReactDOM from 'react-dom';
// 引入样式文件
import './index.css';

// Square组件
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }
    render() {
        return (
            <button
                className="square"
                // 为了避免this造成的困扰，使用箭头函数来进行事件处理
                onClick={() => this.setState({ value: 'X' })}
            >
                {/* 使用props显示出来的是数字 */}
                {/* {this.props.value} */}
                {/* 使用state的显示出来的是X */}
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
