jQuery(document).ready(function($){

	//vars
	var ajaxurl			= idea_factory.ajaxurl,
		results         = $('#idea-factory--entry--form-results'),
		thanks_voting   = idea_factory.thanks_voting,
		already_voted   = idea_factory.already_voted,
		error_message 	= idea_factory.error_message;


	// entry handler
		$('#idea-factory--entry--form').submit(function(e) {

			var $this = $(this);

			e.preventDefault();

			var errors = '';

			var title = $('#idea-factory--entryform_title');
			if ( $.trim( title.val() ) === '' ) {
				errors += 'Please fill out a title.<br/>'
				title.addClass('error');
			}
			else {
				title.removeClass('error');
			}

			var name = $('#idea-factory--entryform_name');
			if ( $.trim( name.val() ) === '' ) {
				errors += 'Please fill out your name.<br/>'
				name.addClass('error');
			}
			else {
				name.removeClass('error');
			}

			var email = $('#idea-factory--entryform_email');
			if ( $.trim( email.val() ) === '' ) {
				errors += 'Please fill out your email.<br/>'
				email.addClass('error');
			}
			else {
				email.removeClass('error');
			}

			var description = $('#idea-factory--entryform_description');
			if ( $.trim( description.val() ) === '' ) {
				errors += 'Please fill out a description.<br/>'
				description.addClass('error');
			}
			else {
				description.removeClass('error');
			}

			if(errors !== '') {
				$(results).html(errors);
				return;
			}

			$this.find(':submit').attr( 'disabled','disabled' );

			var data = $this.serialize();

			$.post(ajaxurl, data, function(response) {
				if(response.length && response !== '0') {
					$(results).html(response);
					$this.find(":submit").attr("disabled", false);
				}
				else {
					location.reload();
				}
			});

		});

	$( '.idea-factory' ).live('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		var data      = {
			action:    $this.hasClass('vote-up') ? 'process_vote_up' : 'process_vote_down',
			user_id:   $this.data('user-id'),
			post_id:   $this.data('post-id'),
			nonce:     idea_factory.nonce
		};

		$.post( ajaxurl, data, function(response) {

			if( response == 'success' ) {

				$this.parent().addClass('voted');
				$this.parent().html( thanks_voting );

			} else if( 'already-voted' == response ) {

				alert( already_voted );

			} else {

				alert( error_message );

			}

		});

	});
});
