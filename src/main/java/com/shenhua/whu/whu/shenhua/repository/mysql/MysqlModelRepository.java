package com.shenhua.whu.whu.shenhua.repository.mysql;

import com.shenhua.whu.whu.shenhua.entity.mysql.MysqlModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MysqlModelRepository extends JpaRepository<MysqlModel,Integer> {
    @Query("select username from MysqlModel ")
    List<MysqlModel> queryAll();
    @Query("select user from MysqlModel user where user.username=:username")
    MysqlModel queryModel(@Param("username") String username);

}
