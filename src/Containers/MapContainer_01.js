import {connect} from 'react-redux'
import Map from '../Screens/Map'
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
)(Map)