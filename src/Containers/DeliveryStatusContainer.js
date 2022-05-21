import {connect} from 'react-redux'
import DeliveryStatus from '../Screens/DeliveryStatus'
import { report } from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    report
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeliveryStatus)