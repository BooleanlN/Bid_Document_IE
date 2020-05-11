package com.shenhua.whu.whu.shenhua.entity.mysql;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name="w_users")
@Entity
public class MysqlModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //自增组件
    private Integer id;
    private String username;
    private String password;
    private Date createTime;
    private Date updateTime;
    private Integer role;
    public String toString(){
        return "{username:"+this.username+",role:"+this.role+"}";
    }
}
