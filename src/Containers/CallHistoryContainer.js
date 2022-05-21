import {connect} from 'react-redux'
import Money from '../Screens/Money'
import CallHistory from '../Screens/CallHistory'
import {listCalledDriver} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listCalledDriver
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CallHistory)