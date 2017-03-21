import {
  getElement,
	setCookie
} from "kalukukkaro";

import Modaali from "modaali";

var cookieNotification = getElement("#haveacookie");

if (cookieNotification) {
	new Modaali(cookieNotification, {
		modal: false,
		onClose: function() {
			setCookie("cookiesAllowed", 1, 9999);
		}
	});

	cookieNotification.open();
}
