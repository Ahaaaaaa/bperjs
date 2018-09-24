import Taro, { Component } from '@tarojs/taro'
import { View, RichText, Text } from '@tarojs/components'
import { AtSegmentedControl, AtTimeline } from 'taro-ui'
import echarts from '../../components/ec-canvas/echarts';
import Header from '../../components/header'
import './index.less'

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];

  var dateList = data.map(function (item) {
    return item[0];
  });
  var valueList = data.map(function (item) {
    return item[1];
  });

  var option = {

    // Make gradient line here
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    }],


    title: [{
      left: 'center',
      text: 'Gradient along the y axis'
    }],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [{
      data: dateList
    }],
    yAxis: [{
      splitLine: { show: false }
    }],
    grid: [{
      top: 10,
      bottom: 24
    }],
    series: [{
      type: 'line',
      showSymbol: false,
      data: valueList
    }]
  };

  chart.setOption(option);
  return chart;
}

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas'
    }
  }

  state = {
    current: 0,
    ec: { onInit: initChart }
  }

  componentWillMount() {
    Taro.showNavigationBarLoading()
    setTimeout(() => {
      Taro.hideNavigationBarLoading()
      Taro.setNavigationBarTitle({
        title: this.$router.params.id
      })
    }, 500)
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(current) {
    this.setState({ current })
  }
  render() {
    return (
      <View className='detail'>
        <AtSegmentedControl
          values={['性能分析', '错误日志', 'APP详情']}
          onClick={this.handleClick}
          current={this.state.current}
        />
        {this.state.current === 0 ?
          <View className='tab-content'>
            <Header title='白屏时间' />
            <View className='content echarts'>
              <ec-canvas canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
            </View>
            <Header title='最新一次应用载入时间' />
            <View className='content'>
              <AtTimeline
                pending
                items={[
                  { title: '重定向时间', content: ['time.redirectEnd - time.redirectStart'], icon: 'check-circle' },
                  { title: 'DNS解析时间', content: ['time.domainLookupEnd - time.domainLookupStart'], icon: 'check-circle' },
                  { title: 'TCP完成握手时间', content: ['time.connectEnd - time.connectStart'], icon: 'check-circle' },
                  { title: 'HTTP请求响应完成时间', content: ['time.responseEnd - time.requestStart'], icon: 'check-circle' },
                  { title: 'DOM开始加载前所花费时间', content: ['time.responseEnd - time.navigationStart'], icon: 'check-circle' },
                  { title: 'DOM加载完成时间 ', content: ['time.domComplete - time.domLoading'], icon: 'check-circle' },
                  { title: 'DOM结构解析完成时间', content: ['time.domInteractive - time.domLoading'], icon: 'check-circle' },
                  { title: '脚本加载时间', content: ['time.domContentLoadedEventEnd - time.domContentLoadedEventStart'], icon: 'check-circle' },
                  { title: 'ONLOAD事件时间', content: ['time.loadEventEnd - time.loadEventStart'], icon: 'check-circle' },
                  { title: '页面完全加载时间', content: ['重定向时间+DNS解析时间+TCP完成握手时间+HTTP请求响应完成时间+DOM结构解析完成时间+DOM加载完成时间'], icon: 'check-circle' },
                ]}
              >
              </AtTimeline>
            </View>

          </View> : null}
        {this.state.current === 1 ?
          <View className='content'>
            <Header title='最新日志' />
            <View>
              <Text>输入区域高度自适应，不会出现滚动条</Text>
            </View>
            <Header title='历史日志' />
            <View>
              <Text>输入区域高度自适应，不会出现滚动条</Text>
            </View>
          </View> : null}
        {this.state.current === 2 ?
        <View className='content'>
          <View className='detail'>
            <Text style={{fontSize:'16px'}}>服务联盟</Text>
            <Text style={{fontSize:'12px',color:'#CCC'}}>开发者</Text>
            <Text style={{fontSize:'12px',color:'#CCC'}}>最新更新时间</Text>
            </View>
        </View> : null}

      </View>
    )
  }
}

