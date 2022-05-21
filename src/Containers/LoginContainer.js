import {connect} from 'react-redux'
import ScreenLogin from '../Screens/ScreenLogin'
import { userLogin } from "../Modules/user/reducer";
import { setLocale } from "../Modules/app/reducer";
const mapStateToProps= state =>({
    ...state
})
const mapDispatchToProps = {
    userLogin,
    setLocale,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenLogin)