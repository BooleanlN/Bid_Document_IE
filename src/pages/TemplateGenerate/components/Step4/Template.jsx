import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class Template extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value:'<p>模版不存在</p>'
    }
  }
  render(){
    const paragraphs = []
    let paragraph = ''
    let template = this.props.data ? this.props.data : {}
    const keys = Object.keys(template)
    for(let key of keys){
      paragraphs.push(`<h3>${key}</h3>`)

      for(let item of template[key]['question']){
        paragraphs.push(`<p>${item}：<u>请输入</u></p>`)
      }
      for(let item of template[key]['state']){
        paragraphs.push(`<p>${item}</p>`)
      }
      paragraphs.push('')
    }
    paragraph = paragraphs.join('<br>')
    return (
      <>
        <ReactQuill value={paragraph}/>
      </>
    )
  }
}
export default Template