import {connect} from 'react-redux'
import RequestBooking from '../Screens/RequestBooking'
import { listRequestBooking, cancelBooking} from "../Modules/user/reducer";
const mapStateToProps= state =>({
    ...state
})
const mapDispatchToProps = {
    listRequestBooking,
    cancelBooking
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestBooking)