import {connect} from 'react-redux'
import VerifyCode from '../Screens/ScreenVerifySMScode'
import { userRegister, userGetSMS } from "../Modules/user/reducer";
const mapStateToProps= state =>({
    ...state    
})
const mapDispatchToProps = {
    userRegister,
    userGetSMS,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyCode)