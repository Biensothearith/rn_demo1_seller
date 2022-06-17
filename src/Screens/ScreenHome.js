import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Oneoption from "../Components/Oneoption";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slideshow from "react-native-slideshow";
import Loading from "../Components/Loading";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import { SLIDE_URL } from "../Modules/app/config";
import I18n from "../Service/Translate";
import AsyncStorage from "@react-native-community/async-storage";
import { colors, images } from "../Assets";

export var OPTION = [
  {
    id: 1,
    title: "moto",
    image: images.moto,
    detail: "forSmallShipments",
    onpress: "MOTOMAP",
  },
  {
    id: 2,
    title: "romork",
    image: images.tuktuk,
    detail: "forMediumFreight",
    onpress: "MAP01",
  },
  {
    id: 3,
    title: "truck",
    image: images.van,
    detail: "forBulkCargo",
    onpress: "CARMAP",
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [],
      lang: "en",
      countNotitification: 0,
      userStorage: null,
    };
  }
  renderOption(data) {
    var rs = [];
    if (data && data.length > 0) {
      console.log(data);
      data.map((one, i) => {
        rs.push(<Oneoption data={one} index={i} />);
      });
    }
    return rs;
  }
  getUserStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataLogin");
      if (value !== null) {
        if (value) {
          this.setState({
            userStorage: JSON.parse(value).data,
          });
        }
      } else {
        return;
      }
    } catch (error) {}
  };
  componentDidMount() {
    this.getUserStorage();
  }
  render() {
    const { countNotitification, userStorage } = this.state;
    const { user } = this.props;

    return (
      <Fragment>
        <SafeAreaView style={styles.main_safeAreaview}>
          <View style={styles.handerRow}>
            <View style={styles.handerRow_left}>
              <Text style={styles.text_hello}>
                {I18n.t("word_hi")} {userStorage && userStorage.name}
              </Text>
            </View>
            <View style={styles.handerRow_right}>
              <Image style={styles.centerLogo} source={images.logo} />
            </View>
          </View>
          <View style={styles.view_search}>
            <TouchableOpacity
              style={styles.touchsearch}
              onPress={() => NavigationService.navigate(NAV_TYPES.FLOW)}
            >
              <View style={styles.view_search_right}>
                <Image
                  source={images.search}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={styles.view_search_text}>
                <Text style={styles.text_search}>{I18n.t("checkLuggage")}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, flexDirection: "column" }}>
            {this.renderOption(OPTION)}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  //main
  main_safeAreaview: {
    flex: 1,
    flexDirection: "column",
  },
  //top
  handerRow: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  handerRow_left: {
    flexDirection: "column",
    justifyContent: "center",
  },
  handerRow_right: {
    flexDirection: "column",
    justifyContent: "center",
  },
  centerLogo: {
    width: 40,
    height: 40,
  },
  text_hello: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.main_color,
  },

  //search
  view_search: {
    height: 52,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  touchsearch: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: colors.main_color,
    backgroundColor: colors.white,
  },
  view_search_right: {
    justifyContent: "center",
    backgroundColor: colors.main_color,
    borderRadius: 9,
    width: 51,
    height: 51,
    alignItems: "center",
  },
  view_search_text: {
    flex: 1,
    justifyContent: "center",
  },
  text_search: {
    paddingLeft: 10,
    fontSize: 16,
    color: colors.main_color,
  },
});
