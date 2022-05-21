import {connect} from 'react-redux'
import Branch from '../Screens/Branch'
import {
        detailTotalSuccess,
        listTotalSuccess,
    } from '../Modules/user/reducer'
import MoneyDetail from '../Screens/MoneyDetail'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listTotalSuccess,
    detailTotalSuccess,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MoneyDetail)