import { Row, Col } from 'antd';
class Space extends React.Component{
  render(){
    return (
      <Row style={{display:'flex',flexDirection:'row',width:'30%'}}>
        {this.props.children.map(child => (
        <Col span={24/this.props.children.length}>
        {child}
        </Col>
      ))}
      </Row>
    )
  }
}
export default Space