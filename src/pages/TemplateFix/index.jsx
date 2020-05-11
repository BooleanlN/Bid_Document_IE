import React , { useState, useEffect }from 'react'
import Step1 from './Components/Step1'
import Step2 from './Components/Step2'
import Step3 from './Components/Step3'
import styles from './style.less'
import { Card, Steps,Button } from 'antd';
import {connect} from 'dva'

const { Step } = Steps;
const steps = [
  {title:'选取模版',index:0,component:<Step1/>},
  {title:'模版调整',index:1,component:<Step2/>},
  {title:'提交模版',index:2,component:<Step3/>}
]
class TemplateFix extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current:0
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
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
    const {current} = this.state
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

export default TemplateFix