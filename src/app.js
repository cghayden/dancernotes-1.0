require('./sass/custom.scss');

// import {storageAvailable, contains} from 'helpers';

import {studioDances, Dance} from './jsmodules/studioDances.js';

// ** return true or false for localStorage available ** //
function storageAvailable(type) {
	try {
		const storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

// ** helper function to see if an array contains an obj
function contains(arr, obj) {
	for (var i = 0; i < arr.length; i++) {
			if (arr[i] === obj) {
					return true;
			}
	}
	return false;
}

function CustomNote(id, notes) {
	this.id = id;
	this.notes = notes;
}

var customDances = [];  // array of custom dance objects to render ...
var hiddenStudioDances = []; //array of ids; studio dances the user never wants to see
var displayedDances = [];  // array of ids; dances checked to display on load
var idContainer;  //when selecting a dance to edit, save its id to be used in a later function\
var customStudioNotes = [];

$(document).ready( function() {
	if (storageAvailable('localStorage')) {
	parseHiddenStudioDances("hiddenStudioDances"); 
	parseCustomDances("customDances"); 
	parseDisplayedDances("displayedDances");
	parseCustomStudioNotes("customStudioNotes");
	renderDances(studioDances);
	renderDances(customDances);
	sort();
}	else {
	console.log("no local storage available");
	alert("Local Storage is not available on this device. You will not be able to create your own dances, and the studio dances you choose to display in 'Setup' will not be saved when your browser is refreshed");
	renderDances(studioDances);
}

//add/remove danceId in an array 
function toggleDance(danceid, array) {
	if ( contains(array, danceid) ) {
		var index = array.indexOf(danceid);
		array.splice(index, 1);
	} else {
		array.push(danceid);
	}
}

// save array, 'li' under key, 'name'. name is a string
function saveInLocalStorage(key, array) {
	localStorage.setItem(key, JSON.stringify(array));
}

function parseCustomDances(str) {
	if (localStorage.getItem(str)) {
	customDances = JSON.parse(localStorage.getItem(str));
	}
}

function parseDisplayedDances(str) {
	if ( localStorage.getItem(str) ) {
	displayedDances = JSON.parse(localStorage.getItem(str));
	}
}

function parseHiddenStudioDances(str) {
	if ( localStorage.getItem(str) ) {
	hiddenStudioDances = JSON.parse(localStorage.getItem(str));
	}
}

function parseCustomStudioNotes(str) {
	if (localStorage.getItem(str)) {
	customStudioNotes = JSON.parse(localStorage.getItem(str));
	}
}
// function retrieveFromLocalStorage(str, array) {
// 	if (localStorage.getItem(str)) {
// 		array = JSON.parse(localStorage.getItem(str));
// 	} 
// }

function renderDances(array) {
	array.forEach(dance => {
		createCheckbox(dance.id, dance.name, dance.song);
		renderNewDance(	dance.id,
										dance.name, 
										dance.song, 
										dance.tights, 
										dance.shoes, 
										dance.notes,
										dance.num,
										dance.day,
										dance.time);
		if ( contains(displayedDances, dance.id)) {
				$("input[value=" + dance.id +"]").prop("checked", true);
				} else {
					$('#'+dance.id).hide(); // hide if not in displayedDances
					} 
		if ( contains(hiddenStudioDances, dance.id) ) {
			$("input[value="+ dance.id +"]").parent().parent().hide();
				$("#"+ dance.id).hide();
		}	
	});
}

//show dance div and check its checkbox
function renderNewDance(id, title, song, tights, shoes, notes, num, day, time) {
	let customHtml = `
		<div class="col-12 col-md-6 dance-container" id="${id}">
			<div class="dance-header row" data-toggle="collapse" href="#${id}-body">
				<div class="col-3 text-left align-self-end time">
					<h5>${num}</h5>
				</div>
			<div class="col-6">
				<h4>${title}</h4>
				<p class="highlight-cool">${song}</p>
			</div>
			<div class="col-3 align-self-end time">
				<p>${day}</p>
				<h5>${time}</h5>
			</div>
		</div>
		<div class="dance-body collapse" id="${id}-body">
			<dl class="row mx-auto">
				<dt class="col-2 text-right">Tights: </dt>
				<dd class="col-10">${tights}</dd>
				<dt class="col-2 text-right">Shoes: </dt>
				<dd class="col-10"> ${shoes} </dd>
				<dt class="col-2 text-right">Notes: </dt>
				<dd class="col-10">
				<ul>`;
	for (var i = 0; i<notes.length; i++) {
		var notesHTML = '<li>' + notes[i] + '</li>';
		customHtml += notesHTML;
	} 
	customHtml += '</ul></dd></dl></div></div>';
	$("#dancesRow").append(customHtml);
	if (customStudioNotes.length>0) {
		customStudioNotes.forEach(function(item){
			if (item.id == id) {
				let notes = item.notes;
				notes.forEach(function(note){
					$('#'+ id + ' ul').append(`<li>${note}</li>`);
				});
			}
		});
	}
}

function createCheckbox(id, name, song) {
	let checkboxHTML = `
	<div class="form-check col-6 col-lg-4">
		<label class="form-check-label">
			<input class="form-check-input" type="checkbox" data-toggles="${id}" value="${id}">
			<span>${name}</span> <p>${song}</p>
		</label>
	</div>`;
	$("#setup__allDancesList").append(checkboxHTML);
}


$('#setup__allDancesList').change(event => {
	var checkbox = event.target;
	var choice = $(checkbox).val();
	console.log(choice);
	$('#'+choice).toggle();
	toggleDance(choice, displayedDances);
	saveInLocalStorage('displayedDances', displayedDances);
	sort();
});
	
function createCustom() {
	var customId = "custom"+ customDances.length;
	var customTitle = $('#customTitle').val();
	var customSong = $('#customSong').val();
	var customTights = $('#customTights').val();
	var customShoes = $('#customShoes').val();
	var customNotes = [];
	$("#customNotesList li input").each(function(){
		var $link = $(this).val(); 
		customNotes.push($link);
	});
	var customNum = $('#customNum').val();
	var customDay = $('#customDay').val();
	var customTime = $('#customTime').val();
	var custom = new Dance(customId, customTitle, customSong, customTights, customShoes, customNotes, customNum, customDay, customTime);
	displayedDances.push(customId);
	customDances.push(custom);
	saveInLocalStorage('displayedDances', displayedDances);
	saveInLocalStorage('customDances', customDances);
	createCheckbox(customId, customTitle, customSong);
	renderNewDance(customId, customTitle, customSong, customTights, customShoes, customNotes, customNum, customDay, customTime);
	$("input[value=" + customId +"]").prop("checked", true);
	$("#customNotesList").empty();
	$("#customNotesList").append('<li><input class="form-control" type="text" value=""></li>');
	document.getElementById('inline_addCustomForm').reset();
	sort();
	$("#numtimeDiv").hide();
	$('#cancelCustom').click();
}

$("#create").click( function(evt){
		$("#setup__checkboxes").hide("slide", function() {
		$("#custom_input_container").show("slide");	
	});
});

$("#inline_addCustomForm").click( function(evt){
	evt.preventDefault();
	if (evt.target.id === 'showEntry'){
		$("#numTimeDiv").toggle("blind");
	}
	if (evt.target.id === 'submitCustom') {
		createCustom();
	}
	if (evt.target.id === "addNoteInput") {
		$("#customNotesList").append('<li><input class="form-control" type="text"  value=""></li>');
		}
	if (evt.target.id === "cancelCustom") {
		$("#custom_input_container").hide("slide", function() {
		$("#setup__checkboxes").show("fade");
		});
	}
});
	
// create a list of all custom dances with edit and delete buttons
function renderEditList(customDances, studioDances) {
	let editListItemHTML;
	customDances.forEach(dance => {
		editListItemHTML= `
			<li class="${dance.id} list-group-item">${dance.name}
				<button class="btn btn-edit btn-sm">Edit</button>
				<button class="btn btn-danger btn-sm">Delete</button>
				</li>`;
		$('#edit-delete-list').append(editListItemHTML);
	});
	studioDances.forEach(dance => {
		if ( !contains(hiddenStudioDances, dance.id) ){
			editListItemHTML= `
			<li class="${dance.id} list-group-item">${dance.name}
			<button class="btn btn-primary btn-sm">+Note</button>
			<button class="btn btn-danger btn-sm">Delete</button>					
			</li>
			`;
			$('#edit-delete-list').append(editListItemHTML);
		}
	});
	$('#edit-delete-list').append('<p class="restore deleteOrEditList__message">The following studio dances can be restored to your site</p>');
	// render hidden dances with 'restore' button
	if(hiddenStudioDances.length>0) {
		$('#showRestoreList').prop('disabled', false);
		studioDances.forEach(dance => {
			if ( contains(hiddenStudioDances, dance.id) ) {
			let restoreListItemHtml=`
				<li class="${dance.id} list-group-item restore">${dance.name} 
			<button class="btn btn-danger btn-sm">Restore</button>
			</li>
			`;
			$('#edit-delete-list').append(restoreListItemHtml);
			};
		});
	}
}

// listeners for 'edit' 'delete' 'restore' 
$("#edit-delete-list").click(() => {
	let danceId = event.target.parentNode.classList[0];
	if (event.target.textContent === 'Delete') {
		for (var i = 0; i < customDances.length; i++){
			if (customDances[i].id === danceId) {
				deleteCustomDance(danceId);
			}
		}
		for (var i = 0; i < studioDances.length; i++){
			if (studioDances[i].id === danceId) {
				deleteStudioDance(danceId);
			}
		}
	}
	if (event.target.textContent === 'Edit') {
		$("#setup__checkboxes").hide("slide", function() {
		$("#edit_custom_container").show("slide"); });
		renderEditForm(danceId);
		$("#close_deleteOrEditModal").click();
	}
	if (event.target.textContent === '+Note') {
		$("#setup__checkboxes").hide("slide", function() {
		$("addStudioNote").show("slide"); });
		addStudioNote(danceId);
		$("#close_deleteOrEditModal").click();
	}
	if (event.target.textContent === 'Restore') {
		restoreStudioDance(danceId);
	}
});

$('#showRestoreList').click(function() {
	$('.restore').css("display", "flex");
	$(this).hide();
	$('#hideRestoreList').show();
});

$('#hideRestoreList').click(function() {
	$('.restore').css("display", "none");
	$(this).hide();
	$('#showRestoreList').show();
});

$('#editCustomDanceButton').click(function() {
	renderEditList(customDances, studioDances);
});

function renderEditForm(danceId) {
	idContainer = danceId;
	$("#editCustomNotesList").empty();
		for (var i = 0; i < customDances.length; i++){  /// prefill custom inputs with existing values.
			if( customDances[i].id === danceId) {
				$('#editTitle').val(customDances[i].name);
				$('#editSong').val(customDances[i].song);
				$('#editTights').val(customDances[i].tights);
				$('#editShoes').val(customDances[i].shoes);
				var notes = customDances[i].notes;
				for (var ii = 0; ii<notes.length; ii++) {
					var liValue = notes[ii];
					$("#editCustomNotesList").append('<li><input class="form-control" type="text" value="' +liValue+ '"></li>');
				}
				if(customDances[i].num || customDances[i].time) {
					$("#editNumTimeDiv").show();
					$("#editCustomNum").val(customDances[i].num);
					$("#editCustomDay").val(customDances[i].day);
						$("#editCustomTime").val(customDances[i].time);
				}
			}
		}
}

function addStudioNote (danceId) {
	studioDances.forEach(function(dance) {
		if (dance.id === danceId) {
			let html = `
			<h4>${dance.name}</h4>
			<h5>${dance.song}</h5>
			<ul>
				<li><span>Tights:</span> ${dance.tights}</li>
				<li><span>Shoes:</span> ${dance.shoes}</li>
			`
			if (dance.notes.length > 0){
				let notes = dance.notes;
				notes.forEach(function(item) {
					html += `<li><span>Studio Note: </span>${item}<li>`
				});
			}
			html += `</ul>`
			$('#addStudioNote-header').append(html);
			$('#addStudioNote-body').append(`<input id="studioNote-DanceId" name="studioNote-DanceId" type="hidden" value="${danceId}">`);
		}
	});
	if(customStudioNotes.length>0) {
		var match = 0;
		customStudioNotes.forEach(function(item) {
			if (item.id === danceId) {
				match += 1;
				var notes = item.notes;
				console.log(notes);
				notes.forEach(function(note){
					$("#addStudioNotes-list").append(`<li><input class="form-control" type="text" value="${note}"></li>`);
					});
			}
		});
		if (match===0){
			$("#addStudioNotes-list").append(`<li><input class="form-control" type="text" value=""></li>`);
		}
	} else {
		$("#addStudioNotes-list").append(`<li><input class="form-control" type="text" value=""></li>`);
	}
	$('#addStudioNote').show();
}

function closeAddStudioNoteForm() {
	$('#addStudioNote-header').empty();
	$("#studioNote-DanceId").remove();
	$("#addStudioNotes-list").empty();
	$('#addStudioNote').hide("slide", function() {
		$('#setup__checkboxes').show("slide"); 
	});
}

$("#addStudioNote").click(function(evt){
	event.preventDefault();
	if (evt.target.id === "anotherCustomNote") {
		$("#addStudioNotes-list").append('<li><input class="form-control" type="text" value=""></li>');
		}
	if (evt.target.id === 'addStudioNote-save') {
		var danceId = $('#studioNote-DanceId').val();
		var customNotes = [];
		$("#addStudioNotes-list li input").each(function(){
			var $note = $(this).val(); 
			customNotes.push($note);
		});
		const newNote = new CustomNote(danceId, customNotes);
		if(customStudioNotes.length>0) {
			customStudioNotes.forEach(function(item){
				if(item.id === danceId) {
					customStudioNotes.splice(customStudioNotes.indexOf(item), 1);
				}
			});
			customStudioNotes.push(newNote);
		} else {
			customStudioNotes.push(newNote);
		}
		saveInLocalStorage('customStudioNotes', customStudioNotes);
		// delete old dancediv and re-render to reset new notes
		$('#'+ danceId).remove();
		studioDances.forEach(function (dance) {
			if(dance.id == danceId) {
				renderNewDance(	dance.id,
					dance.name, 
					dance.song, 
					dance.tights, 
					dance.shoes, 
					dance.notes,
					dance.num,
					dance.day,
					dance.time);
				}
			if ( contains(displayedDances, dance.id)) {
				$("input[value=" + dance.id +"]").prop("checked", true);
				} else {
					$('#'+ dance.id).hide(); // hide if not in displayedDances
					}
			});

		closeAddStudioNoteForm();
	}
	if (evt.target.id === 'addStudioNote-cancel') {
		closeAddStudioNoteForm();
	}
});

function saveChanges(id){
	var customId = id;
	var customTitle = $('#editTitle').val();
	var customSong = $('#editSong').val();
	var customTights = $('#editTights').val();
	var customShoes = $('#editShoes').val();
	var customNotes = [];
	$("#editCustomNotesList li input").each(function(){
		var $link = $(this).val(); 
		customNotes.push($link);
	});	
	var customNum = $("#editCustomNum").val();
	var customDay = $("#editCustomDay").val();
	var customTime = $("#editCustomTime").val();
	
	var custom = new Dance(customId, customTitle, customSong, customTights, customShoes, customNotes, customNum, customDay, customTime);
	displayedDances.push(customId);
	customDances.push(custom);
	saveInLocalStorage('displayedDances', displayedDances);
	saveInLocalStorage('customDances', customDances);
	createCheckbox(customId, customTitle, customSong);
	renderNewDance(customId, customTitle, customSong, customTights, customShoes, customNotes, customNum, customDay, customTime);
	$("input[value=" + customId +"]").prop("checked", true);
	$("#editCustomNotesList li").remove();
	document.getElementById('editCustomForm').reset();
	$("#editNumTimeDiv input").val('');
	sort();
	$('#closeEditCustom').click();
};

function restoreStudioDance(danceId) {
	toggleDance(danceId, hiddenStudioDances);
	saveInLocalStorage('hiddenStudioDances', hiddenStudioDances);
	studioDances.forEach(dance => {
		if (dance.id === danceId) {
			$("."+ danceId).remove();
			$("input[value="+ danceId +"]").parent().parent().show();
			$("input[value=" + danceId +"]").prop("checked", false);
			var editListItemHTML=`
			<li class="${danceId} list-group-item">${dance.name}
			<button class="btn btn-primary btn-sm">+Note</button>
			<button class="btn btn-danger btn-sm">Delete</button>
			</li>
			`;
			$('#edit-delete-list').prepend(editListItemHTML);
		}
	});
	if(hiddenStudioDances.length === 0) {
		$('#hideRestoreList').click();
		$('#showRestoreList').prop('disabled', true);
	}
}

function deleteStudioDance(danceId) {
	toggleDance(danceId, hiddenStudioDances);
	saveInLocalStorage("hiddenStudioDances", hiddenStudioDances);
	//enable button to show list of restored dances
	$('#showRestoreList').prop('disabled', false);
		// remove from displayed dances, Not Toggle!!
	if ( contains(displayedDances, danceId) ) {
		var index = displayedDances.indexOf(danceId);
		displayedDances.splice(index, 1);
		saveInLocalStorage("displayedDances", displayedDances);
	} 
	for (var i = 0; i < studioDances.length; i++) {
		if (studioDances[i].id === danceId) {
			$("."+ danceId).remove();
			$("input[value="+ danceId +"]").parent().parent().hide(); // hide from Setup
			$("#"+ danceId).hide(); // hide main Div
			var restoreListItemHtml= '<li class="' + danceId + ' list-group-item restore">' + studioDances[i].name + '  -  ' + studioDances[i].song +'<button class="btn btn-danger btn-sm">Restore</button></li>';
			$('#edit-delete-list').append(restoreListItemHtml);
		}
	}
}

function deleteCustomDance(item){
	for (var i = 0; i < customDances.length; i++){
		if (customDances[i].id === item) {
			$("#"+item).remove();
			$("input[value="+ item +"]").parent().parent().remove();
			customDances.splice(i, 1);
			$("."+item).remove();
			displayedDances.splice(displayedDances.indexOf(item), 1);
		}
	}
	saveInLocalStorage('customDances', customDances);
	saveInLocalStorage('displayedDances', displayedDances);
}

$("#edit_custom_container").click( function(event){
	event.preventDefault();
	if (event.target.id === "editAddNoteInput") {
	$("#editCustomNotesList").append('<li><input class="form-control" type="text"  value=""></li>');
	}
	if (event.target.id === 'submitChanges') {
		deleteCustomDance(idContainer); // delete old info associated with this id in case any changes were made
		saveChanges(idContainer); // save info under this id with values from the input
	}
	if (event.target.id === "showEditEntry") {
		$("#editNumTimeDiv").toggle("blind");
	}
	if (event.target.id === "closeEditCustom") {
		$("#editCustomNotesList li").remove();
		$("#editNumTimeDiv input").val('');
		$("#edit_custom_container").hide("slide", function() {
		$("#setup__checkboxes").show("fade");
		});
	}
});

$("#deleteOrEditModal-CloseIcon").click( function () {
	$('#close_deleteOrEditModal').click();
});

$("#close_deleteOrEditModal").click( function() {
	// $('#showRestoreList').show
	$('#hideRestoreList').click();
	$('#edit-delete-list').empty();
	$('#restoreDanceList').empty();

});

$("#noticesHeading a").click(function (){
		$("#noticesHeading i").toggle();
});

function sort(){
	var $dancedivs = $(".dance-container");
	var numOrdered = $dancedivs.sort(function(a, b) {
		return $(a).find("h5:first").text() - $(b).find("h5:first").text();
	});
	$("#dancesRow").html(numOrdered);
};

//disable return button trigger submit on form input
$('form input').on('keypress', function(e) {
	return e.which !== 13;
});
});



// toggle accordion arrows when clicked
// $(".fa-angle-double-up").hide();

// $("#compsHeading a").click(function (){
// 		$("#compsHeading i").toggle();
// });

// function unlock() {
// 	enableSite = prompt("please enter the password");
// 		if (enableSite !== "Jazz") {
//   		$('.page-wrapper').hide();
// 			$(".nav-tabs a").attr("disabled", true);
// 			alert("access denied: email cghayden@gmail.com for assistance");
// 		} else {
// 			localStorage.setItem("access","true");
// 		}
// }

// function storeStudioDances(li) {
// 	localStorage.setItem('studioDances', JSON.stringify(li));
// }// why set this?  it is supplied by app.js  for if no internet connection? if so, need to write script for that

// function storeCustomDances(array) {
// 	localStorage.setItem('customDances', JSON.stringify(array));
// }

// function storeDisplayedDances(array) {
// 	localStorage.setItem('displayedDances', JSON.stringify(array));
// }

// function parseCustomDances(str) {
	// 	if (localStorage.getItem(str)) {
	// 	customDances = JSON.parse(localStorage.getItem(str));
	// 	}
	// }
	
	// function parseDisplayedDances(str) {
	// 	if ( localStorage.getItem(str) ) {
	// 	displayedDances = JSON.parse(localStorage.getItem(str));
	// 	}
	// }
	

// function parseStudioDances(str) {
// 	if (localStorage.str) {
// 	var studiodanceobjects = localStorage.getItem(str);
// 	studioDances = JSON.parse(studiodanceobjects);
// 	} else {
// 		populateStudioDances();
// 		storeStudioDances(studioDances);
// 	}
// }

// function toggleDisplayedDance(danceid) {
// 		if ( contains(displayedDances, danceid) ) {
// 			var index = displayedDances.indexOf(danceid);
// 			displayedDances.splice(index, 1);
// 		} else {
// 			displayedDances.push(danceid);
// 		}
// }


/// old method of storage, one entry for each item, now each is in a list

//
//var ids = $("#dances div[id]").map(function() { return this.id; }).get();
//ids.push("juniors");

//if item exists in LS, toggle between true/false, or set to true if a new item
//function toggleLocalStorage(item) {
//	if (localStorage.getItem(item) === 'true') {
//				localStorage.setItem(item, "false");
//			} else {
//				localStorage.setItem(item, "true");
//				}
//}

//function loadDances() { //
//	if (localStorage.getItem("juniors") === "true") {
//		localStorage.setItem("juniorTap", "true");
//		localStorage.setItem("juniorLyric", "true");
//		localStorage.setItem("juniorHiphop", "true");
//		localStorage.setItem("juniorJazz", "true");
//	} else {
//		localStorage.setItem("juniorTap", "false");
//		localStorage.setItem("juniorLyric", "false");
//		localStorage.setItem("juniorHiphop", "false");
//		localStorage.setItem("juniorJazz", "false");
//	}
//	
//	for (let i = 0; i < ids.length; i++) {
//		const dance = ids[i];
//		if (localStorage.getItem(dance) === 'true') {
//			$("input[value="+ dance +"]").prop("checked", true);
//			$('#' + dance).toggle();
//			}
//	};
//}





