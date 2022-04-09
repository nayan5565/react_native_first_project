import { DECREASE_COUNTER, GET_DATA, INCREASE_COUNTER } from "../../types";


export const increaseCounter = (num) => (
    {
        type: INCREASE_COUNTER,
        number: num,
    }
);

export const decreaseCounter = () => (
    {
        type: DECREASE_COUNTER,
    }
);
// export const getCities = () => (
//     {
//         type: GET_DATA,
//     }
// );


export const getCities = () => {
    try {
        return async dispatch => {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            if (json) {
                dispatch({
                    type: GET_DATA,
                    payload: json.movies
                })
            } else {
                console.log('Unable to fecth data');
            }
        }
    } catch (error) {
        console.log(error);
    }
}