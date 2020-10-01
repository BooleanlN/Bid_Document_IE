import { Document,Page } from 'react-pdf'
import React from 'react'
import Mock from 'mockjs'
// import pdfFile from '../../../../../mock/source/1.pdf'

import { Pagination } from 'antd';
const {Random}  = Mock
class DocumentShow extends React.Component{
  constructor(props){
    super(props)
    let num = Mock.mock({"len|1-14":1})
    this.state = {
      file:`http://localhost:3030/${this.props.filename}`,
      numPages:1,
      pageNumber:1
    }
    console.log(this.state.file)
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentDidMount(){
    // console.log(this.props.location)
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    console.log("load success")
    this.setState({ numPages });
  }
  handleSelect(page){
    this.setState({
      pageNumber:page
    })
  }
  render(){
    const { file,numPages, pageNumber } = this.state;
    console.log(numPages)
    return (
      <div>
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          noData="该文件无法打开"
          renderInteractiveForms={true}
          renderAnnotationLayer={true}
          pageIndex={1}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        {/* <p>Page {pageNumber} of {numPages}</p> */}
       <Pagination total={numPages} onChange={this.handleSelect} current={pageNumber} showQuickJumper pageSize={1}
        style={{textAlign:'center'}} hideOnSinglePage={true}/>
      </div>
    );
  }
}
export default DocumentShow