/**
 * @file A custom implemenatation of the RPG Makre MV Plugin TileD v1.3.0
 * create by Yami and Archeia, with the addons Suprise Sandwich and a custom events system.
 * @author @Archeia_Nessiah, @SuppaYami, @andarms
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var init = Tilemap.prototype.initialize;
Tilemap.prototype.initialize = function (data) {
    this._data = data;
    init.call(this);
};
var PE;
(function (PE) {
    /**
     * Custom tilemap class for the Scene_Map
     */
    var Tiledmap = /** @class */ (function (_super) {
        __extends(Tiledmap, _super);
        function Tiledmap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tiledmap.prototype.initialize = function (data) {
            this._layers = [];
            this._priorityTiles = [];
            this._priorityTilesCount = 0;
            this._data = data;
            _super.prototype.initialize.call(this, data);
            this.setupTiled();
        };
        Object.defineProperty(Tiledmap.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this._data = val;
                this.setupTiled();
            },
            enumerable: true,
            configurable: true
        });
        Tiledmap.prototype.setupTiled = function () {
            this._setupSize();
            this._setupAnim();
        };
        Tiledmap.prototype._setupSize = function () {
            var width = this._width;
            var height = this._height;
            var margin = this._margin;
            var tileCols = Math.ceil(width / this._tileWidth) + 1;
            var tileRows = Math.ceil(height / this._tileHeight) + 1;
            this._tileWidth = this.data.tilewidth;
            this._tileHeight = this.data.tileheight;
            this._layerWidth = tileCols * this._tileWidth;
            this._layerHeight = tileRows * this._tileHeight;
            this._mapWidth = this.data.width;
            this._mapHeight = this.data.height;
        };
        Tiledmap.prototype._setupAnim = function () {
            this._animFrame = {};
            this._animDuration = {};
        };
        Tiledmap.prototype._createLayers = function () {
            var id = 0;
            this._needsRepaint = true;
            var useSquareShader = 0;
            for (var _i = 0, _a = this.data.layers; _i < _a.length; _i++) {
                var layerData = _a[_i];
                var zIndex = 0;
                if (layerData.type != "tilelayer") {
                    id++;
                    continue;
                }
                if (!!layerData.properties && !!layerData.properties.zIndex) {
                    zIndex = parseInt(layerData.properties.zIndex);
                }
                if (!!layerData.properties && !!layerData.properties.collision) {
                    id++;
                    continue;
                }
                if (!!layerData.properties && !!layerData.properties.toLevel) {
                    id++;
                    continue;
                }
                if (!!layerData.properties && !!layerData.properties.regionId) {
                    id++;
                    continue;
                }
                var layer = new PIXI.tilemap.CompositeRectTileLayer(zIndex, [], useSquareShader);
                layer.layerId = id; // @dryami: hack layer index
                layer.spriteId = Sprite._counter++;
                this._layers.push(layer);
                this.addChild(layer);
                id++;
            }
            this._createPriorityTiles();
        };
        Tiledmap.prototype._createPriorityTiles = function () {
            var size = 256;
            var zIndex = 5;
            for (var _i = 0, _a = PE.Utils.range(size); _i < _a.length; _i++) {
                var x = _a[_i];
                var sprite = new Sprite_Base();
                sprite.z = sprite.zIndex = zIndex;
                sprite.layerId = -1;
                sprite.hide();
                this.addChild(sprite);
                this._priorityTiles.push(sprite);
            }
        };
        Tiledmap.prototype._hackRenderer = function (renderer) {
            return renderer;
        };
        Tiledmap.prototype.refreshTileset = function () {
            var bitmaps = this.bitmaps.map(function (x) {
                return x._baseTexture ? new PIXI.Texture(x._baseTexture) : x;
            });
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                layer.setBitmaps(bitmaps);
            }
        };
        Tiledmap.prototype.update = function () {
            _super.prototype.update.call(this);
            this._updateAnim();
        };
        Tiledmap.prototype._updateAnim = function () {
            var needRefresh = false;
            for (var key in this._animDuration) {
                this._animDuration[key] -= 1;
                if (this._animDuration[key] <= 0) {
                    this._animFrame[key] += 1;
                    needRefresh = true;
                }
            }
            if (needRefresh) {
                this.refresh();
            }
        };
        Tiledmap.prototype._updateLayerPositions = function (startX, startY) {
            var ox = 0;
            var oy = 0;
            if (this.roundPixels) {
                ox = Math.floor(this.origin.x);
                oy = Math.floor(this.origin.y);
            }
            else {
                ox = this.origin.x;
                oy = this.origin.y;
            }
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                var layerData = this.data.layers[layer.layerId];
                var offsetX = layerData.offsetx || 0;
                var offsetY = layerData.offsety || 0;
                layer.position.x = startX * this._tileWidth - ox + offsetX;
                layer.position.y = startY * this._tileHeight - oy + offsetY;
            }
            for (var _b = 0, _c = this._priorityTiles; _b < _c.length; _b++) {
                var sprite = _c[_b];
                var layerData = this.data.layers[sprite.layerId];
                var offsetX = layerData ? layerData.offsetx || 0 : 0;
                var offsetY = layerData ? layerData.offsety || 0 : 0;
                sprite.x = sprite.origX + startX * this._tileWidth - ox + offsetX + sprite.width / 2;
                sprite.y = sprite.origY + startY * this._tileHeight - oy + offsetY + sprite.height;
            }
        };
        Tiledmap.prototype._paintAllTiles = function (startX, startY) {
            this._priorityTilesCount = 0;
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                layer.clear();
                this._paintTiles(layer, startX, startY);
            }
            var id = 0;
            for (var _b = 0, _c = this.data.layers; _b < _c.length; _b++) {
                var layerData = _c[_b];
                if (layerData.type != "objectgroup") {
                    id++;
                    continue;
                }
                this._paintObjectLayers(id, startX, startY);
                id++;
            }
            while (this._priorityTilesCount < this._priorityTiles.length) {
                var sprite = this._priorityTiles[this._priorityTilesCount];
                sprite.hide();
                sprite.layerId = -1;
                this._priorityTilesCount++;
            }
        };
        Tiledmap.prototype._paintTiles = function (layer, startX, startY) {
            var layerData = this.data.layers[layer.layerId];
            if (!layerData.visible) {
                return;
            }
            if (layerData.type == "tilelayer") {
                this._paintTilesLayer(layer, startX, startY);
            }
        };
        Tiledmap.prototype._paintObjectLayers = function (layerId, startX, startY) {
            var layerData = this.data.layers[layerId];
            var objects = layerData.objects || [];
            for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                var obj = objects_1[_i];
                if (!obj.gid) {
                    continue;
                }
                if (!obj.visible) {
                    continue;
                }
                var tileId = obj.gid;
                var textureId = this._getTextureId(tileId);
                var dx = obj.x - startX * this._tileWidth;
                var dy = obj.y - startY * this._tileHeight - obj.height;
                this._paintPriorityTile(layerId, textureId, tileId, startX, startY, dx, dy);
            }
        };
        Tiledmap.prototype._paintTilesLayer = function (layer, startX, startY) {
            var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
            var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
            for (var _i = 0, _a = PE.Utils.range(tileRows); _i < _a.length; _i++) {
                var y = _a[_i];
                for (var _b = 0, _c = PE.Utils.range(tileCols); _b < _c.length; _b++) {
                    var x = _c[_b];
                    this._paintTile(layer, startX, startY, x, y);
                }
            }
        };
        Tiledmap.prototype._paintTile = function (layer, startX, startY, x, y) {
            var mx = x + startX;
            var my = y + startY;
            if (this.horizontalWrap) {
                mx = mx.mod(this._mapWidth);
            }
            if (this.verticalWrap) {
                my = my.mod(this._mapHeight);
            }
            var tilePosition = mx + my * this._mapWidth;
            var tileId = this.data.layers[layer.layerId].data[tilePosition];
            var rectLayer = layer.children[0];
            var textureId = 0;
            if (!tileId) {
                return;
            }
            // TODO: Problem with offsets
            if (mx < 0 || mx >= this._mapWidth || my < 0 || my >= this._mapHeight) {
                return;
            }
            textureId = this._getTextureId(tileId);
            var tileset = this.data.tilesets[textureId];
            var dx = x * this._tileWidth;
            var dy = y * this._tileHeight;
            var w = tileset.tilewidth;
            var h = tileset.tileheight;
            var tileCols = tileset.columns;
            var rId = this._getAnimTileId(textureId, tileId - tileset.firstgid);
            var ux = (rId % tileCols) * w;
            var uy = Math.floor(rId / tileCols) * h;
            if (this._isPriorityTile(layer.layerId)) {
                this._paintPriorityTile(layer.layerId, textureId, tileId, startX, startY, dx, dy);
                return;
            }
            rectLayer.addRect(textureId, ux, uy, dx, dy, w, h);
        };
        Tiledmap.prototype._paintPriorityTile = function (layerId, textureId, tileId, startX, startY, dx, dy) {
            var tileset = this.data.tilesets[textureId];
            var w = tileset.tilewidth;
            var h = tileset.tileheight;
            var tileCols = tileset.columns;
            var rId = this._getAnimTileId(textureId, tileId - tileset.firstgid);
            var ux = (rId % tileCols) * w;
            var uy = Math.floor(rId / tileCols) * h;
            var sprite = this._priorityTiles[this._priorityTilesCount];
            var layerData = this.data.layers[layerId];
            var offsetX = layerData ? layerData.offsetx || 0 : 0;
            var offsetY = layerData ? layerData.offsety || 0 : 0;
            var ox = 0;
            var oy = 0;
            if (this.roundPixels) {
                ox = Math.floor(this.origin.x);
                oy = Math.floor(this.origin.y);
            }
            else {
                ox = this.origin.x;
                oy = this.origin.y;
            }
            if (this._priorityTilesCount >= this._priorityTiles.length) {
                return;
            }
            sprite.layerId = layerId;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1.0;
            sprite.origX = dx;
            sprite.origY = dy;
            sprite.x = sprite.origX + startX * this._tileWidth - ox + offsetX + w / 2;
            sprite.y = sprite.origY + startY * this._tileHeight - oy + offsetY + h;
            sprite.bitmap = this.bitmaps[textureId];
            sprite.setFrame(ux, uy, w, h);
            sprite.priority = this._getPriority(layerId);
            sprite.z = sprite.zIndex = this._getZIndex(layerId);
            sprite.show();
            this._priorityTilesCount += 1;
        };
        Tiledmap.prototype._getTextureId = function (tileId) {
            var textureId = 0;
            for (var _i = 0, _a = this.data.tilesets; _i < _a.length; _i++) {
                var tileset = _a[_i];
                if (tileId < tileset.firstgid ||
                    tileId >= tileset.firstgid + tileset.tilecount) {
                    textureId++;
                    continue;
                }
                break;
            }
            return textureId;
        };
        Tiledmap.prototype._getAnimTileId = function (textureId, tileId) {
            var tilesData = this.data.tilesets[textureId].tiles;
            if (!tilesData)
                return tileId;
            if (!tilesData[tileId])
                return tileId;
            if (!tilesData[tileId].animation)
                return tileId;
            var animation = tilesData[tileId].animation;
            this._animFrame[tileId] = this._animFrame[tileId] || 0;
            var frame = this._animFrame[tileId];
            this._animFrame[tileId] = !!animation[frame] ? frame : 0;
            frame = this._animFrame[tileId];
            var duration = animation[frame].duration / 1000 * 60;
            this._animDuration[tileId] = this._animDuration[tileId] || duration;
            if (this._animDuration[tileId] <= 0)
                this._animDuration[tileId] = duration;
            return animation[frame].tileid;
        };
        Tiledmap.prototype._getPriority = function (layerId) {
            var layerData = this.data.layers[layerId];
            if (!layerData.properties)
                return 0;
            if (!layerData.properties.priority)
                return 0;
            return parseInt(layerData.properties.priority);
        };
        Tiledmap.prototype._isPriorityTile = function (layerId) {
            var playerZIndex = 3;
            var zIndex = this._getZIndex(layerId);
            return this._getPriority(layerId) > 0 && zIndex === playerZIndex;
        };
        Tiledmap.prototype._getZIndex = function (layerId) {
            var layerData = this.data.layers[layerId];
            if (!layerData) {
                return 0;
            }
            if (!layerData.properties || !layerData.properties.zIndex) {
                return 0;
            }
            return parseInt(layerData.properties.zIndex);
        };
        Tiledmap.prototype.hideOnLevel = function (level) {
            var layerIds = [];
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                var layerData = this.data.layers[layer.layerId];
                if (layerData.properties && layerData.properties.hasOwnProperty("hideOnLevel")) {
                    if (parseInt(layerData.properties.hideOnLevel) !== level) {
                        this.addChild(layer);
                        continue;
                    }
                    layerIds.push(layer.layerId);
                    this.removeChild(layer);
                }
            }
            for (var _b = 0, _c = this._priorityTiles; _b < _c.length; _b++) {
                var sprite = _c[_b];
                if (layerIds.indexOf(sprite.layerId) === -1) {
                    continue;
                }
                sprite.visible = false;
            }
        };
        Tiledmap.prototype._compareChildOrder = function (a, b) {
            if ((a.z || 0) !== (b.z || 0)) {
                return (a.z || 0) - (b.z || 0);
            }
            else if ((a.y || 0) !== (b.y || 0)) {
                return (a.y || 0) - (b.y || 0);
            }
            else if ((a.priority || 0) !== (b.priority || 0)) {
                return (a.priority || 0) - (b.priority || 0);
            }
            else {
                return a.spriteId - b.spriteId;
            }
        };
        return Tiledmap;
    }(ShaderTilemap));
    PE.Tiledmap = Tiledmap;
})(PE || (PE = {}));
DataManager._tempTiledData = null;
DataManager._tiledLoaded = false;
var alias_DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function (mapId) {
    alias_DataManager_loadMapData.call(this, mapId);
    if (mapId > 0) {
        this.loadTiledMapData(mapId);
    }
    else {
        this.unloadTiledMapData();
    }
};
DataManager.loadTiledMapData = function (mapId) {
    var xhr = new XMLHttpRequest();
    var filename = "./maps/map" + mapId + ".json";
    xhr.open('GET', filename);
    xhr.overrideMimeType('application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.responseText !== "") {
                DataManager._tempTiledData = JSON.parse(xhr.responseText);
            }
            else {
                throw new Error("Map Loading Error: couldn't find file " + filename);
            }
            DataManager._tiledLoaded = true;
        }
    };
    try {
        this.unloadTiledMapData();
        xhr.send();
    }
    catch (err) {
        this.unloadTiledMapData();
    }
};
DataManager.unloadTiledMapData = function () {
    DataManager._tempTiledData = null;
    DataManager._tiledLoaded = false;
};
var alias_DataManager_isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function () {
    var defaultLoaded = alias_DataManager_isMapLoaded.call(this);
    var tiledLoaded = DataManager._tiledLoaded;
    return defaultLoaded && tiledLoaded;
};
DataManager.loadTilesetFromSource = function (source, callback) {
    var xhr = new XMLHttpRequest();
    var filepath = source;
    var filepathParts = filepath.split('/');
    var filename = filepathParts[filepathParts.length - 1];
    var path = "./img/tilesets/" + filename;
    xhr.open('GET', path);
    xhr.overrideMimeType('application/json');
    // on success callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.responseText !== "") {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                throw new Error('Map Loading error on tileset: \'' + source + '\'');
            }
        }
    };
    xhr.send();
};
ImageManager.loadParserTileset = function (path, hue) {
    if (!path)
        return this.loadEmptyBitmap();
    var paths = path.split("/");
    var filename = paths[paths.length - 1];
    var realPath = "img/tilesets/" + filename;
    return this.loadNormalBitmap(realPath, hue);
};
//======================================================================================================================
//======================================================================================================================
// Game_CharacterBase, Overwrite zdeep and move distance functions
Game_CharacterBase.prototype.screenZ = function () {
    if (this._priorityType == 0)
        return 1;
    if (this._priorityType == 2)
        return 5;
    return 3;
};
var alias_Game_CharacterBase_distancePerFrame = Game_CharacterBase.prototype.distancePerFrame;
Game_CharacterBase.prototype.distancePerFrame = function () {
    var distance = alias_Game_CharacterBase_distancePerFrame.call(this);
    return distance * (48 / Math.min($gameMap.tileWidth(), $gameMap.tileHeight()));
};
Object.defineProperty(Game_Map.prototype, 'tiledData', {
    get: function () {
        return DataManager._tempTiledData;
    },
    configurable: true
});
Object.defineProperty(Game_Map.prototype, 'currentMapLevel', {
    get: function () {
        var pluginParams = PluginManager.parameters("YED_Tiled");
        var varID = 23;
        if (!varID) {
            return this._currentMapLevel;
        }
        else {
            return $gameVariables.value(varID);
        }
    },
    set: function (value) {
        var pluginParams = PluginManager.parameters("YED_Tiled");
        var varID = 23;
        if (!varID) {
            this._currentMapLevel = value;
        }
        else {
            $gameVariables.setValue(varID, value);
        }
    },
    configurable: true
});
var alias_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
    alias_Game_Map_setup.call(this, mapId);
    this._collisionMap = [];
    this._arrowCollisionMap = [];
    this._regions = [];
    this._mapLevelChange = [];
    this._currentMapLevel = 0;
    this.currentMapLevel = 0;
    if (this.isTiledMap()) {
        $dataMap.width = this.tiledData.width;
        $dataMap.height = this.tiledData.height;
        this._setupTiled();
    }
};
Game_Map.prototype.isTiledMap = function () {
    return !!this.tiledData;
};
Game_Map.prototype._setupTiled = function () {
    this._initializeMapLevel(0);
    this._setupCollision();
    this._setupRegion();
    this._setupMapLevelChange();
    this._setupTiledEvents();
};
Game_Map.prototype._initializeMapLevel = function (id) {
    var width = this.width();
    var height = this.height();
    var size = width * height;
    if (!!this._collisionMap[id])
        return;
    this._collisionMap[id] = [];
    this._arrowCollisionMap[id] = [];
    this._regions[id] = [];
    this._mapLevelChange[id] = [];
    for (var _i = 0, _a = PE.Utils.range(size); _i < _a.length; _i++) {
        var x = _a[_i];
        this._collisionMap[id].push(0);
        this._arrowCollisionMap[id].push(1 | 2 | 4 | 8);
        this._regions[id].push(0);
        this._mapLevelChange[id].push(-1);
    }
};
Game_Map.prototype._setupCollision = function () {
    this._setupCollisionFull();
    this._setupCollisionArrow();
};
Game_Map.prototype._setupCollisionFull = function () {
    var width = this.width();
    var height = this.height();
    var size = width * height;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    if (this.isHalfTile())
        size /= 4;
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layerData = _a[_i];
        if (!layerData.properties || !layerData.properties.collision)
            continue;
        if (layerData.properties.collision !== "full" &&
            layerData.properties.collision !== "up-left" &&
            layerData.properties.collision !== "up-right" &&
            layerData.properties.collision !== "down-left" &&
            layerData.properties.collision !== "down-right") {
            continue;
        }
        var level = parseInt(layerData.properties.level) || 0;
        this._initializeMapLevel(level);
        for (var _b = 0, _c = PE.Utils.range(size); _b < _c.length; _b++) {
            var x = _c[_b];
            var realX = x;
            var ids = [];
            if (this.isHalfTile()) {
                realX = Math.floor(x / halfWidth) * width * 2 + (x % halfWidth) * 2;
            }
            if (!!layerData.data[x]) {
                if (layerData.properties.collision === "full") {
                    ids.push(realX);
                    if (this.isHalfTile()) {
                        ids.push(realX + 1, realX + width, realX + width + 1);
                    }
                }
                if (layerData.properties.collision === "up-left") {
                    ids.push(realX);
                }
                if (layerData.properties.collision === "up-right") {
                    ids.push(realX + 1);
                }
                if (layerData.properties.collision === "down-left") {
                    ids.push(realX + width);
                }
                if (layerData.properties.collision === "down-right") {
                    ids.push(realX + width + 1);
                }
                for (var _d = 0, ids_1 = ids; _d < ids_1.length; _d++) {
                    var id = ids_1[_d];
                    this._collisionMap[level][id] = 1;
                }
            }
        }
    }
};
Game_Map.prototype._setupCollisionArrow = function () {
    var width = this.width();
    var height = this.height();
    var size = width * height;
    var bit = 0;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    if (this.isHalfTile())
        size /= 4;
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layer = _a[_i];
        if (!layer.properties || !layer.properties.collisions)
            continue;
        var level = 0;
        this._initializeMapLevel(level);
        var arrowCollisionMap = this._arrowCollisionMap[level];
        for (var _b = 0, _c = PE.Utils.range(size); _b < _c.length; _b++) {
            var x = _c[_b];
            var realX = x;
            // if (this.isHalfTile()) {
            //   realX = Math.floor(x / halfWidth) * width * 2 + (x % halfWidth) * 2;
            // }
            if (this.tilaHasPropertie(x, 'collideLeft'))
                bit = 1;
            if (this.tilaHasPropertie(x, 'collideUp'))
                bit = 2;
            if (this.tilaHasPropertie(x, 'collideRight'))
                bit = 4;
            if (this.tilaHasPropertie(x, 'collideDown'))
                bit = 8;
            if (!!layer.data[x]) {
                arrowCollisionMap[realX] = arrowCollisionMap[realX] ^ bit;
                // if (this.isHalfTile()) {
                //   arrowCollisionMap[realX + 1] = arrowCollisionMap[realX + 1] ^ bit;
                //   arrowCollisionMap[realX + width] = arrowCollisionMap[realX + width] ^ bit;
                //   arrowCollisionMap[realX + width + 1] = arrowCollisionMap[realX + width + 1] ^ bit;
                // }
            }
            this._arrowCollisionMap[level] = arrowCollisionMap;
        }
    }
};
Game_Map.prototype._setupRegion = function () {
    var width = this.width();
    var height = this.height();
    var size = width * height;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    if (this.isHalfTile())
        size /= 4;
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layerData = _a[_i];
        if (!layerData.properties || !layerData.properties.regionId) {
            continue;
        }
        var level = parseInt(layerData.properties.level) || 0;
        this._initializeMapLevel(level);
        var regionMap = this._regions[level];
        for (var _b = 0, _c = PE.Utils.range(size); _b < _c.length; _b++) {
            var x = _c[_b];
            var realX = x;
            if (this.isHalfTile()) {
                realX = Math.floor(x / halfWidth) * width * 2 + (x % halfWidth) * 2;
            }
            if (!!layerData.data[x]) {
                var properties = this.getTilePropertie(x, function (properties) {
                    return properties;
                });
                regionMap[realX] = parseInt(properties.region);
                if (this.isHalfTile()) {
                    regionMap[realX + 1] = parseInt(properties.region);
                    regionMap[realX + width] = parseInt(properties.region);
                    regionMap[realX + width + 1] = parseInt(properties.region);
                }
            }
        }
    }
};
Game_Map.prototype._setupMapLevelChange = function () {
    var width = this.width();
    var height = this.height();
    var size = width * height;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    if (this.isHalfTile())
        size /= 4;
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layerData = _a[_i];
        if (!layerData.properties || !layerData.properties.toLevel)
            continue;
        var level = parseInt(layerData.properties.level) || 0;
        this._initializeMapLevel(level);
        var levelChangeMap = this._mapLevelChange[level];
        for (var _b = 0, _c = PE.Utils.range(size); _b < _c.length; _b++) {
            var x = _c[_b];
            var realX = x;
            var toLevel = parseInt(layerData.properties.toLevel);
            if (this.isHalfTile()) {
                realX = Math.floor(x / halfWidth) * width * 2 + (x % halfWidth) * 2;
            }
            if (!!layerData.data[x]) {
                levelChangeMap[realX] = toLevel;
                if (this.isHalfTile()) {
                    levelChangeMap[realX + 1] = toLevel;
                    levelChangeMap[realX + width] = toLevel;
                    levelChangeMap[realX + width + 1] = toLevel;
                }
            }
        }
    }
};
Game_Map.prototype._setupTiledEvents = function () {
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layerData = _a[_i];
        if (layerData.type !== "objectgroup")
            continue;
        for (var _b = 0, _c = layerData.objects; _b < _c.length; _b++) {
            var object = _c[_b];
            if (!object.properties)
                continue;
            if (!object.properties.eventId)
                continue;
            var eventId = parseInt(object.properties.eventId);
            var event_1 = this._events[eventId];
            if (!event_1)
                continue;
            var x = Math.floor(object.x / this.tileWidth());
            var y = Math.floor(object.y / this.tileHeight());
            if (this.isHalfTile()) {
                x += 1;
                y += 1;
            }
            event_1.locate(x, y);
        }
    }
};
// Game_Map.prototype.setupEvents = function () {
//   this._events = [];
//   for (var i = 0; i < $dataEvents[this._mapId].length; i++) {
//     if ($dataEvents[this._mapId][i]) {
//       this._events[i] = new Game_Event(this._mapId, i);
//     }
//   }
//   this._commonEvents = this.parallelCommonEvents().map(function (commonEvent) {
//     return new Game_CommonEvent(commonEvent.id);
//   });
//   this.refreshTileEvents();
// };
Game_Map.prototype.isHalfTile = function () { return false; };
Game_Map.prototype.tileWidth = function () {
    var tileWidth = this.tiledData.tilewidth;
    if (this.isHalfTile())
        tileWidth /= 2;
    return tileWidth;
};
Game_Map.prototype.tileHeight = function () {
    var tileHeight = this.tiledData.tileheight;
    if (this.isHalfTile())
        tileHeight /= 2;
    return tileHeight;
};
Game_Map.prototype.width = function () {
    var width = this.tiledData.width;
    if (this.isHalfTile())
        width *= 2;
    return width;
};
Game_Map.prototype.height = function () {
    var height = this.tiledData.height;
    if (this.isHalfTile())
        height *= 2;
    return height;
};
var _regionId = Game_Map.prototype.regionId;
Game_Map.prototype.regionId = function (x, y) {
    if (!this.isTiledMap())
        return _regionId.call(this, x, y);
    var index = x + this.width() * y;
    var regionMap = this._regions[this.currentMapLevel];
    return regionMap[index];
};
var alias_Game_Map_isPassable = Game_Map.prototype.isPassable;
Game_Map.prototype.isPassable = function (x, y, d) {
    if (!this.isTiledMap()) {
        return alias_Game_Map_isPassable.call(this, x, y, d);
    }
    var index = x + this.width() * y;
    var arrows = this._arrowCollisionMap[this.currentMapLevel];
    if (this.tilaHasPropertie(index, 'collide'))
        return false;
    if (d === 6 && (this.tilaHasPropertie(index, 'collideLeft')))
        return false;
    if (d === 2 && (this.tilaHasPropertie(index, 'collideUp')))
        return false;
    if (d === 4 && (this.tilaHasPropertie(index, 'collideRight')))
        return false;
    if (d === 8 && (this.tilaHasPropertie(index, 'collideDown')))
        return false;
    return this._collisionMap[this.currentMapLevel][index] === 0;
};
Game_Map.prototype.checkMapLevelChanging = function (x, y) {
    var mapLevelChange = this._mapLevelChange[this.currentMapLevel];
    var id = y * this.width() + x;
    if (mapLevelChange[id] < 0)
        return false;
    this.currentMapLevel = mapLevelChange[id];
    return true;
};
Game_Map.prototype._getTextureId = function (tileId) {
    var textureId = 0;
    for (var _i = 0, _a = this.tiledData.tilesets; _i < _a.length; _i++) {
        var tileset = _a[_i];
        if (tileId < tileset.firstgid ||
            tileId >= tileset.firstgid + tileset.tilecount) {
            textureId++;
            continue;
        }
        break;
    }
    return textureId;
};
// Game_Map.prototype.getTilePropertie = function (index, attr) {
//   var layers = this.tiledData.layers;
//   // start at the top (layers on top trump layers on bottom)
//   for (const layer of layers) {
//     if (!layer.properties || !layer.properties.collisions) continue;
//     var tileId = layer.data[index];
//     if (tileId <= 0) continue;
//     var textureId = this._getTextureId(tileId);
//     if (!textureId) continue;
//     var localTileId = tileId - this.tiledData.tilesets[textureId].firstgid;
//     if (!this.tiledData.tilesets[textureId].tileproperties) continue;
//     var properties = this.tiledData.tilesets[textureId].tileproperties[localTileId];
//     if (properties && properties[attr]) {
//       return properties[attr];
//     }
//   }
//   return null;
// }
Game_Map.prototype.getTilePropertie = function (tileId, attr) {
    if (tileId <= 0)
        return null;
    var textureId = this._getTextureId(tileId);
    if (!textureId)
        return null;
    6;
    var localTileId = tileId - this.tiledData.tilesets[textureId].firstgid;
    if (!this.tiledData.tilesets[textureId].tileproperties)
        return null;
    var properties = this.tiledData.tilesets[textureId].tileproperties[localTileId];
    if (properties && properties[attr]) {
        return properties[attr];
    }
    return null;
};
Game_Map.prototype.tilaHasPropertie = function (index, propertie) {
    for (var _i = 0, _a = this.tiledData.layers; _i < _a.length; _i++) {
        var layer = _a[_i];
        if (!layer.properties || !layer.properties.collisions)
            continue;
        var result = this.getTilePropertie(layer.data[index], propertie);
        if (!result || result === "false")
            return false;
        return true;
    }
    return false;
};
Game_Map.prototype.checkTilePropertie = function (index, attr) {
    var propertie = this.getTilePropertie(index, attr);
    if (!propertie || propertie === "false")
        return false;
    return true;
};
Game_Map.prototype.isBush = function (x, y) {
    var index = x + this.width() * y;
    return this.isValid(x, y) && this.checkTilePropertie(index, "bush");
};
Game_Map.prototype.terrainTag = function (x, y) {
    var index = x + this.width() * y;
    if (this.isValid(x, y)) {
        var terrainTag = this.getTilePropertie(index, "terrainTag");
        if (terrainTag)
            return terrainTag;
    }
    return 0;
};
var alias_Game_Player_checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function (triggers) {
    alias_Game_Player_checkEventTriggerHere.call(this, triggers);
    this._checkMapLevelChangingHere();
};
Game_Player.prototype._checkMapLevelChangingHere = function () {
    $gameMap.checkMapLevelChanging(this.x, this.y);
};
var alias_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
    if (!$gameMap.isTiledMap()) {
        alias_Spriteset_Map_createTilemap.call(this);
        return;
    }
    this._tilemap = new PE.Tiledmap($gameMap.tiledData);
    this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
    this._tilemap.verticalWrap = $gameMap.isLoopVertical();
    this.loadTileset();
    this._baseSprite.addChild(this._tilemap);
};
var alias_Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
Spriteset_Map.prototype.loadTileset = function () {
    if (!$gameMap.isTiledMap()) {
        alias_Spriteset_Map_loadTileset.call(this);
        return;
    }
    var i = 0;
    var tilesets = [];
    var _loop_1 = function (tileset) {
        if (tileset.image) {
            this_1._tilemap.bitmaps[i] = ImageManager.loadParserTileset(tileset.image, 0);
            i++;
        }
        else {
            DataManager.loadTilesetFromSource(tileset.source, function (data) {
                Object.assign(tileset, data);
                $gameMap._setupCollision();
            });
        }
        tilesets.push(tileset);
    };
    var this_1 = this;
    for (var _i = 0, _a = $gameMap.tiledData.tilesets; _i < _a.length; _i++) {
        var tileset = _a[_i];
        _loop_1(tileset);
    }
    this._tilemap.refreshTileset();
    this._tileset = tilesets;
};
var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this._updateHideOnLevel();
};
Spriteset_Map.prototype.updateTileset = function () {
    if (this._tileset !== $gameMap.tiledData.tilesets) {
        this.loadTileset();
    }
};
Spriteset_Map.prototype._updateHideOnLevel = function () {
    this._tilemap.hideOnLevel($gameMap.currentMapLevel);
};
//======================================================================================================================
Game_CharacterBase.prototype.isMapPassable = function (x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    var d2 = this.reverseDir(d);
    return $gameMap.isPassable(x2, y2, d2);
};
