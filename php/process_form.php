<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Send email to the recipient
    $to = "bloc2.0@outlook.com"; // Change this to your email address
    $subject = "New message from $name";
    $body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";
    mail($to, $subject, $body);
    
    // Send auto-response to the sender
    $autoResponseSubject = "Thank you for contacting us!";
    $autoResponseBody = "Dear $name,\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nXI SOLUTIONS";
    mail($email, $autoResponseSubject, $autoResponseBody);
    
    // Send notification to the admin
    $adminEmail = "xideleventh@outlook.com"; // Change this to your admin email address
    $notificationSubject = "New message from $name";
    $notificationBody = "You have received a new message from $name ($email):\n\n$message";
    mail($adminEmail, $notificationSubject, $notificationBody);
    
    // Redirect to a thank you page
    header("Location: thank.html"); // Change this to your thank you page URL
    exit;
}
?>
