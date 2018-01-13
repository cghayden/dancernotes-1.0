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

function Dance(id, name, song, tights, shoes, notes, num, day, time) {
	this.id = id;
	this.name = name;
	this.song = song;
	this.tights = tights;
	this.shoes = shoes;
	this.notes = notes;
	this.num = num || "";
	this.day = day || "";
	this.time = time || "";
}

function customNote(id, notes) {
	this.id = id;
	this.notes = notes;
}

/// will be populated from studio, each parameter in a variable
var studioDances = []; // array of stock dance OBJ's supplied by app.js used to populate checkboxes and div for each dance
function populateStudioDances() {
	var teen1Hiphop = new Dance (
		"teen1Hiphop", 
		"Teen 1 Hip Hop",
		"Instruction",
		"N/A (Black Pants)",
		"Pastry White Pop Tart Glitter",
		["Jacket: Zip up to bottom of sports bra"],
		"",
		"",
		""
	);
	studioDances.push(teen1Hiphop);
	
	var teen1Jazz = new Dance (
		"teen1Jazz",
		"Teen 1 Jazz",
		"Outlaw Pete",
		"N/A (Black Pants)",
		"None",
		["Flannel Shirt: Button only the 2nd and 3rd buttons down from the top "],
		"",
		"",
		""
	);
	studioDances.push(teen1Jazz);
	
	var teen1Lyric = new Dance ("teen1Lyric",
															"Teen 1 Lyric",
															"What the World Needs Now",
															"Light Suntan Capezio Ultra Soft Stirrup",
															"None",
															["Dress should fall 3 inches below the back crease of the knee"],
															"",
															"",
															""
															);
	studioDances.push(teen1Lyric);
	
	var teen1Tap = new Dance("teen1Tap",
													 "Teen 1 Tap",
													 "Ricochet",
													 "N/A (Black Pants)",
													 "Bloch Respect Oxford S0361 - Black",
													 [""],
													 "",
													 "",
													 ""
													 );
	studioDances.push(teen1Tap);
	
	var acro = new Dance("acro",
											"Acro Team",
											"Song",
											"?",
											"None",
											[""],
											"",
											"",
											""
											);
	studioDances.push(acro);
	
	var production = new Dance ("production",
														 "Production",
															"Vegas",
														 "Black Fishnet Tights OVER Light Suntan Capezio",
														 "Black Glittered Jazz Boots",
														 [""],
														 "",
														 "",
														 ""
															);
	studioDances.push(production);
	
	var smallGroupTap = new Dance (
		"smallGroupTap",
		"Small Group Tap",
		"In the Mood",
		"Black Fishnet Tights (Body Wrappers Seamless) OVER Light Suntan Capezio",
		"Bloch Respect Oxford S0361 - Black",
		["Gloves: Plain Red, (NOT the sequined ones)", "Tank top should fall below the hips"],
		"",
		"",
		""
	);
	studioDances.push(smallGroupTap);

	var juniorContemporary = new Dance (
		"juniorContemporary",
		"Junior Contemporary",
		"Sound of Silence",
		"Light Suntan Capezio Ultra Soft Stirrup",
		"None",
		[""],
		"",
		"",
		""
	);
	studioDances.push(juniorContemporary);

	var miniLyric = new Dance (
		"miniLyric",
		"Mini Lyric",
		"Song",
		"Light Suntan Capezio Ultra Soft Stirrup",
		"None",
		[""],
		"",
		"",
		""
	);
	studioDances.push(miniLyric);

	var miniJazz = new Dance (
		"miniJazz",
		"Mini Jazz",
		"Candy Girl",
		"Light Suntan Capezio Ultra Soft Stirrup",
		"None",
		[""],
		"",
		"",
		""
	);
	studioDances.push(miniJazz);

	var juniorBallet = new Dance (
		"juniorBallet",
		"Junior Ballet",
		"Guests From the Orient (Snow White)",
		"Body Wrappers mesh seamed tights in Ballet Pink",
		"Danshuz Pro Soft Canvas Ballet Slippers",
		["Remove top two layers from the tutu","Hair piece above bun in center"],
		"",
		"",
		""
	);
	studioDances.push(juniorBallet);

	var teenBallet = new Dance (
		"teenBallet",
		"Teen Ballet",
		"The Flower Garden (Alice in Wonderland)",
		"Body Wrappers mesh seamed tights in Ballet Pink",
		"Danshuz Pro Soft Canvas Ballet Slippers",
		[""],
		"",
		"",
		""
	);
	studioDances.push(teenBallet);

}; // end populateDances
var customDances = [];  // array of custom dance objects to render ...
var hiddenStudioDances = []; //array of ids; studio dances the user never wants to see
var displayedDances = [];  // array of ids; dances checked to display on load
var idContainer;  //when selecting a dance to edit, save its id to be used in a later function\
var customStudioNotes = [];

$(document).ready( function() {
	populateStudioDances();
	if (storageAvailable('localStorage')) {
	// if (localStorage.getItem('access') !== 'true'){  
	// 	unlock();  // run password prompt if access !true
	// } 
	// hiddenStudioDances = retrieveFromLocalStorage("hiddenStudioDances");

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
		
	$('form input').on('keypress', function(e) {  //disable return button trigger submit on form input
    return e.which !== 13;
	});
});

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
	for (var i = 0; i < array.length; i++) {
		createCheckbox(array[i].id, array[i].name, array[i].song);
		renderNewDance(	array[i].id,
										array[i].name, 
										array[i].song, 
										array[i].tights, 
										array[i].shoes, 
										array[i].notes,
										array[i].num,
										array[i].day,
										array[i].time);
		if ( contains(displayedDances, array[i].id)) {
				$("input[value=" + array[i].id +"]").prop("checked", true);
				} else {
					$('#'+array[i].id).hide(); // hide if not in displayedDances
					} 
		if ( contains(hiddenStudioDances, array[i].id) ) {
			$("input[value="+ array[i].id +"]").parent().parent().hide();
				$("#"+ array[i].id).hide();
		}	
	}
}

//show dance div and check its checkbox
function renderNewDance(id, title, song, tights, shoes, notes, num, day, time) {
	let customHtml = '<div class="col-12 col-md-6 dance-container" id="'+ id + '">';
	customHtml += '<div class="dance-header row" data-toggle="collapse" href="#' + id + '-body">';
	customHtml += '<div class="col-3 text-left align-self-end time">';
	customHtml += '<h5>'+ num + '</h5></div>';
	customHtml += '<div class="col-6"><h4>'+ title + '</h4><p>' + song +'</p></div>';  
	customHtml += '<div class="col-3 align-self-end time"><p>'+ day +'</p>';
	customHtml += '<h5>' + time + '</h5></div></div>';
	customHtml += '<div class="dance-body collapse" id="'+ id + '-body"><dl class="row mx-auto">';
	customHtml += '<dt class="col-2 text-right">Tights: </dt><dd class="col-10">' + tights + '</dd>';
	customHtml += '<dt class="col-2 text-right">Shoes: </dt><dd class="col-10">' + shoes + '</dd>';
	customHtml += '<dt class="col-2 text-right">Notes: </dt><dd class="col-10"><ul>';
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

function createCheckbox(id, title, song) {
	let checkboxHTML = '<div class="form-check col-6 col-lg-4">';
	checkboxHTML += '<span class="dance__delete">X</span>';
	checkboxHTML += '<label class="form-check-label">';
	checkboxHTML += '<input class="form-check-input" type="checkbox" data-toggles="' + id;
	checkboxHTML += '" value="' +id+ '">';  //default = not checked, (render NewDance will check it)
	checkboxHTML += ' ' + title + ' -- ' + song;
	checkboxHTML += '</label></div>';
	$("#setup__allDancesList").append(checkboxHTML);
}

$('#setup__allDancesList').change(function(event) {
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
	for(var i = 0; i < customDances.length; i++) {
		var editListItemHTML= '<li class="' + customDances[i].id + ' list-group-item">' + customDances[i].name + '  -  ' + customDances[i].song + `<button class="btn btn-primary btn-sm">Edit</button>
				<button class="btn btn-danger btn-sm">Delete</button>					
				</li>`;
		$('#edit-delete-list').append(editListItemHTML);
	}
	for(var i = 0; i < studioDances.length; i++) {
		if ( !contains(hiddenStudioDances, studioDances[i].id) ){
		var editListItemHTML= '<li class="' + studioDances[i].id + ' list-group-item">' + studioDances[i].name +  '  -  ' + studioDances[i].song +`
		<button class="btn btn-primary btn-sm">+Note</button>
		<button class="btn btn-danger btn-sm">Delete</button>					
		</li>`;
		$('#edit-delete-list').append(editListItemHTML);
		};
	}
	$('#edit-delete-list').append('<p class="restore deleteOrEditList__message">The following studio dances can be restored to your site</p>');
	// render hidden dances with 'restore' button
	if(hiddenStudioDances.length>0) {
		$('#deleteOrEditList__restoreListButton').prop('disabled', false);
		studioDances.forEach(function(dance) {
			if ( contains(hiddenStudioDances, dance.id) ) {
			var restoreListItemHtml= '<li class="' + dance.id + ' list-group-item restore">' + dance.name + '<button class="btn btn-danger btn-sm">Restore</button></li>';
			$('#edit-delete-list').append(restoreListItemHtml);
			};
		});
	}
}

// listeners for 'edit' 'delete' 'restore' 
$("#edit-delete-list").click(function (){
	console.log('click');
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

$('#deleteOrEditList__restoreListButton').click(function() {
	$('.restore').css("display", "flex");
	$(this).hide();
	$('#hideRestoreList').show();
	// $('.restoreButton-hide').toggle();
	// $('.restoreButton-show').toggle();
});

$('#hideRestoreList').click(function() {
	$('.restore').css("display", "none");
	$(this).hide();
	$('#deleteOrEditList__restoreListButton').show();
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

// $('#addStudioNote-save').click(function () {
	
// });

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
		const newNote = new customNote(danceId, customNotes);
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
	for (var i = 0; i < studioDances.length; i++){
		if (studioDances[i].id === danceId) {
			$("."+ danceId).remove();
			$("input[value="+ danceId +"]").parent().parent().show();
			$("input[value=" + danceId +"]").prop("checked", false);
			// $("#"+ danceId).show();
			var editListItemHTML= '<li class="' + danceId + ' list-group-item">' + studioDances[i].name +  '  -  ' + studioDances[i].song + `<button class="btn btn-danger btn-sm">Delete</button>
			</li>`;
			$('#edit-delete-list').prepend(editListItemHTML);
		}
	}
	if(hiddenStudioDances.length === 0) {
		$('#hideRestoreList').click();
		$('#deleteOrEditList__restoreListButton').prop('disabled', true);
	}
}

function deleteStudioDance(danceId) {
	toggleDance(danceId, hiddenStudioDances);
	saveInLocalStorage("hiddenStudioDances", hiddenStudioDances);
	//enable button to show list of restored dances
	$('#deleteOrEditList__restoreListButton').prop('disabled', false);
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
	$('#edit-delete-list').empty();
	$('#restoreDanceList').empty();
});

// toggle accordion arrows when clicked
$(".fa-angle-double-up").hide();

$("#compsHeading a").click(function (){
		$("#compsHeading i").toggle();
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





