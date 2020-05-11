import React from 'react'
import classNames from 'classnames'
import styles from './index.less'
import { Dropdown } from 'antd';

const HeaderDropdown = ({overlayClassName:cls,...restProps}) => {
  return <Dropdown overlayClassName={classNames(styles.container,cls)} {...restProps} />
}
export default HeaderDropdown