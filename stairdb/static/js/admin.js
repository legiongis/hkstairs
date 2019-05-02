(function($){

	$('.pull-stairquest-data').click(function(e) {
		e.preventDefault();

	    $.ajax({ 
	        type: 'GET', 
	        url: $(this).attr('href'), 
	        //data: { format: 'json' }, 
	        success: function (data) { 
	            var stairquest_stair = data
	            //console.log(stairquest_stair);
	            if(stairquest_stair[0]) {

					update_field('id_name', stairquest_stair[0].current_name );
	            	update_field('id_handrail', stairquest_stair[0].handrails );
	            	update_field('id_stair_ct', stairquest_stair[0].stepcount );
	            	update_field('id_location', stairquest_stair[0].location );
	            	update_field('id_type', stairquest_stair[0].type );
	            }
	        }
	    });
	});


	function update_field( id, newvalue ) {
		if( newvalue.toString().trim() != $('#'+id).val() ) {
			if( id == 'id_name' && newvalue.trim().match(/^Stair (\d+)/)) {
				return;
			}
			//console.log('updating id: '+newvalue)
			$('#'+id).val( newvalue.trim() );

			if( newvalue.toString().trim() == $('#'+id).val() ) 
				$('#'+id).addClass('unsaved-changes')
		}
	}


})(jQuery);