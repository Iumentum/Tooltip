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
			
			this.create();
			
			if(this.options.className) {
				this.addClass(this.options.className);
			}
			
			$(window).resize(function(a) {
				self.resetGravity();
			});
		},
		
		create: function() {
			this.$tip = $('<div class="tooltip"></div>').html('<div class="tooltip-arrow"></div><div class="tooltip-content">' + this.$element.attr(this.options.titleSelector) + '</div>');
			this.$element.removeAttr(this.options.titleSelector);
		},
		
		show: function() {
			this.$tip.css({
				visibility: 'hidden',
				top: 0
			}).appendTo('body');
			
			this.setGravity(this.options.gravity);
			
			this.$tip.css({
				visibility: 'visible'
			});
			
			return this;
		},
		
		hide: function() {
			this.$tip.remove();
			
			return this;
		},
		
		html: function(content) {
			this.resetGravity();
			this.$tip.find('.tooltip-content').html(content);
			this.setGravity(this.options.gravity);
			
			return this;
		},
		
		addClass: function(name) {
			this.$tip.addClass(name);
			
			return this;
		},
		
		removeClass: function(name) {
			this.$tip.removeClass(name);
			
			return this;
		},
			
		setGravity: function(gravity) {
			if(typeof gravity == 'string') {
				this.removeClass("tooltip-n tooltip-s tooltip-e tooltip-w tooltip-ne tooltip-nw tooltip-se tooltip-sw");
				
				this.gravity[gravity] = this.getGravity(gravity);
				this.$tip.css(this.gravity[gravity]);
				this.addClass('tooltip-' + gravity);
			} else {
				this.findGravity(gravity);
			}
			
			return this;
		},
		
		findGravity: function(gravity) {
			var self		= this;
			var within	= false;
			
			$.each(gravity, function(key, value) {
				if(!self.gravity[value]) {
					self.gravity[value] = self.getGravity(value);
				}
				
				self.setGravity(value);
				
				if (self.outOfBounds()) {
					return true;
				} else {
					within = true;
					return false;
				}
			});
			
			if(!within) {
				self.setGravity(gravity[0]);
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
		
		resetGravity: function() {
			this.gravity = {};
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
		if(options === true) {
			return get($(this));
		} else if (typeof options == 'string' && options != 'init') {
			var tooltip = get($(this));
			tooltip[options]();
			return tooltip;
		}
		
		options = $.extend({}, $.fn.tooltip.defaults, options);
		
		if (options.trigger == 'manually') {
			this.each(function() {
				get($(this));
			});
			
			return get($(this));
		} else {
			var event	= options.live ? 'live' : 'bind',
				 show		= options.trigger == 'both' ? 'mouseenter focus'	: (options.trigger == 'hover' ? 'mouseenter' : 'focus'),
				 hide		= options.trigger == 'both' ? 'mouseleave blur'		: (options.trigger == 'hover' ? 'mouseleave' : 'blur');
			
			this[event](show, function() {
				var tooltip = get($(this));
				tooltip.show();
			})[event](hide, function() {
				var tooltip = get($(this));
				tooltip.hide();
			});
			
			return tooltip;
		}
		
		function get(element) {
			var tooltip = $.data(element[0], 'tooltip');
			
			if(!tooltip) {
				tooltip = new tooltipController(element, options);
				$.data(element[0], 'tooltip', tooltip);
			}
			
			return tooltip;
		}
	};
	
	$.fn.tooltip.defaults = {
		gravity: ['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w'],
		offset: 3,
		titleSelector: 'title',
		live: true,
		className: false,
		trigger: 'hover'
	};
})(jQuery);