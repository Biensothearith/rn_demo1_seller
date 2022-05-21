import {connect} from 'react-redux'
import carMap from '../Screens/carMap'
import {sendRequireBooking } from "../Modules/user/reducer";
const mapStateToProps = state =>({
        ...state
})
const mapDispatchToProps ={
    sendRequireBooking,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(carMap)