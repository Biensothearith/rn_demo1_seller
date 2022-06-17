import {connect} from 'react-redux'
import {updateInformation} from '../Modules/user/reducer'
import ManageCredit from '../Screens/ManageCredit'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    updateInformation
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageCredit)