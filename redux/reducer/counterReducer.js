import { DECREASE_COUNTER, GET_DATA, INCREASE_COUNTER } from "../../types";

const initialState = {
    counter: 0,
    cities: []
}

const getMovies = async () => {
    try {
        const response = await fetch('https://reactnative.dev/movies.json');
        const json = await response.json();
        console.log(json.movies)
        return json.movies
        // console.log(json.movies)
        // setData(json.movies);
    } catch (error) {
        return console.error(error);
    }
}
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_COUNTER:
            // var number = action.number
            // return { counter: number + 1 }
            return { counter: state.counter + 1 }
        case DECREASE_COUNTER:
            return { counter: state.counter - 1 }
        // case GET_DATA:
        //     const {
        //         cities,
        //     } = state;

        //     try {
        //         const response = await fetch('https://reactnative.dev/movies.json');
        //         const json = await response.json();
        //         // console.log(json.movies)
        //         cities.push(json.movies)
        //         console.log('cities: ' + cities)
        //         // setData(json.movies);
        //     } catch (error) {
        //         // cities.push(error);
        //     }

        //     // And put friend in friends.current


        //     // Finally, update the redux state
        //     const newState = { cities };

        //     return newState;
        // case GET_DATA:
        //     return { cities: getMovies() }
        // case GET_DATA:
        //     return { cities: action.payload }
        default:
            return state
    }

}
export default counterReducer