/**
 * 1. Sõnumi ja võtme väljade valideerimine.
 * 2. Iga sõnumi tähele leiame talle vastava ascii koodi ning liidame sellele võtme tähe ascii koodi.
 * 3. Kui ascii kood läheb a-z raamidest (97...122) välja, siis lahutame 26 - analoog mooduli võtmisele, kui meil oleks a:0, b:1, ..., x:26.
 * 4. Moodustame sõne, leides uuele ascii koodile vastava tähe.
 */
function OTP_encrypt() {
	var messageField = document.getElementById("input").value.toLowerCase();
	var keyField = document.getElementById("key").value.toLowerCase();
	var fieldsValidation = validateOTP(messageField, keyField);
	if (!fieldsValidation) {
		return;
	}
	var encryptedMessage = "";
	for (var i = 0; i < messageField.length; i++) {
		var asciiCode = messageField.charCodeAt(i) + keyField.charCodeAt(i) - 97;
		if (asciiCode > 122) {
			asciiCode -= 26;
		}
		encryptedMessage += String.fromCharCode(asciiCode);
	}
	var resultField = document.getElementById("result");
	resultField.innerHTML = encryptedMessage;
}

/**
 * Sisuline erinevus encrypt funktsiooniga on siin see, et me lahutame sõnumi tähe ascii ja võtme tähe ascii, mistõttu 
 * on tarvis ascii koodile vajadusel liita 26, kui saadud kood ascii raamidest välja jääb.
 */
function OTP_decrypt() {
	var messageField = document.getElementById("input").value.toLowerCase();
	var keyField = document.getElementById("key").value.toLowerCase();
	var fieldsValidation = validateOTP(messageField, keyField);
	if (!fieldsValidation) {
		return;
	}
	var encryptedMessage = "";
	for (var i = 0; i < messageField.length; i++) {
		var asciiCode = messageField.charCodeAt(i) - keyField.charCodeAt(i) + 97;
		if (asciiCode < 97) {
			asciiCode += 26;
		}
		encryptedMessage += String.fromCharCode(asciiCode);
	}
	var resultField = document.getElementById("result");
	resultField.innerHTML = encryptedMessage;
}

/**
 * Kasutatud on olemasolevat lahendust SHA-512 krüpteeringu teostamiseks.
 * Lahendus on leitav: https://coursesweb.net/javascript/sha512-encrypt-hash_cs.
 * Base64 kodeeringuks on kasutatud sisse-ehitatud funktsiooni btoa().
 */
function SHA512_encrypt() {
	var input = document.getElementById("input").value;
	var encryptedString = SHA512(input);
	var result = document.getElementById("result");
	result.innerHTML = btoa(encryptedString);
}

/**
 * Funktsioon, mis valideerib sõnumi ja võtme väljad.
 * 1. Sõnum ja võti peavad olema sama pikad.
 * 2. Sõnum või võti ei tohi olla tühi.
 * 3. Sõnum ja võti peavad koosnema tähtedest a-z vahemikus.
 */
function validateOTP(message, key) {
	var allowedLetters = /^[a-z]+$/;
	if (message.length != key.length) {
		alert("Message and key length must be the same");
		return false;
	}
	if (message == "" || key == "") {
		alert("Message and key cannot be empty.");
		return false;
	}
	if(!message.match(allowedLetters) || !key.match(allowedLetters)) {
		alert("Message and key letters must belong to group a-z.");
		return false;
	}
	return true;
}