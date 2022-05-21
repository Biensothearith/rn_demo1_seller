import {connect} from 'react-redux'
import {function1} from '../..'
import Language from '../Screens/Language'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    function1
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Language)