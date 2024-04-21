jQuery(document).ready(function () {
	var port = "{{env('PORT')}}";
	$.ajax({
		url: port + '/api/icecream/get',
		type: 'GET',
		dataType: 'json'
	}).done(response, function() {
		if (response.success === true){
			for (let item of response.iceCream) {
				$("#nameTest").text(item.name);
			}
		}else{
			alert(response.error);
		}
	});
});