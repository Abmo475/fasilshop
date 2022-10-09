import { ADD_YENE_PAY_FAILURE, ADD_YENE_PAY_REQUEST, ADD_YENE_PAY_SUCCESS } from "../constants/paymentConstants";

export const YanepayReducer = (state ={Items:[]}, { type, payload }) => {
    console.log(payload)
    switch (payload) {
        case ADD_YENE_PAY_REQUEST:
            return {
              ...state,
            };
        case ADD_YENE_PAY_SUCCESS:
            return {
                ...state,
            Items: payload
                };
        case ADD_YENE_PAY_FAILURE:
            return {
          error: payload,
            };
        default:
            return state;
    }
};
