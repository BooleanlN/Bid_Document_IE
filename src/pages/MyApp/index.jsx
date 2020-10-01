import React, {useState,useEffect} from 'react';
import AppTable from './components/AppTable';
import AppEditModal from './components/AppEditModal';
import {Button} from 'antd';
const MyApp = () => {
  const [visible,setVisible] = useState(false);
  const hiddenEdit = () => setVisible(false);
  return (
    <div>
      <AppTable/>
      <div style={{textAlign:'right', marginTop:'20px'}}>
        <Button onClick={() => setVisible(true)} type='primary'>创建APP</Button>
      </div>
      <AppEditModal visible={visible} hiddenEdit={hiddenEdit}/>
    </div>
  );
};
export default MyApp;