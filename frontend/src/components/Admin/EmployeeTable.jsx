import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { clearErrors, deleteEmployee, getAdminEmployee } from '../../actions/employeesAction';
import { DELETE_EMPLOYEE_RESET } from '../../constants/employeeConstants';

const EmployeeTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { employees, error} = useSelector((state) => state.employees);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.employee);

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
            enqueueSnackbar("Employee Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_EMPLOYEE_RESET });
        }
        dispatch(getAdminEmployee());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteEmployeeHandler = (id) => {
        dispatch(deleteEmployee(id));
    }

    const columns = [
        {
        field: "id",
        headerName: "ID",
        minWidth: 50,
        flex: 1,
    },
        {
        
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.avatar} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            // renderCell: (params) => {
            //     return (
            //         <>
            //             {
            //                 params.row.stock < 10 ? (
            //                     <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">{params.row.stock}</span>
            //                 ) : (
            //                     <span className="">{params.row.stock}</span>
            //                 )
            //             }
            //         </>
            //     )
            // },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            // renderCell: (params) => {
            //     return (
            //         <span>ETB {params.row.price.toLocaleString()}</span>
            //     );
            // },
        },
        {
            field: "cprice",
            headerName: "Cutted Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            // renderCell: (params) => {
            //     return (
            //         <span>ETB {params.row.cprice.toLocaleString()}</span>
            //     );
            // },
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
        //     renderCell: (params) => {
        //         return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
        //     }
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
                    <Actions editRoute={"employee"} deleteHandler={deleteEmployeeHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    employees && employees.forEach((item) => {
        console.log(item.avatar);
        rows.unshift({
            id: item._id,
            name: item.name,
            avatar: item.avatar?item.avatar.url:item.avatar,
            state: item.state,
            city: item.city,
            address: item.address,
            eductionalLevel: item.eductionalLevel,
            dob: item.dob,
            gender:item.gender
        });
    });

    return (
        <>
            <MetaData title="Admin Products | Fasilshop" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">products</h1>
                <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                <DataGrid
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
        </>
    );
};

export default EmployeeTable;