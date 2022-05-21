import {connect} from 'react-redux'
import DetailDriver from '../Screens/DetailDriver'
import {
        listCalledDriver,
        detailCalledDriver,
        siteInformation
} from '../Modules/user/reducer'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listCalledDriver,
    detailCalledDriver,
    siteInformation
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailDriver)