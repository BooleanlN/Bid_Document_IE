import React, { useState, useEffect } from 'react';
import Cascader from '@/components/Cascader';
import { Input,Form,Select } from 'antd';
import {getBidList} from '@/services/commonUrl';
import {checkInfo} from '../../service';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;
const Step1 = (props) => {
  const [bids, setBids] = useState([]);
  const [bidtype, setbidtype] = useState(props.info ? [props.info.mainCategory, props.info.subCategory, props.info.detailCategory] : []);
  const [pattern, setpattern] = useState(props.info ? props.info.pattern : '');
  const [origins, setorigins] = useState(props.info ? props.info.origins : 0);
  const [showinfo, setshowinfo] = useState(props.info ? true : false);
  const [percenttime, setpercenttime] = useState(props.info ? props.info.percenttime : 0.7);
  const [percentrate, setpercentrate] = useState(props.info ? props.info.percentrate : 0.3);
  const [similaritymethod, setsimilaritymethod] = useState(props.info ? props.info.similaritymethod : 'jaccard_similarity');
  const [titlethreshold, settitlethreshold] = useState(props.info ? props.info.titlethreshold : 0.4);
  const [parameterthreshold, setparameterthreshold] = useState(props.info ? props.info.parameterthreshold : 0.6);
  useEffect(() => {
    getBidOptions();
  }, []);
  const getBidOptions = async () => {
    const res = await getBidList();
    setBids(res.data);
  }
  const setOption = async (value,s) => {
    setbidtype(value);
    if (value == ''){
      setshowinfo(false);
      return;
    }
    const res = await checkInfo({
      mainCategory: value[0],
      subCategory: value[1],
      detailCategory: value[2]
    });
    setshowinfo(true);
    setpattern(res.data.pattern);
    setorigins(res.data.docs);
    props.setCategoryInfo({
      mainCategory: value[0],
      subCategory: value[1],
      detailCategory: value[2],
      pattern: res.data.pattern,
      origins: res.data.docs,
      percentRate: percentrate,
      percentTime: percenttime,
      similaritymethod: similaritymethod,
      titlethreshold: titlethreshold,
      parameterthreshold: parameterthreshold
    });
  }
  return ( 
    <>
      <div style={{margin:'40px auto', width: '80%'}}>
        <Cascader optionsData={bids} option={bidtype} setOption={setOption}/>
        <div style={{display: showinfo? 'block' : 'none',margin:'20px auto', width:'60%'}}>
          <Form  {...formItemLayout}>
            <Form.Item name="origin" label="原始标书数据">
              <Input value={origins} addonAfter="个" disabled={true}/>
            </Form.Item>
            <Form.Item name="pattern" label="参数抽取模式">
              <Input value={pattern} onChange={(value) => {setpattern(value.target.value); props.setCategoryInfo({...props.info, pattern: value.target.value})}} />
            </Form.Item>
            <Form.Item name="percenttime" label="招标时间比重">
              <Input value={percenttime} onChange={(value) => {setpercenttime(value.target.value); props.setCategoryInfo({...props.info, percenttime: value.target.value})}} />
            </Form.Item>
            <Form.Item name="percentrate" label="出现频次比重">
              <Input value={percentrate} onChange={(value) => {setpercentrate(value.target.value); props.setCategoryInfo({...props.info, percentrate: value.target.value})}} />
            </Form.Item>
            <Form.Item name="titlethreshold" label="文本聚类阈值">
              <Input value={titlethreshold} onChange={(value) => {settitlethreshold(value.target.value);props.setCategoryInfo({...props.info, titlethreshold: value.target.value})}} />
            </Form.Item>
            <Form.Item name="parameterthreshold" label="文本去重阈值">
              <Input value={parameterthreshold} onChange={(value) => {setparameterthreshold(value.target.value); props.setCategoryInfo({...props.info,parameterthreshold:value.target.value})}} />
            </Form.Item>
            <Form.Item name="similaritymethod" label="相似度算法">
                <Select placeholder="" value={similaritymethod} onChange={(value) => {setsimilaritymethod(value);props.setCategoryInfo({...props.info,similaritymethod: value})}}>
                  <Option value="word2vec_similarity">word2vec+Cosine</Option>
                  <Option value="tfidf_similarity">TFIDF+Cosine</Option>
                  <Option value="jaccard_similarity">BoW+Jaccard</Option>
                </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
      
    </>
  );
}
 
export default Step1;