import {Component} from 'react'
import {Input,Row, Col, Divider} from 'antd'
import folder_close from '@/assets/imgs/folder-close.png'
const style = { padding: '8px 0' };
const {Search} = Input
import Folders from './components/folders'
class Bidings extends Component{
  constructor(props){
    super(props)
    this.state = {
      folders:[
        {name:'采煤机',id:1},
        {name:'锅炉',id:2},
        {name:'旋转器',id:3}
      ]
    }
  }
  componentDidMount(){

  }
  render(){
    return (
    <>
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div style={style}>
          <Search  placeholder="查找标的物"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}></Search>
        </div>
      </Col>
    </Row>
    <Row gutter={16}>
      <Folders folders={this.state.folders} name="fuck"></Folders>
    </Row>
    </>
    )
  }
}
export default Bidings
// export default () => {
//   return <h1>Analysis Page</h1>
// }