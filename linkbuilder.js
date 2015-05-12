$(document).ready(_initialize_generate_form);

function _generate_tracking_code()
{
	var url = $('#url').val();
	var sf_fields = {
		nc: $('#nc').val(),
		SecondaryParameter: $('#secondaryParam').val(),
		d: $('#org62Driver').val(),
		Org62NameCapture: $('#org62NameCapture').val(),
		ls: $('#ls').val(),
		lssm: $('#lssm').val(),
		lss: $('#lss').val(),
		camp: $('#camp').val()
	};
	var utm_fields = {
		source: $('#source').val(),
		medium: $('#medium').val(),
		content: $('#camp').val()
	};
	var event_fields = {
		category: $('#category').val(),
		action: $('#action').val(),
		label: $('#label').val()
	};

	var url_params = [];

	for (var key in sf_fields) {
		if (sf_fields[key]) {
			url_params.push(key + '=' + sf_fields[key]);
		}
	}
	$('.link-output .internal-link-output code').text(
		'<a class="trackable" href="' + url + (url_params.length > 0 ? '?'+url_params.join('&') : '') +
		'" data-category="' + event_fields.category + '" data-action="' + event_fields.action + 
		'" data-label="' + event_fields.label + '"></a>'
	);

	for (var key in utm_fields) {
		if (utm_fields[key]) {
			url_params.push(key + '=' + utm_fields[key]);
		}
	}

	$('.link-output .external-link-output code').text(
		url + (url_params.length > 0 ? '?'+url_params.join('&') : '')
	);

	return false;
}

function _initialize_generate_form()
{
	// Hook up the generate and clear buttons
	$('.link-builder button[name="generate"]').click(_generate_tracking_code);
	$('.link-builder button[name="clear"]').click(function() {
		$('.link-builder input').val('');
		$('.link-output code').text('...');
		return false;
	});

	// Hook up the dropdowns
	$('.dropdown-menu li a').click(function() {
		var group = $(this).parents('.input-group');
		$('input', group).val($(this).text());
	});

	// Setup the copy buttons
	var copyInternal = new ZeroClipboard($('#copy-button-internal'), {moviePath: '/dmk-et-analytics/js/ZeroClipboard.swf'});
	var copyExternal = new ZeroClipboard($('#copy-button-external'), {moviePath: '/dmk-et-analytics/js/ZeroClipboard.swf'});
}
