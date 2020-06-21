import { UPDATE_BOARD, UPDATE_STATE, RESET_GAME } from '../actions/types';

const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return {
                ...state,
                state: action.payload
            };
        case UPDATE_BOARD:
            return {
                ...state,
                ...action.payload
            };
        case RESET_GAME:
            return {
                ...state,
                board: undefined,
                turn: undefined
            };
        default:
            return state;
    }
};

export default gameReducer;
