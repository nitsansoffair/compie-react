import { UPDATE_STATE, UPDATE_BOARD, RESET_GAME } from './types';

export const updateBoard = (newBoard) => {
    return {
        type: UPDATE_BOARD,
        payload: newBoard
    };
};

export const resetGame = () => {
    return {
        type: RESET_GAME,
        payload: {}
    };
};
