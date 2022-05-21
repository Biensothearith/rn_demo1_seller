import {connect} from 'react-redux'
import Delay from '../Screens/Delay'
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
)(Delay)