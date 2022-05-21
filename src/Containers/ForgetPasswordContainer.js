import {connect} from 'react-redux'
import forgetPass from '../Screens/ScreenForgetPassword'
import { userGetSMS } from "../Modules/user/reducer";
import { forgetPassword} from "../Modules/user/reducer";
import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    userGetSMS,
    forgetPassword
    
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(forgetPass)
