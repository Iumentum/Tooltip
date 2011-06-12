(function($) {
	tooltipController = function(element, options) {
		this.options	= options;
		this.$element	= element;
		this.gravity	= {};
		this.init();
	};
	
	tooltipController.prototype = {
		init: function() {
			var self = this;
			
			if(typeof this.options.gravity == 'string') {
				this.options.gravity = [this.options.gravity];
			}
			
			this.create();
			
			if(!this.options.maually) {
				this.$element.bind('blur mouseleave', function() {
					self.hide();
				});
			}
			
			$(window).resize(function(a) {
				self.gravity	= {};
			});
			
			this.show();
		},
		
		create: function() {
			this.$tip = $('<div class="tooltip"></div>').html('<div class="tooltip-arrow"></div><div class="tooltip-content">' + this.$element.attr(this.options.titleSelector) + '</div>');
			this.$element.attr(this.options.titleSelector, '');
		},
		
		show: function() {
			this.$tip.css({
				visibility: 'hidden',
				top: 0
			}).appendTo('body');
			
			this.setGravity();

			this.$tip.css({
				visibility: 'visible'
			});
		},
		
		hide: function() {
			this.$tip.removeClass("tooltip-n tooltip-s tooltip-e tooltip-w tooltip-ne tooltip-nw tooltip-se tooltip-sw");
			this.$tip.remove();
		},
		
		setContent: function(content) {
			this.gravity = {};
			this.$tip.find('.tooltip-content').html(content);
			this.setGravity();
		},
		
		setGravity: function() {
			var self		= this;
			var within	= false;
			
			$.each(this.options.gravity, function(key, value) {
				if(!self.gravity[value]) {
					self.gravity[value] = self.getGravity(value);
				}
				
				self.$tip.css(self.gravity[value]);
				
				if (self.outOfBounds()) {
					return true;
				} else {
					self.$tip.addClass('tooltip-' + value);
					within = true;
					return false;
				}
			});
			
			if(!within) {
				var gravity = this.options.gravity[0];
				this.$tip.css(self.gravity[gravity]);
				this.$tip.addClass('tooltip-' + gravity);
			}
		},
		
		getGravity: function(gravity) {
			var position = {};
			var element = $.extend(this.$element.position(), {
             width: this.$element.width(),
             height: this.$element.height()
         });
			var tip = {
             width: this.$tip.width(),
             height: this.$tip.height()
         };
			
			switch (gravity) {
				case 'n':
					 position = {
						top: element.top + (element.height) + this.options.offset,
						left: element.left + (element.width / 2) - (tip.width / 2)
					};
					break;
				case 's':
					position = {
						top: element.top - tip.height - this.options.offset,
						left: element.left + (element.width / 2) - (tip.width / 2)
					};
					break;
				case 'e':
					position = {
						top: element.top,
						left: element.left - tip.width - this.options.offset
					};
					break;
				case 'w':
					position = {
						top: element.top,
						left: element.left + element.width + this.options.offset
					};
					break;
				case 'ne':
					position = {
						top: element.top + element.height + this.options.offset,
						left: (element.width > tip.width) ? element.left - 10 : element.left + (element.width) - tip.width
					};
					break;
				case 'nw':
					position = {
						top: element.top + element.height + this.options.offset,
						left: (element.width > tip.width) ? element.left + element.width - tip.width + 10 : element.left
					};
					break;
				case 'se':
					position = {
						top: element.top - tip.height - this.options.offset,
						left: (element.width > tip.width) ? element.left - 10: element.left + element.width - tip.width
					};
					break;
				case 'sw':
				default:
					position = {
						top: element.top - tip.height - this.options.offset,
						left: (element.width > tip.width) ? element.left + element.width - tip.width + 10 : element.left
					};
					break;
         }
			
			return position;
		},
		
		outOfBounds: function() {
			var tip = $.extend(this.$tip.position(), {
             width: this.$tip.width(),
             height: this.$tip.height()
         });

			var view = {
				top: $(window).scrollTop(),
				left: $(window).scrollLeft(),
				width: $(window).width(),
				height: $(window).height()
			}
			
			if(tip.top < view.top || view.top+view.height < tip.top+tip.height || tip.left < view.left || view.left+view.width < tip.left+tip.width) {
				return true;
			} else {
				return false;
			}
		}
	};
	
	$.fn.tooltip = function(options) {
		var tooltip = $.data($(this)[0], 'tooltip');
		
		if(options === true) {
			return tooltip;
		} else if (typeof options == 'string' && typeof tooltip[options] == 'function' && options != 'init') {
			return tooltip[options]();
		}
		
		options = $.extend({}, $.fn.tooltip.defaults, options);
		
		if (!tooltip) {
			tooltip = new tooltipController(this, options);
			$.data($(this)[0], 'tooltip', tooltip);

			return tooltip;
		} else {
			tooltip.options = $.extend(tooltip.options, options);
			tooltip.show();
		}
	};
	
	$.fn.tooltip.defaults = {
		gravity: ['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w'],
      offset: 5,
      titleSelector: 'title',
		maually: false
	};
})(jQuery);