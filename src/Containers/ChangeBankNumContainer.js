import {connect} from 'react-redux'
import ChangeBankNum from '../Screens/ChangeBankNum'
import {function1} from '../..'
import ChangeBankContainer from './ChangeBankContainer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    function1
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangeBankNum)