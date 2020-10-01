import { Steps,Button,message } from 'antd';
import React , { useState, useEffect }from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import styles from './style.less';


const { Step } = Steps;
const TemplateGenerate = (props) => {
  const [current,setCurrent] = useState(0);
  const [info, setInfo] = useState(null);
  const handlePre = () => {
    setCurrent(current - 1);
  };
  const handleNext = () => {
    if (current == 0 && !info){
      message.error('请先选择标的物');
      return;
    }
    if (current == steps.length - 1){
      setCurrent(0)
      return;
    } 
    setCurrent(current + 1);
  };
  const setCategoryInfo = (value) => {
    setInfo(value)
  }
  const steps = [
    {index: 0, title: '数据集检测', component: <Step1 info={info} setCategoryInfo={setCategoryInfo}/>},
    {index: 1, title: '参数抽取',  component: <Step2 info={info}/>},
    {index: 2, title: '参数聚合',  component: <Step3 info={info}/>},
    {index: 3, title: '范本结果',  component: <Step4 info={info}/>},
    {index: 4, title: '结束',     component: <Step5/>}
  ];
  return (
    <>
      <Steps current={current}>
        {
          steps.map(step => (
            <Step key={step.index} title={step.title} />
          ))
        }
      </Steps>
      <div className={styles.stepsContent}>{steps[current].component}</div>
      <div className={styles.stepsOperation}>
        <Button onClick={handlePre} type='primary' disabled={current == 0}>上一步</Button>
        <Button onClick={handleNext} type='primary'>{current == steps.length - 1 ?'完成':'下一步'}</Button>
      </div>
    </>
  )
};

export default TemplateGenerate;