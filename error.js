function error(msg,url,line){
  var REPORT_URL = "xxxx/cgi"; // 收集上报数据的信息
  var m =[msg, url, line, navigator.userAgent, +new Date];// 收集错误信息，发生错误的脚本文件网络地址，用户代理信息，时间
  var url = REPORT_URL + m.join('||');// 组装错误上报信息内容URL
  var img = new Image;
  img.onload = img.onerror = function(){
     img = null;
  };
  img.src = url;// 发送数据到后台cgi
}
// 监听错误上报
window.onerror = function(msg,url,line){
  error(msg,url,line);
}