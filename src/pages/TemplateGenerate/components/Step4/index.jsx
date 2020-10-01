import React, { useState, useEffect } from 'react';
import { Button,Table,message } from 'antd';
import Template from './Template';
import {updateTemplate, getPureParameters, triggerTemplate} from '../../service';
const Step4 = (props) => {
  const [dataSource, setdataSource] = useState();
  const [showTemplate, setshowTemplate] = useState(false);
  const getTemplateSource = async () => {
    const res = await getPureParameters({
      mainCategory: props.info.mainCategory,
      subCategory: props.info.subCategory,
      detailCategory: props.info.detailCategory
    });
    const temp = {};
    if (res.data) {
      res.data.forEach(item => {
        if (!(item['parameterSubTitle'] in temp)){
          temp[item['parameterSubTitle']] = {
            'question': [],
            'state': []
          }
        }
        temp[item['parameterSubTitle']][item['parameterType']].push(item['parameterName'])
      })
      setdataSource(temp);
    }
    triggerTemplate({
      percentTime: props.info.percentTime,
      percentRate: props.info.percentRate
    },{
      mainCategory: props.info.mainCategory,
      subCategory: props.info.subCategory,
      detailCategory: props.info.detailCategory
    });
  }
  const handleClick = () => {
    setshowTemplate(true);
    getTemplateSource();
  }
  const updateDoc = async () => {
    const res = updateTemplate({
      mainCategory: props.info.mainCategory,
      subCategory: props.info.subCategory,
      detailCategory: props.info.detailCategory,
      template: dataSource
    });
    if (res.code == 20000 ){
      message.success("模版更新成功！");
    }
  }
  return ( 
    <>
      <Button type='primary' onClick={handleClick}>生成范本</Button>
      <div style={{display: showTemplate ? 'block' : 'none'}}>
        <Template data={dataSource}/>
      </div>
    </>
  );
}
 
export default Step4;