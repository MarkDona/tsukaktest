<?php 
error_reporting(E_ALL);
ini_set('display_errors', 'On');
// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\SMTP; 
use PHPMailer\PHPMailer\Exception; 
 
// Include library files 
require 'vendor/phpmailer/phpmailer/src/Exception.php'; 
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php'; 
require 'vendor/phpmailer/phpmailer/src/SMTP.php'; 


// Recieve candidate data from dashboad 
if(isset($_POST['submit'])){
    $candidateName = $_POST['name'];
    $candidateEmail = $_POST['email'];
    $link = $_POST['link'];
    $agentEmail = $_POST['agentEmail'];
    // echo $link;
    // die();
}
 
// Create an instance; Pass `true` to enable exceptions 
$mail = new PHPMailer;                     // TCP port to connect to 

// Server settings 
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;    //Enable verbose debug output 
$mail->isSMTP();                            // Set mailer to use SMTP 
$mail->Host = 'mail.enaitchdevelopers.com';           // Specify main and backup SMTP servers 
$mail->SMTPAuth = true;                     // Enable SMTP authentication 
$mail->Username = 'tsuktest@enaitchdevelopers.com';       // SMTP username 
$mail->Password = '*ZL#{qtW+8,B';         // SMTP password 
$mail->SMTPSecure = 'ssl';                  // Enable TLS encryption, `ssl` also accepted 
$mail->Port = 465;                          // TCP port to connect to 
 
// Sender info 
$mail->setFrom('tsuktest@enaitchdevelopers.com', 'TSUK ADMIN'); 
$mail->addReplyTo('tsuktest@enaitchdevelopers.com', 'Admin'); 
 
// Add a recipient 
$mail->AddAddress($candidateEmail, $candidateName); 
$mail->AddAddress($agentEmail); 
 
//$mail->addCC('cc@example.com'); 
//$mail->addBCC('bcc@example.com'); 
 
// Set email format to HTML 
$mail->isHTML(true); 
 
// Mail subject 
$mail->Subject = 'Email Testing Link'; 
 
// Mail body content 
$bodyContent = '<h1>TSUK Application URL</h1>'; 
$bodyContent .= '<p>Hi '.$candidateName.' , Thanks for your interest TSUK. Find the link to our online application forms below. <br> Link: '.$link.'</p>'; 
$mail->Body    = $bodyContent; 
 
// Send email 
if(!$mail->send()) { 
    echo 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo; 
} else { 
    // If email is successful, redirect back to dashboard with a Get data
    header("Location: https://enaitchdevelopers.com/tsuktest/dashboard.html?emailStatus=sent"); 
    die();
}