import { success, error, abort } from "redux-saga-requests";

export const USER_LOGIN = 'USER_LOGIN';    //export const name to module/user/index
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SMS = 'USER_REGISTER_SMS';
export const GET_SLIDE = 'GET_SLIDE';
export const SEND_REQUIREBOOKING = 'SEND_REQUIREBOOKING';
export const SEARCH_PACKAGE = 'SEARCH_PACKAGE';
export const REPORT = 'REPORT';
export const GET_BRANCH = 'GET_BRANCH';
export const LIST_CALLED_DRIVER = 'LIST_CALLED_DRIVER';
export const UPDATE_INFORMATION = 'UPDATE_INFORMATION';
export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_PHONE = 'UPDATE_PHONE';    
export const DETAIL_CALLED_DRIVER = 'DETAIL_CALLED_DRIVER';   
export const LIST_TOTAL_SUCCESS = 'LIST_TOTAL_SUCCESS';
export const DETAIL_TOTAL_SUCCESS = 'DETAIL_TOTAL_SUCCESS';
export const SITE_INFORMATION = 'SITE_INFORMATION';
export const USER_UPDATE_NOTIFICATION_TOKEN = 'USER_UPDATE_NOTIFICATION_TOKEN';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const SEEN_NOTIFICATION = 'SEEN_NOTIFICATION';
export const GET_COUNT_NOT_SEENT_NOTIFICATION = 'GET_COUNT_NOT_SEENT_NOTIFICATION';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const REQUEST_BOOKING = 'REQUEST_BOOKING';
export const CANCELBOOKING = 'CANCELBOOKING';

userUpdateNotificationToken
export const userLogin = (payload) =>({
    type: USER_LOGIN,
    payload
});

export const userLogout = () =>({
    type: USER_LOGOUT,
});

export const userRegister = (payload) =>({
    type: USER_REGISTER,
    payload
});

export const userGetSMS = (payload) =>({
    type: USER_REGISTER_SMS,
    payload
});

export const getSlide = (payload) =>({
    type: GET_SLIDE,
    payload
});

export const sendRequireBooking = (payload) =>({
    type: SEND_REQUIREBOOKING,
    payload
});

export const searchPackage = (payload) =>({
    type: SEARCH_PACKAGE,
    payload
});

export const report = (payload) =>({
    type: REPORT,
    payload
});
export const listTotalSuccess = (payload) =>({
    type: LIST_TOTAL_SUCCESS,
    payload
});

export const getBranch = () =>({
    type: GET_BRANCH
});


export const updateInformation = (payload) =>({
    type: UPDATE_INFORMATION,
    payload //for get or post paramat from server
});

export const validatePassword = (payload) =>({
    type: VALIDATE_PASSWORD,
    payload
});

export const changePassword = (payload) =>({
    type: CHANGE_PASSWORD,
    payload   //for get or post paramat from server
});

export const forgetPassword = (payload) =>({
    type: FORGET_PASSWORD,
    payload
    
});

export const cancelBooking = (payload) =>({
    type: CANCELBOOKING,
    payload
});

export const updatePhone = (payload) =>({
    type: UPDATE_PHONE,
    payload
});

export const listCalledDriver = (payload) =>({
    type: LIST_CALLED_DRIVER,
    payload
});

export const listRequestBooking = (payload) =>({
    type: REQUEST_BOOKING,
    payload
});

export const detailCalledDriver = (payload) =>({
    type: DETAIL_CALLED_DRIVER,
    payload
});

export const detailTotalSuccess = (payload) =>({
    type: DETAIL_TOTAL_SUCCESS,
    payload
});

export const siteInformation = (payload) =>({
    type: SITE_INFORMATION,
    payload
});

export const userUpdateNotificationToken = (payload) =>({
    type: USER_UPDATE_NOTIFICATION_TOKEN,
    payload
});

export const getNotification = (payload) =>({
    type: GET_NOTIFICATION,
    payload
});

export const seenNotification = () =>({
    type: SEEN_NOTIFICATION,
});

export const getCountNotSeenNotification = () =>({
    type: GET_COUNT_NOT_SEENT_NOTIFICATION
});

export const updateProfile = (payload) =>({
    type: UPDATE_PROFILE,
    payload
});



const initialState = {
    pending: false,
    error: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    //USER_LOGIN
    case USER_LOGIN:{  // when called userlogin function this cas start first
        return{...state,pending:true};
    }
    case success(USER_LOGIN):{ //if success it will call this success case
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_LOGIN):{  //if success it will call this success case
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_LOGIN):{  //didn't yet
        return{...state,pending:false};
    }
    //USER_LOGOUT
    case USER_LOGOUT:{
        return{...state,pending:true};
    }
    case success(USER_LOGOUT):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_LOGOUT):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_LOGOUT):{
        return{...state,pending:false};
    }

    //USER_REGISTER
    case USER_REGISTER:{
        return{...state,pending:true};
    }
    case success(USER_REGISTER):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_REGISTER):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_REGISTER):{
        return{...state,pending:false};
    }

    //USER_REGISTER_SMS
    case USER_REGISTER_SMS:{
        return{...state,pending:true, userGetSMS:false, userGetSMSError:false};
    }
    case success(USER_REGISTER_SMS):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_REGISTER_SMS):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_REGISTER_SMS):{
        return{...state,pending:false};
    }
    //GET_SLIDE
    case GET_SLIDE:{
        return{...state,pending:true};
    }
    case success(GET_SLIDE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(GET_SLIDE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(GET_SLIDE):{
        return{...state,pending:false};
    }
    //SEND_REQUIREBOOKING
    case SEND_REQUIREBOOKING:{
        return{...state,pending:true, sendRequireBooking:false, sendRequireBookingError:false};
    }
    case success(SEND_REQUIREBOOKING):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SEND_REQUIREBOOKING):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(SEND_REQUIREBOOKING):{
        return{...state,pending:false};
    }
    //SEARCH_PACKAGE
    case SEARCH_PACKAGE:{
        return{...state,pending:true, searchPackageError:false};
    }
    case success(SEARCH_PACKAGE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SEARCH_PACKAGE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(SEARCH_PACKAGE):{
        return{...state,pending:false};
    }
    //REPORT
    case REPORT:{
        return{...state,pending:true};
    }
    case success(REPORT):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(REPORT):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(REPORT):{
        return{...state,pending:false};
    }
    
    //LIST_TOTAL_SUCCESS
      case LIST_TOTAL_SUCCESS:{
        return{...state,pending:true};
    }
    case success(LIST_TOTAL_SUCCESS):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(LIST_TOTAL_SUCCESS):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(LIST_TOTAL_SUCCESS):{
        return{...state,pending:false};
    }

    
    //GET_BRANCH
    case GET_BRANCH:{
        return{...state,pending:true};
    }
    case success(GET_BRANCH):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(GET_BRANCH):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(GET_BRANCH):{
        return{...state,pending:false};
    }

    //LIST_CALLED_DRIVER
    case LIST_CALLED_DRIVER:{
        return{...state,pending:true};
    }
    case success(LIST_CALLED_DRIVER):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(LIST_CALLED_DRIVER):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(LIST_CALLED_DRIVER):{
        return{...state,pending:false};
    }

    //REQUEST_BOOKING
    case REQUEST_BOOKING:{
        return{...state,pending:true};
    }
    case success(REQUEST_BOOKING):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(REQUEST_BOOKING):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(REQUEST_BOOKING):{
        return{...state,pending:false};
    }

    //UPDATE_INFORMATION
    case UPDATE_INFORMATION:{
        return{...state,pending:true,dataUpdateInformation:false};
    }
    case success(UPDATE_INFORMATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(UPDATE_INFORMATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(UPDATE_INFORMATION):{
        return{...state,pending:false};
    }

     //VALIDATE_PASSWORD
     case VALIDATE_PASSWORD:{
        return{...state,pending:true, [action.payload.variable]:false};
    }
    case success(VALIDATE_PASSWORD):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(VALIDATE_PASSWORD):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(VALIDATE_PASSWORD):{
        return{...state,pending:false};
    }

    //CHANGE_PASSWORD
     case CHANGE_PASSWORD:{
        return{...state,pending:true, changePassword:false};
    }
    case success(CHANGE_PASSWORD):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CHANGE_PASSWORD):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(CHANGE_PASSWORD):{
        return{...state,pending:false};
    }

    //FORGET_PASSWORD
    case FORGET_PASSWORD:{
        return{...state,pending:true};
    }
    case success(FORGET_PASSWORD):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(FORGET_PASSWORD):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(FORGET_PASSWORD):{
        return{...state,pending:false};
    }
    //CANCELBOOKING
    case CANCELBOOKING:{
        return{...state,pending:true};
    }
    case success(CANCELBOOKING):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CANCELBOOKING):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(CANCELBOOKING):{
        return{...state,pending:false};
    }

    //UPDATE_PHONE
    case UPDATE_PHONE:{
        return{...state,pending:true, updatePhone:false};
    }
    case success(UPDATE_PHONE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(UPDATE_PHONE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(UPDATE_PHONE):{
        return{...state,pending:false};
    }
    
    //DETAIL_CALLED_DRIVER
     case DETAIL_CALLED_DRIVER:{
        return{...state,pending:true};
    }
    case success(DETAIL_CALLED_DRIVER):{
        return{
            ...state,
            ...action.payload,
            pending:false
        };
    }
    case error(DETAIL_CALLED_DRIVER):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(DETAIL_CALLED_DRIVER):{
        return{...state,pending:false};
    }
    //DETAIL_TOTAL_SUCCESS
    case DETAIL_TOTAL_SUCCESS:{
        return{...state,pending:true};
    }
    case success(DETAIL_TOTAL_SUCCESS):{
        return{
            ...state,
            ...action.payload,
            pending:false
        };
    }
    case error(DETAIL_TOTAL_SUCCESS):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(DETAIL_TOTAL_SUCCESS):{
        return{...state,pending:false};
    }

     //SITE_INFORMATION
     case SITE_INFORMATION:{
        return{...state,pending:true};
    }
    case success(SITE_INFORMATION):{
        return{
            ...state,
            ...action.payload,
            pending:false
        };
    }
    case error(SITE_INFORMATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(SITE_INFORMATION):{
        return{...state,pending:false};
    }

     //USER_UPDATE_NOTIFICATION_TOKEN
     case USER_UPDATE_NOTIFICATION_TOKEN:{
        return{...state,pending:true};
    }
    case success(USER_UPDATE_NOTIFICATION_TOKEN):{
        return{
            ...state,
            ...action.payload,
            pending:false
        };
    }
    case error(USER_UPDATE_NOTIFICATION_TOKEN):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_UPDATE_NOTIFICATION_TOKEN):{
        return{...state,pending:false};
    }

    //GET_NOTIFICATION
    case GET_NOTIFICATION:{
        return{...state,pending:true};
    }
    case success(GET_NOTIFICATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(GET_NOTIFICATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(GET_NOTIFICATION):{
        return{...state,pending:false};
    }

    //SEEN_NOTIFICATION
    case SEEN_NOTIFICATION:{
        return{...state};
    }
    case success(SEEN_NOTIFICATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SEEN_NOTIFICATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(SEEN_NOTIFICATION):{
        return{...state,pending:false};
    }

    //GET_COUNT_NOT_SEENT_NOTIFICATION
    case GET_COUNT_NOT_SEENT_NOTIFICATION:{
        return{...state,pending:false};
    }
    case success(GET_COUNT_NOT_SEENT_NOTIFICATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(GET_COUNT_NOT_SEENT_NOTIFICATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(GET_COUNT_NOT_SEENT_NOTIFICATION):{
        return{...state,pending:false};
    }

    //UPDATE_PROFILE
    case UPDATE_PROFILE:{
        return{...state,pending:true, updateProfile:false};
    }
    case success(UPDATE_PROFILE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(UPDATE_PROFILE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(UPDATE_PROFILE):{
        return{...state,pending:false};
    }


    /**
     * DEFAULT_CASE
     */
    default:
        return state;
    }
};
export default userReducer;