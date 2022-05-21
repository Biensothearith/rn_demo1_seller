import {connect} from 'react-redux'
import Register from '../Screens/ScreenRegister'
import { userRegister, userGetSMS } from "../Modules/user/reducer";
import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    userRegister,
    userGetSMS,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register)
