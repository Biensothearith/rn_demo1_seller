import {connect} from 'react-redux'
import VerifyCodeChangePhone from '../Screens/VerifyCodeChangePhone'
import { updatePhone, userLogout } from "../Modules/user/reducer";
const mapStateToProps= state =>({
    ...state    
})
const mapDispatchToProps = {
    updatePhone,
    userLogout,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyCodeChangePhone)