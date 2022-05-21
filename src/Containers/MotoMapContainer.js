import {connect} from 'react-redux'
import MotoMap from '../Screens/MotoMap'
import {function1} from '../..'
import { sendRequireBooking} from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    sendRequireBooking
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MotoMap)