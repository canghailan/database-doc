# 
## 1、 eqiq_course


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | course_type | varchar(20) | NO | NO | 课程类别(GRAND3,GRADE4,GRADE5,PARENT) |  
| 3 | course_date | int(11) | NO | NO | 保存年月日的int类型，如:20180710 |  
| 4 | resource_id | varchar(64) | NO | NO | base_recourse_id,uuid |  
| 5 | create_time | datetime | NO | NO | 创建时间 |  
| 6 | last_update_time | datetime | NO | NO | 更新时间 |  


## 2、 eqiq_pet


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | name | varchar(10) | NO | NO | 宠物名称 |  
| 3 | resource_uri | text | NO | NO | 宠物资源包地址 |  
| 4 | create_time | datetime | NO | NO | 创建时间 |  
| 5 | last_update_time | datetime | NO | NO | 更新时间 |  
| 6 | delete_time | datetime | NO | YES | 删除时间 |  


## 3、 eqiq_resource_ability_score


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | resource_id | varchar(64) | NO | NO | base_resource id，uuid |  
| 3 | ability_tag_id | bigint(20) | NO | NO | 能力标签id |  
| 4 | score | int(11) | NO | NO | 能力值，不超过10分 |  
| 5 | create_time | datetime | NO | NO |  |  
| 6 | last_update_time | datetime | NO | NO |  |  


## 4、 eqiq_study_ability_score


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | study_report_id | bigint(20) | NO | NO |  |  
| 3 | ability_tag_id | varchar(20) | NO | NO |  |  
| 4 | score | int(11) | NO | NO |  |  
| 5 | create_time | datetime | NO | NO |  |  


## 5、 eqiq_study_plan


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | secret | varchar(16) | NO | NO | 学习计划 学习码(eqiq生成） |  
| 3 | order_id | varchar(128) | NO | NO | 统一订单id(同步) |  
| 4 | sku_id | varchar(64) | NO | NO | 商品id(同步) |  
| 5 | buyer_phone | varchar(16) | NO | NO | 购买者电话(同步) |  
| 6 | buy_time | datetime | NO | NO | 订单购买时间(同步) |  
| 7 | sku_code | varchar(64) | NO | NO | 商品编码(同步) |  
| 8 | name | varchar(100) | NO | NO | 商品名称 |  
| 9 | course_type | varchar(10) | NO | NO | 计划所属课程类型 |  
| 10 | start_volume | int(11) | NO | NO | 开始册数 |  
| 11 | end_volume | int(11) | NO | NO | 结束册数 |  
| 12 | planned_start_date | int(11) | NO | NO | 计划开始时间(int 如：20170710) |  
| 13 | planned_end_date | int(11) | NO | NO | 计划结束时间(int 如：20170710) |  
| 14 | start_date | int(11) | NO | NO | 实际开始时间(有效期）(int 如：20170710) |  
| 15 | end_date | int(11) | NO | NO | 实际结束时间(有效期)(int 如：20170710) |  
| 16 | user_id | varchar(64) | NO | YES | 使用者用户id，如果为null，则表示改卡未使用 |  
| 17 | user_phone | varchar(16) | NO | YES |  |  
| 18 | expire_time | datetime | NO | YES | 观看过期时间，超过时间不允许观看（主要影响回看计划时间内的内容） |  
| 19 | disable_time | datetime | NO | YES |  |  
| 20 | active_time | datetime | NO | YES | 学习计划激活时间（也就是userid插入的时间） |  
| 21 | create_time | datetime | NO | NO |  |  
| 22 | last_update_time | datetime | NO | NO |  |  


## 6、 eqiq_study_record


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) unsigned | YES | NO |  |  
| 2 | study_plan_id | bigint(20) | NO | YES | 学习计划id |  
| 3 | course_type | varchar(20) | NO | NO | 课程类别(冗余，主要是家长学习记录使用) |  
| 4 | course_date | int(11) | NO | NO | 课程时间 |  
| 5 | resource_id | varchar(64) | NO | NO | 资源id(冗余，主要是家长学习记录使用) |  
| 6 | user_id | varchar(64) | NO | NO | 学习者id |  
| 7 | create_time | datetime | NO | NO |  |  


## 7、 eqiq_study_report


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | name | varchar(20) | NO | NO |  |  
| 3 | study_plan_id | bigint(20) | NO | NO | 学习计划id |  
| 4 | start_date | int(11) | NO | NO |  |  
| 5 | end_date | int(11) | NO | NO |  |  
| 6 | user_id | varchar(64) | NO | NO | 用户id |  
| 7 | course_total_count | int(11) | NO | NO | 总课程数 |  
| 8 | course_completed_count | int(11) | NO | NO | 已完成的课程数 |  
| 9 | score | int(11) | NO | NO | 总分 |  
| 10 | create_time | datetime | NO | NO |  |  


## 8、 eqiq_user_child


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | user_id | int(11) | YES | NO |  |  
| 2 | child_name | varchar(16) | NO | NO | 宝宝名 |  
| 3 | child_avatar | text | NO | NO | 宝贝头像 |  
| 4 | child_birthday | date | NO | NO | 宝贝生日 |  
| 5 | create_time | datetime | NO | NO |  |  
| 6 | last_update_time | datetime | NO | NO |  |  


## 9、 eqiq_user_pet


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | user_id | bigint(20) | NO | NO | 用户id |  
| 3 | pet_id | bigint(20) | NO | NO | 宠物id |  
| 4 | growth_value | int(10) | NO | NO | 成长值 |  
| 5 | create_time | datetime | NO | NO | 创建时间 |  
| 6 | last_update_time | datetime | NO | NO | 更新时间 |  
| 7 | delete_time | datetime | NO | YES | 删除时间 |  


## 10、 eqiq_user_pet_record


| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  
| - | - | - | - | - | - |  
| 1 | id | bigint(20) | YES | NO |  |  
| 2 | user_pet_id | bigint(20) | NO | NO | 用户宠物id |  
| 3 | study_record_id | bigint(20) | NO | NO | 学习记录id |  
| 4 | user_id | bigint(20) | NO | NO | 用户id |  
| 5 | growth_value | int(10) | NO | NO | 成长值 |  
| 6 | feed_time | datetime | NO | YES | 喂养时间 |  
| 7 | create_time | datetime | NO | NO | 创建时间 |  
| 8 | last_update_time | datetime | NO | NO | 更新时间 |  


