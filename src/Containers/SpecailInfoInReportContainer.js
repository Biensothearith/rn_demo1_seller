import {connect} from 'react-redux'
import SpecailInfoDelivery from '../Screens/SpecailInfoDelivery'
import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SpecailInfoDelivery)