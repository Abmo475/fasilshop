import axios from 'axios';
import { ADD_YENE_PAY_FAILURE, ADD_YENE_PAY_REQUEST, ADD_YENE_PAY_SUCCESS } from '../constants/paymentConstants';

export const AddYanepay = (paymentData) => async (dispatch) => {
const parseUrl=(url)=>{
    return url
}
    try {

        dispatch({ type: ADD_YENE_PAY_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
      
        const { redirectUrl } = await axios.post(
            '/api/v1/CheckoutCart',
            paymentData,
            config
        );
        console.log(redirectUrl);
      if(redirectUrl){
        dispatch({
            type: ADD_YENE_PAY_SUCCESS,
            payload: redirectUrl,
           // console.log(payload);
        });
       
      }
      else{

      }
      
    } catch (error) {
        dispatch({
            type: ADD_YENE_PAY_FAILURE,
            payload: error
        });
    }
};
