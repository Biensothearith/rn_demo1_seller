import {connect} from 'react-redux'
import CreditDetail from '../Screens/CreditDetail'
import {
    updateInformation,
    validatePassword,
    changePassword
} from '../Modules/user/reducer'
import CallHistory from '../Screens/CallHistory'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    updateInformation,
    validatePassword,
    changePassword,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreditDetail)