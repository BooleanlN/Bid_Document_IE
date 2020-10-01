import React,{useState,useEffect} from 'react';
import {Cascader} from 'antd';


const CustomCascader = (props) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    makeOptions();
  },[props.optionsData]);
  const makeOptions = () => {
    if (props.optionsData.length == 0) return;
    const parent = [];
    props.optionsData.forEach(item => {
      if(parent.indexOf(item['mainCategory']) == -1){
        parent.push(item['mainCategory']);
      }
    });
    const tempOptions = [];
    parent.forEach(element => {
      const root = props.optionsData.filter(item => item['mainCategory']==element);
      const children =[]
      root.forEach(item => {
        if(children.indexOf(item['subCategory']) == -1){
          children.push(item['subCategory']);
        }
      });
      const tempChildOptions = [];
      children.forEach(element => {
        const child = props.optionsData.filter(item => item['subCategory'] == element);
        const grandChild = []
        child.forEach(item => {
          if(grandChild.indexOf(item['detailCategory']) == -1){
            grandChild.push(item['detailCategory']);
          }
        });
        const grandChildObj = [];
        grandChild.forEach(element => {
          grandChildObj.push({
            value: element,
            label: element
          });
        });
        tempChildOptions.push({
          value: element,
          label: element,
          children: grandChildObj
        });
      });
      tempOptions.push({
        value: element,
        label: element,
        children: tempChildOptions
      });
    });
    setOptions(tempOptions)
  }
  return (
    <Cascader options={options} value={props.option}  onChange={props.setOption} placeholder={props.placeholder ? '选择' : '选择标的物'} />
  )
};
export default CustomCascader;