import {Component} from 'react'
import {Layout,Menu,Icon,Result,Button} from 'antd'
import Link from 'umi/link'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import styles from './BasicLayout.less'
import UserInfo from './UserInfo'
import { withRouter } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb'
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu 
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
@withRouter
class BasicLayout extends Component{
  state = {
    collapsed:false
  };
  toggle = () => {
    this.setState({
      collapsed:!this.state.collapsed
    })
  }
  render(){
    const routes = this.props.location.pathname.split("/")
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin:  '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>菜单栏</span></span>}>
            <Menu.Item key="1"> <Link to="/main/dashboard/analysis">知识库总览</Link> </Menu.Item>
            <Menu.Item key="2">  <Link to="/main/dashboard/monitor">参数库云图</Link> </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="book" /><span>知识库</span></span>}>
            {/* <Menu.Item key="11"><Link to="/bid/search">知识库全文检索</Link></Menu.Item> */}
            <Menu.Item key="4"> <Link to="/main/bid/select">知识库查看</Link> </Menu.Item>
            <Menu.Item key="5"><Link to="/main/bid/update">知识库更新</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="tool" /><span>参数库</span></span>}>
            <Menu.Item key="11"> <Link to="/main/parameters">参数列表</Link> </Menu.Item>
            <Menu.Item key="13"><Link to="/main/pureparameters">参数聚合</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="monitor" /><span>编制工具</span></span>}>
            <Menu.Item key="10"> <Link to="/main/templategenerate">范本编制</Link> </Menu.Item>
            <Menu.Item key="7"> <Link to="/main/template">模版编制</Link> </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="monitor" /><span>应用APP</span></span>}>
            <Menu.Item key="12"> <Link to="/main/appmng">APP管理</Link> </Menu.Item>
          </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <div>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles.trigger,
                onClick: this.toggle,
              })}
            </div>
            <div className={styles.userinfo}>
              <UserInfo/>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}><div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div></Content>
          <Footer style={{ textAlign: 'center' }}>xxx ©2018 Created by Whu</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default BasicLayout