import {connect} from 'react-redux'
import SpecailInfo from '../Screens/SpecailInfo'
import { report } from "../Modules/user/reducer";

import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    report,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SpecailInfo)