import { DECREASE_COUNTER, INCREASE_COUNTER } from "../types";

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