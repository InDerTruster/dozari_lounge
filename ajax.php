<?php
if ($_POST['validation'] === 'true') {
	
	$to = "info@dozariloungebar.ru";

	$subject = "Новая заявка на бронь";

	$message = '<b>Имя: </b>'.$_POST['name'].'<br/><b>Контактный номер: </b>'.$_POST['number'].'<br/><b>Количество гостей: </b>'.$_POST['member_count'].'<br/><b>Время посещения: </b>'.$_POST['time'];

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$headers.= 'From: DoZaRi Lounge <info@dozariloungebar.ru>' . "\r\n";

	if (mail($to, $subject, $message, $headers )) {
		echo('true');
	}else{
		echo('false');
	}
}