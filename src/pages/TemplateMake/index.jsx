import React from 'react';
import Step1 from './Components/Step1';
import Step2 from './Components/Step2';
import Step3 from './Components/Step3';
import styles from './style.less';
import { Steps,Button } from 'antd';
import {getTemplate} from './service';
const { Step } = Steps;

class TemplateMake extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current:0,
      dataSource:{},
      bidType: ''
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.setOption = this.setOption.bind(this)
  }
  setOption = async (value, selectedOptions) => {
    this.setState({
      bidType: value
    });
    const res = await getTemplate({main_category: value[0],sub_category: value[1],detail_category: value[2]});
    this.setState({
      dataSource: res.data
    });
  }
  handleNext(){
    this.setState({
      current: ++this.state.current
    })
  }
  handlePrev(){
    this.setState({
      current: --this.state.current
    })
  }
  handleSubmit(){
    // 提交
    let _this = this
    setTimeout(()=>{
      _this.setState({
        current: ++this.state.current
      })
    },1000)
  }
  handleReset(){
    this.setState({
      current: 0
    })
  }
  render(){
    const {current,dataSource,bidType} = this.state
    const steps = [
      {title:'选取模版',index:0,component:<Step1 setOption={this.setOption} bidType={bidType}/>},
      {title:'模版填充',index:1,component:<Step2 dataSource={dataSource}/>},
      {title:'生成标书',index:2,component:<Step3 dataSource={dataSource}/>}
    ]
    let operations;
    if(current === 0){
     operations = (
      (<Button type="primary" onClick={this.handleNext}>下一步</Button>)
     )
    }else if(current < steps.length-1){
      operations = (
       <div>
          <Button type="primary" onClick={this.handlePrev}>上一步</Button>
          <Button type="primary" onClick={this.handleSubmit}>提交审核</Button>
       </div>
      )
      
    }else{
      operations = (
        <div>
          <Button type="primary" onClick={this.handleReset}>新任务</Button>
        </div>
      )
      
    }
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
      {operations}
    </div>
    </>
   )
  }
}

export default TemplateMake