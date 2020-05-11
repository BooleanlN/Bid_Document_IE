package com.shenhua.whu.whu.shenhua.config;


import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfiguration{
    @Bean
    public RestClient getClient(){
        RestClientBuilder restClientBuilder = RestClient.builder(new HttpHost("localhost",9200,"http"));
        return restClientBuilder.build();
    }
}
