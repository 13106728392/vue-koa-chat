-- phpMyAdmin SQL Dump
-- version 3.3.7
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 07 月 23 日 15:34
-- 服务器版本: 5.1.69
-- PHP 版本: 5.2.17p1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `huang_iiio`
--

-- --------------------------------------------------------

--
-- 表的结构 `hs_sz_yi_friends_circle`
--

CREATE TABLE IF NOT EXISTS `hs_sz_yi_friends_circle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '当前用户id',
  `text` varchar(255) DEFAULT NULL COMMENT '发表的内容',
  `imgUrl1` varchar(255) DEFAULT NULL COMMENT '图片1',
  `imgUrl2` varchar(255) DEFAULT NULL COMMENT '图片2',
  `imgUrl3` varchar(255) DEFAULT NULL COMMENT '图片3',
  `postTime` int(13) DEFAULT NULL COMMENT '发表时间',
  `reviewshow` tinyint(1) NOT NULL DEFAULT '0' COMMENT '预览展示',
  `reviewhide` tinyint(1) NOT NULL DEFAULT '0' COMMENT '预览隐藏',
  `criticism` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否有评论',
  `flag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否隐藏或显示',
  `suporthtml` varchar(255) DEFAULT '赞' COMMENT '点赞内容',
  `likes` varchar(255) DEFAULT '' COMMENT '点赞的人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='朋友圈动态表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `hs_sz_yi_friends_circle`
--

