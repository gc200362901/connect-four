import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(30).fill(null),
      redsTurn: true
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    while (this.state.squares[i] == null && i <= squares.length) {
      i += 6;
      if (i >= squares.length && this.state.squares[i] == null) {
        squares[i - 6] = this.state.redsTurn ? "◎" : "◍";
        this.setState({
          squares: squares,
          redsTurn: !this.state.redsTurn
        });
      } else if (i <= squares.length && this.state.squares[i] != null) {
        squares[i - 6] = this.state.redsTurn ? "◎" : "◍";
        this.setState({
          squares: squares,
          redsTurn: !this.state.redsTurn
        });
      }
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.redsTurn ? "◎" : "◍");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
        <div className="board-row">
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [6, 7, 8, 9],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    [18, 19, 20, 21],
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [25, 26, 27, 28],
    [26, 27, 28, 29],
    [0, 6, 12, 18],
    [6, 12, 18, 24],
    [1, 7, 13, 19],
    [7, 13, 19, 25],
    [2, 8, 14, 20],
    [8, 14, 20, 26],
    [3, 9, 15, 21],
    [9, 15, 21, 27],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [6, 13, 20, 27],
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [2, 9, 16, 23],
    [11, 16, 21, 26],
    [5, 10, 15, 20],
    [10, 15, 20, 25],
    [4, 9, 14, 19],
    [9, 14, 19, 24],
    [3, 8, 13, 18]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[c] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
