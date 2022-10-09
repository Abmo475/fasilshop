import axios from "axios";
import { ADMIN_EMPLOYEE_FAIL, ADMIN_EMPLOYEE_REQUEST, ADMIN_EMPLOYEE_SUCCESS, ALL_EMPLOYEE_FAIL, ALL_EMPLOYEE_REQUEST, ALL_EMPLOYEE_SUCCESS, CLEAR_ERRORS, DELETE_EMPLOYEE_FAIL, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, NEW_EMPLOYEE_FAIL, NEW_EMPLOYEE_REQUEST, NEW_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_FAIL, UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_SUCCESS } from "../constants/employeeConstants";
import { PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";


export const getEmployees =() => async (dispatch) => {
        try {
            dispatch({ type: ALL_EMPLOYEE_REQUEST });
            const { data } = await axios.get("/employees");
            dispatch({
                type: ALL_EMPLOYEE_SUCCESS,
                payload: data,  
            });
        } catch (error) {
            dispatch({
                type: ALL_EMPLOYEE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Get All Products ---ADMIN
export const getAdminEmployee = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_EMPLOYEE_REQUEST });

        const { data } = await axios.get('/api/v1/admin/employees');

        dispatch({
            type: ADMIN_EMPLOYEE_SUCCESS,
            payload: data.employees,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_EMPLOYEE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Product ---ADMIN
export const createEmployee = (employeedata) => async (dispatch) => {
    try {
        dispatch({ type: NEW_EMPLOYEE_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
  
       //const {data2}=await axios.post("/api/v1/admin/userregister",userdata,config);
        const { data } = await axios.post("/api/v1/admin/employee/new", employeedata, config);
        
        dispatch({
            type: NEW_EMPLOYEE_SUCCESS,
          
            payload: data
        
        });
    } catch (error) {
        dispatch({
            type: NEW_EMPLOYEE_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product ---ADMIN
export const updateEmployee = (id, employeedata) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/employee/${id}`, employeedata, config);

        dispatch({
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_EMPLOYEE_FAIL,
            payload: error.response.data.message,
        });
    }
}
///employee/:id

export const getEmployeeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/employee/${id}`);

        dispatch({
            type: EMPLOYEE_DETAILS_SUCCESS,
            payload: data.employee,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Delete Product ---ADMIN
export const deleteEmployee = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/employee/${id}`);

        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}