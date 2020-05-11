package com.shenhua.whu.whu.shenhua.entity.es;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Data
@Document(indexName = "bids",type = "extract",useServerConfiguration = true,createIndex = false)
public class EsModel {
    @Id
    private String id;
    @Field(type = FieldType.Attachment)
    private Object attachment;
}
