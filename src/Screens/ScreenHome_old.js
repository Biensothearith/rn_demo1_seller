import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slideshow from "react-native-slideshow";
import Loading from "../Components/Loading";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import { SLIDE_URL } from "../Modules/app/config";
import I18n from "../Service/Translate";
import { colors, images } from "../Assets";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [],
      lang: "en",
      countNotitification: 0,
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      this.props.getCountNotSeenNotification();
    });
    this.props.getSlide();
    this.props.siteInformation();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (
      nextProps.user.dataSlide &&
      nextProps.user.dataSlide !== user.dataSlide
    ) {
      if (nextProps.user.dataSlide.length > 0) {
        var imageUrls = [];
        for (let index = 0; index < nextProps.user.dataSlide.length; index++) {
          const element = nextProps.user.dataSlide[index];
          imageUrls.push({
            url: SLIDE_URL + element.url,
          });
        }
        console.log("imageUrls", imageUrls);
        this.setState({
          dataSource: imageUrls,
        });
      }
    }

    if (
      nextProps.user.getCountNotSeenNotification &&
      nextProps.user.getCountNotSeenNotification !==
        user.getCountNotSeenNotification
    ) {
      if (nextProps.user.getCountNotSeenNotification.length > 0) {
        console.log(
          "nextProps.user.getCountNotSeenNotification",
          nextProps.user.getCountNotSeenNotification
        );
        this.setState({
          countNotitification:
            nextProps.user.getCountNotSeenNotification[0].notSeenCount,
        });
      }
    }
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    console.log("this.props", this.props);
    this.setState({
      lang: I18n.locale,
    });
    console.log("I18n.locale", I18n.locale);
  }

  handleChangeLanguage(lang) {
    this.props.setLocale({
      lang: lang,
      nav: NAV_TYPES.LOADING,
    });
  }
  render() {
    const { countNotitification } = this.state;
    const { user } = this.props;
    return (
      <>
        {user.pending && <Loading />}
        <SafeAreaView style={{ flex: Platform.OS == "ios" ? 1 : 1 }}>
          <View style={styles.container}>
            <View style={styles.inner}>
              <View style={{justifyContent:'center'}}>
               <Image style={styles.centerLogo} source={images.logo} />
              </View>
            </View>
            <View style={styles.orderBox}>
              <View style={styles.order}>
                <TouchableOpacity
                  style={styles.deliverBox}
                  onPress={() => {
                    NavigationService.navigate(NAV_TYPES.MOTOMAP);
                  }}
                >
                  <View style={styles.deliverImage}>
                    <Image
                      style={styles.deliver}
                      source={images.moto}
                    />
                  </View>
                  <View style={styles.deliverTitle}>
                    <Text style={styles.Title}>{I18n.t("moto")}</Text>
                  </View>
                  <View style={styles.deliverTitle1}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 12,
                        fontFamily: "Battambang",
                      }}
                    >
                      {I18n.t("forSmallShipments")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deliverBox}
                  onPress={() => {
                    NavigationService.navigate(NAV_TYPES.MAP01);
                  }}
                >
                  <View style={styles.deliverImage}>
                    <Image
                      style={styles.deliver_tuktuk}
                      source={images.tuktuk}
                    />
                  </View>
                  <View style={styles.deliverTitle}>
                    <Text style={styles.Title}>{I18n.t("romork")}</Text>
                  </View>
                  <View style={styles.deliverTitle1}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 12,
                        fontFamily: "Battambang",
                      }}
                    >
                      {I18n.t("forMediumFreight")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.check}>
                <TouchableOpacity
                  style={styles.deliverBox}
                  onPress={() => {
                    NavigationService.navigate(NAV_TYPES.CARMAP);
                  }}
                >
                  <View style={styles.deliverImage}>
                    <Image
                      style={styles.deliver_van}
                      source={images.van}
                    />
                  </View>
                  <View style={styles.deliverTitle}>
                    <Text style={styles.Title}>{I18n.t("truck")}</Text>
                  </View>
                  <View style={styles.deliverTitle1}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 12,
                        fontFamily: "Battambang",
                      }}
                    >
                      {I18n.t("forBulkCargo")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deliverBox}
                  onPress={() => {
                    NavigationService.navigate(NAV_TYPES.FLOW);
                  }}
                >
                  <View style={styles.deliverImage}>
                    <Image
                      style={styles.deliver_search}
                      source={images.search}
                    />
                  </View>
                  <View style={styles.deliverTitle}>
                    <Text style={styles.Title}>{I18n.t("checkLuggage")}</Text>
                  </View>
                  <View style={styles.deliverTitle1}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 12,
                        fontFamily: "Battambang",
                      }}
                    >
                      {I18n.t("checkTheDeliveryProcess")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ads}>
              <View style={styles.bennerAds} marginTop={3}>
                <View
                  style={{ color: "white", marginTop: 5, fontSize: 15 }}
                ></View>
                <Slideshow
                  style={styles.slide}
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  height={220}
                  onPositionChanged={position => this.setState({ position })}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  btn: {
    flex: 1,
  },
  inner: {
    flex: 0.1,
    flexDirection: "row",
    paddingLeft:20
  },
  benner: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#364547",
    right: 5,
    position: "absolute",
  },
  bennerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    marginRight: 12,
  },
  centerLogo: {
    width: 45,
    height: 45,
  },
  rightLogo: {
    marginLeft: 15,
  },
  ads: {
    flex: 0.33,
    flexDirection: "row",
    paddingBottom: 20,
    padding: 15,
  },
  bennerAds: {
    flex: 1,
    alignItems: "center",
    margin: 0,
    marginTop: -10,
  },
  adsImage: {
    width: "100%",
    height: "80%",
  },

  orderBox: {
    flex: 0.52,
    margin: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  Title: {
    fontSize: 16,
    color: "white",
    fontFamily: "Battambang",
  },
  TitleBox: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  order: {
    flex: 0.5,
    flexDirection: "row",
  },
  deliver: {
    width: 60,
    height:60,
  },
  deliver_tuktuk:{
    width:80,
    height:80
  },
  deliver_van:{
    width:70,
    height:70
  },
  deliver_search:{
    width:50,
    height:50
  },
  check: {
    flex: 0.5,
    flexDirection: "row",
  },
  deliverBox: {
    flex: 0.6,
    flexDirection: "column",
    backgroundColor: colors.gray_dark,
    margin: 2,
    borderRadius: 15,
  },
  deliverImage: {
    flex: 0.65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deliverTitle: {
    flex: 0.18,
    flexDirection: "row",
    justifyContent: "center",
  },
  deliverTitle1: {
    flex: 0.17,
    flexDirection: "row",
    justifyContent: "center",
  },
  checkBox: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    borderColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
