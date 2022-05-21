import I18n from "../Service/Translate";

export function totalDetailPrice(fee, product, rate){
    if(rate){
        var feeEn = fee / rate
        var total = feeEn + product
        return '$'+total.toFixed(2)
    }else{
        return I18n.t('noRate')
    }
}
