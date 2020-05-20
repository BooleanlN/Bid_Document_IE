#!/usr/bin/env python
#-*- coding:utf-8 -*-
# @Time : 2020/5/9 18:09
# @Author : wcy
# @File : test.py
# @Software: PyCharm
import json
import re


def read_json(path,WINDOWS=False):
    '''读取处理后的json文件'''
    with open(path, 'r',encoding='utf-8') as f:
        data = json.load(f)

    text=str(data['content'])

    #参数标识符
    signal=':[BLANK]'

    # 首先处理成windows环境下换行符
    if WINDOWS:
        text=re.sub(r'\\n', '\r\n', text)

    # 处理 冒号: 参数 行尾 最简单常见的情况
    '''
        eg: △1.6采高：2.24-4.3m。
            △1.7采煤机过煤间隙：≥900mm。
            △1.8卧底量：≥400mm。
            △1.9供电电源：3300V(±12%)，50Hz。
            4.5.1截割电机
                制造厂家：。
                型号：。
                额定功率（KW）：。
    '''
    reg1 = '(:|：).*'
    new_text1 = re.sub(reg1, signal, text)

    # 处理  范围数字 1-10  5~10 ～
    '''
        eg:△2.9采煤机破碎机适合于左右工作面互换，破碎能力与采煤机的生产能力相匹配，要
            求瞬时破碎能力≥4000t/h。提高破碎机护罩强度，护罩板材厚度≥20mm，硬度达到
            HB220～280，并增加加强筋数量；增大护罩相对滚筒的包角，提升护罩整体刚度。
            改进破碎机螺旋线结构和进破碎机支撑轴承配置形式，并加装防护措施，避免损坏。 
    '''
    reg2 = '(0|([1-9]\d*))(\.\d+)?(-|~|～)(0|([1-9]\d*))(\.\d+)?'
    #reg2 = '([\u4e00-\u9fa5]|:|：)(≥)(0|([1-9]\d*))(\.\d+)?(\W(0|([1-9]\d*))(\.\d+))?([a-zA-Z]+)?' # 复杂情况
    new_text2 = re.sub(reg2, signal, new_text1)

    # 处理： 低于 小于 等于 大于 高于
    '''
        eg:△2.9采煤机破碎机适合于左右工作面互换，破碎能力与采煤机的生产能力相匹配，要
            求瞬时破碎能力≥4000t/h。提高破碎机护罩强度，护罩板材厚度≥20mm，硬度达到
            HB220～280，并增加加强筋数量；增大护罩相对滚筒的包角，提升护罩整体刚度。
            改进破碎机螺旋线结构和进破碎机支撑轴承配置形式，并加装防护措施，避免损坏。 
    '''
    reg3 = '[不]?[小|大|高|低][于].*(,|，|。)'
    #reg2 = '([\u4e00-\u9fa5]|:|：)(≥)(0|([1-9]\d*))(\.\d+)?(\W(0|([1-9]\d*))(\.\d+))?([a-zA-Z]+)?' # 复杂情况
    new_text3 = re.sub(reg3, signal, new_text2)

    # 处理： ≥ ≤
    '''
        eg:△2.9采煤机破碎机适合于左右工作面互换，破碎能力与采煤机的生产能力相匹配，要
            求瞬时破碎能力≥4000t/h。提高破碎机护罩强度，护罩板材厚度≥20mm，硬度达到
            HB220～280，并增加加强筋数量；增大护罩相对滚筒的包角，提升护罩整体刚度。
            改进破碎机螺旋线结构和进破碎机支撑轴承配置形式，并加装防护措施，避免损坏。 
    '''
    reg4 = '(≤|≥).*(,|，|。)'
    #reg2 = '([\u4e00-\u9fa5]|:|：)(≥)(0|([1-9]\d*))(\.\d+)?(\W(0|([1-9]\d*))(\.\d+))?([a-zA-Z]+)?' # 复杂情况
    new_text4 = re.sub(reg4, signal, new_text3)
    with open('raw_text.json', 'w', encoding='utf-8', newline='\n') as w:
        w.write(text)
    with open('new_text.txt','w',encoding='utf-8',newline='\n') as w:
        w.write(new_text4)

if __name__ == '__main__':
    path='../source/resultTemps/template.json'
    read_json(path,WINDOWS=True)
