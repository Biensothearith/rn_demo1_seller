import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  Platform,
  SafeAreaView,
  Linking,
} from "react-native";

import Loading from "../Components/Loading";
import I18n from "../Service/Translate";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QRCodeScanner from "react-native-qrcode-scanner";
import NavigationService from "../Service/navigationService";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors, images } from "../Assets";

import { NAV_TYPES } from "../Navigation/navTypes";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const rectDimensions = SCREEN_WIDTH * 0.5;
export default class Flow extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataInput: {
        id: "",
      },
      scanning: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    const { dataInput } = this.state;
    if (
      nextProps.user.searchPackageError &&
      nextProps.user.searchPackageError !== user.searchPackageError
    ) {
      Alert.alert(I18n.t("alertInvalidPackage"));
    }
    if (
      nextProps.user.searchPackage &&
      nextProps.user.searchPackage !== user.searchPackage
    ) {
      if (nextProps.user.searchPackage.length > 0) {
        NavigationService.navigate(NAV_TYPES.SPECAILINFO, {
          data: nextProps.user.searchPackage,
        });
      } else {
        Alert.alert(I18n.t("alertInvalidPackageNumber"));
      }
    }
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
  handleSearchPackage() {
    const { dataInput } = this.state;
    var id = dataInput.id;
    this.props.sendRequireBooking({
      ...dataInput,
      id: id,
    });
  }

  handleScanBarcode(e) {
    try {
      if (e && e.data) {
        var data = JSON.parse(e.data);
        this.props.searchPackage(data.id);
        this.setState({ scanning: false });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err)
    );
  };

  render() {
    const { dataInput, scanning } = this.state;
    const { user } = this.props;
    return (
      <>
        {user.pending && <Loading />}
        <SafeAreaView
          style={{
            flex: Platform.OS == "ios" ? 1 : 1,
            backgroundColor: Platform.OS == "ios" ? "white" : "null",
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            style={styles.container}
          >
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.inner}>
                  <View style={styles.btnBack}>
                    <TouchableOpacity
                      onPress={() => NavigationService.goBack()}
                    >
                      <MaterialIcons
                        style={{
                          color: colors.main_color,
                          marginRight: "0%",
                          fontSize: 45,
                        }}
                        name="keyboard-arrow-left"
                      ></MaterialIcons>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.benner}>
                    <Text style={styles.text}>
                      {I18n.t("shippingTracking")}{" "}
                    </Text>
                  </View>
                </View>
                <View style={styles.searchBox}>
                  <TextInput
                    style={[styles.inputBox, { flex: 1 }]}
                    placeholder={I18n.t("pleaseEnterTheItemCode")}
                    fontFamily={"Battambang-Bold"}
                    value={dataInput.id}
                    onChangeText={value => this.handleChangeInput("id", value)}
                  ></TextInput>
                  <TouchableOpacity
                    style={[
                      styles.btnSearch,
                      { flexDirection: "row", alignSelf: "flex-end" },
                    ]}
                    onPress={() => this.props.searchPackage(dataInput.id)}
                  >
                    <Image
                      source={images.search}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={styles.searchTitle}>{I18n.t("search")}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.containSceneBox}>
                  {scanning ? (
                    <QRCodeScanner
                      showMarker
                      ref={node => {
                        this.scanner = node;
                      }}
                      fadeIn={false}
                      onRead={e => this.handleScanBarcode(e)}
                      containerStyle={styles.zeroContainer}
                      cameraStyle={styles.zeroContainer}
                      customMarker={
                        <>
                          <TouchableOpacity
                            style={styles.closeScan}
                            onPress={() => this.setState({ scanning: false })}
                          >
                            <MaterialCommunityIcons
                              name="close"
                              color={"#fff"}
                              size={30}
                            />
                          </TouchableOpacity>
                          <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}></View>
                          </View>
                        </>
                      }
                    />
                  ) : (
                    <View style={styles.scaneBox}>
                      <TouchableOpacity
                        onPress={() => this.setState({ scanning: true })}
                      >
                        <Image
                          style={styles.ScaneImage}
                          source={require("../Assets/images/hand-phone.png")}
                        />
                      </TouchableOpacity>
                      <View style={styles.ScaneBoxTitle}>
                        <Text style={styles.ScaneTitle}>
                          {I18n.t("pleasClickOnTheImageAboveToScan")}
                        </Text>
                      </View>
                      <View style={styles.qrCode}>
                        <Text style={styles.qrCodeTitle}>
                          {I18n.t("QR_Code")}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
    flex: 0.15,
    //flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
  benner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: colors.gray_dark,
    fontFamily: "Battambang-Bold",
  },
  searchBox: {
    flexDirection: "row",
    height: 50,
    marginLeft: "10%",
    marginRight: "10%",
    borderBottomColor: colors.main_color,
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  inputBox: {
    flexDirection: "row",
    marginTop: 2,
    fontSize: 14,
    color: "grey",
    height: 50,
    color: "black",
    fontFamily: "Battambang-Bold",
  },
  btnSearch: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_color,
    borderTopEndRadius: 10,
  },
  searchTitle: {
    color: "white",
    fontSize: 14,
    fontFamily: "Battambang-Bold",
  },
  containSceneBox: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor:'red',
    overflow: "hidden",
  },
  scaneBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  ScaneImage: {
    width: 120,
    height: 150,
  },

  ScaneBoxTitle: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  ScaneTitle: {
    fontSize: 16,
    color: colors.main_color,
    textAlign: "center",
    fontFamily: "Battambang-Bold",
  },
  qrCode: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
  },
  qrCodeTitle: {
    fontSize: 16,
    color: colors.main_color,
    textAlign: "center",
    fontFamily: "Battambang-Bold",
  },
  zeroContainer: {
    width: "100%",
    // height: 238,
    height: 400,
  },
  rectangleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    borderRadius: 10,
    borderColor: "#fff",
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  closeScan: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 999999999,
  },
  btnBack: {
    position: "absolute",
    top: "9%",
    left: "3%",
  },
});
