window.onload = (function(){

    function SliderEventTarget(){
    }

    SliderEventTarget.prototype = {

        constructor: SliderEventTarget,

        addListener: function(type, listener) {

            // create an array if it doesn't exist
            if (!this.hasOwnProperty("_listeners")) {
                this._listeners = [];
            }

            if (typeof this._listeners[type] == "undefined"){
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        },

        fire: function(event) {
            console.log(this)
            if (!event.target) {
                event.target = this;
            }

            if (!event.type){
                throw new Error("Event object missing 'type' property.");
            }

            if (this._listeners && this._listeners[event.type] instanceof Array) {
                var listeners = this._listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++) {
                    listeners[i].call(this, event);
                }
            }
        },
        removeListener: function(type, listener) {
            if (this._listeners && this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                     if (listeners[i] === listener){
                         listeners.splice(i, 1);
                         break;
                     }
                }
            }
        }
   };


   function Slider(min, max, width, lineHeight, indicatorHeight) {
        this._min = min;
        this._max = max;
        this._width = width;
        this._height = this._width / 10;
        this._indicatorHeight = indicatorHeight;
        this._indicatorWidth = this._indicatorHeight;
        this._lineheight = lineHeight;

       Object.defineProperties(this, {
           "min": {
               get: function() {
                   return this._min;
                },
                set: function(value) {
                    this._min = value;
                }
            },
            "max": {
                get: function() {
                    return this._max;
                },
                set: function(value) {
                    return this._max = value;
                }
            },
            "width": {
                get: function() {
                    return this._width;
                },
                set: function(value) {
                    return this._width = value;
                }
            }
        });
    }

    Slider.prototype = Object.create(SliderEventTarget.prototype);

    Object.assign(Slider.prototype, {

        constructor: Slider,

        createSlider: function(id, defaultValue, theme) {
            this.generateSliderContainer(theme);
            this.getParentId(id);
            this.createSliderLine("sliderLine");
            this.createSliderDot("sliderDot");
            this.getSliderCoordonates();

            this.clickHandlerListener = this.callClickHandler.bind(this);
            this.mouseDownListener = this.moveSliderDotOnMouseDown.bind(this);

            this.currentPos = 0;
            this.calculateCurrentVal = 0;
            this.currentVal = 0;
            this.keepMin = 0;

            if(this._min < 0) {
                this.keepMin = this._min;
                this._max = this.max + Math.abs(this._min);
                this._min = 0;
            }

            if(defaultValue - 0) {
                this.setDefaultValue(defaultValue);
            }

            // this.addListener("click", this.clickHandlerListener);
            // this.addListener("mousedown", this.mouseDownListener);
            this.parentDiv.addEventListener("click", this.clickHandlerListener);
            this.sliderDot.addEventListener("mousedown", this.mouseDownListener);
        },

        generateSliderContainer: function(theme) {
            this.sliderContainer = document.createElement("div");
            if(!theme) {
                this.sliderContainer.className = "slider";
            } else {
                this.sliderContainer.className = theme;
            }
        },

        getParentId: function(id) {
            this.parentDiv = document.getElementById(id);
            this.parentDiv.style.width = this._width + "px";
            this.parentDiv.style.height = this._height + "px";
            this.parentDiv.style.position = "relative";
            this.parentDiv.style.marginTop = "15px";
            this.parentDiv.style.marginLeft = "15px";

            this.parentDiv.appendChild(this.sliderContainer);
        },

        createSliderLine: function(className) {
            this.sliderLine = document.createElement("div");
            this.sliderLine.className = className;
            this.sliderLine.style.position = "absolute";
            this.sliderLine.style.width = this._width + "px";
            this.sliderLine.style.height = this._lineheight + "px";
            this.sliderLine.style.top = this._height / 2 + "px";

            this.sliderContainer.appendChild(this.sliderLine);
        },

        createSliderDot: function(className) {
            this.sliderDot = document.createElement("div");
            this.sliderDot.className = className;
            this.sliderDot.style.position = "absolute";
            this.sliderDot.style.height = this._indicatorHeight + "px";
            this.sliderDot.style.width = this._indicatorWidth + "px";
            this.sliderDot.style.borderRadius = "50%";
            this.sliderDot.style.top = (this._height / 2) - (this._indicatorHeight / 2) + "px";

            this.sliderContainer.appendChild(this.sliderDot);
        },

        getSliderCoordonates: function() {
            this.sliderLineCoord = this.sliderLine.getBoundingClientRect();
            this.sliderDotCoord = this.sliderDot.getBoundingClientRect();
        },

        callClickHandler: function(event) {
            this.moveSliderDot(event.clientX);
        },

        moveSliderDot: function(xPos) {
            this.newXPos = (xPos - (this._indicatorWidth / 2)) - this.sliderDotCoord.x;
            this.keepRightLimit(this.newXPos);
        },

        keepRightLimit: function(newPos) {
            this.sliderDot.style.left = newPos + "px";
            this.currentPos =Math.round((newPos * 100) / (this.sliderLineCoord.width - this._indicatorWidth));
            this.calculateCurrentVal = Math.round(this.keepMin + ((this._max - this.min) * this.currentPos) / 100);
            this.currentVal = this.calculateCurrentVal + this.min;
            this.fire({type: "change", data:{
                currentValue: this.currentVal,
                currentPosition: this.currentPos
            }});
            console.log(this.currentPos + "%");
            console.log(this.currentVal);
        },

        moveSliderDotOnMouseDown: function(e) {
            e.preventDefault();
            this.mouseMoveListener = this.onMouseMove.bind(this);
            this.mouseUpListener = this.onMouseUp.bind(this);

            document.addEventListener("mousemove", this.mouseMoveListener);
            document.addEventListener("mouseup", this.mouseUpListener);
        },

        onMouseMove: function(event) {
            this.newXPos = (event.clientX - (this._indicatorWidth / 2)) - this.sliderDotCoord.x;

            if(this.newXPos < this._min) {
                this.newXPos = 0;
            }

            if(this.newXPos > this.sliderLineCoord.width - this.sliderDotCoord.x) {
                this.newXPos = this.sliderLineCoord.width - this._indicatorWidth;
            }

            this.keepRightLimit(this.newXPos);
        },

        onMouseUp: function() {
            document.removeEventListener("mousemove", this.mouseMoveListener);
            document.removeEventListener("mouseup", this.mouseUpListener);
        },

        setDefaultValue: function(val) {
            if(this._max < val) {
                val = this._max;
            }

            // IMPORTANT
            if(val <= this._max && val > 0) {
                this.removeMinVal = this._max - this._min;
                this.percent = Math.round((val - this._min) * 100 / this.removeMinVal);
                this.pozMax = this.sliderLineCoord.width - this._indicatorWidth;
                this.newPoz = this.percent * this.pozMax / 100;
            }

            this.sliderDot.style.left = this.newPoz + "px";
        },

        destroy: function() {
            if (this._listeners) {
                this._listeners = [];
            }

            this.parentDiv.innerHTML = "";

            this.parentDiv.removeEventListener("click", this.clickHandlerListener);
            this.sliderDot.removeEventListener("mousedown", this.mouseDownListener);
            document.removeEventListener("mousemove", this.mouseMoveListener);
            document.removeEventListener("mouseup", this.mouseUpListener);

            for(var x in this) {
                delete x;
            }
        }

    });

    var slider = new Slider(-10, 50, 500, 3, 16);
    slider.createSlider("slider1", 25, "zen-slider1");

    slider.addListener("change", onHandleChange);

    function onHandleChange(event) {
        console.log(event.data.currentPosition)
        console.log(event.data.currentValue)
    }
    // slider.destroy()
}());