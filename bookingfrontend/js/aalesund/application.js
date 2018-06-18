var building_id_selection = "";
var regulations_select_all = "";

$(document).ready(function ()
{
	$("#start_date").change(function ()
	{
		$("#end_date").val($("#start_date").val());
	});

	// temp disable input while calendar is preping
	const inputs = document.querySelectorAll(".date-container");
	inputs.forEach(ele => {
		let getInputs = ele.querySelectorAll("input");
		getInputs.forEach(ele => {
			ele.setAttribute("disabled", true);
		});
	});

	// add event to add date
	document.querySelector("#add-date-link").addEventListener("click", () => setTimeout(function() {
		cloneInputs();
	}, 100));

	// add stylesheets
	addStyleSheets();

	// remove jQuery calendar onload
	removeCalendar();
	JqueryPortico.autocompleteHelper(phpGWLink('bookingfrontend/', {menuaction: 'bookingfrontend.uibuilding.index'}, true), 'field_building_name', 'field_building_id', 'building_container');

	$("#field_activity").change(function ()
	{
		var building_id = $('#field_building_id').val();
		if (building_id)
		{
			populateTableChkResources(building_id, initialSelection);
		}

		var oArgs = {menuaction: 'bookingfrontend.uiapplication.get_activity_data', activity_id: $(this).val()};
		var requestUrl = phpGWLink('bookingfrontend/', oArgs, true);

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: requestUrl,
			success: function (data)
			{
				var html_agegroups = '';
				var html_audience = '';

				if (data != null)
				{
					var agegroups = data.agegroups;
					for (var i = 0; i < agegroups.length; ++i)
					{
						html_agegroups += "<tr>";
						html_agegroups += "<th>" + agegroups[i]['name'] + "</th>";
						html_agegroups += "<td>";
						html_agegroups += "<input class=\"input50\" type=\"text\" name='male[" + agegroups[i]['id'] + "]' value='0'></input>";
						html_agegroups += "</td>";
						html_agegroups += "<td>";
						html_agegroups += "<input class=\"input50\" type=\"text\" name='female[" + agegroups[i]['id'] + "]' value='0'></input>";
						html_agegroups += "</td>";
						html_agegroups += "</tr>";
					}
					$("#agegroup_tbody").html(html_agegroups);

					var audience = data.audience;
					var checked = '';
					for (var i = 0; i < audience.length; ++i)
					{
						checked = '';
						if (initialAudience)
						{
							for (var j = 0; j < initialAudience.length; ++j)
							{
								if (audience[i]['id'] == initialAudience[j])
								{
									checked = " checked='checked'";
								}
							}
						}
						html_audience += "<li>";
						html_audience += "<label>";
						html_audience += "<input type=\"radio\" name=\"audience[]\" value='" + audience[i]['id'] + "'" + checked + "></input>";
						html_audience += audience[i]['name'];
						html_audience += "</label>";
						html_audience += "</li>";
					}
					$("#audience").html(html_audience);
				}
			}
		});
	});

});

$(window).on('load', function()
{
	building_id = $('#field_building_id').val();
	regulations_select_all = initialAcceptAllTerms;
	resources = initialSelection;
	if (building_id)
	{
		populateTableChkResources(building_id, initialSelection);
		populateTableChkRegulations(building_id, initialDocumentSelection, resources);
		building_id_selection = building_id;
	}
	$("#field_building_name").on("autocompleteselect", function (event, ui)
	{
		var building_id = ui.item.value;
		var selection = [];
		var resources = [];
		if (building_id != building_id_selection)
		{
			populateTableChkResources(building_id, initialSelection);
			populateTableChkRegulations(building_id, selection, resources);
			building_id_selection = building_id;
		}
	});
	$('#resources_container').on('change', '.chkRegulations', function ()
	{
		var resources = new Array();
		$('#resources_container input.chkRegulations[name="resources[]"]:checked').each(function ()
		{
			resources.push($(this).val());
		});
		var selection = [];
		populateTableChkRegulations(building_id_selection, selection, resources);
	});

	if (!$.formUtils)
	{
		$('#application_form').submit(function (e)
		{
			if (!validate_documents())
			{
				e.preventDefault();
				alert(lang['You must accept to follow all terms and conditions of lease first.']);
			}
		});
	}
});

if ($.formUtils)
{
	$.formUtils.addValidator({
		name: 'regulations_documents',
		validatorFunction: function (value, $el, config, languaje, $form)
		{
			var n = 0;
			$('#regulation_documents input[name="accepted_documents[]"]').each(function ()
			{
				if (!$(this).is(':checked'))
				{
					n++;
				}
			});
			var v = (n == 0) ? true : false;
			return v;
		},
		errorMessage: 'You must accept to follow all terms and conditions of lease first.',
		errorMessageKey: ''
	});

	$.formUtils.addValidator({
		name: 'target_audience',
		validatorFunction: function (value, $el, config, languaje, $form)
		{
			var n = 0;
			$('#audience input[name="audience[]"]').each(function ()
			{
				if ($(this).is(':checked'))
				{
					n++;
				}
			});
			var v = (n > 0) ? true : false;
			return v;
		},
		errorMessage: 'Please choose at least 1 target audience',
		errorMessageKey: ''
	});

	$.formUtils.addValidator({
		name: 'number_participants',
		validatorFunction: function (value, $el, config, languaje, $form)
		{
			var n = 0;
			$('#agegroup_tbody input').each(function ()
			{
				if ($(this).val() != "" && $(this).val() > 0)
				{
					n++;
				}
			});
			var v = (n > 0) ? true : false;
			return v;
		},
		errorMessage: 'Number of participants is required',
		errorMessageKey: ''
	});

	$.formUtils.addValidator({
		name: 'application_resources',
		validatorFunction: function (value, $el, config, language, $form)
		{
			var n = 0;
			$('#resources_container table input[name="resources[]"]').each(function ()
			{
				if ($(this).is(':checked'))
				{
					n++;
				}
			});
			var v = (n > 0) ? true : false;
			return v;
		},
		errorMessage: 'Please choose at least 1 resource',
		errorMessageKey: 'application_resources'
	});

	$.formUtils.addValidator({
		name: 'customer_identifier',
		validatorFunction: function (value, $el, config, languaje, $form)
		{
			var v = false;
			var customer_ssn = $('#field_customer_ssn').val();
			var customer_organization_number = $('#field_customer_organization_number').val();
			if (customer_ssn != "" || customer_organization_number != "")
			{
				v = true;
			}
			return v;
		},
		errorMessage: 'Customer identifier type is required',
		errorMessageKey: ''
	});

	$.formUtils.addValidator({
		name: 'application_dates',
		validatorFunction: function (value, $el, config, languaje, $form)
		{
			var n = 0;
			if ($('input[name="from_[]"]').length == 0 || $('input[name="from_[]"]').length == 0)
			{
				return false;
			}
			$('input[name="from_[]"]').each(function ()
			{
				if ($(this).val() == "")
				{
					$($(this).addClass("error").css("border-color", "red"));
					n++;
				}
				else
				{
					$($(this).removeClass("error").css("border-color", ""));
				}
			});
			$('input[name="to_[]"]').each(function ()
			{
				if ($(this).val() == "")
				{
					$($(this).addClass("error").css("border-color", "red"));
					n++;
				}
				else
				{
					$($(this).removeClass("error").css("border-color", ""));
				}
			});
			var v = (n == 0) ? true : false;
			return v;
		},
		errorMessage: 'Invalid date',
		errorMessageKey: ''
	});
}
else
{
	function validate_documents()
	{
		var n = 0;
		$('#regulation_documents input[name="accepted_documents[]"]').each(function ()
		{
			if (!$(this).is(':checked'))
			{
				n++;
			}
		});
		var v = (n == 0) ? true : false;
		return v;
	}
}

function cloneInputs() {
	// removes the event listeners from inputs by replacing them with a clone
	//document.querySelector("#add-date-link").remove();
	const inputs = document.querySelectorAll(".date-container");
	inputs.forEach(ele => {
		let getInputs = ele.querySelectorAll("input");
		getInputs.forEach(ele => {
			let oldEle = ele;
			oldEle.removeAttribute("disabled", true);
			oldEle.classList.add("cloned");

			let newEle = oldEle.cloneNode(true);

			// add new event to the cloned element
			newEle.addEventListener("click", openCalendar);

			// replace old element with its clone
			oldEle.parentNode.replaceChild(newEle, oldEle);
		})
	});
}

function removeCalendar() {
	// 1s delay due to elements are loaded via php include scripts
	setTimeout(function(){
		// replace the inputs with cloned elements of itself to remove stubborn events
		cloneInputs();
		// removes old calender @TODO: disable the jQuery calendar to start in the first place
		const jQueryDatepicker = document.querySelectorAll(".xdsoft_datetimepicker");
		jQueryDatepicker.forEach(datepicker => {
			datepicker.remove();
		});

		// removes the jQuery script
		const scripts = document.querySelectorAll("script");
		scripts.forEach(script => {
			if (script.src === "http://aktivby.alesund.kommune.no/phpgwapi/js/datetimepicker/js/jquery.datetimepicker.full.min.js") {
				script.remove();
			}
		});
	}, 1000);
}

function addStyleSheets() {
	// add calendar CSS file
	const calendarCSS = document.createElement("link");
	calendarCSS.type = "text/css";
	calendarCSS.rel = "stylesheet";
	calendarCSS.href = "http://aktivby.alesund.kommune.no/bookingfrontend/css/calendar.css";
	let links = document.querySelectorAll("link");
	document.querySelector("head").insertBefore(calendarCSS, links[links.length - 1]);

	// add font awesome
	const fontAwsome = document.createElement("link");
	fontAwsome.type = "text/css";
	fontAwsome.rel = "stylesheet";
	fontAwsome.href = "https://use.fontawesome.com/releases/v5.0.13/css/all.css";
	document.querySelector("head").insertBefore(fontAwsome, links[links.length - 1]);
}

// vars to hold selected input
let selectedInputStart;
let selectedInputEnd;
let dateContainers = [];
let currentContainer;
function openCalendar() {
	// determine wich calendar is opened by usings its ID as identifier | start OR end
	let calendarType = this.id.split("_"); // this line needs to be changed if the ID of the inputs are modified

	// add container to array
	currentContainer = this.parentElement.parentElement;
	if (!dateContainers.includes(this.parentElement.parentElement)) {
		dateContainers.push(this.parentElement.parentElement);
		console.log(dateContainers);
	}
	
	if (calendarType[0] === "start") {
		calendarType = "start";
		selectedInputStart = this;
		selectedInputEnd = this.parentElement.parentElement.childNodes[2].childNodes[2];
	}

	else if (calendarType[0] === "end") {
		calendarType = "end";
		selectedInputStart = this.parentElement.parentElement.childNodes[2].childNodes[2];
		selectedInputEnd = this;
	}

	else if (calendarType[1] === "start") {
		calendarType = "start";
		selectedInputStart = this;
		selectedInputEnd = this.parentElement.parentElement.childNodes[2].childNodes[1];
	}

	else if (calendarType[1] === "end") {
		calendarType = "end";
		selectedInputStart = this.parentElement.parentElement.childNodes[1].childNodes[1];
		selectedInputEnd = this;
	}

	console.log(selectedInputEnd);
	createCalendar(calendarType);
}

function createCalendar(type) {
	// calendar element
	const calendar = document.createElement("div");
	calendar.className = "modal fade";
	calendar.setAttribute("tabindex", "-1");
	calendar.setAttribute("role", "dialog");
	calendar.setAttribute("data-backdrop", "static");

	// main structure of the calendar
	const calendarDialog = document.createElement("div");
	calendarDialog.className = "modal-dialog modal-dialog-centered";
	calendarDialog.setAttribute("role", "document");

	/****************** START MODAL HEADER **************/
	// content of the calendar
	const calendarContent = document.createElement("div");
	calendarContent.className = "modal-content";

	// calendar header
	const calendarHeader = document.createElement("div");
	calendarHeader.className = "modal-header container";
	
	// heading of the calendar
	const calendarHeading = document.createElement("h1");
	calendarHeading.className = "modal-title";

	const calendarIntro = document.createElement("span");
	calendarIntro.className = "calendarIntro";
	if (type === "start") {
		calendarHeading.innerHTML = "Fra dato";
		selectedToTime = 0;
	}

	else {
		calendarHeading.innerHTML = "Til dato";
		selectedFromTime = 0;
	}

	// append intro to the heading as a span
	calendarHeading.appendChild(calendarIntro);

	// exit modal button
	const exitModalBtn = document.createElement("button");
	exitModalBtn.className = "close";
	exitModalBtn.setAttribute("type", "button");
	exitModalBtn.setAttribute("data-dismiss", "modal");
	exitModalBtn.style.paddingTop = "0px";

	const exitIcon = document.createElement("span");
	exitIcon.setAttribute("aria-hidden", "true");
	exitIcon.innerHTML = "&times;";
	exitIcon.style.fontSize = "35px";

	// append icon to button
	exitModalBtn.appendChild(exitIcon);

	// removes the modal on click
	exitModalBtn.addEventListener("click", () => removeModal());

	// top border
	const topBorder = document.createElement("div");
	topBorder.className = "topBorder";

	// append elements to calendar header
	calendarHeader.appendChild(calendarHeading);
	calendarHeader.appendChild(exitModalBtn);

	/****************** END MODAL HEADER **************/

	/****************** START MODAL BODY **************/
	const calendarBody = document.createElement("div");
	calendarBody.className = "modal-body";
	calendarBody.appendChild(topBorder);

	const navigation = document.createElement("div");
	navigation.className = "col sm navigationContainer";

	const prev = document.createElement("button");
	prev.className = "prevMonth";
	prev.innerHTML = "<i class='fas fa-chevron-left'></i>";

	prev.addEventListener("click", function() {
		mode = false;
		loadCalendar();
	});

	const next = document.createElement("button");
	next.className = "nextMonth";
	next.innerHTML = "<i class='fas fa-chevron-right'></i>";
	next.addEventListener("click", function() {
		mode = true;
		loadCalendar();
	});

	const month = document.createElement("h4");
	month.id = "currentMonth";

	navigation.appendChild(prev);
	navigation.appendChild(next);
	navigation.appendChild(month);

	calendarBody.appendChild(navigation);
	/****************** END MODAL BODY **************/

	/****************** START MODAL FOOTER **************/
	const calendarFooter = document.createElement("div");
	calendarFooter.className = "modal-footer";

	const cancelBtn = document.createElement("button");
	cancelBtn.className = "btn calendarCancel";
	cancelBtn.setAttribute("type", "button");
	cancelBtn.setAttribute("data-dismiss", "modal");
	cancelBtn.innerHTML = "Avbryt";
	cancelBtn.addEventListener("click", () => removeModal());

	const confirmBtn = document.createElement("button");
	confirmBtn.className = "btn calendarConfirm";
	confirmBtn.setAttribute("type", "button");
	confirmBtn.innerHTML = "Bekreft";
	confirmBtn.addEventListener("click", () => setTime());

	const errorMsg = document.createElement("p");
	errorMsg.id = "calendarError";

	calendarFooter.appendChild(errorMsg);
	calendarFooter.appendChild(cancelBtn);
	calendarFooter.appendChild(confirmBtn);

	/****************** END MODAL FOOTER **************/

	// append to calendar
	calendarContent.appendChild(calendarHeader);
	calendarContent.appendChild(calendarBody);
	calendarContent.appendChild(calendarFooter);
	calendarDialog.appendChild(calendarContent);
	calendar.appendChild(calendarDialog);

	// append to DOM
	document.querySelector("body").appendChild(calendar);

	// open calendar
	loadCalendar();
	$(calendar).modal("show");
}

//removes the element from the DOM after 0.5 sec to preserve fade animation
function removeModal() {
	setTimeout(function() {
		const modals = document.querySelectorAll(".modal");
		modals.forEach(modal =>  {
			modal.remove();
		});
		
		currentMonth =  new Date().getMonth() + 2;
		currentYear = new Date().getFullYear();
		mode = false;
	}, 500);
}

// vars for date selection
const now = new Date();
let currentMonth = now.getMonth() + 2;
let currentYear = new Date().getFullYear();
let mode;

// load up the calendar and display stats
function loadCalendar() {
	// removes all old elements before recreating
	const oldCalender = document.querySelectorAll(".calendarContainer");
	oldCalender.forEach(ele => {
		ele.remove();
	});

	const parent = document.querySelector(".modal-body");
	const calendarContainer = document.createElement("div");
	calendarContainer.className = "calendarContainer row";
	
	// update year and month
	if (mode) {
		currentMonth++;
		if (currentMonth === 13) {
			currentMonth = 1;
			currentYear++;
		}
	}

	else {
		currentMonth--;
		if (currentMonth === 0) {
			currentMonth = 12;
			currentYear--;
		}
	}

	let dayCount = 0;
	const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

	const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

	console.log(currentMonth);
	console.log(currentYear);

	// display current month
	document.querySelector("#currentMonth").innerHTML = "<span class='year'>" + currentYear + "</span><br><span class='date'></span><span class='month'>" + months[currentMonth - 1] + "</span><br><span class='clock'><span></span><span id='timeSplitter'>:</span><span></span></span>";

	for (let i = 1; i < daysInCurrentMonth + 1; i++) {

		// create day with its day number
		let day = document.createElement("div");
		day.className = "calendarDay";
		let dayNr = document.createElement("h5");
		dayNr.className = "dayNr";
		dayNr.innerHTML = i;

		// add event to the day
		day.addEventListener("click", selectDate);

		// filter out the weekends
		dayCount++;
		if (dayCount === 6 || dayCount === 7) {
			day.classList.add("weekend");
			if (dayCount === 7) {
				dayCount = 0;
			}
		}

		// append to the parent set as parameter
		day.appendChild(dayNr);
		if (dayNr.innerHTML == now.getDate()) {
			dayNr.click();
		}
		calendarContainer.appendChild(day);
	}

	const calendarSliders = document.createElement("div");
	calendarSliders.className = "slideContainer";
	const sliderHeading = document.createElement("h5");
	sliderHeading.innerHTML = "Vennligst velg et klokkeslett";

	const hourLabel = document.createElement("p");
	hourLabel.innerHTML = "Time";

	const hourSlider = document.createElement("input");
	hourSlider.setAttribute("type", "range");
	hourSlider.setAttribute("min", 0);
	hourSlider.setAttribute("max", 23);
	hourSlider.className = "slider";
	hourSlider.id = "hourSlider";

	const minSlider = document.createElement("input");
	minSlider.setAttribute("type", "range");
	minSlider.setAttribute("min", 0);
	minSlider.setAttribute("max", 59);
	minSlider.className = "slider";
	minSlider.id = "minSlider";

	const minLabel = document.createElement("p");
	minLabel.innerHTML = "Minutt";
	
	calendarSliders.appendChild(sliderHeading);
	calendarSliders.appendChild(hourLabel);
	calendarSliders.appendChild(hourSlider);
	calendarSliders.appendChild(minLabel);
	calendarSliders.appendChild(minSlider);
	calendarContainer.appendChild(calendarSliders);

	parent.appendChild(calendarContainer);

	// init slider
	slider();
}

// select a date
function selectDate() {
	removeActive();
	this.classList.add("activeDay");
	document.querySelector(".date").innerHTML = this.innerHTML;
}

// remove active dates
function removeActive() {
	const activeDays = document.querySelectorAll(".activeDay");
	activeDays.forEach(ele => {
		ele.classList.remove("activeDay");
	});
}

// init and display slider values
function slider() {
	// get elements and values
	const hour = document.querySelector("#hourSlider");
	const min = document.querySelector("#minSlider");
	const output = document.querySelector(".clock");

	// set values to current time
	hour.value = now.getHours();
	min.value = now.getMinutes();
	if (hour.value < 10) {
		output.childNodes[0].innerHTML = "0" + hour.value;
	}

	else {
		output.childNodes[0].innerHTML = hour.value;
	}

	if (min.value < 10) {
		output.childNodes[2].innerHTML = "0" + min.value;
	}

	else {
		output.childNodes[2].innerHTML = min.value;
	}

	/********** Update the current slider value **********/
	// display selected hours
	hour.oninput = function() {
		if (hour.value < 10) {
			output.childNodes[0].innerHTML = "0" + hour.value;
		}

		else {
			output.childNodes[0].innerHTML = hour.value;
		}
	}

	// display selected mins
	min.oninput = function() {
		if (min.value < 10) {
			output.childNodes[2].innerHTML = "0" + min.value;
		}

		else {
			output.childNodes[2].innerHTML = min.value;
		}
	}
}

// set the selected time
let selectedToTime = 0;
let selectedFromTime = 0;
let selectedDates = [];
function setTime() {
	// get the selected time
	let dd = document.querySelector(".date").childNodes[0].innerHTML;
	if (dd < 10) {
		dd = "0" + dd;
	}

	let mm = currentMonth;
	if (mm < 10) {
		mm = "0" + mm;
	}

	// yr, hr, min
	const yyyy = currentYear;
	let hour = document.querySelector("#hourSlider").value;
	let min = document.querySelector("#minSlider").value;

	// check for valid date
	const sec = now.getSeconds();
	const selectedTime = new Date(yyyy, currentMonth - 1, dd, hour, min, sec + 1).getTime();

	if (selectedTime < now.getTime()) {
		document.querySelector("#calendarError").innerHTML = "Man ikke kan ikke booke tilbake i tid, vennligst velg en ny dato";
		return;
	}

	if (hour < 10) {
		hour = "0" + hour;
	}

	if (min < 10) {
		min = "0" + min;
	}

	// formated date
	const formatedDate = dd + "/" + mm + "/" + yyyy + " " + hour + ":" + min;
	// check for input to pass data
	const selected = document.querySelector(".modal-title").innerHTML.split(" ")[0].toLowerCase(); // fra / til
	const startDate = selectedInputStart;
	const endDate = selectedInputEnd;
	let index;
	if (selected === "fra") {
		selectedToTime = selectedTime;
		index = selectedDates[dateContainers.indexOf(currentContainer)] = [selectedFromTime, selectedToTime];
		if (index[0] === 0 && index[0] < index[1]) {
			// set value
			startDate.value = formatedDate;
			if (endDate.value === "") {
				setTimeout(function() {
					endDate.click();
				}, 750);
			}
		}

		else if (index[1] < index[0]) {
			console.log(2);
			startDate.value = formatedDate;
			if (endDate.value === "") {
				setTimeout(function() {
					endDate.click();
				}, 750);
			}
		}

		else {
			console.log(3);
			if (index[1] < index[0]) {
				startDate.value = formatedDate;
			}

			else {
				document.querySelector("#calendarError").innerHTML = "Fra tid er større en til tid, vennligst velg en ny dato";
				return;
			}
		}
	}

	else {
		selectedFromTime = selectedTime;
		if (selectedFromTime > selectedToTime) {
			// set value
			endDate.value = formatedDate;
			index = selectedDates[dateContainers.indexOf(currentContainer)] = [selectedFromTime, selectedToTime];
			console.log(index);
			if (index[0] != 0 && index[1] > index[0]) {
				document.querySelector("#calendarError").innerHTML = "Fra tid er større en til tid, vennligst velg en ny dato";
				return;
			}

			if (startDate.value === "") {
				setTimeout(function() {
					startDate.click();
				}, 750);
			}
		}

		else {
			document.querySelector("#calendarError").innerHTML = "Til tid er mindre en fra tid, vennligst velg en ny dato";
			return;
		}
	}

	// remove modal after setting time
	document.querySelector(".calendarConfirm").setAttribute("data-dismiss", "modal");
	removeModal();
}

function populateTableChkResources(building_id, selection)
{
	var oArgs = {menuaction: 'bookingfrontend.uiresource.index_json', sort: 'name', filter_building_id: building_id, sub_activity_id: $("#field_activity").val()};
	var url = phpGWLink('bookingfrontend/', oArgs, true);
	var container = 'resources_container';
	var colDefsResources = [{label: '', object: [{type: 'input', attrs: [
						{name: 'type', value: 'checkbox'}, {name: 'name', value: 'resources[]'}, {name: 'class', value: 'chkRegulations'}
					]}
			], value: 'id', checked: selection}, {key: 'name', label: lang['Name']}, {key: 'type', label: lang['Resource Type']}
	];
	populateTableResources(url, container, colDefsResources);
}

function populateTableChkRegulations(building_id, selection, resources)
{
    var url = phpGWLink('bookingfrontend/', {menuaction: 'booking.uidocument_view.regulations', sort: 'name'}, true) + '&owner[]=building::' + building_id;
	for (var r in resources)
	{
		url += '&owner[]=resource::' + resources[r];
	}
	var container = 'regulation_documents';
	var colDefsRegulations = [{label: lang['Accepted'], object: [
				{type: 'input', attrs: [
						{name: 'type', value: 'checkbox'}, {name: 'name', value: 'accepted_documents[]'}
					]}
			], value: 'id', checked: selection}, {key: 'name', label: lang['Document'], formatter: genericLink}
	];
	if (regulations_select_all)
	{
		colDefsRegulations[0]['object'][0]['attrs'].push({name: 'checked', value: 'checked'});
	}
	regulations_select_all = false;
	populateTableRegulations(url, container, colDefsRegulations);
}

function populateTableResources(url, container, colDefs)
{
	if (typeof tableClass !== 'undefined')
	{
		createTable(container, url, colDefs, 'results', tableClass);
	}
	else
	{
		createTable(container, url, colDefs, 'results', 'table table-hover table-borderless');
	}
}

function populateTableRegulations(url, container, colDefs)
{
	if (typeof tableClass !== 'undefined')
	{
		createTable(container, url, colDefs, '', tableClass);
	}
	else
	{
		createTable(container, url, colDefs, '', 'table table-hover table-borderless');
	}

}
