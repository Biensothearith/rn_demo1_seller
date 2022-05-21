import {connect} from 'react-redux'
import CreatePass from '../Screens/CreatePass'
import {
        validatePassword,
        changePassword,
} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    validatePassword,
    changePassword
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreatePass)