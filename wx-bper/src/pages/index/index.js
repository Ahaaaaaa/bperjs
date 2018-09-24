import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { AtTag } from 'taro-ui'
import Header from '../../components/header'
import echarts from '../../components/ec-canvas/echarts';

import './index.less'

function initLineChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    grid: {
      top: 10,
      bottom: 24
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}

function initBarChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      top: 10,
      bottom: 24,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['服务联盟', '活动', '服务广场', '企业人才', '物业缴费', '停车充值']
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

export default class TagPage extends Taro.Component {
  config = {
    navigationBarTitleText: '数据聚合广场',
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      line: {
        onInit: initLineChart
      },
      bar: {
        onInit: initBarChart
      }
    }
  }

  onClick(data) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${data.name}`,
    })
  }

  render() {
    return (
      <View className='index'>
        <Header title='应用中心' />
        <View>
          <AtTag name='10001' onClick={this.onClick.bind(this)} type='primary' active circle>服务联盟</AtTag>
        </View>
        {/* <AtButton>按钮文案</AtButton> */}
        <Header title='今日趋势' />
        <View class='echarts'>
          <ec-canvas canvas-id='mychart-area' ec={this.state.line}></ec-canvas>
        </View>
        <Header title='今日热度排名' />
        <View class='echarts'>
          <ec-canvas canvas-id='mychart-area' ec={this.state.bar}></ec-canvas>
        </View>
        <Header title='首屏加载速度排名' />
        <View class='echarts'>
          <ec-canvas canvas-id='mychart-area' ec={this.state.bar}></ec-canvas>
        </View>
      </View >
    )
  }
}
