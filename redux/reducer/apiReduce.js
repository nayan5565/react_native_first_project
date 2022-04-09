import { GET_DATA } from '../../types';

const INITIAL_STATE = {
    cities: [],
    status: ''

};

// apiCal = (async) => {
//     try {
//         const response = await fetch('https://reactnative.dev/movies.json');
//         const json = await response.json();
//         console.log('Reducer: ' + response.status);
//         data = json.movies;
//     } catch (error) {
//         console.log(error);
//     } finally {
//         isLoading = false;
//     }
// }

const apiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, cities: action.payload, status: action.status }

        default:
            return state
    }
};
export default apiReducer