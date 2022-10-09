import { ADMIN_EMPLOYEE_FAIL, ADMIN_EMPLOYEE_REQUEST, ADMIN_EMPLOYEE_SUCCESS, ALL_EMPLOYEE_FAIL, ALL_EMPLOYEE_REQUEST, ALL_EMPLOYEE_SUCCESS, CLEAR_ERRORS, DELETE_EMPLOYEE_FAIL, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_RESET, DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, NEW_EMPLOYEE_FAIL, NEW_EMPLOYEE_REQUEST, NEW_EMPLOYEE_RESET, NEW_EMPLOYEE_SUCCESS, REMOVE_EMPLOYEE_DETAILS, UPDATE_EMPLOYEE_FAIL, UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_RESET, UPDATE_EMPLOYEE_SUCCESS } from "../constants/employeeConstants";

 
export const employeesReducer = (state = { employees: [] }, { type, payload }) => {

    switch (type) {
        case ALL_EMPLOYEE_REQUEST:
        case ADMIN_EMPLOYEE_REQUEST:
            return {
                loading: true,
                employees: [],
            };
        case ALL_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                employees: payload.employees,
                employeescount: payload.employeescount,
            };
        case ADMIN_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                employees: payload,
            };
        case ALL_EMPLOYEE_FAIL:
        case ADMIN_EMPLOYEE_FAIL:
               return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
 
export const newEmployeeReducer = (state = { employee: {} }, { type, payload }) => {
    switch (type) {
        case NEW_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                employee: payload.employee,
            };
        case NEW_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_EMPLOYEE_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const EmployeeReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_EMPLOYEE_REQUEST:
        case DELETE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_EMPLOYEE_FAIL:
        case DELETE_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_EMPLOYEE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_EMPLOYEE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
export const employeeDetailsReducer = (state = { employee: {} }, { type, payload }) => {

    switch (type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EMPLOYEE_DETAILS_SUCCESS:
            return {
                loading: false,
                employee: payload,
            };
        case EMPLOYEE_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
            case REMOVE_EMPLOYEE_DETAILS:
            return {
                ...state,
                employee: {},
            };
    case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
