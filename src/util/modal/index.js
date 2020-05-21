import { createSingle, createToast } from './factory'
import IndicatorComp from './components/indicator'
import ToastComp from './components/toast'

module.exports = {
    // 全屏loading方法， 创建单例是为了性能优化
    // 使用 Modal.indicator.open() Modal.indicator.close()
    indicator: createSingle(IndicatorComp),
    toast: createToast(ToastComp),
}
