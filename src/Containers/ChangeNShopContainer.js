import {connect} from 'react-redux'
import ChangeNShop from '../Screens/ChangeNShop'
import {updateInformation} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    updateInformation
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangeNShop)