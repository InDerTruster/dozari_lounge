$(document).ready(function name(params) {

	$('.popup_reserve').click(function (e) {
		e.preventDefault();
		title = $(this).data('title');
		button = $(this).data('button');
		if (title == 'Забронировать столик') {
			$('.reserve_input').css({display: 'block'});
		}else{
			$('.reserve_input').css({display: 'none'});
		}
		$('#modal_feedback .form_title').val(title);
		$('#modal_feedback h3').text(title);
		$('#modal_feedback .purple_button').text(button);
		$('#modal_feedback').fadeIn(500);
	});

	$(".modal_window").bind("click", function (e) {
		e.preventDefault();
		console.log($(e.target).attr("class"));
		if ($(e.target).hasClass('modal_background') || $(e.target).hasClass('modal_close')) {
			$(this).fadeOut(500);
		}
	});

	$('.phone_number').mask('8 (999) 969-83-59');

	$('#modal_feedback input').change(function name(params) {
		
	})

});