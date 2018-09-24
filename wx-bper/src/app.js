import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

class App extends Component {

  config = {
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "数据聚合广场",
        // iconPath:'./images/tabBar-data.png'
      }, {
        pagePath: "pages/my/index",
        text: "开发者中心"
      }]
    },
    pages: [
      'pages/index/index',
      'pages/my/index',
      'pages/detail/index',
      'pages/team/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

// appid:wxa526f2530982ec63
// appsecret:9bb361b76c7f4c3601564d6d2ca5006c
