import {connect} from 'react-redux'
import ChangePhone from '../Screens/ChangePhone'
import {
    // updateInformation,
    validatePassword,
    updatePhone,
    userGetSMS,
} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    validatePassword,
    // updateInformation,
    updatePhone,
    userGetSMS,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangePhone)