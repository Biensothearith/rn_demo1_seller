import {connect} from 'react-redux'
import resultSuccess from '../Screens/resultSuccess'
import {report} from "../Modules/user/reducer"
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    report
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(resultSuccess)