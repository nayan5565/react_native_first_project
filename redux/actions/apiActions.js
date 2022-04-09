import { GET_DATA } from "../../types";

// export const getCities = () => (
//     {
//         type: GET_DATA,
//     }
// );

export const getCities = () => {
    try {
        return async dispatch => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch('https://reactnative.dev/movies.json', requestOptions);
            // console.log('response: ' + JSON.stringify(response))

            if (response.status = 200) {
                const json = await response.json();
                dispatch({
                    type: GET_DATA,
                    payload: json.movies,
                    status: 'success'
                })
            } else {
                console.log('Unable to fecth data');
                dispatch({
                    type: GET_DATA,
                    status: 'error'
                })
            }
        }
    } catch (error) {
        console.log(error);
        return async dispatch => {
            dispatch({
                type: GET_DATA,
                status: 'error'
            })
        }
    }
}