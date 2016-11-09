<?php
require_once 'class/Database.php';

$db = new Database();

$query = "SELECT username, post, post_time FROM chat ORDER BY id DESC";
$results = $db->getConn()->query($query);
if ($results->num_rows) {
	foreach ($results as $result) {
		echo "<span id=\"cname\">" . htmlentities($result['username']) . "</span>"
		 . " <i>at</i> " . 
		 "<span id=\"time\">" . $result['post_time'] . "</span>"
		 . ": " . 
		"<span id=\"text\">" . htmlentities($result['post']) . "</span>"
		 . "<br />";
	}
}

header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
header('Content-Type: text/xml');

?>