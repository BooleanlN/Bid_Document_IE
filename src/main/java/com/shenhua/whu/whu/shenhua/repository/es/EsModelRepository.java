package com.shenhua.whu.whu.shenhua.repository.es;

import com.shenhua.whu.whu.shenhua.entity.es.EsModel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface EsModelRepository extends ElasticsearchRepository<EsModel,String> {

}
