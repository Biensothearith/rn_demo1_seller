import {connect} from 'react-redux'
import Branch from '../Screens/Branch'
import { getBranch} from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    getBranch
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Branch)