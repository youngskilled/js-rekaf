/**
 * 
 * Initiate with        $(selector).rekaf({'some':'property'});
 * Invoke methods with  $(selector).rekaf('method', {'some':'property'});
 *  
 * -----------------
 * Structure:
 * -----------------
 *  
 * Following structure is required for selector to work. 
 * div>span[data-orig-text=orig]+ul>li*3
 *  
 * -----------------
 * Properties:
 * -----------------
 *
 * 'zIndex'          -> integer                     (default 1500)
 *                      define zIndex dropdowns should work at.
 *
 * 'mulitselect'     -> boolean                     (default false)
 *                      enables user to select more than one value
 *
 * 'clickRemoveSelected'-> boolean                     (default false)
 *                      if user clicks on the selected item it will remove it from the list.
 *
 * 'debug'           -> boolean                     (default false)
 *                      Help in debugging the plugin, off for production
 *
*/
;(function($, window) {
	
	var priv = {
		init: function() {
			var $this = this;

			priv.enableEvents.apply($this);
		},
		enableEvents: function() {
			var $this = this;

			$this.on('click', 'span', function() {
				if(!$this.hasClass('rekaf-opened')) {
					$this.addClass('rekaf-opened').css('z-index', ($this.set.zIndex + 2)).find('ul').show();
					$('#rekaf-screen').show();
				} else {
					closeList();
				}
			});

			$this.on('click', 'li', function() {
				var $li = $(this),
					text = $li.text(),
					isSelected = $li.hasClass('selected');

				if($li.find('.' + $this.set.disabledClass).length > 0 || $li.hasClass($this.set.disabledClass)) return;

				if($li.find('.remove').length > 0) $this.removeClass('selected');

				if($this.set.multiselect === true) {
					$li.toggleClass('selected');
					if($this.find('.selected').length > 0) {
						$this.addClass('selected').find('span').addClass('selected');
					} else {
						$this.removeClass('selected').find('span').removeClass('selected');
					}
				} else {
					$this.find('.selected').removeClass('selected');
					if(isSelected && $this.set.clickRemoveSelected) {
						//Reset to default
						$this.removeClass('selected').find('span').text($this.find('span').data('orig-text'));
					} else {
						$li.addClass('selected');
						$this.addClass('selected').find('span').text(text);
					}
				}
				closeList();
			});

			$('#rekaf-screen').on('click', function() {
				closeList();                
			});

			function closeList() {
				$('.rekaf-opened').removeClass('rekaf-opened').css('z-index', $this.set.zIndex).find('ul').hide();
				$('#rekaf-screen').hide();
			}

		}
	};

	var methods = {
		init: function(options) {

			var init = $.extend({}, defaultOpts, options),
				bgColor = '';
			

			if(init.debug === true) {
				if(this.length === 0) {
					console.warn('No objects found for $.rekaf >>> Maybe not generated from JS yet?');
					return;
				}
				bgColor = 'background-color: blue; ';
			}

			//Create a screen
			$('body').prepend('<div id="rekaf-screen" style="position: fixed; top: 0; left: 0; ' + bgColor + 'width: 100%; height: 2000px; z-index: ' + (init.zIndex + 1) + '; display: none;"></div>');

			return this.each(function() {
				var $this = $(this),
					objectData = $this.data();

				$this.set = $.extend({}, init, objectData);

				if($this.set.debug === true) {
					console.warn(':::: YS Filter Debug has been set to true ::::');
					console.log('Options -> ', $this.set);
				}

				//Make sure that the selects are of a higher z-index than the screen.
				$this.css({
					'z-index': $this.set.zIndex,
					'position': 'relative'
				});

				priv.init.apply($this);
				$this.data($this.set);

			});
		}
	};

	var defaultOpts = {
		zIndex: 1500,
		mulitselect: false,
		clickRemoveSelected: false,
		disabledClass: 'disabled',
		debug: false
	};

	$.fn.rekaf = function(method) {

		//Arguments local variable to all functions.
		if (methods[method]) {
			//If explicitly calling a method.
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			//If method is an "object" (can also be an array) or no arguments passed to the function.
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.rekaf');
		}

	};
	
})(jQuery, window);
