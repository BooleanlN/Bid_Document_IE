import React from 'react'
import template from './template.json';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Template extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value:'<p>xxx</p>'
    }
  }
  render(){
    const paragraphs = []
    let paragraph = ""
    const regex = new RegExp("[1-9]+(\\.|\\．)+",'g')
    
    for(let section in template['content']){
      let str = template['content'][section]
      const matches = str.matchAll(regex);
      console.log(matches.length)
      let index = 0;
      for(const match of matches){
        console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
        str = str.slice(0,match.index+index*4)+"<br>"+str.slice(match.index+index*4)
        index++;
      }
      str= str.replace('\n','<br>')
      paragraphs.push(str)
      paragraph+=`<p>${str}</p>`
    }
    // console.log(paragraph)
    const {value} = this.state
    return (
      <>
        <ReactQuill value={paragraph}/>
      </>
      // <Typography>
      //   <Title>{template['type']}</Title>
      //   {paragraph}
      // </Typography>
    )
  }
}
export default Template