import {connect} from 'react-redux'
import DetailCalledDriver from '../Screens/DetailCalledDriver'
import { detailCalledDriver} from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    detailCalledDriver
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailCalledDriver)