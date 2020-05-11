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
            <Menu.Item key="1"> <Link to="/dashboard/analysis">分析页</Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="book" /><span>知识库</span></span>}>
            <Menu.Item key="11"><Link to="/bid/search">知识库全文检索</Link></Menu.Item>
            <Menu.Item key="4"> <Link to="/bid/select">知识库查看</Link> </Menu.Item>
            <Menu.Item key="5"><Link to="/bid/update">知识库更新</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/bid/setting">知识库设置</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="tool" /><span>编制工具</span></span>}>
            <Menu.Item key="7"> <Link to="/template">模版编制</Link> </Menu.Item>
            <Menu.Item key="8"> <Link to="/templateFix">模版调整</Link> </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="monitor" /><span>标书审核</span></span>}>
            <Menu.Item key="9"> <Link to="/censor">我的审核</Link> </Menu.Item>
            <Menu.Item key="10"> <Link to="/task">我的提交</Link> </Menu.Item>
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
          {/* <Breadcrumb routes={routes} /> */}
              {this.props.children}
            </div></Content>
          <Footer style={{ textAlign: 'center' }}>Shenhua ©2018 Created by Whu</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default BasicLayout