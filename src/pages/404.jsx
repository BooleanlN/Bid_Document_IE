import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';

const NoFoundPage = () => {
  return (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，这个页面已丢失"
    extra={
      <Button type="primary" onClick={() => router.push("/")}>
        返回主页
      </Button>
    }
  />
)};

export default NoFoundPage;
