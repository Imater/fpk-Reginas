<?
require_once("attachmentread.class.php");
$host="{imap.gmail.com:993/imap/ssl}INBOX"; // pop3host
$login="eugene.leonar@gmail.com"; //pop3 login
$password="83519000995"; //pop3 password
$savedirpath="" ; // attachement will save in same directory where scripts run othrwise give abs path
$jk=new readattachment(); // Creating instance of class####
$jk->getdata($host,$login,$password,$savedirpath); // calling member function

?>