<?php
require_once '../files/init.php';

class Database {
	private $conn;

	public function __construct() {
		$this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if ($this->conn->connect_errno) {
			die("Database connection failed: " . $this->conn->conncet_error);
		}
	}

	public function sanitize($string) {
		return $this->conn->real_escape_string($string);
	}

	public function input($name, $msg) {
		$query  = "INSERT INTO chat (username, post, post_time) ";
		$query .= "VALUES ('{$name}', '{$msg}', NOW())";
		$this->conn->query($query);
	}

	public function clearChat() {
		$query = "TRUNCATE TABLE chat";
		$this->conn->query($query);
	}

	public function getConn() {
		return $this->conn;
	}

	public function __destruct() {
		$this->conn->close();
	}
}

?>