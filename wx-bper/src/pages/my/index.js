import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button, OpenData } from '@tarojs/components'
import { AtAvatar, AtToast } from 'taro-ui'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '开发者中心'
  }

  state = { isOpened: false }

  authenticate(res) {
    console.log(res)
    this.setState({ isOpened: true })
  }

  render() {
    return (
      <View className='my'>
        <View hover-class='none'>
          <View class='top' hover-class='none'>
            <Button plain open-type='getUserInfo' onGetUserInfo={this.authenticate.bind(this)} url='/pages/login/index' hover-class='none'>注册/登录</Button>
            <AtAvatar size='large' circle openData={{ type: 'userAvatarUrl' }} />
            <Image class='background' src='./my-background.png' />
          </View>
        </View>


        <AtToast
          isOpened={this.state.isOpened}
          text='登录成功'
        ></AtToast>
      </View>
    )
  }
}

