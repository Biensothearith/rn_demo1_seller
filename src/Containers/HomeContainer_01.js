import { connect } from "react-redux";
import Home from '../Screens/ScreenHome'

import {
  getSlide,
  siteInformation,
  getNotification,
  seenNotification,
  getCountNotSeenNotification,
} from "../Modules/user/reducer";
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  getSlide,
  siteInformation,
  getNotification,
  seenNotification,
  getCountNotSeenNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
