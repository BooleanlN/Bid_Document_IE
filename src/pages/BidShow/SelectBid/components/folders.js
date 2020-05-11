import {Component} from 'react'
import {Row, Col, Divider} from 'antd'
import folder_close from '@/assets/imgs/folder-close.png'
import folder_open from '@/assets/imgs/folder-open.png'
import styles from './styles.css'
import router from 'umi/router';
// const hovered = {
//   color:'#ffffff',
//   background:'rgb(179, 216, 255)',
//   borderRadius:'8px'
// }
// const nothover = {
//  color:'#606266'
// }
class Folders extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }
  handleMouseOver(){
    
  }
  render(){
    let list = folders => {
      let res = []
      // console.log(folders)
      for(let i=0;i<folders.length;i++){
        res.push(<Col className="gutter-row" span={4} key={folders[i].name}>
          <FolderItem folder={folders[i]}/>
        </Col>)
      }
      return res
    }
    return (
    <>
    <Row gutter={16}>
      {list(this.props.folders)}
    </Row>
    </>
    )
  }
}
class FolderItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      hover:false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleMouseOver(){
    this.setState({
      hover:this.state.hover?false:true
    })
  }
  handleClick(){
    router.push(`/bid/list/${this.props.folder.id}`)
  }
  render(){
    return (
      <div style={{width:'180px',height:'150px',textAlign:'center'}} 
      onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOver} className={this.state.hover?styles.hovered:styles.nothovered}
      onClick={this.handleClick}
      >
        <img src={this.state.hover?folder_open:folder_close}/>
        <p style={{}}>{this.props.folder.name}</p>
      </div>
    )
  }
}
export default Folders
// export default () => {
//   return <h1>Analysis Page</h1>
// }