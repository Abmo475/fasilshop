import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/productAction';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { createEmployee } from '../../actions/employeesAction';
import states, { GENDER } from '../../utils/states';
import { NEW_EMPLOYEE_RESET } from '../../constants/employeeConstants';
import { adminRegisterUser } from '../../actions/userAction';

const NewEmployee = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newEmployee);
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
    const handleAvatarChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setavatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }
 
    const newEmployeeSubmitHandler = (e) => {
        e.preventDefault();

        if (!avatar) {
            enqueueSnackbar("Add profile picture", { variant: "warning" });
            return;
        }
        const formData = new FormData();
        const formData2 = new FormData();
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
        formData.set("avatar", avatar);
        formData2.set("name", name);
        formData2.set("email", email);
        formData2.set("phoneNo", phoneNo);
        formData2.set("gender", gender);
        formData2.set("password",password);
        formData2.set("role","employee");
        formData2.set("avatar", avatar);
        dispatch(createEmployee(formData));
    }
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Employee Created", { variant: "success" });
            enqueueSnackbar("Employee Account", { variant: "success" });
            dispatch({ type: NEW_EMPLOYEE_RESET });
            navigate("/admin/employees");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Employee | Fasilshop" />
            {loading && <BackdropLoader />}
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
                        <img src={avatar} style={{width:'140px',display:'flex'}}/>
                    </div>
                    <div className="flex justify-end">
                        <input form="mainform" type="submit" className="rounded bg-blue-700 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                    </div>  
                    </div>        
            </form>
        </>
    );
};

export default NewEmployee;
