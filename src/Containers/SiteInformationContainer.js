import {connect} from 'react-redux'
import SiteInformation from '../Screens/SiteInformation'
import {siteInformation} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    siteInformation
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SiteInformation)