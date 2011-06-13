Tooltip plugin for jQuery
=========================

What is Tooltip
---------------
Tooltip is a simple jQuery plugin for generating tooltips.

Usage
-----
Do not use title as selector cause the script will remove that attribute.

    $(function() {
      $('a[rel=tooltip]').tooltip({
        gravity: ['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w']
      });
    });

Options
-------
gravity: array or string
	Gravity priority used in order when tooltip falls out of bounds.
	Default: ['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w']

offset: integer
	Distance between element and tooltip.
	Default: 5

titleSelector: string
	The selector of the title text which will be used by the plugin.
	Default: title

live: boolean
	Define if the trigger event should be bound as a live event.
	Default: true

trigger: string
	Define what will trigger the tooltip.
	Default: 'hover'

className: string
	Add class to the tooltip element on creation.
	Default: false

Forking
-------
By forking this project you hereby grant permission for any commits to your fork to be merged back into this repository and, with attribution, be released under the terms of the MIT License.