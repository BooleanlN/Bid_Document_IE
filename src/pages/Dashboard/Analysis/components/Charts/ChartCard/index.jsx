import React from 'react';
import { ChartCard,yuan  } from 'ant-design-pro/lib/Charts';
import {Icon, Tooltip,Col} from 'antd'

class CardInfo extends React.Component{
  render(){
    return (
      <Col span={24} style={{ marginTop: 24 }}>
      <ChartCard
        title="移动指标"
        avatar={
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        }
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />}
      />
      </Col>
    )
  }
}
export default CardInfo