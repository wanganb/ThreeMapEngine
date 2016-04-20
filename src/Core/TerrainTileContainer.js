/**
 * @ author wangyi wanganb@126.com
 */

THREE.TerrainTileContainer = function () {
    "use strict";
    THREE.Object3D.call(this);
    
    this.type = 'TerrainTileContainer';

    //Geometrys and Textures 
    this.tileGeometrys = [];
    this.tileTextures=[];
    
    var _this=this;
    

}

THREE.TerrainTileContainer.prototype = Object.create(THREE.Object3D.prototype);
THREE.TerrainTileContainer.prototype.constructor = THREE.TerrainTileContainer;

