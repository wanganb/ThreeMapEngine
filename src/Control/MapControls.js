/**
 * @author wangyi wanganb@126.com
 */

THREE.MapControls = function (terrainMesh, domElement) {
    "use strict";
    var _this = this;
    var STATE = { NONE: -1, PAN: 0, ROTATE: 1, ZOOM: 2 };
    this.terrainMesh = terrainMesh;
    this.domElement = (domElement !== undefined) ? domElement : document;
    this.enabled = true;
    this.screen = { left: 0, top: 0, width: 0, height: 0 };

    this.panSpeed=0.3;

    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;

    //容差阈值
    var EPS = 0.000001;
    var lastPosition = new THREE.Vector3();


    var _state = STATE.NONE,
        _panStart = new THREE.Vector2(),
        _panEnd = new THREE.Vector2();

    //events
    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    //methods

    this.handleResize = function () {
        if (this.domElement === document) {
            this.screen.left = 0;
            this.screen.top = 0;
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;
        } else {
            var box = this.domElement.getBoundingClientRect();
            // adjustments come from similar code in the jquery offset() function
            var d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;
        }
    }
    this.handleEvent = function (event) {
        if (typeof this[event.type] == 'function') {
            this[event.type](event);
        }
    }

    var getMouseOnScreen = (function () {

        var vector = new THREE.Vector2();

        return function getMouseOnScreen(pageX, pageY) {

            vector.set(
                (pageX - _this.screen.left) / _this.screen.width,
                (pageY - _this.screen.top) / _this.screen.height
            );

            return vector;

        };

    } ());

    var getMouseOnCircle = (function () {

        var vector = new THREE.Vector2();

        return function getMouseOnCircle(pageX, pageY) {

            vector.set(
                ((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * 0.5)),
                ((_this.screen.height + 2 * (_this.screen.top - pageY)) / _this.screen.width) // screen.width intentional
            );

            return vector;

        };

    } ());

    this.panTerrainMesh = (function () {
        //待续...
        var mouseChange=new THREE.Vector2(),
            terrainUp=new THREE.Vector3(),
            pan=new THREE.Vector3();
            
        return function panTerrainMesh() {
            
            mouseChange.copy(_panEnd).sub(_panStart);
            
            if(mouseChange.lengthSq()){
                mouseChange.multiplyScalar(_this.panSpeed);
                console.log(mouseChange);
               //pan.copy()
                
            }
            //tmp
            _panStart.copy( _panEnd );
            //console.log("pan function");   
        };
    } ());

    this.update = function () {
        if (!_this.noPan) {
            _this.panTerrainMesh();
        }
        if (lastPosition.distanceToSquared(_this.terrainMesh.position) > EPS) {
            _this.dispatchEvent(changeEvent);
            lastPosition.copy(_this.terrainMesh.position);
        }
    }

    function mousedown(event) {
        if (_this.enabled === false) return;

        event.preventDefault();
        event.stopPropagation();

        if (_state === STATE.NONE) {
            _state = event.button;
        }
        //平移
        if (_state === STATE.PAN && !_this.noPan) {
            _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
            _panEnd.copy(_panStart);
        }
        document.addEventListener('mousemove', mousemove, false);
        document.addEventListener('mouseup', mouseup, false);

        _this.dispatchEvent(startEvent);
    }

    function mousemove(event) {
        if (_this.enabled === false) return;

        event.preventDefault();
        event.stopPropagation();

        if (_state === STATE.PAN && !_this.noPan) {
            _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
        }

    }

    function mouseup(event) {
        if (_this.enabled === false) return;

        event.preventDefault();
        event.stopPropagation();

        _state = STATE.NONE;

        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        _this.dispatchEvent(endEvent);

    }

    this.dispose = function () {
        this.domElement.removeEventListener( 'mousedown', mousedown, false );
        
		document.removeEventListener( 'mousemove', mousemove, false );
		document.removeEventListener( 'mouseup', mouseup, false );
    }

    this.domElement.addEventListener( 'mousedown', mousedown, false );
    
    this.handleResize();
    //在开始时强制更新一下
    this.update();
}

THREE.MapControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.MapControls.prototype.constructor = THREE.MapControls;