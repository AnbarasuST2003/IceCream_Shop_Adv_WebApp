jQuery(document).ready(function () {
	$.ajax({
		url: `http://localhost:8080/${$(form).attr('action')}`,
		type: "GET",
		dataType: "json",
	}).done(function (response) {
		if (response.success === true) {
			console.log("login successfull");
		} else {
			console.log(response);
		}
	});
});
