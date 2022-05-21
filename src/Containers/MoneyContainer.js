import {connect} from 'react-redux'
import Money from '../Screens/Money'
import {listTotalSuccess} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listTotalSuccess
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Money)