package com.shenhua.whu.whu.shenhua.controller;

import com.shenhua.whu.whu.shenhua.entity.mysql.MysqlModel;
import com.shenhua.whu.whu.shenhua.repository.es.EsModelRepository;
import com.shenhua.whu.whu.shenhua.repository.mysql.MysqlModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class IndexController {
    @Autowired
    MysqlModelRepository mysqlModelRepository;
    EsModelRepository esModelRepository;
    @RequestMapping("/")
    public String index(){
        List<MysqlModel> mysqlModelList = mysqlModelRepository.findAll();

        return "index.html";
    }
}
