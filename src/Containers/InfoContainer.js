import {connect} from 'react-redux'
import InfoDeliver from '../Screens/InfoDeliver'
import {function1} from '../..'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InfoDeliver)