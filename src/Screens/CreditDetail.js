import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import I18n from "../Service/Translate";
import Loading from "../Components/Loading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import AsyncStorage from "@react-native-community/async-storage";
import { colors } from "../Assets";
export default class CreditDetail extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataInput: {
        name: "",
        bankName: "",
        bankAccountNumber: "",
        bankAccountName: "",
      },
      confirmPass: {
        password: "",
        confirmPassword: "",
      },
      show: false,
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { user, navigation } = this.props;
    const { dataInput } = this.state;

    if (
      nextProps.user.updateInformationError &&
      nextProps.user.updateInformationError !== user.updateInformationError
    ) {
      Alert.alert(I18n.t("alertWentWrong"));
    }
    if (
      nextProps.user.dataUpdateInformation &&
      nextProps.user.dataUpdateInformation !== user.dataUpdateInformation
    ) {
      if (navigation.state.routeName == "CREDITDETAIL") {
        Alert.alert(I18n.t("alertInfoChangeSuccessfully"));
        var userData = await this._retrieveData();
        userData = JSON.parse(userData);
        userData.data = dataInput;
        this._storeData(userData);
      }
    }
    //validatePassword
    if (
      nextProps.user.validateInformationError &&
      nextProps.user.validateInformationError !== user.validateInformationError
    ) {
      if (
        nextProps.user.validateInformationError.data &&
        nextProps.user.validateInformationError.data.message &&
        nextProps.user.validateInformationError.data.message ==
          "invalid_password"
      ) {
        //  Alert.alert('invalid_password')
        Alert.alert(I18n.t("alertInvalidePassword"));
      } else {
        // alert('something went wrong')
        Alert.alert(I18n.t("alertWentWrong"));
      }
    }
    if (
      nextProps.user.validateInformation &&
      nextProps.user.validateInformation !== user.validateInformation
    ) {
      this.handleUpdateInformation();
    }
  }
  _storeData = async data => {
    try {
      console.log("_storeData", data);
      await AsyncStorage.setItem("@DataLogin", JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataLogin");
      if (value !== null) {
        // We have data!!
        console.log("value", value);
        return value;
      } else {
        console.log(value);
        return false;
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  async componentDidMount() {
    var userData = await this._retrieveData();
    userData = JSON.parse(userData);
    console.log(userData);
    userData = userData.data;
    this.setState({
      dataInput: userData,
    });
    this.getUserStorage();
  }

  handleChangeInput(key, value) {
    const { dataInput } = this.state;
    var val = value;
    this.setState({
      dataInput: {
        ...dataInput,
        [key]: val,
      },
    });
  }
  handleValidatePass() {
    const { dataInput } = this.state;
    var confirmPassword = dataInput.confirmPassword;
    this.props.validatePassword({
      password: confirmPassword,
      variable: "validateInformation",
    });
  }
  handleUpdateInformation() {
    const { dataInput } = this.state;
    console.log("datainput", dataInput);
    this.props.updateInformation({
      ...dataInput,
    });
  }
  getUserStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataLogin");
      if (value !== null) {
        // We have data!!
        console.log("value", JSON.parse(value));
        if (value) {
          this.setState({
            userStorage: JSON.parse(value).data,
          });
        }
      } else {
        console.log("value", false);
        return;
      }
    } catch (error) {
      // Error retrieving data
      console.log("error", error);
    }
  };
  render() {
    const { dataInput, userStorage } = this.state;
    const { user } = this.props;
    return (
      <>
        {user.pending && <Loading />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={styles.container}
        >
          <ScrollView style={{ flex: 1 }}>
            <View
              flex={0.1}
              style={{
                borderBottomColor: colors.gray_dark,
                borderBottomWidth: 1,
                Top: 50,
              }}
            />
            <View style={styles.inner}>
              <View style={styles.btnBack}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.goBack();
                  }}
                >
                  <MaterialIcons
                    style={{
                      color: colors.gray_dark,
                      marginRight: "20%",
                      fontSize: 33,
                    }}
                    name="keyboard-arrow-left"
                  ></MaterialIcons>
                </TouchableOpacity>
              </View>
              <View style={styles.benner}>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.gray_dark,
                    fontFamily: "Battambang-Bold",
                  }}
                >
                  {I18n.t("EditAccount")}
                </Text>
              </View>
              <View style={styles.btnBack}></View>
            </View>
            <View
              flex={0.01}
              style={{
                borderBottomColor: colors.gray_dark,
                borderBottomWidth: 1,
                Top: 50,
              }}
            />
            <View
              style={styles.branch}
              onPress={() => {
                NavigationService.navigate(NAV_TYPES.CHANGENSHOP);
              }}
            >
              <TextInput
                style={styles.ListTitleBox}
                placeholder={I18n.t("ShopName")}
                placeholderTextColor="grey"
                keyboardType={Platform.OS == "ios" ? null : "text"}
                color={colors.gray_dark}
                paddingLeft={20}
                fontSize={14}
                fontWeight="bold"
                value={dataInput.name}
                onChangeText={value => this.handleChangeInput("name", value)}
              />
              <View style={styles.iconBox}>
                <Text style={styles.Date}>{I18n.t("ShopName")}</Text>
              </View>
            </View>
            <View
              style={styles.branch}
              onPress={() => {
                NavigationService.navigate(NAV_TYPES.CHANGEBANK);
              }}
            >
              <TextInput
                style={styles.ListTitleBox}
                placeholder={I18n.t("BankName")}
                placeholderTextColor="grey"
                //keyboardType={Platform.OS == 'ios' ? null:"text"}
                keyboardType="numeric"
                color={colors.gray_dark}
                paddingLeft={20}
                fontSize={14}
                fontWeight="bold"
                value={dataInput.bankName}
                onChangeText={value =>
                  this.handleChangeInput("bankName", value)
                }
              />
              <View style={styles.iconBox}>
                <Text style={styles.Date}>{I18n.t("BankName")}</Text>
              </View>
            </View>
            <View
              style={styles.branch}
              onPress={() => {
                NavigationService.navigate(NAV_TYPES.CHANGEUSERNAME);
              }}
            >
              <TextInput
                style={styles.ListTitleBox}
                placeholder={I18n.t("ChangeBankAccountName")}
                placeholderTextColor="grey"
                keyboardType={Platform.OS == "ios" ? null : "text"}
                color={colors.gray_dark}
                paddingLeft={20}
                fontSize={14}
                fontWeight="bold"
                value={dataInput.bankAccountName}
                onChangeText={value =>
                  this.handleChangeInput("bankAccountName", value)
                }
              />
              <View style={styles.iconBox}>
                <Text style={styles.Date}>
                  {I18n.t("ChangeBankAccountName")}
                </Text>
              </View>
            </View>
            <View
              style={styles.branch}
              onPress={() => {
                NavigationService.navigate(NAV_TYPES.CHANGEBANKNUM);
              }}
            >
              <TextInput
                style={styles.ListTitleBox}
                placeholder={I18n.t("ChangeAccountNumber")}
                placeholderTextColor="grey"
                keyboardType={Platform.OS == "ios" ? null : "text"}
                color={colors.gray_dark}
                paddingLeft={20}
                fontSize={14}
                fontWeight="bold"
                value={dataInput.bankAccountNumber}
                onChangeText={value =>
                  this.handleChangeInput("bankAccountNumber", value)
                }
              />
              <View style={styles.iconBox}>
                <Text style={styles.Date}>{I18n.t("ChangeAccountNumber")}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.branch}
              onPress={() => {
                Alert.alert("Only demo!");
              }}
            >
              <View style={styles.ListTitleBox}>
                <Text
                  style={styles.ListTitle}
                  style={{
                    color: "grey",
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: "bold",
                  }}
                >
                  ************
                </Text>
              </View>
              <View style={styles.iconBox}>
                <Text style={styles.Date}>{I18n.t("Password")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.branch}
              onPress={() => {
                Alert.alert("Only demo!");
              }}
            >
              <View style={styles.ListTitleBox}>
                {userStorage && userStorage.phone && (
                  <Text
                    style={styles.ListTitle}
                    style={{
                      color: "grey",
                      fontSize: 14,
                      marginLeft: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {/* {I18n.t('PhoneNumber')}
                            {dataInput.changePhoneNumber} */}
                    {userStorage.phone}
                  </Text>
                )}
              </View>
              <View style={styles.iconBox}>
                <Text style={styles.Date}>{I18n.t("changePhoneNumber")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.readyBtn}
              // onPress={()=>this.handleUpdateInformation()}
              onPress={() => {
                this.setState({ show: true });
              }}
            >
              <Text style={styles.btnTitle}>{I18n.t("buttonDone")}</Text>
              <Modal transparent={true} visible={this.state.show}>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      margin: 30,
                      borderRadius: 10,
                      height: 200,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 0.37,
                      shadowRadius: 7.49,
                      elevation: 12,
                    }}
                  >
                    <View style={styles.HeaderTitle}>
                      <Text
                        style={styles.HeaderTitle}
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {I18n.t("confirmPassword")}
                      </Text>
                    </View>

                    <TextInput
                      style={styles.inputBox}
                      placeholder={I18n.t("confirmPassword")}
                      placeholderTextColor="grey"
                      keyboardType={Platform.OS == "ios" ? null : "default"}
                      color="black"
                      fontSize={14}
                      secureTextEntry={true}
                      value={dataInput.confirmPassword}
                      onChangeText={value =>
                        this.handleChangeInput("confirmPassword", value)
                      }
                    />
                    <TouchableOpacity
                      style={styles.footerBtn}
                      onPress={() => {
                        this.setState({ show: false }),
                          this.handleValidatePass();
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Battambang-Bold",
                          color: "white",
                        }}
                      >
                        {I18n.t("buttonDone")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? "10%" : "0%",
  },
  benner: {
    flex: 0.8,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  branch: {
    flex: 0.08,
    flexDirection: "row",
    borderBottomColor: colors.gray_dark,
    borderBottomWidth: 1,
  },
  ListTitleBox: {
    flex: 0.55,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    flex: 0.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginEnd: 20,
  },
  ListTitle: {
    color: colors.gray_dark,
    fontSize: 14,
    marginLeft: 20,
    fontWeight: "bold",
  },
  Date: {
    color: "grey",
    fontSize: 12,
    marginLeft: 20,
    fontFamily: "Battambang-Bold",
  },
  readyBtn: {
    flex: 0.08,
    height: 50,
    flexDirection: "row",
    backgroundColor: colors.gray_dark,
    margin: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Battambang-Bold",
  },
  //FormPopUP
  HeaderTitle: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  inputBox: {
    height: 50,
    flexDirection: "row",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    fontFamily: "Battambang-Bold",
    margin: 10,
    alignItems: "center",
    borderBottomColor: "black",
    marginLeft: "10%",
    marginRight: "10%",
  },
  footerBtn: {
    height: 50,
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: colors.gray_dark,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
  },
});
