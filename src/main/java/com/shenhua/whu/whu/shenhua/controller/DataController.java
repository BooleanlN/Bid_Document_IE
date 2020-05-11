package com.shenhua.whu.whu.shenhua.controller;

import com.shenhua.whu.whu.shenhua.entity.es.EsModel;
import com.shenhua.whu.whu.shenhua.entity.mysql.MysqlModel;
import com.shenhua.whu.whu.shenhua.repository.es.EsModelRepository;
import com.shenhua.whu.whu.shenhua.repository.mysql.MysqlModelRepository;
import lombok.Data;
import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.apache.tomcat.util.security.MD5Encoder;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.common.xcontent.XContent;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.attachment.AttachmentMarshaller;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


@RestController
public class DataController {
    @Autowired
    MysqlModelRepository mysqlModelRepository;
    @Autowired
    EsModelRepository esModelRepository;
    @Qualifier("getClient")
    @Autowired
    private RestClient restClient;

    @GetMapping("/users")
    public Object users(){
        List<MysqlModel> usersModel = mysqlModelRepository.queryAll();
        return usersModel;
    }
    @PostMapping("/login")
    public Object login(@RequestBody UserParam param, HttpServletRequest request, HttpSession session){
        HashMap<String,Object> userinfo = new HashMap<>();
        MysqlModel user = mysqlModelRepository.queryModel(param.getUsername());
        if(user!=null){
            userinfo.put("username",user.getUsername());
            session.setAttribute(user.getUsername(),user.toString());
            userinfo.put("msg","登录成功");
            userinfo.put("code",2000);
        }else {
            userinfo.put("msg","该用户不存在");
            userinfo.put("code",-1);
        }
        return userinfo;
    }

    @PostMapping("/registe")
    public Object registe(@RequestBody UserParam param, HttpServletRequest request, HttpSession session){
        HashMap<String,Object> userinfo = new HashMap<>();
        MysqlModel user = mysqlModelRepository.queryModel(param.getUsername());
        if(user==null){
            MysqlModel mysqlModel = new MysqlModel();
            mysqlModel.setUsername(param.getUsername());
            mysqlModel.setPassword(param.getPassword());
            mysqlModel.setRole(0);
            mysqlModel.setCreateTime(new Date());
            mysqlModelRepository.save(mysqlModel);
            userinfo.put("username",param.getUsername());
            userinfo.put("msg","注册成功");
            userinfo.put("code",2000);
        }else{
            userinfo.put("username",param.getUsername());
            userinfo.put("msg","已存在用户");
            userinfo.put("code",-1);
        }
        return userinfo;
    }
    @PostMapping("/search")
    public Object search(@RequestBody SearchParam param){
        HashMap<String,Object> map = new HashMap<>();
        BoolQueryBuilder builder = QueryBuilders.boolQuery();
        builder.should(QueryBuilders.matchQuery("attachment.content",param.getKeyword()));
        String s = builder.toString();
        System.out.println(s);
        Page<EsModel> search = (Page<EsModel>) esModelRepository.search(builder);
        if(search!=null){
            System.out.println(search.getTotalElements());
            List<EsModel> content = search.getContent();
            System.out.println(content);
            map.put("msg","search success");
            map.put("data",content);
            map.put("code",2000);
        }else{
            map.put("msg","no result");
            map.put("code",-1);
        }
        return map;
    }

    @PostMapping("/upload")
    public Object upload(@RequestParam("file") MultipartFile file,@RequestParam("type") String type){
        HashMap<String,Object> map = new HashMap<>();
        EsModel fileModel = new EsModel();
        String file_base64 = "";
        try {
            byte[] bytes = file.getBytes();
            file_base64 = Base64.getEncoder().encodeToString(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        UUID uuid = UUID.randomUUID();
        fileModel.setId(uuid.toString());
        try {
            XContentBuilder doc = XContentFactory.jsonBuilder().startObject()
                    .field("file-content",file_base64)
                    .field("remarks",type)
                    .endObject();
            fileModel.setAttachment(doc);
            esModelRepository.save(fileModel);
            map.put("msg","上传成功！");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }
    @PostMapping("/rest/bids")
    public ResponseEntity<String> getEsInfo() throws IOException{
        Request request = new Request("GET","/");
        Response response = restClient.performRequest(request);
        String responseBody = EntityUtils.toString(response.getEntity());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
    @PostMapping("/rest/bids/{type}/{id}")
    public ResponseEntity<String> add(@PathVariable("type") String type,@PathVariable("id") String id,@RequestParam("file") MultipartFile file) throws IOException, JSONException {
        if(file.isEmpty()){
            return new ResponseEntity<>("上传失败", HttpStatus.EXPECTATION_FAILED);
        }
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        file.transferTo(Paths.get("/Users/jiayi/IdeaProjects/whu_shenhua/src/main/resources/bids/" + fileName));
        File bid = new File("/Users/jiayi/IdeaProjects/whu_shenhua/src/main/resources/bids/" + fileName);
        byte[] bytess = Files.readAllBytes(bid.toPath());
        byte[] bytes = file.getBytes();
        BASE64Encoder encoder = new BASE64Encoder();
        String encodeFile = encoder.encodeBuffer(bytess).trim().replaceAll("\r\n","");
        Request request = new Request("POST",new String("/bids/"+type+"/"+id));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("file", encodeFile);
        request.setEntity(new NStringEntity(jsonObject.toString(),ContentType.APPLICATION_JSON));
        request.addParameter("pretty", "true");
        request.addParameter("pipeline", "pdfattachment");
        Response response = restClient.performRequest(request);
        String responseBody = EntityUtils.toString(response.getEntity());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
    @PostMapping("/rest/bidjson/{type}/{id}")
    public ResponseEntity<String> addJson(@PathVariable("type") String type,@PathVariable("id") String id,@RequestBody Map params) throws IOException, JSONException {
        String encodefile = (String) params.get("file");
        Request request = new Request("POST",new String("/bids/"+type+"/"+id));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("file", encodefile);
        request.setEntity(new NStringEntity(jsonObject.toString(),ContentType.APPLICATION_JSON));
        request.addParameter("pretty", "true");
        request.addParameter("pipeline", "pdfattachment");
        Response response = restClient.performRequest(request);
        String responseBody = EntityUtils.toString(response.getEntity());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
    @Data
    public static class SearchParam{
        private String keyword;
    }
    @Data
    public static class UserParam{
        private String username;
        private String password;
    }
    @Data
    public static class Bids{
        private String filename;
        private String fileDownloadUri;
        private String fileType;
        private long size;
    }
}
