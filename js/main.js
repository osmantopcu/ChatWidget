jQuery(document).ready(function(){
	var accordionsMenu = $('.cd-accordion-menu');
	if( accordionsMenu.length > 0 ) {
		
		accordionsMenu.each(function(){
			var accordion = $(this);
			//detect change in the input[type="checkbox"] value
			accordion.on('change', 'input[type="checkbox"]', function(){
				var checkbox = $(this);
				( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);

				if (checkbox.prop('checked')){
					var list = checkbox.siblings('ul');
					if (list.attr('id') != 'actions') {
						
							var selected = $('ul.selected');
							selected.attr('style', 'display:block;').slideUp(300);
							selected.removeClass('selected');
						
							list.addClass('selected');
						 
					}
					
				}
				else {
					
				}
				
			});
		});
	}
});