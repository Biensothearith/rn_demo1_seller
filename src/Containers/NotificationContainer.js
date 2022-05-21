import {connect} from 'react-redux'
import Notification from '../Screens/Notification'
import {
    getNotification,
    seenNotification,
    getCountNotSeenNotification
} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    getNotification,
    seenNotification,
    getCountNotSeenNotification
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notification)
