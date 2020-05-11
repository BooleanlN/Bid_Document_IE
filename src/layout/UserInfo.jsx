import React from 'react'
import { Avatar ,Menu} from 'antd';
import { UserOutlined ,GlobalOutlined} from '@ant-design/icons';
import HeaderDropdown from '../components/Dropdown/index'
import styles from './UserInfo.less'
import { getLocale, setLocale } from 'umi';

class UserInfo extends React.Component{
  state = {
    username:'admin',
    avatar:'',
  };
  componentDidMount(){

  }
  render(){
    const selectedLang = "zh-CN"
    const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
    const languageLabels = {
      'zh-CN': '简体中文',
      'zh-TW': '繁体中文',
      'en-US': 'English',
      'pt-BR': 'Português',
    };
    const languageIcons = {
      'zh-CN': '🇨🇳',
      'zh-TW': '🇭🇰',
      'en-US': '🇺🇸',
      'pt-BR': '🇧🇷',
    };
    const changeLang = (key)=>"zh-CN"
    const menus = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
        {
          locales.map(locale => (
            <Menu.Item key={locale}>
              <span role="img" aria-label={languageLabels[locale]}>
                {languageIcons[locale]}
              </span>
              {' '}
            {languageLabels[locale]}
            </Menu.Item>
          ))
        }
      </Menu>
    )
    return (
      <div>
        <div className={styles.userwrapper}>
          <Avatar icon={<UserOutlined />}/>
          <HeaderDropdown overlay={menus} placement="bottomLeft">
            <GlobalOutlined title="语言"/>
          </HeaderDropdown>
        </div>
      </div>
    )
  }
}
export default UserInfo