import InfiniteScroll from 'mint-ui/lib/infinite-scroll'
import autosize from 'autosize'

import ImgTag from './img-tag'
import Header from './header'
import Loading from './loading'
import Scroll from './scroll'
import GoTop from './go-top'
import NoData from './no-data'
import Tabbar from './tabbar'
import Switch from './switch'
import Field from './filed'
import Checkbox from './checkbox'
import Button from './button'
import Item from './item'
import Test from './test' // 打桩用的

export default function install (Vue) {
  Vue.directive('autosize', {
    bind (el) {
      autosize(el);
    }
  })
  Vue.use(InfiniteScroll);
  [ImgTag, Header, Loading, Scroll, GoTop, NoData, Tabbar, Switch, Field, Checkbox, Button, Item, Test].forEach(item => {
    Vue.component(item.name, item)
  })
}
