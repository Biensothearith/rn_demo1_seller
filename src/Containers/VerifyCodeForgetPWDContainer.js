import {connect} from 'react-redux'
import VerifyCodeForgetPWD from '../Screens/VerifyCodeForgetPWD'
import { forgetPassword } from "../Modules/user/reducer";
const mapStateToProps= state =>({
    ...state    
})
const mapDispatchToProps = {
    forgetPassword,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyCodeForgetPWD)