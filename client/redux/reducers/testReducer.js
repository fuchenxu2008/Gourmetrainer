const initialState = {
    name: 'Steve'
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAY_HI':
            return {
                ...state,
                name: 'Harold'
            }
        default:
            return state;
    }
}