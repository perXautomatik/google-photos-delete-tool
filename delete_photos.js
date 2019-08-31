// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        photos.google.com/
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a major design
    change introduced in GM 1.0.
    It restores the sandbox.
*/
// ==/UserScript==
waitForKeyElements ("div.RY3tic", actionFunction);

function actionFunction (jNode) {


 this.$ = this.jQuery = jQuery.noConflict(true);

// Selector for Images and buttons
const ELEMENT_SELECTORS = {
    checkboxClass: '.ckGgle',
    deleteButton: 'button[title="Delete"]',
    confirmationButton: '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.V639qd.bvQPzd.oEOLpc.Up8vH.J9Nfi.A9Uzve.iWO5td > div.XfpsVe.J9fJmf > button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.nCP5yc.DuMIQc.kHssdc.HvOprf'
}

// Time Configuration (in milliseconds)
const TIME_CONFIG = {
    delete_cycle: 7000,
    press_button_delay: 1000
};

let imageCount = 0;

let checkboxes;
let buttons = {
    deleteButton: null,
    confirmationButton: null
}

let deleteTask = setInterval(() => {

    checkboxes = document.querySelectorAll(ELEMENT_SELECTORS['checkboxClass']);

    if (checkboxes.length <= 0) {
        console.log("[INFO] No more images to delete.");
        clearInterval(deleteTask);
        console.log("[SUCCESS] Tool exited.");
        return;
    }

    imageCount += checkboxes.length;

    checkboxes.forEach((checkbox) => {
		checkbox.click();
//		var checked = checkbox.checked
//		if(
//			not(checked)
//		)
//		{setTimeout(function(){
//			checkbox.click();
//		}, 500);

		//}
	});



waitForKeyElements ("input:nth-child(" + imageCount +")", countChecked);

	var countChecked = function() {


    console.log("[INFO] Deleting", $( "input:checked" ).length, "images");

    setTimeout(() => {

        buttons.deleteButton = document.querySelector(ELEMENT_SELECTORS['deleteButton']);
        buttons.deleteButton.click();

        setTimeout(() => {
            buttons.confirmation_button = document.querySelector(ELEMENT_SELECTORS['confirmationButton']);
            buttons.confirmation_button.click();
        }, TIME_CONFIG['press_button_delay']);
    }, TIME_CONFIG['press_button_delay']);
		};
}, TIME_CONFIG['delete_cycle']);};

