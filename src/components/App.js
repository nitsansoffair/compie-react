import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard, resetGame } from '../actions';
import constants from '../constants/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const winner = this.getWinner();
            const gameOver = this.isGameOver();

            if (gameOver || winner) {
                this.props.resetGame();
            }

            if (winner) {
                this.setState({
                    winner
                });
            }
        }
    }

    getCellValue = (value) => value === constants.NONE ? '' : value;

    getBoard = () => this.props.game && this.props.game.board ? this.props.game.board : [
        constants.NONE, constants.NONE, constants.NONE,
        constants.NONE, constants.NONE, constants.NONE,
        constants.NONE, constants.NONE, constants.NONE
    ];

    getTurn = () => this.props.game && this.props.game.turn ? this.props.game.turn : constants.X;

    getWinner = () => {
        const board = this.getBoard();

        return (this.isRow(0, board) || this.isRow(3, board) || this.isRow(6, board) ||
            this.isCol(0, board) || this.isCol(1, board) || this.isCol(2, board) ||
            this.isSlant(0, board) || this.isSlant(1, board));
    };

    isRow = (i, board) => {
        if (board[i] !== constants.NONE && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
            return board[i];
        }
    };

    isCol = (i, board) => {
        if (board[i] !== constants.NONE && board[i] === board[i + 3] && board[i + 3] === board[i + 3 * 2]) {
            return board[i];
        }
    };

    isSlant = (i, board) => {
        if (i === 0) {
            if (board[0] !== constants.NONE && board[0] === board[4] && board[4] === board[8]) {
                return board[4];
            }
        }

        if (board[2] !== constants.NONE && board[2] === board[4] && board[4] === board[6]) {
            return board[4];
        }
    };

    isGameOver = () => {
        const board = this.getBoard();
        return board.indexOf(constants.NONE) === -1;
    };

    onUpdateBoard = (e, id) => {
        e.preventDefault();

        const board = this.getBoard();
        const currentTurn = this.getTurn();

        if (board[id - 1] === constants.NONE) {
            board[id - 1] = currentTurn;
            const newTurn = currentTurn === constants.X ? constants.O : constants.X;

            this.props.updateBoard({
                board,
                turn: newTurn
            });
        }
    };

    render() {
        const board = this.getBoard();

        return (
            <div className="game__container">
                <div className="game__header">Tic Tac Toe</div>
                { this.state.winner && <div className="game__header"> The winner is { this.state.winner } </div> }
                <div className="game__row">
                    <div id="1" className="game__col" onClick={(e) => this.onUpdateBoard(e, 1)}>{ this.getCellValue(board[1 - 1]) }</div>
                    <div id="2" className="game__col" onClick={(e) => this.onUpdateBoard(e, 2)}>{ this.getCellValue(board[2 - 1]) }</div>
                    <div id="3" className="game__col" onClick={(e) => this.onUpdateBoard(e, 3)}>{ this.getCellValue(board[3 - 1]) }</div>
                </div>
                <div className="game__row">
                    <div id="4" className="game__col" onClick={(e) => this.onUpdateBoard(e, 4)}>{ this.getCellValue(board[4 - 1]) }</div>
                    <div id="5" className="game__col" onClick={(e) => this.onUpdateBoard(e, 5)}>{ this.getCellValue(board[5 - 1]) }</div>
                    <div id="6" className="game__col" onClick={(e) => this.onUpdateBoard(e, 6)}>{ this.getCellValue(board[6 - 1]) }</div>
                </div>
                <div className="game__row">
                    <div id="7" className="game__col" onClick={(e) => this.onUpdateBoard(e, 7)}>{ this.getCellValue(board[7 - 1]) }</div>
                    <div id="8" className="game__col" onClick={(e) => this.onUpdateBoard(e, 8)}>{ this.getCellValue(board[8 - 1]) }</div>
                    <div id="9" className="game__col" onClick={(e) => this.onUpdateBoard(e, 9)}>{ this.getCellValue(board[9 - 1]) }</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(
    mapStateToProps, { updateBoard, resetGame }
)(App);
