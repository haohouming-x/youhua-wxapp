> 本项目基于mpvue@1.0.13 + mpvue-loader@1.1.4 + mpvue-entry@1.5.0 + flyio@0.6.1 构建。

## 基本用法
``` bash
$ npm install
$ npm run dev
```

# 目录结构
```
|____build              webpack打包的环境代码
|____config             webpack打包的配置文件
|____node_modules       项目运行依赖的npm包
|____src                项目代码文件夹
 |__components          自定义公用组件
 |__pages               页面组件
 |__plugins             vue插件
  |__ibox
   |__index.js          vue插件的注册，包含接口请求及工具utils
   |__utils             工具类及共用方法
 |__router              小程序的page.json的配置
  |__flyio
   |__apiUrl            接口请求地址管理
   |__config            接口请求配置管理
   |__interceptors.js   接口请求拦截器
   |__request           接口请求封装（包括loading及toast，接口的定制化配置及默认配置)
  |__modules            store的管理文件
  |__index.js           实现store对modules文件下的自动注册
 |__store               vuex状态管理
 |__App.vue             小程序的App页面
 |__main.js             小程序插件配置
 |__app.json            小程序app.json的配置
|____static             静态资源文件夹
|____.babelrc           es6语法转换配置文件
|____.editorconfig      编辑器配置
|____.eslintignore      eslint的忽略配置
|____.eslintrc.js       eslint配置
|____.gitignore         git push忽略配置
|____.postcssrc.js      postcss插件的配置文件
|____index.html         SPA的index页面
|____package.json       npm包配置文件
|____README.md          readme文档

```

## 自动注册store的modules
>vuex store放在在src下store/modules文件夹。
``` js
  |__src
    |__store
      |__modlues
        |__counter.js
        |__demo.js
      |__index.js
```

> 在页面中使用store如下

在单独的页面store.js中增加了namespaced:true。需要根据文件名来区分state及commit，这样子不同的store中的方法重名也不需要担心出错了。具体使用可以加actions，使用vuex的mapState、mapActions辅助函数方便使用。

``` js
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    // 使用vuex的mapState注入状态
    ...mapState({
      // 根据modules文件夹下的store文件名为这里使用的store键名
      count: state => state.counter.count
    })
  },
  methods: {
   // 使用vuex的mapActions注入状态操作方法（第一个参数写的字符串为store文件名，同上）
   ...mapActions('counter', [
      'increment',
      'decrement'
    ])
  }
}
```

## 页面注册
> 使用了`mpvue-entry`注册页面(详细文档看[mpvue-entry](https://github.com/F-loat/mpvue-entry))

src/router/modules/router.js
```js
[
  {
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: '首页'
    }
  },
  {
    path: '/pages/counter/index',
    config: {
      navigationBarTitleText: 'vuex例子'
    }
  },
  {
    path: '/pages/logs/index',
    config: {
      navigationBarTitleText: '日志'
    }
  }
]
```
path对应相对路径，navigationBarTitleText为标题

## 路由跳转
> 使用了`mpvue-router-patch`按vue方式跳转路由(详细文档看[mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch))

跳转到某页面，但保留回退（不关闭当前页）
```js
this.$router.push('/pages/index/index')
// 带参
this.$router.push({path: '/pages/index/index', query: {id: 1}})
// ...其他看文档
```

跳转到某页面，但不保留回退（关闭当前页）
```js
this.$router.replace('/pages/index/index')
// 带参
this.$router.replace({path: '/pages/index/index', query: {id: 1}})
// ...其他看文档
```

返回页面
```js
// 上一页
this.$router.back()
// 上n页(默认1)
this.$router.go(n)
```

## 辅助插件(自动注入)
> src下plugins文件夹为自定义插件
现有ibox插件(plugins/ibox)

* 该插件提供了验证插件(ibox/utils/validator.js)

```js
const foo = 'bar'
// 是否为空
this.$iBox.validator.isEmpty(foo)
```

* 该插件提供了请求插件(store/flyio/request.js)

flyio/apiUrl目录下放按模块建文件，文件内容为模块请求路径的枚举。
flyio/config.js为发起请求时的默认配置。

```js
// 请求
this.$iBox.http(API, data)({method: 'get'})

// 请求关闭默认加载提示
this.$iBox.http(API, data)({method: 'get'}, {isLoading: false})

// 请求错误关闭默认提示
this.$iBox.http(API, data)({method: 'get'}, {isErrorDefaultTip: false})

// 请求错误使用自定义处理
this.$iBox.http(API, data)({method: 'get'}, {errorAction: false})
  .catch(err => {
    // ... 处理错误
  })

```

可根据需要在interceptors.js编写请求发送和响应的拦截操作
```js
request.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers["X-Tag"]="flyio";

  return request
})
request.interceptors.response.use(
  (response, promise) => {
    // 只将请求结果的data字段返回
    return promise.resolve(response.data)
  },
  (err, promise) => { // 发生网络错误后会走到这里
    // 直接返回错误
    return promise.reject(err)
  }
)
```

* 可自行在ibox/utils建文件，该文件名称为iBox下的插件名
```js
// plugins/ibox/utils/foo.js
export default {
  bar() {
    console.log('baz')
  }
}

// xxx.vue
export default {
  created() {
    this.iBox.foo.bar();
  }
}
```

* 也可以仿照iBox新增其他插件。(foo插件：plugins/foo/index.js)

## 坑

1.[vue文件中不能缺少script标签](https://github.com/Meituan-Dianping/mpvue/issues/562)，否则会导致编译不了。
注：在新版本的mpvue-loader已经不会出现这个问题。

2.每个页面都要适配iphoneX，padding-bottom: 34px。可参考其他页面实现方式。注：底部无操作的话就不用将页面顶上去。

3.slot插槽数据渲染有问题 https://github.com/Meituan-Dianping/mpvue/issues/427

4.页面需要初始化data方式 Object.assign(this.$data, this.$options.data())，这个已在main.js中的全局混合中加入。如不需要则可以去除。

5.小程序所有的点击事件尽量加上nf-get-form-id组件，该组件会遇到插槽数据渲染问题，具体参照“踩坑攻略”第3条

6.需要使用'cover-view'标签在视频播放时保持显示，最外层一定要使用fixed定位

7.使用'cover-view'标签内嵌入'button'按钮, 'button'内一定要再嵌入一个'cover-view'或者'cover-image'
