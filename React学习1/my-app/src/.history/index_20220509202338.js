// 导入react模块（组件）中的默认组件，并且命名为React
import React from 'react';
// react-dom的核心功能就是把虚拟Dom渲染到文档中变成真实Dom
import ReactDOM from 'react-dom/client';
// 引入样式文件
import './index.css';

// Square组件
// class Square extends React.Component {
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
//     render() {
//         return (
//             // 使用JSX语法进行书写,最后会进行编译
//             <button
//                 className="square"
//                 // 为了避免this造成的困扰，使用箭头函数来进行事件处理
//                 // onClick={() => this.setState({ value1: 'X' })}
//                 // this.props.onClick()是由Board传递给Square的
//                 onClick={() => this.props.onClick()}
//             >
//                 {/*使用props将数据从Board(父)组件中传递到Square(子)组件中 使用props显示出来的是数字 */}
//                 {/* {this.props.value} */}
//                 {/* 使用state的显示出来的是X */}
//                 {/* {this.state.value1} */}
//                 {this.props.value1}
//             </button>
//         );
//     }
// }

// 重写Square组件---写成函数式的组件（组件只包含一个render方法，并且不包含state时，函数组件会更简单）
function Square(props) {
    // console.log('props', props);
    return (
        // props中可以传数据，也可以传方法（通过标签属性从组件外向组件内传递变化的数据）
        <button className='square' onClick={props.onClick}>
            {/* 父组件传过来的数据 */}
            {props.value}
        </button>
    )
}

// Board组件渲染了9个方块,用来模拟棋盘格子
class Board extends React.Component {
    // 状态提升到了Game中，Board中的构造器就不在需要了
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // 用来保存子组件的state状态,再通过props将状态传递到子组件当中,可以方便组件状态数据之间的同步共享
    //         // 命名是否没有要求
    //         // 如何查看squares里面存的值呢
    //         squares: Array(9).fill(null),
    //         // 设置默认的第一步棋子（X） 后续棋子每走一步，该值都要反转一次
    //         xIsNext: true
    //     }
    // }


    // 这个函数是渲染的时候会自动调用吗?
    renderSquare(i) {
        // 将一个名为value的prop传递到Square中去
        // 依次将0-8的值通过prop从Board向下传递,从而让它们显示出来
        // console.log(this.state.squares);

        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    render() {
        // const status = 'Next player: ' + this.state.xIsNext ? 'X' : 'O';
        //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // const status = this.state.xIsNext ? 'X' : 'O';
        // const winner = calculateWinner(this.state.squares);
        // let status
        // if (winner) {
        //     status = 'winner:' + winner;
        // } else {
        //     status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                {/* <div className="status">{status}</div> */}
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
    // 把history state放在Game组件中，就可以从它的子组件Board里面删除掉square中的state，实现Game组件对Board组件数据的完全控制权
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
        }
    }

    handleClick(i) {

        const history = this.state.history;
        const current = history[history.length - 1];
        // 用slice()方法创建了squares数组的一个副本，在副本上进行修改（浅拷贝）
        const squares = this.state.squares.slice()
        // 阻止一个格子的状态反复变化
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // 保存变化
        squares[i] = this.state.xIsNext ? "X" : "O"
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'winner:' + winner;
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        // 父组件可以调用子组件中的函数吗---随后会将该方法移动到Game组件中
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    // 可以三个连起来获胜的位置 横竖斜
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // 返回‘X’或‘O’
            return squares[a]
        }
    }

    return null
}

// ========================================

// 创建了一个id名为root的Dom元素 得到一个React容器对象
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
