import {connect} from 'react-redux'
import resultPackage from '../Screens/resultPackage'
import {report} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    report
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(resultPackage)