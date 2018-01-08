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

var juniors = ['juniorHiphop', 'juniorJazz', 'juniorLyric', 'juniorTap', 'juniors']; //unused
var studioDances = []; // stock dances supplied by app.js used to populate checkboxes and div for each dance
var customDances = [];  // list of the ids of the custom dances to render ...
var displayedDances = [];  // dances checked to display, saved to redisplay the same dances when broswer is re-opened  
var idContainer;  //when seleting a dance to edit, save its id to be used in a later function

$(document).ready( function() {
	if (storageAvailable('localStorage')) {
		
	// if (localStorage.getItem('access') !== 'true'){  
	// 	unlock();  // run password prompt if access !true
	// }
		
	parseStudioDances('studioDances'); // parse list of allDances containing Dance objects, or create it 
	parseCustomDances('customDances'); 
	parseDisplayedDances('displayedDances'); // parse list of displayedDances if it is in localStorage
	renderDances(studioDances);
	renderDances(customDances);
	sort();
}	else {console.log("no local storage available");}
		
	$('form input').on('keypress', function(e) {  //disable return button trigger submit on form input
    return e.which !== 13;
	});
});

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

//add/remove dance DisplayedDances array 
function toggleDisplayedDance(danceid) {
		if ( contains(displayedDances, danceid) ) {
			var index = displayedDances.indexOf(danceid);
			displayedDances.splice(index, 1);
		} else {
			displayedDances.push(danceid);
		}
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

// save array, 'li' under key, 'name'. name is a string
function saveInStorage(li, name) {
	localStorage.setItem(name, JSON.stringify(li));
}

function storeStudioDances(li) {
	localStorage.setItem('studioDances', JSON.stringify(li));
}

function storeCustomDances(li) {
	localStorage.setItem('customDances', JSON.stringify(li));
}

function storeDisplayedDances(li) {
	localStorage.setItem('displayedDances', JSON.stringify(li));
}

function parseStudioDances(str) {
	if (localStorage.str) {
	var studiodanceobjects = localStorage.getItem(str);
	studioDances = JSON.parse(studiodanceobjects);
	} else {
		populateStudioDances();
		storeStudioDances(studioDances);
	}
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

/// will be populated from studio, each parameter in a variable
function populateStudioDances() {
	var teen1Hiphop = new Dance ("teen1Hiphop", 
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
	
	var teen1Jazz = new Dance ("teen1Jazz",
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
	
	var smallGroupTap = new Dance ("smallGroupTap",
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

	var juniorContemporary = new Dance ("juniorContemporary",
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

	var miniLyric = new Dance ("miniLyric",
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

var miniJazz = new Dance ("miniJazz",
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

var juniorBallet = new Dance ("juniorBallet",
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

var TeenBallet = new Dance ("TeenBallet",
"Teen Ballet",
"The Flower Garden (Alice in Wonderland)",
"Body Wrappers mesh seamed tights in Ballet Pink",
"Danshuz Pro Soft Canvas Ballet Slippers",
[""],
"",
"",
""
);
studioDances.push(TeenBallet);
}

function renderDances(array) {
	for (var i = 0; i < array.length; i++) {
		createCheckbox(array[i].id, array[i].name, array[i].song);
		renderNewDance(	array[i].id, //renderHTML, default = shown
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
				} else {$('#'+array[i].id).toggle(); } 
	}
}

//show dance div and check its checkbox
function renderNewDance(id, title, song, tights, shoes, notes, num, day, time) { //notes is an array of strings,li text
	let customHtml = '<div class="col-12 col-md-6 dance-container" id="'+ id + '">';
	customHtml += '<div class="dance-header row" data-toggle="collapse" href="#' + id + '-body">';
	customHtml += '<div class="col-3 text-left align-self-end time">';
	customHtml += '<span># </span><h5>'+ num + '</h5></div>';
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
}

function createCheckbox(id, title, song) {
	let checkboxHTML = '<div class="form-check col-6 col-lg-4"><label class="form-check-label">';
	checkboxHTML += '<input class="form-check-input" type="checkbox" data-toggles="' + id;
	checkboxHTML += '" value="' +id+ '">';  //default = not checked, (render NewDance will check it)
	checkboxHTML += ' ' + title + ' -- ' + song;
	checkboxHTML += '</label></div>';
	$("#checkboxesRow").append(checkboxHTML);
}

//todo: write a toggle function as change handler
$('#checkboxesRow').change(function(event) {
	var checkbox = event.target;
	var choice = $(checkbox).val();
	console.log(choice);
	
	if (choice === "juniors") { 
		for (var i = 0; i < juniors.length; i++) {
			var dance = juniors[i];
			$('#'+ dance).toggle();
			toggleDisplayedDance(dance);
	}
	} else {
		$('#'+choice).toggle();
		toggleDisplayedDance(choice);
		}
	storeDisplayedDances(displayedDances);
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
	storeDisplayedDances(displayedDances);
	storeCustomDances(customDances);
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
	// evt.preventDefault();
		$("#checkboxes").hide("slide", function() {
		$("#custom_input_container").show("slide");	
	});
});

$("#inline_addCustomForm").click( function(evt){
	evt.preventDefault();
	if (evt.target.id === 'showEntry'){
		$("#numTimeDiv").toggle("blind");
	}
	if (evt.target.id === 'submitCustom') {
		console.log("submit custom dance clicked");
		createCustom();
	}
	if (evt.target.id === "addNoteInput") {
		$("#customNotesList").append('<li><input class="form-control" type="text"  value=""></li>');
		}
	if (evt.target.id === "cancelCustom") {
		$("#custom_input_container").hide("slide", function() {
		$("#checkboxes").show("fade");
		});
	}
});
	
// create a list of all custom dances with edit and delete buttons
function renderEditList(customDances) { 
	for(var i = 0; i < customDances.length; i++) {
		var dancename = customDances[i].name;
		var danceId = customDances[i].id;
		var editListItemHTML= '<li class="' + danceId + ' list-group-item">' + dancename + 
						`<button class="btn btn-primary btn-sm">Edit</button>
						<button class="btn btn-danger btn-sm">Delete</button>					
					</li>`;
		$('#editCustomList').append(editListItemHTML);
	}
}

$('#editCustomDanceButton').click(function() {
	renderEditList(customDances);
});

function deleteCustomDance(item){
	console.log('delete function on ' + item);
	for (let i = 0; i < customDances.length; i++){
		if (customDances[i].id === item) {
			$("#"+item).remove();
			$("input[value="+ item +"]").parent().parent().remove();
			customDances.splice(i, 1);
			$("."+item).remove();
			displayedDances.splice(displayedDances.indexOf(item), 1);
		}
	}
	storeCustomDances(customDances);
	storeDisplayedDances(displayedDances);
}

function renderEditModal(item) {
	idContainer = item;
	$("#editCustomNotesList").empty();
	for (var i = 0; i < customDances.length; i++){  /// prefill custom inputs with existing values.
		if( customDances[i].id === item) {
			$('#editTitle').val(customDances[i].name);
			$('#editSong').val(customDances[i].song);
			$('#editTights').val(customDances[i].tights);
			$('#editShoes').val(customDances[i].shoes);
			var notes = customDances[i].notes;
			console.log(notes);
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
	storeDisplayedDances(displayedDances);
	storeCustomDances(customDances);
	createCheckbox(customId, customTitle, customSong);
	renderNewDance(customId, customTitle, customSong, customTights, customShoes, customNotes, customNum, customDay, customTime);
	$("input[value=" + customId +"]").prop("checked", true);
	$("#editCustomNotesList li").remove();
	document.getElementById('editCustomForm').reset();
	$("#editNumTimeDiv input").val('');
	sort();
	$('#closeEditCustom').click();
};

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
		$("#checkboxes").show("fade");
		});
	}
});

$("#editCustomList").click(function (){
	let li = event.target.parentNode.classList[0];
	if (event.target.textContent === 'Delete') {
		deleteCustomDance(li);
	}
	if (event.target.textContent === 'Edit') {
		$("#checkboxes").hide("slide", function() {
		$("#edit_custom_container").show("slide"); });
		renderEditModal(li);
		$("#close_deleteOrEditModal").click();
	}
});

$("#close_deleteOrEditModal").click( function() {
	$('#editCustomList').empty();
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





