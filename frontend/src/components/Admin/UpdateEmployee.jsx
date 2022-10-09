import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import BackdropLoader from '../Layouts/BackdropLoader';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import { clearErrors, getEmployeeDetails, updateEmployee } from '../../actions/employeesAction';
import { REMOVE_EMPLOYEE_DETAILS, UPDATE_EMPLOYEE_RESET } from '../../constants/employeeConstants';
import { MenuItem, TextField } from '@mui/material';
import states, { GENDER } from '../../utils/states';

const UpdateEmployee = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, employee, error } = useSelector((state) => state.employeeDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.employee);

    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [dob, setdob] = useState("");
    const [eductionalLevel, seteductionalLevel] = useState("");
    const [gender, setgender] = useState("");
    const [password, setpassword] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [State, setstate] = useState("");
    const [salary, setsalary] = useState("");
    const [avatar, setavatar] = useState("");
    const [preview,setpreview]=useState("");

    const handleAvatarChange = (e) => {
        const reader = new FileReader();
        setavatar("");
        reader.onload = () => {
            if (reader.readyState === 2) {
                setavatar(reader.result);
                setpreview(reader.result)
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }
   
    const newEmployeeSubmitHandler = (e) => {
        console.log(1,avatar)
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phoneNo", phoneNo);
        formData.set("dob", dob);
        formData.set("eductionalLevel", eductionalLevel);
        formData.set("gender",gender);
        formData.set("password", password);
        formData.set("address", address);
        formData.set("city", city);
        formData.set("State", State);
        formData.set("salary", salary);
        formData.set("avatar", avatar)//"https://res.cloudinary.com/da8hdfiix/image/upload/v1660981383/avatars/qlkoylzabhi5qwfhashb.jpg");


        dispatch(updateEmployee(params.id, formData));
    }

    const employeeId = params.id;

    useEffect(() => {

        if (employee && employee._id !== employeeId) {
            dispatch(getEmployeeDetails(employeeId));
        } else {
if(employee){
           setName(employee.name)
           setemail(employee.email)
             setphoneNo(employee.phoneNo)
            setdob(employee.dob)
             seteductionalLevel(employee.eductionalLevel)
             setgender(employee.gender)
           setpassword(employee.password)
            setaddress(employee.address)
              setcity(employee.city)
             setstate(employee.State)
             setsalary(employee.salary)
             setpreview(employee.avatar.url)
} 
         //setpreview(employee?employee.avatar.url:employee.avater)
        
         //  setpreview(employee.avatar?employee.avatar.url:employee.avatar)
          
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Employee Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_EMPLOYEE_RESET });
            dispatch({ type: REMOVE_EMPLOYEE_DETAILS });
            navigate("/admin/employees");
        }
    }, [dispatch, error, updateError, isUpdated, employeeId, employee, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Employee | Fasilshop" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}
            <form onSubmit={newEmployeeSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                <TextField
                        label="FullName"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="email"
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <TextField
                        label="phone no"
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={phoneNo}
                        onChange={(e) => setphoneNo(e.target.value)}
                    />
                     <TextField
                        label="Date of Birth"
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={dob}
                        onChange={(e) => setdob(e.target.value)}
                    />
                      <TextField
                        label="Educational Level"
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={eductionalLevel}
                        onChange={(e) => seteductionalLevel(e.target.value)}
                    />
                     <TextField
                            label="Gender"
                            select
                            variant="outlined"
                            size="small"
                            required
                            value={gender}
                            onChange={(e) => setgender(e.target.value)}
                        >
                       
                                            {GENDER.map((item) => (
                                                <MenuItem key={item.code} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                      

                            </TextField>
                     <TextField
                            label="password"
                            type="password"
                            variant="outlined"
                            size="small"
                            required
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                <div className="flex justify-between">
                            <TextField
                            label="Address"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                         <TextField
                            label="city"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="state"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={State}
                            onChange={(e) => setstate(e.target.value)}
                        >
                       
                                            {states.map((item) => (
                                                <MenuItem key={item.code} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                      

                            </TextField>
                            <TextField
                            label="salary"
                            type="number"
                            variant="outlined"
                            size="small"
                           
                            required
                            value={salary}
                            onChange={(e) => setsalary(e.target.value)}
                        />
                    </div>
                    <h2 className="font-medium">Employee Picture</h2>
                    <div className="flex justify-between gap-4 items-start">
                        <label className="rounded bg-blue-700 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            Choose image
                        </label>
                        {/* <img src={preview} style={{width:'140px',display:'flex'}}/> */}
                        <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                            {!avatar ? <ImageIcon /> :
                                <img draggable="false" src={preview} alt="Brand Logo" className="w-full h-full object-contain" />
                            }
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <input form="mainform" type="submit" className="rounded bg-blue-700 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                    </div>  
                     
                </div>
            </form>
        </>
    );
};

export default UpdateEmployee;