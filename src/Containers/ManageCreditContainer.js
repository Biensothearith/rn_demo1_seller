import {connect} from 'react-redux'
import Branch from '../Screens/Branch'
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