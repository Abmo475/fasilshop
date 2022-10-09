import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import Actions from './Actions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapLocation from './mapActions';
import BingMapsReact from "bingmaps-react";
import { Button, Modal } from 'react-bootstrap';


const EmployeeOrderTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error } = useSelector((state) => state.allOrders);
    const [show, setShow] = useState(false);
    const [latitude,setLatitude]=useState("");
    const [longitude,setLongitude]=useState("");
    const [finalClickInfo, setFinalClickInfo] = useState(null);

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnCellClick = (params) => {
        setFinalClickInfo(params);
        setLatitude(finalClickInfo.row.latitiude);
        setLongitude(finalClickInfo.row.longitude);
        handleShow();
        console.log(finalClickInfo.row.latitiude);
      };
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);
    
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }
    const pushPin = {
        center: {
          latitude:finalClickInfo?finalClickInfo.row.latitiude:null,
          longitude:finalClickInfo?finalClickInfo.row.longitude:null
        },
        options: {
          title: "User",
        },
      }
      
      const pushPins = [pushPin];

const rendermap=()=>{
    return(<>
     
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{width:"500px",height:"700px"}}
        >
          <Modal.Header closeButton>
            <Modal.Title>Bing Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <BingMapsReact
      bingMapsKey="AksOASfzdybmndjlOxhWnhZaNtzG5CMgqUFIgB5Ji8W6Gr748WQL5mijk5w4OmDD"
      height="500px"
      zoom={1}
      pushPins={pushPins}
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="500px"
     viewOptions={{
         center: { latitude:latitude, longitude:longitude },
         mapTypeId: "streetside",
       }}
    />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style={{background:"RED"}} onClick={handleClose}>
              Close
            </Button>
            {/* <Button style={{background:"blue"}} variant="primary" onClick={()=>{}}>Set Location</Button> */}
          </Modal.Footer>
        </Modal>
      </>)
}
    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                return (
                  
                    <>
                   
                        {
                            params.row.status === "Delivered" ? (
                                <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">{params.row.status}</span>
                            ) : params.row.status === "Shipped" ? (
                                <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">{params.row.status}</span>
                            ) : (
                                <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">{params.row.status}</span>
                            )
                        }
                    </>
                )
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>ETB {params.row.amount.toLocaleString()}</span>
                );
            },
        },
        {
            field: "orderOn",
            headerName: "Order On",
            type: "date",
            minWidth: 200,
            flex: 0.5,
        },
       
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"order"} deleteHandler={deleteOrderHandler} id={params.row.id} />
               
                    );
                    
            },
                },
                {
                    minWidth: 40,
                    flex: 0.3,
                    type: "number",
                    sortable: false,
                    renderCell: (params) => {
                        return (
                            <MapLocation editRoute={"order"} latitiude={params.row.latitiude} longitude={params.row.longitude} id={params.row.id} />     // editRoute={"order"} deleteHandler={deleteOrderHandler} id={params.row.id} />
                    
                            );
                            
                    }
                }
    ];

    const rows = [];
const returned=(x,y)=>{
    console.log(x,y);
}
    orders && orders.forEach((order) => {
        rows.unshift({
            id: order._id,
            itemsQty: order.orderItems.length,
            amount: order.totalPrice,
            orderOn: formatDate(order.createdAt),
            status: order.orderStatus,
            latitiude:order.shippingInfo.latitiude,
            longitude:order.shippingInfo.longitude,
        });
    });

    return (
        <>
            <MetaData title="Admin Orders | Fasilshop" />

            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase">orders</h1>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                <DataGrid 
                onRowDoubleClick={handleOnCellClick}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
            {rendermap()}
        </>
    );
};

export default EmployeeOrderTable;
