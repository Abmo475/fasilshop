import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';
import { Button, Modal } from 'react-bootstrap';
import App from '../../mapApi/src/App'


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [latitude, setLatitude] = useState(shippingInfo.latitude);  
    const [longitude, setLongitude] = useState(shippingInfo.longitude);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, latitude,longitude, phoneNo }));
        navigate("/order/confirm");
    }
 const setCoordinates=()=>{
    setShow(false);
    setLatitude(localStorage.getItem("latitude"))
    setLongitude(localStorage.getItem("longitude"));
    setShow(false);
 }
 function renderMap() {
    return (
      <>
        <Button style={{background:"blue"}} onClick={handleShow}>
          Get Location
        </Button>
  
        <Modal
        
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    <App/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style={{background:"grey"}} onClick={handleClose}>
              Close
            </Button>
            <Button style={{background:"blue"}} variant="primary" onClick={setCoordinates}>Set Location</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

    return (
        <>
            <MetaData title="Shipping Details" />
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">
 
                        <Stepper activeStep={1}>
                            <div className="w-full bg-white">

                                <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <div className="flex gap-6">
                        
                                        <TextField
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            type="number"
                                            label="Phone No"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                      <FormControl fullWidth>
                                        <InputLabel id="state-select">State</InputLabel>
                                        <Select
                                            labelId="state-select"
                                            id="state-select"
                                            value={state}
                                            label="State"
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        >
                                            {states.map((item) => (
                                                <MenuItem key={item.code} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                         
                                    </div>
                                    <TextField
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    <div className="w-full bg-white">
                                        

                                    </div>
                                    <div className="flex gap-6">
            
                                    <TextField
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                            type="number"
                                          
                                            fullWidth
                                            variant="outlined"
                                            required
                                            disabled
                                        />
                                         <TextField
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                            type="number"
                                          
                                            fullWidth
                                            variant="outlined"
                                            required
                                            disabled
                                        />
                                    </div>
      
 {renderMap()}

       


                                    <button type="submit" className="bg-primary-blue w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">save and deliver here</button>
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

export default Shipping;
