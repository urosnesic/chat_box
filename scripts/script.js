var submit = document.inputForm.submit;
submit.addEventListener('click', inputChat, false);


//Sends data to input.php and is stored in database
function inputChat(event) {
	event.preventDefault();

	var chatname = document.inputForm.chatname.value;
	var msg = document.inputForm.message.value;

    if (chatname == "" || msg == "") {
		window.alert("Chatname and message are mandatory!");
		return;
	}

	// When first message is submitted, chatname becomes "locked"
	document.inputForm.chatname.readOnly = true;
	document.inputForm.chatname.style.border = "none";

	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}

	xhr.open("POST", "../chat_box/files/input.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('output').innerHTML = xhr.responseText;
		}
	};
	xhr.send("chatname=" + encodeURIComponent(chatname) + "&message=" + encodeURIComponent(msg));
}


// Calls log.php every 2 seconds to refresh div element with messages
function refresh() {

	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}

	xhr.open("GET", "../chat_box/files/log.php", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('output').innerHTML = xhr.responseText;
		}
	};
	xhr.send(null);
}

setInterval(refresh, 2000);

document.getElementById('deleteLogs').addEventListener('click', clearLogs, false);


// Easy way to 'clear' database when becomes to bloated
function clearLogs() {
	var chatname = document.inputForm.chatname.value;

	if (chatname == "") {
		window.alert("You need to have chatname.");
		return;
	}

	if (confirm("Are you really, really sure?")) {
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		}

		xhr.open("GET", "../chat_box/files/truncate.php", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById('output').innerHTML = xhr.responseText;
			}
		};
		xhr.send(null);
	} else {
		alert("Something went wrong.");
	}
}


// Function that detects whether localStorage is both supported and available
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

/*
 * If localStorage is available, we will use it
 * to save the settings for background color, so that
 * every time user come again his/her settings are saved
 * 
 * If localStorage is not available then there is no point
 * in displaying color options at all
 */
if (storageAvailable('localStorage')) {

	var inputDiv = document.getElementById('input');

	var para = document.createElement('p');
	para.innerHTML = "Choose your background color:";

	var colorPicker = document.createElement('input');
	colorPicker.setAttribute("type", "color");

	var cbutton = document.createElement('button');
	cbutton.innerHTML = "Choose";
	cbutton.style.display = "block";
	cbutton.style.marginTop = "20px";

	inputDiv.appendChild(para);
	inputDiv.appendChild(colorPicker);
	inputDiv.appendChild(cbutton);

	cbutton.addEventListener('click', color, false);
	
	var body = document.getElementsByTagName('body')[0];
	function color() {
		localStorage.setItem('backgroundColor', colorPicker.value);
		location.reload();
	}
	if (localStorage.length > 0) {
		body.style.backgroundColor = localStorage.backgroundColor;
	}

}




