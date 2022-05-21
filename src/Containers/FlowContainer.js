import {connect} from 'react-redux'
import Flow from '../Screens/Flow'
import {function1} from '../..'
import {searchPackage } from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    searchPackage,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Flow)