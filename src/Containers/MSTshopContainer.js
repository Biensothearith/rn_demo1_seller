import {connect} from 'react-redux'
import MSTshop from '../Screens/MSTshop'
import { userLogout,updateProfile } from "../Modules/user/reducer";
import { setLocale } from "../Modules/app/reducer";
import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    userLogout,
    setLocale,
    updateProfile
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MSTshop)