import pdfplumber
import jieba
import jieba.posseg as pseg #词性标注
import jieba.analyse as anls #关键词提取
from sklearn.cluster import KMeans
from gensim.models.doc2vec import Doc2Vec,TaggedDocument
from docx import Document

import json
import re
import os
from collections import Counter
class Template():
    def __init__(self,type):
        self._type = type

    def re_match(self,texts):
        """匹配技术部分小节"""
        pattern = "第.*节"
        regex = re.compile(pattern)
        sections = []
        index = 0
        for text in texts:
            if len(regex.findall(text)) > 0:
                sections.append((index, text))
            #             print(text,index)
            index += 1
        return sections
    def get_sections(self,dirname):
        """获取小节"""
        sections = {}
        text_extract = {}
        for _, _, files in os.walk(dirname):
            for filename in files:
                if filename.split('.')[-1] == 'pdf':
                    texts = pdf_parse_text(dirname + '/' + filename)
                    text_extract[filename.split('.')[0]] = texts
                    sections_ = re_match(texts)
                    sections[filename.split('.')[0]] = sections_
                    print("{}小节获取完毕".format(filename))
        return sections, text_extract

def pdf_parse_table(path):
    """解析pdf文件中的表格"""
    origin = pdfplumber.open(path)
    tables = []
    for page in origin.pages:
        # 获取当前页面的全部表格
        table_page = [table for tables in page.extract_tables() for table in tables if len(table)!=0]
        tables.append(table_page)
    origin.close()
    return tables

def pdf_parse_text(path):
    """解析pdf为"""
    origin = pdfplumber.open(path)
    texts = []
    for page in origin.pages:
        text_page = [text.replace(' ','') for text in page.extract_text().split('\n') if len(text.replace(' ','')) != 0]
        texts.extend(text_page)
    origin.close()
    return texts

def re_match(texts):
    """匹配技术部分小节"""
    pattern = "第.*节"
    regex = re.compile(pattern)
    sections = []
    index = 0
    for text in texts:
        if len(regex.findall(text)) > 0:
            sections.append((index,text))
#             print(text,index)
        index+=1
    return sections

def get_sections(dirname):
    """获取小节"""
    sections = {}
    text_extract = {}
    for _,_,files in os.walk(dirname):
        for filename in files:
            if filename.split('.')[-1] == 'pdf':
                texts = pdf_parse_text(dirname+'/'+filename)
                text_extract[filename.split('.')[0]] = texts
                sections_ = re_match(texts)
                sections[filename.split('.')[0]] = sections_
                print("{}小节获取完毕".format(filename))
    return sections,text_extract

def get_exact_section(dirname,numberlist):
    """获取解析的小节列表"""
    sections = []
    for _,_,files in os.walk(dirname):
        for filename in files:
            if filename.split('.')[-1] == 'pdf':
                texts = pdf_parse_text(dirname+'/'+filename)
                try:
                    section_exact = texts[numberlist[filename.split('.')[0]][0]:numberlist[filename.split('.')[0]][1]]
                    sections.append((filename.split('.')[0],section_exact))
                except:
                    pass
                print("{}小节获取完毕".format(filename))
    return sections
def get_cross(sections):
    """获取公有的篇章"""
    set1 = {sectionname[3:] for _, sectionname in list(sections.values())[0]}
    for label, sections_ in sections.items():
        set2 = {sectionname[3:] for _, sectionname in list(sections_)}
        if (len(set2) > 0):
            # print(set2)
            set1 = set1 & set2
            print(set1)
    counter = Counter()
    for label, sections_ in sections.items():
        set2 = {sectionname[3:] for _, sectionname in list(sections_)}
        if (len(set2) > 0):
            set3 = set2 - set1
            counter.update(set3)
    summary = len(sections)
    for item, count in counter.items():
        if (count > summary * 0.5):
            set1.update({item})
    return set1
def get_section_matiral_index(sections,extracts:set):
    """
    获取章节的索引
    :param sections:
    :param extracts:
    :return:
    """
    result = {}
    for extract in extracts:
        section_matriels = []
        for label,sections_ in sections.items():
            regex = re.compile(extract)
            for index in range(len(sections_)):
                if len(regex.findall(sections_[index][1])):
                    start = sections_[index][0]
                    if index != len(sections_) - 1:
                        end = sections_[index + 1][0]
                    else:
                        end = start
                    if end - start > 1: # 过滤目录
                        section_matriels.append((label,(start,end)))
        result[extract] = section_matriels
    return result
def get_matiral(matriel_index,texts,extracts):
    """
    获得章节素材，进一步处理
    :param matriel_index:
    :param texts:
    :param extracts:
    :return:
    """
    matirals = {}
    for extract in extracts:
        temp = []
        for label,(start,end) in matriel_index[extract]:
            print(texts[label][start:end])
            temp.append(texts[label][start:end])
        matirals[extract] = temp
    return matirals

def analyse_tfidf(matierals,extracts):
    """tfidf算法下的关键词提取"""
    for extract in extracts:
        matirel = matierals[extract]
        text = ""
        text_item = ""
        for texts in matirel:
            text_item = "".join(texts)
        text += text_item
        text += " "
        anls.set_stop_words('../source/stopwords.txt')
        tags = anls.extract_tags(text, topK=100, withWeight=True)
        with open("../source/tfidf.txt", "w", encoding="utf-8") as f:
            f.write("分析的章节：{}\n".format(extract))
            f.write("\n".join(["{},rate:{}".format(tag[0],tag[1]) for tag in tags]))
def analyse_textRank(matierals,extracts):
    """textRank算法下的关键词提取"""
    for extract in extracts:
        matirel = matierals[extract]
        text = ""
        text_item = ""
        for texts in matirel:
            text_item = "".join(texts)
        text += text_item
        text += " "
        anls.set_stop_words('../source/stopwords.txt')
        tags = anls.textrank(text, topK=100, withWeight=True)
        with open("../source/textrank.txt","w",encoding="utf-8") as f:
            f.write("分析的章节：{}\n".format(extract))
            f.write("\n".join(["{},rate:{}".format(tag[0],tag[1]) for tag in tags]))
def stop_words(path):
    """停用词"""
    stopWords = []
    with open(path,encoding='utf-8') as f:
        stopWords = [line.strip()for line in f.readlines()]
    return stopWords
def analyse_pseg(matierals,extracts):
    """词性标注分析"""
    for extract in extracts:
        matirel = matierals[extract]
        text = ""
        text_item = ""
        stopWords = stop_words('../source/stopwords.txt')
        for texts in matirel:
            text_item = "".join(texts)
        text += text_item
        words = pseg.cut(text,use_paddle=True)
        for word, flag in words:
            if word.strip() not in stopWords and len(word.strip()) > 1:
                print('%s %s' % (word, flag))

def cut_word(texts,stopWords):
    """
    对句子进行分词
    :param texts:
    :param stopWords:
    :return:
    """
    cut_list = []
    for text in texts:
        for word in list(jieba.cut(text)):
            if word.strip() not in stopWords and len(word.strip()) > 1:
                cut_list.append(word)
    return cut_list
def cluster(x_train,modelPath):
    """聚类筛选大样本"""
    doc_vectors = []
    model = Doc2Vec.load(modelPath)
    matirel_dict = []
    print("success loading Doc2Vec model")
    for text,label in x_train:
        vec = model.infer_vector(text)
        doc_vectors.append(vec)
        matirel_dict.append(text)
    # print(doc_vectors)
    clf = KMeans(n_clusters=2)
    clf.fit(doc_vectors)
    print("KMeans 聚类结束")
    return clf,matirel_dict
def means(matierals,extracts):
    result_template = {}
    for extract in extracts:
        matirel = matierals[extract]
        x_train = []
        stopWords = stop_words('../source/stopwords.txt')
        index = 0
        for texts in matirel:
            text_item = ""
            text_item = "".join(texts)
            cut_list = [word for word in list(jieba.cut(text_item)) if word.strip() not in stopWords and len(word.strip()) > 1]
            x_train.append(TaggedDocument(cut_list,tags=[index]))
            index += 1
        model = Doc2Vec(x_train, min_count=1, window=6, vector_size=70, sample=1e-3, negative=5, workers=4)
        model.train(x_train, total_examples=model.corpus_count, epochs=70)
        model.save("../source/models/model_{}".format(extract))
        estimator,matirel_dict = cluster(x_train,"../source/models/model_{}".format(extract))
        counter = Counter(estimator.labels_)
        #print(matirel_dict)
        max_value = 0 if max(counter.values()) == counter[0] else 1
        max_len = 0
        for index in range(len(estimator.labels_)):
            if max_value == estimator.labels_[index] and len(matirel[index])>max_len:
                result_template[extract] = "\n".join(matirel[index])
                max_len = len(matirel[index])
    return result_template
# def to_docx(texts):
#     doc = Document()
if __name__ == '__main__':
    sections,text_extract = get_sections("../source/datas")
    set_section = get_cross(sections)
    matriel_index = get_section_matiral_index(sections,set_section)
    for extract in set_section:
        for x in matriel_index[extract]:
            print(x)

    result = get_matiral(matriel_index,text_extract,set_section)
    template = means(result,set_section)
    template_dict = {
        'type': '采煤机',
        'content': template
    }
    for extract in set_section:
        with open("../source/resultTemps/template.json", "w", encoding="utf-8") as f:
            json.dump(template_dict, f, ensure_ascii=False)
    # for extract in set_section:
    #     with open("../source/resultTemps/template.txt","a+",encoding="utf-8") as f:
    #         f.write(extract+"\n")
    #         f.write(template[extract] + "\n")
    # analyse_tfidf(result,extracts=set_section)
    # analyse_textRank(result, extracts=set_section)
    # analyse_pseg(result,extracts=set_section)