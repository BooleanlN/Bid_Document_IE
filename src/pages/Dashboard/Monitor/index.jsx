import React, {useState,useEffect} from 'react';
import Cascader from '@/components/Cascader';
import WordCloud from './components/WordCloud';
import {getBidList} from './services';
const Monitor = () => {
  const [category,setCategory] = useState('');
  const [bids,setBids] = useState([]);
  useEffect(()=> {
    doGetData();
  },[])
  const doGetData = async () => {
    const res = await getBidList();
    setBids(res.data)
  }
  const setOption = (value,s) => {
    setCategory(value)
  }
  return (
    <>
      <Cascader optionsData={bids} setOption={setOption} option={category}/>
      <div style={{margin:'0 auto', width:'1200px'}}>
        <WordCloud category={category} />
      </div>
    </>
  )
}
export default Monitor