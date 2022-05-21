import {connect} from 'react-redux'
import ChangeUserName from '../Screens/ChangeUserName'
import {function1} from '../..'
import CallHistory from '../Screens/CallHistory'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    function1
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangeUserName)