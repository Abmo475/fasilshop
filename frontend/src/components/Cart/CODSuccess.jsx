import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successfull from '../../assets/images/Transaction/success.png';
import { emptyCart } from '../../actions/cartAction';
import failed from '../../assets/images/Transaction/failed.png';
import { useDispatch, useSelector } from 'react-redux';
import { newOrder } from '../../actions/orderAction';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const CODSuccess = () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [time, setTime] = useState(3);
    const { user } = useSelector((state) => state.user);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
   
const pay=async(paydata)=>{
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const { data } = await axios.post(
        '/api/v1/payment/process',
        paydata,
        config,
    );
    console.log(data);
  
}
    const statement={
        "shippingInfo":{
            "address":shippingInfo.address,
             "city":shippingInfo.city,
             "latitiude":shippingInfo.latitude,
              "longitude":shippingInfo.longitude,
    "phoneNo":shippingInfo.phoneNo,
    "state":shippingInfo.state
        },
            "orderItems":cartItems 
        ,
        "user":"62f4455504f3518153b47ca0",
        "paymentInfo":{
            "id":Math.random().toString(36).substr(2, 7),
            "status":"TXN_SUCCESS"
        }
        ,
        "totalPrice":totalPrice
        
    }
   const payment={
	"txnId":Math.random().toString(36).substr(2, 9),
	"orderId":Math.random().toString(36).substr(2, 7),
	"txnAmount":totalPrice,
	"gatewayName":localStorage.getItem('gateway')=='cod'?'cod':'yenepay',
	"paymentMode":localStorage.getItem('gateway')=='cod'?"cash on delivery":"acount"
}
  pay(payment);
   
    // const  paymentInfo={
    //                  "id":"17",
    //                  "status":"TXN_SUCCESS"
    //                 }  
    //   const info={
    //                 "address":shippingInfo.address,
    //                   "city":shippingInfo.city,
    //                   "latitude":shippingInfo.latitude,
    //                    "longitude":shippingInfo.longitude,
    //          "phoneNo":shippingInfo.phoneNo,
    //      "state":shippingInfo.state
    //              }
    // const query={
    //         shippingInfo,
    //           orderItems: cartItems,
    //           user:user._id,
    //           paymentInfo:info,
    //           totalPrice

    //         //     "shippingInfo":{
    //         //         "address":shippingInfo.address,
    //         //          "city":shippingInfo.city,
    //         //          "latitiude":shippingInfo.latitude,
    //         //           "longitude":shippingInfo.longitude,
    //         // "phoneNo":shippingInfo.phoneNo,
    //         // "state":shippingInfo.state
    //         //     },,
    //        // ,
           
    //         //         "orderItems": [
    //         // {
    //         //     "name": "Logitech B175 Wireless Optical Mouse (2.4GHz Wireless, Black)",
    //         //     "price": 499,
    //         //     "quantity":2,
    //         //     "image":"https://res.cloudinary.com/da8hdfiix/image/upload/v1660228873/products/s4u43tbaatowvd8adzd8.jpg",
    //         //  "product":"62f5150ad1ef2cc4af2dbea3"
    //         //  }
    //         // ]
    //             // ,
    //             // "user":"62f4455504f3518153b47ca0",
    //             // "paymentInfo":{
    //             //     "id":"16",
    //             //     "status":"TXN_SUCCESS"
    //             // }
    //             // ,
    //             // "totalPrice":2 
    //         }
    //   
    
      console.log(payment)

    useEffect(() => {
       
        if (time === 0) {
           dispatch(newOrder(statement))
           dispatch(emptyCart());
           navigate("/orders")
            return;
        };
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [time]);

    return (
        <>
            <MetaData title={`Transaction Successfull`} />

            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">
                    <img draggable="false" className="w-1/2 h-60 object-contain" src={successfull} alt="Transaction Status" />
                    <h1 className="text-2xl font-semibold">Transaction Successfull</h1>
                    <p className="mt-4 text-lg text-gray-800">Redirecting to orders in {time} sec</p>
                    <Link to={"/orders"} className="bg-primary-blue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm">go to orders</Link>
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default CODSuccess;
