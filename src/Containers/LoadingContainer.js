import {connect} from 'react-redux'
import ScreenLoading from '../Screens/ScreenLoading'
import {startupWorker, setLocale} from '../Modules/app/reducer'
const mapStateToProps = state =>({

})
const mapDispatchToProps ={
    startupWorker,
    setLocale
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenLoading)