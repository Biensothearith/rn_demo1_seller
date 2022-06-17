import { takeLatest, put, call } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import axiosDefault from "axios";
import NavigationService from '../../Service/navigationService'
import {NAV_TYPES} from '../../Navigation/navTypes'
import {
    SET_APP_LOCALE,
    APP_INIT,
} from "./reducer";
import { error, success } from "redux-saga-requests";
import I18n from "react-native-i18n";

import { API_URL } from "./config";
export const axios = axiosDefault.create({
  baseURL: API_URL
});

axios.interceptors.response.use(
  response => response,
  error => {
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.config.url !== `${baseURL}/user/logout`
      ) {
        // store.dispatch(userLogout());
      }      
      return Promise.reject(error.response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

function* startupWorker() {
  var authDataString = yield AsyncStorage.getItem("@DataLogin");
  const authData = yield JSON.parse(authDataString);
  if (authDataString && authData.token) {
    yield (axios.defaults.headers.common = {
      Authorization: `Bearer ${authData.token}`
    });
    yield NavigationService.reset(NAV_TYPES.CORE);
  } else {
    yield NavigationService.reset(NAV_TYPES.INTRO);
    yield NavigationService.navigate(NAV_TYPES.INTRO);
  }
}

function* setLocaleWorker({ payload }) {
  try {
    yield AsyncStorage.setItem("defaultLocale", payload.lang || "en");
    I18n.locale = yield payload.lang ? payload.lang : "en";
    if(payload.nav){
      yield NavigationService.reset(payload.nav);
      yield NavigationService.navigate(payload.nav);
    }
  } catch (error) {
    console.log('setLocaleWorker error', error);
  }
}

export function* appSaga() {
  yield takeLatest(APP_INIT, startupWorker);
  yield takeLatest(SET_APP_LOCALE, setLocaleWorker);
}
