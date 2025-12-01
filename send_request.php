<?php
include_once('include/class.phpmailer.php');
include_once('include/class.smtp.php');

header("Content-type:text/html; charset=utf-8");

if (!empty($_POST)) {

$_serv     = $_POST['_serv'];
$_name     = $_POST['_name'];
$_phone    = $_POST['_phone'];
$_city     = $_POST['_city'];
$_email    = $_POST['_email'];
$_company  = $_POST['_company'];
$_message  = $_POST['_message'];

if(!empty($_serv)) {
$serv  = "";
foreach ($_serv as $value) {
$serv .= $value.", ";
}
$_serv = rtrim($serv, ", ");
}

if (empty($_name)) { echo "name"; exit; }
if (empty($_phone) OR strlen($_phone) < 10) { echo "phone"; exit; }
if (!filter_var($_email, FILTER_VALIDATE_EMAIL)) { echo "emailbad"; exit; }
if (empty($_email) OR strlen($_email) < 9) { echo "email"; exit; }
if (empty($_message)) { echo "message"; exit; }
if (strlen($_message) < 15) { echo "message_short"; exit; }


$email_title    = "Siteden Gelen - ".date("d-m-Y h:i");
$emailbodytitle = "Siteden Gelen - ".date("d-m-Y h:i");

$emailbodytext  = "Ad Soyad: ".$_name."<br>Telefon: ".$_phone."<br>Email: ".$_email."<br>Şehir: ".$_city."<br>Mesaj: ".$_message."<br>Hizmet: ".$_serv;

$subject  = '=?UTF-8?B?'.base64_encode($email_title).'?=';

$mail              = new PHPMailer();
$mail->IsSMTP();
$mail->CharSet     = "UTF-8";
$mail->SMTPDebug   = 0;
$mail->SMTPAuth    = true;
$mail->SMTPOptions = array(
                    'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                    )
                    );
$mail->SMTPSecure  = "SSL";
$mail->Host        = "smtppro.zoho.eu";
$mail->Port        = 465;
$mail->Username    = "info@cozumcloud.com.tr";
$mail->Password    = "xn9BnUk4R634";
$mail->IsHTML(true);
$mail->SetFrom("info@cozumcloud.com.tr", "Çözüm Cloud");
$mail->Subject     = $subject;
$mail->MsgHTML($emailbodytext);

$address = "info@cozum.cloud";

$mail->AddAddress($address);

$mail->send();
$mail->ClearAllRecipients();

echo "ok"; exit;

} else {

echo "nok"; exit;

}

?>