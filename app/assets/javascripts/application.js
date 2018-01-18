// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require ckeditor/init
//= require_tree .


! function($) {

    "use strict";

    var Typed = function(el, options) {

        // chosen element to manipulate text
        this.el = $(el);

        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // attribute to type into
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;

        // show cursor
        this.showCursor = this.isInput ? false : this.options.showCursor;

        // text content of element
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()

        // html or plain text
        this.contentType = this.options.contentType;

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // add a delay before typing starts
        this.startDelay = this.options.startDelay;

        // backspacing speed
        this.backSpeed = this.options.backSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // div containing strings
        this.stringsElement = this.options.stringsElement;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;

        // for stopping
        this.stop = false;

        // custom cursor
        this.cursorChar = this.options.cursorChar;

        // shuffle the strings
        this.shuffle = this.options.shuffle;
        // the order of strings
        this.sequence = [];

        // All systems go!
        this.build();
    };

    Typed.prototype = {

        constructor: Typed

        ,
        init: function() {
            // begin the loop w/ first current string (global self.strings)
            // current string will be passed as an argument each time after this
            var self = this;
            self.timeout = setTimeout(function() {
                for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;

                // shuffle the array if true
                if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                // Start typing
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        }

        ,
        build: function() {
            var self = this;
            // Insert cursor
            if (this.showCursor === true) {
                this.cursor = $("");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                self.strings = [];
                this.stringsElement.hide();
                var strings = this.stringsElement.find('p');
                $.each(strings, function(key, value){
                    self.strings.push($(value).html());
                });
            }
            this.init();
        }

        // pass current string state to each function, types 1 char per call
        ,
        typewrite: function(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // contain typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function() {
                // check for an escape character before a pause value
                // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
                // single ^ are removed from string
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1; // skip atleast 1
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }

                    // strip out the escape character and pause value so they're not printed
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    // skip over html tags while typing
                    var curChar = curString.substr(curStrPos).charAt(0)
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        } else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }

                // timeout for any pause after a character
                self.timeout = setTimeout(function() {
                    if (curStrPos === curString.length) {
                        // fires callback function
                        self.options.onStringTyped(self.arrayPos);

                        // is this the final string
                        if (self.arrayPos === self.strings.length - 1) {
                            // animation that occurs on the last typed string
                            self.options.callback();

                            self.curLoop++;

                            // quit if we wont loop back
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function() {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {

                        /* call before functions if applicable */
                        if (curStrPos === 0)
                            self.options.preStringTyped(self.arrayPos);

                        // start typing each new char into existing string
                        // curString: arg, self.el.html: original text inside element
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }

                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                    }
                    // end of character pause
                }, charPause);

                // humanized value for typing
            }, humanize);

        }

        ,
        backspace: function(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;

            self.timeout = setTimeout(function() {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                // if (self.arrayPos == 1){
                //  self.stopNum = 14;
                // }
                //every other time, delete the whole typed string
                // else{
                //  self.stopNum = 0;
                // }

                if (self.contentType === 'html') {
                    // skip over html tags while backspacing
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }

                // ----- continue important stuff ----- //
                // replace text with base text + typed characters
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;

                        // Shuffle sequence again
                        if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                        self.init();
                    } else
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                }

                // humanized value for typing
            }, humanize);

        }
        /**
         * Shuffles the numbers in the given array.
         * @param {Array} array
         * @returns {Array}
         */
        ,shuffleArray: function(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }

        // Start & Stop currently not working

        // , stop: function() {
        //     var self = this;

        //     self.stop = true;
        //     clearInterval(self.timeout);
        // }

        // , start: function() {
        //     var self = this;
        //     if(self.stop === false)
        //        return;

        //     this.stop = false;
        //     this.init();
        // }

        // Reset and rebuild the element
        ,
        reset: function() {
            var self = this;
            clearInterval(self.timeout);
            var id = this.el.attr('id');
            this.el.after('<span id="' + id + '"/>')
            this.el.remove();
            if (typeof this.cursor !== 'undefined') {
                this.cursor.remove();
            }
            // Send the callback
            self.options.resetCallback();
        }

    };

    $.fn.typed = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('typed'),
                options = typeof option == 'object' && option;
            if (!data) $this.data('typed', (data = new Typed(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    };


}(window.jQuery);



;(function( $, window, document, Math, undefined ) {

    'use strict';
    var pluginName = 'rMenu';

    /**
     * The plugin
     * @param {object} el - The menu container typically a nav element
     * @param {object} options - plugin options object litteral
     * @returns {Plugin}
     * @constructor
     */
    var Plugin = function( el, options ) {

        // Clone this object
        var o = this;

        /**
         * Initialize option defaults and set options =============================
         * @type {{minWidth: string, toggleSel: string, menuSel: string, menuItemsSel: string, transitionSpeed: number, animateBool: string, accelerateBool: string}}
         */
        o.optionsInit = {

            /**
             * Minimum width for expanded layout in pixels - String Should match media query in css file
             * Must be in pixels and include px units if not using Modernizr.
             * @default '769px'
             */
            minWidth: '769px',

            /**
             * The opening and closing speed of the menus in milliseconds
             * @default 400
             */
            transitionSpeed: 400,

            /**
             * The jQuery easing function - used with jQuery transitions
             * @default 'swing'
             * @options 'swing', 'linear'
             */
            jqueryEasing: 'swing',

            /**
             * The CSS3 transitions easing function - used with CSS3 transitions
             * @default 'ease'
             */
            css3Easing: 'ease',

            /**
             * Use button as Toggle Link - instead of text
             * @default true
             */
            toggleBtnBool: true,

            /**
             * The Toggle Link selector
             * @default '.rm-toggle'
             */
            toggleSel: '.rm-toggle',

            /**
             * The menu/sub-menu selector
             * @default 'ul'
             */
            menuSel: 'ul',

            /**
             * The menu items selector
             * @default 'li'
             */
            menuItemsSel: 'li',

            /**
             * Use CSS3 animation/transitions Boolean
             * @default true
             * Do not use animation/transitions: false
             */
            animateBool: true,

            /**
             * Force GPU Acceleration Boolean
             * @default false
             * Do not force: false
             */
            accelerateBool: false,

            /**
             * the setup complete callback function
             * @default 'false'
             */
            setupCallback: false,

            /**
             * the tabindex start value - integer
             * @default 1
             */
            tabindexStart: 1,

            /**
             * Use development mode - outputs information to console
             * @default false
             */
            developmentMode: false
        };
        o.options = $.extend( {}, o.optionsInit, options );

        // Define public objects and vars =========================================

        // Toggle Link object
        o.tButton = $( o.options.toggleSel );

        // The class applied to the toggle Link element to make it a button
        o.tButtonClass = 'rm-button';

        // The class applied to the toggle Link element when it is visible
        o.tButtonShowClass = 'rm-show';

        // The class applied to the toggle Link element when it is visible
        o.tButtonActiveClass = 'rm-active';

        // Nav element object - contains the menus
        o.el = $( el );

        // The class the plugin adds to the nav element
        o.navElementClass = 'rm-nav';

        // Container object - contains everything - the Nav element and Toggle Link
        o.container = o.el.parent();

        // The class the plugin adds to the container of the nav element
        o.containerClass = 'rm-container';

        // The class applied to container element to trigger expanded layout
        o.expandedClass = 'rm-layout-expanded';

        // The class applied to container element to trigger contracted layout
        o.contractedClass = 'rm-layout-contracted';

        // The class that is removed from the toggle and nav element when JS is supported
        o.noJSClass = 'rm-nojs';

        // All menu elements
        o.menus = o.el.find( o.options.menuSel );

        // The class applied to all menu elements
        o.menuClass = 'rm-menu';

        // Top level menu object - contains the menus
        o.topMenu = o.el.children( o.options.menuSel );

        // The class the plugin adds to the top menu element
        o.topMenuClass = 'rm-top-menu';

        // The class applied to menu/sub-menu element when menu is expanded
        o.menuExpandedClass = 'rm-menu-expanded';

        // The class applied to menu/sub-menu element when menu is hidden
        o.menuHiddenClass = 'accessibly-hidden';

        // The class the plugin adds to the menu elements when calculating height
        o.menuCalcClass = 'rm-calculate';

        // The class applied to all menu items
        o.menuItemClass = 'rm-menu-item';

        // The focused parent element
        o.itemFocused = false;

        // The class applied to menu items that contain a sub-menu
        o.parentClass = 'rm-parent';

        // The class applied to a menu item when its menu is expanded
        o.itemHoverClass = 'rm-hover';

        // The class applied to the first menu item
        o.itemFirst = 'rm-first';

        // The class applied to the last menu item
        o.itemLast = 'rm-last';

        // The class applied to the second to last menu item
        o.item2ndLast = 'rm-2nd-last';

        // The CSS3 animate class variable
        o.animateClass = 'rm-css-animate';

        // The CSS3 animate Boolean
        o.animateBool = o.options.animateBool;

        // The GPU accelerate class variable
        o.accelerateClass = 'rm-accelerate';

        // The GPU accelerate Boolean
        o.accelerateBool = o.options.accelerateBool;

        // The touchmove Boolean - did a touchmove event just occur
        o.touchMoveBool = false;

        // Resize and Pause hover event timer function
        o.timer = false;

        // The window width - used to verify a window width change
        o.windowWidth = $( window ).width();


        /**
         * Initiate plugin =========================================
         * @returns {Plugin}
         */
        o.init = function() { // Should only be called once

            // Set up the plugin
            o.setup();

            // Window event handlers
            $( window ).on({

                // Reset on screen resize
                'resize': function() {

                    // Test if width has resized - as opposed to height
                    if ($( window ).width() !== o.windowWidth) {

                        // Update the window width
                        o.windowWidth = $( window ).width();

                        // Adjust layout
                        clearTimeout( o.timer );
                        o.timer = setTimeout( o.adjust, 500 );

                    }
                }
            });

            // Run setupCallback function
            if ( typeof( o.options.setupCallback ) === "function" ) {
                o.options.setupCallback();
            }

            return this;
        };

        /**
         * Setup plugin ============================================================
         * @returns {Plugin}
         */
        o.setup = function() { // Can be called again to reset plugin

            // Add the container class to the nav element's parent element
            o.container.addClass( o.containerClass );

            // add rm-button class if using button
            if ( o.options.toggleBtnBool ) {
                o.tButton.addClass( o.tButtonClass );
            } else {
                o.tButton.removeClass( o.tButtonClass );
            }

            // Remove o.noJSClass class and add click event to Toggle Link
            o.tButton
                .removeClass( o.noJSClass )
                .off( 'mousedown.rm focusin.rm click.rm' )

                // Use mousedown and focus to trigger toggle
                .on( 'mousedown.rm focusin.rm', tButtonFocus )

                // Disable click events
                .on( 'click.rm', tButtonClick )

                .attr( 'tabindex', 0 )
            ;

            // Add menu class and make submenus accessibly hidden
            o.menus
                .addClass( o.menuClass )
                .attr( 'aria-hidden', 'false' )
                .hide();

            // Add top menu class
            o.topMenu.addClass( o.topMenuClass );

            // Adjust o.animateBool
            if ( o.animateBool ) { // using CSS3 transitions

                // Check if transitions and acceleration are supported
                if ( typeof Modernizr !== 'undefined' ) { // Test with Modernizr
                    if ( !Modernizr.csstransitions ) {
                        o.animateBool = false;
                        o.accelerateBool = false;
                    } else if ( !Modernizr.csstransforms3d ) {
                        o.accelerateBool = false;
                    }
                } else if ( !transitionsSupported() ) {
                    o.animateBool = false;
                    o.accelerateBool = false;
                } else if ( !transform3DSupported()  ) {
                    o.accelerateBool = false;
                }
            } else {
                o.accelerateBool = false;
            }

            // Add animate and accelerate classes if CSS3 animation
            if ( o.animateBool ) {
                o.menus.addClass( o.animateClass );
                if ( o.accelerateBool ) {
                    o.menus.addClass( o.accelerateClass );
                }
            }

            // Add and remove classes and click events
            o.el
                .removeClass( o.noJSClass )
                .addClass( o.navElementClass )
                .off( 'focusin.rm focusout.rm click.rm touchend.rm touchmove.rm' )

                // Use focus to trigger menu item focus/hover behaviour
                .on( 'focusin.rm', o.options.menuItemsSel, itemFocus )

                // De-focus menu on focus out
                .on( 'focusout.rm', o.topMenu, menuBlur )

                // Use click and touchend to trigger click behaviour
                .on( 'click.rm touchend.rm', o.options.menuItemsSel, itemClick )

                // Set touchMoveBool to true on touchmove event
                .on( 'touchmove.rm', o.options.menuItemsSel, touchMove )
                .find( o.options.menuItemsSel )
                    .each( function(i) {
                        var $el = $( this );
                        $el
                            .addClass( o.menuItemClass)
                            .children( 'a' ).attr( 'tabindex', 0 )
                        ;
                        if ( $el.is( ':first-child') ) {
                            $el.addClass( o.itemFirst );
                        }
                        if ( $el.is( ':last-child') ) {
                            $el.addClass( o.itemLast )
                                .prev().addClass( o.item2ndLast );
                        }
                    })
                    .addBack()
                    .removeClass( o.parentClass )
                    .has( o.options.menuSel )
                        .addClass( o.parentClass )
            ;

            // Apply initial layout and adjustments
            o.adjust();

            return this;
        };

        /**
         * Adjust plugin ============================================================
         * @param {String} minWidth  - the min-width value (including units)
         * minWidth must be in pixels if not using Modernizr. Should match media query in css file
         */
        o.adjust = function( minWidth ) {

            // Get the breakpoint minimum width
            minWidth = typeof minWidth !== 'undefined' ? minWidth : o.options.minWidth;

            // Check browser width - set menu layout
            if ( typeof Modernizr !== 'undefined' && Modernizr.mq('only all') ) { // MQs supported - Test with Modernizr
                if ( o.options.developmentMode ) {
                    console.log( 'Modernizr: MQ supported' );
                }
                if ( !Modernizr.mq( '( min-width: ' + minWidth + ' )' ) ) {
                    o.layoutContracted();
                } else {
                    o.layoutExpanded();
                }

            } else { // Unable to detect MQ support - Test width using outerWidth - less reliable
                if ( o.options.developmentMode ) {
                    console.log( 'unable to detect MQ support' );
                }
                if ( $( window ).outerWidth() < parseInt( minWidth ) ) {
                    o.layoutContracted();
                } else {
                    o.layoutExpanded();
                }
            }
        };

        // External Helper Functions ===============================================

        /**
         * Contracted layout
         * @returns {Plugin}
         */
        o.layoutContracted = function() {

            if ( !o.container.hasClass( o.contractedClass ) ) { // not contracted

                // Contract any expanded siblings and their children
                menuBlur( { 'type': 'layoutContracted' } );

                // Apply Contracted class
                o.container
                    .removeClass( o.expandedClass )
                    .addClass( o.contractedClass )
                    .find( '.' + o.itemHoverClass ).removeClass( o.itemHoverClass );

                if ( o.animateBool ) { // using CSS3 transitions

                    // Recalculate menu heights
                    o.calculateHeights();
                }

                // Remove hover events
                o.el.off( 'mouseenter.le mouseleave.le' );

                // Show Toggle Link and setup topMenu
                o.tButton.addClass( o.tButtonShowClass );
                if ( !o.tButton.hasClass( o.tButtonActiveClass ) ) { // topMenu not active

                    // Hide topMenu
                    o.topMenu
                        .addClass( o.menuHiddenClass )
                        .show()
                        .removeClass( o.menuExpandedClass )
                    ;
                } else { // topMenu is active

                    // Show topMenu
                    o.topMenu
                        .removeClass( o.menuHiddenClass )
                        .show()
                        .addClass( o.menuExpandedClass );
                    if ( o.animateBool ) { // Using CSS3 transitions
                        o.topMenu
                            .css({
                                'max-height': 'none'
                            })
                        ;
                    }
                }
            }

            if ( o.options.developmentMode ) {
                console.log( 'responsive-menu: contracted layout' );
            }
            return this;
        };

        /**
         * Expanded layout
         * @returns {Plugin}
         */
        o.layoutExpanded = function() {

            if ( !o.container.hasClass( o.expandedClass ) ) { // not expanded

                // Contract any expanded siblings and their children
                menuBlur( { 'type': 'layoutExpanded' } );

                // Apply expanded class to container
                o.container
                    .removeClass( o.contractedClass )
                    .addClass( o.expandedClass  )
                    .find( '.' + o.itemHoverClass ).removeClass( o.itemHoverClass );

                if ( o.animateBool ) { // using CSS3 transitions

                    // Recalculate menu heights
                    o.calculateHeights();
                }

                // Re-apply mouse events
                o.el.off( 'mouseenter.le mouseleave.le' )

                    // Add mouseenter to all menu items to trigger focus
                    .on( 'mouseenter.le', o.options.menuItemsSel, itemFocus )

                    // Add mouseleave to trigger focus when re-entering parent of expanded menu
                    .on( 'mouseleave.le', o.options.menuItemsSel, itemLeave )

                    // Add mouseleave on topmenu to trigger menu blur
                    .on( 'mouseleave.le', o.topMenu, menuBlur )
                ;

                // Show Menu - Hide Toggle Link
                o.tButton.removeClass( o.tButtonShowClass );
                o.topMenu.removeClass( o.menuHiddenClass )
                    .show()
                    .addClass( o.menuExpandedClass );
                if ( o.animateBool ) { // Using CSS3 transitions
                    o.topMenu
                        .css({
                            'max-height': 'none',
                            'overflow': 'visible'
                        })
                    ;
                }
            }
            if ( o.options.developmentMode ) {
                console.log( 'responsive-menu: expanded layout' );
            }
            return this;
        };

        /**
         * Calculate the heights of each submenu and store in data object, reset styles
         * Used when CSS3 transitions are enabled
         * @returns {Plugin}
         */
        o.calculateHeights = function() {

            // Unstyle menus to original state to measure heights and then reapply styles
            o.menus
                .addClass( o.menuCalcClass )
                .removeClass( o.menuExpandedClass )
                .attr( 'style', '' )
                .show( 0 );

            // Reselect to force application of styles
            o.menus.each( function () {
                    var $el = $( this );
                    $el
                        .data( 'height', $el.height() )
                    ;
                })
                .css( {
                    'max-height': '0'
                })
                .removeClass( o.menuCalcClass )
            ;
            return this;
        };

        /**
         * Toggle visibility of entire menu
         * @param {Object} el - The toggle Link element
         */
        o.toggleMenu = function( el ) {

            // Contract all sub-menus
            contract( o.topMenu );

            if ( !o.topMenu.hasClass( o.menuHiddenClass ) ) { // topMenu is visible

                // Hide topMenu
                $( el ).removeClass( o.tButtonActiveClass );
                contract( o.container );

            } else { // menu is hidden

                // Show topMenu
                $( el ).addClass( o.tButtonActiveClass );
                o.topMenu.removeClass( o.menuHiddenClass );
                if ( o.animateBool ) { // Using CSS3 transitions
                    o.topMenu.css( 'max-height', '0' );
                } else { // Use jQuery animation
                    o.topMenu.hide( 0 );
                }
                expand( o.el );
            }

        };

        // internal Event Handler Functions ===============================================

        /**
         * Toggle Btn focus and mousedown event handler
         * @param {event} e - event object
         */
        var tButtonFocus = function( e ) {

            e.stopPropagation();

            var $el = $( e.target );

            clearTimeout( o.timer );
            o.timer = setTimeout( function () {
                o.toggleMenu( e.target );
            }, 100 );
        };

        /**
         * Toggle Btn Click event handler
         * @param {event} e - event object
         */
        var tButtonClick = function( e ) {

            e.preventDefault();
            e.stopPropagation();
        };

        /**
         * Item click and touchend event handler
         * @param {event} e - event object
         */
        var itemClick = function( e ) {

            var $el = $( e.currentTarget );

            e.stopPropagation();

            if ( ( $el.hasClass( o.itemHoverClass ) || !$el.hasClass( o.parentClass ) ) && !o.touchMoveBool ) {
                location.href = $el.children( 'a' ).attr('href');
                menuBlur( e );
            } else if ( e.type !== 'touchend' ) {
                e.preventDefault();
            }

            o.touchMoveBool = false;
        };

        /**
         * Menu item focus and mouseenter event handler -
         * Triggers: focus, mouseenter
         * @param {event} e - event object
         */
        var itemFocus = function( e ) {

            // get current target before it changes
            var $el = $( e.currentTarget );

            e.stopPropagation();

            // Add focus if item does not have focus
            if ( e.type !== 'focusin' ) {
                $el.children( 'a' ).not( ':focus' ).focus();
            }
            o.itemFocused = $el;

            clearTimeout( o.timer );
            o.timer = setTimeout( function () {

                // Expand topmenu if toggle button is active and menu is contracted
                if ( o.tButton.hasClass( o.tButtonShowClass ) && !o.tButton.hasClass( o.tButtonActiveClass )) {
                    o.toggleMenu( o.tButton.get(0) );
                }

                // Expand menu
                if ( $el.hasClass( o.parentClass ) ) {

                    if ( !$el.hasClass( o.itemHoverClass ) ) {

                        // Contract any expanded siblings and their children
                        contract( $el.parent() );

                        expand( $el );
                    }
                } else {
                    // Contract any expanded siblings and their children
                    contract( $el.parent() );
                }
            }, 100 );
        };

        /**
         * Touchmove event handler
         * @param {event} e - event object
         */
        var touchMove = function( e ) {
            o.touchMoveBool = true;
        };

        /**
         * Topmenu mouseleave and foucusout event handler
         * Triggers: mouseleave, focusout
         * @param {event} e - event object
         */
        var menuBlur = function( e ) {

            // Define event type if e is undefined
            e = e || { 'type': 'callback' };

            clearTimeout( o.timer );
            o.timer = setTimeout( function () {

                if ( o.itemFocused ) {
                    o.itemFocused.children( 'a' ).blur();
                    o.itemFocused = false;
                }
                contract( o.topMenu );
            }, 100 );
        };

        /**
         * Sub-menu item mouseleave event handler - used with expanded layout
         * Triggers: mouseleave
         * @param {event} e - event object
         */
        var itemLeave = function( e ) {

            // get current target before it changes
            var $el = $( e.currentTarget );

            clearTimeout( o.timer );
            o.timer = setTimeout( function () {

                // Focus the parent element of the expanded menu
                $el.parent().parent().children( 'a' ).focus();
            }, 100 );
        };

        /**
         * The CSS3 Transition End Contract event handler - used to add call-back functions to CSS3 transitions
         * @param {event} e - event object
         */
        var transitionEndContract = function( e ) {

            if ( e.originalEvent.propertyName === 'max-height' ) {

                var $el = $( e.currentTarget );
                e.stopPropagation();

                // Menu Contracted
                $el
                    .css( {
                        'transition': '',
                        'max-height': '0',
                        'overflow': 'hidden'
                    } )
                    .removeClass( o.menuExpandedClass )
                    .off( 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd' )
                    .parent().find( '.' + o.itemHoverClass ).addBack().removeClass( o.itemHoverClass )
                ;

                if ( $el.hasClass( o.topMenuClass ) ) { // is topMenu

                    // accessibly hide topMenu
                    $el
                        .addClass( o.menuHiddenClass )
                        .show( 0 );
                }

                // Scroll to expanded menu
                scrollMenu( o.itemFocused );
            }
        };

        /**
         * The CSS3 Transition End Expand event handler - used to add call-back functions to CSS3 transitions
         * @param {event} e - event object
         */
        var transitionEndExpand = function( e ) {

            if ( e.originalEvent.propertyName === 'max-height' ) {
                var $el = $( e.currentTarget );
                e.stopPropagation();

                // Menu expanded
                $el
                    .removeClass( o.menuHiddenClass )
                    .css( {
                        'transition': '',
                        'max-height': 'none',
                        'overflow': 'visible'
                    } )
                    .addClass( o.menuExpandedClass )
                    .off( 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd' )
                ;
                $el.parent( '.' + o.parentClass ).addClass( o.itemHoverClass );

                // Scroll to expanded menu
                scrollMenu( o.itemFocused );
            }
        };

        // Internal Helper Functions ===============================================

        /**
         * Contract sub-menus
         * @param {Object} $parent - The parent element of the menu Item initiating the event
         */
        var contract = function( $parent ) {

            var $menus = $parent.find( o.options.menuSel );

            if ( o.animateBool ) { // Using CSS3 transitions

                // Set max-height to height of each expanded menu
                $menus.each( function(){
                    var $el = $( this );
                    if ( $el.height() !== 0 ) {
                        $el
                            .css({
                                'max-height': $el.height(),
                                'transition': 'max-height ' + String( o.options.transitionSpeed / 1000 ) + 's ' + o.options.css3Easing,
                                'overflow': 'hidden'
                            })
                            .on( 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', transitionEndContract )
                        ;
                    } else {
                        $menus.not( $el );
                    }
                });

                // Must force a redraw so transition will occur
                $menus.hide(0).show(0);

                // Contract menu
                $menus
                    .css({
                        'max-height': '0'
                    })
                    .removeClass( o.menuExpandedClass )
                ;

            } else { // Use jQuery animation

                // Contract menus
                $menus.each( function() {

                    var $el = $( this );

                    if ( $el.height() !== 0 ) {

                        $el
                            .slideUp( o.options.transitionSpeed, o.options.jqueryEasing, function () {

                                $el
                                    .css( 'overflow', 'visible' )
                                    .removeClass( o.menuExpandedClass )
                                    .parent( '.' + o.parentClass )
                                    .removeClass( o.itemHoverClass )
                                ;

                                if ( $el.hasClass( o.topMenuClass ) ) {
                                    o.topMenu.addClass( o.menuHiddenClass );
                                }

                                // Scroll to expanded menu
                                scrollMenu( o.itemFocused );
                            })
                        ;
                    }
                });
            }
        };

        /**
         * Expand sub-menu
         * @param {Object} $el - The menu Item initiating the event
         */
        var expand = function( $el ) {

            // Define menu
            var $menu = $el.children( o.options.menuSel );

            // Remove hover class from siblings
            $el.siblings( '.' + o.itemHoverClass )
                .removeClass( o.itemHoverClass );

            if ( o.animateBool ) { // Using CSS3 transitions

                // Expand menu
                $menu
                    .css({
                        'transition': 'max-height ' + String( o.options.transitionSpeed / 1000 ) + 's ' + o.options.css3Easing,
                        'max-height': $menu.data('height')
                    })
                    .on( 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', transitionEndExpand )
                ;
            } else { // Use jQuery animation

                // Expand menu
                $menu
                    .slideDown( o.options.transitionSpeed, o.options.jqueryEasing, function() {
                        $el.addClass( o.itemHoverClass );
                        $menu
                            .addClass( o.menuExpandedClass )
                            .css( 'overflow','visible' )
                        ;
                        console.log('jquery expand');

                        // Scroll to expanded menu
                        scrollMenu( o.itemFocused );
                    })
                ;
            }
        };

        // initialize ----------------------------------------------------------------
        o.init( el );

        return this;
    };

    /**
     * Create plugin obects
     * @param {Object} options - Plugin options
     * @returns {*}
     */
    $.fn[ pluginName ] = function( options ) {

        // Return collection of elements
        return this.each( function() {
            var $el = $( this );
            if ( !$el.data( pluginName ) ) {
                $el.data( pluginName, new Plugin( this, options ) );
            }
        });
    };

    // Out of Scope Private functions ==================================================

    /**
     * Test for transform3d support
     * @returns {boolean}
     */
    var transform3DSupported = function() {
        var el = document.createElement('p'),
            has3d,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        for(var t in transforms){
            if( el.style[t] !== undefined ){
                el.style[t] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    };

    /**
     * Test for CSS3 transitions support
     * @returns {boolean}
     */
    var transitionsSupported = function() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition';

        if (typeof s[p] === 'string') { return true; }

        // Tests for vendor specific prop
        var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for (var i=0; i<v.length; i++) {
            if (typeof s[v[i] + p] === 'string') { return true; }
        }

        return false;
    };

    /**
     * Scroll Menu into viewport if off screen
     * @returns {boolean}
     */
    var scrollMenu = function( $el ) {

        if ( $el.length ) {

            var viewTop = $( window ).scrollTop();
            var viewBottom = viewTop + $( window ).height();
            var boundsTop = $el.offset().top;
            var boundsBottom = boundsTop + $el.outerHeight();

            if ( boundsBottom > viewBottom || boundsTop < viewTop ) {
                $( 'html, body' ).animate( { scrollTop: boundsTop }, 'slow' );
            }
        }
    };

})( jQuery, window, document, Math );