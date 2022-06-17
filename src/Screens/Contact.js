import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
} from "react-native";
import Loading from "../Components/Loading";
import I18n from "../Service/Translate";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import { colors, images } from "../Assets/index";
import { SafeAreaView } from "react-navigation";
export default class Contact extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataBranch: [],
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (
      nextProps.user.dataBranch &&
      nextProps.user.dataBranch !== user.dataBranch
    ) {
      if (nextProps.user.dataBranch.length > 0) {
        this.setState({
          dataBranch: nextProps.user.dataBranch,
        });
      }
    }
  }
  componentDidMount() {
    this.props.getBranch();
  }
  renderBranch() {
    const { dataBranch } = this.state;
    var results = [];
    for (let index = 0; index < dataBranch.length; index++) {
      const element = dataBranch[index];
      results.push(
        <TouchableOpacity
          style={styles.branch}
          key={index}
          onPress={() => {
            element && element.phone
              ? Linking.openURL("tel:" + element.phone)
              : Alert.alert("Sorry! Don't have contact.");
          }}
        >
          <View>
            <Image source={images.branch} style={{ width: 20, height: 20 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ListTitle}>{element.name}</Text>
          </View>
          <View>
            <MaterialIcons
              size={20}
              color={colors.gray_dark}
              name="phone"
            ></MaterialIcons>
          </View>
        </TouchableOpacity>
      );
    }
    return results;
  }
  //phone_call
  handleCallHeadOffice() {
    const { dataBranch } = this.state;
    if (dataBranch.length > 0) {
      var phone = dataBranch[0].phone;
      if (phone) {
        Linking.openURL("tel:" + phone);
      } else {
        Alert.alert("Sorry! Don't have contact.");
      }
    }
  }
  handleMessagerHeadOffice() {
    const { dataBranch } = this.state;
    console.log(dataBranch, "----");
    if (dataBranch.length > 0) {
      var messenger = dataBranch[0].messengerLink;
      if (messenger) {
        Linking.openURL(messenger);
      } else {
        Alert.alert("Sorry! Don't have contact.");
      }
    }
  }
  render() {
    const { user } = this.props;
    return (
      <>
        {user.pending && <Loading />}

        <View style={styles.container}>
          <SafeAreaView
            style={{
              flex: Platform.OS == "ios" ? 0.34 : 0.34,
              backgroundColor: Platform.OS == "ios" ? colors.main_color : "",
            }}
          >
            <View style={styles.headerTitle}>
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontFamily: "Battambang-Bold",
                }}
              >
                {I18n.t("ContactCompany")}
              </Text>
            </View>
            <View style={styles.ContactBox}>
              <View style={styles.PhoneBox}>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => this.handleCallHeadOffice()}
                >
                  <MaterialIcons
                    style={styles.call}
                    name="phone-in-talk"
                  ></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactTitle}
                  onPress={() => this.handleCallHeadOffice()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 12,
                      fontFamily: "Battambang-Bold",
                    }}
                  >
                    {I18n.t("callContact")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.MessageBox}>
                <TouchableOpacity
                  style={styles.iconBox1}
                  onPress={() => this.handleMessagerHeadOffice()}
                >
                  <Fontisto style={styles.messeger} name="messenger">
                    {" "}
                  </Fontisto>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactTitle1}
                  onPress={() => this.handleMessagerHeadOffice()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 12,
                      fontFamily: "Battambang-Bold",
                    }}
                  >
                    {I18n.t("MessageContact")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
          <View style={{ flex: Platform.OS == "ios" ? 0.66 : 0.66 }}>
            <ScrollView style={{ flex: 1 }}>{this.renderBranch()}</ScrollView>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    flex: Platform.OS == "ios" ? 0.4 : 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_color,
  },
  ContactBox: {
    flex: Platform.OS == "ios" ? 0.65 : 0.65,
    flexDirection: "row",
    backgroundColor: colors.main_color,
    justifyContent: "center",
    alignItems: "center",
  },
  PhoneBox: {
    flex: 0.5,
    resizeMode: "contain",
    alignItems: "center",
  },
  contactTitle: {
    width: "60%",
    height: "20%",
    marginLeft: 55,
    resizeMode: "contain",
    justifyContent: "center",
    textAlign: "center",
  },
  contactTitle1: {
    width: "60%",
    height: "20%",
    marginRight: 55,
    resizeMode: "contain",
    justifyContent: "center",
    textAlign: "center",
  },
  MessageBox: {
    flex: 0.5,
    resizeMode: "contain",
    alignItems: "center",
  },
  iconBox: {
    width: "60%",
    height: "74%",
    resizeMode: "contain",
    backgroundColor: "white",
    marginLeft: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox1: {
    width: "60%",
    height: "74%",
    resizeMode: "contain",
    backgroundColor: "white",
    marginRight: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  call: {
    fontSize: 65,
    color: colors.gray_dark,
    alignSelf: "center",
  },
  messeger: {
    marginLeft: 25,
    fontSize: 57,
    color: colors.gray_dark,
  },
  branch: {
    flex: 0.66,
    flexDirection: "row",
    borderBottomColor: colors.gray_ligth,
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  ListTitle: {
    color: colors.gray_dark,
    fontSize: 14,
    marginLeft: 20,
    fontFamily: "Battambang-Bold",
  },
});
