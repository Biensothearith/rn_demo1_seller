import {connect} from 'react-redux'
import unSuccess from '../Screens/unSuccess'
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
)(unSuccess)