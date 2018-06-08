var building_id_selection = "";
var regulations_select_all = "";

$(document).ready(function ()
{
	$("#start_date").change(function ()
	{
		$("#end_date").val($("#start_date").val());
	});

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
		const inputs = document.querySelectorAll("#start_date, #end_date");
		inputs.forEach(input => {
			let oldEle = input;
			let newEle = oldEle.cloneNode(true);

			// add new event to the cloned element
			newEle.addEventListener("click", openCalendar);

			// replace old element with its clone
			oldEle.parentNode.replaceChild(newEle, oldEle);
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

		// add calendar CSS file
		const calendarCSS = document.createElement("link");
		calendarCSS.type = "text/css";
		calendarCSS.rel = "stylesheet";
		calendarCSS.href = "http://aktivby.alesund.kommune.no/bookingfrontend/css/calendar.css";
		let links = document.querySelectorAll("link");
		document.querySelector("head").insertBefore(calendarCSS, links[links.length - 1]);
		console.log(calendarCSS);
	}, 1000);
}

function openCalendar() {
	// determine wich calendar is opened by usings its ID as identifier | start OR end
	const calendarType = this.id.split("_")[0]; // this line needs to be changed if the ID of the inputs are modified
	createCalendar(calendarType);
}

function createCalendar(type) {
	// calendar element
	const calendar = document.createElement("div");
	calendar.className = "modal fade";
	calendar.setAttribute("tabindex", "-1");
	calendar.setAttribute("role", "dialog");

	// main structure of the calendar
	const calendarDialog = document.createElement("div");
	calendarDialog.className = "modal-dialog";
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
		calendarIntro.innerHTML = "<br>Vennligst velg datoen du vil booke fra";	
	}

	else {
		calendarHeading.innerHTML = "Til dato";
		calendarIntro.innerHTML = "<br>Vennligst velg datoen du vil booke til";	
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
	// removes the modal on click | removes the element from the DOM after 1 sec to preserve fade animation
	exitIcon.addEventListener("click", () => setTimeout(function(){
		exitIcon.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
	}, 1000));

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
	loadCalendar(calendarBody);
	/****************** END MODAL BODY **************/

	// append to calendar
	calendarContent.appendChild(calendarHeader);
	calendarContent.appendChild(calendarBody);
	calendarDialog.appendChild(calendarContent);
	calendar.appendChild(calendarDialog);

	// append to DOM
	document.querySelector("body").appendChild(calendar);

	// open calendar
	$(calendar).modal("show");
}

function loadCalendar(parent) {
	const calendarContainer = document.createElement("div");
	calendarContainer.className = "calendarContainer row";

	let dayCount = 0;
	for (let i = 1; i < 30; i++) {

		// create day with its day number
		let day = document.createElement("div");
		day.className = "calendarDay";
		let dayNr = document.createElement("h5");
		dayNr.className = "dayNr";
		dayNr.innerHTML = i;

		// remove left border
		if (i === 1 || i === 8 || i === 15 || i === 22 || i === 29) {
			day.style.borderLeft = "1px solid black";
		}

		else {
			day.style.borderLeft = "none";
		}

		// remove top border
		if (i > 7) {
			day.style.borderTop = "none";
		}

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
		calendarContainer.appendChild(day);
	}

	parent.appendChild(calendarContainer);
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
