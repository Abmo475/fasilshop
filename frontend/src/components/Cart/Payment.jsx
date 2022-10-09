import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import { AddYanepay } from '../../actions/yanepayAction';
import methodConstants from './methodConstants';
import { Navigate, useNavigate } from 'react-router-dom';
import CODSuccess from './CODSuccess';
import { emptyCart } from '../../actions/cartAction';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { enqueueSnackbar } = useSnackbar();
     
    const [payDisable, setPayDisable] = useState(false);
    var Items=[]
    var counter=0;
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const [cmod,setCmod]=useState('');
    const [choice,setchoice]=useState(false);
   // const {url}=useSelector((state)=>state.url);
 
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };
   
        useEffect(() => {
            if(cmod){
            navigate("/cod/success")
         //   dispatch(emptyCart());
            }
    },);
    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
          setchoice(target.value);
        }
    }
    const addPayment = (NewItems) => {
        dispatch(AddYanepay(NewItems));
    }
    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
            
        }
    }, [dispatch, error, enqueueSnackbar]);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(choice);
      
     switch(choice){
        case 1:
                console.log(choice);
        setPayDisable(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config,
            );
            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }
            post(info)
        } catch (error) {
            // paymentBtn.current.disabled = false;
            setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
        break;
         case methodConstants.COD:  
         setCmod(true);
         console.log("In cod block",choice);
      
       localStorage.setItem('gateway','cod')
    
       
        //add payment 
        // add location 
        // add shipping 
        // goto success on success 
        
          
           Navigate("/cod/success")
            // eslint-disable-next-line
        ;
         break;
  case methodConstants.YENE_PAY:
    console.log("In cod block",choice);
    let statement="&";
    let i=0;
            cartItems.reduce((sum, item) =>{
                var price=item.price;
                var name=item.name;
                var quantity=item.quantity; 
                statement=statement+'Items['+i+'].ItemName=Item1'+name+'&Item['+i+'].ItemId='+(++counter)+'&Items['+i+'].UnitPrice='+price+'&Items['+i+'].Quantity='+quantity+'&'
                var item2 = {
                    'ItemId':++counter,
                    'ItemName':name,
                    'UnitPrice':price,
                    'Quantity':quantity
                }; 
                Items.push(item2)
                Items.push(item2)
                i++;
                 },0);
              window.location='https://www.yenepay.com/checkout/Home/Process/?process=Cart'+statement+'ExpiresAfter=&DeliveryFee=&HandlingFee=&Tax1=&Tax2=&Discount=&SuccessUrl=http%3A%2F%2Flocalhost%3A3000%2Fcod%2Fsuccess&CancelUrl=http%3A%2F%2Flocalhost%3A3000%2F&MerchantId=14501'
            // // const   data=//"{[{ItemId: 1, ItemName: 'Logitech B175 Wireless Optical Mouse (2.4GHz Wireless, Black), UnitPrice: 499,Quantity: 4}]}"
          
                 try{
               addPayment(
                JSON.stringify(Items)// '"Items\"':[{"ItemId":1,"ItemName":"Logitech B175 Wireless Optical Mouse (2.4GHz Wireless, Black)","UnitPrice":499,"Quantity":4}]'
            );
            console.log(JSON.stringify(statement));
           // console.log(url);
    }catch (error) {
        // paymentBtn.current.disabled = false;
         
        enqueueSnackbar(error, { variant: "error" });
    }
    break;
default:
            enqueueSnackbar("Payment Method Not Selected", { variant: "error" });
}
}
   
    
    return (
        <>
            <MetaData title="Secure Payment | Paytm" />

            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">

                                <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue={methodConstants.YENE_PAY}
                                           value={choice}
                                             onChange={handleChange}
                                            name="payment-radio-button"
                                          
                                        >
                                               <FormControlLabel
                                                control={<Radio />}
                                                value={methodConstants.YENE_PAY}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://yenepayprod.blob.core.windows.net/images/logo.png" alt="Paytm Logo" />
                                                        <span>YenePay</span>
                                                    </div>
                                                }
                                            />
                                             <FormControlLabel
                                                value={methodConstants.COD}
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://yenepayprod.blob.core.windows.net/images/logo.png" alt="Paytm Logo" />
                                                        <span>Cash On Delivery</span>
                                                    </div>
                                                }
                                            />
                                                <FormControlLabel
                                               
                                                value={3}
                                                
                                                control={<Radio />}
                                               label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://yenepayprod.blob.core.windows.net/images/logo.png" alt="Paytm Logo" />
                                                        <span>Amole</span>
                                                    </div>
                                                }
                                            />
                                                <FormControlLabel
                                                value={4}
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://yenepayprod.blob.core.windows.net/images/logo.png" alt="Paytm Logo" />
                                                        <span>Arifpay</span>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <input type="submit" id='checkout' value={`Pay ETB ${totalPrice.toLocaleString()}`} disabled={payDisable ? true : false} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-blue cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />

                                </form>

                                             </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;