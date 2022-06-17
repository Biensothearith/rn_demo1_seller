import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import moment from "moment";
import I18n from "../Service/Translate";
import Loading from "../Components/Loading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationService from "../Service/navigationService";
import { colors, images } from "../Assets";
export default class Notification extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      page: 1,
      loading: true,
      end: false,
      getNotification: [],
      refreshing: false,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    const { getNotification, page } = this.state;
    if (
      nextProps.user.getNotificationError &&
      nextProps.user.getNotificationError !== user.getNotificationError
    ) {
      Alert.alert(I18n.t("alertWentWrong"));
    }
    if (
      nextProps.user.getNotification &&
      nextProps.user.getNotification !== user.getNotification
    ) {
      if (nextProps.user.getNotification.length > 0) {
        this.setState({
          getNotification: [
            ...getNotification,
            ...nextProps.user.getNotification,
          ],
          loading: false,
          page: page + 1,
          refreshing: false,
        });
      } else {
        this.setState({
          end: true,
          loading: false,
          refreshing: false,
        });
      }
    }
  }
  async handleRefresh() {
    const { page } = this.state;
    await this.setState({
      getNotification: [],
      refreshing: true,
      page: 1,
      end: false,
    });
    this.props.getNotification(1);
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      this.props.seenNotification();
    });
    this.handlegetNotification();
  }
  handlegetNotification() {
    const { page } = this.state;
    this.props.getNotification(page);
  }
  rendergetNotification() {
    const { getNotification } = this.state;
    var results = [];
    for (let index = 0; index < getNotification.length; index++) {
      const element = getNotification[index];
      results.push(
        <TouchableOpacity
          style={[
            styles.branch,
            element.seen == 0 && { backgroundColor: "#efefef" },
          ]}
        >
          <View style={styles.ListTitleBox}>
            <AntDesign
              style={[
                styles.iconColor,
                element.seen == 0 && { color: "#ff6b6b" },
              ]}
              name="checkcircle"
            ></AntDesign>
            <Text style={styles.ListTitle}>
              {element.title}
              {"\n"}
              <Text
                style={{
                  color: "grey",
                  fontSize: 14,
                  marginLeft: 20,
                  lineHeight: 19,
                }}
              >
                {element.showMessage}
              </Text>
            </Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.Date}>
              {element.dateTime &&
                moment(element.dateTime).format("DD-MMMM-YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    console.log("results", results);
    return results;
  }
  render() {
    const { user } = this.props;
    const { loading, end, refreshing, getNotification } = this.state;
    return (
      <>
        {user.pending && <Loading />}
        <SafeAreaView style={{ flex: Platform.OS == "ios" ? 1 : 1 }}>
          <View style={styles.container}>
            <View style={styles.inner}>
              <View style={styles.btnBack}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.goBack();
                  }}
                >
                  <MaterialIcons
                    style={{ color: "white", marginRight: "20%", fontSize: 33 }}
                    name="keyboard-arrow-left"
                  ></MaterialIcons>
                </TouchableOpacity>
              </View>
              <View style={styles.benner}>
                <Text
                  style={{
                    fontSize: 22,
                    color: "white",
                    fontFamily: "Battambang-Bold",
                  }}
                >
                  {I18n.t("notification")}
                </Text>
              </View>
              <View style={styles.btnBack}></View>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => this.handleRefresh()}
                />
              }
              onMomentumScrollEnd={e => {
                const scrollPosition = e.nativeEvent.contentOffset.y;
                const scrollViewHeigth = e.nativeEvent.layoutMeasurement.height;
                const contentHeigth = e.nativeEvent.contentSize.height;
                const isScrollToBottom = scrollPosition + scrollViewHeigth;
                if (
                  isScrollToBottom >= contentHeigth - 150 &&
                  user.getNotification.length <= getNotification.length &&
                  !end
                ) {
                  this.handlegetNotification();
                }
              }}
            >
              <SafeAreaView style={styles.innerBox}>
                {this.rendergetNotification()}
                {loading && (
                  <ActivityIndicator
                    style={{ marginTop: 10 }}
                    size="small"
                    color={"gray"}
                  />
                )}
                {end && getNotification.length > 0 && (
                  <Text style={styles.end}>{I18n.t("noMore")}</Text>
                )}
              </SafeAreaView>
              {end && getNotification.length == 0 && (
                <>
                  <View style={styles.endMore}>
                    <Image
                      style={styles.noMoreImage}
                      source={require("../Assets/images/EmptyIcon.png")}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      padding: 0,
                      textAlign: "center",
                      top: -25,
                    }}
                  >
                    {I18n.t("noData")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Battambang-Bold",
                      color: "black",
                      padding: 0,
                      textAlign: "center",
                      top: -20,
                    }}
                  >
                    {I18n.t("YouHaveNoData")}
                  </Text>
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  inner: {
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.main_color,
  },
  innerBox: {
    flex: 1,
  },
  end: {
    color: "#c7c7c7",
    fontSize: 12,
    textAlign: "center",
    padding: 10,
  },
  benner: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  branch: {
    paddingVertical: 2,
    flexDirection: "row",
    borderBottomColor: "#E1E5EA",
    borderBottomWidth: 0.8,
    position: "relative",
    marginVertical:5
  },
  iconColor: {
    color: "#54E346",
    fontSize: 30,
    flex: 0.15,
    textAlign: "center",
  },
  ListTitleBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dateBox: {
    position: "absolute",
    right: 10,
    top: 6,
  },
  ListTitle: {
    flex: 0.9,
    color:colors.gray_dark,
    fontSize: 14,
  },
  back: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fb3640",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  Title: {
    fontSize: 18,
    color: "#02475e",
  },
  Date: {
    color: "grey",
    fontSize: 10,
    marginLeft: 20,
  },
  endMore: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  noMoreImage: {
    width: 200,
    height: 200,
  },
});
