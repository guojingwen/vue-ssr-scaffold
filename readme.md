#  vue-ssr 脚手架
- 这是一个经典的基于vuex的tabbar瀑布流实现。（你只需通过简单的配置即可完成一个tabbar瀑布流页面）
- 也是一个ssr项目回退数据缓存的经典实现。
- 这里有一些及其轻量级的原子组件的实现。

[在线演示](http://ssr.warmplace.cn/)

## 核型功能
- [x] 页面切换动画
- [x] 页面记忆，后退取缓存数据，
- [x] 后退返回到页面指定高度
- [x] 瀑布流tabbar切换的经典实现
- [x] route.meta配置登录拦截
- [x] 页面seo配置化

## 元素组件
- [x] button
- [x] checkbox
- [x] switch
- [x] field
- [x] item
- [x] tabbar
- [x] header

## 其他功能
- [x] 重复点击链接问题（仅ssr存在这样的问题）
- [x] router配置话 (meta的作用)（a. 权限拦截，b.再次进入当前页面缓存store清除，c.页面切换效果自定义等等）
- [x] ajax封装 （a.拦截器接口统一管理，报错统一处理，b.状态切换 loading切换（菊花loading）, c. 防止表单重复提交，按钮重复点击）
- [x] 公共样式 （0.5px边框函数）

## demo功能演示

1. 瀑布流效果
    - 跳转到"瀑布流"页面，上拉查看翻页效果
    - 跳转到A页面，上拉及点击tabbar查看翻页效果
    - ![img](https://guojingwen.github.io/vue-ssr-scaffold/docs_img/tab_flow.gif)
     
1. 返回上一页高度及页面切换动画
   - A页面--->滚动一定高度--->跳转B页面--->滚动一定高度--->跳转到C页面--->返回到B页面--->返回到页面
   - ![img](https://guojingwen.github.io/vue-ssr-scaffold/docs_img/backtotop.gif)

1. 测试goTop组件
    - 当滚动到超过手机屏幕2.5屏高度且往上滚动时显示，测试流程同上

1. 关于后退从缓存里取数据的实现
    > 将数据缓存在在vuex的store里面，只是前进的时候是清空当前页面的state再重新获取数据
    - 先上车跑一下测试用例（A、B页面是动态路由，C与A、B是不同路由，但共用同一个组件）
        1. A--->B--->浏览器刷新页面--->后退到A (刷新浏览器页面后退可以正常加载数据)
        1. A--->C--->B--->C--->A  (动态路由，共用组件路由，数据缓存都正常，遇到登录页面无影响)
        1. 说明: 原理实现详见entry-client.js
    - 你可能会有一些疑问
        - Q: 前进后退如何判定？
        - A: 页面跳转的时候通过history.replaceState给当前页面打一个标记ts，然后在跳转，返回的时候，触发页面的声明周期，在生命周期里通过url表示知道是后退过了的，再次通过history.replaceState移除ts标记,这样不管你是点击导航栏返回还是浏览器返回再或者android物理键返回都可以识别处理
        
        - Q: 动态路由，共用组件路由跳来跳去，数据缓存是如何实现的？
        - A:  前面说了url有个ts标志，ts就是跳转离开当前页面时间的毫秒值，将页面数据存在store里面，通过key值就是tsq取到，这样数据就不会乱掉了
        
        - Q: 如果某些数据后退的时候也要更新咋办？
        - A: 新需要缓存的数据都是存在vuex的modules里面通过key值(路由meta.store)取到的，把不需要缓存的数据存储在vuex state里面即可
    - ![img](https://guojingwen.github.io/vue-ssr-scaffold/docs_img/login.gif)

## 使用
- `npm run dev`
- `npm run lint` 检查代码规范
- `npm run lint:fix` 代码格式化自动修复。
- `npm run build`  打包
- `npm run start` 本地运行生产环境

## 补充ssr核心知识
### ssr 主要是为了解决搜索引擎爬虫的问题。
    传统SPA返回的html body是空dom和一个script引入，爬虫不会等待ajax响应完成填充dom，想要让seo知道你的东西就需要吐出完整的html，这就是ssr的用途
- vue服务端渲染与单页应用(SPA)仅仅是首屏不一样，即之后页面跳转、store、ajax走的都是客户端，与SPA几乎一模一样。
- 就算仅仅是首屏渲染，服务端也需有一套与客户端一样的机制处理模版渲染、路由、store、ajax，其原理在官方项目源码中都有体现。
- 用户访问网址 服务端进行首屏渲染、完成之后将html发送到客户端。注意html包含首屏的ajax数据，客户端脚本即不再执行ajax请求（下面的asyncData方法）
- 业务层（每个页面）要做的事情是比SPA多一个逻辑即判断是否是服务端渲染，官方项目提供了一种机制是数据请求在asyncData生命周期里。下面重点说asyncData。
- 服务端渲染使用的是node，因此有一些常识要知道，服务端不能用window,document,location, 其全局对象是global; data、 beforeCreate、created会在服务端执行, beforeMount、mounted只在客户端执行。

###  ssr的两个重点工作
- asyncData的实现。asyncData并不是vue实际的生命周期之一，而是官方项目提供的一种优雅解决服务端渲染问题的方案，会在所有vue生命周期之前调用且在异步（ajax）执行完成后再执行vue的其他生命周期函数，其原理详见entry-client.js, entry-server.js。
- 服务端单例问题的影响。 试想一下，SPA应用js运行在客户端。js运行产生的数据在不同用户的手机上互不影响，而ssr 用户访问同一个网址首屏渲染执行的是服务器上同一个对象方法这时候产生的数据就会相互影响了。

### 其他
1. 调试   在控制台使用 $app
1. 框架的搭建是参考[官方项目](https://github.com/vuejs/vue-hackernews-2.0/),  技术架构vue2.0, vuex, vue-router, axios

