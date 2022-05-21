import { call, put, takeLatest } from "redux-saga/effects";
import { error, success } from "redux-saga-requests";
import {axios} from "../app/index";
import nomalize from "./../../Utils/normiliseServerResponce";
import NavigationService from '../../Service/navigationService'
import AsyncStorage from "@react-native-community/async-storage"
import {NAV_TYPES} from '../../Navigation/navTypes'
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
    USER_REGISTER_SMS,
    GET_SLIDE,
    SEND_REQUIREBOOKING,
    SEARCH_PACKAGE,
    REPORT,
    GET_BRANCH,
    LIST_CALLED_DRIVER,
    UPDATE_INFORMATION,
    VALIDATE_PASSWORD,
    CHANGE_PASSWORD,
    UPDATE_PHONE,
    DETAIL_CALLED_DRIVER,
    LIST_TOTAL_SUCCESS,
    DETAIL_TOTAL_SUCCESS,
    SITE_INFORMATION,
    USER_UPDATE_NOTIFICATION_TOKEN,    
    GET_NOTIFICATION,
    SEEN_NOTIFICATION,
    GET_COUNT_NOT_SEENT_NOTIFICATION,
    UPDATE_PROFILE,
    FORGET_PASSWORD,
    REQUEST_BOOKING,
    CANCELBOOKING

} from './reducer'

export function* userLogin({payload}){
    try {
        console.log('calling userLogin');
        const userLogin = yield call(axios.post, "app/login/seller", payload);
        console.log('userLogin', userLogin.data);
        yield (axios.defaults.headers.common = {
            Authorization: `Bearer ${userLogin.data.token}`
        });
        yield put({
            type: success(USER_LOGIN),
            payload:{
                userLogin:nomalize(userLogin)
            }
        });
        yield call(
            AsyncStorage.setItem,      
            "@DataLogin",
            JSON.stringify(userLogin.data)
        );
        console.log('here');
        yield NavigationService.reset(NAV_TYPES.CORE);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(USER_LOGIN),
            payload:{userLoginError:parseError}
        })
    }
}

export function* userLogout(){
    try {
        const userLogout = yield call(axios.post, "app/user/logout");
        console.log('userLogout', nomalize(userLogout));
        yield put({
            type: success(USER_LOGOUT),
            payload:{
                userLogout:nomalize(userLogout)
            }
        })
        yield (axios.defaults.headers.common = {
            Authorization: ``
        });
        yield call(
            AsyncStorage.removeItem,
            "@DataLogin"
        );
        NavigationService.reset(NAV_TYPES.LOADING)
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(USER_LOGOUT),
            payload:{userLogoutError:parseError}
        })
    }
}

//USER_REGISTER
export function* userRegister({payload}){
    try {
        const userRegister = yield call(axios.post, "app/login/register", payload);
        console.log('userRegister', userRegister);
        yield put({
            type: success(USER_REGISTER),
            payload:{
                userRegister:nomalize(userRegister)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', e);
        yield put({
            type:error(USER_REGISTER),
            payload:{userRegisterError:parseError}
        })
    }
}

//USER_REGISTER_SMS
export function* userGetSMS({payload}){
    try {
        const userGetSMS = yield call(axios.get, "app/login/get-sms/"+payload.phone);
        console.log('userGetSMS', userGetSMS);
        if(payload.setToken){
            yield (axios.defaults.headers.common = {
                Authorization: `Bearer ${userGetSMS.data.token}`
            });
        }
        yield put({
            type: success(USER_REGISTER_SMS),
            payload:{
                userGetSMS:userGetSMS.data.token
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', e);
        yield put({
            type:error(USER_REGISTER_SMS),
            payload:{userGetSMSError:parseError}
        })
    }
}

//HOME_SCREEN get slide
export function* getSlide(){
    try {
        const dataSlide = yield call(axios.get, "app/get_slide");
        console.log('dataSlide', dataSlide);
        yield put({
            type: success(GET_SLIDE),
            payload:{
                dataSlide:nomalize(dataSlide)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(GET_SLIDE),
            payload:{dataSlideError:parseError}
        })
    }
}

//SEND_REQUIREBOOKING
export function* sendRequireBooking({payload}){
    try {
        const sendRequireBooking = yield call(axios.post, "app/send_requirebooking/seller", payload);
        console.log('sendRequireBooking', sendRequireBooking);
        yield put({
            type: success(SEND_REQUIREBOOKING),
            payload:{
                sendRequireBooking:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SEND_REQUIREBOOKING),
            payload:{sendRequireBookingError:parseError}
        })
    }
}

//SEARCH_PACKAGE
export function* searchPackage({payload}){
    try {
        
        const searchPackage = yield call(axios.get, "app/search/seller/"+payload);
        // console.log("searchPackage",searchPackage)
        yield put({
            type: success(SEARCH_PACKAGE),
            payload:{
                searchPackage:nomalize(searchPackage)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SEARCH_PACKAGE),
            payload:{searchPackageError:parseError}
        })
    }
}

//REPORT
export function* report({payload}){
    try {
        const report = yield call(axios.get, "app/report/"+payload.date+"/"+payload.type);
        console.log('report', report);
        yield put({
            type: success(REPORT),
            payload:{
                report:nomalize(report)
            }
        });
        // yield NavigationService.reset(NAV_TYPES.CORE);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(REPORT),
            payload:{reportError:parseError}
        })
    }
}


//BRANCH
export function* getBranch(){
    try {
        const dataBranch = yield call(axios.get, "app/get-branch");
        console.log('dataBranch', dataBranch);
        yield put({
            type: success(GET_BRANCH),
            payload:{
                dataBranch:nomalize(dataBranch)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(GET_BRANCH),
            payload:{dataBranchError:parseError}
        })
    }
}

// UPDATE_INFORMATION
export function* updateInformation({payload}){
    try {
        const dataUpdateInformation = yield call(axios.post, "app/user/information", payload);
        console.log('dataUpdateInformation', dataUpdateInformation);
        yield put({
            type: success(UPDATE_INFORMATION),
            payload:{
                dataUpdateInformation:true
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(UPDATE_INFORMATION),
            payload:{updateInformationError:parseError}
        })
    }
}

// VALIDATE_PASSWORD
export function* validatePassword({payload}){
    try {
        console.log('payload*******', payload);
        const validatePassword = yield call(axios.post, "app/user/validate-password",payload);
        console.log('validatePassword',[payload.variable], validatePassword);
        yield put({
            type: success(VALIDATE_PASSWORD),
            payload:{
                [payload.variable]:true
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(VALIDATE_PASSWORD),
            payload:{[payload.variable+'Error']:parseError}
        })
    }
}

// CHANGE_PASSWORD
export function* changePassword({payload}){
    try {
        const changePassword = yield call(axios.post, "app/user/change-password",payload);
        console.log('changePassword', changePassword);
        yield put({
            type: success(CHANGE_PASSWORD),
            payload:{
                changePassword:true
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(CHANGE_PASSWORD),
            payload:{changePasswordError:parseError}
        })
    }
}

// FORGET_PASSWORD
export function* forgetPassword({payload}){
    try {
        const forgetPWD = yield call(axios.post, "app/login/seller/forgot-password",payload);
        console.log('forgetPWD', forgetPWD);
        yield put({
            type: success(FORGET_PASSWORD),
            payload:{
                forgetPWD:nomalize(forgetPWD)
            }
        });
        yield NavigationService.reset(NAV_TYPES.INTRO);   
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(FORGET_PASSWORD),
            payload:{forgetPWDError:parseError}
        })
    }
}

export function* cancelBooking({payload}){
    try {
        const dataCancelBooking = yield call(axios.post, "app/send_requirebooking/seller/cancel",payload);
        console.log('dataCancelBooking', dataCancelBooking);
        yield put({
            type: success(CANCELBOOKING),
            payload:{
                dataCancelBooking:nomalize(dataCancelBooking)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(CANCELBOOKING),
            payload:{dataCancelBookingError:parseError}
        })
    }
}


// UPDATE_PHONE
export function* updatePhone({payload}){
    try {
        const updatePhone = yield call(axios.post, "app/user/phone",payload);
        console.log('updatePhone', updatePhone);
        yield put({
            type: success(UPDATE_PHONE),
            payload:{
                updatePhone:true
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(UPDATE_PHONE),
            payload:{updatePhoneError:parseError}
        })
    }
}

// LIST_CALLED_DRIVER
export function* listCalledDriver({payload}){
    try {
        const dataCalledDriver = yield call(axios.get, "app/account-report/list/"+payload+"/called");
        console.log('dataCalledDriver', dataCalledDriver);
        yield put({
            type: success(LIST_CALLED_DRIVER),
            payload:{
                dataCalledDriver:nomalize(dataCalledDriver)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(LIST_CALLED_DRIVER),
            payload:{dataCalledDriverError:parseError}
        })
    }
}

// REQUEST_BOOKING
export function* listRequestBooking({payload}){
    // console.log('ssssss',payload);
    try {
        const dataRequestBooking = yield call(axios.get, "app/send_requirebooking/seller/list/"+payload);
        console.log('dataRequestBooking', dataRequestBooking);
        yield put({
            type: success(REQUEST_BOOKING),
            payload:{
                dataRequestBooking:nomalize(dataRequestBooking)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(REQUEST_BOOKING),
            payload:{dataRequestBookingError:parseError}
        })
    }
}

// DETAIL_CALLED_DRIVER
export function* detailCalledDriver({payload}){
    try {
        const detailCalledDriver = yield call(axios.get, "app/account-report/detail/called/"+payload.date+"/"+payload.id);
        console.log('detailCalledDriver', detailCalledDriver);
        yield put({
            type: success(DETAIL_CALLED_DRIVER),
            payload:{
                detailCalledDriver:nomalize(detailCalledDriver)
            }
        });
        
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(DETAIL_CALLED_DRIVER),
            payload:{detailCalledDriverError:parseError}
        })
    }
}

//LIST_TOTAL_SUCCESS
export function* listTotalSuccess({payload}){
    try {
        console.log('here***');
        const listTotalSuccess = yield call(axios.get, "app/account-report/list/"+payload+"/total");
        console.log('listTotalSuccess***', listTotalSuccess);
        yield put({
            type: success(LIST_TOTAL_SUCCESS),
            payload:{
                listTotalSuccess:nomalize(listTotalSuccess)
            }
        });
        // yield NavigationService.reset(NAV_TYPES.CORE);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(LIST_TOTAL_SUCCESS),
            payload:{listTotalSuccessError:parseError}
        })
    }
}

//DETAIL_TOTAL_SUCCESS
export function* detailTotalSuccess({payload}){
    try {
        const detailTotalSuccess = yield call(axios.get, "app/account-report/detail/total/"+payload.date+"/"+payload.id);
        console.log('detailTotalSuccess', detailTotalSuccess);
        yield put({
            type: success(DETAIL_TOTAL_SUCCESS),
            payload:{
                detailTotalSuccess:nomalize(detailTotalSuccess)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(DETAIL_TOTAL_SUCCESS),
            payload:{detailTotalSuccessError:parseError}
        })
    }
}



//SITE_INFORMATION
export function* siteInformation({payload}){
    try {
        const siteInformation = yield call(axios.get, "app/site-description");
        console.log('siteInformation', siteInformation);
        yield put({
            type: success(SITE_INFORMATION),
            payload:{
                siteInformation:nomalize(siteInformation)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SITE_INFORMATION),
            payload:{siteInformationError:parseError}
        })
    }
}

//USER_UPDATE_NOTIFICATION_TOKEN
export function* userUpdateNotificationToken({payload}){
    try {
        const userUpdateNotificationToken = yield call(axios.post, "app/update_notification_token", payload);
        console.log('userUpdateNotificationToken', userUpdateNotificationToken);
        yield put({
            type: success(USER_UPDATE_NOTIFICATION_TOKEN),
            payload:{
                userUpdateNotificationToken:nomalize(userUpdateNotificationToken)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(USER_UPDATE_NOTIFICATION_TOKEN),
            payload:{userUpdateNotificationTokenError:parseError}
        })
    }
}

//GET_NOTIFICATION
export function* getNotification({payload}){
    try {
        const getNotification = yield call(axios.get, "app/get_all_notification/list/"+payload);
        console.log('getNotification', getNotification);
        yield put({
            type: success(GET_NOTIFICATION),
            payload:{
                getNotification:nomalize(getNotification)
            }
        });
        // yield NavigationService.reset(NAV_TYPES.CORE);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(GET_NOTIFICATION),
            payload:{getNotificationError:parseError}
        })
    }
}

//SEEN_NOTIFICATION
export function* seenNotification(){
    console.log();
    try {
        const seenNotification = yield call(axios.post, "app/get_all_notification/seen");
        console.log('seenNotification', seenNotification);
        yield put({
            type: success(SEEN_NOTIFICATION),
            payload:{
                seenNotification:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('messseenNotificationag e', e);
        yield put({
            type:error(SEEN_NOTIFICATION),
            payload:{seenNotificationError:parseError}
        })
    }
}

//GET_COUNT_NOT_SEENT_NOTIFICATION
export function* getCountNotSeenNotification({payload}){
    try {
        const getCountNotSeenNotification = yield call(axios.get, "app/get_all_notification/count");
        console.log('getCountNotSeenNotification', getCountNotSeenNotification);
        yield put({
            type: success(GET_COUNT_NOT_SEENT_NOTIFICATION),
            payload:{
                getCountNotSeenNotification:nomalize(getCountNotSeenNotification)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(GET_COUNT_NOT_SEENT_NOTIFICATION),
            payload:{getCountNotSeenNotificationError:parseError}
        })
    }
}

//UPDATE_PROFILE
export function* updateProfile({payload}){
    console.log();
    try {
        const updateProfile = yield call(axios.post, "app/user/profile", payload);
        console.log('updateProfile', updateProfile);
        yield put({
            type: success(UPDATE_PROFILE),
            payload:{
                updateProfile:nomalize(updateProfile)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('messupdateProfileag e', e);
        yield put({
            type:error(UPDATE_PROFILE),
            payload:{updateProfileError:parseError}
        })
    }
}

export function* userSaga(){
    yield takeLatest(USER_LOGIN,userLogin);
    yield takeLatest(USER_LOGOUT,userLogout);
    yield takeLatest(USER_REGISTER,userRegister);
    yield takeLatest(USER_REGISTER_SMS,userGetSMS);
    yield takeLatest(GET_SLIDE,getSlide);
    yield takeLatest(SEND_REQUIREBOOKING,sendRequireBooking);
    yield takeLatest(SEARCH_PACKAGE,searchPackage);
    yield takeLatest(REPORT,report);
    yield takeLatest(GET_BRANCH,getBranch);
    yield takeLatest(LIST_CALLED_DRIVER,listCalledDriver);
    yield takeLatest(LIST_TOTAL_SUCCESS,listTotalSuccess);
    yield takeLatest(UPDATE_INFORMATION,updateInformation);
    yield takeLatest(VALIDATE_PASSWORD,validatePassword);
    yield takeLatest(CHANGE_PASSWORD,changePassword);
    yield takeLatest(UPDATE_PHONE,updatePhone);
    yield takeLatest(DETAIL_CALLED_DRIVER,detailCalledDriver);
    yield takeLatest(DETAIL_TOTAL_SUCCESS,detailTotalSuccess);
    yield takeLatest(SITE_INFORMATION,siteInformation);
    yield takeLatest(USER_UPDATE_NOTIFICATION_TOKEN,userUpdateNotificationToken);
    yield takeLatest(GET_NOTIFICATION,getNotification);
    yield takeLatest(SEEN_NOTIFICATION,seenNotification);
    yield takeLatest(GET_COUNT_NOT_SEENT_NOTIFICATION,getCountNotSeenNotification);
    yield takeLatest(UPDATE_PROFILE,updateProfile);
    yield takeLatest(FORGET_PASSWORD,forgetPassword);
    yield takeLatest(REQUEST_BOOKING,listRequestBooking);
    yield takeLatest(CANCELBOOKING,cancelBooking);
}