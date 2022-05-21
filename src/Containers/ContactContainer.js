import {connect} from 'react-redux'
import Contact from '../Screens/Contact'
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
)(Contact)