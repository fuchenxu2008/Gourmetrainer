import { SET_LOGIN_TOKEN } from '../constants/user';

const initialState = {
    user: null,
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN_TOKEN:
            return {
                ...state,
                
            }
        default:
            return state;
    }
}