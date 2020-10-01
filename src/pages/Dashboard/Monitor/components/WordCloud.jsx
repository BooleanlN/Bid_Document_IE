import React, { useState, useEffect } from 'react';
import { WordCloud } from '@ant-design/charts';
import { getPureParameters } from '../services';

const DemoWordCloud = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  },[props.category]);

  const asyncFetch = () => {
    if (!props.category) return;
    getPureParameters({
      mainCategory: props.category[0],
      subCategory: props.category[1],
      detailCategory: props.category[2]
    }).then(res => setData(res.data))
  };

  const config = getWordCloudConfig(data);

  function getDataList(data) {
    const list = [];
    data.forEach(d => {
      list.push({
        word: d.parameterName,
        weight: d.parameterRate,
        id: d.parameterId,
      });
    });
    return list;
  }

  function getWordCloudConfig(data) {
    return {
      width: 1200,
      height: 1000,
      data: getDataList(data),
      // maskImage:
      //   'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
      wordStyle: {
        rotation: [-Math.PI / 2, Math.PI / 2],
        rotateRatio: 0.5,
        rotationSteps: 4,
        fontSize: [10, 60],
        color: (word, weight) => getRandomColor(),
        active: {
          shadowColor: '#333333',
          shadowBlur: 10,
        },
        gridSize: 8,
      },
      shape: 'cardioid',
      shuffle: false,
      backgroundColor: '#fff',
      tooltip: {
        visible: true,
      },
      selected: -1,
      onWordCloudHover: hoverAction,
    };
  }

  function getRandomColor() {
    const arr = [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E8684A',
      '#6DC8EC',
      '#9270CA',
      '#FF9D4D',
      '#269A99',
      '#FF99C3',
    ];
    return arr[Math.floor(Math.random() * (arr.length - 1))];
  }

  function hoverAction(item, dimension, evt, start) {}

  return <WordCloud {...config} />;
};

export default DemoWordCloud;
