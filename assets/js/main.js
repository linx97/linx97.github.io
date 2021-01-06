"undefined" == typeof console && (window.console = {}, console.log = console.error = console.info = console.debug = console.warn = console.trace = function() {}), window.performance = window.performance && window.performance.now ? window.performance : Date, Date.now = Date.now || function() {
    return +new Date
}, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function() {
    const start = Date.now();
    return function(callback) {
        window.setTimeout(() => callback(Date.now() - start), 1e3 / 60)
    }
}()), window.defer = window.requestAnimationFrame, window.clearTimeout = function() {
    const _clearTimeout = window.clearTimeout;
    return function(ref) {
        return window.Timer && Timer.__clearTimeout(ref) || _clearTimeout(ref)
    }
}(), window.requestIdleCallback = function() {
    const _requestIdleCallback = window.requestIdleCallback;
    return function(callback, max) {
        return _requestIdleCallback ? _requestIdleCallback(callback, max ? {
            timeout: max
        } : null) : defer(() => {
            callback({
                didTimeout: !1
            })
        }, 0)
    }
}(), window.onIdle = window.requestIdleCallback, "undefined" == typeof Float32Array && (Float32Array = Array), Math.sign = function(x) {
    return 0 === (x = +x) || isNaN(x) ? Number(x) : x > 0 ? 1 : -1
}, Math._round = Math.round, Math.round = function(value, precision = 0) {
    let p = Math.pow(10, precision);
    return Math._round(value * p) / p
}, Math._random = Math.random, Math.rand = Math.random = function(min, max, precision = 0) {
    return void 0 === min ? Math._random() : min === max ? min : (min = min || 0, max = max || 1, 0 == precision ? Math.floor(Math._random() * (max + 1 - min) + min) : Math.round(min + Math._random() * (max - min), precision))
}, Math.degrees = function(radians) {
    return radians * (180 / Math.PI)
}, Math.radians = function(degrees) {
    return degrees * (Math.PI / 180)
}, Math.clamp = function(value, min = 0, max = 1) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
}, Math.map = Math.range = function(value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
    const newValue = (value - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
    return isClamp ? Math.clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax)) : newValue
}, Math.mix = function(a, b, alpha) {
    return a * (1 - alpha) + b * alpha
}, Math.step = function(edge, value) {
    return value < edge ? 0 : 1
}, Math.smoothStep = function(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x)
}, Math.fract = function(value) {
    return value - Math.floor(value)
}, Math.lerp = function(target, value, alpha) {
    let hz = window.Render ? Render.HZ_MULTIPLIER : 1;
    return value + (target - value) * Math.clamp(alpha * hz, 0, 1)
}, Math.mod = function(value, n) {
    return (value % n + n) % n
}, Array.prototype.shuffle = function() {
    let temp, r, i = this.length - 1;
    for (; i > 0;) r = Math.random(0, i, 0), i -= 1, temp = this[i], this[i] = this[r], this[r] = temp;
    return this
}, Array.storeRandom = function(arr) {
    arr.randomStore = []
}, Array.prototype.random = function(range) {
    let value = Math.random(0, this.length - 1);
    if (arguments.length && !this.randomStore && Array.storeRandom(this), !this.randomStore) return this[value];
    if (range > this.length - 1 && (range = this.length), range > 1) {
        for (; ~this.randomStore.indexOf(value);)(value += 1) > this.length - 1 && (value = 0);
        this.randomStore.push(value), this.randomStore.length >= range && this.randomStore.shift()
    }
    return this[value]
}, Array.prototype.remove = function(element) {
    if (!this.indexOf) return;
    const index = this.indexOf(element);
    return ~index ? this.splice(index, 1) : void 0
}, Array.prototype.last = function() {
    return this[this.length - 1]
}, window.Promise = window.Promise || {}, Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
    configurable: !0,
    value: function flat() {
        var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
        return depth ? Array.prototype.reduce.call(this, (function(acc, cur) {
            return Array.isArray(cur) ? acc.push.apply(acc, flat.call(cur, depth - 1)) : acc.push(cur), acc
        }), []) : Array.prototype.slice.call(this)
    },
    writable: !0
}), Promise.create = function() {
    const promise = new Promise((resolve, reject) => {
        this.temp_resolve = resolve, this.temp_reject = reject
    });
    return promise.resolve = this.temp_resolve, promise.reject = this.temp_reject, delete this.temp_resolve, delete this.temp_reject, promise
}, Promise.catchAll = function(array) {
    let promises = [];
    return array.forEach(promise => {
        let p = Promise.create();
        promises.push(p), promise.then(d => p.resolve(d)).catch(e => p.reject(e))
    }), Promise.all(promises)
}, String.prototype.includes = function(str) {
    if (!Array.isArray(str)) return !!~this.indexOf(str);
    for (let i = str.length - 1; i >= 0; i--)
        if (~this.indexOf(str[i])) return !0;
    return !1
}, String.prototype.equals = function(str) {
    let compare = String(this);
    if (!Array.isArray(str)) return str === compare;
    for (let i = str.length - 1; i >= 0; i--)
        if (str[i] === compare) return !0;
    return !1
}, String.prototype.strpos = function(str) {
    return console.warn("strpos deprecated: use .includes()"), this.includes(str)
}, String.prototype.clip = function(num, end = "") {
    return this.length > num ? this.slice(0, Math.max(0, num - end.length)).trim() + end : this.slice()
}, String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}, String.prototype.replaceAll = function(find, replace) {
    return this.split(find).join(replace)
}, String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length)
}, (!window.fetch || !window.AURA && location.protocol.includes("file")) && (window.fetch = function(url, options) {
    options = options || {};
    const promise = Promise.create(),
        request = new XMLHttpRequest;
    request.open(options.method || "get", url), url.includes(".ktx") && (request.responseType = "arraybuffer");
    for (let i in options.headers) request.setRequestHeader(i, options.headers[i]);

    function response() {
        let header, keys = [],
            all = [],
            headers = {};
        return request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, (m, key, value) => {
            keys.push(key = key.toLowerCase()), all.push([key, value]), header = headers[key], headers[key] = header ? `${header},${value}` : value
        }), {
            ok: 1 == (request.status / 200 | 0),
            status: request.status,
            statusText: request.statusText,
            url: request.responseURL,
            clone: response,
            text: () => Promise.resolve(request.responseText),
            json: () => Promise.resolve(request.responseText).then(JSON.parse),
            xml: () => Promise.resolve(request.responseXML),
            blob: () => Promise.resolve(new Blob([request.response])),
            arrayBuffer: () => Promise.resolve(request.response),
            headers: {
                keys: () => keys,
                entries: () => all,
                get: n => headers[n.toLowerCase()],
                has: n => n.toLowerCase() in headers
            }
        }
    }
    return request.onload = () => {
        promise.resolve(response())
    }, request.onerror = promise.reject, request.send(options.body), promise
}), window.get = function(url, options = {
    credentials: "same-origin"
}) {
    let promise = Promise.create();
    return options.method = "GET", fetch(url, options).then((function handleResponse(e) {
        if (!e.ok) return promise.reject(e);
        e.text().then(text => {
            if (text.charAt(0).includes(["[", "{"])) try {
                promise.resolve(JSON.parse(text))
            } catch (err) {
                promise.resolve(text)
            } else promise.resolve(text)
        })
    })).catch(promise.reject), promise
}, window.post = function(url, body = {}, options = {}) {
    let promise = Promise.create();
    return options.method = "POST", body && (options.body = "object" == typeof body || Array.isArray(body) ? JSON.stringify(body) : body), options.headers || (options.headers = {
        "content-type": "application/json"
    }), fetch(url, options).then((function handleResponse(e) {
        if (!e.ok) return promise.reject(e);
        e.text().then(text => {
            if (text.charAt(0).includes(["[", "{"])) try {
                promise.resolve(JSON.parse(text))
            } catch (err) {
                promise.resolve(text)
            } else promise.resolve(text)
        })
    })).catch(promise.reject), promise
}, window.put = function(url, body, options = {}) {
    let promise = Promise.create();
    return options.method = "PUT", body && (options.body = "object" == typeof body || Array.isArray(body) ? JSON.stringify(body) : body), fetch(url, options).then((function handleResponse(e) {
        if (!e.ok) return promise.reject(e);
        e.text().then(text => {
            if (text.charAt(0).includes(["[", "{"])) try {
                promise.resolve(JSON.parse(text))
            } catch (err) {
                promise.resolve(text)
            } else promise.resolve(text)
        })
    })).catch(promise.reject), promise
}, window.Class = function(_class, _type, _static) {
    const _this = this || window,
        _name = _class.name || _class.toString().match(/function ?([^\(]+)/)[1];
    "function" == typeof _type && (_static = _type, _type = null), (_type = (_type || "").toLowerCase()) ? "static" == _type ? _this[_name] = new _class : "singleton" == _type && (_this[_name] = _class, function() {
        let _instance;
        _this[_name].instance = function(a, b, c) {
            return _instance || (_instance = new _class(a, b, c)), _instance
        }
    }(), _static && _static()) : (_this[_name] = _class, _static && _static()), this && this !== window && (this[_name]._namespace = this.__namespace)
}, window.Inherit = function(child, parent) {
    const args = [].slice.call(arguments, 2);
    parent.apply(child, args);
    const save = {};
    for (let method in child) save[method] = child[method];
    defer(() => {
        for (let method in child)
            if (save[method] && child[method] !== save[method]) {
                if ("destroy" == method && child.destroy && !child.__element) throw "Do not override destroy directly, use onDestroy :: " + child.constructor.toString();
                child["_" + method] = save[method]
            }
    })
}, window.Namespace = function(obj) {
    "string" == typeof obj ? window[obj] || (window[obj] = {
        Class: Class,
        __namespace: obj
    }) : (obj.Class = Class, obj.__namespace = obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1])
}, window.Global = {}, window.THREAD = !1, Class((function Hydra() {
    const _this = this,
        _readyPromise = Promise.create();
    var _base, _callbacks = [];

    function initLoad() {
        return document && window ? window._NODE_ ? setTimeout(loaded, 1) : window._AURA_ ? window.Main ? setTimeout(loaded, 1) : setTimeout(initLoad, 1) : void window.addEventListener("load", loaded, !1) : setTimeout(initLoad, 1)
    }

    function loaded() {
        window.removeEventListener("load", loaded, !1), _this.LOCAL = (!window._BUILT_ || window.DREAM_CONFIG) && (location.hostname.indexOf("local") > -1 || "10" == location.hostname.split(".")[0] || "192" == location.hostname.split(".")[0]) && "" == location.port, _callbacks.forEach(cb => cb()), _callbacks = null, _readyPromise.resolve(), window.Main && _readyPromise.then(() => Hydra.Main = new window.Main)
    }
    this.HASH = window.location.hash.slice(1), this.LOCAL = !window._BUILT_ && (location.hostname.indexOf("local") > -1 || "10" == location.hostname.split(".")[0] || "192" == location.hostname.split(".")[0]) && "" == location.port, initLoad(), this.__triggerReady = function() {
        loaded()
    }, this.ready = function(callback) {
        if (!callback) return _readyPromise;
        _callbacks ? _callbacks.push(callback) : callback()
    }, this.absolutePath = function(path) {
        if (window.AURA) return path;
        let base = _base;
        if (void 0 === base) try {
            if (document.getElementsByTagName("base").length > 0) {
                var a = document.createElement("a");
                a.href = document.getElementsByTagName("base")[0].href, base = a.pathname, _base = base
            }
        } catch (e) {
            _base = null
        }
        let pathname = base || location.pathname;
        pathname.includes("/index.html") && (pathname = pathname.replace("/index.html", ""));
        let port = Number(location.port) > 1e3 ? ":" + location.port : "";
        return path.includes("http") ? path : (location.protocol.length ? location.protocol + "//" : "") + (location.hostname + port + pathname + "/" + path).replace("//", "/")
    }
}), "Static"), Class((function Utils() {
    var _queries = {};
    this.query = function(key, value) {
        if (value && (_queries[key] = value), void 0 !== _queries[key]) return _queries[key];
        const str = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        return "0" == str ? (_queries[key] = 0, 0) : str.length && "false" != str ? (_queries[key] = str, str) : (_queries[key] = location.search.includes(key), _queries[key])
    }, this.getConstructorName = function(obj) {
        return obj ? obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1] : obj
    }, this.nullObject = function(object) {
        if (object && (object.destroy || object.div))
            for (var key in object) void 0 !== object[key] && (object[key] = null);
        return null
    }, this.cloneObject = function(obj) {
        return JSON.parse(JSON.stringify(obj))
    }, this.headsTails = function(n0, n1) {
        return Math.random(0, 1) ? n1 : n0
    }, this.mergeObject = function() {
        for (var obj = {}, i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            for (var key in o) obj[key] = o[key]
        }
        return obj
    }, this.timestamp = this.uuid = function() {
        return Date.now() + "xx-4xx-yxx-xxx".replace(/[xy]/g, (function(c) {
            let r = 16 * Math.random() | 0;
            return ("x" == c ? r : 3 & r | 8).toString(16)
        }))
    }, this.randomColor = function() {
        var color = "#" + Math.floor(16777215 * Math.random()).toString(16);
        return color.length < 7 && (color = this.randomColor()), color
    }, this.numberWithCommas = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }, this.padInt = function(num, digits, isLimit) {
        isLimit && (num = Math.min(num, Math.pow(10, digits) - 1));
        let str = Math.floor(num).toString();
        return Math.pow(10, Math.max(0, digits - str.length)).toString().slice(1) + str
    }, this.copyToClipboard = function(string) {
        try {
            var el = document.createElement("textarea"),
                range = document.createRange();
            el.contentEditable = !0, el.readOnly = !0, el.value = string, document.body.appendChild(el), el.select(), range.selectNodeContents(el);
            var s = window.getSelection();
            return s.removeAllRanges(), s.addRange(range), el.setSelectionRange(0, string.length), document.execCommand("copy"), document.body.removeChild(el), !0
        } catch (e) {
            return !1
        }
    }, this.stringList = function(items = [], limit = 0, options = {}) {
        if (0 === items.length) return "";
        let output = "",
            printed = 0;
        "object" == typeof limit && (options = limit, limit = 0), options.oxford = !0 === options.oxford, options.more = !1 !== options.more && (options.more ? options.more : "more"), options.and = options.and ? options.and : "&", options.comma = options.comma ? options.comma : ",", isNaN(options.limit) || (limit = options.limit), 0 === limit && (limit = items.length);
        do {
            output = `${output}${items.shift()}${options.comma} `, printed++
        } while (items.length > 1 && printed + 1 < limit);
        if (output = output.trim(), output = output.slice(0, output.length - 1), 1 === items.length) output = `${output}${options.oxford&&printed>1?options.comma:""} ${options.and} ${items.shift()}`;
        else if (items.length > 1 && options.more) {
            let more = `${items.length} ${options.more}`;
            output = `${output}${options.oxford&&printed>1?options.comma:""} ${options.and} ${more}`
        }
        return output
    }
}), "Static"), Class((function Render() {
    const _this = this,
        _render = [],
        _drawFrame = [],
        _multipliers = [];
    var _last = performance.now(),
        _localTSL = 0,
        _sampleRefreshRate = [],
        _firstSample = !1,
        rAF = requestAnimationFrame;

    function render(tsl) {
        if (_this.timeScaleUniform.value = 1, _multipliers.length)
            for (let i = 0; i < _multipliers.length; i++) {
                let obj = _multipliers[i];
                _this.timeScaleUniform.value *= obj.value
            }
        _this.DT = tsl - _last;
        let delta = _this.DT * _this.timeScaleUniform.value;
        if (delta = Math.min(200, delta), _last = tsl, _this.startFrame && _this.startFrame(tsl, delta), _sampleRefreshRate) {
            let fps = 1e3 / _this.DT;
            if (_sampleRefreshRate.push(fps), _sampleRefreshRate.length > 30) {
                _sampleRefreshRate.sort((a, b) => a - b);
                let rate = _sampleRefreshRate[Math.round(_sampleRefreshRate.length / 2)];
                rate = _this.REFRESH_TABLE.reduce((prev, curr) => Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev), _this.REFRESH_RATE = _firstSample ? Math.max(_this.REFRESH_RATE, rate) : rate, _this.HZ_MULTIPLIER = 60 / _this.REFRESH_RATE, _sampleRefreshRate = null, _firstSample = !0
            }
        }
        _this.TIME = tsl, _this.DELTA = delta, _localTSL += delta;
        for (let i = _render.length - 1; i >= 0; i--) {
            var callback = _render[i];
            if (callback)
                if (callback.fps) {
                    if (tsl - callback.last < 1e3 / callback.fps) continue;
                    callback(++callback.frame), callback.last = tsl
                } else callback(tsl, delta);
            else _render.remove(callback)
        }
        for (let i = _drawFrame.length - 1; i > -1; i--) _drawFrame[i](tsl, delta);
        _this.drawFrame && _this.drawFrame(tsl, delta), _this.endFrame && _this.endFrame(tsl, delta), THREAD || _this.isPaused || rAF(render)
    }
    this.timeScaleUniform = {
        value: 1,
        type: "f",
        ignoreUIL: !0
    }, this.REFRESH_TABLE = [30, 60, 72, 90, 120, 144, 240], this.REFRESH_RATE = 60, this.HZ_MULTIPLIER = 1, THREAD || (rAF(render), setInterval(_ => _sampleRefreshRate = [], 3e3)), this.now = function() {
        return _localTSL
    }, this.start = function(callback, fps) {
        fps && (callback.fps = fps, callback.last = -1 / 0, callback.frame = -1), ~_render.indexOf(callback) || _render.unshift(callback)
    }, this.stop = function(callback) {
        _render.remove(callback)
    }, this.tick = function() {
        THREAD && (this.TIME = performance.now(), render(this.TIME))
    }, this.Worker = function(_callback, _budget = 4) {
        Inherit(this, Component);
        let _scope = this,
            _elapsed = 0;

        function loop() {
            for (; _elapsed < _budget;) {
                if (_scope.dead) return;
                const start = performance.now();
                _callback && _callback(), _elapsed += performance.now() - start
            }
            _elapsed = 0
        }
        this.startRender(loop), this.stop = function() {
            this.dead = !0, this.stopRender(loop)
        }, this.pause = function() {
            this.stopRender(loop)
        }, this.resume = function() {
            this.startRender(loop)
        }
    }, this.pause = function() {
        _this.isPaused = !0
    }, this.resume = function() {
        _this.isPaused && (_this.isPaused = !1, rAF(render))
    }, this.useRAF = function(raf) {
        _firstSample = null, _last = performance.now(), (rAF = raf)(render)
    }, this.onDrawFrame = function(cb) {
        _drawFrame.push(cb)
    }, this.setTimeScale = function(v) {
        _this.timeScaleUniform.value = v
    }, this.getTimeScale = function() {
        return _this.timeScaleUniform.value
    }, this.createTimeMultiplier = function() {
        let obj = {
            value: 1
        };
        return _multipliers.push(obj), obj
    }, this.destroyTimeMultiplier = function(obj) {
        _multipliers.remove(obj)
    }, this.tweenTimeScale = function(value, time, ease, delay) {
        return tween(_this.timeScaleUniform, {
            value: value
        }, time, ease, delay, null, null, !0)
    }
}), "Static"), Class((function Timer() {
    const _this = this,
        _callbacks = [],
        _discard = [],
        _deferA = [],
        _deferB = [];
    var _defer = _deferA;

    function loop(t, delta) {
        for (let i = _discard.length - 1; i >= 0; i--) {
            let obj = _discard[i];
            obj.callback = null, _callbacks.remove(obj)
        }
        _discard.length && (_discard.length = 0);
        for (let i = _callbacks.length - 1; i >= 0; i--) {
            let obj = _callbacks[i];
            obj ? (obj.scaledTime ? obj.current += delta : obj.current += Render.DT, obj.current >= obj.time && (obj.callback && obj.callback(), _discard.push(obj))) : _callbacks.remove(obj)
        }
        for (let i = _defer.length - 1; i > -1; i--) _defer[i]();
        _defer.length = 0, _defer = _defer == _deferA ? _deferB : _deferA
    }
    Render.start(loop), this.__clearTimeout = function(ref) {
        const obj = function find(ref) {
            for (let i = _callbacks.length - 1; i > -1; i--)
                if (_callbacks[i].ref == ref) return _callbacks[i]
        }(ref);
        return !!obj && (obj.callback = null, _callbacks.remove(obj), !0)
    }, this.create = function(callback, time, scaledTime) {
        if (window._NODE_) return setTimeout(callback, time);
        const obj = {
            time: Math.max(1, time || 1),
            current: 0,
            ref: Utils.timestamp(),
            callback: callback,
            scaledTime: scaledTime
        };
        return _callbacks.unshift(obj), obj.ref
    }, this.delayedCall = function(time) {
        let promise = Promise.create();
        return _this.create(promise.resolve, time), promise
    }, window.defer = this.defer = function(callback) {
        if (!callback) {
            callback = Promise.create().resolve
        }(_defer == _deferA ? _deferB : _deferA).unshift(callback)
    }
}), "static"), Class((function Events() {
    this.events = {};
    const _e = {},
        _linked = [];
    let _emitter;
    this.events.sub = function(obj, evt, callback) {
        if ("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), callback;
        let emitter = obj.events.emitter();
        return emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), emitter._saveLink(this), _linked.push(emitter), callback
    }, this.events.unsub = function(obj, evt, callback) {
        if ("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._removeEvent(evt, callback.resolve ? callback.resolve : callback);
        obj.events.emitter()._removeEvent(evt, callback.resolve ? callback.resolve : callback)
    }, this.events.fire = function(evt, obj, isLocalOnly) {
        (obj = obj || _e).target = this, Events.emitter._check(evt), _emitter && _emitter._fireEvent(evt, obj) || isLocalOnly || Events.emitter._fireEvent(evt, obj)
    }, this.events.bubble = function(obj, evt) {
        let _this = this;
        _this.sub(obj, evt, e => _this.fire(evt, e))
    }, this.events.destroy = function() {
        return Events.emitter._destroyEvents(this), _linked && _linked.forEach(emitter => emitter._destroyEvents(this)), _emitter && _emitter.links && _emitter.links.forEach(obj => obj.events && obj.events._unlink(_emitter)), null
    }, this.events.emitter = function() {
        return _emitter || (_emitter = Events.emitter.createLocalEmitter()), _emitter
    }, this.events._unlink = function(emitter) {
        _linked.remove(emitter)
    }
}), () => {
    Events.emitter = new function Emitter() {
        const prototype = Emitter.prototype;
        if (this.events = [], void 0 !== prototype._check) return;
        prototype._check = function(evt) {
            if (void 0 === evt) throw "Undefined event"
        }, prototype._addEvent = function(evt, callback, object) {
            this._check(evt), this.events.push({
                evt: evt,
                object: object,
                callback: callback
            })
        }, prototype._removeEvent = function(eventString, callback) {
            this._check(eventString);
            let _this = this,
                marked = !1;
            for (let i = this.events.length - 1; i >= 0; i--) this.events[i].evt == eventString && this.events[i].callback == callback && (this.events[i].markedForDeletion = !0, marked = !0);
            marked && defer(() => _this._sweepEvents())
        }, prototype._sweepEvents = function() {
            for (let i = 0; i < this.events.length; i++) this.events[i].markedForDeletion && this.events.remove(this.events[i])
        }, prototype._fireEvent = function(eventString, obj) {
            this._check && this._check(eventString), obj = obj || _e;
            let called = !1;
            for (let i = 0; i < this.events.length; i++) {
                let evt = this.events[i];
                evt.evt != eventString || evt.markedForDeletion || (evt.callback(obj), called = !0)
            }
            return called
        }, prototype._destroyEvents = function(object) {
            for (var i = this.events.length - 1; i >= 0; i--) this.events[i].object == object && (this.events.splice(i, 1)[0] = null)
        }, prototype._saveLink = function(obj) {
            this.links || (this.links = []), ~this.links.indexOf(obj) || this.links.push(obj)
        }, prototype.createLocalEmitter = function() {
            return new Emitter
        }
    }, Events.broadcast = Events.emitter._fireEvent, Events.VISIBILITY = "hydra_visibility", Events.HASH_UPDATE = "hydra_hash_update", Events.COMPLETE = "hydra_complete", Events.PROGRESS = "hydra_progress", Events.UPDATE = "hydra_update", Events.LOADED = "hydra_loaded", Events.END = "hydra_end", Events.FAIL = "hydra_fail", Events.SELECT = "hydra_select", Events.ERROR = "hydra_error", Events.READY = "hydra_ready", Events.RESIZE = "hydra_resize", Events.CLICK = "hydra_click", Events.HOVER = "hydra_hover", Events.MESSAGE = "hydra_message", Events.ORIENTATION = "orientation", Events.BACKGROUND = "background", Events.BACK = "hydra_back", Events.PREVIOUS = "hydra_previous", Events.NEXT = "hydra_next", Events.RELOAD = "hydra_reload", Events.UNLOAD = "hydra_unload", Events.FULLSCREEN = "hydra_fullscreen";
    const _e = {};
    Hydra.ready(() => {
        let timer;

        function updateStage() {
            Stage.width = window.innerWidth || document.body.clientWidth || document.documentElement.offsetWidth, Stage.height = window.innerHeight || document.body.clientHeight || document.documentElement.offsetHeight
        }! function() {
            let _last, _lastTime = performance.now();

            function onfocus() {
                "focus" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                    type: "focus"
                }), _last = "focus"
            }

            function onblur() {
                "blur" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                    type: "blur"
                }), _last = "blur"
            }
            Timer.create((function addVisibilityHandler() {
                let hidden, eventName;
                if ([
                        ["msHidden", "msvisibilitychange"],
                        ["webkitHidden", "webkitvisibilitychange"],
                        ["hidden", "visibilitychange"]
                    ].forEach(d => {
                        void 0 !== document[d[0]] && (hidden = d[0], eventName = d[1])
                    }), !eventName) {
                    const root = "ie" == Device.browser ? document : window;
                    return root.onfocus = onfocus, void(root.onblur = onblur)
                }
                document.addEventListener(eventName, () => {
                    const time = performance.now();
                    time - _lastTime > 10 && (!1 === document[hidden] ? onfocus() : onblur()), _lastTime = time
                })
            }), 250), window.onbeforeunload = _ => (Events.emitter._fireEvent(Events.UNLOAD), null)
        }(), window.Stage = window.Stage || {}, updateStage(), window.addEventListener("resize", (function() {
            clearTimeout(timer), timer = setTimeout(_ => {
                updateStage(), Events.emitter._fireEvent(Events.RESIZE)
            }, 16)
        })), window.onorientationchange = window.onresize, defer(window.onresize)
    })
}), Class((function Device() {
    var vid, _this = this;
    this.agent = navigator.userAgent.toLowerCase(), this.detect = function(match) {
        return this.agent.includes(match)
    }, this.touchCapable = !!navigator.maxTouchPoints, this.pixelRatio = window.devicePixelRatio, this.system = {}, this.system.retina = window.devicePixelRatio > 1, this.system.webworker = void 0 !== window.Worker, window._NODE_ || (this.system.geolocation = void 0 !== navigator.geolocation), window._NODE_ || (this.system.pushstate = void 0 !== window.history.pushState), this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia), this.system.language = window.navigator.userLanguage || window.navigator.language, this.system.webaudio = void 0 !== window.AudioContext, this.system.xr = navigator.getVRDisplays || navigator.xr, this.system.exokit = _this.detect("exokit");
    try {
        this.system.localStorage = void 0 !== window.localStorage
    } catch (e) {
        this.system.localStorage = !1
    }
    this.system.fullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled, this.system.os = _this.detect(["exokit"]) && "linux" == navigator.platform ? "magicleap" : _this.detect(["ipad", "iphone", "ios"]) || _this.detect("mac") && _this.touchCapable && Math.max(screen.width, screen.height) < 1370 ? "ios" : _this.detect(["android", "kindle"]) ? "android" : _this.detect(["blackberry"]) ? "blackberry" : _this.detect(["mac os"]) ? "mac" : _this.detect(["windows", "iemobile"]) ? "windows" : _this.detect(["linux"]) ? "linux" : "unknown", this.system.version = function() {
        try {
            if ("ios" == _this.system.os) {
                if (_this.agent.includes("intel mac")) {
                    let split = _this.agent.split("version/")[1].split(" ")[0].split(".");
                    return Number(split[0] + "." + split[1])
                }
                var num = _this.agent.split("os ")[1].split("_"),
                    main = num[0],
                    sub = num[1].split(" ")[0];
                return Number(main + "." + sub)
            }
            if ("android" == _this.system.os) {
                var version = _this.agent.split("android ")[1].split(";")[0];
                return version.length > 3 && (version = version.slice(0, -2)), "." == version.charAt(version.length - 1) && (version = version.slice(0, -1)), Number(version)
            }
            if ("windows" == _this.system.os) return _this.agent.includes("rv:11") ? 11 : Number(_this.agent.split("windows phone ")[1].split(";")[0])
        } catch (e) {}
        return -1
    }(), this.system.browser = "ios" == _this.system.os ? _this.detect(["twitter", "fbios"]) ? "social" : _this.detect(["crios"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : "unknown" : "android" == _this.system.os ? _this.detect(["twitter", "fb", "facebook"]) ? "social" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["firefox"]) ? "firefox" : "browser" : _this.detect(["msie"]) || _this.detect(["trident"]) && _this.detect(["rv:"]) || _this.detect(["windows"]) && _this.detect(["edge"]) ? "ie" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : _this.detect(["firefox"]) ? "firefox" : "unknown", this.system.browserVersion = function() {
        try {
            if ("chrome" == _this.system.browser) return Number(_this.agent.split("chrome/")[1].split(".")[0]);
            if ("firefox" == _this.system.browser) return Number(_this.agent.split("firefox/")[1].split(".")[0]);
            if ("safari" == _this.system.browser) return Number(_this.agent.split("version/")[1].split(".")[0].split(".")[0]);
            if ("ie" == _this.system.browser) return _this.detect(["msie"]) ? Number(_this.agent.split("msie ")[1].split(".")[0]) : _this.detect(["rv:"]) ? Number(_this.agent.split("rv:")[1].split(".")[0]) : Number(_this.agent.split("edge/")[1].split(".")[0])
        } catch (e) {
            return -1
        }
    }(), this.mobile = !(window._NODE_ || !("ontouchstart" in window) && !("onpointerdown" in window) || !_this.system.os.includes(["ios", "android", "magicleap"])) && {}, this.mobile && this.detect(["windows"]) && !this.detect(["touch"]) && (this.mobile = !1), this.mobile && (this.mobile.tablet = Math.max(window.screen ? screen.width : window.innerWidth, window.screen ? screen.height : window.innerHeight) > 1e3, this.mobile.phone = !this.mobile.tablet, this.mobile.pwa = !(!window.matchMedia || !window.matchMedia("(display-mode: standalone)").matches) || !!window.navigator.standalone, Hydra.ready(() => {
        _this.mobile.native = !(!Mobile.NativeCore || !Mobile.NativeCore.active) || !!window._AURA_
    })), this.media = {}, this.media.audio = !!document.createElement("audio").canPlayType && (_this.detect(["firefox", "opera"]) ? "ogg" : "mp3"), this.media.video = !!(vid = document.createElement("video")).canPlayType && (vid.canPlayType("video/webm;") ? "webm" : "mp4"), this.media.webrtc = !!(window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection || window.oRTCPeerConnection || window.RTCPeerConnection), this.graphics = {}, this.graphics.webgl = function() {
        let DISABLED = !1;
        Object.defineProperty(_this.graphics, "webgl", {
            get: () => {
                if (DISABLED) return !1;
                if (_this.graphics._webglContext) return _this.graphics._webglContext;
                try {
                    const names = ["webgl2", "webgl", "experimental-webgl"],
                        canvas = document.createElement("canvas");
                    let gl;
                    for (let i = 0; i < names.length && (gl = canvas.getContext(names[i]), !gl); i++);
                    let info = gl.getExtension("WEBGL_debug_renderer_info"),
                        output = {};
                    if (info) {
                        let gpu = info.UNMASKED_RENDERER_WEBGL;
                        output.gpu = gl.getParameter(gpu).toLowerCase()
                    }
                    return output.renderer = gl.getParameter(gl.RENDERER).toLowerCase(), output.version = gl.getParameter(gl.VERSION).toLowerCase(), output.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase(), output.extensions = gl.getSupportedExtensions(), output.webgl2 = output.version.includes(["webgl 2", "webgl2"]), output.canvas = canvas, output.context = gl, output.detect = function(matches) {
                        if (output.gpu && output.gpu.toLowerCase().includes(matches)) return !0;
                        if (output.version && output.version.toLowerCase().includes(matches)) return !0;
                        for (let i = 0; i < output.extensions.length; i++)
                            if (output.extensions[i].toLowerCase().includes(matches)) return !0;
                        return !1
                    }, output.webgl2 || output.detect("instance") || window.AURA || (DISABLED = !0), _this.graphics._webglContext = output, output
                } catch (e) {
                    return !1
                }
            },
            set: v => {
                !1 === v && (DISABLED = !0)
            }
        })
    }(), this.graphics.metal = function() {
        if (!window.Metal) return !1;
        let output = {};
        return output.gpu = Metal.device.getName().toLowerCase(), output.detect = function(matches) {
            return output.gpu.includes(matches)
        }, output
    }(), this.graphics.gpu = function() {
        if (!_this.graphics.webgl && !_this.graphics.metal) return !1;
        let output = {};
        return ["metal", "webgl"].forEach(name => {
            _this.graphics[name] && !output.identifier && (output.detect = _this.graphics[name].detect, output.identifier = _this.graphics[name].gpu)
        }), output
    }(), this.graphics.canvas = !!document.createElement("canvas").getContext;
    const checkForStyle = function() {
        let _tagDiv;
        return function(prop) {
            _tagDiv = _tagDiv || document.createElement("div");
            const vendors = ["Khtml", "ms", "O", "Moz", "Webkit"];
            if (prop in _tagDiv.style) return !0;
            prop = prop.replace(/^[a-z]/, val => val.toUpperCase());
            for (let i = vendors.length - 1; i >= 0; i--)
                if (vendors[i] + prop in _tagDiv.style) return !0;
            return !1
        }
    }();
    this.styles = {}, this.styles.filter = checkForStyle("filter"), this.styles.blendMode = checkForStyle("mix-blend-mode"), this.tween = {}, this.tween.transition = checkForStyle("transition"), this.tween.css2d = checkForStyle("transform"), this.tween.css3d = checkForStyle("perspective")
}), "Static"), Class((function Component() {
    Inherit(this, Events);
    const _this = this,
        _setters = {},
        _flags = {},
        _timers = [],
        _loops = [];
    var _postLoops, _onDestroy;

    function defineSetter(_this, prop) {
        _setters[prop] = {}, Object.defineProperty(_this, prop, {
            set: function(v) {
                _setters[prop] && _setters[prop].s && _setters[prop].s.call(_this, v), v = null
            },
            get: function() {
                if (_setters[prop] && _setters[prop].g) return _setters[prop].g.apply(_this)
            }
        })
    }
    this.classes = {}, this.findParent = function(type) {
        let p = _this.parent;
        for (; p;) {
            if (p._cachedName || (p._cachedName = Utils.getConstructorName(p)), p._cachedName == type) return p;
            p = p.parent
        }
    }, this.set = function(prop, callback) {
        _setters[prop] || defineSetter(this, prop), _setters[prop].s = callback
    }, this.get = function(prop, callback) {
        _setters[prop] || defineSetter(this, prop), _setters[prop].g = callback
    }, this.isPlayground = function(name) {
        return Global.PLAYGROUND && Global.PLAYGROUND == (name || Utils.getConstructorName(_this))
    }, this.initClass = function(clss) {
        if (!clss) throw "unable to locate class";
        const args = [].slice.call(arguments, 1),
            child = Object.create(clss.prototype);
        if (child.parent = this, clss.apply(child, args), child.destroy) {
            const id = Utils.timestamp();
            this.classes[id] = child, this.classes[id].__id = id
        }
        if (child.element) {
            const last = arguments[arguments.length - 1];
            Array.isArray(last) && 1 == last.length && last[0] instanceof HydraObject ? last[0].add(child.element) : this.element && null !== last && this.element.add(child.element)
        }
        if (child.group) {
            const last = arguments[arguments.length - 1];
            this.group && null !== last && this.group.add(child.group)
        }
        return child
    }, this.delayedCall = function(callback, time, scaledTime) {
        const timer = Timer.create(() => {
            _this && _this.destroy && callback && callback()
        }, time, scaledTime);
        return _timers.push(timer), _timers.length > 50 && _timers.shift(), timer
    }, this.clearTimers = function() {
        for (let i = _timers.length - 1; i >= 0; i--) clearTimeout(_timers[i]);
        _timers.length = 0
    }, this.startRender = function(callback, fps, obj) {
        "object" == typeof fps && (obj = fps, fps = void 0);
        for (let i = 0; i < _loops.length; i++)
            if (_loops[i].callback == callback) return;
        let flagInvisible = _ => {
                _this._invisible || (_this._invisible = !0, _this.onInvisible && _this.onInvisible())
            },
            loop = (a, b, c, d) => {
                if (!_this.startRender) return !1;
                let p = _this;
                for (; p;) {
                    if (!1 === p.visible) return flagInvisible();
                    if (p.group && !1 === p.group.visible) return flagInvisible();
                    p = p.parent
                }
                return !1 !== _this._invisible && (_this._invisible = !1, _this.onVisible && _this.onVisible()), callback(a, b, c, d), !0
            };
        _loops.push({
            callback: callback,
            loop: loop
        }), obj ? (window.RenderManager && obj == window.RenderManager && (RenderManager.type == RenderManager.WEBVR ? _this.events.sub(RenderManager.EYE_RENDER, loop) : _this.events.sub(RenderManager.RENDER, loop)), window.Nuke && obj instanceof window.Nuke ? _this.events.sub(obj, Nuke.RENDER, loop) : obj._onPostLoop && obj._onPostLoop(loop)) : Render.start(loop, fps)
    }, this.postLoop = function() {
        _postLoops && _postLoops.forEach(cb => {
            !1 === cb() && _postLoops.remove(cb)
        })
    }, this._onPostLoop = function(callback) {
        _postLoops || (_postLoops = []), _postLoops.push(callback)
    }, this.onResize = function(callback) {
        callback(), this.events.sub(Events.RESIZE, callback)
    }, this.stopRender = function(callback, obj) {
        for (let i = 0; i < _loops.length; i++)
            if (_loops[i].callback == callback) {
                let loop = _loops[i].loop;
                obj && (window.RenderManager && obj == window.RenderManager && (RenderManager.type == RenderManager.WEBVR ? _this.events.unsub(RenderManager.EYE_RENDER, loop) : _this.events.unsub(RenderManager.RENDER, loop)), window.Nuke && obj instanceof window.Nuke && _this.events.unsub(obj, Nuke.RENDER, loop)), Render.stop(loop), _loops.splice(i, 1)
            }
    }, this.clearRenders = function() {
        for (let i = 0; i < _loops.length; i++) Render.stop(_loops[i].loop);
        _loops.length = 0
    }, this.wait = function(object, key, callback) {
        const promise = Promise.create();
        if ("string" == typeof object && (callback = key, key = object, object = _this), "number" == typeof object && !key) return _this.delayedCall(promise.resolve, object), promise;
        if ("function" == typeof object && "function" != typeof callback) {
            let _object = object;
            object = key, key = callback, callback = _object
        }
        if (callback = callback || promise.resolve, object[key] || _this.flag(key)) callback();
        else {
            Render.start((function test() {
                if (!object || !_this.flag) return Render.stop(test);
                (object[key] || _this.flag(key)) && (callback(), Render.stop(test))
            }))
        }
        return promise
    }, this.flag = function(name, value, time) {
        if (void 0 === value) return _flags[name];
        _flags[name] = value, time && (clearTimeout(_flags[name + "_timer"]), _flags[name + "_timer"] = this.delayedCall(() => {
            _flags[name] = !_flags[name]
        }, time))
    }, this.destroy = function() {
        this.removeDispatch && this.removeDispatch(), this.onDestroy && this.onDestroy(), this.fxDestroy && this.fxDestroy(), _onDestroy && _onDestroy.forEach(cb => cb());
        for (let id in this.classes) {
            var clss = this.classes[id];
            clss && clss.destroy && clss.destroy()
        }
        return this.classes = null, this.clearRenders && this.clearRenders(), this.clearTimers && this.clearTimers(), this.element && window.GLUI && this.element instanceof GLUIObject && this.element.remove(), this.events && (this.events = this.events.destroy()), this.parent && this.parent.__destroyChild && this.parent.__destroyChild(this.__id), Utils.nullObject(this)
    }, this._bindOnDestroy = function(cb) {
        _onDestroy || (_onDestroy = []), _onDestroy.push(cb)
    }, this.__destroyChild = function(name) {
        delete this.classes[name]
    }
})), Class((function Model() {
    Inherit(this, Component), Namespace(this);
    const _this = this,
        _storage = {};
    let _data = 0,
        _triggered = 0;
    this.push = function(name, val) {
        _storage[name] = val
    }, this.pull = function(name) {
        return _storage[name]
    }, this.waitForData = this.promiseData = function(num = 1) {
        _data += num
    }, this.fulfillData = this.resolveData = function() {
        _triggered++, _triggered == _data && (_this.dataReady = !0)
    }, this.ready = function(callback) {
        let promise = Promise.create();
        return callback && promise.then(callback), _this.wait(_this, "dataReady").then(promise.resolve), promise
    }, this.initWithData = function(data) {
        for (var key in _this.STATIC_DATA = data, _this) {
            var model = _this[key],
                init = !1;
            for (var i in data) i.toLowerCase().replace(/-/g, "") == key.toLowerCase() && (init = !0, model.init && model.init(data[i]));
            !init && model.init && model.init()
        }
        _this.init && _this.init(data)
    }, this.loadData = function(url, callback) {
        let promise = Promise.create();
        callback || (callback = promise.resolve);
        var _this = this;
        return get(url + "?" + Utils.timestamp()).then(d => {
            defer(() => {
                _this.initWithData(d), callback(d)
            })
        }), promise
    }
})), Class((function Modules() {
    const _modules = {},
        _constructors = {};

    function exec() {
        for (let m in _modules)
            for (let key in _modules[m]) {
                let module = _modules[m][key];
                module._ready || (module._ready = !0, module.exec && module.exec())
            }
    }
    defer(exec), this.Module = function(module) {
        let m = new module,
            name = module.toString().slice(0, 100).match(/function ([^\(]+)/);
        name ? (m._ready = !0, name = name[1], _modules[name] = {
            index: m
        }, _constructors[name] = module) : (_modules[m.module] || (_modules[m.module] = {}), _modules[m.module][m.path] = m)
    }, this.require = function(path) {
        let root;
        return path.includes("/") ? (root = path.split("/")[0], path = path.replace(root + "/", "")) : (root = path, path = "index"),
            function requireModule(root, path) {
                let module = _modules[root];
                if (!module) throw `Module ${root} not found`;
                return module = module[path], module._ready || (module._ready = !0, module.exec && module.exec()), module
            }(root, path).exports
    }, this.getConstructor = function(name) {
        return _constructors[name]
    }, window.Module = this.Module, window._NODE_ || (window.requireNative = window.require, window.require = this.require)
}), "Static"), Class((function LinkedList() {
    var prototype = LinkedList.prototype;
    this.length = 0, this.first = null, this.last = null, this.current = null, this.prev = null, void 0 === prototype.push && (prototype.push = function(obj) {
        this.first ? (obj.__next = this.first, obj.__prev = this.last, this.last.__next = obj, this.last = obj) : (this.first = obj, this.last = obj, obj.__prev = obj, obj.__next = obj), this.length++
    }, prototype.remove = function(obj) {
        obj && obj.__next && (this.length <= 1 ? this.empty() : (obj == this.first ? (this.first = obj.__next, this.last.__next = this.first, this.first.__prev = this.last) : obj == this.last ? (this.last = obj.__prev, this.last.__next = this.first, this.first.__prev = this.last) : (obj.__prev.__next = obj.__next, obj.__next.__prev = obj.__prev), this.length--), obj.__prev = null, obj.__next = null)
    }, prototype.empty = function() {
        this.first = null, this.last = null, this.current = null, this.prev = null, this.length = 0
    }, prototype.start = function() {
        return this.current = this.first, this.prev = this.current, this.current
    }, prototype.next = function() {
        if (this.current && (this.current = this.current.__next, 1 != this.length && this.prev.__next != this.first)) return this.prev = this.current, this.current
    }, prototype.destroy = function() {
        return Utils.nullObject(this), null
    })
})), Class((function ObjectPool(_type, _number = 10) {
    var _pool = [];
    this.array = _pool,
        function() {
            if (_type)
                for (var i = 0; i < _number; i++) _pool.push(new _type)
        }(), this.get = function() {
            return _pool.shift() || (_type ? new _type : null)
        }, this.empty = function() {
            _pool.length = 0
        }, this.put = function(obj) {
            obj && _pool.push(obj)
        }, this.insert = function(array) {
            void 0 === array.push && (array = [array]);
            for (var i = 0; i < array.length; i++) _pool.push(array[i])
        }, this.length = function() {
            return _pool.length
        }, this.randomize = function() {
            let array = _pool;
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]
            }
        }, this.destroy = function() {
            for (let i = _pool.length - 1; i >= 0; i--) _pool[i].destroy && _pool[i].destroy();
            return _pool = null
        }
})), Class((function Gate() {
    var _list = [],
        _map = {};
    this.create = function(name) {
        let promise = Promise.create();
        name ? _map[name] = promise : _list.push(promise)
    }, this.open = function(name) {
        name && (_map[name] || (_map[name] = Promise.create()), _map[name].resolve());
        let promise = _list.shift();
        promise && promise.resolve()
    }, this.wait = function(name) {
        return _list.length || name ? name ? (_map[name] || (_map[name] = Promise.create()), _map[name]) : _list[_list.length - 1] || Promise.resolve() : Promise.resolve()
    }
}), "static"), Class((function Assets() {
    const _this = this;

    function AssetList(arr) {
        return arr.__proto__ = AssetList.prototype, arr
    }
    this.__loaded = [], this.FLIPY = !0, this.CDN = "", this.CORS = null, this.IMAGES = {}, this.SDF = {}, this.JSON = {
        push: function(prop, value) {
            this[prop] = value, Object.defineProperty(this, prop, {
                get: () => JSON.parse(JSON.stringify(value))
            })
        }
    }, Object.defineProperty(this.JSON, "push", {
        enumerable: !1,
        writable: !0
    }), this.SVG = {}, AssetList.prototype = new Array, AssetList.prototype.filter = function(items) {
        for (let i = this.length - 1; i >= 0; i--) this[i].includes(items) || this.splice(i, 1);
        return this
    }, AssetList.prototype.exclude = function(items) {
        for (let i = this.length - 1; i >= 0; i--) this[i].includes(items) && this.splice(i, 1);
        return this
    }, AssetList.prototype.prepend = function(prefix) {
        for (let i = this.length - 1; i >= 0; i--) this[i] = prefix + this[i];
        return this
    }, AssetList.prototype.append = function(suffix) {
        for (let i = this.length - 1; i >= 0; i--) this[i] = this[i] + suffix;
        return this
    }, this.list = function() {
        return window.ASSETS || console.warn("ASSETS list not available"), new AssetList(window.ASSETS.slice(0) || [])
    }, this.BASE_PATH = "", this.getPath = function(path) {
        if (path.includes("~")) return _this.BASE_PATH + path.replace("~", "");
        if (path.includes("//")) return path;
        if (path = function parseResolution(path) {
                if (!window.ASSETS || !ASSETS.RES) return path;
                var res = ASSETS.RES[path],
                    ratio = Math.min(Device.pixelRatio, 3);
                if (!res) return path;
                if (!res["x" + ratio]) return path;
                var split = path.split("/"),
                    file = split[split.length - 1];
                return split = file.split("."), path.replace(file, split[0] + "-" + ratio + "x." + split[1])
            }(path), _this.dictionary)
            for (let pathKey in _this.dictionary)
                if (_this.dictionary[pathKey].includes(path.split("?")[0])) return pathKey + path;
        return this.CDN && !~path.indexOf(this.CDN) && (path = this.CDN + path), path
    }, this.registerPath = function(path, assets) {
        _this.dictionary || (_this.dictionary = {}), _this.dictionary[path] = assets
    }, this.loadImage = function(path, isStore) {
        var img = new Image;
        return img.crossOrigin = this.CORS, img.src = _this.getPath(path), img.loadPromise = function() {
            let promise = Promise.create();
            return img.onload = promise.resolve, promise
        }, isStore && (this.IMAGES[path] = img), img
    }, this.decodeImage = function(path, params) {
        let promise = Promise.create(),
            img = _this.loadImage(path);
        return img.onload = () => promise.resolve(img), img.onerror = () => promise.reject(), promise
    }
}), "static"), Class((function AssetLoader(_assets, _callback, ASSETS = Assets) {
    Inherit(this, Events);
    const _this = this;
    let _total = _assets.length,
        _loaded = 0,
        _lastFiredPercent = 0;

    function loadAsset() {
        let path = _assets.splice(_assets.length - 1, 1)[0];
        const name = path.split("assets/").last().split(".")[0],
            ext = path.split(".").last().split("?")[0].toLowerCase();
        let timeout = Timer.create(timedOut, AssetLoader.TIMEOUT, path);
        if (!Assets.preventCache && ~Assets.__loaded.indexOf(path)) return loaded();
        if (ext.includes(["jpg", "jpeg", "png", "gif"])) {
            let image = ASSETS.loadImage(path);
            return image.complete ? loaded() : (image.onload = loaded, void(image.onerror = loaded))
        }

        function loaded() {
            timeout && clearTimeout(timeout), increment(), _assets.length && loadAsset()
        }
        get(Assets.getPath(path), Assets.HEADERS).then(data => {
            Assets.__loaded.push(path), "json" == ext && ASSETS.JSON.push(name, data), "svg" == ext && (ASSETS.SVG[name] = data), "fnt" == ext && (ASSETS.SDF[name.split("/")[1]] = data), "js" == ext && window.eval(data), ext.includes(["fs", "vs", "glsl"]) && window.Shaders && Shaders.parse(data, path), loaded()
        }).catch(e => {
            console.warn(e), loaded()
        })
    }

    function increment() {
        let percent = Math.max(_lastFiredPercent, Math.min(1, ++_loaded / _total));
        _this.events.fire(Events.PROGRESS, {
            percent: percent
        }), _lastFiredPercent = percent, _loaded >= _total && defer(complete)
    }

    function complete() {
        _this.completed || (_this.completed = !0, defer(() => {
            _callback && _callback(), _this.events.fire(Events.COMPLETE)
        }))
    }

    function timedOut(path) {
        console.warn("Asset timed out", path)
    }! function() {
        if (!Array.isArray(_assets)) throw "AssetLoader requires array of assets to load";
        _assets = _assets.slice(0).reverse(),
            function init() {
                if (!_assets.length) return complete();
                for (let i = 0; i < AssetLoader.SPLIT; i++) _assets.length && loadAsset()
            }()
    }(), this.loadModules = function() {
        if (!window._BUILT_) return;
        this.add(1);
        let module = window._ES5_ ? "es5-modules" : "modules",
            s = document.createElement("script");
        return s.src = "assets/js/" + module + ".js?" + window._CACHE_, s.async = !0, document.head.appendChild(s), AssetLoader.waitForLib("_MODULES_").then(_ => _this.trigger(1))
    }, this.add = function(num) {
        _total += num || 1
    }, this.trigger = function(num) {
        for (let i = 0; i < (num || 1); i++) increment()
    }
}), () => {
    AssetLoader.SPLIT = 2, AssetLoader.TIMEOUT = 5e3, AssetLoader.loadAllAssets = function(callback) {
        let promise = Promise.create();
        return callback || (callback = promise.resolve), promise.loader = new AssetLoader(Assets.list(), () => {
            callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
        }), promise
    }, AssetLoader.loadAssets = function(list, callback) {
        let promise = Promise.create();
        return callback || (callback = promise.resolve), promise.loader = new AssetLoader(list, () => {
            callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
        }), promise
    }, AssetLoader.waitForLib = function(name, callback) {
        let promise = Promise.create();
        return callback || (callback = promise.resolve), Render.start((function check() {
            window[name] && (Render.stop(check), callback && callback())
        })), promise
    }, AssetLoader.waitForModules = function() {
        return AssetLoader.waitForLib(window._BUILT_ ? "_MODULES_" : "zUtils3D")
    }
}), Hydra.ready((function() {
    window.__window = $(window), window.__document = $(document), window.__body = $(document.getElementsByTagName("body")[0]), window.Stage = window.Stage && window.Stage.style ? $(window.Stage) : __body.create("#Stage"), Stage.size("100%"), Stage.__useFragment = !0, Stage.width = window.innerWidth || document.body.clientWidth || document.documentElement.offsetWidth, Stage.height = window.innerHeight || document.body.clientHeight || document.documentElement.offsetHeight
})), Class((function CSS() {
    var _obj, _style, _needsUpdate, _this = this;

    function objToCSS(key) {
        var match = key.match(/[A-Z]/),
            camelIndex = match ? match.index : null;
        if (camelIndex) {
            var start = key.slice(0, camelIndex),
                end = key.slice(camelIndex);
            key = start + "-" + end.toLowerCase()
        }
        return key
    }

    function cssToObj(key) {
        var match = key.match(/\-/),
            camelIndex = match ? match.index : null;
        if (camelIndex) {
            var start = key.slice(0, camelIndex),
                end = key.slice(camelIndex).slice(1),
                letter = end.charAt(0);
            end = end.slice(1), key = start + (end = letter.toUpperCase() + end)
        }
        return key
    }

    function setHTML() {
        _obj.innerHTML = _style, _needsUpdate = !1
    }
    Hydra.ready((function() {
        _style = "", (_obj = document.createElement("style")).type = "text/css", document.getElementsByTagName("head")[0].appendChild(_obj)
    })), this._read = function() {
        return _style
    }, this._write = function(css) {
        _style = css, _needsUpdate || (_needsUpdate = !0, defer(setHTML))
    }, this.style = function(selector, obj) {
        var s = selector + " {";
        for (var key in obj) {
            var prop = objToCSS(key),
                val = obj[key];
            "string" != typeof val && "opacity" != key && (val += "px"), s += prop + ":" + val + "!important;"
        }
        s += "}", _this._write(_style + s)
    }, this.get = function(selector, prop) {
        for (var values = new Object, string = _obj.innerHTML.split(selector + " {"), i = 0; i < string.length; i++) {
            var str = string[i];
            if (str.length) {
                var split = str.split("!important;");
                for (var j in split)
                    if (split[j].includes(":")) {
                        var fsplit = split[j].split(":");
                        "px" == fsplit[1].slice(-2) && (fsplit[1] = Number(fsplit[1].slice(0, -2))), values[cssToObj(fsplit[0])] = fsplit[1]
                    }
            }
        }
        return prop ? values[prop] : values
    }, this.textSize = function($obj) {
        var $clone = $obj.clone();
        $clone.css({
            position: "relative",
            cssFloat: "left",
            styleFloat: "left",
            marginTop: -99999,
            width: "",
            height: ""
        }), __body.addChild($clone);
        var width = $clone.div.offsetWidth,
            height = $clone.div.offsetHeight;
        return $clone.remove(), {
            width: width,
            height: height
        }
    }, this.prefix = function(style) {
        return "" == _this.styles.vendor ? style.charAt(0).toLowerCase() + style.slice(1) : _this.styles.vendor + style
    }, this._toCSS = objToCSS
}), "Static"), Class((function HydraObject(_selector, _type, _exists, _useFragment) {
    this._children = new LinkedList, this.__useFragment = _useFragment, this._initSelector(_selector, _type, _exists)
}), () => {
    var prototype = HydraObject.prototype;
    prototype._initSelector = function(_selector, _type, _exists) {
        if (_selector && "string" != typeof _selector) this.div = _selector;
        else {
            var first = _selector ? _selector.charAt(0) : null,
                name = _selector ? _selector.slice(1) : null;
            if ("." != first && "#" != first && (name = _selector, first = "."), _exists) {
                if ("#" != first) throw "Hydra Selectors Require #ID";
                this.div = document.getElementById(name)
            } else this._type = _type || "div", "svg" == this._type ? (this.div = document.createElementNS("http://www.w3.org/2000/svg", this._type), this.div.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")) : (this.div = document.createElement(this._type), first && ("#" == first ? this.div.id = name : this.div.className = name))
        }
        this.div.hydraObject = this
    }, prototype.add = function(child) {
        var div = this.div,
            _this = this,
            createFrag = function() {
                _this.__useFragment && (_this._fragment || (_this._fragment = document.createDocumentFragment(), defer((function() {
                    if (!_this._fragment || !_this.div) return _this._fragment = null;
                    _this.div.appendChild(_this._fragment), _this._fragment = null
                }))), div = _this._fragment)
            };
        return child.element && child.element instanceof HydraObject ? (createFrag(), div.appendChild(child.element.div), this._children.push(child.element), child.element._parent = this, child.element.div.parentNode = this.div) : child.div ? (createFrag(), div.appendChild(child.div), this._children.push(child), child._parent = this, child.div.parentNode = this.div) : child.nodeName && (createFrag(), div.appendChild(child), child.parentNode = this.div), this
    }, prototype.clone = function() {
        return $(this.div.cloneNode(!0))
    }, prototype.create = function(name, type) {
        var $obj = $(name, type);
        return this.add($obj), $obj
    }, prototype.empty = function() {
        for (var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
        return this.div.innerHTML = "", this
    }, prototype.parent = function() {
        return this._parent
    }, prototype.children = function() {
        return this.div.children ? this.div.children : this.div.childNodes
    }, prototype.removeChild = function(object, keep) {
        try {
            object.div.parentNode.removeChild(object.div)
        } catch (e) {}
        keep || this._children.remove(object)
    }, prototype.remove = prototype.destroy = function() {
        this.removed = !0;
        var parent = this._parent;
        parent && !parent.removed && parent.removeChild && parent.removeChild(this, !0);
        for (var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
        this._children.destroy(), this.div.hydraObject = null, Utils.nullObject(this)
    }, window.$ = function(selector, type, exists) {
        return new HydraObject(selector, type, exists)
    }, $.fn = HydraObject.prototype
}), $.fn.text = function(text) {
    return void 0 !== text ? (this.__cacheText != text && (this.div.textContent = text), this.__cacheText = text, this) : this.div.textContent
}, $.fn.html = function(text, force) {
    return !text || text.includes("<") || force ? void 0 !== text ? (this.div.innerHTML = text, this) : this.div.innerHTML : this.text(text)
}, $.fn.hide = function() {
    return this.div.style.display = "none", this
}, $.fn.show = function() {
    return this.div.style.display = "", this
}, $.fn.visible = function() {
    return this.div.style.visibility = "visible", this
}, $.fn.invisible = function() {
    return this.div.style.visibility = "hidden", this
}, $.fn.setZ = function(z) {
    return this.div.style.zIndex = z, this
}, $.fn.clearAlpha = function() {
    return this.div.style.opacity = "", this
}, $.fn.size = function(w, h, noScale) {
    return "string" == typeof w ? (void 0 === h ? h = "100%" : "string" != typeof h && (h += "px"), this.div.style.width = w, this.div.style.height = h) : (this.div.style.width = w + "px", this.div.style.height = h + "px", noScale || (this.div.style.backgroundSize = w + "px " + h + "px")), this.width = w, this.height = h, this
}, $.fn.mouseEnabled = function(bool) {
    return this.div.style.pointerEvents = bool ? "auto" : "none", this
}, $.fn.fontStyle = function(family, size, color, style) {
    var font = {};
    return family && (font.fontFamily = family), size && (font.fontSize = size), color && (font.color = color), style && (font.fontStyle = style), this.css(font), this
}, $.fn.font = function(font) {
    return this.css("font", font), this
}, $.fn.bg = function(src, x, y, repeat) {
    return src ? (src.includes(".") && (src = Assets.getPath(src)), src.includes(".") ? this.div.style.backgroundImage = "url(" + src + ")" : this.div.style.backgroundColor = src, void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style.backgroundPosition = x + " " + y), repeat && (this.div.style.backgroundSize = "", this.div.style.backgroundRepeat = repeat), "cover" != x && "contain" != x || (this.div.style.backgroundSize = x, this.div.style.backgroundPosition = void 0 !== y ? y + " " + repeat : "center"), this) : this
}, $.fn.center = function(x, y, noPos) {
    var css = {};
    return void 0 === x ? (css.left = "50%", css.top = "50%", css.marginLeft = -this.width / 2, css.marginTop = -this.height / 2) : (x && (css.left = "50%", css.marginLeft = -this.width / 2), y && (css.top = "50%", css.marginTop = -this.height / 2)), noPos && (delete css.left, delete css.top), this.css(css), this
}, $.fn.max = function(width, height) {
    let w, h;
    return void 0 !== width && (w = "number" == typeof width ? width + "px" : width, this.div.style.maxWidth = w), void 0 !== height ? (h = "number" == typeof height ? height + "px" : height, this.div.style.maxHeight = h) : (h = w, this.div.style.maxHeight = h), this
}, $.fn.min = function(width, height) {
    let w, h;
    return void 0 !== width && (w = "number" == typeof width ? width + "px" : width, this.div.style.minWidth = w), void 0 !== height ? (h = "number" == typeof height ? height + "px" : height, this.div.style.minHeight = h) : (h = w, this.div.style.minHeight = h), this
}, $.fn.flex = function(inline) {
    return this.div.style.display = inline ? "inline-flex" : "flex", this.div.style.justifyContent = "center", this.div.style.alignItems = "center", this.div.classList.add("relative-children"), this
}, $.fn.order = function(opts = {}) {
    let s = this.div.style;
    return "none" === opts.flexWrap && (opts.flexWrap = "nowrap"), opts.direction && (s.flexDirection = opts.direction), opts.wrap && (s.flexWrap = opts.wrap), opts.order && (s.order = opts.order), this
}, $.fn.align = function(opts = {}) {
    let s = this.div.style;

    function flex(str, contentMode = !1) {
        return "start" === str ? "flex-start" : "end" === str ? "flex-end" : "between" === str ? contentMode ? "space-between" : "flex-between" : "around" === str ? contentMode ? "space-around" : "flex-around" : "none" === str ? "nowrap" : str
    }
    return opts.justify && (s.justifyContent = flex(opts.justify)), opts.items && (s.alignItems = flex(opts.items)), opts.self && (s.alignSelf = flex(opts.self)), opts.content && (s.alignContent = flex(opts.content, !0)), this
}, $.fn.flexibility = function(opts = {}) {
    let s = this.div.style;
    return "undefined" !== opts.grow && (s.flexGrow = opts.grow), "undefined" !== opts.shrink && (s.flexGrow = opts.shrink), void 0 !== opts.basis && (s.flexBasis = "number" == typeof opts.basis ? opts.basis + "px" : opts.basis), this
}, $.fn.mask = function(arg) {
    let maskPrefix = "Moz" === CSS.styles.vendor ? "mask" : CSS.prefix("Mask");
    return this.div.style[maskPrefix] = (arg.includes(".") ? "url(" + arg + ")" : arg) + " no-repeat", this.div.style[maskPrefix + "Size"] = "contain", this
}, $.fn.blendMode = function(mode, bg) {
    return bg ? this.div.style["background-blend-mode"] = mode : this.div.style["mix-blend-mode"] = mode, this
}, $.fn.css = function(obj, value) {
    if ("boolean" == typeof value && (value = null), "object" != typeof obj) {
        if (value) return this.div.style[obj] = value, this;
        var style = this.div.style[obj];
        if ("number" != typeof style) {
            if (!style) return !1;
            style.includes("px") && (style = Number(style.slice(0, -2))), "opacity" == obj && (style = isNaN(Number(this.div.style.opacity)) ? 1 : Number(this.div.style.opacity))
        }
        return style || (style = 0), style
    }
    for (var type in TweenManager._clearCSSTween(this), obj) {
        var val = obj[type];
        "string" != typeof val && "number" != typeof val || ("string" != typeof val && "opacity" != type && "zIndex" != type && (val += "px"), this.div.style[type] = val)
    }
    return this
}, $.fn.transform = function(props) {
    if (!(this.multiTween && this.cssTweens && this._cssTweens.length > 1 && this.__transformTime && Render.TIME - this.__transformTime < 15)) {
        if (this.__transformTime = Render.TIME, TweenManager._clearCSSTween(this), Device.tween.css2d) {
            if (props)
                for (var key in props) "number" == typeof props[key] && (this[key] = props[key]);
            else props = this;
            var transformString = TweenManager._parseTransform(props);
            this.__transformCache != transformString && (this.div.style[CSS.styles.vendorTransform] = transformString, this.__transformCache = transformString)
        }
        return this
    }
}, $.fn.willChange = function(props) {
    if ("boolean" == typeof props) this._willChangeLock = !0 === props;
    else if (this._willChangeLock) return;
    var string = "string" == typeof props;
    this._willChange && !string || "null" == typeof props ? (this._willChange = !1, this.div.style["will-change"] = "") : (this._willChange = !0, this.div.style["will-change"] = string ? props : CSS.transformProperty + ", opacity")
}, $.fn.backfaceVisibility = function(visible) {
    this.div.style[CSS.prefix("BackfaceVisibility")] = visible ? "visible" : "hidden"
}, $.fn.enable3D = function(perspective, x, y) {
    return Device.tween.css3d ? (this.div.style[CSS.prefix("TransformStyle")] = "preserve-3d", perspective && (this.div.style[CSS.prefix("Perspective")] = perspective + "px"), void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style[CSS.prefix("PerspectiveOrigin")] = x + " " + y), this) : this
}, $.fn.disable3D = function() {
    return this.div.style[CSS.prefix("TransformStyle")] = "", this.div.style[CSS.prefix("Perspective")] = "", this
}, $.fn.transformPoint = function(x, y, z) {
    var origin = "";
    return void 0 !== x && (origin += "number" == typeof x ? x + "px " : x + " "), void 0 !== y && (origin += "number" == typeof y ? y + "px " : y + " "), void 0 !== z && (origin += "number" == typeof z ? z + "px" : z), this.div.style[CSS.prefix("TransformOrigin")] = origin, this
}, $.fn.tween = function(props, time, ease, delay, callback, manual) {
    "boolean" == typeof delay ? (manual = delay, delay = 0, callback = null) : "function" == typeof delay && (callback = delay, delay = 0), "boolean" == typeof callback && (manual = callback, callback = null), delay || (delay = 0);
    var usePromise = null;
    callback && callback instanceof Promise && (usePromise = callback, callback = callback.resolve);
    var tween = TweenManager._detectTween(this, props, time, ease, delay, callback, manual);
    return usePromise || tween
}, $.fn.clearTransform = function() {
    return "number" == typeof this.x && (this.x = 0), "number" == typeof this.y && (this.y = 0), "number" == typeof this.z && (this.z = 0), "number" == typeof this.scale && (this.scale = 1), "number" == typeof this.scaleX && (this.scaleX = 1), "number" == typeof this.scaleY && (this.scaleY = 1), "number" == typeof this.rotation && (this.rotation = 0), "number" == typeof this.rotationX && (this.rotationX = 0), "number" == typeof this.rotationY && (this.rotationY = 0), "number" == typeof this.rotationZ && (this.rotationZ = 0), "number" == typeof this.skewX && (this.skewX = 0), "number" == typeof this.skewY && (this.skewY = 0), this.div.style[CSS.styles.vendorTransform] = "", this
}, $.fn.clearTween = function() {
    return this._cssTween && this._cssTween.stop(), this._mathTween && this._mathTween.stop(), this
}, $.fn.stopTween = function() {
    return console.warn(".stopTween deprecated. use .clearTween instead"), this.clearTween()
}, $.fn.keypress = function(callback) {
    this.div.onkeypress = function(e) {
        (e = e || window.event).code = e.keyCode ? e.keyCode : e.charCode, callback && callback(e)
    }
}, $.fn.keydown = function(callback) {
    this.div.onkeydown = function(e) {
        (e = e || window.event).code = e.keyCode, callback && callback(e)
    }
}, $.fn.keyup = function(callback) {
    this.div.onkeyup = function(e) {
        (e = e || window.event).code = e.keyCode, callback && callback(e)
    }
}, $.fn.attr = function(attr, value) {
    if (attr && value) "" == value ? this.div.removeAttribute(attr) : this.div.setAttribute(attr, value);
    else if (attr) return this.div.getAttribute(attr);
    return this
}, $.fn.val = function(value) {
    return void 0 === value ? this.div.value : (this.div.value = value, this)
}, $.fn.change = function(callback) {
    var _this = this;
    this.div.onchange = function() {
        callback({
            object: _this,
            value: _this.div.value || ""
        })
    }
}, $.fn.svgSymbol = function(id, width, height) {
    var config = SVG.getSymbolConfig(id),
        svgHTML = '<svg viewBox="0 0 ' + config.width + " " + config.height + '" width="' + width + '" height="' + height + '"><use xlink:href="#' + config.id + '" x="0" y="0" /></svg>';
    this.html(svgHTML, !0)
}, $.fn.svg = async function(url) {
        let promise = Promise.create();
        return fetch(url).then(async res => {
            let svgHTML = await res.text();
            this.html(svgHTML, !0), promise.resolve()
        }), promise
    }, $.fn.overflowScroll = function(dir) {
        var x = !!dir.x,
            y = !!dir.y,
            overflow = {};
        (!x && !y || x && y) && (overflow.overflow = "auto"), !x && y && (overflow.overflowY = "auto", overflow.overflowX = "hidden"), x && !y && (overflow.overflowX = "auto", overflow.overflowY = "hidden"), Device.mobile && (overflow["-webkit-overflow-scrolling"] = "touch", Mobile._addOverflowScroll(this)), this.css(overflow)
    }, $.fn.removeOverflowScroll = function() {
        this.css({
            overflow: "hidden",
            overflowX: "",
            overflowY: "",
            "-webkit-overflow-scrolling": ""
        }), Device.mobile && Mobile._removeOverflowScroll(this)
    }, $.fn.accessible = function(type = "label", tabIndex = -1) {
        switch (tabIndex > -1 && this.attr("tabindex", tabIndex), type) {
            case "label":
                this.attr("aria-label", this.div.textContent);
                break;
            case "hidden":
                this.attr("aria-hidden", !0)
        }
    }, $.fn.tabIndex = function(tabIndex) {
        this.attr("tabindex", tabIndex)
    }, $.fn.cursor = function(cursor, lock) {
        lock && (this.cursorLock || (this.cursorLock = new Map), "auto" == cursor ? this.cursorLock.delete(lock) : this.cursorLock.set(lock, cursor)), this.cursorLock && "auto" == cursor && this.cursorLock.forEach(v => {
            cursor = v
        }), this.css("cursor", cursor)
    },
    function() {
        var windowsPointer = !!window.MSGesture,
            translateEvent = function(evt) {
                if (windowsPointer) switch (evt) {
                    case "touchstart":
                        return "pointerdown";
                    case "touchmove":
                        return "MSGestureChange";
                    case "touchend":
                        return "pointerup"
                }
                return evt
            },
            convertTouchEvent = function(e) {
                var touchEvent = {
                    x: 0,
                    y: 0
                };
                if (e.windowsPointer) return e;
                if (!e) return touchEvent;
                if (e.touches || e.changedTouches ? e.touches.length ? (touchEvent.x = e.touches[0].pageX, touchEvent.y = e.touches[0].pageY) : (touchEvent.x = e.changedTouches[0].pageX, touchEvent.y = e.changedTouches[0].pageY) : (touchEvent.x = e.pageX, touchEvent.y = e.pageY), Mobile.ScreenLock && Mobile.ScreenLock.isActive && Mobile.orientationSet && Mobile.orientation !== Mobile.orientationSet) {
                    if (90 == window.orientation || 0 === window.orientation) {
                        var x = touchEvent.y;
                        touchEvent.y = touchEvent.x, touchEvent.x = Stage.width - x
                    }
                    if (-90 == window.orientation || 180 === window.orientation) {
                        var y = touchEvent.x;
                        touchEvent.x = touchEvent.y, touchEvent.y = Stage.height - y
                    }
                }
                return touchEvent
            };
        $.fn.click = function(callback) {
            var _this = this;
            return this.div.addEventListener(translateEvent("click"), (function click(e) {
                return !!_this.div && (!Mouse._preventClicks && (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.action = "click", e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e), void(Mouse.autoPreventClicks && Mouse.preventClicks())))
            }), !0), this.div.style.cursor = "pointer", this
        }, $.fn.hover = function(callback) {
            var _time, _this = this,
                _over = !1;

            function hover(e) {
                if (!_this.div) return !1;
                var time = performance.now(),
                    original = e.toElement || e.relatedTarget;
                if (_time && time - _time < 5) return _time = time, !1;
                switch (_time = time, e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mouseout":
                    case "mouseleave":
                        e.action = "out";
                        break;
                    default:
                        e.action = "over"
                }
                if (_over) {
                    if (Mouse._preventClicks) return !1;
                    if ("over" == e.action) return !1;
                    if ("out" == e.action && function isAChild(div, object) {
                            for (var len = div.children.length - 1, i = len; i > -1; i--)
                                if (object == div.children[i]) return !0;
                            for (i = len; i > -1; i--)
                                if (isAChild(div.children[i], object)) return !0
                        }(_this.div, original)) return !1;
                    _over = !1
                } else {
                    if ("out" == e.action) return !1;
                    _over = !0
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }
            return this.div.addEventListener(translateEvent("mouseover"), hover, !0), this.div.addEventListener(translateEvent("mouseout"), hover, !0), this
        }, $.fn.press = function(callback) {
            var _this = this;

            function press(e) {
                if (!_this.div) return !1;
                switch (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mousedown":
                        e.action = "down";
                        break;
                    default:
                        e.action = "up"
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }
            return this.div.addEventListener(translateEvent("mousedown"), press, !0), this.div.addEventListener(translateEvent("mouseup"), press, !0), this
        }, $.fn.bind = function(evt, callback) {
            if (this._events = this._events || {}, windowsPointer && this == __window) return Stage.bind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.bind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? (Device.mobile || (Device.touchCapable ? this.bind("mousemove", callback) : evt = "mousemove"), windowsPointer && !this.div.msGesture && (this.div.msGesture = new MSGesture, this.div.msGesture.target = this.div)) : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.bind("mouseup", callback) : evt = "mouseup")), this._events["bind_" + evt] = this._events["bind_" + evt] || [];
            var _events = this._events["bind_" + evt],
                e = {},
                target = this.div;

            function touchEvent(e) {
                windowsPointer && target.msGesture && "touchstart" == evt && target.msGesture.addPointer(e.pointerId), Device.mobile || "touchstart" != evt || e.preventDefault();
                var touch = convertTouchEvent(e);
                if (windowsPointer) {
                    var windowsEvt = e;
                    (e = {}).x = Number(windowsEvt.pageX || windowsEvt.clientX), e.y = Number(windowsEvt.pageY || windowsEvt.clientY), e.target = windowsEvt.target, e.currentTarget = windowsEvt.currentTarget, e.path = [];
                    for (var node = e.target; node;) e.path.push(node), node = node.parentElement || null;
                    e.windowsPointer = !0
                } else e.x = touch.x, e.y = touch.y;
                for (var i = 0; i < _events.length; i++) {
                    var ev = _events[i];
                    ev.target == e.currentTarget && ev.callback(e)
                }
            }
            return e.callback = callback, e.target = this.div, _events.push(e), this._events["fn_" + evt] || (this._events["fn_" + evt] = touchEvent, this.div.addEventListener(translateEvent(evt), touchEvent, {
                capture: !0,
                passive: !1
            })), this
        }, $.fn.unbind = function(evt, callback) {
            if (this._events = this._events || {}, windowsPointer && this == __window) return Stage.unbind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousemove", callback) : evt = "mousemove") : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.unbind("mouseup", callback) : evt = "mouseup"));
            var _events = this._events["bind_" + evt];
            if (!_events) return this;
            for (var i = 0; i < _events.length; i++) {
                _events[i].callback == callback && _events.splice(i, 1)
            }
            return this._events["fn_" + evt] && !_events.length && (this.div.removeEventListener(translateEvent(evt), this._events["fn_" + evt], !Device.mobile || {
                passive: !0
            }), this._events["fn_" + evt] = null), this
        }, $.fn.interact = function(overCallback, clickCallback, seoLink, seoText) {
            this.hit || (this.hit = $(".hit", seoLink ? "a" : void 0), this.hit.css({
                width: "100%",
                height: "100%",
                zIndex: 99999,
                top: 0,
                left: 0,
                position: "absolute"
            }), this.add(this.hit), seoLink && (this.hit.attr("href", Hydra.absolutePath(seoLink)), this.hit.text(seoText || this.div.textContent), this.hit.css({
                fontSize: 0
            }), this.hit.accessible(), this.hit.div.onfocus = _ => overCallback({
                action: "over"
            }), this.hit.div.onblur = _ => overCallback({
                action: "out"
            }), this.hit.div.onclick = e => {
                e.preventDefault(), clicked(e)
            }));
            let time = Render.TIME;

            function clicked(e) {
                clickCallback && Render.TIME - time > 100 && clickCallback(e), time = Render.TIME
            }
            Device.mobile ? this.hit.touchClick(overCallback, clicked).click(clicked) : this.hit.hover(overCallback).click(clicked)
        }, $.fn.touchSwipe = function(callback, distance) {
            if (!window.addEventListener) return this;
            var _startX, _startY, _this = this,
                _distance = distance || 75,
                _moving = !1,
                _move = {};

            function touchMove(e) {
                if (!_this.div) return !1;
                if (_moving) {
                    var touch = convertTouchEvent(e),
                        dx = _startX - touch.x,
                        dy = _startY - touch.y;
                    _move.direction = null, _move.moving = null, _move.x = null, _move.y = null, _move.evt = e, Math.abs(dx) >= _distance ? (touchEnd(), _move.direction = dx > 0 ? "left" : "right") : Math.abs(dy) >= _distance ? (touchEnd(), _move.direction = dy > 0 ? "up" : "down") : (_move.moving = !0, _move.x = dx, _move.y = dy), callback && callback(_move, e)
                }
            }

            function touchEnd(e) {
                if (!_this.div) return !1;
                _startX = _startY = _moving = !1, _this.div.removeEventListener(translateEvent("touchmove"), touchMove)
            }
            return Device.mobile && (this.div.addEventListener(translateEvent("touchstart"), (function touchStart(e) {
                var touch = convertTouchEvent(e);
                if (!_this.div) return !1;
                1 == e.touches.length && (_startX = touch.x, _startY = touch.y, _moving = !0, _this.div.addEventListener(translateEvent("touchmove"), touchMove, {
                    passive: !0
                }))
            }), {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), touchEnd, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchcancel"), touchEnd, {
                passive: !0
            })), this
        }, $.fn.touchClick = function(hover, click) {
            if (!window.addEventListener) return this;
            var _time, _move, _this = this,
                _start = {},
                _touch = {};

            function setTouch(e) {
                var touch = convertTouchEvent(e);
                e.touchX = touch.x, e.touchY = touch.y, _start.x = e.touchX, _start.y = e.touchY
            }
            return Device.mobile && (this.div.addEventListener(translateEvent("touchstart"), (function touchStart(e) {
                if (!_this.div) return !1;
                _time = performance.now(), e.action = "over", e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), hover && !_move && hover(e)
            }), {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), (function touchEnd(e) {
                if (!_this.div) return !1;
                var time = performance.now();
                if (_touch = convertTouchEvent(e), _move = function findDistance(p1, p2) {
                        var dx = p2.x - p1.x,
                            dy = p2.y - p1.y;
                        return Math.sqrt(dx * dx + dy * dy)
                    }(_start, _touch) > 5, e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), _time && time - _time < 750) {
                    if (Mouse._preventClicks) return !1;
                    click && !_move && (!0, e.action = "click", click && !_move && click(e), Mouse.autoPreventClicks && Mouse.preventClicks())
                }
                hover && (e.action = "out", Mouse._preventFire || hover(e));
                _move = !1
            }), {
                passive: !0
            })), this
        }
    }(), Class((function Element(type = "div") {
        Inherit(this, Component);
        var name = Utils.getConstructorName(this);
        this.__element = !0, this.element = $("." + name, type), this.element.__useFragment = !0, this.destroy = function() {
            this.element && this.element.remove && (this.element = this.element.remove()), this._destroy && this._destroy()
        }
    })), Hydra.ready(() => {
        TweenManager.Transforms = ["scale", "scaleX", "scaleY", "x", "y", "z", "rotation", "rotationX", "rotationY", "rotationZ", "skewX", "skewY", "perspective"], TweenManager.CubicEases = [{
            name: "easeOutCubic",
            curve: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
        }, {
            name: "easeOutQuad",
            curve: "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        }, {
            name: "easeOutQuart",
            curve: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
        }, {
            name: "easeOutQuint",
            curve: "cubic-bezier(0.230, 1.000, 0.320, 1.000)"
        }, {
            name: "easeOutSine",
            curve: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        }, {
            name: "easeOutExpo",
            curve: "cubic-bezier(0.190, 1.000, 0.220, 1.000)"
        }, {
            name: "easeOutCirc",
            curve: "cubic-bezier(0.075, 0.820, 0.165, 1.000)"
        }, {
            name: "easeOutBack",
            curve: "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
        }, {
            name: "easeInCubic",
            curve: "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        }, {
            name: "easeInQuad",
            curve: "cubic-bezier(0.550, 0.085, 0.680, 0.530)"
        }, {
            name: "easeInQuart",
            curve: "cubic-bezier(0.895, 0.030, 0.685, 0.220)"
        }, {
            name: "easeInQuint",
            curve: "cubic-bezier(0.755, 0.050, 0.855, 0.060)"
        }, {
            name: "easeInSine",
            curve: "cubic-bezier(0.470, 0.000, 0.745, 0.715)"
        }, {
            name: "easeInCirc",
            curve: "cubic-bezier(0.600, 0.040, 0.980, 0.335)"
        }, {
            name: "easeInBack",
            curve: "cubic-bezier(0.600, -0.280, 0.735, 0.045)"
        }, {
            name: "easeInOutCubic",
            curve: "cubic-bezier(0.645, 0.045, 0.355, 1.000)"
        }, {
            name: "easeInOutQuad",
            curve: "cubic-bezier(0.455, 0.030, 0.515, 0.955)"
        }, {
            name: "easeInOutQuart",
            curve: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
        }, {
            name: "easeInOutQuint",
            curve: "cubic-bezier(0.860, 0.000, 0.070, 1.000)"
        }, {
            name: "easeInOutSine",
            curve: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
        }, {
            name: "easeInOutExpo",
            curve: "cubic-bezier(1.000, 0.000, 0.000, 1.000)"
        }, {
            name: "easeInOutCirc",
            curve: "cubic-bezier(0.785, 0.135, 0.150, 0.860)"
        }, {
            name: "easeInOutBack",
            curve: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
        }, {
            name: "easeInOut",
            curve: "cubic-bezier(.42,0,.58,1)"
        }, {
            name: "linear",
            curve: "linear"
        }], TweenManager.useCSSTrans = function(props, ease, object) {
            return !(props.math || "string" == typeof ease && ease.includes(["Elastic", "Bounce"]) || object.multiTween || TweenManager._inspectEase(ease).path || !Device.tween.transition)
        }, TweenManager._detectTween = function(object, props, time, ease, delay, callback) {
            return TweenManager.useCSSTrans(props, ease, object) ? new CSSTransition(object, props, time, ease, delay, callback) : new FrameTween(object, props, time, ease, delay, callback)
        }, TweenManager._parseTransform = function(props) {
            var transforms = "",
                translate = "";
            if (props.perspective > 0 && (transforms += "perspective(" + props.perspective + "px)"), void 0 !== props.x || void 0 !== props.y || void 0 !== props.z) {
                var x = props.x || 0,
                    y = props.y || 0,
                    z = props.z || 0;
                translate += x + ("string" == typeof props.x && (props.x.includes("%") || props.x.includes("vw") || props.x.includes("vh")) ? "" : "px") + ", ", translate += y + ("string" == typeof props.y && (props.y.includes("%") || props.y.includes("vw") || props.y.includes("vh")) ? "" : "px"), Device.tween.css3d ? transforms += "translate3d(" + (translate += ", " + z + "px") + ")" : transforms += "translate(" + translate + ")"
            }
            return void 0 !== props.scale ? transforms += "scale(" + props.scale + ")" : (void 0 !== props.scaleX && (transforms += "scaleX(" + props.scaleX + ")"), void 0 !== props.scaleY && (transforms += "scaleY(" + props.scaleY + ")")), void 0 !== props.rotation && (transforms += "rotate(" + props.rotation + "deg)"), void 0 !== props.rotationX && (transforms += "rotateX(" + props.rotationX + "deg)"), void 0 !== props.rotationY && (transforms += "rotateY(" + props.rotationY + "deg)"), void 0 !== props.rotationZ && (transforms += "rotateZ(" + props.rotationZ + "deg)"), void 0 !== props.skewX && (transforms += "skewX(" + props.skewX + "deg)"), void 0 !== props.skewY && (transforms += "skewY(" + props.skewY + "deg)"), transforms
        }, TweenManager._clearCSSTween = function(obj) {
            obj && !obj._cssTween && obj.div._transition && !obj.persistTween && (obj.div.style[CSS.styles.vendorTransition] = "", obj.div._transition = !1, obj._cssTween = null)
        }, TweenManager._isTransform = function(key) {
            return TweenManager.Transforms.indexOf(key) > -1
        }, TweenManager._getAllTransforms = function(object) {
            for (var obj = {}, i = TweenManager.Transforms.length - 1; i > -1; i--) {
                var tf = TweenManager.Transforms[i],
                    val = object[tf];
                0 !== val && "number" == typeof val && (obj[tf] = val)
            }
            return obj
        };
        const prefix = function() {
            let pre = "",
                dom = "";
            try {
                var styles = window.getComputedStyle(document.documentElement, "");
                return pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || "" === styles.OLink && ["", "o"])[1], dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1], {
                    unprefixed: "ie" == Device.system.browser && !Device.detect("msie 9"),
                    dom: dom,
                    lowercase: pre,
                    css: "-" + pre + "-",
                    js: ("ie" == Device.system.browser ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
                }
            } catch (e) {
                return {
                    unprefixed: !0,
                    dom: "",
                    lowercase: "",
                    css: "",
                    js: ""
                }
            }
        }();
        CSS.styles = {}, CSS.styles.vendor = prefix.unprefixed ? "" : prefix.js, CSS.styles.vendorTransition = CSS.styles.vendor.length ? CSS.styles.vendor + "Transition" : "transition", CSS.styles.vendorTransform = CSS.styles.vendor.length ? CSS.styles.vendor + "Transform" : "transform", CSS.vendor = prefix.css, CSS.transformProperty = function() {
            switch (prefix.lowercase) {
                case "moz":
                    return "-moz-transform";
                case "webkit":
                    return "-webkit-transform";
                case "o":
                    return "-o-transform";
                case "ms":
                    return "-ms-transform";
                default:
                    return "transform"
            }
        }(), CSS.tween = {}, CSS.tween.complete = prefix.unprefixed ? "transitionend" : prefix.lowercase + "TransitionEnd"
    }), Class((function CSSTransition(_object, _props, _time, _ease, _delay, _callback) {
        const _this = this;
        let _transformProps, _transitionProps;

        function killed() {
            return !_this || _this.kill || !_object || !_object.div
        }

        function clearCSSTween() {
            killed() || (_this.playing = !1, _object._cssTween = null, _object.willChange(null), _object = _props = null, Utils.nullObject(this))
        }
        this.playing = !0,
            function() {
                if ("number" != typeof _time) throw "CSSTween Requires object, props, time, ease";
                ! function initProperties() {
                    var transform = TweenManager._getAllTransforms(_object),
                        properties = [];
                    for (var key in _props) TweenManager._isTransform(key) ? (transform.use = !0, transform[key] = _props[key], delete _props[key]) : ("number" == typeof _props[key] || key.includes(["-", "color"])) && properties.push(key);
                    transform.use && (properties.push(CSS.transformProperty), delete transform.use);
                    _transformProps = transform, _transitionProps = properties
                }(), async function initCSSTween(values) {
                    if (killed()) return;
                    _object._cssTween && (_object._cssTween.kill = !0);
                    _object._cssTween = _this, _object.div._transition = !0;
                    var strings = function buildStrings(time, ease, delay) {
                        for (var props = "", str = "", len = _transitionProps.length, i = 0; i < len; i++) {
                            var transitionProp = _transitionProps[i];
                            props += (props.length ? ", " : "") + transitionProp, str += (str.length ? ", " : "") + transitionProp + " " + time + "ms " + TweenManager._getEase(ease) + " " + delay + "ms"
                        }
                        return {
                            props: props,
                            transition: str
                        }
                    }(_time, _ease, _delay);
                    _object.willChange(strings.props);
                    var time = values ? values.time : _time,
                        delay = values ? values.delay : _delay,
                        props = values ? values.props : _props,
                        transformProps = values ? values.transform : _transformProps,
                        singleFrame = 1e3 / Render.REFRESH_RATE;
                    if (_this.time = _time, _this.delay = _delay, await Timer.delayedCall(3 * singleFrame), killed()) return;
                    if (_object.div.style[CSS.styles.vendorTransition] = strings.transition, _this.playing = !0, "safari" == Device.system.browser) {
                        if (Device.system.browserVersion < 11 && await Timer.delayedCall(singleFrame), killed()) return;
                        _object.css(props), _object.transform(transformProps)
                    } else _object.css(props), _object.transform(transformProps);
                    Timer.create((function() {
                        killed() || (clearCSSTween(), _callback && _callback(), _this.completePromise && _this.completePromise.resolve())
                    }), time + delay)
                }()
            }(), this.stop = function() {
                this.playing && (this.kill = !0, this.playing = !1, _object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1, _object.willChange(null), _object._cssTween = null, Utils.nullObject(this))
            }, this.onComplete = function(callback) {
                return _callback = callback, this
            }, this.promise = function() {
                return _this.completePromise = Promise.create(), _this.completePromise
            }
    })), Class((function FrameTween(_object, _props, _time, _ease, _delay, _callback, _manual) {
        var _endValues, _transformEnd, _transformStart, _startValues, _isTransform, _isCSS, _transformProps, _cssTween, _transformTween, _this = this;

        function copy(obj) {
            let newObj = {};
            for (let key in obj) "number" == typeof obj[key] && (newObj[key] = obj[key]);
            return newObj
        }

        function clear() {
            _object._cssTweens && _object._cssTweens.remove(_this), _this.playing = !1, _object._cssTween = null, _object = _props = null
        }

        function update() {
            if (! function killed() {
                    return _this.kill || !_object || !_object.div
                }()) {
                if (_isCSS && _object.css(_props), _isTransform)
                    if (_object.multiTween) {
                        for (var key in _transformProps) "number" == typeof _transformProps[key] && (_object[key] = _transformProps[key]);
                        _object.transform()
                    } else _object.transform(_transformProps);
                void 0
            }
        }

        function tweenComplete() {
            _this.playing && (clear(), _callback && _callback(), _this.completePromise && _this.completePromise.resolve())
        }
        this.playing = !0, _this.object = _object, _this.props = _props, _this.time = _time, _this.ease = _ease, _this.delay = _delay, defer((function() {
            if (_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_this.props = _props = values.props || _props, _this.time = _time = values.time || _time, _this.ease = _ease = values.ease || _ease, _this.delay = _delay = values.delay || _delay)
            }
            if ("object" == typeof _ease && (_ease = "easeOutCubic"), _object && _props) {
                if (_this.object = _object, "number" != typeof _time) throw "FrameTween Requires object, props, time, ease";
                ! function initValues() {
                    _props.math && delete _props.math;
                    Device.tween.transition && _object.div._transition && (_object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1);
                    _this.time = _time, _this.delay = _delay, _endValues = {}, _transformEnd = {}, _transformStart = {}, _startValues = {}, _object.multiTween || (void 0 === _props.x && (_props.x = _object.x), void 0 === _props.y && (_props.y = _object.y), void 0 === _props.z && (_props.z = _object.z));
                    for (var key in _props)
                        if (key.includes(["damping", "spring"])) _endValues[key] = _props[key], _transformEnd[key] = _props[key];
                        else if (TweenManager._isTransform(key)) _isTransform = !0, _transformStart[key] = _object[key] || ("scale" == key ? 1 : 0), _transformEnd[key] = _props[key];
                    else {
                        _isCSS = !0;
                        var v = _props[key];
                        "string" == typeof v ? _object.div.style[key] = v : "number" == typeof v && (_startValues[key] = Number(_object.css(key)), _endValues[key] = v)
                    }
                }(),
                function startTween() {
                    !_object._cssTween || _manual || _object.multiTween || (_object._cssTween.kill = !0);
                    _this.time = _time, _this.delay = _delay, _object.multiTween && (_object._cssTweens || (_object._cssTweens = []), _object._cssTweens.push(_this));
                    _object._cssTween = _this, _this.playing = !0, _props = copy(_startValues), _transformProps = copy(_transformStart), _isCSS && (_cssTween = tween(_props, _endValues, _time, _ease, _delay, null, _manual).onUpdate(update).onComplete(tweenComplete));
                    _isTransform && (_transformTween = tween(_transformProps, _transformEnd, _time, _ease, _delay, null, _manual).onComplete(_isCSS ? null : tweenComplete).onUpdate(_isCSS ? null : update))
                }()
            }
        })), this.stop = function() {
            this.playing && (_cssTween && _cssTween.stop && _cssTween.stop(), _transformTween && _transformTween.stop && _transformTween.stop(), clear())
        }, this.interpolate = function(elapsed) {
            _cssTween && _cssTween.interpolate(elapsed), _transformTween && _transformTween.interpolate(elapsed), update()
        }, this.getValues = function() {
            return {
                start: _startValues,
                transformStart: _transformStart,
                end: _endValues,
                transformEnd: _transformEnd
            }
        }, this.setEase = function(ease) {
            _cssTween && _cssTween.setEase(ease), _transformTween && _transformTween.setEase(ease)
        }, this.onUpdate = function() {
            return this
        }, this.onComplete = function(callback) {
            return _callback = callback, this
        }, this.promise = function() {
            return _this.completePromise || (_this.completePromise = Promise.create()), _this.completePromise
        }
    })), Class((function Interaction(_object) {
        Inherit(this, Events);
        const _this = this;
        var _touchId, _velocity = [],
            _moved = 0,
            _time = performance.now();

        function Vec2() {
            this.x = 0, this.y = 0, this.length = function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
        }
        var _vec2Pool = new ObjectPool(Vec2, 10);
        let _distance, _timeDown, _timeMove;

        function loop() {
            _moved++ > 10 && (_this.velocity.x = _this.velocity.y = 0, _this.delta.x = _this.delta.y = 0)
        }

        function down(e) {
            if (_this.isTouching || "hit" == e.target.className && e.target.hydraObject != _object || Interaction.hitIsBound(e.target, _object)) return;
            _this.isTouching = !0;
            let x = e.x,
                y = e.y;
            e.changedTouches && (x = e.changedTouches[0].pageX, y = e.changedTouches[0].pageY, _touchId = e.changedTouches[0].identifier), e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), e.x = _this.x = x, e.y = _this.y = y, _this.hold.x = _this.last.x = x, _this.hold.y = _this.last.y = y, _this.delta.x = _this.move.x = _this.velocity.x = 0, _this.delta.y = _this.move.y = _this.velocity.y = 0, _distance = 0, _this.events.fire(Interaction.START, e, !0), _timeDown = _timeMove = Render.TIME
        }

        function move(e) {
            if (!_this.isTouching && !_this.unlocked) return;
            let now = performance.now();
            if (now - _time < 16) return;
            _time = now;
            let x = e.x,
                y = e.y;
            if (e.touches)
                for (let i = 0; i < e.touches.length; i++) {
                    let touch = e.touches[i];
                    touch.identifier == _touchId && (x = touch.pageX, y = touch.pageY)
                }
            _this.isTouching && (_this.move.x = x - _this.hold.x, _this.move.y = y - _this.hold.y), e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), e.x = _this.x = x, e.y = _this.y = y, _this.delta.x = x - _this.last.x, _this.delta.y = y - _this.last.y, _this.last.x = x, _this.last.y = y, _moved = 0, _distance += _this.delta.length();
            let delta = Render.TIME - (_timeMove || Render.TIME);
            if (_timeMove = Render.TIME, delta > .01) {
                let velocity = _vec2Pool.get();
                velocity.x = Math.abs(_this.delta.x) / delta, velocity.y = Math.abs(_this.delta.y) / delta, _velocity.push(velocity), _velocity.length > 5 && _vec2Pool.put(_velocity.shift())
            }
            _this.velocity.x = _this.velocity.y = 0;
            for (let i = 0; i < _velocity.length; i++) _this.velocity.x += _velocity[i].x, _this.velocity.y += _velocity[i].y;
            _this.velocity.x /= _velocity.length, _this.velocity.y /= _velocity.length, _this.velocity.x = _this.velocity.x || 0, _this.velocity.y = _this.velocity.y || 0, _this.events.fire(Interaction.MOVE, e, !0), _this.isTouching && _this.events.fire(Interaction.DRAG, e, !0)
        }

        function up(e) {
            if (e && e.changedTouches)
                for (let i = 0; i < e.changedTouches.length; i++)
                    if (e.changedTouches[i].identifier != _touchId) return;
            if (!_this.isTouching && !_this.unlocked) return;
            _this.isTouching = !1, _this.move.x = 0, _this.move.y = 0, Math.max(.001, Render.TIME - (_timeMove || Render.TIME)) > 100 && (_this.delta.x = 0, _this.delta.y = 0), _distance < 20 && Render.TIME - _timeDown < 2e3 && _this.events.fire(Interaction.CLICK, e, !0), _this.events.fire(Interaction.END, e, !0), Device.mobile && (_this.velocity.x = _this.velocity.y = 0)
        }

        function leave() {
            _this.ignoreLeave || (_this.delta.x = 0, _this.delta.y = 0, up())
        }
        this.x = 0, this.y = 0, this.hold = new Vec2, this.last = new Vec2, this.delta = new Vec2, this.move = new Vec2, this.velocity = new Vec2,
            function() {
                if (!_object instanceof HydraObject) throw "Interaction.Input requires a HydraObject";
                ! function addHandlers() {
                    _object == Stage || _object == __window ? Interaction.bind("touchstart", down) : (_object.bind("touchstart", down), Interaction.bindObject(_object));
                    Interaction.bind("touchmove", move), Interaction.bind("touchend", up), Interaction.bind("leave", leave)
                }(), Render.start(loop)
            }(), this.onDestroy = function() {
                Interaction.unbind("touchstart", down), Interaction.unbind("touchmove", move), Interaction.unbind("touchend", up), Render.stop(loop), Interaction.unbindObject(_object), _object && _object.unbind && _object.unbind("touchstart", down)
            }
    }), () => {
        Namespace(Interaction), Interaction.CLICK = "interaction_click", Interaction.START = "interaction_start", Interaction.MOVE = "interaction_move", Interaction.DRAG = "interaction_drag", Interaction.END = "interaction_end";
        const _objects = [],
            _events = {
                touchstart: [],
                touchmove: [],
                touchend: [],
                leave: []
            };

        function touchMove(e) {
            _events.touchmove.forEach(c => c(e))
        }

        function touchStart(e) {
            _events.touchstart.forEach(c => c(e))
        }

        function touchEnd(e) {
            _events.touchend.forEach(c => c(e))
        }

        function leave(e) {
            _events.leave.forEach(c => c(e))
        }
        Hydra.ready(async () => {
            await defer(), __window.bind("touchstart", touchStart), __window.bind("touchmove", touchMove), __window.bind("touchend", touchEnd), __window.bind("touchcancel", touchEnd), __window.bind("contextmenu", touchEnd), __window.bind("mouseleave", leave), __window.bind("mouseout", leave)
        }), Interaction.bind = function(evt, callback) {
            _events[evt].push(callback)
        }, Interaction.unbind = function(evt, callback) {
            _events[evt].remove(callback)
        }, Interaction.bindObject = function(obj) {
            _objects.push(obj)
        }, Interaction.unbindObject = function(obj) {
            _objects.remove(obj)
        }, Interaction.hitIsBound = function(element, boundObj) {
            let obj = element.hydraObject;
            if (!obj) return !1;
            for (; obj;) {
                if (obj != boundObj && _objects.includes(obj)) return !0;
                obj = obj._parent
            }
            return !1
        }
    }), Class((function Mouse() {
        Inherit(this, Events);
        const _this = this;
        this.x = 0, this.y = 0, this.normal = {
            x: 0,
            y: 0
        }, this.tilt = {
            x: 0,
            y: 0
        }, this.inverseNormal = {
            x: 0,
            y: 0
        }, this.resetOnRelease = !1;
        const _offset = {
            x: 0,
            y: 0
        };

        function init() {
            defer(_ => {
                _this.resetOnRelease && Device.mobile && (_this.x = Stage.width / 2, _this.y = Stage.height / 2)
            }), _this.input = new Interaction(__window), _this.input.unlocked = !0, _this.events.sub(_this.input, Interaction.START, update), _this.events.sub(_this.input, Interaction.MOVE, update), _this.events.sub(_this.input, Interaction.END, end), _this.hold = _this.input.hold, _this.last = _this.input.last, _this.delta = _this.input.delta, _this.move = _this.input.move, _this.velocity = _this.input.velocity, defer(() => {
                _this.events.sub(Events.RESIZE, resize), resize()
            })
        }

        function update(e) {
            _this.x = e.x, _this.y = e.y, Stage.width && Stage.height && (_this.normal.x = e.x / Stage.width - _offset.x, _this.normal.y = e.y / Stage.height - _offset.y, _this.tilt.x = 2 * _this.normal.x - 1, _this.tilt.y = 1 - 2 * _this.normal.y, _this.inverseNormal.x = _this.normal.x, _this.inverseNormal.y = 1 - _this.normal.y)
        }

        function end(e) {
            Device.mobile && _this.resetOnRelease && update({
                x: Stage.width / 2,
                y: Stage.height / 2
            })
        }

        function resize() {
            Stage.css("top") && (_offset.y = Stage.css("top") / Stage.height), Stage.css("left") && (_offset.x = Stage.css("left") / Stage.width)
        }
        Hydra.ready(init)
    }), "Static"), Class((function Keyboard() {
        Inherit(this, Component);
        var _this = this;

        function addListeners() {
            __window.keydown(keydown), __window.keyup(keyup), __window.keypress(keypress)
        }

        function keydown(e) {
            _this.events.fire(_this.DOWN, e)
        }

        function keyup(e) {
            _this.events.fire(_this.UP, e)
        }

        function keypress(e) {
            _this.events.fire(_this.PRESS, e)
        }
        _this.DOWN = "keyboard_down", _this.PRESS = "keyboard_press", _this.UP = "keyboard_up", Hydra.ready(addListeners)
    }), "static"), Class((function Mobile() {
        Inherit(this, Component), Namespace(this);
        const _this = this;

        function preventNativeScroll(e) {
            if (_this.isAllowNativeScroll) return;
            let target = e.target;
            if ("INPUT" == target.nodeName || "TEXTAREA" == target.nodeName || "SELECT" == target.nodeName || "A" == target.nodeName) return;
            let prevent = target.hydraObject;
            for (; target.parentNode && prevent;) target._scrollParent && (prevent = !1), target = target.parentNode;
            prevent && e.preventDefault()
        }

        function resize() {
            updateOrientation(), checkResizeRefresh(), _this.isAllowNativeScroll || (document.body.scrollTop = 0)
        }

        function updateOrientation() {
            _this.orientation = Stage.width > Stage.height ? "landscape" : "portrait", _this.orientationSet && (window.Fullscreen.isOpen || Device.mobile.pwa) && window.screen && window.screen.orientation && window.screen.orientation.lock(_this.orientationSet)
        }
        Hydra.ready(() => {
            Device.mobile && (! function addHandlers() {
                _this.events.sub(Events.RESIZE, resize), Device.mobile.native || window.addEventListener("touchstart", preventNativeScroll, {
                    passive: !1
                })
            }(), "safari" != Device.system.browser || Device.mobile.native || (__body.css({
                height: "100%"
            }).div.scrollTop = 0), Device.mobile.native && Stage.css({
                width: "100vw",
                height: "100vh"
            }))
        });
        const checkResizeRefresh = function() {
            let _lastWidth;
            return function() {
                _this.isPreventResizeReload || _lastWidth != Stage.width && (_lastWidth = Stage.width, ("ios" === Device.system.os || "android" == Device.system.os && Device.system.version >= 7) && (!Device.mobile.tablet || Math.max(Stage.width, Stage.height) > 800 || window.location.reload()))
            }
        }();
        this.vibrate = function(duration) {
            navigator.vibrate && navigator.vibrate(duration)
        }, this.fullscreen = function() {
            if (Device.mobile && !Device.mobile.native && !Device.mobile.pwa && !Dev.emulator) {
                if (!window.Fullscreen) throw "Mobile.fullscreen requires Fullscreen module";
                "android" === Device.system.os && (__window.bind("touchend", () => {
                    Fullscreen.open()
                }), _this.ScreenLock && _this.ScreenLock.isActive && window.onresize())
            }
        }, this.setOrientation = function(orientation, isForce) {
            if (_this.System && _this.NativeCore.active) return _this.System.orientation = _this.System[orientation.toUpperCase()];
            if (_this.orientationSet = orientation, updateOrientation(), isForce) {
                if (!_this.ScreenLock) throw "Mobile.setOrientation isForce argument requires ScreenLock module";
                "any" === orientation ? _this.ScreenLock.unlock() : _this.ScreenLock.lock()
            }
        }, this.allowNativeScroll = function() {
            _this.isAllowNativeScroll = !0
        }, this.preventResizeReload = function() {
            _this.isPreventResizeReload = !0
        }, this._addOverflowScroll = function($obj) {
            $obj.div._scrollParent = !0, Device.mobile.native || ($obj.div._preventEvent = function(e) {
                e.stopPropagation()
            }, $obj.bind("touchmove", $obj.div._preventEvent))
        }, this._removeOverflowScroll = function($obj) {
            $obj.unbind("touchmove", $obj.div._preventEvent)
        }, this.get("phone", () => {
            throw "Mobile.phone is removed. Use Device.mobile.phone"
        }), this.get("tablet", () => {
            throw "Mobile.tablet is removed. Use Device.mobile.tablet"
        }), this.get("os", () => {
            throw "Mobile.os is removed. Use Device.system.os"
        })
    }), "Static"), Class((function PushState(_isHash) {
        const _this = this;
        let _store, _root = "";

        function getState() {
            return _isHash ? String(window.location.hash.slice(3)) : ("/" !== _root ? location.pathname.split(_root)[1] : location.pathname.slice(1)) || ""
        }

        function handleStateChange(state, forced) {
            if (state !== _store || forced)
                if (!_this.isLocked || forced) _store = state, _this.events.fire(Events.UPDATE, {
                    value: state,
                    split: state.split("/")
                });
                else {
                    if (!_store) return;
                    _isHash ? window.location.hash = "!/" + _store : window.history.pushState(null, null, _root + _store)
                }
        }
        "boolean" != typeof _isHash && (_isHash = Hydra.LOCAL || !Device.system.pushstate), this.isLocked = !1,
            function addHandlers() {
                if (_isHash) return window.addEventListener("hashchange", () => handleStateChange(getState()), !1);
                window.onpopstate = history.onpushstate = () => handleStateChange(getState())
            }(), _store = getState(), this.getState = this._getState = function() {
                return Device.mobile.native ? Storage.get("app_state") || "" : getState()
            }, this.setRoot = function(root) {
                _root = "/" === root.charAt(0) ? root : "/" + root
            }, this.setState = this._setState = function(state, forced) {
                if (Device.mobile.native && Storage.set("app_state", state), state !== _store) return _isHash ? window.location.hash = "!/" + state : window.history.pushState(null, null, _root + state), _this.fireChangeWhenSet && handleStateChange(getState(), forced), _store = state, !0
            }, this.replaceState = function(state) {
                state !== _store && (_store = state, _isHash ? window.location.hash = "!/" + state : window.history.replaceState(null, null, _root + state))
            }, this.setTitle = function(title) {
                document.title = title
            }, this.lock = function() {
                this.isLocked = !0
            }, this.unlock = function() {
                this.isLocked = !1
            }, this.useHash = function() {
                _isHash = !0
            }
    })), Class((function AppState() {
        const _this = this;
        var _map = new Map,
            _bindings = new Map;

        function StateBinding(_keys, _obj) {
            var _string, _oldValue;
            _obj instanceof HydraObject ? ("div" == _obj._type && (_string = _obj.text()), "input" == _obj._type && (_string = _obj.val())) : window.GLUI && _obj instanceof GLUIText && (_string = _obj.getTextString()), this.update = function(key, value) {
                let newValue = function parse(key, value) {
                    if (!_string || !_string.includes("$(")) return value;
                    let string = _string;
                    return _keys.forEach(key => {
                        string = string.replace(`$(${key})`, _this.get(key))
                    }), string
                }(0, value);
                newValue != _oldValue && (_oldValue = newValue, _obj instanceof HydraObject ? ("div" == _obj._type && _obj.text(newValue), "input" == _obj._type && _obj.val(newValue)) : window.GLUI && _obj instanceof GLUIText ? _obj.setText(newValue) : _obj.onStateChange ? _obj.onStateChange(value) : "function" == typeof _obj && _obj(value))
            }
        }
        this.set = function(key, value) {
            _map.set(key, value);
            let array = _bindings.get(key);
            array && array.forEach(b => b.update(key, value))
        }, this.get = function(key) {
            return _map.get(key)
        }, this.bind = function(keys, obj) {
            Array.isArray(keys) || (keys = [keys]);
            let binding = new StateBinding(keys, obj);
            keys.forEach(key => {
                _bindings.has(key) ? _bindings.get(key).push(binding) : _bindings.set(key, [binding]);
                let value = _map.get(key);
                value && binding.update(value)
            })
        }, this.createLocal = function() {
            return new AppState
        }
    }), "static"), Class((function Dev() {
        var _post, _alert, _inter, _timerName, _this = this,
            _id = Utils.timestamp();

        function catchErrors() {
            window.onerror = function(message, file, line) {
                var string = message + " ::: " + file + " : " + line;
                _alert && alert(string), _post && post(_post + "/api/data/debug", getDebugInfo(string)), _this.onError && _this.onError(message, file, line)
            }
        }

        function getDebugInfo(string) {
            var obj = {};
            return obj.time = (new Date).toString(), obj.deviceId = _id, obj.err = string, obj.ua = Device.agent, obj.width = Stage.width, obj.height = Stage.height, obj.screenWidth = screen.width, obj.screenHeight = screen.height, obj
        }
        this.emulator = Device.mobile && navigator.platform && navigator.platform.toLowerCase().includes(["mac", "windows"]), this.alertErrors = function(url) {
            _alert = !0, "string" == typeof url && (url = [url]);
            for (var i = 0; i < url.length; i++)
                if (location.href.includes(url[i]) || location.hash.includes(url[i])) return catchErrors()
        }, this.postErrors = function(url, post) {
            _post = post, "string" == typeof url && (url = [url]);
            for (var i = 0; i < url.length; i++)
                if (location.href.includes(url[i])) return catchErrors()
        }, this.expose = function(name, val, force) {
            (Hydra.LOCAL || force) && (window[name] = val)
        }, this.logServer = function(msg) {
            _post && post(_post + "/api/data/debug", getDebugInfo(msg))
        }, this.unsupported = function(needsAlert) {
            needsAlert && alert("Hi! This build is not yet ready for this device, things may not work as expected. Refer to build schedule for when this device will be supported.")
        }, this.checkForLeaks = function(flag, array) {
            if (!window.AURA) {
                var matchArray = function(prop) {
                    if (!array) return !1;
                    for (var i = 0; i < array.length; i++)
                        if (prop.includes(array[i])) return !0;
                    return !1
                };
                clearInterval(_inter), flag && (_inter = setInterval((function() {
                    for (var prop in window) {
                        if (!prop.includes("webkit"))
                            if ("function" != typeof window[prop] && prop.length > 2) {
                                if (prop.includes("_ga") || prop.includes("_typeface_js") || matchArray(prop)) continue;
                                var char1 = prop.charAt(0),
                                    char2 = prop.charAt(1);
                                if (("_" == char1 || "$" == char1) && char2 !== char2.toUpperCase()) throw console.log(window[prop]), "Hydra Warning:: " + prop + " leaking into global scope"
                            }
                    }
                }), 1e3))
            }
        }, this.startTimer = function(name) {
            _timerName = name || "Timer", console.time && !window._NODE_ ? console.time(_timerName) : _timer = performance.now()
        }, this.stopTimer = function() {
            console.time && !window._NODE_ ? console.timeEnd(_timerName) : console.log("Render " + _timerName + ": " + (performance.now() - _timer))
        }, this.writeFile = function(file, data) {
            let protocol = location.protocol,
                port = "https:" === protocol ? ":8018" : ":8017",
                url = protocol + "//" + location.hostname + port + location.pathname + file;
            post(url, data, {
                headers: {
                    "content-type": "text/plain"
                }
            }).then(e => {
                "OK" != e && console.warn("Unable to write to " + file)
            })
        }, this.execUILScript = async function(name, data) {
            if (!Hydra.LOCAL) return;
            let url = location.protocol + "//" + location.hostname + ":8017" + (_this.pathName || location.pathname) + "/uil/" + name,
                response = await post(url, data, {
                    headers: {
                        "content-type": "text/plain"
                    }
                });
            if ("ERROR" == response) throw response;
            return response
        }, Hydra.LOCAL && _this.checkForLeaks(!0)
    }), "Static"), Class((function Service() {
        Inherit(this, Component);
        var _sw, _this = this;

        function getSWAssets() {
            if (!window.ASSETS.SW || _this.cached) return [];
            var assets = window.ASSETS.SW;
            return assets.forEach((asset, i) => {
                asset.includes(".js") && (asset = assets[i].replace(".js", ".js?" + window._CACHE_))
            }), assets
        }

        function handleRegistration(e) {}

        function handleReady(e) {
            _this.isReady = !0, _this.events.fire(Events.READY, e, !0), _sw = navigator.serviceWorker.controller,
                function checkCache() {
                    Storage.get("service_cache") != window._CACHE_ && _this.post("clearCache")
                }()
        }

        function handleError(e) {
            e && (_this.events.fire(Events.ERROR, e, !0), _this.active = !1)
        }

        function handleMessage(e) {
            var data = e.data;
            data.evt && _this.events.fire(data.evt, data)
        }
        this.active = !1, this.ready = !1, this.cached = !1, this.offline = !1, this.disabled = !1, this.ready = function() {
            return this.wait(this, "isReady")
        }, this.init = function() {
            Hydra.ready(() => {
                !("serviceWorker" in navigator) || Hydra.LOCAL && "" == location.port || window.process || _this.disabled || function initWorker() {
                    _this.active = !0, navigator.serviceWorker.register("sw.js").then(handleRegistration).then(handleReady).then(handleError)
                }()
            })
        }, this.cache = function(assets = []) {
            assets = Array.from(assets);
            _this.active && _this.wait(_this, "ready", (function() {
                _this.post("upload", {
                    assets: assets,
                    cdn: Assets.CDN,
                    hostname: location.hostname,
                    sw: getSWAssets(),
                    offline: _this.offline
                }), Storage.set("service_cache", window._CACHE_), _this.cached = !0
            }))
        }, this.post = function(fn, data = {}) {
            if (!_this.active) return;
            _this.wait(_this, "ready", (function() {
                let mc = new MessageChannel;
                mc.port1.onmessage = handleMessage, data.fn = fn, _sw && _sw.postMessage(data, [mc.port2])
            }))
        }
    }), "static"), Class((function Storage() {
        var _storage;

        function cookie(key, value, expires) {
            var options;
            if (arguments.length > 1 && (null === value || "object" != typeof value)) {
                if ((options = {}).path = "/", options.expires = expires || 1, null === value && (options.expires = -1), "number" == typeof options.expires) {
                    var days = options.expires,
                        t = options.expires = new Date;
                    t.setDate(t.getDate() + days)
                }
                return document.cookie = [encodeURIComponent(key), "=", options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
            }
            var result, decode = (options = value || {}).raw ? function(s) {
                return s
            } : decodeURIComponent;
            return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
        }! function testStorage() {
            try {
                if (window.localStorage) try {
                    window.localStorage.test = 1, window.localStorage.removeItem("test"), _storage = !0
                } catch (e) {
                    _storage = !1
                } else _storage = !1
            } catch (e) {
                _storage = !1
            }
        }(), this.setCookie = function(key, value, expires) {
            cookie(key, value, expires)
        }, this.getCookie = function(key) {
            return cookie(key)
        }, this.set = function(key, value) {
            null != value && "object" == typeof value && (value = JSON.stringify(value)), _storage ? null === value ? window.localStorage.removeItem(key) : window.localStorage[key] = value : cookie(key, value, 365)
        }, this.get = function(key) {
            var val, char0;
            (val = _storage ? window.localStorage[key] : cookie(key)) && (val.charAt && (char0 = val.charAt(0)), "{" != char0 && "[" != char0 || (val = JSON.parse(val)), "true" != val && "false" != val || (val = "true" == val));
            return val
        }
    }), "Static"), Class((function Thread(_class) {
        Inherit(this, Component);
        var _this = this,
            _worker, _callbacks, _path, _mvc, _msg = {};

        function init() {
            let file = window._ES5_ ? "assets/js/hydra/hydra-thread-es5.js" : "assets/js/hydra/hydra-thread.js";
            _callbacks = {}, _worker = new Worker(Thread.PATH + file)
        }

        function importClasses() {
            importClass(Utils), importClass(Component), importClass(Events), importClass(_class, !0)
        }

        function importClass(_class, scoped) {
            if (_class) {
                var code;
                if (scoped) {
                    code = (code = _class.toString().replace("{", "!!!")).split("!!!")[1];
                    for (var splitChar = window._MINIFIED_ ? "=" : " "; code.includes("this");) {
                        var name = code.slice(code.indexOf("this.")).split("this.")[1].split(splitChar)[0];
                        code = code.replace("this", "self"), createMethod(name)
                    }
                    code = (code = code.slice(0, -1)).replace(/_self/g, "_this")
                } else if ("function" != typeof _class) {
                    if ((code = _class.constructor.toString()).includes("[native")) return;
                    code = (_class.constructor._namespace ? _class.constructor._namespace + "." : "") + "Class(" + code + ', "static");'
                } else code = (_class._namespace ? _class._namespace + "." : "") + "Class(" + _class.toString() + ");";
                _worker.postMessage({
                    code: code
                })
            }
        }

        function createMethod(name) {
            _this[name] = function(message = {}, callback, buffer) {
                let promise;
                return Array.isArray(callback) && (buffer = callback, callback = void 0), Array.isArray(buffer) && ((message = {
                    msg: message,
                    transfer: !0
                }).buffer = buffer), void 0 === callback && (promise = Promise.create(), callback = promise.resolve), _this.send(name, message, callback), promise
            }
        }

        function addListeners() {
            _worker.addEventListener("message", workerMessage)
        }

        function workerMessage(e) {
            if (e.data.console) console.log(e.data.message);
            else if (e.data.id) {
                (callback = _callbacks[e.data.id]) && callback(e.data.message), delete _callbacks[e.data.id]
            } else if (e.data.emit) {
                (callback = _callbacks[e.data.evt]) && callback(e.data.msg)
            } else {
                var callback;
                (callback = _callbacks.transfer) && callback(e.data)
            }
        }
        init(), importClasses(), addListeners(), this.on = function(evt, callback) {
            _callbacks[evt] = callback
        }, this.off = function(evt) {
            delete _callbacks[evt]
        }, this.loadFunction = function() {
            let names = [],
                load = code => {
                    var split = (code = (code = code.toString()).replace("(", "!!!")).split("!!!"),
                        name = split[0].split(" ")[1];
                    code = "self." + name + " = function(" + split[1], _worker.postMessage({
                        code: code
                    }), createMethod(name), names.push(name)
                };
            for (var i = 0; i < arguments.length; i++) load(arguments[i]);
            return names
        }, this.importScript = function(path) {
            _worker.postMessage({
                path: Thread.absolutePath(path),
                importScript: !0
            })
        }, this.importCode = function(code) {
            _worker.postMessage({
                code: code
            })
        }, this.importClass = function() {
            for (var i = 0; i < arguments.length; i++) {
                var code = arguments[i];
                importClass(code)
            }
        }, this.importModules = this.importModule = function() {
            for (var i = 0; i < arguments.length; i++) {
                let code = Modules.getConstructor(arguments[i]).toString();
                _worker.postMessage({
                    code: `Module(${code})`
                })
            }
        }, this.importES6Class = function(name) {
            if (window._ES5_) {
                let Class = window[name],
                    base = Class.toString(),
                    proto = [];
                Object.getOwnPropertyNames(Class.prototype).forEach(fn => {
                    "constructor" != fn && Class.prototype[fn] && proto.push({
                        key: fn,
                        string: Class.prototype[fn].toString()
                    })
                }), _worker.postMessage({
                    es5: base,
                    name: name,
                    proto: proto
                })
            } else _worker.postMessage({
                es6: `(${eval(name)})`,
                name: name
            })
        }, this.send = function(name, message, callback) {
            if ("string" == typeof name) {
                (message = message || {}).fn = name
            } else callback = message, message = name;
            Thread.UNIQUE_ID > 999999 && (Thread.UNIQUE_ID = 1);
            var id = Thread.UNIQUE_ID++;
            callback && (_callbacks[id] = callback), message.transfer ? (message.msg.id = id, message.msg.fn = message.fn, message.msg.transfer = !0, _worker.postMessage(message.msg, message.buffer)) : (_msg.message = message, _msg.id = id, _worker.postMessage(_msg))
        }, this.onDestroy = function() {
            _worker.terminate && _worker.terminate()
        }
    }), () => {
        var _shared;
        Thread.PATH = "", Thread.UNIQUE_ID = 1, Thread.absolutePath = Hydra.absolutePath, Thread.cluster = function() {
            return new function() {
                let index = 0,
                    array = [];
                this.push = function(thread) {
                    array.push(thread)
                }, this.get = function() {
                    let thread = array[index];
                    return index++, index >= array.length && (index = 0), thread
                }, this.array = array
            }
        }, Thread.upload = function(...args) {
            let name;
            Thread.shared();
            for (let i = 0; i < _shared.array.length; i++) name = _shared.array[i].loadFunction(...args);
            return name
        }, Thread.shared = function(list) {
            if (!_shared) {
                _shared = Thread.cluster();
                let count = navigator.hardwareConcurrency || 4;
                for (let i = 0; i < count; i++) _shared.push(new Thread)
            }
            return list ? _shared : _shared.get()
        }
    }), Class((function TweenManager() {
        Namespace(this);
        var _this = this,
            _tweens = [];

        function updateTweens(time, dt) {
            for (let i = _tweens.length - 1; i >= 0; i--) {
                let tween = _tweens[i];
                tween.update ? tween.update(dt) : _this._removeMathTween(tween)
            }
        }

        function findEase(name) {
            for (var eases = _this.CubicEases, i = eases.length - 1; i > -1; i--)
                if (eases[i].name == name) return eases[i];
            return !1
        }
        this.CubicEases = [], Render.start(updateTweens), this._addMathTween = function(tween) {
            _tweens.push(tween)
        }, this._removeMathTween = function(tween) {
            _tweens.remove(tween)
        }, this._getEase = function(name, values) {
            var ease = findEase(name);
            return !!ease && (values ? ease.path ? ease.path.solve : ease.values : ease.curve)
        }, this._inspectEase = function(name) {
            return findEase(name)
        }, this.tween = function(object, props, time, ease, delay, complete, isManual, scaledTime) {
            "number" != typeof delay && (update = complete, complete = delay, delay = 0);
            const tween = new MathTween(object, props, time, ease, delay, complete, isManual, scaledTime);
            let usePromise = null;
            return complete && complete instanceof Promise && (usePromise = complete, complete = complete.resolve), usePromise || tween
        }, this.clearTween = function(object) {
            if (object._mathTween && object._mathTween.stop && object._mathTween.stop(), object._mathTweens) {
                for (var tweens = object._mathTweens, i = 0; i < tweens.length; i++) {
                    var tw = tweens[i];
                    tw && tw.stop && tw.stop()
                }
                object._mathTweens = null
            }
        }, this.addCustomEase = function(ease) {
            var add = !0;
            if ("object" != typeof ease || !ease.name || !ease.curve) throw "TweenManager :: addCustomEase requires {name, curve}";
            for (var i = _this.CubicEases.length - 1; i > -1; i--) ease.name == _this.CubicEases[i].name && (add = !1);
            if (add) {
                if ("m" == ease.curve.charAt(0).toLowerCase()) {
                    if (!window.EasingPath) throw "Using custom eases requires easingpath module";
                    ease.path = new EasingPath(ease.curve)
                } else ease.values = function stringToValues(str) {
                    for (var values = str.split("(")[1].slice(0, -1).split(","), i = 0; i < values.length; i++) values[i] = parseFloat(values[i]);
                    return values
                }(ease.curve);
                _this.CubicEases.push(ease)
            }
            return ease
        }, Math.interpolate = function(start, end, alpha, ease) {
            const fn = _this.Interpolation.convertEase(ease);
            return Math.mix(start, end, "function" == typeof fn ? fn(alpha) : _this.Interpolation.solve(fn, alpha))
        }, window.tween = this.tween, window.clearTween = this.clearTween
    }), "Static"), TweenManager.Class((function Interpolation() {
        function calculateBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
        }

        function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1
        }

        function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1
        }

        function C(aA1) {
            return 3 * aA1
        }
        this.convertEase = function(ease) {
            var fn = function() {
                switch (ease) {
                    case "easeInQuad":
                        return TweenManager.Interpolation.Quad.In;
                    case "easeInCubic":
                        return TweenManager.Interpolation.Cubic.In;
                    case "easeInQuart":
                        return TweenManager.Interpolation.Quart.In;
                    case "easeInQuint":
                        return TweenManager.Interpolation.Quint.In;
                    case "easeInSine":
                        return TweenManager.Interpolation.Sine.In;
                    case "easeInExpo":
                        return TweenManager.Interpolation.Expo.In;
                    case "easeInCirc":
                        return TweenManager.Interpolation.Circ.In;
                    case "easeInElastic":
                        return TweenManager.Interpolation.Elastic.In;
                    case "easeInBack":
                        return TweenManager.Interpolation.Back.In;
                    case "easeInBounce":
                        return TweenManager.Interpolation.Bounce.In;
                    case "easeOutQuad":
                        return TweenManager.Interpolation.Quad.Out;
                    case "easeOutCubic":
                        return TweenManager.Interpolation.Cubic.Out;
                    case "easeOutQuart":
                        return TweenManager.Interpolation.Quart.Out;
                    case "easeOutQuint":
                        return TweenManager.Interpolation.Quint.Out;
                    case "easeOutSine":
                        return TweenManager.Interpolation.Sine.Out;
                    case "easeOutExpo":
                        return TweenManager.Interpolation.Expo.Out;
                    case "easeOutCirc":
                        return TweenManager.Interpolation.Circ.Out;
                    case "easeOutElastic":
                        return TweenManager.Interpolation.Elastic.Out;
                    case "easeOutBack":
                        return TweenManager.Interpolation.Back.Out;
                    case "easeOutBounce":
                        return TweenManager.Interpolation.Bounce.Out;
                    case "easeInOutQuad":
                        return TweenManager.Interpolation.Quad.InOut;
                    case "easeInOutCubic":
                        return TweenManager.Interpolation.Cubic.InOut;
                    case "easeInOutQuart":
                        return TweenManager.Interpolation.Quart.InOut;
                    case "easeInOutQuint":
                        return TweenManager.Interpolation.Quint.InOut;
                    case "easeInOutSine":
                        return TweenManager.Interpolation.Sine.InOut;
                    case "easeInOutExpo":
                        return TweenManager.Interpolation.Expo.InOut;
                    case "easeInOutCirc":
                        return TweenManager.Interpolation.Circ.InOut;
                    case "easeInOutElastic":
                        return TweenManager.Interpolation.Elastic.InOut;
                    case "easeInOutBack":
                        return TweenManager.Interpolation.Back.InOut;
                    case "easeInOutBounce":
                        return TweenManager.Interpolation.Bounce.InOut;
                    case "linear":
                        return TweenManager.Interpolation.Linear.None
                }
            }();
            if (!fn) {
                var curve = TweenManager._getEase(ease, !0);
                fn = curve || TweenManager.Interpolation.Cubic.Out
            }
            return fn
        }, this.solve = function(values, elapsed) {
            return values[0] == values[1] && values[2] == values[3] ? elapsed : calculateBezier(function getTForX(aX, mX1, mX2) {
                for (var aT, aA1, aA2, aGuessT = aX, i = 0; i < 4; i++) {
                    var currentSlope = (aT = aGuessT, 3 * A(aA1 = mX1, aA2 = mX2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1));
                    if (0 == currentSlope) return aGuessT;
                    aGuessT -= (calculateBezier(aGuessT, mX1, mX2) - aX) / currentSlope
                }
                return aGuessT
            }(elapsed, values[0], values[2]), values[1], values[3])
        }, this.Linear = {
            None: function(k) {
                return k
            }
        }, this.Quad = {
            In: function(k) {
                return k * k
            },
            Out: function(k) {
                return k * (2 - k)
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k : -.5 * (--k * (k - 2) - 1)
            }
        }, this.Cubic = {
            In: function(k) {
                return k * k * k
            },
            Out: function(k) {
                return --k * k * k + 1
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k : .5 * ((k -= 2) * k * k + 2)
            }
        }, this.Quart = {
            In: function(k) {
                return k * k * k * k
            },
            Out: function(k) {
                return 1 - --k * k * k * k
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k : -.5 * ((k -= 2) * k * k * k - 2)
            }
        }, this.Quint = {
            In: function(k) {
                return k * k * k * k * k
            },
            Out: function(k) {
                return --k * k * k * k * k + 1
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k * k : .5 * ((k -= 2) * k * k * k * k + 2)
            }
        }, this.Sine = {
            In: function(k) {
                return 1 - Math.cos(k * Math.PI / 2)
            },
            Out: function(k) {
                return Math.sin(k * Math.PI / 2)
            },
            InOut: function(k) {
                return .5 * (1 - Math.cos(Math.PI * k))
            }
        }, this.Expo = {
            In: function(k) {
                return 0 === k ? 0 : Math.pow(1024, k - 1)
            },
            Out: function(k) {
                return 1 === k ? 1 : 1 - Math.pow(2, -10 * k)
            },
            InOut: function(k) {
                return 0 === k ? 0 : 1 === k ? 1 : (k *= 2) < 1 ? .5 * Math.pow(1024, k - 1) : .5 * (2 - Math.pow(2, -10 * (k - 1)))
            }
        }, this.Circ = {
            In: function(k) {
                return 1 - Math.sqrt(1 - k * k)
            },
            Out: function(k) {
                return Math.sqrt(1 - --k * k)
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? -.5 * (Math.sqrt(1 - k * k) - 1) : .5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
            }
        }, this.Elastic = {
            In: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), -a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p))
            },
            Out: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1)
            },
            InOut: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), (k *= 2) < 1 ? a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * -.5 : a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * .5 + 1)
            }
        }, this.Back = {
            In: function(k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s)
            },
            Out: function(k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1
            },
            InOut: function(k) {
                var s = 2.5949095;
                return (k *= 2) < 1 ? k * k * ((s + 1) * k - s) * .5 : .5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
            }
        }, this.Bounce = {
            In: function(k) {
                return 1 - this.Bounce.Out(1 - k)
            },
            Out: function(k) {
                return k < 1 / 2.75 ? 7.5625 * k * k : k < 2 / 2.75 ? 7.5625 * (k -= 1.5 / 2.75) * k + .75 : k < 2.5 / 2.75 ? 7.5625 * (k -= 2.25 / 2.75) * k + .9375 : 7.5625 * (k -= 2.625 / 2.75) * k + .984375
            },
            InOut: function(k) {
                return k < .5 ? .5 * this.Bounce.In(2 * k) : .5 * this.Bounce.Out(2 * k - 1) + .5
            }
        }
    }), "Static"), Class((function MathTween(_object, _props, _time, _ease, _delay, _callback, _manual, _scaledTime) {
        var _startTime, _startValues, _endValues, _easeFunction, _paused, _newEase, _spring, _damping, _update, _currentTime, _this = this,
            _elapsed = 0;

        function clear() {
            if (!_object && !_props) return !1;
            _object._mathTween = null, TweenManager._removeMathTween(_this), Utils.nullObject(_this), _object._mathTweens && _object._mathTweens.remove(_this._tweenWrapper)
        }
        _this.object = _object, _this.props = _props, _this.time = _time, _this.ease = _ease, _this.delay = _delay, defer((function() {
            if (_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_this.props = _props = values.props || _props, _this.time = _time = values.time || _time, _this.ease = _ease = values.ease || _ease, _this.delay = _delay = values.delay || _delay)
            }
            if (_object && _props) {
                if (_this.object = _object, "number" != typeof _time) throw "MathTween Requires object, props, time, ease";
                ! function start() {
                    _object.multiTween || !_object._mathTween || _manual || TweenManager.clearTween(_object);
                    _manual || TweenManager._addMathTween(_this);
                    _this.time = _time, _this.delay = _delay;
                    let propString = function getPropString() {
                        let string = "";
                        for (let key in _props) "number" == typeof _props[key] && (string += key + " ");
                        return string
                    }();
                    _object._mathTween = _this, _object.multiTween && (_object._mathTweens || (_object._mathTweens = []), _object._mathTweens.forEach(t => {
                        t.props == propString && t.tween.stop()
                    }), _this._tweenWrapper = {
                        props: propString,
                        tween: _this
                    }, _object._mathTweens.push(_this._tweenWrapper));
                    _ease || (_ease = "linear");
                    "string" == typeof _ease && (_ease = TweenManager.Interpolation.convertEase(_ease), _easeFunction = "function" == typeof _ease);
                    _startTime = _scaledTime ? Render.now() : performance.now(), _currentTime = _startTime, _startTime += _delay, _endValues = _props, _startValues = {}, _props.spring && (_spring = _props.spring);
                    _props.damping && (_damping = _props.damping);
                    for (var prop in _this.startValues = _startValues, _endValues) "number" == typeof _object[prop] && (_startValues[prop] = _object[prop])
                }()
            }
        })), this.update = function(dt) {
            if (_paused) return;
            if ((_currentTime += _scaledTime ? dt : Render.DT) < _startTime) return;
            _elapsed = (_elapsed = (_currentTime - _startTime) / _time) > 1 ? 1 : _elapsed;
            let delta = this.interpolate(_elapsed);
            _update && _update(delta), 1 == _elapsed && (_callback && _callback(), _this.completePromise && _this.completePromise.resolve(), clear())
        }, this.pause = function() {
            _paused = !0
        }, this.resume = function() {
            _paused = !1
        }, this.stop = function() {
            return _this.stopped = !0, clear(), null
        }, this.setEase = function(ease) {
            _newEase != ease && (_newEase = ease, _ease = TweenManager.Interpolation.convertEase(ease), _easeFunction = "function" == typeof _ease)
        }, this.getValues = function() {
            return {
                start: _startValues,
                end: _endValues
            }
        }, this.interpolate = function(elapsed) {
            var delta = _easeFunction ? _ease(elapsed, _spring, _damping) : TweenManager.Interpolation.solve(_ease, elapsed);
            for (var prop in _startValues)
                if ("number" == typeof _startValues[prop] && "number" == typeof _endValues[prop]) {
                    var start = _startValues[prop],
                        end = _endValues[prop];
                    _object[prop] = start + (end - start) * delta
                } return delta
        }, this.onUpdate = function(callback) {
            return _update = callback, this
        }, this.onComplete = function(callback) {
            return _callback = callback, this
        }, this.promise = function() {
            return _this.completePromise = Promise.create(), _this.completePromise
        }, this.setElapsed = function(elapsed) {
            _startTime = performance.now(), _currentTime = _startTime + _time * elapsed
        }
    })), Class((function TweenTimeline() {
        Inherit(this, Component);
        const _this = this;
        let _tween, _total = 0;
        const _tweens = [];

        function calculate() {
            _tweens.sort((function(a, b) {
                const ta = a.time + a.delay;
                return b.time + b.delay - ta
            }));
            const first = _tweens[0];
            _total = first.time + first.delay
        }

        function loop() {
            let time = _this.elapsed * _total;
            for (let i = _tweens.length - 1; i > -1; i--) {
                let t = _tweens[i],
                    relativeTime = time - t.delay,
                    elapsed = Math.clamp(relativeTime / t.time, 0, 1);
                t.interpolate(elapsed)
            }
            _this.events.fire(Events.UPDATE, _this, !0)
        }
        this.elapsed = 0, this.get("timeRemaining", () => _total - _this.elapsed * _total), this.add = function(object, props, time, ease, delay = 0) {
            let tween;
            return (object instanceof MathTween || object instanceof FrameTween) && (props = object.props, time = object.time, ease = object.ease, delay = object.delay, object = object.object), tween = object instanceof HydraObject ? new FrameTween(object, props, time, ease, delay, null, !0) : new MathTween(object, props, time, ease, delay, null, !0), _tweens.push(tween), defer(calculate), tween
        }, this.tween = function(to, time, ease, delay, callback) {
            return _this.clearTween(), _tween = tween(_this, {
                elapsed: to
            }, time, ease, delay).onUpdate(loop).onComplete(callback), _tween
        }, this.clearTween = function() {
            _tween && _tween.stop && _tween.stop()
        }, this.startRender = function() {
            Render.start(loop)
        }, this.stopRender = function() {
            Render.stop(loop)
        }, this.update = function() {
            loop()
        }, this.onDestroy = function() {
            _this.clearTween(), Render.stop(loop);
            for (var i = 0; i < _tweens.length; i++) _tweens[i].stop()
        }
    })), window.ASSETS = ["assets/data/uil.json", "assets/shaders/compiled.vs"], ASSETS.SW = ["assets/css/style.css", "assets/js/app.js"], Class((function Config() {
        const _this = this;
        this.STORAGE = "https://storage.googleapis.com/dreamwave-site.appspot.com/", this.CMS = Hydra.LOCAL || location.href.includes("dev-dot-") ? _this.STORAGE + "development/data/index.json" : _this.STORAGE + "data/index.json"
    }), "Static"), Class((function Content() {
        Inherit(this, Model);
        const _this = this;
        var _data;
        this.HOME = {
            perma: "",
            title: "WELCOME",
            headline: '<span style="font-weight: 700">Dreamwave</span> is a web-based platform that helps brands, businesses and artists host scalable<span style="font-weight: 700"> virtual events</span>',
            text: 'Dreamwave events are built with a suite of social, video and interactive features. By combining these with bespoke visuals and custom extensions, we ensure every event is unique and memorable for all attendees.<br/><br/>Developed by <a href="https://activetheory.net" target="_blank">Active Theory</a>, Dreamwave is available now for conferences, business events, musical festivals, entertainment and more.\n'
        }, this.EVENTS = [{
            perma: "redis-conf",
            title: "Redis Conference",
            bg: ["#ffffff", "#eeeeee", "#cccccc"],
            color: "#222",
            content: [{
                view: "ContentHero",
                title: "Redis Conference 2020",
                copy: "AWD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium erat tellus, a dignissim dolor efficitur eu. Vivamus tincidunt mattis molestie. Nunc pharetra ligula arcu, at consectetur mauris sagittis eu. Sed ut nunc at metus dapibus tincidunt sit amet et metus. Curabitur vel eleifend libero, eu porttitor sapien. ",
                video: "assets/videos/secretsky/highlights.mp4"
            }, {
                view: "ContentGallery",
                title: "12 artists over 14 hours",
                images: ["assets/images/secretsky/1.jpg", "assets/images/secretsky/2.jpg", "assets/images/secretsky/3.jpg", "assets/images/secretsky/4.jpg", "assets/images/secretsky/5.jpg", "assets/images/secretsky/6.jpg"]
            }, {
                view: "ContentDetail",
                title: "users could run around a digital festival ground with other attendees",
                video: "assets/videos/secretsky/around.mp4"
            }, {
                view: "ContentDetail",
                title: "Custom visuals from each artist powered the giant screen",
                video: "assets/videos/secretsky/flyover.mp4"
            }, {
                view: "ContentDetail",
                title: "Users could draw on a communal drawing board",
                video: "assets/videos/secretsky/draw.mp4"
            }, {
                view: "ContentBreak",
                title: "Over 650,000 attendees came through the digital event over the 14-hour period"
            }, {
                view: "ContentDetail",
                title: "Postmates had their own booth giving away free delivery",
                video: "assets/videos/booth"
            }, {
                view: "ContentReviews",
                title: "User Reactions",
                reviews: [{
                    user: "@WhiteMonster_DJ",
                    text: "it was a super cool experience, really nice work !"
                }, {
                    user: "@teddykerk",
                    text: "this was BRILLIANT! great work to all involved, excited to see what you come up with next :)"
                }, {
                    user: "@porterrobinszn",
                    text: "crying, this was all so beautiful"
                }, {
                    user: "@TarvThe",
                    text: "These visuals are so gorgeous"
                }, {
                    user: "@Justin_Jensen11",
                    text: "Thank you active theory!! The entire experience was truly incredible"
                }, {
                    user: "@Fouinar",
                    text: "Thanks guys for the amount of work you put into this, it was perfect from beginning to the end! So glad to have been part of the concert <3"
                }, {
                    user: "@someone",
                    text: "Best digital event Ive ever been to"
                }, {
                    user: "@someone",
                    text: "Best digital event Ive ever been to"
                }]
            }, {
                view: "ContentGrid",
                title: "Results",
                content: [{
                    title: "Number of users",
                    text: "650,000"
                }, {
                    title: "Time on site",
                    text: "4 mins"
                }, {
                    title: "Money Raised",
                    text: "100,000"
                }, {
                    title: "Number of users",
                    text: "650,000"
                }, {
                    title: "Time on site",
                    text: "4 mins"
                }, {
                    title: "Money Raised",
                    text: "100,000"
                }]
            }]
        }, {
            perma: "secret-sky",
            title: "Secret Sky",
            bg: ["#01040b", "#130e30", "#032855"],
            color: "#fff",
            content: [{
                view: "ContentHero",
                title: "Secret Sky Music Festival",
                copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium erat tellus, a dignissim dolor efficitur eu. Vivamus tincidunt mattis molestie. Nunc pharetra ligula arcu, at consectetur mauris sagittis eu. Sed ut nunc at metus dapibus tincidunt sit amet et metus. Curabitur vel eleifend libero, eu porttitor sapien. ",
                video: "assets/videos/secretsky/highlights.mp4"
            }, {
                view: "ContentGallery",
                title: "12 artists over 14 hours",
                images: ["assets/images/secretsky/1.jpg", "assets/images/secretsky/2.jpg", "assets/images/secretsky/3.jpg", "assets/images/secretsky/4.jpg", "assets/images/secretsky/5.jpg", "assets/images/secretsky/6.jpg"]
            }, {
                view: "ContentDetail",
                title: "Users could run around a digital festival ground with other attendees",
                video: "assets/videos/secretsky/around.mp4"
            }, {
                view: "ContentDetail",
                title: "Custom visuals from each artist powered the giant screen",
                video: "assets/videos/secretsky/flyover.mp4"
            }, {
                view: "ContentDetail",
                title: "Users could draw on a communal drawing board",
                video: "assets/videos/secretsky/draw.mp4"
            }, {
                view: "ContentBreak",
                title: "Over 650,000 attendees came through the digital event over the 14-hour period"
            }, {
                view: "ContentDetail",
                title: "Postmates had their own booth giving away free delivery",
                video: "assets/videos/booth"
            }, {
                view: "ContentReviews",
                title: "User Reactions",
                reviews: [{
                    user: "@WhiteMonster_DJ",
                    text: "it was a super cool experience, really nice work !"
                }, {
                    user: "@teddykerk",
                    text: "this was BRILLIANT! great work to all involved, excited to see what you come up with next :)"
                }, {
                    user: "@porterrobinszn",
                    text: "crying, this was all so beautiful"
                }, {
                    user: "@TarvThe",
                    text: "These visuals are so gorgeous"
                }, {
                    user: "@Justin_Jensen11",
                    text: "Thank you active theory!! The entire experience was truly incredible"
                }, {
                    user: "@Fouinar",
                    text: "Thanks guys for the amount of work you put into this, it was perfect from beginning to the end! So glad to have been part of the concert <3"
                }, {
                    user: "@someone",
                    text: "Best digital event Ive ever been to"
                }, {
                    user: "@someone",
                    text: "Best digital event Ive ever been to"
                }]
            }, {
                view: "ContentGrid",
                title: "Results",
                content: [{
                    title: "Number of users",
                    text: "650,000"
                }, {
                    title: "Time on site",
                    text: "4 mins"
                }, {
                    title: "Money Raised",
                    text: "100,000"
                }, {
                    title: "Number of users",
                    text: "650,000"
                }, {
                    title: "Time on site",
                    text: "4 mins"
                }, {
                    title: "Money Raised",
                    text: "100,000"
                }]
            }]
        }], async function() {
            await Hydra.ready(), _data = await get(`${Config.CMS}?${Date.now()}`),
                function parse() {
                    _this.HOME = {
                        perma: "",
                        title: _data.home.title,
                        headline: _data.home.headline,
                        text: _data.home.text
                    }, _this.EVENTS = Object.keys(_data.events).map(key => {
                        let gallery, event = _data.events[key],
                            data = {
                                content: []
                            };
                        return event.forEach(item => {
                            if ("contentmeta" === item._type) data.perma = key, data.title = item.title, data.bg = item.bg.split(","), data.color = item.color, item.active = data.active = item.active, data.image = item["home-image"], data.embed_id = item.embed_id, data.experience_url = item.experience_url, data.embed_ratio = item.embed_ratio, data.invert_ui = item.invert_ui;
                            else {
                                let exclude = !1;
                                switch (item._type) {
                                    case "contenthero":
                                        item.view = "ContentHero";
                                        break;
                                    case "contentreviews":
                                        item.view = "ContentReviews";
                                        break;
                                    case "contentgrid":
                                        item.view = "ContentGrid";
                                        break;
                                    case "contentdetail":
                                        item.view = "ContentDetail";
                                        break;
                                    case "contentbreak":
                                        item.view = "ContentBreak";
                                        break;
                                    case "contentgallerytitle":
                                        item.view = "ContentGallery", item.images = [], gallery = item;
                                        break;
                                    case "contentgalleryimage":
                                        gallery && gallery.images.push(item.image), exclude = !0
                                }
                                exclude || data.content.push(item)
                            }
                        }), data
                    })
                }(), await defer(), _this.dataReady = !0
        }(), _this.ready = async function() {
            await _this.wait("dataReady")
        }
    }), "Static"), Mobile.Class((function Accelerometer() {
        var _this = this;

        function updateAccel(e) {
            switch (window.orientation) {
                case 0:
                    _this.x = -e.accelerationIncludingGravity.x, _this.y = e.accelerationIncludingGravity.y, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = e.rotationRate.beta * _this.toRadians, _this.rotationRate.beta = -e.rotationRate.alpha * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case 180:
                    _this.x = e.accelerationIncludingGravity.x, _this.y = -e.accelerationIncludingGravity.y, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = -e.rotationRate.beta * _this.toRadians, _this.rotationRate.beta = e.rotationRate.alpha * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case 90:
                    _this.x = e.accelerationIncludingGravity.y, _this.y = e.accelerationIncludingGravity.x, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = e.rotationRate.alpha * _this.toRadians, _this.rotationRate.beta = e.rotationRate.beta * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case -90:
                    _this.x = -e.accelerationIncludingGravity.y, _this.y = -e.accelerationIncludingGravity.x, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = -e.rotationRate.alpha * _this.toRadians, _this.rotationRate.beta = -e.rotationRate.beta * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians)
            }
            "android" == Device.system.os && (_this.x *= -1, _this.y *= -1, _this.z *= -1)
        }

        function updateOrientation(e) {
            for (var key in e) key.toLowerCase().includes("heading") && (_this.heading = e[key]);
            switch (window.orientation) {
                case 0:
                    _this.alpha = e.beta * _this.toRadians, _this.beta = -e.alpha * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case 180:
                    _this.alpha = -e.beta * _this.toRadians, _this.beta = e.alpha * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case 90:
                    _this.alpha = e.alpha * _this.toRadians, _this.beta = e.beta * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case -90:
                    _this.alpha = -e.alpha * _this.toRadians, _this.beta = -e.beta * _this.toRadians, _this.gamma = e.gamma * _this.toRadians
            }
            _this.tilt = e.beta * _this.toRadians, _this.yaw = e.alpha * _this.toRadians, _this.roll = -e.gamma * _this.toRadians, "android" == Device.system.os && (_this.heading = function compassHeading(alpha, beta, gamma) {
                var degtorad = Math.PI / 180,
                    _x = beta ? beta * degtorad : 0,
                    _y = gamma ? gamma * degtorad : 0,
                    _z = alpha ? alpha * degtorad : 0,
                    cY = (Math.cos(_x), Math.cos(_y)),
                    cZ = Math.cos(_z),
                    sX = Math.sin(_x),
                    sY = Math.sin(_y),
                    sZ = Math.sin(_z),
                    Vx = -cZ * sY - sZ * sX * cY,
                    Vy = -sZ * sY + cZ * sX * cY,
                    compassHeading = Math.atan(Vx / Vy);
                Vy < 0 ? compassHeading += Math.PI : Vx < 0 && (compassHeading += 2 * Math.PI);
                return compassHeading * (180 / Math.PI)
            }(e.alpha, e.beta, e.gamma))
        }
        this.x = 0, this.y = 0, this.z = 0, this.alpha = 0, this.beta = 0, this.gamma = 0, this.heading = 0, this.rotationRate = {}, this.rotationRate.alpha = 0, this.rotationRate.beta = 0, this.rotationRate.gamma = 0, this.toRadians = "ios" == Device.system.os ? Math.PI / 180 : 1, this.capture = function() {
            this.active || (this.active = !0, window.ondevicemotion = updateAccel, window.addEventListener("deviceorientation", updateOrientation))
        }, this.stop = function() {
            this.active = !1, window.ondevicemotion = null, _this.x = _this.y = _this.z = 0, window.removeEventListener("deviceorientation", updateOrientation)
        }
    }), "Static"), Class((function ImageDecoder() {
        Inherit(this, Component);
        var _compressed, _this = this;
        const ACTIVE = !(!(window.fetch && window.createImageBitmap && Device.system.browser.includes("chrome")) || window.AURA);

        function decodeImage(data, id) {
            (async _ => {
                try {
                    let e = await fetch(data.path, {
                        mode: "cors"
                    });
                    if (200 != e.status) throw resolve({
                        fail: !0
                    }, id), "Image not found :: " + data.path;
                    let blob = await e.blob(),
                        obj = {
                            imageOrientation: "flipY",
                            crossOrigin: "anonymous"
                        };
                    data.params && !1 === data.params.premultiplyAlpha && (obj.premultiplyAlpha = "none"), obj.imageOrientation = data.params && !1 === data.params.flipY ? void 0 : "flipY";
                    let bitmap = await createImageBitmap(blob, obj),
                        message = {
                            post: !0,
                            id: id,
                            message: bitmap
                        };
                    self.postMessage(message, [bitmap])
                } catch (e) {
                    throw resolve({
                        fail: !0
                    }, id), e
                }
            })()
        }

        function decodeCompressedImage(data, id) {
            (async _ => {
                let ext;
                data.settings.dxt ? ext = "dxt" : data.settings.etc ? ext = "astc" : data.settings.pvrtc ? ext = "pvrtc" : data.settings.astc && (ext = "astc");
                let fileName = data.path.split("/");
                fileName = fileName[fileName.length - 1];
                let e = await fetch(`${data.path}/${fileName}-${ext}.ktx`);
                if (200 != e.status) throw "Image not found :: " + data.path;
                try {
                    let arrayBuffer = await e.arrayBuffer(),
                        header = new Int32Array(arrayBuffer, 12, 13),
                        gliFormat = (header[1], header[2], header[3], header[4]),
                        width = (header[5], header[6]),
                        height = header[7],
                        miplevels = header[11],
                        bytesOfKeyValueData = header[12],
                        buffers = [],
                        compressedData = [],
                        sizes = [],
                        dataOffset = 64 + bytesOfKeyValueData;
                    for (let level = 0; level < miplevels; level++) {
                        let imageSize = new Int32Array(arrayBuffer, dataOffset, 1)[0];
                        dataOffset += 4;
                        let byteArray = new Uint8Array(arrayBuffer, dataOffset, imageSize);
                        dataOffset += imageSize, dataOffset += 3 - (imageSize + 3) % 4, sizes.push(width), width = Math.max(1, .5 * width), height = Math.max(1, .5 * height);
                        let clone = new Uint8Array(byteArray);
                        compressedData.push(clone), buffers.push(clone.buffer)
                    }
                    resolve({
                        gliFormat: gliFormat,
                        compressedData: compressedData,
                        sizes: sizes,
                        width: width,
                        height: height
                    }, id, buffers)
                } catch (e) {
                    throw data.path + " could not be decoded"
                }
            })()
        }
        this.scale = 1, async function() {
            await Hydra.ready(), Thread.upload(decodeImage), Thread.upload(decodeCompressedImage)
        }(), this.decode = async function(path, params = {}) {
            if (path = Thread.absolutePath(Assets.getPath(path)), !_compressed) {
                _compressed = {
                    dxt: !!Renderer.extensions.s3tc,
                    etc: !!Renderer.extensions.etc1,
                    pvrtc: !!Renderer.extensions.pvrtc,
                    astc: !!Renderer.extensions.astc
                };
                let found = !1;
                for (let key in _compressed) 1 == _compressed[key] && (found = !0);
                found || (_compressed = null)
            }
            if (!_compressed && path.includes("-compressedKtx") && (path = path.replace("-compressedKtx", "")), path.includes("-compressedKtx")) {
                return path = path.substring(0, path.lastIndexOf(".")), await Thread.shared().decodeCompressedImage({
                    path: path,
                    params: params,
                    settings: _compressed
                })
            }
            try {
                let bitmap = await (ACTIVE ? Thread.shared().decodeImage({
                    path: path,
                    params: params
                }) : Assets.decodeImage(path, params));
                if (bitmap.fail) throw "could not decode " + path;
                return function process(bitmap, scale) {
                    if (1 == scale * _this.scale) return bitmap;
                    let pow2 = Math.isPowerOf2(bitmap.width, bitmap.height),
                        canvas = document.createElement("canvas");
                    return canvas.context = canvas.getContext("2d"), canvas.width = Math.round(bitmap.width * _this.scale * scale), canvas.height = Math.round(bitmap.height * _this.scale * scale), pow2 && scale * _this.scale < 1 && (canvas.width = canvas.height = Math.floorPowerOf2(Math.max(canvas.width, canvas.height))), canvas.context.drawImage(bitmap, 0, 0, canvas.width, canvas.height), canvas
                }(bitmap, params.scale || 1)
            } catch (e) {
                throw "could not decode " + path
            }
        }
    }), "static"), Class((function BaseCamera(_input, _group) {
        Inherit(this, Object3D);
        const _this = this;
        var _type = "perspective";

        function resize() {
            switch (_type) {
                case "perspective":
                    _this.camera.aspect = Stage.width / Stage.height, _this.camera.updateProjectionMatrix();
                    break;
                case "orthographic":
                    if (_this.width || _this.height) _this.camera.setViewport(_this.width, _this.height);
                    else {
                        let m = 900 / Stage.height / 100;
                        _this.camera.setViewport(Stage.width * m, Stage.height * m)
                    }
            }
        }
        this.camera = new PerspectiveCamera(30, Stage.width / Stage.height, .1, 1e3), this.group.add(this.camera), this.startRender(_ => {
            _this.group.updateMatrixWorld(!0)
        }), this.onResize(_ => {
            resize()
        }), _group && (_this.prefix = _input.prefix, CameraUIL.add(_this, _group).setLabel("Camera")), this.playgroundLock = function(camera = Camera.instance()) {
            if (!Global.PLAYGROUND) return;
            Utils.getConstructorName(_this.parent).includes(Global.PLAYGROUND.split("/")[0]) && RenderManager.type == RenderManager.NORMAL && camera.lock(_this.camera)
        }, this.lock = function(camera = Camera.instance()) {
            if ("orthographic" == _type) return console.error("You can't lock an orthographic camera to the main camera. Use an FXScene .setCamera");
            RenderManager.type == RenderManager.NORMAL && camera.lock(_this.camera)
        }, this.transition = function(time, ease, delay, camera = Camera.instance()) {
            "object" == typeof delay && (camera = delay, delay = 0);
            let p = Promise.create();
            return camera.transition(_this.camera, time, ease, delay || 0), delay > 0 ? _this.delayedCall(_ => p.resolve(), delay) : p.resolve(), p
        }, this.setFOV = function(fov) {
            fov != this.camera.fov && (this.camera.fov = fov, this.camera.updateProjectionMatrix())
        }, this.getFOV = function() {
            return this.camera.fov
        }, this.useOrthographic = function(w, h) {
            "orthographic" !== _type && "orthographic" !== _type && (isNaN(w) || (this.width = w), isNaN(h) || (this.height = h), this.camera && this.group.remove(this.camera), this.camera = new OrthographicCamera, this.group.add(this.camera), _type = "orthographic", resize())
        }, this.usePerspective = function() {
            "perspective" !== _type && (this.camera && this.group.remove(this.camera), this.camera = new PerspectiveCamera, this.group.add(this.camera), _type = "perspective", resize())
        }
    })), Class((function Camera(_worldCamera) {
        Inherit(this, Component);
        const _this = this;
        var _debug, _prevCamera, _lockCamera, _curve, _calc = new Vector3,
            _target = new Group,
            _anim = {
                weight: 0,
                weight2: 0
            },
            _center = new Vector3;

        function loop() {
            if (_debug && (_debug.visible = !_debug.position.equals(_center)), _anim.weight += (_anim.weight2 - _anim.weight) * _this.lerp, _prevCamera) {
                if (_prevCamera.updateMatrixWorld(), _lockCamera.updateMatrixWorld(), _curve) {
                    let pos = _curve.getPoint(_anim.weight);
                    pos.lerp(_prevCamera.getWorldPosition(), Math.range(_anim.weight, 0, .1, 1, 0, !0)), pos.lerp(_lockCamera.getWorldPosition(), Math.range(_anim.weight, .6, 1, 0, 1, !0)), _curve.lerpPos || (_curve.lerpPos = (new Vector3).copy(_prevCamera.getWorldPosition()), _curve.lerpBlend = {
                        value: 0
                    });
                    let lerp = Math.mix(_curveLerp || 1, 1, _curve.lerpBlend.value);
                    _curve.lerpPos.lerp(pos, lerp), 0 == _curve.lerpBlend.value && _calc.subVectors(_worldCamera.position, _lockCamera.getWorldPosition()).length() < .01 && (_curve.lerpBlend.value = .001, tween(_curve.lerpBlend, {
                        value: 1
                    }, 1e3, "linear"), _this.onCurveComplete && _this.onCurveComplete()), _target.position.copy(_curve.lerpPos)
                } else _target.position.copy(_prevCamera.getWorldPosition()).lerp(_lockCamera.getWorldPosition(), _anim.weight);
                _target.quaternion.copy(_prevCamera.getWorldQuaternion()).slerp(_lockCamera.getWorldQuaternion(), _anim.weight), _worldCamera.fov != _lockCamera.fov && (_worldCamera.fov += (_lockCamera.fov - _worldCamera.fov) * _anim.weight, _worldCamera.updateProjectionMatrix()), _worldCamera.position.lerp(_target.position, _this.lerp2), _worldCamera.quaternion.slerp(_target.quaternion, _this.lerp2)
            } else _lockCamera && (_lockCamera.updateMatrixWorld(), Utils3D.decompose(_lockCamera, _worldCamera), _worldCamera.fov != _lockCamera.fov && (_worldCamera.fov = _lockCamera.fov, _worldCamera.updateProjectionMatrix()));
            _worldCamera.updateMatrixWorld(), _debug && (_debug.position.copy(_worldCamera.position), _debug.quaternion.copy(_worldCamera.quaternion)), _this.postLoop()
        }
        this.lerp = 1, this.lerp2 = 1, this.worldCamera = _worldCamera, RenderManager.type == RenderManager.NORMAL && (Utils.query("orbit") || Utils.query("wasd") ? function initDebug() {
            (_debug = new Mesh(new BoxGeometry(.25, .25, .5, 1, 1, 5), new Shader("DebugCamera", {
                uColor: {
                    value: new Color,
                    transparent: !0,
                    depthTest: !1
                }
            }))).renderOrder = 9999, World.SCENE.add(_debug), _worldCamera = new PerspectiveCamera;
            let p = Global.PLAYGROUND || "m";
            p += Utils.query("wasd") ? "wasd" : "orbit";
            let pos = Storage.get("debugCameraPos_" + p) || World.CAMERA.position.toArray();
            World.CAMERA.position.fromArray(pos), World.CAMERA.position.debug = !0, Global.DEBUG_CAMERA_POS = pos, World.CONTROLS.onChange = _ => Storage.set("debugCameraPos_" + p, World.CAMERA.position.toArray())
        }() : World.CONTROLS && (World.CONTROLS.enabled = !1), _this.startRender(loop)), this.lock = function(camera) {
            _lockCamera = camera, _worldCamera.fov = _lockCamera.fov, _worldCamera.updateProjectionMatrix(), _prevCamera = null, loop()
        }, this.transition = function(camera, duration = 1e3, ease = "easeInOutCubic") {
            return _curve && (_curve.lerpPos = _curve.lerpBlend = null), camera.curve && ((_curve = camera.curve).lerpPos = camera.lerpPos), _prevCamera === camera ? (duration *= .5 * Math.smoothStep(.5, 1, _anim.weight) + .5, _anim.weight = 1 - _anim.weight) : _anim.weight = 0, _anim.weight2 = _anim.weight, _prevCamera = _lockCamera, _lockCamera = camera, tween(_anim, {
                weight2: 1
            }, duration, ease)
        }, this.get("worldCamera", _ => _worldCamera), this.get("lockCamera", _ => _lockCamera), this.set("debugScale", s => {
            _debug && _debug.scale.setScalar(s)
        }), this.createLocal = function(camera) {
            return camera || (camera = World.CAMERA.clone(), _this.onResize(_ => {
                camera.aspect = Stage.width / Stage.height, camera.updateProjectionMatrix()
            })), new Camera(camera.camera || camera)
        }
    }), "singleton"), Class((function GazeCamera(_input, _group) {
        Inherit(this, BaseCamera);
        const _this = this;
        var _strength = {
                v: 1
            },
            _move = new Vector3,
            _position = new Vector3,
            _wobble = new Vector3,
            _rotation = 0,
            _wobbleAngle = Math.radians(Math.rand(0, 360)),
            _innerGroup = new Group;

        function loop() {
            if (_this.useAccelerometer && Device.mobile) _move.x = _this.position.x + Math.range(Mobile.Accelerometer.x, -2, 2, -1, 1, !0) * _strength.v * _this.moveXY.x * _this.strength, _move.y = 0;
            else {
                _move.x = _this.position.x + Math.range(Mouse.x, 0, Stage.width, -1, 1, !0) * _strength.v * _this.moveXY.x * _this.strength, _move.y = _this.position.y + Math.range(Mouse.y, 0, Stage.height, -1, 1, !0) * _strength.v * _this.moveXY.y * _this.strength;
                let rotateStrength = Math.range(Math.abs(Mouse.delta.x) / Stage.width, 0, .02, 0, 1, !0);
                _rotation = Math.lerp(Math.radians(_this.deltaRotate) * rotateStrength * Math.sign(Mouse.delta.x), _rotation, .02 * _this.deltaLerp * _strength.v), _this.group.rotation.z = Math.lerp(_rotation, _this.group.rotation.z, .07 * _this.deltaLerp)
            }
            if (_move.z = _this.position.z, _position.lerp(_move, _this.lerpSpeed2), _this.camera.position.lerp(_position, _this.lerpSpeed), _this.camera.lookAt(_this.lookAt), _this.wobbleStrength > 0) {
                let t = Render.TIME;
                _wobble.x = Math.cos(_wobbleAngle + t * (75e-5 * _this.wobbleSpeed)) * (_wobbleAngle + 200 * Math.sin(t * (95e-5 * _this.wobbleSpeed))), _wobble.y = Math.sin(Math.asin(Math.cos(_wobbleAngle + t * (85e-5 * _this.wobbleSpeed)))) * (150 * Math.sin(_wobbleAngle + t * (75e-5 * _this.wobbleSpeed))), _wobble.x *= 2 * Math.sin(_wobbleAngle + t * (75e-5 * _this.wobbleSpeed)), _wobble.y *= 1.75 * Math.cos(_wobbleAngle + t * (65e-5 * _this.wobbleSpeed)), _wobble.x *= 1.1 * Math.cos(_wobbleAngle + t * (75e-5 * _this.wobbleSpeed)), _wobble.y *= 1.15 * Math.sin(_wobbleAngle + t * (25e-5 * _this.wobbleSpeed)), _wobble.z = Math.sin(_wobbleAngle + .0025 * _wobble.x) * (100 * _this.wobbleZ), _wobble.multiplyScalar(.001 * _this.wobbleStrength * _strength.v), _innerGroup.position.lerp(_wobble, .07)
            }
        }
        this.strength = 1, this.moveXY = new Vector2(4, 4), this.position = new function Position() {
            Inherit(this, Component);
            var _x = 0,
                _y = 0,
                _z = 0;
            this.get("x", _ => _x), this.get("y", _ => _y), this.get("z", _ => _z), this.set("x", x => {
                _x = x
            }), this.set("y", y => {
                _y = y
            }), this.set("z", z => {
                _z = z, _move.z = _z, _this.camera.position.copy(_move), _position.copy(_move)
            }), this.set = function(x, y, z, noCopy) {
                _x = x, _y = y, _z = z, _move.z = z, noCopy || _this.camera.position.copy(_move), _position.copy(_move)
            }, this.toArray = function() {
                return [_x, _y, _z]
            }, this.fromArray = function(array) {
                _x = array[0], _y = array[1], _z = array[2], _move.set(_x, _y, _z), _this.camera.position.copy(_move), _position.copy(_move)
            }
        }, this.lerpSpeed = .04, this.lerpSpeed2 = 1, this.lookAt = new Vector3(0, 0, 0), this.deltaRotate = 10, this.deltaLerp = 1, this.wobbleSpeed = 1, this.wobbleStrength = 0, this.wobbleZ = 1, _input && (_this.prefix = _input.prefix, CameraUIL.add(_this, _group).setLabel("Camera")), Mobile.Accelerometer.capture(), _this.startRender(loop), _innerGroup.add(_this.camera), _this.group.add(_innerGroup), this.orbit = function(time = 1e3, ease = "easeInOutSine") {
            return tween(_strength, {
                v: 1
            }, time, ease)
        }, this.still = function(time = 300, ease = "easeInOutSine") {
            return tween(_strength, {
                v: 0
            }, time, ease)
        }
    }));
class Base3D {
    constructor() {
        this.position = new Vector3D, this.rotation = new Euler, this.quaternion = new Quaternion, this.scale = new Vector3D(1, 1, 1), this._parent = null, this.up = new Vector3(0, 1, 0), this.isObject3D = !0, this.children = [], this.childrenLength = 0, this.modelViewMatrix = new Matrix4, this.normalMatrix = new Matrix3, this.matrix = new Matrix4, this.matrixWorld = new Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.matrixDirty = !0, this.visible = !0, this.castShadow = !1, this.frustumCulled = !0, this._renderOrder = 0, this.worldPos = new Vector3;
        const _this = this;
        this.quaternion.onChange(_ => {
            _this.matrixDirty = !0, _this.rotation.setFromQuaternion(_this.quaternion, void 0, !1)
        }), this.rotation.onChange(_ => {
            _this.matrixDirty = !0, _this.quaternion.setFromEuler(_this.rotation, !1)
        }), this.scale.onChange(_ => {
            _this.matrixDirty = !0
        }), this.position.onChange(_ => {
            _this.matrixDirty = !0
        })
    }
    get renderOrder() {
        return this._renderOrder
    }
    set renderOrder(value) {
        this._renderOrder = value;
        let p = this._parent;
        for (; p;) p instanceof Scene && (p.displayNeedsUpdate = !0), p = p._parent;
        for (let i = 0; i < this.children.length; i++) this.children[i].renderOrder += value
    }
    applyMatrix(matrix) {
        return this.matrix.multiplyMatrices(matrix, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale), this
    }
    applyQuaternion(q) {
        return this.quaternion.premultiply(q), this
    }
    setRotationFromAxisAngle(axis, angle) {
        this.quaternion.setFromAxisAngle(axis, angle)
    }
    setRotationFromMatrix(m) {
        this.quaternion.setFromRotationMatrix(m)
    }
    setRotationFromQuaternion(q) {
        this.quaternion.copy(q)
    }
    localToWorld(v) {
        return v.applyMatrix4(this.matrixWorld)
    }
    worldToLocal(v) {
        let m1 = this.M1 || new Matrix4;
        this.M1 = m1, v.applyMatrix4(m1.getInverse(this.matrixWorld))
    }
    lookAt(x, y, z) {
        let m1 = this.M1 || new Matrix4;
        this.M1 = m1;
        let v = this.V1 || new Vector3;
        this.V1 = v, x.isVector3 ? v.copy(x) : v.set(x, y, z), this.isCamera ? m1.lookAt(this.position, v, this.up) : m1.lookAt(v, this.position, this.up), this.quaternion.setFromRotationMatrix(m1)
    }
    add(object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
            return this
        }
        if (object === this) return this;
        if (object && object.isObject3D ? (null !== object._parent && object._parent.remove(object), object._parent = this, this.children.push(object), this.childrenLength = this.children.length) : console.error("Object is not instance of Object3D", object), this.isScene) this.displayNeedsUpdate = !0;
        else {
            let p = this._parent;
            for (; p;) p instanceof Scene && (p.displayNeedsUpdate = !0), p = p._parent
        }
        return this
    }
    remove(object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
            return this
        }
        if (this.isScene) this.displayNeedsUpdate = !0;
        else {
            let p = this._parent;
            for (; p;) p instanceof Scene && (p.displayNeedsUpdate = !0), p = p._parent
        }
        this.children.remove(object), this.childrenLength = this.children.length
    }
    getWorldPosition(target) {
        let v = this.V1 || new Vector3;
        return this.V1 = v, target || (target = v), this.updateMatrixWorld(), target.setFromMatrixPosition(this.matrixWorld)
    }
    getWorldScale(target) {
        let v = this.V1S || new Vector3;
        this.V1S = v;
        let v2 = this.V12 || new Vector3;
        this.V2 = v2;
        let q = this.Q1 || new Quaternion;
        return this.Q1 = q, target || (target = v2), this.updateMatrixWorld(), this.matrixWorld.decompose(v, q, target), target
    }
    getWorldQuaternion(target) {
        let v = this.V1Q || new Vector3;
        this.V1Q = v;
        let q = this.Q1 || new Quaternion;
        return this.Q1 = q, target || (target = q), this.updateMatrixWorld(), this.matrixWorld.decompose(v, target, v), target
    }
    traverse(callback) {
        callback(this);
        let children = this.children;
        for (let i = 0; i < children.length; i++) children[i].traverse(callback)
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
    }
    updateMatrixWorld(force) {
        if (!force && !this.determineVisible()) return;
        (this.determineDirty() || force) && !0 === this.matrixAutoUpdate && this.updateMatrix(), !0 !== this.matrixWorldNeedsUpdate && !0 !== force || (null === this._parent || this.determineNoTransform() ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this._parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1), this.children.forEach(c => c.updateMatrixWorld(force)), this.matrixDirty = !1
    }
    clone(recursive) {
        (new this.constructor).copy(this, recursive)
    }
    copy(source, recursive) {
        if (this.name = source.name, this.up.copy(source.up), this.position.copy(source.position), this.quaternion.copy(source.quaternion), this.scale.copy(source.scale), this.matrix.copy(source.matrix), this.matrixWorld.copy(source.matrixWorld), this.matrixAutoUpdate = source.matrixAutoUpdate, this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate, this.visible = source.visible, this.castShadow = source.castShadow, this.receiveShadow = source.receiveShadow, this.frustumCulled = source.frustumCulled, this.renderOrder = source.renderOrder, !0 === recursive)
            for (let i = 0; i < source.children.length; i++) {
                let child = source.children[i];
                this.add(child.clone())
            }
        return this
    }
    render() {}
    determineVisible() {
        if (this.determineVisibleCacheTime > 0 && Render.TIME - this.determineVisibleCacheTime < 8) return this.determineVisibleCache;
        if (this.determineVisibleCacheTime = Render.TIME, !this.visible) return this.determineVisibleCache = !1, !1;
        let p = this._parent;
        for (; p;) {
            if (!p.visible) return this.determineVisibleCache = !1, !1;
            p = p._parent
        }
        return this.determineVisibleCache = !0, !0
    }
    determineDirty() {
        let p = this._parent;
        for (; p;) {
            if (p.matrixDirty) return !0;
            p = p._parent
        }
        return this.matrixDirty
    }
    determineNoTransform() {
        return this._parent ? this._parent.determineNoTransform() && this.matrix.isIdentity() : this.matrix.isIdentity()
    }
    translateX(distance) {
        this.xAxis || (this.xAxis = new Vector3(1, 0, 0)), this.translateOnAxis(this.xAxis, distance)
    }
    translateY(distance) {
        this.yAxis || (this.yAxis = new Vector3(0, 1, 0)), this.translateOnAxis(this.yAxis, distance)
    }
    translateZ(distance) {
        this.zAxis || (this.zAxis = new Vector3(0, 0, 1)), this.translateOnAxis(this.zAxis, distance)
    }
    translateOnAxis(axis, distance) {
        let v = this.V1 || new Vector3;
        return this.V1 = v, v.copy(axis).applyQuaternion(this.quaternion), this.position.add(v.multiplyScalar(distance)), this
    }
    upload() {
        this.shader && (this.shader.upload(this, this.geometry), this.shader.shadow && this.shader.shadow.upload(this, this.geometry)), this.geometry && this.geometry.upload(this, this.shader)
    }
    destroy() {
        this.geometry && this.geometry.destroy && this.geometry.destroy(this), this.shader && this.shader.destroy && this.shader.destroy(this), this.hitDestroy && this.hitDestroy(), this._gl && this._gl.ubo && this._gl.ubo.destroy(), this._gl && this._gl.vao && this._gl.vao.destroy(), this._gl && (this._gl = null), this._parent && this._parent.remove(this), this.parent && this.parent.__destroyChild && this.parent.__destroyChild(this.__id)
    }
}
Class((function Renderer(_params = {}) {
    Inherit(this, Component);
    const _this = this;
    var _canvas, _gl, _width, _height, _anisotropy, _projScreenMatrix, _frustum, _ubo, _dpr = 1,
        _resolution = new Vector2,
        _m0 = new Matrix4,
        _m1 = new Matrix4,
        _time = {
            value: 0
        },
        _stencilActive = !1;

    function initCameraUBO(camera) {
        camera._ubo = new UBO(0, _gl), camera._ubo.push({
            value: camera.projectionMatrix
        }), camera._ubo.push({
            value: camera.matrixWorldInverse
        }), camera._ubo.push({
            value: camera.worldPos
        }), camera._ubo.push({
            value: _resolution
        }), camera._ubo.push(_time), camera._ubo.push(Render.timeScaleUniform), camera._ubo.upload()
    }

    function attachSceneUniforms(object, scene, camera) {
        if (Shader.renderer.appendUniform(object.shader, "normalMatrix", object.normalMatrix), Shader.renderer.appendUniform(object.shader, "modelMatrix", object.matrixWorld), Shader.renderer.appendUniform(object.shader, "modelViewMatrix", object.modelViewMatrix), _ubo ? camera._ubo.bind(object.shader._gl.program, "global") : (Shader.renderer.appendUniform(object.shader, "projectionMatrix", camera.projectionMatrix), Shader.renderer.appendUniform(object.shader, "viewMatrix", camera.matrixWorldInverse), Shader.renderer.appendUniform(object.shader, "cameraPosition", camera.worldPos), Shader.renderer.appendUniform(object.shader, "resolution", _resolution), Shader.renderer.appendUniform(object.shader, "time", _time.value), Shader.renderer.appendUniform(object.shader, "timeScale", Render.timeScaleUniform.value)), _this.shadows && object.shader.receiveShadow && !_this.overridePreventShadows) {
            let lights = Lighting.getShadowLights();
            object._gl || (object._gl = {}), object._gl.shadowData || (object._gl.shadowData = {
                combined: new Float32Array(16 * lights.length)
            });
            for (let i = 0; i < lights.length; i++) {
                let light = lights[i];
                _m1.multiplyMatrices(light.shadow.camera.matrixWorldInverse, object.matrixWorld), _m0.multiplyMatrices(light.shadow.camera.projectionMatrix, _m1), _m0.toArray(object._gl.shadowData.combined, 16 * i)
            }
            scene._shadowData && scene._shadowData.count && (object.shader.uniforms.shadowMap.value = scene._shadowData[_this.overridePreventShadows ? "emptyMaps" : "maps"], Shader.renderer.appendUniform(object.shader, "shadowMatrix", object._gl.shadowData.combined, "matrix"), Shader.renderer.appendUniform(object.shader, "shadowLightPos", scene._shadowData.pos, "vec3"), Shader.renderer.appendUniform(object.shader, "shadowSize", scene._shadowData.size, "float"))
        }
    }

    function attachShadowUniforms(object, scene, light) {
        light._mvm || (light._mvm = new Matrix4), light._nm || (light._nm = new Matrix3), light._mvm.multiplyMatrices(light.shadow.camera.matrixWorldInverse, object.matrixWorld), light._nm.getNormalMatrix(object.modelViewMatrix), Shader.renderer.appendUniform(object.shader.shadow, "normalMatrix", light._nm), Shader.renderer.appendUniform(object.shader.shadow, "modelMatrix", object.matrixWorld), Shader.renderer.appendUniform(object.shader.shadow, "modelViewMatrix", light._mvm), _ubo ? light.shadow.camera._ubo.bind(object.shader._gl.program, "global") : (Shader.renderer.appendUniform(object.shader.shadow, "projectionMatrix", light.shadow.camera.projectionMatrix), Shader.renderer.appendUniform(object.shader.shadow, "viewMatrix", light.shadow.camera.matrixWorldInverse))
    }

    function loop(t, dt) {
        _time.value += .001 * dt
    }

    function render(scene, camera, rt) {
        rt && rt.width ? (_resolution.set(rt.width, rt.height), RenderTarget.renderer.bind(rt)) : (Renderer.overrideViewport || (_gl.viewport(0, 0, _width * _dpr, _height * _dpr), _resolution.set(_canvas.width, _canvas.height)), _this.autoClear && (_gl.clearColor(Renderer.CLEAR[0], Renderer.CLEAR[1], Renderer.CLEAR[2], Renderer.CLEAR[3]), _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT))), camera.parent || camera.updateMatrixWorld(), camera.getWorldPosition(camera.worldPos), _frustum.setFromCamera(camera), _ubo && (camera._ubo ? camera._ubo.update() : initCameraUBO(camera));
        for (let l = 0; l < 2; l++) {
            let len = scene.toRender[l].length;
            for (let i = 0; i < len; i++) {
                let object = scene.toRender[l][i];
                object.onBeforeRender && object.onBeforeRender(), object.determineVisible() && object.shader.visible && !object.shader.neverRender && (!1 !== object.frustumCulled && !0 !== _frustum.intersectsObject(object) || (object.shader.draw(object, object.geometry), attachSceneUniforms(object, scene, camera), object.geometry.draw(object, object.shader)))
            }
        }
        rt && rt.width && RenderTarget.renderer.unbind(rt)
    }
    this.autoClear = !0, this.shadows = Renderer.SHADOWS_MED, Renderer.instance = _this, Renderer.CLEAR = [0, 0, 0, 1],
        function initContext() {
            let contextAttributes = {
                antialias: void 0 !== _params.antialias && _params.antialias,
                powerPreference: _params.powerPreference,
                preserveDrawingBuffer: _params.preserveDrawingBuffer,
                xrCompatible: _params.xrCompatible,
                alpha: void 0 !== _params.alpha && _params.alpha,
                stencil: _params.stencil
            };
            if (_this.stencil = !!_params.stencil, _canvas = _params.canvas || document.createElement("canvas"), _params.gl ? (_gl = _params.gl, _this.type = Device.graphics.webgl.version.includes(["webgl 2", "webgl2"]) ? Renderer.WEBGL2 : Renderer.WEBGL1) : Device.graphics.webgl ? ["webgl2", "webgl", "experimental-webgl"].forEach(name => {
                    _gl || "webgl2" == name && _params.forceWebGL1 || (_gl = _canvas.getContext(name, contextAttributes), _this.type = _gl && "webgl2" == name ? Renderer.WEBGL2 : Renderer.WEBGL1)
                }) : (_gl = new NoGLPolyfill, _this.type = Renderer.WEBGL2), !_gl) throw "Error! Could not create WebGL context";
            _this.domElement = _canvas, _canvas.style.background = "black", Renderer.type = _this.type, Renderer.context = _this.context = _gl
        }(),
        function setExtensions() {
            _this.extensions = {}, _this.type != Renderer.WEBGL2 ? (_this.extensions.VAO = _gl.getExtension("OES_vertex_array_object"), _this.extensions.instancedArrays = _gl.getExtension("ANGLE_instanced_arrays"), _this.extensions.standardDerivatives = _gl.getExtension("OES_standard_derivatives"), _this.extensions.depthTextures = _gl.getExtension("WEBGL_depth_texture"), _this.extensions.drawBuffers = _gl.getExtension("WEBGL_draw_buffers"), _this.extensions.halfFloat = _gl.getExtension("OES_texture_half_float"), _this.extensions.float = _gl.getExtension("OES_texture_float"), _this.extensions.colorBufferFloat = _gl.getExtension("WEBGL_color_buffer_float")) : _this.extensions.colorBufferFloat = _gl.getExtension("EXT_color_buffer_float"), _this.extensions.filterFloat = _gl.getExtension("OES_texture_float_linear"), _this.extensions.anisotropy = _gl.getExtension("EXT_texture_filter_anisotropic") || _gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), _this.extensions.astc = _gl.getExtension("WEBGL_compressed_texture_astc"), _this.extensions.atc = _gl.getExtension("WEBGL_compressed_texture_atc"), _this.extensions.etc = _gl.getExtension("WEBGL_compressed_texture_etc"), _this.extensions.etc1 = _gl.getExtension("WEBGL_compressed_texture_etc1"), _this.extensions.pvrtc = _gl.getExtension("WEBGL_compressed_texture_pvrtc") || _gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"), _this.extensions.s3tc = _gl.getExtension("WEBGL_compressed_texture_s3tc") || _gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), _this.extensions.s3tc_srgb = _gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"), Renderer.extensions = _this.extensions
        }(),
        function initRenderers() {
            Geometry.renderer = new GeometryRendererWebGL(_gl), Texture.renderer = new TextureRendererWebGL(_gl), Shader.renderer = new ShaderRendererWebGL(_gl), RenderTarget.renderer = new FBORendererWebGL(_gl)
        }(),
        function initMath() {
            _projScreenMatrix = new Matrix4, new Vector3, _frustum = new Frustum
        }(),
        function initUBO() {
            _this.type == Renderer.WEBGL2 && (_ubo = !0), Renderer.UBO = _ubo
        }(), _this.startRender(loop), this.render = function(scene, camera, rt, forceToScreen) {
            scene.displayNeedsUpdate && (scene.toRender[0].length = 0, scene.toRender[1].length = 0), scene.updateMatrixWorld(),
                function projectObject(object, camera, scene) {
                    if (void 0 !== object.shader) {
                        let visible = object.determineVisible() && object.shader.visible && !object.shader.neverRender;
                        visible && (object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld), object.normalMatrix.getNormalMatrix(object.modelViewMatrix)), (scene.displayNeedsUpdate || object.shader.transparent && !scene.disableAutoSort && visible) && object.getWorldPosition(object.worldPos), scene.displayNeedsUpdate && scene.toRender[object.shader.transparent ? 1 : 0].push(object)
                    }
                    if (!0 === object.visible || scene.displayNeedsUpdate)
                        for (let i = object.childrenLength - 1; i > -1; i--) projectObject(object.children[i], camera, scene)
                }(scene, camera, scene), scene.displayNeedsUpdate && function sortOpaque(array) {
                    for (let i = array.length - 1; i > -1; i--) {
                        let obj = array[i];
                        obj.shader._gl || obj.shader.upload()
                    }
                    array.sort((a, b) => {
                        if (a.renderOrder !== b.renderOrder) return a.renderOrder - b.renderOrder;
                        let aid = a.shader._gl._id,
                            bid = b.shader._gl._id;
                        return aid !== bid ? aid - bid : a.id - b.id
                    })
                }(scene.toRender[0]), (scene.displayNeedsUpdate || scene.toRender[1].length && !scene.disableAutoSort) && function sortTransparent(array) {
                    RenderStats.update("SortTransparent", array.length), array.sort((a, b) => a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.worldPos.z !== b.worldPos.z ? a.worldPos.z - b.worldPos.z : a.id - b.id)
                }(scene.toRender[1]), _this.shadows && !_this.overridePreventShadows && !_this.pauseShadowRendering && scene.hasShadowLight && function renderShadows(scene, camera) {
                    let render = light => {
                            RenderTarget.renderer.bind(light.shadow.rt), RenderStats.update("ShadowLights"), light.shadow.camera.updateMatrixWorld(), camera.getWorldPosition(camera.worldPos), _frustum.setFromCamera(camera), _ubo && (light.shadow.camera._ubo ? light.shadow.camera._ubo.update() : initCameraUBO(light.shadow.camera));
                            for (let l = 0; l < 2; l++)
                                for (let i = 0; i < scene.toRender[l].length; i++) {
                                    let object = scene.toRender[l][i];
                                    !0 === object.castShadow && object.determineVisible() && object.shader.visible && !object.shader.neverRender && (!1 !== object.frustumCulled && !0 !== _frustum.intersectsObject(object) || (object.shader.shadow || Lighting.initShadowShader(object), object.shader.shadow.draw(object, object.geometry), attachShadowUniforms(object, 0, light), object.geometry.draw(object, object.shader), _ubo && light.shadow.camera._ubo.unbind(), RenderStats.update("ShadowMesh")))
                                }
                            RenderTarget.renderer.unbind(light.shadow.rt)
                        },
                        lights = Lighting.getShadowLights();
                    scene._shadowData || (scene._shadowData = {
                        maps: [],
                        emptyMaps: [],
                        size: new Float32Array(lights.length),
                        pos: new Float32Array(3 * lights.length),
                        count: lights.length
                    }), scene._shadowData.count != lights.length && (scene._shadowData.size = new Float32Array(lights.length), scene._shadowData.pos = new Float32Array(3 * lights.length), scene._shadowData.count = lights.length);
                    for (let i = 0; i < lights.length; i++) {
                        let light = lights[i];
                        light.prepareRender(), scene._shadowData.maps[i] = light.shadow.rt.depth, scene._shadowData.emptyMaps[i] = Utils3D.getEmptyTexture(), scene._shadowData.size[i] = light.shadow.size, light.position.toArray(scene._shadowData.pos, 3 * i)
                    }
                    for (let i = 0; i < lights.length; i++) {
                        let light = lights[i];
                        !light.shadow.frozen && light.determineVisible() && render(light)
                    }
                }(scene, camera), rt || !_this.vrRenderingPath || forceToScreen ? rt || !_this.arRenderingPath || forceToScreen ? render(scene, camera, rt) : _this.arRenderingPath(render, scene, camera) : _this.vrRenderingPath(scene, camera, _projScreenMatrix, _frustum, attachSceneUniforms), scene.displayNeedsUpdate = !1, Shader.renderer.resetState()
        }, this.renderSingle = function(object, camera, rt) {
            rt ? (_resolution.set(rt.width, rt.height), RenderTarget.renderer.bind(rt)) : (Renderer.overrideViewport || (_gl.viewport(0, 0, _width * _dpr, _height * _dpr), _resolution.set(_canvas.width, _canvas.height)), _this.autoClear && (_gl.clearColor(Renderer.CLEAR[0], Renderer.CLEAR[1], Renderer.CLEAR[2], Renderer.CLEAR[3]), _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT))), camera.getWorldPosition(camera.worldPos), object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld), object.normalMatrix.getNormalMatrix(object.modelViewMatrix), object.getWorldPosition(object.worldPos), _ubo && (camera._ubo || initCameraUBO(camera)), object.shader.draw(object, object.geometry), object.noMatrices || (Shader.renderer.appendUniform(object.shader, "normalMatrix", object.normalMatrix), Shader.renderer.appendUniform(object.shader, "modelMatrix", object.matrixWorld), Shader.renderer.appendUniform(object.shader, "modelViewMatrix", object.modelViewMatrix)), _ubo ? camera._ubo.bind(object.shader._gl.program, "global") : (Shader.renderer.appendUniform(object.shader, "projectionMatrix", camera.projectionMatrix), Shader.renderer.appendUniform(object.shader, "viewMatrix", camera.matrixWorldInverse), Shader.renderer.appendUniform(object.shader, "cameraPosition", camera.worldPos), Shader.renderer.appendUniform(object.shader, "resolution", _resolution), Shader.renderer.appendUniform(object.shader, "time", _time.value), Shader.renderer.appendUniform(object.shader, "timeScale", Render.timeScaleUniform.value)), object.geometry.draw(object, object.shader), _ubo && camera._ubo.unbind(), rt && RenderTarget.renderer.unbind(rt), Shader.renderer.resetState()
        }, this.setClearColor = function(color, alpha = 1) {
            _this.clearColor = new Color(color), Renderer.CLEAR = [_this.clearColor.r, _this.clearColor.g, _this.clearColor.b, alpha]
        }, this.setClearAlpha = function(alpha) {
            Renderer.CLEAR[3] = alpha
        }, this.getClearColor = function() {
            return _this.clearColor || (_this.clearColor = new Color(0, 0, 0)), _this.clearColor
        }, this.getClearAlpha = function() {
            return Renderer.CLEAR[3]
        }, this.setPixelRatio = function(dpr) {
            _dpr = dpr, this.setSize(_width, _height)
        }, this.setSize = function(width, height) {
            _width = width, _height = height, _canvas.width = width * _dpr, _canvas.height = height * _dpr, _canvas.style.width = width + "px", _canvas.style.height = height + "px", _resolution.set(_canvas.width, _canvas.height)
        }, this.getMaxAnisotropy = function() {
            return Device.graphics.webgl && _this.extensions.anisotropy ? (_anisotropy || (_anisotropy = _gl.getParameter(_this.extensions.anisotropy.MAX_TEXTURE_MAX_ANISOTROPY_EXT)), _anisotropy) : 0
        }, this.readPixels = function(rt, x = 0, y = 0, width, height) {
            width || (width = rt ? rt.width : 1), height || (height = rt ? rt.height : 1);
            let array = new Uint8Array((width - x) * (height - y) * 4);
            return _gl.bindFramebuffer(_gl.FRAMEBUFFER, rt ? rt._gl : null), _gl.readPixels(x, y, width, height, _gl.RGBA, _gl.UNSIGNED_BYTE, array), _gl.bindFramebuffer(_gl.FRAMEBUFFER, null), array
        }, this.blit = function(input, output) {
            return _this.type == Renderer.WEBGL2 && (input._gl || input.upload(), output._gl || output.upload(), _gl.bindFramebuffer(_gl.READ_FRAMEBUFFER, input._gl), _gl.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, output._gl), _gl.blitFramebuffer(0, 0, input.width, input.height, 0, 0, output.width, output.height, _gl.COLOR_BUFFER_BIT, _gl.NEAREST), _gl.bindFramebuffer(_gl.READ_FRAMEBUFFER, null), _gl.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, null), !0)
        }, this.setupStencilMask = function(ref = 1) {
            _stencilActive || (_gl.enable(_gl.STENCIL_TEST), _gl.clear(_gl.STENCIL_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT)), _stencilActive = !0, _gl.stencilFunc(_gl.ALWAYS, ref, 255), _gl.stencilOp(_gl.KEEP, _gl.KEEP, _gl.REPLACE), _gl.stencilMask(255), _gl.colorMask(!1, !1, !1, !1), _gl.disable(_gl.DEPTH_TEST)
        }, this.setupStencilDraw = function(mode, ref = 1) {
            _gl.colorMask(!0, !0, !0, !0), _gl.enable(_gl.DEPTH_TEST), _gl.stencilFunc("inside" == mode ? _gl.EQUAL : _gl.NOTEQUAL, ref, 255), _gl.stencilOp(_gl.KEEP, _gl.KEEP, _gl.KEEP)
        }, this.clearStencil = function() {
            _gl.disable(_gl.STENCIL_TEST), _stencilActive = !1
        }, this.get("resolution", _ => _resolution), this.get("time", _ => _time), this.get("canvas", _ => _canvas)
}), _ => {
    Renderer.WEBGL1 = "webgl1", Renderer.WEBGL2 = "webgl2", Renderer.STATIC_SHADOWS = "static_shadows", Renderer.SHADOWS_LOW = "shadows_low", Renderer.SHADOWS_MED = "shadows_med", Renderer.SHADOWS_HIGH = "shadows_high", Renderer.ID = 0
});
class CameraBase3D extends Base3D {
    constructor() {
        super(), this.matrixWorldInverse = new Matrix4, this.projectionMatrix = new Matrix4, this.isCamera = !0
    }
    copy(source, recursive) {
        return Base3D.prototype.copy.call(this, source, recursive), this.matrixWorldInverse.copy(source.matrixWorldInverse), this.projectionMatrix.copy(source.projectionMatrix), this
    }
    updateMatrixWorld(force) {
        Base3D.prototype.updateMatrixWorld.call(this, force), this.matrixWorldInverse.getInverse(this.matrixWorld)
    }
    clone() {
        return (new this.constructor).copy(this)
    }
}
class CubeCamera extends Base3D {
    constructor(near = .1, far = 1e3, cubeResolution = 512) {
        super();
        this.px = new PerspectiveCamera(90, 1, near, far), this.px.up.set(0, -1, 0), this.px.lookAt(new Vector3(1, 0, 0)), this.add(this.px), this.nx = new PerspectiveCamera(90, 1, near, far), this.nx.up.set(0, -1, 0), this.nx.lookAt(new Vector3(-1, 0, 0)), this.add(this.nx), this.py = new PerspectiveCamera(90, 1, near, far), this.py.up.set(0, 0, 1), this.py.lookAt(new Vector3(0, 1, 0)), this.add(this.py), this.ny = new PerspectiveCamera(90, 1, near, far), this.ny.up.set(0, 0, -1), this.ny.lookAt(new Vector3(0, -1, 0)), this.add(this.ny), this.pz = new PerspectiveCamera(90, 1, near, far), this.pz.up.set(0, -1, 0), this.pz.lookAt(new Vector3(0, 0, 1)), this.add(this.pz), this.nz = new PerspectiveCamera(90, 1, near, far), this.nz.up.set(0, -1, 0), this.nz.lookAt(new Vector3(0, 0, -1)), this.add(this.nz), this.rt = new CubeRenderTarget(cubeResolution, cubeResolution)
    }
    render(scene = World.SCENE, renderer = World.RENDERER) {
        let rt = this.rt;
        rt.activeFace = 0, renderer.render(scene, this.px, rt), this.afterRender && this.afterRender(rt), rt.activeFace = 1, renderer.render(scene, this.nx, rt), this.afterRender && this.afterRender(rt), rt.activeFace = 2, renderer.render(scene, this.py, rt), this.afterRender && this.afterRender(rt), rt.activeFace = 3, renderer.render(scene, this.ny, rt), this.afterRender && this.afterRender(rt), rt.activeFace = 4, renderer.render(scene, this.pz, rt), this.afterRender && this.afterRender(rt), rt.activeFace = 5, renderer.render(scene, this.nz, rt), this.afterRender && this.afterRender(rt)
    }
}
class OrthographicCamera extends CameraBase3D {
    constructor(left, right, top, bottom, near, far) {
        super(), this.isOrthographicCamera = !0, this.zoom = 1, this.left = left, this.right = right, this.top = top, this.bottom = bottom, this.near = void 0 !== near ? near : .1, this.far = void 0 !== far ? far : 2e3, this.position.z = 1, this.updateProjectionMatrix()
    }
    clone() {
        return (new OrthographicCamera).copy(this)
    }
    copy(source, recursive) {
        return CameraBase3D.prototype.copy.call(this, source, recursive), this.left = source.left, this.right = source.right, this.top = source.top, this.bottom = source.bottom, this.near = source.near, this.far = source.far, this.zoom = source.zoom, this.view = null === source.view ? null : Object.assign({}, source.view), this
    }
    updateProjectionMatrix() {
        let dx = (this.right - this.left) / (2 * this.zoom),
            dy = (this.top - this.bottom) / (2 * this.zoom),
            cx = (this.right + this.left) / 2,
            cy = (this.top + this.bottom) / 2,
            left = cx - dx,
            right = cx + dx,
            top = cy + dy,
            bottom = cy - dy;
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far)
    }
    setViewport(width, height) {
        this.left = width / -2, this.right = width / 2, this.top = height / 2, this.bottom = height / -2, this.updateProjectionMatrix()
    }
}
class PerspectiveCamera extends CameraBase3D {
    constructor(fov, aspect, near, far) {
        super(), this.type = "PerspectiveCamera", this.fov = fov || 50, this.zoom = 1, this.near = near || .1, this.far = far || 2e3, this.focus = 10, this.aspect = aspect || 1, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
    }
    clone() {
        return (new PerspectiveCamera).copy(this)
    }
    copy(source, recursive) {
        return CameraBase3D.prototype.copy.call(this, source, recursive), this.fov = source.fov, this.zoom = source.zoom, this.near = source.near, this.far = source.far, this.focus = source.focus, this.aspect = source.aspect, this.filmGauge = source.filmGauge, this.filmOffset = source.filmOffset, this
    }
    setFocalLength(focalLength) {
        let vExtentSlope = .5 * this.getFilmHeight() / focalLength;
        this.fov = Math.degrees(2 * Math.atan(vExtentSlope)), this.updateProjectionMatrix()
    }
    getFocalLength() {
        let vExtentSlope = Math.tan(Math.radians(.5 * this.fov));
        return .5 * this.getFilmHeight() / vExtentSlope
    }
    getEffectiveFOV() {
        return Math.degrees(2 * Math.atan(Math.tan(Math.radians(.5 * this.fov)) / this.zoom))
    }
    getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1)
    }
    getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1)
    }
    updateProjectionMatrix() {
        let near = this.near,
            top = near * Math.tan(Math.radians(.5 * this.fov)) / this.zoom,
            height = 2 * top,
            width = this.aspect * height,
            left = -.5 * width,
            skew = (this.view, this.filmOffset);
        0 !== skew && (left += near * skew / this.getFilmWidth()), this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far)
    }
}
class Geometry {
    constructor() {
        this.attributes = {}, this.drawRange = {
            start: 0,
            end: 0
        }, this.boundingBox = null, this.boundingSphere = null, this.index = null, this.maxInstancedCount = void 0, this.keepAlive = !1, this.id = Utils.timestamp()
    }
    draw(mesh, shader) {
        Geometry.renderer.draw(this, mesh, shader)
    }
    upload(mesh, shader) {
        Geometry.renderer.upload(this, mesh, shader)
    }
    destroy(mesh) {
        this.keepAlive || Geometry.renderer.destroy(this, mesh)
    }
    addAttribute(name, attribute) {
        attribute.meshPerAttribute >= 1 && (this.isInstanced = !0, this.maxInstancedCount = attribute.count), this.attributes[name] = attribute
    }
    setIndex(attribute) {
        this.index = attribute.array || attribute
    }
    toNonIndexed() {
        let geometry2 = new Geometry,
            indices = this.index,
            attributes = this.attributes;
        for (let name in attributes) {
            let attribute = attributes[name],
                array = attribute.array,
                itemSize = attribute.itemSize,
                array2 = new array.constructor(indices.length * itemSize),
                index = 0,
                index2 = 0;
            for (let i = 0, l = indices.length; i < l; i++) {
                index = indices[i] * itemSize;
                for (let j = 0; j < itemSize; j++) array2[index2++] = array[index++]
            }
            geometry2.addAttribute(name, new GeometryAttribute(array2, itemSize))
        }
        return geometry2
    }
    normalizeNormals() {
        let vector = this._V1 || new Vector3;
        this._V1 = vector;
        let x, y, z, normals = this.attributes.normal;
        for (let i = 0, il = normals.count; i < il; i++) x = 3 * i + 0, y = 3 * i + 1, z = 3 * i + 2, vector.x = normals.array[x], vector.y = normals.array[y], vector.z = normals.array[z], vector.normalize(), normals.array[x] = vector.x, normals.array[y] = vector.y, normals.array[z] = vector.z
    }
    computeFaceNormals() {
        let cb = new Vector3,
            ab = new Vector3;
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            let face = this.faces[f],
                vA = this.vertices[face.a],
                vB = this.vertices[face.b],
                vC = this.vertices[face.c];
            cb.subVectors(vC, vB), ab.subVectors(vA, vB), cb.cross(ab), cb.normalize(), face.normal.copy(cb)
        }
    }
    computeVertexNormals() {
        let index = this.index,
            attributes = this.attributes,
            groups = this.groups;
        if (attributes.position) {
            let positions = attributes.position.array;
            if (void 0 === attributes.normal) this.addAttribute("normal", new BufferAttribute(new Float32Array(positions.length), 3));
            else {
                let array = attributes.normal.array;
                for (let i = 0, il = array.length; i < il; i++) array[i] = 0
            }
            let vA, vB, vC, normals = attributes.normal.array,
                pA = new Vector3,
                pB = new Vector3,
                pC = new Vector3,
                cb = new Vector3,
                ab = new Vector3;
            if (index) {
                let indices = index.array;
                0 === groups.length && this.addGroup(0, indices.length);
                for (let j = 0, jl = groups.length; j < jl; ++j) {
                    let group = groups[j],
                        start = group.start;
                    for (let i = start, il = start + group.count; i < il; i += 3) vA = 3 * indices[i + 0], vB = 3 * indices[i + 1], vC = 3 * indices[i + 2], pA.fromArray(positions, vA), pB.fromArray(positions, vB), pC.fromArray(positions, vC), cb.subVectors(pC, pB), ab.subVectors(pA, pB), cb.cross(ab), normals[vA] += cb.x, normals[vA + 1] += cb.y, normals[vA + 2] += cb.z, normals[vB] += cb.x, normals[vB + 1] += cb.y, normals[vB + 2] += cb.z, normals[vC] += cb.x, normals[vC + 1] += cb.y, normals[vC + 2] += cb.z
                }
            } else
                for (let i = 0, il = positions.length; i < il; i += 9) pA.fromArray(positions, i), pB.fromArray(positions, i + 3), pC.fromArray(positions, i + 6), cb.subVectors(pC, pB), ab.subVectors(pA, pB), cb.cross(ab), normals[i] = cb.x, normals[i + 1] = cb.y, normals[i + 2] = cb.z, normals[i + 3] = cb.x, normals[i + 4] = cb.y, normals[i + 5] = cb.z, normals[i + 6] = cb.x, normals[i + 7] = cb.y, normals[i + 8] = cb.z;
            this.normalizeNormals(), attributes.normal.needsUpdate = !0
        }
    }
    computeBoundingBox() {
        this.boundingBox || (this.boundingBox = new Box3);
        let position = this.attributes.position;
        position ? this.boundingBox.setFromBufferAttribute(position) : this.boundingBox.makeEmpty()
    }
    computeBoundingSphere() {
        let box = new Box3,
            vector = new Vector3;
        this.boundingSphere || (this.boundingSphere = new Sphere);
        let position = this.attributes.position;
        if (position) {
            let center = this.boundingSphere.center;
            box.setFromBufferAttribute(position), box.getCenter(center);
            let maxRadiusSq = 0;
            for (let i = 0, il = position.count; i < il; i++) vector.x = position.array[3 * i + 0], vector.y = position.array[3 * i + 1], vector.z = position.array[3 * i + 2], maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
            this.boundingSphere.radius = Math.sqrt(maxRadiusSq), isNaN(this.boundingSphere.radius) && console.error("Bounding Sphere came up NaN, broken position buffer.", this)
        }
    }
    merge(geometry) {
        let Float32ArrayConcat = (first, second) => {
                let firstLength = first.length,
                    result = new Float32Array(firstLength + second.length);
                return result.set(first), result.set(second, firstLength), result
            },
            attributes = this.attributes;
        if (this.index) {
            let indices = geometry.index,
                offset = attributes.position.count;
            for (let i = 0, il = indices.length; i < il; i++) indices[i] = offset + indices[i];
            this.index = ((first, second) => {
                let firstLength = first.length,
                    result = new Uint16Array(firstLength + second.length);
                return result.set(first), result.set(second, firstLength), result
            })(this.index, indices)
        }
        for (let key in attributes) void 0 !== geometry.attributes[key] && (attributes[key].array = Float32ArrayConcat(attributes[key].array, geometry.attributes[key].array), attributes[key].count = attributes[key].array.length / attributes[key].itemSize);
        return this
    }
    clone(noCopy) {
        return (new Geometry).copy(this, noCopy)
    }
    copy(source, noCopy) {
        this.index = null, this.attributes = {}, this.boundingBox = null, this.boundingSphere = null, this.index = source.index;
        let attributes = source.attributes;
        for (let name in attributes) this.addAttribute(name, attributes[name].clone(noCopy));
        let boundingBox = source.boundingBox;
        boundingBox && boundingBox.clone && (this.boundingBox = boundingBox.clone());
        let boundingSphere = source.boundingSphere;
        return boundingSphere && boundingSphere.clone && (this.boundingSphere = boundingSphere.clone()), this
    }
    center() {
        let offset = new Vector3;
        return this.computeBoundingBox(), this.boundingBox.getCenter(offset).negate(), this.applyMatrix((new Matrix4).makeTranslation(offset.x, offset.y, offset.z)), this
    }
    applyMatrix(matrix) {
        let position = this.attributes.position;
        position && (matrix.applyToBufferAttribute(position), position.needsUpdate = !0);
        let normal = this.attributes.normal;
        if (normal) {
            (new Matrix3).getNormalMatrix(matrix).applyToBufferAttribute(normal), normal.needsUpdate = !0
        }
        return this.boundingBox && this.computeBoundingBox(), this.boundingSphere && this.computeBoundingSphere(), this
    }
    scale(x, y, z) {
        this.applyMatrix((new Matrix4).makeScale(x, y, z))
    }
    setFromPoints(points) {
        let position = [];
        for (let i = 0, l = points.length; i < l; i++) {
            let point = points[i];
            position.push(point.x, point.y, point.z || 0)
        }
        return this.addAttribute("position", new GeometryAttribute(new Float32Array(position), 3)), this
    }
    instanceFrom(geom) {
        geom.index && (geom = geom.toNonIndexed());
        for (let key in geom.attributes) this.addAttribute(key, geom.attributes[key]);
        return this
    }
    uploadBuffersAsync() {
        return Geometry.renderer.uploadBuffersAsync(this)
    }
    toJSON() {
        let geom = this.toNonIndexed();
        return JSON.stringify({
            position: Array.from(geom.attributes.position.array).map(val => parseFloat(val.toFixed(3))),
            uv: Array.from(geom.attributes.uv.array).map(val => parseFloat(val.toFixed(3)))
        })
    }
}
class GeometryAttribute {
    constructor(_array, _itemSize, _meshPerAttribute) {
        this.array = _array, this.itemSize = _itemSize, this.count = void 0 !== _array ? _array.length / _itemSize : 0, this.dynamic = !1, this.updateRange = {
            offset: 0,
            count: -1
        }, this.meshPerAttribute = _meshPerAttribute
    }
    setArray(array) {
        let newCount = void 0 !== array ? array.length / this.itemSize : 0;
        newCount != this.count && (this.needsNewBuffer = !0), this.array = array, this.count = newCount, this.needsUpdate = !0
    }
    clone(noCopy) {
        return noCopy ? this : new GeometryAttribute(new Float32Array(this.array), this.itemSize, this.meshPerAttribute)
    }
    getX(index) {
        return this.array[index * this.itemSize]
    }
    setX(index, x) {
        return this.array[index * this.itemSize] = x, this
    }
    getY(index) {
        return this.array[index * this.itemSize + 1]
    }
    setY(index, y) {
        return this.array[index * this.itemSize + 1] = y, this
    }
    getZ(index) {
        return this.array[index * this.itemSize + 2]
    }
    setZ(index, z) {
        return this.array[index * this.itemSize + 2] = z, this
    }
    getW(index) {
        return this.array[index * this.itemSize + 3]
    }
    setW(index, w) {
        return this.array[index * this.itemSize + 3] = w, this
    }
    setXY(index, x, y) {
        return index *= this.itemSize, this.array[index + 0] = x, this.array[index + 1] = y, this
    }
    setXYZ(index, x, y, z) {
        return index *= this.itemSize, this.array[index + 0] = x, this.array[index + 1] = y, this.array[index + 2] = z, this
    }
    setXYZW(index, x, y, z, w) {
        return index *= this.itemSize, this.array[index + 0] = x, this.array[index + 1] = y, this.array[index + 2] = z, this.array[index + 3] = w, this
    }
}
class Group extends Base3D {
    constructor() {
        super(), this.isGroup = !0
    }
}
class BaseLight extends Base3D {
    constructor(color = 16777215, intensity = 1, distance = 9999) {
        super(), this.color = new Color(color), this.data = new Vector4, this.data2 = new Vector4, this.data3 = new Vector4, this.properties = new Vector4(intensity, distance, 0, 0)
    }
    destroy() {
        this.shadow && (Lighting.removeFromShadowGroup(this), this.shadow.destroy())
    }
    prepareRender() {
        this.shadow.camera.position.copy(this.position), this.shadow.camera.lookAt(this.shadow.target)
    }
    set castShadow(bool) {
        (this.shadow || bool) && (this.shadow || (this.shadow = new Shadow(this)), this.shadow.enabled = bool, this.silentShadow || (bool ? Lighting.addToShadowGroup(this) : Lighting.removeFromShadowGroup(this)))
    }
    set intensity(v) {
        this.properties.x = v
    }
    get intensity() {
        return this.properties.x
    }
    set distance(v) {
        this.properties.y = v
    }
    get distance() {
        return this.properties.y
    }
    set bounce(v) {
        this.properties.z = v
    }
    get bounce() {
        return this.properties.z
    }
}
class Line extends Base3D {
    constructor(geometry, shader) {
        super(), this.geometry = geometry, this.shader = shader, this.isLine = !0, this.id = Renderer.ID++
    }
    clone() {
        return new Line(this.geometry, this.shader).copy(this)
    }
}
class Mesh extends Base3D {
    constructor(geometry, shader) {
        super(), this._geometry = geometry, this._shader = shader && shader.shader ? shader.shader : shader, this.isMesh = !0, this.id = Utils.timestamp(), shader && (this._shader.mesh = this)
    }
    clone() {
        return new Mesh(this._geometry, this.shader).copy(this)
    }
    set geometry(g) {
        Geometry.renderer.resetMeshGeom(this), this._geometry = g
    }
    get geometry() {
        return this._geometry
    }
    set shader(shader) {
        this._shader = shader && shader.shader ? shader.shader : shader
    }
    get shader() {
        return this._shader
    }
    isInsideOf(mesh) {
        return this.box3 || (this.box3 = new Box3), this.box3.setFromObject(this), mesh.isMeshInside(this)
    }
    isMeshInside(mesh) {
        return this.box3 || (this.box3 = new Box3), this.box3.setFromObject(this), mesh.box3.intersectsBox(this.box3)
    }
}
class Points extends Base3D {
    constructor(geometry, shader) {
        super(), this._geometry = geometry, this.shader = shader, this.isPoints = !0, this.id = Renderer.ID++, shader && (this.shader.mesh = this)
    }
    clone() {
        return new Points(this._geometry, this.shader).copy(this)
    }
    set geometry(g) {
        Geometry.renderer.resetMeshGeom(this), this._geometry = g
    }
    get geometry() {
        return this._geometry
    }
}
class Scene extends Base3D {
    constructor() {
        super(), this.autoUpdate = !0, this.toRender = [
            [],
            []
        ], this._displayNeedsUpdate = !0, this.isScene = !0, this.changes = []
    }
    set displayNeedsUpdate(v) {
        !0 === v && this.changes.forEach(cb => cb()), this._displayNeedsUpdate = v
    }
    get displayNeedsUpdate() {
        return this._displayNeedsUpdate
    }
    bindSceneChange(cb) {
        this.changes.push(cb)
    }
}
Class((function FBORendererWebGL(_gl) {
    const WEBGL2 = Renderer.type == Renderer.WEBGL2,
        {
            getFormat: getFormat,
            getProperty: getProperty,
            getType: getType,
            getFloatParams: getFloatParams
        } = require("GLTypes");

    function prepareTexture(texture) {
        texture._gl = _gl.createTexture(), _gl.bindTexture(_gl.TEXTURE_2D, texture._gl), _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, getProperty(texture.wrapS)), _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, getProperty(texture.wrapT)), _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, getProperty(texture.magFilter)), _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, getProperty(texture.minFilter)), texture.needsUpdate = !1
    }

    function texImageDB(rt, texture) {
        if (texture.type.includes("float")) {
            let {
                internalformat: internalformat,
                format: format,
                type: type
            } = getFloatParams(texture);
            _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, rt.width, rt.height, 0, format, type, null)
        } else _gl.texImage2D(_gl.TEXTURE_2D, 0, getFormat(texture), rt.width, rt.height, 0, getFormat(texture), getType(texture), null);
        _gl.bindTexture(_gl.TEXTURE_2D, null)
    }
    this.upload = function(rt) {
        if (!rt._gl) {
            if (rt.cube) return function uploadCube(rt) {
                rt._gl = _gl.createFramebuffer(), _gl.bindFramebuffer(_gl.FRAMEBUFFER, rt._gl);
                let texture = rt.texture;
                texture._gl = _gl.createTexture(), texture.cube = !0, texture.needsUpdate = !1, _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, texture._gl);
                for (let i = 0; i < 6; i++) _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, getFormat(texture), rt.width, rt.height, 0, getFormat(texture), _gl.UNSIGNED_BYTE, null);
                _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_S, getProperty(texture.wrapS)), _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_T, getProperty(texture.wrapT)), _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MAG_FILTER, getProperty(texture.magFilter)), _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MIN_FILTER, getProperty(texture.minFilter)), rt._depthBuffer = _gl.createRenderbuffer(), _gl.bindRenderbuffer(_gl.RENDERBUFFER, rt._depthBuffer), _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, rt.width, rt.height), _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, rt._depthBuffer), _gl.bindFramebuffer(_gl.FRAMEBUFFER, null), _gl.bindTexture(_gl.TEXTURE_2D, null), _gl.bindRenderbuffer(_gl.RENDERBUFFER, null)
            }(rt);
            if (rt._gl = _gl.createFramebuffer(), rt.depth || rt.disableDepth || (rt._depthBuffer = _gl.createRenderbuffer(), _gl.bindRenderbuffer(_gl.RENDERBUFFER, rt._depthBuffer), _gl.renderbufferStorage(_gl.RENDERBUFFER, Renderer.instance.stencil ? _gl.DEPTH_STENCIL : _gl.DEPTH_COMPONENT16, rt.width, rt.height)), RenderCount.add(`fbo_${rt.width}x${rt.height}`, rt), _gl.bindFramebuffer(_gl.FRAMEBUFFER, rt._gl), rt.multi)
                if (WEBGL2) {
                    let colorAttachments = [];
                    for (let i = 0; i < rt.attachments.length; i++) {
                        let key = "COLOR_ATTACHMENT" + i,
                            texture = rt.attachments[i];
                        colorAttachments.push(_gl[key]), prepareTexture(texture), texImageDB(rt, texture), _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl[key], _gl.TEXTURE_2D, texture._gl, 0)
                    }
                    _gl.drawBuffers(colorAttachments)
                } else {
                    let ext = Renderer.extensions.drawBuffers,
                        colorAttachments = [];
                    for (let i = 0; i < rt.attachments.length; i++) {
                        let key = "COLOR_ATTACHMENT" + i + "_WEBGL",
                            texture = rt.attachments[i];
                        colorAttachments.push(ext[key]), prepareTexture(texture), texImageDB(rt, texture), _gl.framebufferTexture2D(_gl.FRAMEBUFFER, ext[key], _gl.TEXTURE_2D, texture._gl, 0)
                    }
                    ext.drawBuffersWEBGL(colorAttachments)
                }
            else {
                if (prepareTexture(rt.texture), rt.texture.type.includes("float")) {
                    let {
                        internalformat: internalformat,
                        format: format,
                        type: type
                    } = getFloatParams(rt.texture);
                    _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, rt.width, rt.height, 0, format, type, null)
                } else _gl.texImage2D(_gl.TEXTURE_2D, 0, getFormat(rt.texture), rt.width, rt.height, 0, getFormat(rt.texture), getType(rt.texture), null);
                _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, rt.texture._gl, 0)
            }
            if (rt.depth) {
                prepareTexture(rt.depth);
                let iformat = WEBGL2 ? _gl.DEPTH_COMPONENT24 : _gl.DEPTH_COMPONENT;
                _gl.texImage2D(_gl.TEXTURE_2D, 0, iformat, rt.width, rt.height, 0, _gl.DEPTH_COMPONENT, _gl.UNSIGNED_INT, null), _gl.framebufferTexture2D(_gl.FRAMEBUFFER, Renderer.instance.stencil ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, rt.depth._gl, 0)
            } else rt.disableDepth || _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, Renderer.instance.stencil ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, rt._depthBuffer);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null), _gl.bindTexture(_gl.TEXTURE_2D, null), _gl.bindRenderbuffer(_gl.RENDERBUFFER, null)
        }
    }, this.bind = function(rt) {
        rt._gl || this.upload(rt), _gl.bindFramebuffer(_gl.FRAMEBUFFER, rt._gl), rt.cube && _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + rt.activeFace, rt.texture._gl, 0), rt.scissor && (_gl.enable(_gl.SCISSOR_TEST), _gl.scissor(rt.scissor.x, rt.scissor.y, rt.scissor.width, rt.scissor.height)), _gl.viewport(rt.viewport.x, rt.viewport.y, rt.width, rt.height), Renderer.instance.autoClear && (_gl.clearColor(Renderer.CLEAR[0], Renderer.CLEAR[1], Renderer.CLEAR[2], Renderer.CLEAR[3]), _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT))
    }, this.unbind = function(rt) {
        rt.scissor && _gl.disable(_gl.SCISSOR_TEST), _gl.bindFramebuffer(_gl.FRAMEBUFFER, null)
    }, this.resize = function(rt) {
        if (rt.texture._gl && rt._gl) {
            if (_gl.bindFramebuffer(_gl.FRAMEBUFFER, rt._gl), rt.multi)
                for (let i = 0; i < rt.attachments.length; i++) {
                    let texture = rt.attachments[i];
                    if (_gl.bindTexture(_gl.TEXTURE_2D, texture._gl), texture.type.includes("float")) {
                        let {
                            internalformat: internalformat,
                            format: format,
                            type: type
                        } = getFloatParams(rt.texture);
                        _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, rt.width, rt.height, 0, format, type, null)
                    } else _gl.texImage2D(_gl.TEXTURE_2D, 0, getFormat(texture), rt.width, rt.height, 0, getFormat(texture), getType(texture), null)
                } else if (_gl.bindTexture(_gl.TEXTURE_2D, rt.texture._gl), rt.texture.type.includes("float")) {
                    let {
                        internalformat: internalformat,
                        format: format,
                        type: type
                    } = getFloatParams(rt.texture);
                    _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, rt.width, rt.height, 0, format, type, null)
                } else _gl.texImage2D(_gl.TEXTURE_2D, 0, getFormat(rt.texture), rt.width, rt.height, 0, getFormat(rt.texture), getType(rt.texture), null);
            if (rt.depth) {
                _gl.bindTexture(_gl.TEXTURE_2D, rt.depth._gl);
                let iformat = WEBGL2 ? _gl.DEPTH_COMPONENT24 : _gl.DEPTH_COMPONENT;
                _gl.texImage2D(_gl.TEXTURE_2D, 0, iformat, rt.width, rt.height, 0, _gl.DEPTH_COMPONENT, _gl.UNSIGNED_INT, null), _gl.framebufferTexture2D(_gl.FRAMEBUFFER, Renderer.instance.stencil ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, rt.depth._gl, 0)
            } else rt.disableDepth || (_gl.bindRenderbuffer(_gl.RENDERBUFFER, rt._depthBuffer), _gl.renderbufferStorage(_gl.RENDERBUFFER, Renderer.instance.stencil ? _gl.DEPTH_STENCIL : _gl.DEPTH_COMPONENT16, rt.width, rt.height));
            _gl.bindTexture(_gl.TEXTURE_2D, null), _gl.bindFramebuffer(_gl.FRAMEBUFFER, null), _gl.bindRenderbuffer(_gl.RENDERBUFFER, null)
        }
    }, this.destroy = function(rt) {
        _gl.deleteFramebuffer(rt._gl), rt._depthBuffer && _gl.deleteRenderbuffer(rt._depthBuffer), Texture.renderer.destroy(rt.texture), RenderCount.remove(`fbo_${rt.width}x${rt.height}`), rt.multi && rt.attachments.forEach(t => Texture.renderer.destroy(t)), rt._gl = null
    }
})), Class((function GeometryRendererWebGL(_gl) {
    var _cache = {};
    const WEBGL2 = Renderer.type == Renderer.WEBGL2;

    function updateBuffer(attrib) {
        if (!attrib._gl) return;
        attrib.needsUpdate = !1, _gl.bindBuffer(_gl.ARRAY_BUFFER, attrib._gl.buffer), RenderStats.update("BufferUpdates");
        let array = attrib.array,
            updateRange = attrib.updateRange;
        if (-1 === updateRange.count) attrib.needsNewBuffer ? (_gl.bufferData(_gl.ARRAY_BUFFER, attrib.array, _gl.DYNAMIC_DRAW), attrib.needsNewBuffer = !1) : _gl.bufferSubData(_gl.ARRAY_BUFFER, 0, array);
        else if (Array.isArray(updateRange)) {
            for (let i = updateRange.length - 1; i > -1; i--) {
                let {
                    offset: offset,
                    count: count
                } = updateRange[i];
                _gl.bufferSubData(_gl.ARRAY_BUFFER, offset * array.BYTES_PER_ELEMENT, array.subarray(offset, offset + count))
            }
            updateRange.length = 0
        } else _gl.bufferSubData(_gl.ARRAY_BUFFER, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
        _gl.bindBuffer(_gl.ARRAY_BUFFER, null)
    }
    this.draw = function(geom, mesh, shader) {
        geom._gl && !geom.needsUpdate && mesh._gl && mesh._gl.geomInit || this.upload(geom, mesh, shader), RenderStats.active && RenderStats.update("DrawCalls", 1, shader.vsName + "|" + shader.fsName, mesh);
        for (let key in geom.attributes) {
            let attrib = geom.attributes[key];
            mesh._gl.program != shader._gl.program ? (mesh._gl[key] = _gl.getAttribLocation(shader._gl.program, key), mesh._gl.program = shader._gl.program) : void 0 === mesh._gl[key] && (mesh._gl[key] = _gl.getAttribLocation(shader._gl.program, key)), -1 !== mesh._gl[key] && ((attrib.needsUpdate || attrib.dynamic) && updateBuffer(attrib))
        }
        geom.indexNeedsUpdate && (_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, geom._gl.index), _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, geom.index, _gl.STATIC_DRAW), _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, null), geom.indexNeedsUpdate = !1), mesh._gl.vao.bind();
        let mode = mesh._gl.mode;
        mode || (mesh._gl.mode = mode = function getMode(mesh, shader) {
            return mesh.isPoints ? _gl.POINTS : mesh.isLine ? _gl.LINE_STRIP : shader.wireframe ? _gl.LINES : _gl.TRIANGLES
        }(mesh, shader));
        let drawStart = geom.drawRange.start || 0,
            drawEnd = geom.drawRange.end || geom.attributes.position.count;
        geom.isInstanced ? WEBGL2 ? geom.index ? _gl.drawElementsInstanced(mode, geom.index.length, _gl.UNSIGNED_SHORT, 0, geom.maxInstancedCount) : _gl.drawArraysInstanced(mode, drawStart, drawEnd, geom.maxInstancedCount) : geom.index ? Renderer.extensions.instancedArrays.drawElementsInstancedANGLE(mode, geom.index.length, _gl.UNSIGNED_SHORT, 0, geom.maxInstancedCount) : Renderer.extensions.instancedArrays.drawArraysInstancedANGLE(mode, 0, drawEnd, geom.maxInstancedCount) : geom.index ? _gl.drawElements(mode, geom.index.length, _gl.UNSIGNED_SHORT, 0) : _gl.drawArrays(mode, drawStart, drawEnd), mesh._gl.vao.unbind()
    }, this.upload = function(geom, mesh, shader) {
        if (!mesh) return;
        geom._gl || (geom._gl = {
            id: Utils.timestamp()
        }), mesh._gl || (mesh._gl = {}), mesh._gl.geomInit = !0, geom.uploaded = !0;
        const KEY = `${geom._gl.id}_${shader._gl._id}`;
        let cached = _cache[KEY];
        if (cached) return cached.count++, mesh._gl.vao = cached.vao, void(mesh._gl.lookup = KEY);
        RenderCount.add("geometry"), mesh._gl.vao && mesh._gl.vao.destroy(), mesh._gl.vao = new VAO(_gl), geom.distributeBufferData || RenderCount.add("geom_upload", geom);
        for (let key in geom.attributes) {
            let attrib = geom.attributes[key],
                location = mesh._gl[key] || _gl.getAttribLocation(shader._gl.program, key);
            mesh._gl[key] = location, attrib._gl || (attrib._gl = {}, attrib._gl.buffer = _gl.createBuffer(), attrib._gl.bufferUploaded = !geom.distributeBufferData, _gl.bindBuffer(_gl.ARRAY_BUFFER, attrib._gl.buffer), _gl.bufferData(_gl.ARRAY_BUFFER, geom.distributeBufferData ? attrib.array.length * attrib.array.BYTES_PER_ELEMENT : attrib.array, attrib.dynamic ? _gl.DYNAMIC_DRAW : _gl.STATIC_DRAW), _gl.bindBuffer(_gl.ARRAY_BUFFER, null), attrib.needsUpdate = !1)
        }
        geom.index && (geom._gl.index || (geom._gl.index = _gl.createBuffer(), _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, geom._gl.index), _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, geom.index, _gl.STATIC_DRAW), _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, null))), mesh._gl.vao.bind();
        for (let key in geom.attributes) {
            let attrib = geom.attributes[key],
                location = mesh._gl[key]; - 1 != location && (_gl.bindBuffer(_gl.ARRAY_BUFFER, attrib._gl.buffer), _gl.vertexAttribPointer(location, attrib.itemSize, _gl.FLOAT, !1, 0, 0), _gl.enableVertexAttribArray(location), geom.isInstanced && (WEBGL2 ? _gl.vertexAttribDivisor(location, attrib.meshPerAttribute) : Renderer.extensions.instancedArrays.vertexAttribDivisorANGLE(location, attrib.meshPerAttribute)))
        }
        geom.index && _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, geom._gl.index), mesh._gl.vao.unbind(), _cache[KEY] = {
            count: 1,
            vao: mesh._gl.vao
        }
    }, this.destroy = function(geom, mesh) {
        for (let key in geom.attributes) {
            let attrib = geom.attributes[key];
            attrib._gl && (_gl.deleteBuffer(attrib._gl.buffer), attrib._gl = null)
        }
        if (mesh && mesh._gl && mesh._gl.vao) {
            let cache = _cache[mesh._gl.lookup];
            cache ? (cache.count--, 0 == cache.count && (cache.vao.destroy(), delete _cache[mesh._gl.lookup])) : mesh._gl.vao.destroy(), delete mesh._gl.vao
        }
        delete geom._gl
    }, this.resetMeshGeom = function(mesh) {
        mesh._gl && (mesh._gl.geomInit = !1)
    }, this.uploadBuffersAsync = async function(geom) {
        if (geom._gl && geom._gl.uploadedAsync) return;
        let upload = attrib => {
                let array = attrib.array,
                    buffer = attrib._gl.buffer,
                    promise = Promise.create(),
                    amt = 4,
                    match = !1;
                for (; !match;) amt--, array.length % amt == 0 && (match = !0);
                let chunk = array.length / amt,
                    i = 0,
                    worker = new Render.Worker((function uploadBuffersAsync() {
                        let offset = i * chunk,
                            subarray = array.subarray(offset, offset + chunk);
                        if (!attrib._gl) return worker.stop(), promise.resolve();
                        subarray.length && (_gl.bindBuffer(_gl.ARRAY_BUFFER, buffer), _gl.bufferSubData(_gl.ARRAY_BUFFER, offset * array.BYTES_PER_ELEMENT, subarray), _gl.bindBuffer(_gl.ARRAY_BUFFER, null)), ++i == amt && (promise.resolve(), worker.stop())
                    }));
                return promise
            },
            uploaded = !1;
        for (let key in geom.attributes) {
            let attrib = geom.attributes[key];
            attrib._gl || (geom.distributeBufferData = !0, attrib._gl = {}, attrib._gl.buffer = _gl.createBuffer(), attrib._gl.bufferUploaded = !geom.distributeBufferData, attrib.array.length && (_gl.bindBuffer(_gl.ARRAY_BUFFER, attrib._gl.buffer), _gl.bufferData(_gl.ARRAY_BUFFER, attrib.array.length * attrib.array.BYTES_PER_ELEMENT, attrib.dynamic ? _gl.DYNAMIC_DRAW : _gl.STATIC_DRAW), _gl.bindBuffer(_gl.ARRAY_BUFFER, null)), attrib.needsUpdate = !1, geom.needsUpdate = !0), attrib._gl.bufferUploaded || (attrib._gl.bufferUploaded = !0, uploaded = !0, await upload(attrib), attrib.needsUpdate = !1)
        }
        geom._gl.uploadedAsync = !0, uploaded && RenderCount.add("geom_uploadAsync", geom)
    }
})), Class((function ShaderRendererWebGL(_gl) {
    var _pool = {},
        _programID = 0,
        _cached = {},
        _uboCache = {};
    const WEBGL2 = Renderer.type == Renderer.WEBGL2,
        GLOBAL_UNIFORMS = ["normalMatrix", "modelMatrix", "modelViewMatrix", "projectionMatrix", "viewMatrix", "cameraPosition", "resolution", "time", "shadowMatrix", "shadowLightPos", "shadowSize"];

    function toTypedArray(uni) {
        uni.value;
        return uni._gl || (uni._gl = {}), uni._gl.array && uni._gl.array.length == uni.value.length ? uni._gl.array.set(uni.value) : uni._gl.array = new Float32Array(uni.value), uni._gl.array
    }

    function createShader(str, type) {
        let shader = _gl.createShader(type);
        if (_gl.shaderSource(shader, str), _gl.compileShader(shader), Hydra.LOCAL && !_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
            let error = _gl.getShaderInfoLog(shader);
            _gl.deleteShader(shader);
            let split = str.split("\n"),
                errorString = "";
            split.forEach((line, index) => {
                index = function() {
                    switch (index.toString().length) {
                        case 1:
                            return "00" + index;
                        case 2:
                            return "0" + index
                    }
                    return index
                }(), errorString += `${index}: ${line}\n`
            }), console.warn(error, errorString)
        }
        return shader
    }

    function setupShaders(shader) {
        for (let key in shader.uniforms) {
            let uniform = shader.uniforms[key];
            if (void 0 === shader._gl[key] && uniform)
                if (uniform.ubo)
                    if (WEBGL2) {
                        if (_uboCache[shader.UILPrefix] && !shader.ubo && (shader.ubo = _uboCache[shader.UILPrefix]), _uboCache[shader.UILPrefix]) {
                            shader._gl[key] = "U";
                            continue
                        }
                        shader.ubo || (shader.ubo = new UBO(1, _gl)), shader.ubo.push(uniform), shader._gl[key] = "U"
                    } else shader._gl[key] = _gl.getUniformLocation(shader._gl.program, key);
            else WEBGL2 && uniform.lightUBO ? (shader._gl[key] = "U", shader.uboLight = !0) : shader._gl[key] = _gl.getUniformLocation(shader._gl.program, key)
        }
        shader.ubo && !_uboCache[shader.UILPrefix] && (_uboCache[shader.UILPrefix] = shader.ubo), shader._gl.setupGlobals || (shader._gl.setupGlobals = !0, GLOBAL_UNIFORMS.forEach(key => {
            shader._gl[key] = _gl.getUniformLocation(shader._gl.program, key)
        })), shader.uboLight && _gl.getUniformBlockIndex(shader._gl.program, "lights"), WEBGL2 && _gl.getUniformBlockIndex(shader._gl.program, "global")
    }

    function uniformTextureArray(uni, uLoc, shader) {
        let array = shader._gl.texArray || [];
        array.length = 0, shader._gl.texArray = array;
        for (let i = 0; i < uni.value.length; i++) {
            array.push(shader._gl.texIndex);
            let texture = uni.value[i];
            !1 === texture.loaded && (texture = Utils3D.getEmptyTexture()), (void 0 === texture._gl || texture.needsReupload) && Texture.renderer.upload(texture), _gl.activeTexture(_gl["TEXTURE" + shader._gl.texIndex++]), _gl.bindTexture(_gl.TEXTURE_2D, texture._gl)
        }
        _gl.uniform1iv(uLoc, array)
    }
    this.upload = function(shader) {
        if (!shader._gl) {
            shader._gl = {};
            let key = `${shader.vsName}_${shader.fsName}_${shader.customCompile}`,
                cached = _pool[key];
            cached ? (shader._gl.program = cached.program, shader._gl._id = cached.id, cached.count++) : (shader._gl.program = function createProgram(shader) {
                let vsCode = shader.onBeforeCompile(shader.vertexShader, "vs"),
                    fsCode = shader.onBeforeCompile(shader.fragmentShader, "fs");
                RenderCount.add("shader", shader);
                let vs = createShader(vsCode, _gl.VERTEX_SHADER),
                    fs = createShader(fsCode, _gl.FRAGMENT_SHADER);
                Hydra.LOCAL && window.GLSLLinter && GLSLLinter.lint(shader, vsCode, fsCode);
                let program = _gl.createProgram();
                return _gl.attachShader(program, vs), _gl.attachShader(program, fs), _gl.linkProgram(program), Hydra.LOCAL && (_gl.getProgramParameter(program, _gl.LINK_STATUS) || (console.warn(`Shader: ${shader.vsName} | ${shader.vsName}`), console.warn(vsCode), console.warn(fsCode), console.error(`Could not compile WebGL program. ${shader.vsName} ${shader.fsName} \n\n` + _gl.getProgramInfoLog(program)))), _gl.deleteShader(vs), _gl.deleteShader(fs), program
            }(shader), shader._gl._id = _programID++, _pool[key] = {
                count: 1,
                program: shader._gl.program,
                id: shader._gl._id
            })
        }
        setupShaders(shader), shader.ubo && shader.ubo.upload(), shader.vertexShader = shader.fragmentShader = ""
    }, this.findCachedProgram = function(shader) {
        let key = `${shader.vsName}_${shader.fsName}_${shader.customCompile}`,
            cached = _pool[key];
        return !!cached && (shader._gl = {}, shader._gl.program = cached.program, shader._gl._id = cached.id, _uboCache[shader.UILPrefix] && (shader.ubo = shader.UILPrefix), cached.count++, !0)
    }, this.draw = function(shader) {
        void 0 === shader._gl && this.upload(shader), shader._gl.texIndex = 0, shader._gl.program != _cached.program && (_gl.useProgram(shader._gl.program), _cached.program = shader._gl.program), shader.ubo && shader.ubo.bind(shader._gl.program, "ubo"), shader.uboLight && Lighting.bindUBO(shader._gl.program);
        for (let key in shader.uniforms) {
            let uni = shader.uniforms[key];
            void 0 === shader._gl[key] && setupShaders(shader);
            let uLoc = shader._gl[key];
            if (uni && (null === uni.value && (uni.value = Utils3D.getEmptyTexture()), null !== uLoc && -1 !== uLoc && "U" !== uLoc)) {
                if (void 0 === uni.value) throw `Uniform ${key} value is undefined. | ${shader.vsName} ${shader.fsName}`;
                switch (uni.type || (uni.type = "string" == typeof(uniform = uni).type ? uniform.type : null === uniform.value || uniform.value instanceof Texture || uniform.value.texture || uniform.value.rt && uniform.value.rt.texture ? "t" : uniform.value instanceof Vector2 ? "v2" : uniform.value instanceof Vector3 || uniform.value instanceof Vector3D ? "v3" : uniform.value instanceof Vector4 ? "v4" : uniform.value instanceof Matrix4 ? "m4" : uniform.value instanceof Matrix3 ? "m3" : uniform.value instanceof Color ? "c" : uniform.value instanceof Quaternion ? "q" : Array.isArray(uniform.value) && uniform.value[0] instanceof Texture ? "tv" : "f"), uni.type) {
                    case "f":
                        _gl.uniform1f(uLoc, uni.value);
                        break;
                    case "v2":
                        _gl.uniform2f(uLoc, uni.value.x, uni.value.y);
                        break;
                    case "v3":
                        _gl.uniform3f(uLoc, uni.value.x, uni.value.y, uni.value.z);
                        break;
                    case "c":
                        _gl.uniform3f(uLoc, uni.value.r, uni.value.g, uni.value.b);
                        break;
                    case "q":
                    case "v4":
                        _gl.uniform4f(uLoc, uni.value.x, uni.value.y, uni.value.z, uni.value.w);
                        break;
                    case "v3v":
                        _gl.uniform3fv(uLoc, toTypedArray(uni));
                        break;
                    case "v4v":
                        _gl.uniform4fv(uLoc, toTypedArray(uni));
                        break;
                    case "v2v":
                        _gl.uniform2fv(uLoc, toTypedArray(uni));
                        break;
                    case "fv":
                        _gl.uniform1fv(uLoc, toTypedArray(uni));
                        break;
                    case "m4":
                        _gl.uniformMatrix4fv(uLoc, !1, uni.value.elements);
                        break;
                    case "m3":
                        _gl.uniformMatrix3fv(uLoc, !1, uni.value.elements);
                        break;
                    case "tv":
                        uniformTextureArray(uni, uLoc, shader);
                        break;
                    case "t":
                        let texture = uni.value;
                        texture.isTexture || (uni.value.rt && (texture = uni.value.rt.overrideTexture || uni.value.rt.texture), uni.value.texture && (texture = uni.value.texture)), !1 === texture.loaded && (texture = Utils3D.getEmptyTexture());
                        let texIndex = shader._gl.texIndex++;
                        uni.value.vrRT && (shader._gl.vrRT = !0, uni.value._glTexIndex = texIndex), Texture.renderer.draw(texture, uLoc, key, texIndex)
                }
            }
        }
        var uniform;
        if (shader.polygonOffset) {
            let key = shader.polygonOffsetFactor + "_" + shader.polygonOffsetUnits;
            _cached.polygonOffset != key && (_gl.enable(_gl.POLYGON_OFFSET_FILL), _gl.polygonOffset(shader.polygonOffsetFactor, shader.polygonOffsetUnits)), _cached.polygonOffset = key
        } else _cached.polygonOffset && _gl.disable(_gl.POLYGON_OFFSET_FILL), _cached.polygonOffset = !1;
        if (shader.transparent ? (_cached.transparent || _gl.enable(_gl.BLEND), _cached.transparent = !0) : (_cached.transparent && _gl.disable(_gl.BLEND), _cached.transparent = !1), _cached.blending != shader.blending) {
            switch (shader.blending) {
                case Shader.ADDITIVE_BLENDING:
                    _gl.blendEquation(_gl.FUNC_ADD), _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    break;
                default:
                    _gl.blendEquationSeparate(_gl.FUNC_ADD, _gl.FUNC_ADD), _gl.blendFuncSeparate(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA)
            }
            _cached.blending = shader.blending
        }
        switch (shader.depthTest ? (_cached.depthTest || _gl.enable(_gl.DEPTH_TEST), _cached.depthTest = !0) : (_cached.depthTest && _gl.disable(_gl.DEPTH_TEST), _cached.depthTest = !1), shader.side) {
            case Shader.BACK_SIDE:
                _cached.side != Shader.BACK_SIDE && (_gl.enable(_gl.CULL_FACE), _gl.cullFace(_gl.FRONT), _cached.side = Shader.BACK_SIDE);
                break;
            case Shader.DOUBLE_SIDE:
                _cached.side != Shader.DOUBLE_SIDE && (_gl.disable(_gl.CULL_FACE), _cached.side = Shader.DOUBLE_SIDE);
                break;
            default:
                _cached.side != Shader.FRONT_SIDE && (_gl.enable(_gl.CULL_FACE), _gl.cullFace(_gl.BACK), _cached.side = Shader.FRONT_SIDE)
        }
        switch (_cached.depthMask != shader.depthWrite && (_gl.depthMask(!!shader.depthWrite), _cached.depthMask = shader.depthWrite), shader.colorMask) {
            case Shader.COLOR_MASK_NONE:
                _cached.colorMask != shader.colorMask && (_gl.colorMask(!0, !0, !0, !0), _cached.colorMask = shader.colorMask);
                break;
            case Shader.COLOR_MASK_RGB:
                _cached.colorMask != shader.colorMask && (_gl.colorMask(!1, !1, !1, !0), _cached.colorMask = shader.colorMask);
                break;
            case Shader.COLOR_MASK_RGBA:
                _cached.colorMask != shader.colorMask && (_gl.colorMask(!1, !1, !1, !1), _cached.colorMask = shader.colorMask)
        }
    }, this.destroy = function(shader) {
        delete shader._gl, shader.ubo && shader.ubo.destroy()
    }, this.appendUniform = function(shader, key, value, hint) {
        let loc = shader._gl[key];
        if (void 0 === loc && (loc = loc = _gl.getUniformLocation(shader._gl.program, key)), null !== loc)
            if (value.isMatrix4) _gl.uniformMatrix4fv(loc, !1, value.elements);
            else if (value.isMatrix3) _gl.uniformMatrix3fv(loc, !1, value.elements);
        else if (value.isVector3) _gl.uniform3f(loc, value.x, value.y, value.z);
        else if (value.isVector2) _gl.uniform2f(loc, value.x, value.y);
        else if (value instanceof Float32Array) switch (hint) {
            case "matrix":
                _gl.uniformMatrix4fv(loc, !1, value);
                break;
            case "float":
                _gl.uniform1fv(loc, value);
                break;
            case "vec3":
                _gl.uniform3fv(loc, value)
        } else if (Array.isArray(value)) {
            let array = shader._gl.texArray || [];
            array.length = 0, shader._gl.texArray = array;
            for (let i = 0; i < value.length; i++) array.push(shader._gl.texIndex), _gl.activeTexture(_gl["TEXTURE" + shader._gl.texIndex++]), _gl.bindTexture(_gl.TEXTURE_2D, value[i]._gl);
            _gl.uniform1iv(loc, array)
        } else _gl.uniform1f(loc, value)
    }, this.resetState = function() {
        _cached.depthMask || (_gl.depthMask(!0), _cached.depthMask = !0), _cached.depthTest || _gl.enable(_gl.DEPTH_TEST), _cached.depthTest = !0, _cached.colorMask != Shader.COLOR_MASK_NONE && (_gl.colorMask(!0, !0, !0, !0), _cached.colorMask = Shader.COLOR_MASK_NONE), _cached.program = null
    }, this.clearState = function() {
        _cached = {}
    }
})), Class((function TextureRendererWebGL(_gl) {
    const _this = this;
    var _state = {};
    const DATA = new Uint8Array([0, 0, 0, 0]),
        {
            getFormat: getFormat,
            getProperty: getProperty,
            getType: getType,
            getFloatParams: getFloatParams
        } = require("GLTypes");

    function setTextureParams(texture, textureType = _gl.TEXTURE_2D) {
        let format = getFormat(texture);
        textureType != _gl.TEXTURE_2D || texture.compressed || _gl.texImage2D(textureType, 0, format, 1, 1, 0, format, _gl.UNSIGNED_BYTE, DATA), _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, getProperty(texture.wrapS)), _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, getProperty(texture.wrapT)), _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, getProperty(texture.magFilter)), _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, getProperty(texture.minFilter)), texture.data || texture.format != Texture.RGBAFormat ? 1 == _state.premultiply && (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _state.premultiply = !1) : !1 === texture.premultiplyAlpha ? (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _state.premultiply = !1) : (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), _state.premultiply = !0), texture.anisotropy > 1 && _gl.texParameterf(_gl.TEXTURE_2D, Renderer.extensions.anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, texture.anisotropy)
    }
    this.draw = function(texture, loc, key, id) {
        if ((void 0 === texture._gl || texture.needsReupload) && this.upload(texture), _gl.activeTexture(_gl["TEXTURE" + id]), texture.cube) _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, texture._gl);
        else {
            let texType = texture.EXT_OES ? _gl.TEXTURE_EXTERNAL_OES : _gl.TEXTURE_2D;
            _gl.bindTexture(texType, texture._gl)
        }
        _gl.uniform1i(loc, id), (texture.dynamic || texture.needsUpdate) && function updateDynamic(texture) {
            if (texture.isDataTexture) {
                if (!0 === texture.flipY ? _state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0) : _state.flipY && (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !1), _state.flipY = !1), _state.premultiply && (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _state.premultiply = !1), !texture.glFormat) {
                    let {
                        format: format,
                        type: type
                    } = getFloatParams(texture);
                    texture.glFormat = format, texture.glType = type
                }
                _gl.texSubImage2D(_gl.TEXTURE_2D, 0, 0, 0, texture.width, texture.height, texture.glFormat, texture.glType, texture.data)
            } else _state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0), texture.format == Texture.RGBAFormat ? !1 === texture.premultiplyAlpha ? (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _state.premultiply = !1) : (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), _state.premultiply = !0) : _state.premultiply && (_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _state.premultiply = !1), texture.glFormat || (texture.glFormat = getFormat(texture)), _gl.texImage2D(_gl.TEXTURE_2D, 0, texture.glFormat, texture.glFormat, getType(texture), texture.image)
        }(texture), texture.needsUpdate = !1
    }, this.upload = function(texture) {
        if (texture._gl && !texture.needsReupload && !texture.needsUpdate) return;
        let format = getFormat(texture);
        if (RenderCount.add("texture"), texture.distributeTextureData || RenderCount.add("tex_upload", texture), texture.cube) {
            if (6 != texture.cube.length) throw "Cube texture requires 6 images";
            return function uploadCube(texture) {
                void 0 === texture._gl && (texture._gl = _gl.createTexture(), _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, texture._gl), _state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0), setTextureParams(texture, _gl.TEXTURE_CUBE_MAP));
                let format = getFormat(texture);
                for (let i = 0; i < 6; i++) _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, format, format, getType(texture), texture.cube[i]);
                _gl.generateMipmap(_gl.TEXTURE_CUBE_MAP), texture.needsUpdate = texture.needsReupload = !1, texture.onUpdate && texture.onUpdate()
            }(texture)
        }
        let texType = texture.EXT_OES ? _gl.TEXTURE_EXTERNAL_OES : _gl.TEXTURE_2D;
        if (void 0 === texture._gl ? (texture._gl = _gl.createTexture(), _gl.bindTexture(texType, texture._gl), setTextureParams(texture, texType)) : _gl.bindTexture(texType, texture._gl), texture.isDataTexture || texture.type && texture.type.includes("float")) {
            !0 === texture.flipY ? _state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0) : _state.flipY && (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !1), _state.flipY = !1), _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, 1);
            let {
                internalformat: internalformat,
                format: format,
                type: type
            } = getFloatParams(texture);
            if ("ie" === Device.system.browser) try {
                _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, texture.width, texture.height, 0, format, type, texture.distributeTextureData ? null : texture.data)
            } catch (e) {
                console.log(e)
            } else _gl.texImage2D(_gl.TEXTURE_2D, 0, internalformat, texture.width, texture.height, 0, format, type, texture.distributeTextureData ? null : texture.data)
        } else if (_state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0), texture.image && texture.compressed) {
            let data = texture.image.compressedData;
            for (let i = 0; i < data.length; i++) {
                let size = texture.image.sizes[i];
                _gl.compressedTexImage2D(_gl.TEXTURE_2D, i, texture.image.gliFormat, size, size, 0, data[i])
            }
            data.length = 0
        } else if (texture.image && !(texture.image instanceof HTMLVideoElement)) try {
            _gl.texImage2D(_gl.TEXTURE_2D, 0, format, format, getType(texture), texture.image)
        } catch (e) {
            console.log("error loading texture", e, texture.image)
        }(texture.image || texture.data) && texture.generateMipmaps && !texture.compressed && _gl.generateMipmap(_gl.TEXTURE_2D), texture.needsUpdate = texture.needsReupload = !1, texture.onUpdate && texture.onUpdate()
    }, this.uploadAsync = function(texture) {
        let {
            format: format,
            type: type
        } = getFloatParams(texture);
        if (texture._uploadAsyncPromise) return texture._uploadAsyncPromise;
        texture._uploadAsyncPromise = Promise.create(), RenderCount.add("tex_uploadAsync", texture), texture._gl || (texture.distributeTextureData = !0, _this.upload(texture));
        let pixelsPerChunk = texture.height / 4,
            dataPerChunk = texture.data.length / 4,
            i = 0,
            worker = new Render.Worker((function workerUploadAsync() {
                let pixelOffset = pixelsPerChunk * i,
                    dataOffset = dataPerChunk * i,
                    subarray = texture.data.subarray(dataOffset, dataOffset + dataPerChunk);
                !0 === texture.flipY ? _state.flipY || (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !0), _state.flipY = !0) : _state.flipY && (_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, !1), _state.flipY = !1), _gl.bindTexture(_gl.TEXTURE_2D, texture._gl), _gl.texSubImage2D(_gl.TEXTURE_2D, 0, 0, pixelOffset, texture.width, pixelsPerChunk, format, type, subarray), _gl.bindTexture(_gl.TEXTURE_2D, null), 4 == ++i && (worker.stop(), texture._uploadAsyncPromise.resolve())
            }));
        return texture._uploadAsyncPromise
    }, this.destroy = function(texture) {
        texture._gl && (_gl.deleteTexture(texture._gl), RenderCount.remove("texture"), RenderCount.add("tex_destroy", texture)), delete texture._gl
    }
}));
class RenderTarget {
    constructor(width, height, options = {}) {
        this.width = width, this.height = height, this.viewport = new Vector2(0, 0), void 0 === options.minFilter && (options.minFilter = Texture.LINEAR), this.texture = new Texture(null), this.texture.generateMipmaps = options.generateMipmaps, this.texture.width = width, this.texture.height = height, this.texture.minFilter = options.minFilter || Texture.LINEAR, this.texture.magFilter = options.magFilter || Texture.LINEAR, this.texture.wrapS = options.wrapS || Texture.CLAMP_TO_EDGE, this.texture.wrapT = options.wrapT || Texture.CLAMP_TO_EDGE, this.texture.format = options.format || Texture.RGBFormat, options.type && (this.texture.type = options.type), this.isRT = !0
    }
    setSize(width, height) {
        this.width = width, this.height = height, this.texture.width = width, this.texture.height = height, this.viewport.set(0, 0), RenderTarget.renderer.resize(this)
    }
    clone() {
        return (new RenderTarget).copy(this)
    }
    copy(source) {
        return this.width = source.width, this.height = source.height, this.viewport.copy(source.viewport), this.texture = source.texture.clone(), this
    }
    createDepthTexture() {
        return this.depth = new Texture(null), this.depth.generateMipmaps = !1, this.depth.minFilter = Texture.NEAREST, this.depth.magFilter = Texture.NEAREST, this.depth.wrapS = Texture.CLAMP_TO_EDGE, this.depth.wrapT = Texture.CLAMP_TO_EDGE, this.depth
    }
    destroy() {
        RenderTarget.renderer.destroy(this)
    }
    upload() {
        this._gl || RenderTarget.renderer.upload(this)
    }
}
class MultiRenderTarget extends RenderTarget {
    constructor(width, height, options = {}) {
        super(width, height, options), this.multi = !0, this.attachments = [this.texture]
    }
}
class CubeRenderTarget extends RenderTarget {
    constructor(width, height, options = {}) {
        super(width, height, options), this.activeFace = 0, this.cube = !0
    }
}
Class((function Shader(_vertexShader, _fragmentShader, _params, _onBeforeBuild, _postfix) {
    const _this = this;
    this.uniforms = {}, this.side = Shader.FRONT_SIDE, this.blending = Shader.NORMAL_BLENDING, this.colorMask = Shader.COLOR_MASK_NONE, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 1, this.depthTest = !0, this.depthWrite = !0, this.wireframe = !1, this.transparent = !1, this.visible = !0, this.persists = !1, this.precision = "high", this.customCompile = "", "string" != typeof _fragmentShader && (_params = _fragmentShader, _fragmentShader = _vertexShader), _params = _params || {}, _this.vsParam = _vertexShader, _this.fsParam = _fragmentShader, _this.params = _params, _this.vsName = _vertexShader, _this.fsName = (_fragmentShader || _vertexShader) + (_postfix || ""), _params.vsName && (_this.vsName = _params.vsName, delete _params.vsName), _params.precision && (_this.precision = _params.precision), _params.receiveShadow && (_this.receiveLight = !0, World.RENDERER.shadows && (_this.precision = "high"));
    let vs = _vertexShader,
        fs = _fragmentShader;
    _params.uilFrom && (vs = _params.uilFrom, fs = _params.uilFrom, delete _params.uilFrom), _this.UILPrefix = _params.UILPrefix || `${vs}/${fs}/${_params.unique?_params.unique+"/":""}`, Shader.parseParams(_params, _this), Shader.renderer.findCachedProgram(_this) || (_this.vertexShader = Shader.process(Shaders.getShader(_vertexShader + ".vs"), "vs", _this, _onBeforeBuild), _this.fragmentShader = Shader.process(Shaders.getShader(_fragmentShader + ".fs"), "fs", _this, _onBeforeBuild))
}), _ => {
    Shader.FRONT_SIDE = "shader_front_side", Shader.BACK_SIDE = "shader_back_side", Shader.DOUBLE_SIDE = "shader_double_side", Shader.ADDITIVE_BLENDING = "shader_additive_blending", Shader.NORMAL_BLENDING = "shader_normal_blending", Shader.CUSTOM_DEPTH = "shader_custom_depth", Shader.COLOR_MASK_RGB = "shader_colormask_rgb", Shader.COLOR_MASK_RGBA = "shader_colormask_rgba", Shader.COLOR_MASK_NONE = "shader_colormask_none", Shader.parseParams = function(_params, _this) {
        for (let key in _params)
            if ("receiveShadow" == key) _this.receiveShadow = _params[key];
            else if ("receiveLight" == key) _this.receiveLight = _params[key];
        else if (_params[key] && void 0 !== _params[key].value) window.UILStorage ? (_this.uniforms[key] = UILStorage.parse(_this.UILPrefix + key, _params[key].value) || _params[key], _params[key].ubo && (_this.uniforms[key].ubo = !0)) : _this.uniforms[key] = _params[key];
        else {
            if ("unique" == key) continue;
            _this[key] = _params[key]
        }
    }, Shader.process = function(code, type, _this, _onBeforeBuild) {
        const WEBGL2 = Renderer.type == Renderer.WEBGL2;
        if (!code) throw "No shader found! " + _this.vsName + " | " + _this.fsName;
        const externalOES = code.includes("samplerExternalOES") && window.AURA && "android" == Device.system.os,
            standardDeriv = !WEBGL2 && code.includes(["fwidth", "dFdx"]),
            drawBuffers = !WEBGL2 && code.includes(["gl_FragData", "#drawbuffer"]) && window.World && World.NUKE.useDrawBuffers;
        return header = "vs" == type ? ["#version 300 es", externalOES ? "#extension GL_OES_EGL_image_external_essl3 : require" : "", `precision ${_this.precision}p float;`, `precision ${_this.precision}p int;`, "attribute vec2 uv;", "attribute vec3 position;", "attribute vec3 normal;", "uniform mat3 normalMatrix;", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform global {", "mat4 projectionMatrix;", "mat4 viewMatrix;", "vec3 cameraPosition;", "vec2 resolution;", "float time;", "float timeScale;", "};"].join("\n") : ["#version 300 es", externalOES ? "#extension GL_OES_EGL_image_external_essl3 : require" : "", standardDeriv ? "#extension GL_OES_standard_derivatives : enable" : "", drawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", `precision ${_this.precision}p float;`, `precision ${_this.precision}p int;`, "uniform mat3 normalMatrix;", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform global {", "mat4 projectionMatrix;", "mat4 viewMatrix;", "vec3 cameraPosition;", "vec2 resolution;", "float time;", "float timeScale;", "};", "out vec4 FragColor;"].join("\n"), header += "\n__ACTIVE_THEORY_LIGHTS__\n\n", window.AURA && (header += "#define AURA\n"), _onBeforeBuild && (code = _onBeforeBuild(code, type)), code = header + code
    };
    const prototype = Shader.prototype;
    var _emptyShadowMap;
    prototype.copyUniformsTo = function(shader, linked) {
        if (linked) shader.uniforms = this.uniforms;
        else
            for (let key in this.uniforms) shader.uniforms[key] = {
                type: this.uniforms[key].type,
                value: this.uniforms[key].value
            }
    }, prototype.addUniforms = function(uniforms) {
        uniforms.UILPrefix && (this.UILPrefix = uniforms.UILPrefix, delete uniforms.UILPrefix);
        for (let key in uniforms) this.uniforms[key] = uniforms[key]
    }, prototype.draw = function(mesh, geom) {
        this.receiveLight && !this.__lighting && Lighting.getLighting(this), Shader.renderer.draw(this, mesh, geom)
    }, prototype.upload = function(mesh, geom) {
        let p = this.mesh,
            scene = World.SCENE;
        for (; p;) p instanceof Scene && (scene = p), p = p._parent;
        scene.nuke && scene.nuke.onBeforeShaderCompile(this.mesh), Shader.renderer.upload(this, mesh, geom), this.receiveShadow && !this.shadow && Lighting.initShadowShader(this, mesh)
    }, prototype.destroy = function() {
        this.persists || (Shader.renderer.destroy(this), this.shadow && this.shadow.destroy()), this.receiveLight && Lighting.destroyShader(this)
    }, prototype.onBeforeCompile = function(code, type) {
        const WEBGL2 = Renderer.type == Renderer.WEBGL2;
        this.receiveShadow && (this.receiveLight = !0);
        let replace, varyings = [];
        (code = code.split("\n")).forEach((line, index) => {
            "fs" == type && line.includes("#drawbuffer") && (line.includes("#drawbuffer Color") ? code[index] = line.replace("#drawbuffer Color", "") : code[index] = ""), line.includes("varying") && varyings.push(line)
        }), code = code.join("\n"), varyings.length && varyings.forEach(varying => {
            let count = 0;
            varyings.forEach(v2 => {
                varying == v2 && count++
            }), count > 1 && (replace || (replace = []), replace.includes(varying) || replace.push(varying))
        }), replace && replace.forEach(varying => {
            let index = code.lastIndexOf(varying);
            code = code.substring(0, index) + code.substring(index + varying.length)
        }), "fs" == type && (WEBGL2 ? code.includes("gl_FragColor") && (code = code.replace(/gl_FragColor/g, "FragColor")) : code.includes("#applyShadow") && (code = code.replace("#applyShadow", ""))), code = code.replace("__ACTIVE_THEORY_LIGHTS__", function getLightingCode(_this) {
            if (!_this.receiveLight || _this.isShadow) return "";
            let numLights = Lighting.getLighting(_this).position.length / 4;
            return 0 == numLights ? Lighting.getShadowUniforms(_this) : ["#define NUM_LIGHTS " + numLights, "uniform lights {", `vec4 lightPos[${numLights}];`, `vec4 lightColor[${numLights}];`, `vec4 lightData[${numLights}];`, `vec4 lightData2[${numLights}];`, `vec4 lightData3[${numLights}];`, `vec4 lightProperties[${numLights}];`, "};"].join("\n") + Lighting.getShadowUniforms(_this)
        }(this)), "fs" == type && code.includes("SHADOW_MAPS") && (code = require("GLSLOptimizer")(code.replace("SHADOW_COUNT", Lighting.getShadowCount(this)))), this.preCompile && (code = this.preCompile(code, type));
        let converter = require("ShaderCode");
        return code = WEBGL2 ? converter.convertWebGL2(code, type) : converter.convertWebGL1(code)
    }, prototype.set = function(key, value, ref) {
        let _this = ref || this;
        return _this.uniforms[key] ? (void 0 !== value && (TweenManager.clearTween(_this.uniforms[key]), _this.uniforms[key].value = value, _this.ubo && (_this.ubo.needsUpdate = !0)), _this.uniforms[key].value) : console.warn(`No key ${key} found on shader`, _this)
    }, prototype.get = function(key, ref) {
        return (ref || this).uniforms[key].value
    }, prototype.tween = function(key, value, time, ease, delay, callback, update, scaledTime) {
        return "number" == typeof value ? tween(this.uniforms[key], {
            value: value
        }, time, ease, delay, callback, update, null, scaledTime) : tween(this.uniforms[key].value, value, time, ease, delay, callback, update, null, scaledTime)
    }, prototype.clone = function(noShadows, postfix) {
        const _this = this;
        noShadows && (_this.params.receiveShadow = !1);
        let shader = new Shader(_this.vsParam, _this.fsParam, _this.params, null, postfix);
        for (let key in _this) key.includes(["vsName", "fsName", "uniforms"]) || "function" == typeof _this[key] || (shader[key] = _this[key]);
        for (let key in _this.uniforms) shader.uniforms[key] = {
            type: _this.uniforms[key].type,
            value: _this.uniforms[key].value
        };
        return shader
    }, prototype.resetProgram = function() {
        this.destroy(), this.vertexShader = this.restoreVS || Shader.process(Shaders.getShader(this.vsName + ".vs"), "vs", this), this.fragmentShader = this.restoreFS || Shader.process(Shaders.getShader(this.fsName + ".fs"), "fs", this)
    }, Object.defineProperty(prototype, "receiveShadow", {
        set: function(v) {
            this._receiveShadow = v, v && (_emptyShadowMap || (_emptyShadowMap = [Utils3D.getEmptyTexture()]), this.uniforms.shadowMap = {
                value: _emptyShadowMap
            })
        },
        get: function() {
            return this._receiveShadow
        }
    })
});
class Texture {
    constructor(img) {
        this.magFilter = Texture.LINEAR, this.minFilter = Texture.LINEAR_MIPMAP, this.format = Texture.RGBAFormat, this.wrapS = this.wrapT = Texture.CLAMP_TO_EDGE, this._image = img, this.needsUpdate = !0, this.generateMipmaps = !0, this.anisotropy = 1, this.type = Texture.UNSIGNED_BYTE, this.isTexture = !0, img && img.onCreateTexture && img.onCreateTexture(this)
    }
    set image(img) {
        this._image = img, img && img.onCreateTexture && img.onCreateTexture(this)
    }
    get image() {
        return this._image
    }
    upload() {
        this._gl || Texture.renderer.upload(this)
    }
    destroy() {
        Texture.renderer.destroy(this), this._image = null
    }
    clone() {
        let texture = new Texture(this.img);
        return texture.format = this.format, texture.type = this.type, texture.anisotropy = this.anisotropy, texture.wrapS = this.wrapS, texture.wrapT = this.wrapT, texture.generateMipmaps = this.generateMipmaps, texture.minFilter = this.minFilter, texture.magFilter = this.magFilter, texture
    }
}
class DataTexture extends Texture {
    constructor(data, width, height, format, type) {
        super(), format && (this.format = format), this.width = width, this.height = height, this.data = data, this.minFilter = this.magFilter = Texture.NEAREST, this.generateMipmaps = !1, this.type = type || Texture.FLOAT, this.isDataTexture = !0
    }
    uploadAsync() {
        return Texture.renderer.uploadAsync(this)
    }
}
Texture.NEAREST = "texture_nearest", Texture.CLAMP_TO_EDGE = "texture_clamp", Texture.REPEAT = "texture_repeat", Texture.MIRROR_REPEAT = "texture_mirror_repeat", Texture.LINEAR = "texture_linear", Texture.LINEAR_MIPMAP = "texture_linear_mip", Texture.LINEAR_MIPMAP_NEAREST = "texture_linear_mip_nearest", Texture.NEAREST_MIPMAP = "texture_nearest_mip", Texture.RGBFormat = "texture_rgbFormat", Texture.RGBAFormat = "texture_rgbaFormat", Texture.UNSIGNED_BYTE = "texture_unsigned_byte", Texture.DEPTH = "texture_depth", Texture.FLOAT = "texture_float", Texture.HALF_FLOAT = "texture_half_float", Module((function GLSLOptimizer() {
    this.exports = function(code) {
        return function unrollLoops(string) {
            return string.replace(/#pragma unroll_loop[\s]+?for \(int i \= (\d+)\; i < (\d+)\; i\+\+\) \{([\s\S]+?)(?=\})\}/g, (function replace(match, start, end, snippet) {
                let unroll = "";
                for (let i = parseInt(start); i < parseInt(end); i++) unroll += snippet.replace(/\[i\]/g, "[" + i + "]");
                return unroll
            }))
        }(code)
    }
})), Module((function GLTypes() {
    function getType(texture) {
        let _gl = Renderer.context;
        switch (texture.type) {
            case Texture.FLOAT:
                return _gl.FLOAT;
            case Texture.HALF_FLOAT:
                return Renderer.type == Renderer.WEBGL2 ? _gl.HALF_FLOAT : Renderer.extensions.halfFloat.HALF_FLOAT_OES;
            default:
                return _gl.UNSIGNED_BYTE
        }
    }
    this.exports = {
        getFormat: function getFormat(texture) {
            let _gl = Renderer.context;
            return texture.format == Texture.RGBAFormat ? _gl.RGBA : _gl.RGB
        },
        getProperty: function getProperty(property) {
            let _gl = Renderer.context;
            switch (property) {
                case Texture.NEAREST:
                    return _gl.NEAREST;
                case Texture.LINEAR:
                    return _gl.LINEAR;
                case Texture.LINEAR_MIPMAP:
                    return _gl.LINEAR_MIPMAP_LINEAR;
                case Texture.NEAREST_MIPMAP:
                    return _gl.NEAREST_MIPMAP_LINEAR;
                case Texture.LINEAR_MIPMAP_NEAREST:
                    return _gl.LINEAR_MIPMAP_NEAREST;
                case Texture.CLAMP_TO_EDGE:
                    return _gl.CLAMP_TO_EDGE;
                case Texture.REPEAT:
                    return _gl.REPEAT;
                case Texture.MIRROR_REPEAT:
                    return _gl.MIRRORED_REPEAT
            }
        },
        getType: getType,
        getFloatParams: function getFloatParams(texture) {
            let _gl = Renderer.context;
            return {
                internalformat: function() {
                    if (Renderer.type == Renderer.WEBGL2) {
                        switch (texture.type) {
                            case Texture.HALF_FLOAT:
                                return texture.format == Texture.RGBAFormat ? _gl.RGBA16F : _gl.RGB16F;
                            case Texture.FLOAT:
                                return texture.format == Texture.RGBAFormat ? _gl.RGBA32F : _gl.RGB32F
                        }
                        return texture.format == Texture.RGBAFormat ? _gl.RGBA : _gl.RGB
                    }
                    return texture.format == Texture.RGBAFormat ? _gl.RGBA : _gl.RGB
                }(),
                format: texture.format == Texture.RGBAFormat ? _gl.RGBA : _gl.RGB,
                type: getType(texture)
            }
        }
    }
})), Module((function ShaderCode() {
    function removeUBO(code, name) {
        let uniforms = code.split(`uniform ${name} {`)[1];
        uniforms = uniforms.split("};")[0], uniforms = uniforms.split("\n"), uniforms.forEach(u => {
            u.length && (code = code.replace(u, "uniform " + u))
        });
        let split = code.split(`uniform ${name} {`);
        return split[1] = split[1].replace("};", ""), code = (code = split.join("")).replace(`uniform ${name} {`, "")
    }
    this.exports = {
        convertWebGL1: function convertWebGL1(code) {
            return (code = (code = code.replace("#version 300 es", "")).replace("out vec4 FragColor;", "")).includes("samplerExternalOES") && (code = code.replace("samplerExternalOES", "sampler2D")), code.includes("uniform global {") && (code = removeUBO(code, "global")), code.includes("uniform ubo {") && (code = removeUBO(code, "ubo")), code.includes("uniform lights {") && (code = removeUBO(code, "lights")), code
        },
        convertWebGL2: function convertWebGL2(code, type) {
            return code = code.replace(/texture2D/g, "texture"), !(code = "vs" == type ? (code = code.replace(/attribute/g, "in")).replace(/varying/g, "out") : (code = code.replace(/varying/g, "in")).replace(/textureCube/g, "texture")).includes("samplerExternalOES") || "android" == Device.system.os && window.AURA || (code = code.replace("samplerExternalOES", "sampler2D")), Renderer.UBO ? (code.includes("uniform global {") && (code = code.replace("uniform global", "layout(std140) uniform global")), code.includes("uniform ubo {") && (code = code.replace("uniform ubo", "layout(std140) uniform ubo")), Lighting.UBO ? code.includes("uniform lights {") && (code = code.replace("uniform lights", "layout(std140) uniform lights")) : code.includes("uniform lights {") && (code = removeUBO(code, "lights"))) : (code.includes("uniform global {") && (code = removeUBO(code, "global")), code.includes("uniform ubo {") && (code = removeUBO(code, "ubo")), code.includes("uniform lights {") && (code = removeUBO(code, "lights"))), code
        }
    }
}));
class UBO {
    constructor(location, gl = Renderer.context) {
        this.gl = gl, this.arrays = [];
        for (let i = 0; i < 30; i++) this.arrays.push([]);
        this.arrayIndex = 0, this.objects = [], this.location = location, this.data = null, this.lastUpdate = 0
    }
    _getSize(uniform) {
        let obj = uniform.value;
        return Array.isArray(obj) ? uniform.components ? obj.length / uniform.components * 16 : 16 * obj.length : obj instanceof Vector2 ? 8 : obj instanceof Vector3 || obj instanceof Vector4 || obj instanceof Color ? 16 : obj instanceof Matrix4 ? 64 : obj instanceof Matrix3 ? 48 : obj instanceof Quaternion ? 16 : 4
    }
    _getValues(uniform) {
        let obj = uniform.value;
        return Array.isArray(obj) ? obj : obj instanceof Vector2 ? this._array(obj.x, obj.y) : obj instanceof Vector3 ? this._array(obj.x, obj.y, obj.z) : obj instanceof Matrix4 || obj instanceof Matrix3 ? obj.elements : obj instanceof Color ? this._array(obj.r, obj.g, obj.b) : obj instanceof Quaternion ? this._array(obj.x, obj.y, obj.z, obj.w) : this._array(obj)
    }
    _array() {
        this.arrayIndex++ >= this.arrays.length - 1 && (this.arrayIndex = 0);
        let array = this.arrays[this.arrayIndex];
        return array.length = 0, array.push.apply(array, arguments), array
    }
    clear() {
        for (let i = 0; i < this.arrays.length; i++) this.arrays[i].length = 0
    }
    calculate() {
        let len = this.objects.length,
            chunk = 16,
            tsize = 0,
            offset = 0,
            size = 0;
        for (let i = 0; i < len; i++) {
            let obj = this.objects[i];
            size = this._getSize(obj), tsize = chunk - size, tsize < 0 && chunk < 16 ? (offset += chunk, i > 0 && (this.objects[i - 1].chunkLen += chunk), chunk = 16) : tsize < 0 && 16 == chunk || (0 == tsize ? chunk = 16 : chunk -= size), obj.offset = offset / 4, obj.chunkLen = size / 4, obj.dataLen = size / 4, offset += size
        }
        return offset % 16 != 0 && (this.objects[this.objects.length - 1].chunkLen += chunk / 4, offset += chunk), offset / 4
    }
    compileData() {
        let i, array = this._array(),
            len = this.calculate();
        for (i = 0; i < len; i++) array[i] = 0;
        for (i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i],
                values = this._getValues(obj);
            for (let j = 0; j < values.length; j++) array[obj.offset + j] = values[j]
        }
        return array
    }
    upload() {
        if (this.data) return;
        let gl = Renderer.context,
            array = this.compileData();
        array.length && (this.data = new Float32Array(array), this.buffer = gl.createBuffer(), gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer), gl.bufferData(gl.UNIFORM_BUFFER, this.data, gl.DYNAMIC_DRAW), gl.bindBuffer(gl.UNIFORM_BUFFER, null), gl.bindBufferBase(gl.UNIFORM_BUFFER, this.location, this.buffer))
    }
    bind(program, name) {
        this.data || this.upload(), this.needsUpdate && this.update();
        let location, gl = Renderer.context;
        location = program == this.lastProgram && name == this.lastName && void 0 !== this.lastLocation ? this.lastLocation : gl.getUniformBlockIndex(program, name), location > 99999 || -1 == location || (gl.uniformBlockBinding(program, location, this.location), gl.bindBufferBase(gl.UNIFORM_BUFFER, this.location, this.buffer), this.lastProgram = program, this.lastName = name, this.lastLocation = location)
    }
    update() {
        if (this.data || this.upload(), !this.data) return;
        let gl = Renderer.context,
            array = this.compileData();
        this.data.set(array), gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer), gl.bufferSubData(gl.UNIFORM_BUFFER, 0, this.data), gl.bindBuffer(gl.UNIFORM_BUFFER, null), this.needsUpdate = !1
    }
    unbind() {}
    push() {
        if (this.data) throw "Can't modify UBO after initial upload!";
        for (let i = 0; i < arguments.length; i++) this.objects.push(arguments[i])
    }
    destroy() {
        this.gl.deleteBuffer(this.buffer)
    }
}
class VAO {
    constructor(gl) {
        this.gl = gl, this.WEBGL2 = Renderer.type == Renderer.WEBGL2, this.WEBGL2 ? this.vao = gl.createVertexArray() : this.vao = Renderer.extensions.VAO.createVertexArrayOES()
    }
    bind() {
        const gl = this.gl;
        this.WEBGL2 ? gl.bindVertexArray(this.vao) : Renderer.extensions.VAO.bindVertexArrayOES(this.vao)
    }
    unbind() {
        const gl = this.gl;
        this.WEBGL2 ? gl.bindVertexArray(null) : Renderer.extensions.VAO.bindVertexArrayOES(null)
    }
    destroy() {
        const gl = this.gl;
        this.WEBGL2 ? gl.deleteVertexArray(this.vao) : Renderer.extensions.VAO.deleteVertexArrayOES(this.vao), this.vao = null
    }
}
class BoxGeometry extends Geometry {
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
        super(), widthSegments = Math.floor(widthSegments), heightSegments = Math.floor(heightSegments), depthSegments = Math.floor(depthSegments);
        let indices = [],
            vertices = [],
            normals = [],
            uvs = [],
            numberOfVertices = 0;

        function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
            let ix, iy, segmentWidth = width / gridX,
                segmentHeight = height / gridY,
                widthHalf = width / 2,
                heightHalf = height / 2,
                depthHalf = depth / 2,
                gridX1 = gridX + 1,
                gridY1 = gridY + 1,
                vertexCounter = 0,
                vector = new Vector3;
            for (iy = 0; iy < gridY1; iy++) {
                let y = iy * segmentHeight - heightHalf;
                for (ix = 0; ix < gridX1; ix++) {
                    let x = ix * segmentWidth - widthHalf;
                    vector[u] = x * udir, vector[v] = y * vdir, vector[w] = depthHalf, vertices.push(vector.x, vector.y, vector.z), vector[u] = 0, vector[v] = 0, vector[w] = depth > 0 ? 1 : -1, normals.push(vector.x, vector.y, vector.z), uvs.push(ix / gridX), uvs.push(1 - iy / gridY), vertexCounter += 1
                }
            }
            for (iy = 0; iy < gridY; iy++)
                for (ix = 0; ix < gridX; ix++) {
                    let a = numberOfVertices + ix + gridX1 * iy,
                        b = numberOfVertices + ix + gridX1 * (iy + 1),
                        c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1),
                        d = numberOfVertices + (ix + 1) + gridX1 * iy;
                    indices.push(a, b, d), indices.push(b, c, d)
                }
            numberOfVertices += vertexCounter
        }
        buildPlane("z", "y", "x", -1, -1, depth, height, width, depthSegments, heightSegments, 0), buildPlane("z", "y", "x", 1, -1, depth, height, -width, depthSegments, heightSegments, 1), buildPlane("x", "z", "y", 1, 1, width, depth, height, widthSegments, depthSegments, 2), buildPlane("x", "z", "y", 1, -1, width, depth, -height, widthSegments, depthSegments, 3), buildPlane("x", "y", "z", 1, -1, width, height, depth, widthSegments, heightSegments, 4), buildPlane("x", "y", "z", -1, -1, width, height, -depth, widthSegments, heightSegments, 5), this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class CircleGeometry extends Geometry {
    constructor(radius = 1, segments = 8, thetaStart = 0, thetaLength = 2 * Math.PI) {
        super();
        var i, s, indices = [],
            vertices = [],
            normals = [],
            uvs = [],
            vertex = new Vector3,
            uv = new Vector2;
        for (vertices.push(0, 0, 0), normals.push(0, 0, 1), uvs.push(.5, .5), s = 0, i = 3; s <= segments; s++, i += 3) {
            var segment = thetaStart + s / segments * thetaLength;
            vertex.x = radius * Math.cos(segment), vertex.y = radius * Math.sin(segment), vertices.push(vertex.x, vertex.y, vertex.z), normals.push(0, 0, 1), uv.x = (vertices[i] / radius + 1) / 2, uv.y = (vertices[i + 1] / radius + 1) / 2, uvs.push(uv.x, uv.y)
        }
        for (i = 1; i <= segments; i++) indices.push(i, i + 1, 0);
        this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class CylinderGeometry extends Geometry {
    constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = !1, thetaStart = 0, thetaLength = 2 * Math.PI) {
        super(), radialSegments = Math.floor(radialSegments), heightSegments = Math.floor(heightSegments);
        let indices = [],
            vertices = [],
            normals = [],
            uvs = [],
            index = 0,
            indexArray = [],
            halfHeight = height / 2;

        function generateCap(top) {
            let x, centerIndexStart, centerIndexEnd, uv = new Vector2,
                vertex = new Vector3,
                radius = !0 === top ? radiusTop : radiusBottom,
                sign = !0 === top ? 1 : -1;
            for (centerIndexStart = index, x = 1; x <= radialSegments; x++) vertices.push(0, halfHeight * sign, 0), normals.push(0, sign, 0), uvs.push(.5, .5), index++;
            for (centerIndexEnd = index, x = 0; x <= radialSegments; x++) {
                let theta = x / radialSegments * thetaLength + thetaStart,
                    cosTheta = Math.cos(theta),
                    sinTheta = Math.sin(theta);
                vertex.x = radius * sinTheta, vertex.y = halfHeight * sign, vertex.z = radius * cosTheta, vertices.push(vertex.x, vertex.y, vertex.z), normals.push(0, sign, 0), uv.x = .5 * cosTheta + .5, uv.y = .5 * sinTheta * sign + .5, uvs.push(uv.x, uv.y), index++
            }
            for (x = 0; x < radialSegments; x++) {
                let c = centerIndexStart + x,
                    i = centerIndexEnd + x;
                !0 === top ? indices.push(i, i + 1, c) : indices.push(i + 1, i, c)
            }
        }! function generateTorso() {
            let x, y, normal = new Vector3,
                vertex = new Vector3,
                slope = (radiusBottom - radiusTop) / height;
            for (y = 0; y <= heightSegments; y++) {
                let indexRow = [],
                    v = y / heightSegments,
                    radius = v * (radiusBottom - radiusTop) + radiusTop;
                for (x = 0; x <= radialSegments; x++) {
                    let u = x / radialSegments,
                        theta = u * thetaLength + thetaStart,
                        sinTheta = Math.sin(theta),
                        cosTheta = Math.cos(theta);
                    vertex.x = radius * sinTheta, vertex.y = -v * height + halfHeight, vertex.z = radius * cosTheta, vertices.push(vertex.x, vertex.y, vertex.z), normal.set(sinTheta, slope, cosTheta).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(u, 1 - v), indexRow.push(index++)
                }
                indexArray.push(indexRow)
            }
            for (x = 0; x < radialSegments; x++)
                for (y = 0; y < heightSegments; y++) {
                    let a = indexArray[y][x],
                        b = indexArray[y + 1][x],
                        c = indexArray[y + 1][x + 1],
                        d = indexArray[y][x + 1];
                    indices.push(a, b, d), indices.push(b, c, d)
                }
        }(), !1 === openEnded && (radiusTop > 0 && generateCap(!0), radiusBottom > 0 && generateCap(!1)), this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class ConeGeometry extends CylinderGeometry {
    constructor(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
    }
}
class PlaneGeometry extends Geometry {
    constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
        super();
        let ix, iy, width_half = width / 2,
            height_half = height / 2,
            gridX = Math.floor(widthSegments) || 1,
            gridY = Math.floor(heightSegments) || 1,
            gridX1 = gridX + 1,
            gridY1 = gridY + 1,
            segment_width = width / gridX,
            segment_height = height / gridY,
            indices = [],
            vertices = [],
            normals = [],
            uvs = [];
        for (iy = 0; iy < gridY1; iy++) {
            let y = iy * segment_height - height_half;
            for (ix = 0; ix < gridX1; ix++) {
                let x = ix * segment_width - width_half;
                vertices.push(x, -y, 0), normals.push(0, 0, 1), uvs.push(ix / gridX), uvs.push(1 - iy / gridY)
            }
        }
        for (iy = 0; iy < gridY; iy++)
            for (ix = 0; ix < gridX; ix++) {
                let a = ix + gridX1 * iy,
                    b = ix + gridX1 * (iy + 1),
                    c = ix + 1 + gridX1 * (iy + 1),
                    d = ix + 1 + gridX1 * iy;
                indices.push(a, b, d), indices.push(b, c, d)
            }
        this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class PolyhedronGeometry extends Geometry {
    constructor(vertices, indices = [], radius = 1, detail = 0) {
        super();
        let vertexBuffer = [],
            uvBuffer = [];

        function subdivideFace(a, b, c, detail) {
            var i, j, cols = Math.pow(2, detail),
                v = [];
            for (i = 0; i <= cols; i++) {
                v[i] = [];
                var aj = a.clone().lerp(c, i / cols),
                    bj = b.clone().lerp(c, i / cols),
                    rows = cols - i;
                for (j = 0; j <= rows; j++) v[i][j] = 0 === j && i === cols ? aj : aj.clone().lerp(bj, j / rows)
            }
            for (i = 0; i < cols; i++)
                for (j = 0; j < 2 * (cols - i) - 1; j++) {
                    var k = Math.floor(j / 2);
                    j % 2 == 0 ? (pushVertex(v[i][k + 1]), pushVertex(v[i + 1][k]), pushVertex(v[i][k])) : (pushVertex(v[i][k + 1]), pushVertex(v[i + 1][k + 1]), pushVertex(v[i + 1][k]))
                }
        }

        function pushVertex(vertex) {
            vertexBuffer.push(vertex.x, vertex.y, vertex.z)
        }

        function getVertexByIndex(index, vertex) {
            let stride = 3 * index;
            vertex.x = vertices[stride + 0], vertex.y = vertices[stride + 1], vertex.z = vertices[stride + 2]
        }

        function correctUV(uv, stride, vector, azimuth) {
            azimuth < 0 && 1 === uv.x && (uvBuffer[stride] = uv.x - 1), 0 === vector.x && 0 === vector.z && (uvBuffer[stride] = azimuth / 2 / Math.PI + .5)
        }

        function azimuth(vector) {
            return Math.atan2(vector.z, -vector.x)
        }! function subdivide(detail) {
            let a = new Vector3,
                b = new Vector3,
                c = new Vector3;
            for (let i = 0; i < indices.length; i += 3) getVertexByIndex(indices[i + 0], a), getVertexByIndex(indices[i + 1], b), getVertexByIndex(indices[i + 2], c), subdivideFace(a, b, c, detail)
        }(detail),
        function appplyRadius(radius) {
            for (var vertex = new Vector3, i = 0; i < vertexBuffer.length; i += 3) vertex.x = vertexBuffer[i + 0], vertex.y = vertexBuffer[i + 1], vertex.z = vertexBuffer[i + 2], vertex.normalize().multiplyScalar(radius), vertexBuffer[i + 0] = vertex.x, vertexBuffer[i + 1] = vertex.y, vertexBuffer[i + 2] = vertex.z
        }(radius),
        function generateUVs() {
            let vertex = new Vector3;
            for (let i = 0; i < vertexBuffer.length; i += 3) {
                vertex.x = vertexBuffer[i + 0], vertex.y = vertexBuffer[i + 1], vertex.z = vertexBuffer[i + 2];
                let u = azimuth(vertex) / 2 / Math.PI + .5,
                    v = (vector = vertex, Math.atan2(-vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z)) / Math.PI + .5);
                uvBuffer.push(u, 1 - v)
            }
            var vector;
            (function correctUVs() {
                let a = new Vector3,
                    b = new Vector3,
                    c = new Vector3,
                    centroid = new Vector3,
                    uvA = new Vector2,
                    uvB = new Vector2,
                    uvC = new Vector2;
                for (let i = 0, j = 0; i < vertexBuffer.length; i += 9, j += 6) {
                    a.set(vertexBuffer[i + 0], vertexBuffer[i + 1], vertexBuffer[i + 2]), b.set(vertexBuffer[i + 3], vertexBuffer[i + 4], vertexBuffer[i + 5]), c.set(vertexBuffer[i + 6], vertexBuffer[i + 7], vertexBuffer[i + 8]), uvA.set(uvBuffer[j + 0], uvBuffer[j + 1]), uvB.set(uvBuffer[j + 2], uvBuffer[j + 3]), uvC.set(uvBuffer[j + 4], uvBuffer[j + 5]), centroid.copy(a).add(b).add(c).divideScalar(3);
                    let azi = azimuth(centroid);
                    correctUV(uvA, j + 0, a, azi), correctUV(uvB, j + 2, b, azi), correctUV(uvC, j + 4, c, azi)
                }
            })(),
            function correctSeam() {
                for (let i = 0; i < uvBuffer.length; i += 6) {
                    let x0 = uvBuffer[i + 0],
                        x1 = uvBuffer[i + 2],
                        x2 = uvBuffer[i + 4],
                        max = Math.max(x0, x1, x2),
                        min = Math.min(x0, x1, x2);
                    max > .9 && min < .1 && (x0 < .2 && (uvBuffer[i + 0] += 1), x1 < .2 && (uvBuffer[i + 2] += 1), x2 < .2 && (uvBuffer[i + 4] += 1))
                }
            }()
        }(), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertexBuffer), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(vertexBuffer.slice()), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvBuffer), 2)), 0 === detail ? this.computeVertexNormals() : this.normalizeNormals()
    }
}
class IcosahedronGeometry extends PolyhedronGeometry {
    constructor(radius, detail) {
        let t = (1 + Math.sqrt(5)) / 2;
        super([-1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0, 0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], radius, detail)
    }
}
class RingGeometry extends Geometry {
    constructor(innerRadius = .5, outerRadius = 1, thetaSegments = 8, phiSegments = 1, thetaStart = 0, thetaLength = 2 * Math.PI) {
        super();
        var segment, j, i, indices = [],
            vertices = [],
            normals = [],
            uvs = [],
            radius = innerRadius,
            radiusStep = (outerRadius - innerRadius) / phiSegments,
            vertex = new Vector3,
            uv = new Vector2;
        for (j = 0; j <= phiSegments; j++) {
            for (i = 0; i <= thetaSegments; i++) segment = thetaStart + i / thetaSegments * thetaLength, vertex.x = radius * Math.cos(segment), vertex.y = radius * Math.sin(segment), vertices.push(vertex.x, vertex.y, vertex.z), normals.push(0, 0, 1), uv.x = (vertex.x / outerRadius + 1) / 2, uv.y = (vertex.y / outerRadius + 1) / 2, uvs.push(uv.x, uv.y);
            radius += radiusStep
        }
        for (j = 0; j < phiSegments; j++) {
            var thetaSegmentLevel = j * (thetaSegments + 1);
            for (i = 0; i < thetaSegments; i++) {
                var a = segment = i + thetaSegmentLevel,
                    b = segment + thetaSegments + 1,
                    c = segment + thetaSegments + 2,
                    d = segment + 1;
                indices.push(a, b, d), indices.push(b, c, d)
            }
        }
        this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class SphereGeometry extends Geometry {
    constructor(radius = 1, widthSegments = 8, heightSegments = 6, phiStart = 0, phiLength = 2 * Math.PI, thetaStart = 0, thetaLength = Math.PI) {
        super(), widthSegments = Math.max(3, Math.floor(widthSegments)), heightSegments = Math.max(2, Math.floor(heightSegments));
        let ix, iy, thetaEnd = thetaStart + thetaLength,
            index = 0,
            grid = [],
            vertex = new Vector3,
            normal = new Vector3,
            indices = [],
            vertices = [],
            normals = [],
            uvs = [];
        for (iy = 0; iy <= heightSegments; iy++) {
            let verticesRow = [],
                v = iy / heightSegments;
            for (ix = 0; ix <= widthSegments; ix++) {
                let u = ix / widthSegments;
                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength), vertex.y = radius * Math.cos(thetaStart + v * thetaLength), vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength), vertices.push(vertex.x, vertex.y, vertex.z), normal.set(vertex.x, vertex.y, vertex.z).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(u, 1 - v), verticesRow.push(index++)
            }
            grid.push(verticesRow)
        }
        for (iy = 0; iy < heightSegments; iy++)
            for (ix = 0; ix < widthSegments; ix++) {
                let a = grid[iy][ix + 1],
                    b = grid[iy][ix],
                    c = grid[iy + 1][ix],
                    d = grid[iy + 1][ix + 1];
                (0 !== iy || thetaStart > 0) && indices.push(a, b, d), (iy !== heightSegments - 1 || thetaEnd < Math.PI) && indices.push(b, c, d)
            }
        this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
class TorusKnotGeometry extends Geometry {
    constructor(radius = 1, tube = .4, tubularSegments = 64, radialSegments = 8, p = 2, q = 3) {
        super();
        let i, j, indices = [],
            vertices = [],
            normals = [],
            uvs = [],
            vertex = new Vector3,
            normal = new Vector3,
            P1 = new Vector3,
            P2 = new Vector3,
            B = new Vector3,
            T = new Vector3,
            N = new Vector3;
        for (i = 0; i <= tubularSegments; ++i) {
            let u = i / tubularSegments * p * Math.PI * 2;
            for (calculatePositionOnCurve(u, p, q, radius, P1), calculatePositionOnCurve(u + .01, p, q, radius, P2), T.subVectors(P2, P1), N.addVectors(P2, P1), B.crossVectors(T, N), N.crossVectors(B, T), B.normalize(), N.normalize(), j = 0; j <= radialSegments; ++j) {
                let v = j / radialSegments * Math.PI * 2,
                    cx = -tube * Math.cos(v),
                    cy = tube * Math.sin(v);
                vertex.x = P1.x + (cx * N.x + cy * B.x), vertex.y = P1.y + (cx * N.y + cy * B.y), vertex.z = P1.z + (cx * N.z + cy * B.z), vertices.push(vertex.x, vertex.y, vertex.z), normal.subVectors(vertex, P1).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(i / tubularSegments), uvs.push(j / radialSegments)
            }
        }
        for (j = 1; j <= tubularSegments; j++)
            for (i = 1; i <= radialSegments; i++) {
                let a = (radialSegments + 1) * (j - 1) + (i - 1),
                    b = (radialSegments + 1) * j + (i - 1),
                    c = (radialSegments + 1) * j + i,
                    d = (radialSegments + 1) * (j - 1) + i;
                indices.push(a, b, d), indices.push(b, c, d)
            }

        function calculatePositionOnCurve(u, p, q, radius, position) {
            let cu = Math.cos(u),
                su = Math.sin(u),
                quOverP = q / p * u,
                cs = Math.cos(quOverP);
            position.x = radius * (2 + cs) * .5 * cu, position.y = radius * (2 + cs) * su * .5, position.z = radius * Math.sin(quOverP) * .5
        }
        this.index = new Uint16Array(indices), this.addAttribute("position", new GeometryAttribute(new Float32Array(vertices), 3)), this.addAttribute("normal", new GeometryAttribute(new Float32Array(normals), 3)), this.addAttribute("uv", new GeometryAttribute(new Float32Array(uvs), 2))
    }
}
Class((function Interaction3D(_camera) {
    Inherit(this, Component);
    const _this = this;
    let _hover, _click;
    var _v3 = new Vector3,
        _input = {},
        _enabled = !0;
    _this.ID = Utils.timestamp(), _camera = _camera || World.CAMERA;
    let _ray = _this.initClass(Raycaster, _camera);
    _ray.testVisibility = !0;
    let _meshes = [],
        _test = [];
    const _event = {};

    function parseMeshes(meshes) {
        Array.isArray(meshes) || (meshes = [meshes]);
        let output = [];
        return meshes.forEach((function checkMesh(obj) {
            obj.hitArea && (obj = function initHitMesh(obj) {
                obj.hitMesh || (obj.hitMesh = new Mesh(obj.hitArea), obj.add(obj.hitMesh));
                return (obj = obj.hitMesh).isHitMesh = !0, obj.testVisibility = !1, obj.visible = !1, obj
            }(obj));
            "boolean" == typeof obj.isHitMesh ? (obj.mouseEnabled = function(visible) {
                visible ? ~_meshes.indexOf(obj) || _meshes.push(obj) : _meshes.remove(obj)
            }, output.push(obj)) : output.push(obj);
            obj.children.length && obj.children.forEach(checkMesh)
        })), output
    }

    function testObjects() {
        _test.length = 0;
        for (let i = _meshes.length - 1; i > -1; i--) {
            let obj = _meshes[i];
            obj.determineVisible() && _test.push(obj)
        }
        return _test
    }

    function start() {
        if (!_enabled) return;
        let hit = move();
        "3d" == _input.type && _this.events.fire(Interaction3D.EXTERNAL_PRESS), hit ? (_click = hit.object, _click.time = Render.TIME) : _click = null
    }

    function move() {
        if (!_enabled) return void Interaction3D.requestCursor("auto", _this);
        let hit;
        if ("2d" == _input.type ? hit = _ray.checkHit(testObjects(), _input.position, _input.rect || Stage)[0] : (_v3.set(0, 0, -1).applyQuaternion(_input.quaternion), hit = _ray.checkFromValues(testObjects(), _input.position, _v3)[0]), hit) {
            let mesh = hit.object;
            return mesh.onHitUpdate ? (mesh.onHitUpdate(hit), !1) : (_input.obj && _input.obj.setHitPosition && _input.obj.setHitPosition(hit), _hover !== mesh ? (_hover && triggerHover("out", _hover, hit), _hover = mesh, triggerHover("over", _hover, hit), _hover.__clickCallback ? Interaction3D.requestCursor("pointer", _this) : Interaction3D.requestCursor("auto", _this)) : function triggerMove(mesh, hit) {
                _event.action = "move", _event.mesh = mesh, _event.hit = hit, _this.events.fire(Interaction3D.MOVE, _event, !0), mesh["__moveCallback" + _this.ID] && mesh["__moveCallback" + _this.ID](_event)
            }(_hover, hit), hit)
        }
        return end(), _input.obj && _input.obj.setHitPosition && _input.obj.setHitPosition(!1), !1
    }

    function end() {
        _hover && (triggerHover("out", _hover, null), _hover = null, Interaction3D.requestCursor(_this.cursor, _this))
    }

    function click(e) {
        if ("3d" == _input.type && _this.events.fire(Interaction3D.EXTERNAL_RELEASE), !_this.enabled) return;
        if (!_click) return;
        let hit;
        if ("2d" == _input.type) {
            let element = document.elementFromPoint(e.x, e.y);
            if (element && "hit" === element.className || GLUI.HIT) return;
            hit = _ray.checkHit(testObjects(), _input.position, _input.rect)[0]
        } else _v3.set(0, 0, -1).applyQuaternion(_input.quaternion), hit = _ray.checkFromValues(testObjects(), _input.position, _v3)[0];
        hit && hit.object === _click && function triggerClick(mesh, hit) {
            _event.action = "click", _event.mesh = mesh, _event.hit = hit, _this.events.fire(Interaction3D.CLICK, _event, !0), _click.__clickCallback && _click.__clickCallback(_event)
        }(_click, hit), _click = null
    }

    function triggerHover(action, mesh, hit) {
        _event.action = action, _event.mesh = mesh, _event.hit = hit, _this.events.fire(Interaction3D.HOVER, _event, !0), _hover.__hoverCallback && _hover.__hoverCallback(_event)
    }
    this.cursor = "auto", this.set("camera", c => {
        _ray.camera = c
    }), this.add = function(meshes, hover, click, move, seo) {
        let seoRoot;
        Array.isArray(meshes) || (meshes = parseMeshes(meshes)), move && "function" != typeof move && (seo = move, move = null), seo && seo.root && (seoRoot = seo.root, seo = seo.seo), meshes.forEach((mesh, i) => {
            if (seo) try {
                mesh._divFocus = _ => hover({
                    action: "over",
                    mesh: mesh
                }), mesh._divBlur = _ => hover({
                    action: "out",
                    mesh: mesh
                }), mesh._divSelect = _ => click({
                    action: "click",
                    mesh: mesh
                });
                let {
                    url: url,
                    label: label
                } = Array.isArray(seo) ? seo[i] : seo;
                GLSEO.objectNode(mesh, seoRoot), mesh.seo.aLink(url, label)
            } catch (e) {
                Hydra.LOCAL && console.warn("Could not add SEO to Interaction3D meshes", e)
            }
            mesh.hitDestroy = _ => _meshes.remove(mesh), hover && (mesh.__hoverCallback = hover), click && (mesh.__clickCallback = click), move && (mesh["__moveCallback" + _this.ID] = move), _meshes.push(mesh)
        })
    }, this.remove = function(meshes) {
        Array.isArray(meshes) || (meshes = parseMeshes(meshes)), meshes.forEach(mesh => {
            mesh === _hover && (_hover = null, Interaction3D.requestCursor(_this.cursor, _this)), mesh.seo && mesh.seo.unlink();
            for (let i = _meshes.length - 1; i >= 0; i--) mesh === _meshes[i] && _meshes.splice(i, 1)
        })
    }, this.set("testVisibility", v => _ray.testVisibility = v), this.set("input", obj => {
        (_input = {}).obj = obj, _input.position = obj.group ? obj.group.position : obj, _input.quaternion = obj.group ? obj.group.quaternion : null, _input.type = "number" == typeof _input.position.z ? "3d" : "2d", _input.rect = obj.rect, "3d" == _input.type ? (new Vector3, new Vector3) : (new Vector2, new Vector2), obj == Mouse ? function addHandlers() {
            _this.events.sub(Mouse.input, Interaction.START, start), Device.mobile && _this.events.sub(Mouse.input, Interaction.END, end), _this.events.sub(Mouse.input, Interaction.MOVE, move), _this.events.sub(Mouse.input, Interaction.CLICK, click)
        }() : (! function removeHandlers() {
            _this.events.unsub(Mouse.input, Interaction.START, start), Device.mobile && _this.events.unsub(Mouse.input, Interaction.END, end), _this.events.unsub(Mouse.input, Interaction.MOVE, move), _this.events.unsub(Mouse.input, Interaction.CLICK, click)
        }(), _this.events.sub(obj, VRInput.SELECT_START, start), _this.events.sub(obj, VRInput.SELECT_END, click), _this.startRender(move, 24))
    }), this.get("enabled", _ => _enabled), this.set("enabled", v => {
        (_enabled = v) || (_hover && triggerHover("out", _hover, null), _hover = null)
    })
}), () => {
    Interaction3D.HOVER = "interaction3d_hover", Interaction3D.CLICK = "interaction3d_click", Interaction3D.MOVE = "interaction3d_move", Interaction3D.EXTERNAL_PRESS = "interaction3d_ext_press", Interaction3D.EXTERNAL_RELEASE = "interaction3d_ext_release";
    var _cursorObj, _map = new Map,
        _input = Mouse;
    Interaction3D.find = function(camera) {
        if (camera = camera.camera || camera, !_map.has(camera)) {
            let interaction = new Interaction3D(camera);
            interaction.input = _input, _map.set(camera, interaction)
        }
        return _map.get(camera)
    }, Interaction3D.useInput = function(obj) {
        for (let [camera, interaction] of _map) interaction.input = obj;
        _input = obj
    }, Interaction3D.requestCursor = function(cursor, obj) {
        "pointer" == cursor && (_cursorObj = obj, Stage.cursor(cursor)), "auto" == cursor && _cursorObj == obj && (Stage.cursor(cursor), _cursorObj = null)
    }
}), Class((function Lighting() {
    Inherit(this, Component);
    const _this = this;
    var _activeScene, _scenes = {};

    function loop() {
        if (decomposeLights(_activeScene.lights), _this.UBO) {
            let shader = _activeScene.shaders.start();
            shader && (updateArrays(shader), _activeScene.ubo.created ? _activeScene.ubo.update() : createUBO(shader.uniforms))
        } else {
            let shader = _activeScene.shaders.start();
            for (; shader;) updateArrays(shader), shader = _activeScene.shaders.next()
        }
    }

    function createUBO(uniforms) {
        _activeScene.ubo.created = !0, _activeScene.ubo.push(uniforms.lightPos), _activeScene.ubo.push(uniforms.lightColor), _activeScene.ubo.push(uniforms.lightData), _activeScene.ubo.push(uniforms.lightData2), _activeScene.ubo.push(uniforms.lightData3), _activeScene.ubo.push(uniforms.lightProperties), _activeScene.ubo.upload()
    }

    function decomposeLights(lights) {
        for (let i = lights.length - 1; i > -1; i--) {
            let light = lights[i];
            light._decomposedTime && Render.TIME - light._decomposedTime < 8 || (light._decomposedTime = Render.TIME, light._parent || light.updateMatrixWorld(), light._world || (light._world = new Vector3), light.lockToLocal ? light._world.copy(light.position) : light.getWorldPosition(light._world))
        }
    }

    function updateArrays(shader) {
        let lighting = shader.__lighting;
        lighting.position.length = 0, lighting.color.length = 0, lighting.data.length = 0, lighting.data2.length = 0, lighting.data3.length = 0, lighting.properties.length = 0;
        for (let i = 0; i < _activeScene.lights.length; i++) {
            let light = _activeScene.lights[i];
            light._world || decomposeLights(_activeScene.lights), lighting.position.push(light._world.x, light._world.y, light._world.z, 0), lighting.color.push(light.color.r, light.color.g, light.color.b, 0), lighting.data.push(light.data.x, light.data.y, light.data.z, light.data.w), lighting.data2.push(light.data2.x, light.data2.y, light.data2.z, light.data2.w), lighting.data3.push(light.data3.x, light.data3.y, light.data3.z, light.data3.w), lighting.properties.push(light.properties.x, light.properties.y, light.properties.z, light.properties.w)
        }
    }

    function findParentScene(obj3d) {
        if (!obj3d) return _activeScene;
        if (obj3d._lightingData) return obj3d._lightingData;
        let scene, p = obj3d._parent;
        for (; p;) p instanceof Scene && p._lightingData && (scene = p._lightingData), p = p._parent;
        return scene || (scene = _activeScene), scene
    }
    this.fallbackAreaToPoint = !1, this.scenes = _scenes, async function() {
        await Hydra.ready(), _this.createScene("default"), _this.useScene("default")
    }(), this.createScene = function(name, scene) {
        if (_scenes[name]) return this;
        let obj = {
            lights: [],
            renderShadows: [],
            ubo: new(window.Metal ? MetalUBO : UBO)(2),
            shaders: new LinkedList,
            name: name
        };
        return scene && (scene._lightingData = obj), _scenes[name] = obj, this
    }, this.useScene = function(name) {
        if (!(_activeScene = _scenes[name])) throw `Scene ${name} not found`;
        return loop(), this
    }, this.destroyScene = function(name) {
        delete _scenes[name]
    }, this.push = this.add = function(light) {
        _this.UBO = Renderer.UBO && !(window.AURA || RenderManager.type == RenderManager.WEBVR), window.Metal && (_this.UBO = !0);
        let scene = findParentScene(light);
        scene.lights.push(light), light.isAreaLight && (scene.hasAreaLight = !0), _this.startedLoop || (_this.startedLoop = !0, RenderManager.type == RenderManager.WEBVR ? _this.events.sub(RenderManager.BEFORE_RENDER, _ => loop()) : Render.onDrawFrame(loop))
    }, this.remove = function(light) {
        _activeScene.lights.remove(light)
    }, this.getLighting = function(shader, force) {
        if (shader.__lighting && !force) return shader.__lighting;
        let scene = findParentScene(shader.mesh);
        scene.shaders.push(shader), window.AreaLightUtil && scene.hasAreaLight && AreaLightUtil.append(shader);
        let lighting = shader.__lighting = {
                position: [],
                color: [],
                data: [],
                data2: [],
                data3: [],
                properties: []
            },
            lightUBO = _this.UBO;
        return shader.uniforms.lightPos = {
            type: "v4v",
            value: lighting.position,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, shader.uniforms.lightColor = {
            type: "v4v",
            value: lighting.color,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, shader.uniforms.lightData = {
            type: "v4v",
            value: lighting.data,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, shader.uniforms.lightData2 = {
            type: "v4v",
            value: lighting.data2,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, shader.uniforms.lightData3 = {
            type: "v4v",
            value: lighting.data3,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, shader.uniforms.lightProperties = {
            type: "v4v",
            value: lighting.properties,
            ignoreUIL: !0,
            lightUBO: lightUBO,
            components: 4,
            metalIgnore: !0
        }, updateArrays(shader), _this.UBO && !_activeScene.ubo.created && createUBO(shader.uniforms), shader.__lighting
    }, this.destroyShader = function(shader) {
        findParentScene(shader.mesh);
        _activeScene.shaders.remove(shader)
    }, this.sort = function(callback) {
        _activeScene.lights.sort(callback)
    }, this.addToShadowGroup = function(light) {
        findParentScene(light).renderShadows.push(light)
    }, this.removeFromShadowGroup = function(light) {
        findParentScene(light);
        _activeScene.renderShadows.remove(light)
    }, this.getShadowLights = function() {
        return _activeScene.renderShadows
    }, this.getShadowCount = function() {
        return _activeScene.renderShadows.length
    }, this.initShadowShader = function(object, mesh) {
        let scene, shader = object.shader || object;
        if (shader.mesh) {
            let p = shader.mesh._parent;
            for (; p;) p instanceof Scene && p._lightingData && (scene = p._lightingData), p = p._parent
        }
        if (scene || (scene = _activeScene), !World.RENDERER.shadows || 0 == scene.renderShadows.length) return "";
        shader._gl || shader.upload();
        let vsName = shader.vsName,
            fsName = "ShadowDepth";
        shader.customShadowShader && (fsName = shader.customShadowShader), shader.shadow = new Shader(vsName, fsName, {
            receiveLight: shader.receiveLight,
            UILPrefix: shader.UILPrefix,
            precision: "high"
        }), shader.vertexShader && (shader.shadow.vertexShader = shader.vertexShader), shader.shadow.lights = shader.lights, shader.shadow.isShadow = !0, shader.copyUniformsTo(shader.shadow, !0), shader.shadow.upload()
    }, this.getShadowUniforms = function(shader) {
        let scene;
        if (shader.mesh) {
            let p = shader.mesh._parent;
            for (; p;) p instanceof Scene && p._lightingData && (scene = p._lightingData), p = p._parent
        }
        return scene || (scene = _activeScene), World.RENDERER.shadows && 0 != scene.renderShadows.length ? ["\n#define SHADOW_MAPS " + scene.renderShadows.length, World.RENDERER.shadows == Renderer.SHADOWS_LOW ? "#define SHADOWS_LOW" : "", World.RENDERER.shadows == Renderer.SHADOWS_MED ? "#define SHADOWS_MED" : "", World.RENDERER.shadows == Renderer.SHADOWS_HIGH ? "#define SHADOWS_HIGH" : "", `uniform sampler2D shadowMap[${scene.renderShadows.length}];`, `uniform mat4 shadowMatrix[${scene.renderShadows.length}];`, `uniform vec3 shadowLightPos[${scene.renderShadows.length}];`, `uniform float shadowSize[${scene.renderShadows.length}];`].join("\n") : ""
    }, this.bindUBO = function(shader) {
        _activeScene.ubo.created && _activeScene.ubo.bind(shader, "lights")
    }, this.fallbackAreaToPointTest = function() {
        return _this.fallbackAreaToPoint
    }, this.get("activeScene", _ => _activeScene)
}), "static");
class Shadow {
    constructor(light) {
        this.light = light, this.camera = new PerspectiveCamera(60, 1, .1, 50), this.target = new Vector3, this.rt = new RenderTarget(1024, 1024), this.rt.createDepthTexture(), this.enabled = !0, this._size = 1024, this._fov = 60, this._far = 50, this._near = .1, light.add(this.camera)
    }
    destroy() {
        this.rt.destroy()
    }
    set fov(value) {
        this._fov = value, this.camera.fov = value, this.camera.updateProjectionMatrix(), -1 == value && (this.camera = new OrthographicCamera(-5, 5, 5, -5, .1, 50))
    }
    get fov() {
        return this._fov
    }
    set area(value) {
        this._area = value, this.camera.left = -value, this.camera.right = value, this.camera.top = value, this.camera.bottom = -value, this.camera.updateProjectionMatrix()
    }
    get area() {
        return this._area
    }
    set far(value) {
        this._far = value, this.camera.far = value, this.camera.updateProjectionMatrix()
    }
    get far() {
        return this._far
    }
    set near(value) {
        this._near = value, this.camera.near = value, this.camera.updateProjectionMatrix()
    }
    get near() {
        return this._near
    }
    set size(value) {
        this._size = value, this.rt.setSize(value, value)
    }
    get size() {
        return this._size
    }
}
class Box2 {
    constructor(min, max) {
        this.min = void 0 !== min ? min : new Vector2(1 / 0, 1 / 0), this.max = void 0 !== max ? max : new Vector2(-1 / 0, -1 / 0)
    }
    set(min, max) {
        return this.min.copy(min), this.max.copy(max), this
    }
    setFromPoints(points) {
        this.makeEmpty();
        for (let i = 0, il = points.length; i < il; i++) this.expandByPoint(points[i]);
        return this
    }
    setFromCenterAndSize(center, size) {
        let v1 = this.V1 || new Vector2;
        this.V1 = v1;
        let halfSize = v1.copy(size).multiplyScalar(.5);
        return this.min.copy(center).sub(halfSize), this.max.copy(center).add(halfSize), this
    }
    clone() {
        return (new Box2).copy(this)
    }
    copy(box) {
        return this.min.copy(box.min), this.max.copy(box.max), this
    }
    makeEmpty() {
        return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    }
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(.5)
    }
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min)
    }
    expandByPoint(point) {
        return this.min.min(point), this.max.max(point), this
    }
    expandByVector(vector) {
        return this.min.sub(vector), this.max.add(vector), this
    }
    expandByScalar(scalar) {
        return this.min.addScalar(-scalar), this.max.addScalar(scalar), this
    }
    containsPoint(point) {
        return !(point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y)
    }
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y
    }
    getParameter(point, target) {
        return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y))
    }
    intersectsBox(box) {
        return !(box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y)
    }
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max)
    }
    distanceToPoint(point) {
        let v1 = this.V1 || new Vector2;
        return this.V1 = v1, v1.copy(point).clamp(this.min, this.max).sub(point).length()
    }
    intersect(box) {
        return this.min.max(box.min), this.max.min(box.max), this
    }
    union(box) {
        return this.min.min(box.min), this.max.max(box.max), this
    }
    translate(offset) {
        return this.min.add(offset), this.max.add(offset), this
    }
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max)
    }
}
class Box3 {
    constructor(min, max) {
        this.min = void 0 !== min ? min : new Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== max ? max : new Vector3(-1 / 0, -1 / 0, -1 / 0)
    }
    set(min, max) {
        return this.min.copy(min), this.max.copy(max), this
    }
    setFromArray(array) {
        let minX = 1 / 0,
            minY = 1 / 0,
            minZ = 1 / 0,
            maxX = -1 / 0,
            maxY = -1 / 0,
            maxZ = -1 / 0;
        for (let i = 0, l = array.length; i < l; i += 3) {
            let x = array[i],
                y = array[i + 1],
                z = array[i + 2];
            x < minX && (minX = x), y < minY && (minY = y), z < minZ && (minZ = z), x > maxX && (maxX = x), y > maxY && (maxY = y), z > maxZ && (maxZ = z)
        }
        return this.min.set(minX, minY, minZ), this.max.set(maxX, maxY, maxZ), this
    }
    setFromBufferAttribute(attribute) {
        let minX = 1 / 0,
            minY = 1 / 0,
            minZ = 1 / 0,
            maxX = -1 / 0,
            maxY = -1 / 0,
            maxZ = -1 / 0;
        for (let i = 0, l = attribute.count; i < l; i++) {
            let x = attribute.array[3 * i + 0],
                y = attribute.array[3 * i + 1],
                z = attribute.array[3 * i + 2];
            x < minX && (minX = x), y < minY && (minY = y), z < minZ && (minZ = z), x > maxX && (maxX = x), y > maxY && (maxY = y), z > maxZ && (maxZ = z)
        }
        return this.min.set(minX, minY, minZ), this.max.set(maxX, maxY, maxZ), this
    }
    setFromPoints(points) {
        this.makeEmpty();
        for (let i = 0, il = points.length; i < il; i++) this.expandByPoint(points[i]);
        return this
    }
    setFromCenterAndSize(center, size) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let halfSize = v1.copy(size).multiplyScalar(.5);
        return this.min.copy(center).sub(halfSize), this.max.copy(center).add(halfSize), this
    }
    setFromObject(object) {
        return this.makeEmpty(), this.expandByObject(object)
    }
    clone() {
        return (new Box3).copy(this)
    }
    copy(box) {
        return this.min.copy(box.min), this.max.copy(box.max), this
    }
    makeEmpty() {
        return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(.5)
    }
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min)
    }
    expandByPoint(point) {
        return this.min.min(point), this.max.max(point), this
    }
    expandByVector(vector) {
        return this.min.sub(vector), this.max.add(vector), this
    }
    expandByScalar(scalar) {
        return this.min.addScalar(-scalar), this.max.addScalar(scalar), this
    }
    expandByObject(object, local) {
        let scope, i, l, v1 = this.V1 || new Vector3;
        return this.V1 = v1, scope = this, object.updateMatrixWorld(!0), object.traverse(node => {
            let geometry = node.geometry;
            if (!geometry) return;
            let attribute = geometry.attributes.position;
            if (void 0 !== attribute)
                for (i = 0, l = attribute.count; i < l; i++) v1.fromBufferAttribute(attribute, i).applyMatrix4(local ? node.matrix : node.matrixWorld), scope.expandByPoint(v1)
        }), this
    }
    containsPoint(point) {
        return !(point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z)
    }
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z
    }
    getParameter(point, target) {
        return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z))
    }
    intersectsBox(box) {
        return !(box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z)
    }
    intersectsSphere(sphere) {
        let closestPoint = this.V1 || new Vector3;
        return this.V1 = closestPoint, this.clampPoint(sphere.center, closestPoint), closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius
    }
    intersectsPlane(plane) {
        let min, max;
        return plane.normal.x > 0 ? (min = plane.normal.x * this.min.x, max = plane.normal.x * this.max.x) : (min = plane.normal.x * this.max.x, max = plane.normal.x * this.min.x), plane.normal.y > 0 ? (min += plane.normal.y * this.min.y, max += plane.normal.y * this.max.y) : (min += plane.normal.y * this.max.y, max += plane.normal.y * this.min.y), plane.normal.z > 0 ? (min += plane.normal.z * this.min.z, max += plane.normal.z * this.max.z) : (min += plane.normal.z * this.max.z, max += plane.normal.z * this.min.z), min <= plane.constant && max >= plane.constant
    }
    intersectsTriangle(triangle) {
        let v0 = this.V0 || new Vector3;
        this.V0 = v0;
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let v2 = this.V2 || new Vector3;
        this.V2 = v2;
        let f0 = this.F0 || new Vector3;
        this.F0 = f0;
        let f1 = this.F1 || new Vector3;
        this.F1 = f1;
        let f2 = this.F2 || new Vector3;
        this.F2 = f2;
        let testAxis = this.V3 || new Vector3;
        this.V3 = testAxis;
        let center = this.V4 || new Vector3;
        this.V4 = center;
        let extents = this.V5 || new Vector3;
        this.V5 = extents;
        let triangleNormal = this.V6 || new Vector3;

        function satForAxes(axes) {
            let i, j;
            for (i = 0, j = axes.length - 3; i <= j; i += 3) {
                testAxis.fromArray(axes, i);
                let r = extents.x * Math.abs(testAxis.x) + extents.y * Math.abs(testAxis.y) + extents.z * Math.abs(testAxis.z),
                    p0 = v0.dot(testAxis),
                    p1 = v1.dot(testAxis),
                    p2 = v2.dot(testAxis);
                if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) return !1
            }
            return !0
        }
        if (this.V6 = triangleNormal, this.isEmpty()) return !1;
        this.getCenter(center), extents.subVectors(this.max, center), v0.subVectors(triangle.a, center), v1.subVectors(triangle.b, center), v2.subVectors(triangle.c, center), f0.subVectors(v1, v0), f1.subVectors(v2, v1), f2.subVectors(v0, v2);
        let axes = [0, -f0.z, f0.y, 0, -f1.z, f1.y, 0, -f2.z, f2.y, f0.z, 0, -f0.x, f1.z, 0, -f1.x, f2.z, 0, -f2.x, -f0.y, f0.x, 0, -f1.y, f1.x, 0, -f2.y, f2.x, 0];
        return !!satForAxes(axes) && (axes = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!satForAxes(axes) && (triangleNormal.crossVectors(f0, f1), axes = [triangleNormal.x, triangleNormal.y, triangleNormal.z], satForAxes(axes)))
    }
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max)
    }
    distanceToPoint(point) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, v1.copy(point).clamp(this.min, this.max).sub(point).length()
    }
    getBoundingSphere(target = new Sphere) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, this.getCenter(target.center), target.radius = .5 * this.getSize(v1).length(), target
    }
    intersect(box) {
        return this.min.max(box.min), this.max.min(box.max), this.isEmpty() && this.makeEmpty(), this
    }
    union(box) {
        return this.min.min(box.min), this.max.max(box.max), this
    }
    applyMatrix4(matrix) {
        if (this.isEmpty()) return this;
        let m = matrix.elements,
            xax = m[0] * this.min.x,
            xay = m[1] * this.min.x,
            xaz = m[2] * this.min.x,
            xbx = m[0] * this.max.x,
            xby = m[1] * this.max.x,
            xbz = m[2] * this.max.x,
            yax = m[4] * this.min.y,
            yay = m[5] * this.min.y,
            yaz = m[6] * this.min.y,
            ybx = m[4] * this.max.y,
            yby = m[5] * this.max.y,
            ybz = m[6] * this.max.y,
            zax = m[8] * this.min.z,
            zay = m[9] * this.min.z,
            zaz = m[10] * this.min.z,
            zbx = m[8] * this.max.z,
            zby = m[9] * this.max.z,
            zbz = m[10] * this.max.z;
        return this.min.x = Math.min(xax, xbx) + Math.min(yax, ybx) + Math.min(zax, zbx) + m[12], this.min.y = Math.min(xay, xby) + Math.min(yay, yby) + Math.min(zay, zby) + m[13], this.min.z = Math.min(xaz, xbz) + Math.min(yaz, ybz) + Math.min(zaz, zbz) + m[14], this.max.x = Math.max(xax, xbx) + Math.max(yax, ybx) + Math.max(zax, zbx) + m[12], this.max.y = Math.max(xay, xby) + Math.max(yay, yby) + Math.max(zay, zby) + m[13], this.max.z = Math.max(xaz, xbz) + Math.max(yaz, ybz) + Math.max(zaz, zbz) + m[14], this
    }
    translate(offset) {
        return this.min.add(offset), this.max.add(offset), this
    }
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max)
    }
    setFromBufferAttribute(attribute) {
        let minX = 1 / 0,
            minY = 1 / 0,
            minZ = 1 / 0,
            maxX = -1 / 0,
            maxY = -1 / 0,
            maxZ = -1 / 0;
        for (let i = 0, l = attribute.count; i < l; i++) {
            let x = attribute.array[3 * i + 0],
                y = attribute.array[3 * i + 1],
                z = attribute.array[3 * i + 2];
            x < minX && (minX = x), y < minY && (minY = y), z < minZ && (minZ = z), x > maxX && (maxX = x), y > maxY && (maxY = y), z > maxZ && (maxZ = z)
        }
        return this.min.set(minX, minY, minZ), this.max.set(maxX, maxY, maxZ), this
    }
}
class Color {
    constructor(r, g, b) {
        return null == r && null == g && null == b ? this.setRGB(1, 1, 1) : void 0 === g && void 0 === b ? this.set(r) : void this.setRGB(r, g, b)
    }
    set(value) {
        return value && value instanceof Color ? this.copy(value) : "number" == typeof value ? this.setHex(value) : "string" == typeof value && this.setStyle(value), this
    }
    setScalar(scalar) {
        return this.r = scalar, this.g = scalar, this.b = scalar, this
    }
    setHex(hex) {
        return hex = Math.floor(hex), this.r = (hex >> 16 & 255) / 255, this.g = (hex >> 8 & 255) / 255, this.b = (255 & hex) / 255, this
    }
    setStyle(string) {
        return this.setHex(Number(string.replace("#", "0x")))
    }
    setRGB(r, g, b) {
        return this.r = r, this.g = g, this.b = b, this
    }
    setHSL(h, s, l) {
        function hue2rgb(p, q, t) {
            return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? p + 6 * (q - p) * t : t < .5 ? q : t < 2 / 3 ? p + 6 * (q - p) * (2 / 3 - t) : p
        }
        if (h = Math.euclideanModulo(h, 1), s = Math.clamp(s, 0, 1), l = Math.clamp(l, 0, 1), 0 === s) this.r = this.g = this.b = l;
        else {
            let p = l <= .5 ? l * (1 + s) : l + s - l * s,
                q = 2 * l - p;
            this.r = hue2rgb(q, p, h + 1 / 3), this.g = hue2rgb(q, p, h), this.b = hue2rgb(q, p, h - 1 / 3)
        }
        return this
    }
    clone() {
        return new Color(this.r, this.g, this.b)
    }
    copy(color) {
        return this.r = color.r, this.g = color.g, this.b = color.b, this
    }
    copyGammaToLinear(color, gammaFactor) {
        return void 0 === gammaFactor && (gammaFactor = 2), this.r = Math.pow(color.r, gammaFactor), this.g = Math.pow(color.g, gammaFactor), this.b = Math.pow(color.b, gammaFactor), this
    }
    copyLinearToGamma(color, gammaFactor) {
        void 0 === gammaFactor && (gammaFactor = 2);
        let safeInverse = gammaFactor > 0 ? 1 / gammaFactor : 1;
        return this.r = Math.pow(color.r, safeInverse), this.g = Math.pow(color.g, safeInverse), this.b = Math.pow(color.b, safeInverse), this
    }
    convertGammaToLinear(gammaFactor) {
        return this.copyGammaToLinear(this, gammaFactor), this
    }
    convertLinearToGamma(gammaFactor) {
        return this.copyLinearToGamma(this, gammaFactor), this
    }
    getHex() {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    }
    getHexString() {
        return "#" + ("000000" + this.getHex().toString(16)).slice(-6)
    }
    getHSL() {
        let target = this.target || {};
        this.target = target;
        let hue, saturation, r = this.r,
            g = this.g,
            b = this.b,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            lightness = (min + max) / 2;
        if (min === max) hue = 0, saturation = 0;
        else {
            let delta = max - min;
            switch (saturation = lightness <= .5 ? delta / (max + min) : delta / (2 - max - min), max) {
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4
            }
            hue /= 6
        }
        return target.h = hue, target.s = saturation, target.l = lightness, target
    }
    tween(color, time, ease, delay) {
        const _this = this;
        _this.tweenObj || (_this.tweenObj = {
            v: 0
        }), _this.tweenObj.v = 0;
        let clone = this.clone();
        return TweenManager.tween(_this.tweenObj, {
            v: 1
        }, time, ease, delay).onUpdate(_ => {
            _this.copy(clone).lerp(color, _this.tweenObj.v)
        })
    }
    offsetHSL(h, s, l) {
        let hsl = this.getHSL();
        return hsl.h += h, hsl.s += s, hsl.l += l, this.setHSL(hsl.h, hsl.s, hsl.l), this
    }
    add(color) {
        return this.r += color.r, this.g += color.g, this.b += color.b, this
    }
    addColors(color1, color2) {
        return this.r = color1.r + color2.r, this.g = color1.g + color2.g, this.b = color1.b + color2.b, this
    }
    addScalar(s) {
        return this.r += s, this.g += s, this.b += s, this
    }
    sub(color) {
        return this.r = Math.max(0, this.r - color.r), this.g = Math.max(0, this.g - color.g), this.b = Math.max(0, this.b - color.b), this
    }
    multiply(color) {
        return this.r *= color.r, this.g *= color.g, this.b *= color.b, this
    }
    multiplyScalar(s) {
        return this.r *= s, this.g *= s, this.b *= s, this
    }
    invert() {
        return this.r = 1 - this.r, this.g = 1 - this.g, this.b = 1 - this.b, this
    }
    lerp(color, alpha) {
        return this.r += (color.r - this.r) * alpha, this.g += (color.g - this.g) * alpha, this.b += (color.b - this.b) * alpha, this
    }
    equals(c) {
        return c.r === this.r && c.g === this.g && c.b === this.b
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this.r = array[offset], this.g = array[offset + 1], this.b = array[offset + 2], this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this.r, array[offset + 1] = this.g, array[offset + 2] = this.b, array
    }
}
class Cylindrical {
    constructor(radius = 1, theta = 0, y = 0) {
        this.radius = radius, this.theta = theta, this.y = y
    }
    set(radius, theta, y) {
        return this.radius = radius, this.theta = theta, this.y = y, this
    }
    clone() {
        return (new this.constructor).copy(this)
    }
    copy(other) {
        return this.radius = other.radius, this.theta = other.theta, this.y = other.y, this
    }
    setFromVector3(vec3) {
        return this.radius = Math.sqrt(vec3.x * vec3.x + vec3.z * vec3.z), this.theta = Math.atan2(vec3.x, vec3.z), this.y = vec3.y, this
    }
}
class Euler {
    constructor(x, y, z, order) {
        this._x = x || 0, this._y = y || 0, this._z = z || 0, this._order = order || "XYZ", this.isEuler = !0
    }
    set x(value) {
        this._x = value, this.onChangeCallback()
    }
    get x() {
        return this._x
    }
    set y(value) {
        this._y = value, this.onChangeCallback()
    }
    get y() {
        return this._y
    }
    set z(value) {
        this._z = value, this.onChangeCallback()
    }
    get z() {
        return this._z
    }
    set order(value) {
        this._order = value, this.onChangeCallback()
    }
    get order() {
        return this._order
    }
    set(x, y, z, order) {
        return this._x = x, this._y = y, this._z = z, this._order = order || this._order, this.onChangeCallback(), this
    }
    clone() {
        return new Euler(this._x, this._y, this._z, this._order)
    }
    copy(euler) {
        return this._x = euler._x, this._y = euler._y, this._z = euler._z, this._order = euler._order, this.onChangeCallback(), this
    }
    setFromRotationMatrix(m, order, update) {
        let clamp = Math.clamp,
            te = m.elements,
            m11 = te[0],
            m12 = te[4],
            m13 = te[8],
            m21 = te[1],
            m22 = te[5],
            m23 = te[9],
            m31 = te[2],
            m32 = te[6],
            m33 = te[10];
        return "XYZ" === (order = order || this._order) ? (this._y = Math.asin(clamp(m13, -1, 1)), Math.abs(m13) < .99999 ? (this._x = Math.atan2(-m23, m33), this._z = Math.atan2(-m12, m11)) : (this._x = Math.atan2(m32, m22), this._z = 0)) : "YXZ" === order ? (this._x = Math.asin(-clamp(m23, -1, 1)), Math.abs(m23) < .99999 ? (this._y = Math.atan2(m13, m33), this._z = Math.atan2(m21, m22)) : (this._y = Math.atan2(-m31, m11), this._z = 0)) : "ZXY" === order ? (this._x = Math.asin(clamp(m32, -1, 1)), Math.abs(m32) < .99999 ? (this._y = Math.atan2(-m31, m33), this._z = Math.atan2(-m12, m22)) : (this._y = 0, this._z = Math.atan2(m21, m11))) : "ZYX" === order ? (this._y = Math.asin(-clamp(m31, -1, 1)), Math.abs(m31) < .99999 ? (this._x = Math.atan2(m32, m33), this._z = Math.atan2(m21, m11)) : (this._x = 0, this._z = Math.atan2(-m12, m22))) : "YZX" === order ? (this._z = Math.asin(clamp(m21, -1, 1)), Math.abs(m21) < .99999 ? (this._x = Math.atan2(-m23, m22), this._y = Math.atan2(-m31, m11)) : (this._x = 0, this._y = Math.atan2(m13, m33))) : "XZY" === order && (this._z = Math.asin(-clamp(m12, -1, 1)), Math.abs(m12) < .99999 ? (this._x = Math.atan2(m32, m22), this._y = Math.atan2(m13, m11)) : (this._x = Math.atan2(-m23, m33), this._y = 0)), this._order = order, !1 !== update && this.onChangeCallback(), this
    }
    setFromQuaternion(q, order, update) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.makeRotationFromQuaternion(q), this.setFromRotationMatrix(matrix, order, update)
    }
    setFromVector3(v, order) {
        return this.set(v.x, v.y, v.z, order || this._order)
    }
    reorder(newOrder) {
        let q = this.Q1 || new Quaternion;
        return this.Q1 = q, q.setFromEuler(this), this.setFromQuaternion(q, newOrder)
    }
    lerp(euler, alpha) {
        this._x += (euler._x - this._x) * alpha, this._y += (euler._y - this._y) * alpha, this._z += (euler._z - this._z) * alpha, this.onChangeCallback()
    }
    equals(euler) {
        return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order
    }
    fromArray(array) {
        return this._x = array[0], this._y = array[1], this._z = array[2], void 0 !== array[3] && (this._order = array[3]), this.onChangeCallback(), this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this._x, array[offset + 1] = this._y, array[offset + 2] = this._z, array[offset + 3] = this._order, array
    }
    toVector3(optionalResult) {
        return optionalResult ? optionalResult.set(this._x, this._y, this._z) : new Vector3(this._x, this._y, this._z)
    }
    onChange(callback) {
        this.onChangeCallback = callback
    }
    onChangeCallback() {}
}
Euler.DefaultOrder = "XYZ", Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
class Frustum {
    constructor(p0, p1, p2, p3, p4, p5) {
        this.planes = [void 0 !== p0 ? p0 : new Plane, void 0 !== p1 ? p1 : new Plane, void 0 !== p2 ? p2 : new Plane, void 0 !== p3 ? p3 : new Plane, void 0 !== p4 ? p4 : new Plane, void 0 !== p5 ? p5 : new Plane]
    }
    set(p0, p1, p2, p3, p4, p5) {
        let planes = this.planes;
        return planes[0].copy(p0), planes[1].copy(p1), planes[2].copy(p2), planes[3].copy(p3), planes[4].copy(p4), planes[5].copy(p5), this
    }
    clone() {
        return (new Frustum).copy(this)
    }
    copy(frustum) {
        let planes = this.planes;
        for (let i = 0; i < 6; i++) planes[i].copy(frustum.planes[i]);
        return this
    }
    setFromMatrix(m) {
        let planes = this.planes,
            me = m.elements,
            me0 = me[0],
            me1 = me[1],
            me2 = me[2],
            me3 = me[3],
            me4 = me[4],
            me5 = me[5],
            me6 = me[6],
            me7 = me[7],
            me8 = me[8],
            me9 = me[9],
            me10 = me[10],
            me11 = me[11],
            me12 = me[12],
            me13 = me[13],
            me14 = me[14],
            me15 = me[15];
        return planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize(), planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize(), planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize(), planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize(), planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize(), planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize(), this
    }
    setFromCamera(camera) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse), this.setFromMatrix(matrix)
    }
    intersectsObject(object) {
        let sphere = this.S1 || new Sphere;
        this.S1 = sphere;
        let geometry = object.geometry;
        return null === geometry.boundingSphere && geometry.computeBoundingSphere(), sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld), this.intersectsSphere(sphere)
    }
    intersectsSphere(sphere) {
        let planes = this.planes,
            center = sphere.center,
            negRadius = -sphere.radius;
        for (let i = 0; i < 6; i++) {
            if (planes[i].distanceToPoint(center) < negRadius) return !1
        }
        return !0
    }
    intersectsBox(box) {
        let p1 = this.V1 || new Vector3,
            p2 = this.V2 || new Vector3;
        this.V1 = p1, this.V2 = p2;
        let planes = this.planes;
        for (let i = 0; i < 6; i++) {
            let plane = planes[i];
            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x, p2.x = plane.normal.x > 0 ? box.max.x : box.min.x, p1.y = plane.normal.y > 0 ? box.min.y : box.max.y, p2.y = plane.normal.y > 0 ? box.max.y : box.min.y, p1.z = plane.normal.z > 0 ? box.min.z : box.max.z, p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;
            let d1 = plane.distanceToPoint(p1),
                d2 = plane.distanceToPoint(p2);
            if (d1 < 0 && d2 < 0) return !1
        }
        return !0
    }
    containsPoint(point) {
        let planes = this.planes;
        for (let i = 0; i < 6; i++)
            if (planes[i].distanceToPoint(point) < 0) return !1;
        return !0
    }
}
class Line3 {
    constructor(start = new Vector3, end = new Vector3) {
        this.start = start, this.end = end
    }
    set(start, end) {
        return this.start.copy(start), this.end.copy(end), this
    }
    clone() {
        return (new this.constructor).copy(this)
    }
    copy(line) {
        return this.start.copy(line.start), this.end.copy(line.end), this
    }
    getCenter(target = new Vector3) {
        return target.addVectors(this.start, this.end).multiplyScalar(.5)
    }
    delta(target = new Vector3) {
        return target.subVectors(this.end, this.start)
    }
    distanceSq() {
        return this.start.distanceToSquared(this.end)
    }
    distance() {
        return this.start.distanceTo(this.end)
    }
    at(t, target = new Vector3) {
        return this.delta(target).multiplyScalar(t).add(this.start)
    }
    closestPointToPointParameter(point, clampToLine) {
        let startP = this.V1 || new Vector3,
            startEnd = this.V2 || new Vector3;
        this.V1 = startP, this.V2 = startEnd, startP.subVectors(point, this.start), startEnd.subVectors(this.end, this.start);
        let startEnd2 = startEnd.dot(startEnd),
            t = startEnd.dot(startP) / startEnd2;
        return clampToLine && (t = Math.clamp(t, 0, 1)), t
    }
    closestPointToPoint(point, clampToLine, target = new Vector3) {
        let t = this.closestPointToPointParameter(point, clampToLine);
        return this.delta(target).multiplyScalar(t).add(this.start)
    }
    applyMatrix4(matrix) {
        return this.start.applyMatrix4(matrix), this.end.applyMatrix4(matrix), this
    }
    equals(line) {
        return line.start.equals(this.start) && line.end.equals(this.end)
    }
}
class Matrix3 {
    constructor() {
        this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        let te = this.elements;
        return te[0] = n11, te[1] = n21, te[2] = n31, te[3] = n12, te[4] = n22, te[5] = n32, te[6] = n13, te[7] = n23, te[8] = n33, this
    }
    identity() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
    }
    clone() {
        return (new Matrix3).fromArray(this.elements)
    }
    copy(m) {
        let te = this.elements,
            me = m.elements;
        return te[0] = me[0], te[1] = me[1], te[2] = me[2], te[3] = me[3], te[4] = me[4], te[5] = me[5], te[6] = me[6], te[7] = me[7], te[8] = me[8], this
    }
    setFromMatrix4(m) {
        let me = m.elements;
        return this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]), this
    }
    multiply(m) {
        return this.multiplyMatrices(this, m)
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this)
    }
    multiplyMatrices(a, b) {
        let ae = a.elements,
            be = b.elements,
            te = this.elements,
            a11 = ae[0],
            a12 = ae[3],
            a13 = ae[6],
            a21 = ae[1],
            a22 = ae[4],
            a23 = ae[7],
            a31 = ae[2],
            a32 = ae[5],
            a33 = ae[8],
            b11 = be[0],
            b12 = be[3],
            b13 = be[6],
            b21 = be[1],
            b22 = be[4],
            b23 = be[7],
            b31 = be[2],
            b32 = be[5],
            b33 = be[8];
        return te[0] = a11 * b11 + a12 * b21 + a13 * b31, te[3] = a11 * b12 + a12 * b22 + a13 * b32, te[6] = a11 * b13 + a12 * b23 + a13 * b33, te[1] = a21 * b11 + a22 * b21 + a23 * b31, te[4] = a21 * b12 + a22 * b22 + a23 * b32, te[7] = a21 * b13 + a22 * b23 + a23 * b33, te[2] = a31 * b11 + a32 * b21 + a33 * b31, te[5] = a31 * b12 + a32 * b22 + a33 * b32, te[8] = a31 * b13 + a32 * b23 + a33 * b33, this
    }
    multiplyScalar(s) {
        let te = this.elements;
        return te[0] *= s, te[3] *= s, te[6] *= s, te[1] *= s, te[4] *= s, te[7] *= s, te[2] *= s, te[5] *= s, te[8] *= s, this
    }
    determinant() {
        let te = this.elements,
            a = te[0],
            b = te[1],
            c = te[2],
            d = te[3],
            e = te[4],
            f = te[5],
            g = te[6],
            h = te[7],
            i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g
    }
    getInverse(matrix, throwOnDegenerate) {
        let me = matrix.elements,
            te = this.elements,
            n11 = me[0],
            n21 = me[1],
            n31 = me[2],
            n12 = me[3],
            n22 = me[4],
            n32 = me[5],
            n13 = me[6],
            n23 = me[7],
            n33 = me[8],
            t11 = n33 * n22 - n32 * n23,
            t12 = n32 * n13 - n33 * n12,
            t13 = n23 * n12 - n22 * n13,
            det = n11 * t11 + n21 * t12 + n31 * t13;
        if (0 === det) {
            let msg = ".getInverse() can't invert matrix, determinant is 0";
            if (!0 === throwOnDegenerate) throw new Error(msg);
            return this.identity()
        }
        let detInv = 1 / det;
        return te[0] = t11 * detInv, te[1] = (n31 * n23 - n33 * n21) * detInv, te[2] = (n32 * n21 - n31 * n22) * detInv, te[3] = t12 * detInv, te[4] = (n33 * n11 - n31 * n13) * detInv, te[5] = (n31 * n12 - n32 * n11) * detInv, te[6] = t13 * detInv, te[7] = (n21 * n13 - n23 * n11) * detInv, te[8] = (n22 * n11 - n21 * n12) * detInv, this
    }
    transpose() {
        let tmp, m = this.elements;
        return tmp = m[1], m[1] = m[3], m[3] = tmp, tmp = m[2], m[2] = m[6], m[6] = tmp, tmp = m[5], m[5] = m[7], m[7] = tmp, this
    }
    getNormalMatrix(matrix4) {
        return this.setFromMatrix4(matrix4).getInverse(this).transpose()
    }
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
        let c = Math.cos(rotation),
            s = Math.sin(rotation);
        this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1)
    }
    scale(sx, sy) {
        let te = this.elements;
        return te[0] *= sx, te[3] *= sx, te[6] *= sx, te[1] *= sy, te[4] *= sy, te[7] *= sy, this
    }
    rotate(theta) {
        let c = Math.cos(theta),
            s = Math.sin(theta),
            te = this.elements,
            a11 = te[0],
            a12 = te[3],
            a13 = te[6],
            a21 = te[1],
            a22 = te[4],
            a23 = te[7];
        return te[0] = c * a11 + s * a21, te[3] = c * a12 + s * a22, te[6] = c * a13 + s * a23, te[1] = -s * a11 + c * a21, te[4] = -s * a12 + c * a22, te[7] = -s * a13 + c * a23, this
    }
    translate(tx, ty) {
        let te = this.elements;
        return te[0] += tx * te[2], te[3] += tx * te[5], te[6] += tx * te[8], te[1] += ty * te[2], te[4] += ty * te[5], te[7] += ty * te[8], this
    }
    equals(matrix) {
        let te = this.elements,
            me = matrix.elements;
        for (let i = 0; i < 9; i++)
            if (te[i] !== me[i]) return !1;
        return !0
    }
    fromArray(array, offset) {
        void 0 === offset && (offset = 0);
        for (let i = 0; i < 9; i++) this.elements[i] = array[i + offset];
        return this
    }
    toArray(array, offset) {
        void 0 === array && (array = []), void 0 === offset && (offset = 0);
        let te = this.elements;
        return array[offset] = te[0], array[offset + 1] = te[1], array[offset + 2] = te[2], array[offset + 3] = te[3], array[offset + 4] = te[4], array[offset + 5] = te[5], array[offset + 6] = te[6], array[offset + 7] = te[7], array[offset + 8] = te[8], array
    }
    applyToBufferAttribute(attribute) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        for (let i = 0, l = attribute.count; i < l; i++) v1.x = attribute.array[3 * i + 0], v1.y = attribute.array[3 * i + 1], v1.z = attribute.array[3 * i + 2], v1.applyMatrix3(this), attribute.array[3 * i + 0] = v1.x, attribute.array[3 * i + 1] = v1.y, attribute.array[3 * i + 2] = v1.z;
        return attribute
    }
}
class Matrix4 {
    constructor() {
        this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }
    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        let te = this.elements;
        return te[0] = n11, te[4] = n12, te[8] = n13, te[12] = n14, te[1] = n21, te[5] = n22, te[9] = n23, te[13] = n24, te[2] = n31, te[6] = n32, te[10] = n33, te[14] = n34, te[3] = n41, te[7] = n42, te[11] = n43, te[15] = n44, this
    }
    identity() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    clone() {
        return (new Matrix4).fromArray(this.elements)
    }
    copy(m) {
        let te = this.elements,
            me = m.elements;
        return te[0] = me[0], te[1] = me[1], te[2] = me[2], te[3] = me[3], te[4] = me[4], te[5] = me[5], te[6] = me[6], te[7] = me[7], te[8] = me[8], te[9] = me[9], te[10] = me[10], te[11] = me[11], te[12] = me[12], te[13] = me[13], te[14] = me[14], te[15] = me[15], this
    }
    copyPosition(m) {
        let te = this.elements,
            me = m.elements;
        return te[12] = me[12], te[13] = me[13], te[14] = me[14], this
    }
    extractBasis(xAxis, yAxis, zAxis) {
        return xAxis.setFromMatrixColumn(this, 0), yAxis.setFromMatrixColumn(this, 1), zAxis.setFromMatrixColumn(this, 2), this
    }
    makeBasis(xAxis, yAxis, zAxis) {
        return this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1), this
    }
    extractRotation(m) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let te = this.elements,
            me = m.elements,
            scaleX = 1 / v1.setFromMatrixColumn(m, 0).length(),
            scaleY = 1 / v1.setFromMatrixColumn(m, 1).length(),
            scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
        return te[0] = me[0] * scaleX, te[1] = me[1] * scaleX, te[2] = me[2] * scaleX, te[4] = me[4] * scaleY, te[5] = me[5] * scaleY, te[6] = me[6] * scaleY, te[8] = me[8] * scaleZ, te[9] = me[9] * scaleZ, te[10] = me[10] * scaleZ, this
    }
    makeRotationFromEuler(euler) {
        let te = this.elements,
            x = euler.x,
            y = euler.y,
            z = euler.z,
            a = Math.cos(x),
            b = Math.sin(x),
            c = Math.cos(y),
            d = Math.sin(y),
            e = Math.cos(z),
            f = Math.sin(z);
        if ("XYZ" === euler.order) {
            let ae = a * e,
                af = a * f,
                be = b * e,
                bf = b * f;
            te[0] = c * e, te[4] = -c * f, te[8] = d, te[1] = af + be * d, te[5] = ae - bf * d, te[9] = -b * c, te[2] = bf - ae * d, te[6] = be + af * d, te[10] = a * c
        } else if ("YXZ" === euler.order) {
            let ce = c * e,
                cf = c * f,
                de = d * e,
                df = d * f;
            te[0] = ce + df * b, te[4] = de * b - cf, te[8] = a * d, te[1] = a * f, te[5] = a * e, te[9] = -b, te[2] = cf * b - de, te[6] = df + ce * b, te[10] = a * c
        } else if ("ZXY" === euler.order) {
            let ce = c * e,
                cf = c * f,
                de = d * e,
                df = d * f;
            te[0] = ce - df * b, te[4] = -a * f, te[8] = de + cf * b, te[1] = cf + de * b, te[5] = a * e, te[9] = df - ce * b, te[2] = -a * d, te[6] = b, te[10] = a * c
        } else if ("ZYX" === euler.order) {
            let ae = a * e,
                af = a * f,
                be = b * e,
                bf = b * f;
            te[0] = c * e, te[4] = be * d - af, te[8] = ae * d + bf, te[1] = c * f, te[5] = bf * d + ae, te[9] = af * d - be, te[2] = -d, te[6] = b * c, te[10] = a * c
        } else if ("YZX" === euler.order) {
            let ac = a * c,
                ad = a * d,
                bc = b * c,
                bd = b * d;
            te[0] = c * e, te[4] = bd - ac * f, te[8] = bc * f + ad, te[1] = f, te[5] = a * e, te[9] = -b * e, te[2] = -d * e, te[6] = ad * f + bc, te[10] = ac - bd * f
        } else if ("XZY" === euler.order) {
            let ac = a * c,
                ad = a * d,
                bc = b * c,
                bd = b * d;
            te[0] = c * e, te[4] = -f, te[8] = d * e, te[1] = ac * f + bd, te[5] = a * e, te[9] = ad * f - bc, te[2] = bc * f - ad, te[6] = b * e, te[10] = bd * f + ac
        }
        return te[3] = 0, te[7] = 0, te[11] = 0, te[12] = 0, te[13] = 0, te[14] = 0, te[15] = 1, this
    }
    makeRotationFromQuaternion(q) {
        let te = this.elements,
            x = q._x,
            y = q._y,
            z = q._z,
            w = q._w;
        if (window.NativeUtils && NativeUtils.makeRotationFromQuaternion) NativeUtils.makeRotationFromQuaternion(te, x, y, z, w);
        else {
            let x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;
            te[0] = 1 - (yy + zz), te[4] = xy - wz, te[8] = xz + wy, te[1] = xy + wz, te[5] = 1 - (xx + zz), te[9] = yz - wx, te[2] = xz - wy, te[6] = yz + wx, te[10] = 1 - (xx + yy), te[3] = 0, te[7] = 0, te[11] = 0, te[12] = 0, te[13] = 0, te[14] = 0, te[15] = 1
        }
        return this
    }
    lookAt(eye, target, up) {
        let x = this.V1 || new Vector3,
            y = this.V2 || new Vector3,
            z = this.V3 || new Vector3;
        this.V1 = x, this.V2 = y, this.V3 = z;
        let te = this.elements;
        return z.subVectors(eye, target), 0 === z.lengthSq() && (z.z = 1), z.normalize(), x.crossVectors(up, z), 0 === x.lengthSq() && (1 === Math.abs(up.z) ? z.x += 1e-4 : z.z += 1e-4, z.normalize(), x.crossVectors(up, z)), x.normalize(), y.crossVectors(z, x), te[0] = x.x, te[4] = y.x, te[8] = z.x, te[1] = x.y, te[5] = y.y, te[9] = z.y, te[2] = x.z, te[6] = y.z, te[10] = z.z, this
    }
    multiply(m) {
        return this.multiplyMatrices(this, m)
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this)
    }
    multiplyMatrices(a, b) {
        let ae = a.elements,
            be = b.elements,
            te = this.elements;
        if (window.NativeUtils && NativeUtils.multiplyMatrices) NativeUtils.multiplyMatrices(ae, be, te);
        else {
            let a11 = ae[0],
                a12 = ae[4],
                a13 = ae[8],
                a14 = ae[12],
                a21 = ae[1],
                a22 = ae[5],
                a23 = ae[9],
                a24 = ae[13],
                a31 = ae[2],
                a32 = ae[6],
                a33 = ae[10],
                a34 = ae[14],
                a41 = ae[3],
                a42 = ae[7],
                a43 = ae[11],
                a44 = ae[15],
                b11 = be[0],
                b12 = be[4],
                b13 = be[8],
                b14 = be[12],
                b21 = be[1],
                b22 = be[5],
                b23 = be[9],
                b24 = be[13],
                b31 = be[2],
                b32 = be[6],
                b33 = be[10],
                b34 = be[14],
                b41 = be[3],
                b42 = be[7],
                b43 = be[11],
                b44 = be[15];
            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41, te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42, te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43, te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44, te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41, te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42, te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43, te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44, te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41, te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42, te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43, te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44, te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41, te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42, te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43, te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
        }
        return this
    }
    multiplyScalar(s) {
        let te = this.elements;
        return te[0] *= s, te[4] *= s, te[8] *= s, te[12] *= s, te[1] *= s, te[5] *= s, te[9] *= s, te[13] *= s, te[2] *= s, te[6] *= s, te[10] *= s, te[14] *= s, te[3] *= s, te[7] *= s, te[11] *= s, te[15] *= s, this
    }
    determinant() {
        let te = this.elements,
            n11 = te[0],
            n12 = te[4],
            n13 = te[8],
            n14 = te[12],
            n21 = te[1],
            n22 = te[5],
            n23 = te[9],
            n24 = te[13],
            n31 = te[2],
            n32 = te[6],
            n33 = te[10],
            n34 = te[14];
        return te[3] * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + te[7] * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + te[11] * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + te[15] * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31)
    }
    transpose() {
        let tmp, te = this.elements;
        return tmp = te[1], te[1] = te[4], te[4] = tmp, tmp = te[2], te[2] = te[8], te[8] = tmp, tmp = te[6], te[6] = te[9], te[9] = tmp, tmp = te[3], te[3] = te[12], te[12] = tmp, tmp = te[7], te[7] = te[13], te[13] = tmp, tmp = te[11], te[11] = te[14], te[14] = tmp, this
    }
    setPosition(v) {
        let te = this.elements;
        return te[12] = v.x, te[13] = v.y, te[14] = v.z, this
    }
    getInverse(m, throwOnDegenerate) {
        let te = this.elements,
            me = m.elements,
            n11 = me[0],
            n21 = me[1],
            n31 = me[2],
            n41 = me[3],
            n12 = me[4],
            n22 = me[5],
            n32 = me[6],
            n42 = me[7],
            n13 = me[8],
            n23 = me[9],
            n33 = me[10],
            n43 = me[11],
            n14 = me[12],
            n24 = me[13],
            n34 = me[14],
            n44 = me[15],
            t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
            t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
            t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
            t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34,
            det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (0 === det) {
            let msg = ".getInverse() can't invert matrix, determinant is 0";
            if (!0 === throwOnDegenerate) throw new Error(msg);
            return this.identity()
        }
        let detInv = 1 / det;
        return te[0] = t11 * detInv, te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv, te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv, te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv, te[4] = t12 * detInv, te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv, te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv, te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv, te[8] = t13 * detInv, te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv, te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv, te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv, te[12] = t14 * detInv, te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv, te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv, te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv, this
    }
    scale(v) {
        let te = this.elements,
            x = v.x,
            y = v.y,
            z = v.z;
        return window.NativeUtils && NativeUtils.scaleMatrix ? NativeUtils.scaleMatrix(te, x, y, z) : (te[0] *= x, te[4] *= y, te[8] *= z, te[1] *= x, te[5] *= y, te[9] *= z, te[2] *= x, te[6] *= y, te[10] *= z, te[3] *= x, te[7] *= y, te[11] *= z), this
    }
    getMaxScaleOnAxis() {
        let te = this.elements;
        if (window.NativeUtils && NativeUtils.getMaxScaleOnAxis) return NativeUtils.getMaxScaleOnAxis(te); {
            let scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2],
                scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6],
                scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq))
        }
    }
    makeTranslation(x, y, z) {
        return this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1), this
    }
    makeRotationX(theta) {
        let c = Math.cos(theta),
            s = Math.sin(theta);
        return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1), this
    }
    makeRotationY(theta) {
        let c = Math.cos(theta),
            s = Math.sin(theta);
        return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1), this
    }
    makeRotationZ(theta) {
        let c = Math.cos(theta),
            s = Math.sin(theta);
        return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    makeRotationAxis(axis, angle) {
        let c = Math.cos(angle),
            s = Math.sin(angle),
            t = 1 - c,
            x = axis.x,
            y = axis.y,
            z = axis.z,
            tx = t * x,
            ty = t * y;
        return this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1), this
    }
    makeScale(x, y, z) {
        return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1), this
    }
    makeShear(x, y, z) {
        return this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1), this
    }
    compose(position, quaternion, scale) {
        return this.makeRotationFromQuaternion(quaternion), this.scale(scale), this.setPosition(position), this
    }
    decompose(position, quaternion, scale) {
        let vector = this.V1 || new Vector3;
        this.V1 = vector;
        let matrix = this.M1 || new Matrix4;
        this.M1 = matrix;
        let te = this.elements,
            sx = vector.set(te[0], te[1], te[2]).length(),
            sy = vector.set(te[4], te[5], te[6]).length(),
            sz = vector.set(te[8], te[9], te[10]).length();
        this.determinant() < 0 && (sx = -sx), position.x = te[12], position.y = te[13], position.z = te[14], matrix.copy(this);
        let invSX = 1 / sx,
            invSY = 1 / sy,
            invSZ = 1 / sz;
        return matrix.elements[0] *= invSX, matrix.elements[1] *= invSX, matrix.elements[2] *= invSX, matrix.elements[4] *= invSY, matrix.elements[5] *= invSY, matrix.elements[6] *= invSY, matrix.elements[8] *= invSZ, matrix.elements[9] *= invSZ, matrix.elements[10] *= invSZ, quaternion.setFromRotationMatrix(matrix), scale.x = sx, scale.y = sy, scale.z = sz, this
    }
    makePerspective(left, right, top, bottom, near, far) {
        let te = this.elements,
            x = 2 * near / (right - left),
            y = 2 * near / (top - bottom),
            a = (right + left) / (right - left),
            b = (top + bottom) / (top - bottom),
            c = -(far + near) / (far - near),
            d = -2 * far * near / (far - near);
        return te[0] = x, te[4] = 0, te[8] = a, te[12] = 0, te[1] = 0, te[5] = y, te[9] = b, te[13] = 0, te[2] = 0, te[6] = 0, te[10] = c, te[14] = d, te[3] = 0, te[7] = 0, te[11] = -1, te[15] = 0, this
    }
    makeOrthographic(left, right, top, bottom, near, far) {
        let te = this.elements,
            w = 1 / (right - left),
            h = 1 / (top - bottom),
            p = 1 / (far - near),
            x = (right + left) * w,
            y = (top + bottom) * h,
            z = (far + near) * p;
        return te[0] = 2 * w, te[4] = 0, te[8] = 0, te[12] = -x, te[1] = 0, te[5] = 2 * h, te[9] = 0, te[13] = -y, te[2] = 0, te[6] = 0, te[10] = -2 * p, te[14] = -z, te[3] = 0, te[7] = 0, te[11] = 0, te[15] = 1, this
    }
    equals(matrix) {
        let te = this.elements,
            me = matrix.elements;
        if (window.NativeUtils && NativeUtils.arrayEquals) return NativeUtils.arrayEquals(te, me);
        for (let i = 0; i < 16; i++)
            if (te[i] !== me[i]) return !1;
        return !0
    }
    fromArray(array, offset) {
        void 0 === offset && (offset = 0);
        for (let i = 0; i < 16; i++) this.elements[i] = array[i + offset];
        return this
    }
    toArray(array, offset) {
        void 0 === array && (array = []), void 0 === offset && (offset = 0);
        let te = this.elements;
        return array[offset] = te[0], array[offset + 1] = te[1], array[offset + 2] = te[2], array[offset + 3] = te[3], array[offset + 4] = te[4], array[offset + 5] = te[5], array[offset + 6] = te[6], array[offset + 7] = te[7], array[offset + 8] = te[8], array[offset + 9] = te[9], array[offset + 10] = te[10], array[offset + 11] = te[11], array[offset + 12] = te[12], array[offset + 13] = te[13], array[offset + 14] = te[14], array[offset + 15] = te[15], array
    }
    applyToBufferAttribute(attribute) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        for (let i = 0, l = attribute.count; i < l; i++) v1.x = attribute.array[3 * i + 0], v1.y = attribute.array[3 * i + 1], v1.z = attribute.array[3 * i + 2], v1.applyMatrix4(this), attribute.array[3 * i + 0] = v1.x, attribute.array[3 * i + 1] = v1.y, attribute.array[3 * i + 2] = v1.z;
        return attribute
    }
    isIdentity() {
        return this.equals(Matrix4.__IDENTITY__)
    }
}
Matrix4.__IDENTITY__ = new Matrix4;
class Plane {
    constructor(normal, constant) {
        this.normal = void 0 !== normal ? normal : new Vector3(1, 0, 0), this.constant = void 0 !== constant ? constant : 0
    }
    set(normal, constant) {
        return this.normal.copy(normal), this.constant = constant, this
    }
    setComponents(x, y, z, w) {
        return this.normal.set(x, y, z), this.constant = w, this
    }
    setFromNormalAndCoplanarPoint(normal, point) {
        return this.normal.copy(normal), this.constant = -point.dot(this.normal), this
    }
    setFromCoplanarPoints(a, b, c) {
        let v1 = this.V1 || new Vector3,
            v2 = this.V2 || new Vector3;
        this.V1 = v1, this.V2 = v2;
        var normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).normalize();
        return this.setFromNormalAndCoplanarPoint(normal, a), this
    }
    clone() {
        return (new Plane).copy(this)
    }
    copy(plane) {
        return this.normal.copy(plane.normal), this.constant = plane.constant, this
    }
    normalize() {
        var inverseNormalLength = 1 / this.normal.length();
        return this.normal.multiplyScalar(inverseNormalLength), this.constant *= inverseNormalLength, this
    }
    negate() {
        return this.constant *= -1, this.normal.negate(), this
    }
    distanceToPoint(point) {
        return this.normal.dot(point) + this.constant
    }
    distanceToSphere(sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius
    }
    projectPoint(point, target) {
        return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point)
    }
    intersectLine(line, target) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        var direction = line.delta(v1),
            denominator = this.normal.dot(direction);
        if (0 === denominator) return 0 === this.distanceToPoint(line.start) ? target.copy(line.start) : void 0;
        var t = -(line.start.dot(this.normal) + this.constant) / denominator;
        return t < 0 || t > 1 ? void 0 : target.copy(direction).multiplyScalar(t).add(line.start)
    }
    intersectsLine(line) {
        var startSign = this.distanceToPoint(line.start),
            endSign = this.distanceToPoint(line.end);
        return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0
    }
    intersectsBox(box) {
        return box.intersectsPlane(this)
    }
    intersectsSphere(sphere) {
        return sphere.intersectsPlane(this)
    }
    coplanarPoint(target) {
        return target.copy(this.normal).multiplyScalar(-this.constant)
    }
    applyMatrix4(matrix, optionalNormalMatrix) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let m1 = this.M1 || new Matrix3;
        this.M1 = m1;
        var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix),
            referencePoint = this.coplanarPoint(v1).applyMatrix4(matrix),
            normal = this.normal.applyMatrix3(normalMatrix).normalize();
        return this.constant = -referencePoint.dot(normal), this
    }
    translate(offset) {
        return this.constant -= offset.dot(this.normal), this
    }
    equals(plane) {
        return plane.normal.equals(this.normal) && plane.constant === this.constant
    }
}
class Quaternion {
    constructor(x, y, z, w) {
        this._x = x || 0, this._y = y || 0, this._z = z || 0, this._w = void 0 !== w ? w : 1
    }
    set x(v) {
        this._x = v, this.onChangeCallback && this.onChangeCallback()
    }
    get x() {
        return this._x
    }
    set y(v) {
        this._y = v, this.onChangeCallback && this.onChangeCallback()
    }
    get y() {
        return this._y
    }
    set z(v) {
        this._z = v, this.onChangeCallback && this.onChangeCallback()
    }
    get z() {
        return this._z
    }
    set w(v) {
        this._w = v, this.onChangeCallback && this.onChangeCallback()
    }
    get w() {
        return this._w
    }
    clone() {
        return new Quaternion(this._x, this._y, this._z, this._w)
    }
    copy(quaternion) {
        return this._x = quaternion.x, this._y = quaternion.y, this._z = quaternion.z, this._w = quaternion.w, this.onChangeCallback(), this
    }
    set(x, y, z, w) {
        this._x = x, this._y = y, this._z = z, this._w = w, this.onChangeCallback()
    }
    setFromEuler(euler, update) {
        let x = euler._x,
            y = euler._y,
            z = euler._z,
            order = euler.order,
            cos = Math.cos,
            sin = Math.sin,
            c1 = cos(x / 2),
            c2 = cos(y / 2),
            c3 = cos(z / 2),
            s1 = sin(x / 2),
            s2 = sin(y / 2),
            s3 = sin(z / 2);
        return "XYZ" === order ? (this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3) : "YXZ" === order ? (this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3) : "ZXY" === order ? (this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3) : "ZYX" === order ? (this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3) : "YZX" === order ? (this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3) : "XZY" === order && (this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3), !1 !== update && this.onChangeCallback(), this
    }
    setFromAxisAngle(axis, angle) {
        let halfAngle = angle / 2,
            s = Math.sin(halfAngle);
        return this._x = axis.x * s, this._y = axis.y * s, this._z = axis.z * s, this._w = Math.cos(halfAngle), this.onChangeCallback(), this
    }
    setFromRotationMatrix(m) {
        let s, te = m.elements,
            m11 = te[0],
            m12 = te[4],
            m13 = te[8],
            m21 = te[1],
            m22 = te[5],
            m23 = te[9],
            m31 = te[2],
            m32 = te[6],
            m33 = te[10],
            trace = m11 + m22 + m33;
        return trace > 0 ? (s = .5 / Math.sqrt(trace + 1), this._w = .25 / s, this._x = (m32 - m23) * s, this._y = (m13 - m31) * s, this._z = (m21 - m12) * s) : m11 > m22 && m11 > m33 ? (s = 2 * Math.sqrt(1 + m11 - m22 - m33), this._w = (m32 - m23) / s, this._x = .25 * s, this._y = (m12 + m21) / s, this._z = (m13 + m31) / s) : m22 > m33 ? (s = 2 * Math.sqrt(1 + m22 - m11 - m33), this._w = (m13 - m31) / s, this._x = (m12 + m21) / s, this._y = .25 * s, this._z = (m23 + m32) / s) : (s = 2 * Math.sqrt(1 + m33 - m11 - m22), this._w = (m21 - m12) / s, this._x = (m13 + m31) / s, this._y = (m23 + m32) / s, this._z = .25 * s), this.onChangeCallback(), this
    }
    setFromUnitVectors(vFrom, vTo) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let r = vFrom.dot(vTo) + 1;
        return r < 1e-6 ? (r = 0, Math.abs(vFrom.x) > Math.abs(vFrom.z) ? v1.set(-vFrom.y, vFrom.x, 0) : v1.set(0, -vFrom.z, vFrom.y)) : v1.crossVectors(vFrom, vTo), this._x = v1.x, this._y = v1.y, this._z = v1.z, this._w = r, this.normalize()
    }
    inverse() {
        return this.conjugate()
    }
    conjugate() {
        return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
    }
    dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    }
    normalize() {
        let l = this.length();
        return 0 === l ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (l = 1 / l, this._x = this._x * l, this._y = this._y * l, this._z = this._z * l, this._w = this._w * l), this.onChangeCallback(), this
    }
    multiply(q) {
        return this.multiplyQuaternions(this, q)
    }
    premultiply(q) {
        return this.multiplyQuaternions(q, this)
    }
    multiplyQuaternions(a, b) {
        let qax = a._x,
            qay = a._y,
            qaz = a._z,
            qaw = a._w,
            qbx = b._x,
            qby = b._y,
            qbz = b._z,
            qbw = b._w;
        return this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby, this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz, this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx, this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz, this.onChangeCallback(), this
    }
    slerp(qb, t) {
        if (0 === (t = Math.clamp(t * Render.HZ_MULTIPLIER, 0, 1))) return this;
        if (1 === t) return this.copy(qb);
        let x = this._x,
            y = this._y,
            z = this._z,
            w = this._w,
            cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0 ? (this._w = -qb._w, this._x = -qb._x, this._y = -qb._y, this._z = -qb._z, cosHalfTheta = -cosHalfTheta) : this.copy(qb), cosHalfTheta >= 1) return this._w = w, this._x = x, this._y = y, this._z = z, this;
        let sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < .001) return this._w = .5 * (w + this._w), this._x = .5 * (x + this._x), this._y = .5 * (y + this._y), this._z = .5 * (z + this._z), this;
        let halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta),
            ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        return this._w = w * ratioA + this._w * ratioB, this._x = x * ratioA + this._x * ratioB, this._y = y * ratioA + this._y * ratioB, this._z = z * ratioA + this._z * ratioB, this.onChangeCallback(), this
    }
    equals(quaternion) {
        return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this._x = array[offset], this._y = array[offset + 1], this._z = array[offset + 2], this._w = array[offset + 3], this.onChangeCallback(), this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this._x, array[offset + 1] = this._y, array[offset + 2] = this._z, array[offset + 3] = this._w, array
    }
    onChange(callback) {
        this.onChangeCallback = callback
    }
    onChangeCallback() {}
}
class RayManager {
    constructor(origin, direction, near = 0, far = 1 / 0) {
        this.ray = new Ray(origin, direction), this.near = near, this.far = far, this.params = {
            Mesh: {},
            Points: {
                threshold: 1
            }
        }
    }
    set(origin, direction) {
        return this.ray.set(origin, direction), this
    }
    setFromCamera(coords, camera) {
        camera.isPerspective ? (this.ray.origin.setFromMatrixPosition(camera.matrixWorld), this.ray.direction.set(coords.x, coords.y, .5).unproject(camera).sub(this.ray.origin).normalize()) : (this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera), this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld))
    }
    _ascSort(a, b) {
        return a.distance - b.distance
    }
    _intersectObject(object, raycaster, intersects, recursive) {
        if (!1 !== object.visible && (object.raycast(raycaster, intersects), !0 === recursive)) {
            let children = object.children;
            for (let i = 0, l = children.length; i < l; i++) this._intersectObject(children[i], raycaster, intersects, !0)
        }
    }
    intersectObject(object, recursive, optionalTarget) {
        let intersects = optionalTarget || [];
        return this._intersectObject(object, this, intersects, recursive), intersects.sort(this._ascSort), intersects
    }
    intersectObjects(objects, recursive, optionalTarget) {
        let intersects = optionalTarget || [];
        for (let i = 0, l = objects.length; i < l; i++) this._intersectObject(objects[i], this, intersects, recursive);
        return intersects.sort(this._ascSort), intersects
    }
}
class Ray {
    constructor(origin = new Vector3, direction = new Vector3) {
        this.origin = origin, this.direction = direction
    }
    set(origin, direction) {
        return this.origin.copy(origin), this.direction.copy(direction), this
    }
    clone() {
        return (new Ray).copy(this)
    }
    copy(ray) {
        return this.origin.copy(ray.origin), this.direction.copy(ray.direction), this
    }
    at(t, target = new Vector3) {
        return target.copy(this.direction).multiplyScalar(t).add(this.origin)
    }
    lookAt(v) {
        return this.direction.copy(v).sub(this.origin).normalize(), this
    }
    recast(t) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1, this.origin.copy(this.at(t, v1))
    }
    closestPointToPoint(point, target = new Vector3) {
        target.subVectors(point, this.origin);
        let directionDistance = target.dot(this.direction);
        return directionDistance < 0 ? target.copy(this.origin) : target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin)
    }
    distanceToPoint(point) {
        return Math.sqrt(this.distanceSqToPoint(point))
    }
    distanceSqToPoint(point) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1;
        let directionDistance = v1.subVectors(point, this.origin).dot(this.direction);
        return directionDistance < 0 ? this.origin.distanceToSquared(point) : (v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin), v1.distanceToSquared(point))
    }
    distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
        let segCenter = this.V1 || new Vector3,
            segDir = this.V2 || new Vector3,
            diff = this.V3 || new Vector3;
        this.V1 = segCenter, this.V2 = segDir, this.V3 = diff, segCenter.copy(v0).add(v1).multiplyScalar(.5), segDir.copy(v1).sub(v0).normalize(), diff.copy(this.origin).sub(segCenter);
        let s0, s1, sqrDist, extDet, segExtent = .5 * v0.distanceTo(v1),
            a01 = -this.direction.dot(segDir),
            b0 = diff.dot(this.direction),
            b1 = -diff.dot(segDir),
            c = diff.lengthSq(),
            det = Math.abs(1 - a01 * a01);
        if (det > 0)
            if (s0 = a01 * b1 - b0, s1 = a01 * b0 - b1, extDet = segExtent * det, s0 >= 0)
                if (s1 >= -extDet)
                    if (s1 <= extDet) {
                        let invDet = 1 / det;
                        s0 *= invDet, s1 *= invDet, sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c
                    } else s1 = segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        else s1 = -segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        else s1 <= -extDet ? (s0 = Math.max(0, -(-a01 * segExtent + b0)), s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c) : s1 <= extDet ? (s0 = 0, s1 = Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = s1 * (s1 + 2 * b1) + c) : (s0 = Math.max(0, -(a01 * segExtent + b0)), s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c);
        else s1 = a01 > 0 ? -segExtent : segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        return optionalPointOnRay && optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin), optionalPointOnSegment && optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter), sqrDist
    }
    intersectSphere(sphere, target) {
        let v1 = this.V1 || new Vector3;
        this.V1 = v1, v1.subVectors(sphere.center, this.origin);
        let tca = v1.dot(this.direction),
            d2 = v1.dot(v1) - tca * tca,
            radius2 = sphere.radius * sphere.radius;
        if (d2 > radius2) return null;
        let thc = Math.sqrt(radius2 - d2),
            t0 = tca - thc,
            t1 = tca + thc;
        return t0 < 0 && t1 < 0 ? null : t0 < 0 ? this.at(t1, target) : this.at(t0, target)
    }
    intersectsSphere(sphere) {
        return this.distanceToPoint(sphere.center) <= sphere.radius
    }
    distanceToPlane(plane) {
        let denominator = plane.normal.dot(this.direction);
        if (0 === denominator) return 0 === plane.distanceToPoint(this.origin) ? 0 : null;
        let t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
        return t >= 0 ? t : null
    }
    intersectPlane(plane, target) {
        let t = this.distanceToPlane(plane);
        return null === t ? null : this.at(t, target)
    }
    intersectsPlane(plane) {
        let distToPoint = plane.distanceToPoint(this.origin);
        return 0 === distToPoint || plane.normal.dot(this.direction) * distToPoint < 0
    }
    intersectBox(box, target) {
        let tmin, tmax, tymin, tymax, tzmin, tzmax, invdirx = 1 / this.direction.x,
            invdiry = 1 / this.direction.y,
            invdirz = 1 / this.direction.z,
            origin = this.origin;
        return invdirx >= 0 ? (tmin = (box.min.x - origin.x) * invdirx, tmax = (box.max.x - origin.x) * invdirx) : (tmin = (box.max.x - origin.x) * invdirx, tmax = (box.min.x - origin.x) * invdirx), invdiry >= 0 ? (tymin = (box.min.y - origin.y) * invdiry, tymax = (box.max.y - origin.y) * invdiry) : (tymin = (box.max.y - origin.y) * invdiry, tymax = (box.min.y - origin.y) * invdiry), tmin > tymax || tymin > tmax ? null : ((tymin > tmin || tmin != tmin) && (tmin = tymin), (tymax < tmax || tmax != tmax) && (tmax = tymax), invdirz >= 0 ? (tzmin = (box.min.z - origin.z) * invdirz, tzmax = (box.max.z - origin.z) * invdirz) : (tzmin = (box.max.z - origin.z) * invdirz, tzmax = (box.min.z - origin.z) * invdirz), tmin > tzmax || tzmin > tmax ? null : ((tzmin > tmin || tmin != tmin) && (tmin = tzmin), (tzmax < tmax || tmax != tmax) && (tmax = tzmax), tmax < 0 ? null : this.at(tmin >= 0 ? tmin : tmax, target)))
    }
    intersectsBox(box) {
        let v = this.V1 || new Vector3;
        return this.V1 = v, null !== this.intersectBox(box, v)
    }
    intersectsTriangle(a, b, c, backfaceCulling, target) {
        let diff = this.V1 || new Vector3,
            edge1 = this.V2 || new Vector3,
            edge2 = this.V3 || new Vector3,
            normal = this.V4 || new Vector3;
        this.V1 = diff, this.V2 = edge1, this.V3 = edge2, this.V4 = normal, edge1.subVectors(b, a), edge2.subVectors(c, a), normal.crossVectors(edge1, edge2);
        let sign, DdN = this.direction.dot(normal);
        if (DdN > 0) {
            if (backfaceCulling) return null;
            sign = 1
        } else {
            if (!(DdN < 0)) return null;
            sign = -1, DdN = -DdN
        }
        diff.subVectors(this.origin, a);
        let DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));
        if (DdQxE2 < 0) return null;
        let DdE1xQ = sign * this.direction.dot(edge1.cross(diff));
        if (DdE1xQ < 0) return null;
        if (DdQxE2 + DdE1xQ > DdN) return null;
        let QdN = -sign * diff.dot(normal);
        return QdN < 0 ? null : this.at(QdN / DdN, target)
    }
    applyMatrix4(matrix4) {
        return this.origin.applyMatrix4(matrix4), this.direction.transformDirection(matrix4), this
    }
    equals(ray) {
        return ray.origin.equals(this.origin) && ray.direction.equals(this.direction)
    }
}
class Sphere {
    constructor(center = new Vector3, radius = 0) {
        this.center = center, this.radius = radius
    }
    set(center, radius) {
        return this.center.copy(center), this.radius = radius, this
    }
    setFromPoints(points, optionalCenter) {
        let box = this.V1 || new Box3;
        this.V1 = box;
        let center = this.center;
        void 0 !== optionalCenter ? center.copy(optionalCenter) : box.setFromPoints(points).getCenter(center);
        let maxRadiusSq = 0;
        for (let i = 0, il = points.length; i < il; i++) maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        return this.radius = Math.sqrt(maxRadiusSq), this
    }
    clone() {
        return (new this.constructor).copy(this)
    }
    copy(sphere) {
        return this.center.copy(sphere.center), this.radius = sphere.radius, this
    }
    empty() {
        return this.radius <= 0
    }
    containsPoint(point) {
        return point.distanceToSquared(this.center) <= this.radius * this.radius
    }
    distanceToPoint(point) {
        return point.distanceTo(this.center) - this.radius
    }
    intersectsSphere(sphere) {
        let radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum
    }
    intersectsBox(box) {
        return box.intersectsSphere(this)
    }
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius
    }
    clampPoint(point, target = new Vector3) {
        let deltaLengthSq = this.center.distanceToSquared(point);
        return target.copy(point), deltaLengthSq > this.radius * this.radius && (target.sub(this.center).normalize(), target.multiplyScalar(this.radius).add(this.center)), target
    }
    getBoundingBox(target = new Box3) {
        return target.set(this.center, this.center), target.expandByScalar(this.radius), target
    }
    applyMatrix4(matrix) {
        return this.center.applyMatrix4(matrix), this.radius = this.radius * matrix.getMaxScaleOnAxis(), this
    }
    translate(offset) {
        return this.center.add(offset), this
    }
    equals(sphere) {
        return sphere.center.equals(this.center) && sphere.radius === this.radius
    }
}
class Spherical {
    constructor(radius = 1, phi = 0, theta = 0) {
        this.radius = radius, this.phi = phi, this.theta = theta
    }
    set(radius, phi, theta) {
        return this.radius = radius, this.phi = phi, this.theta = theta, this
    }
    clone() {
        return (new Spherical).copy(this)
    }
    copy(other) {
        return this.radius = other.radius, this.phi = other.phi, this.theta = other.theta, this
    }
    makeSafe() {
        return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this
    }
    setFromVector3(vec3) {
        return this.radius = vec3.length(), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(vec3.x, vec3.z), this.phi = Math.acos(Math.clamp(vec3.y / this.radius, -1, 1))), this
    }
}
class Triangle {
    constructor(a = new Vector3, b = new Vector3, c = new Vector3) {
        this.a = a, this.b = b, this.c = c
    }
    set(a, b, c) {
        return this.a.copy(a), this.b.copy(b), this.c.copy(c), this
    }
    setFromPointsAndIndices(points, i0, i1, i2) {
        return this.a.copy(points[i0]), this.b.copy(points[i1]), this.c.copy(points[i2]), this
    }
    clone() {
        return (new Triangle).copy(this)
    }
    copy(triangle) {
        return this.a.copy(triangle.a), this.b.copy(triangle.b), this.c.copy(triangle.c), this
    }
    getArea() {
        let v0 = this.V0 || new Vector3,
            v1 = this.V1 || new Vector3;
        return this.V0 = v0, this.V1 = v1, v0.subVectors(this.c, this.b), v1.subVectors(this.a, this.b), .5 * v0.cross(v1).length()
    }
    getMidpoint(target = new Vector3) {
        return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    }
    getNormal(target) {
        return Triangle.getNormal(this.a, this.b, this.c, target)
    }
    getPlane(target = new Vector3) {
        return target.setFromCoplanarPoints(this.a, this.b, this.c)
    }
    getBarycoord(point, target) {
        return Triangle.getBarycoord(point, this.a, this.b, this.c, target)
    }
    containsPoint(point) {
        return Triangle.containsPoint(point, this.a, this.b, this.c)
    }
    intersectsBox(box) {
        return box.intersectsTriangle(this)
    }
    equals(triangle) {
        return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c)
    }
}
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x, this.y = y
    }
    set(x, y) {
        return this.x = x, this.y = y, this
    }
    get width() {
        return this.x
    }
    get height() {
        return this.y
    }
    setScalar(s) {
        return this.x = this.y = s, this
    }
    clone() {
        return new Vector2(this.x, this.y)
    }
    copy(v) {
        return this.x = v.x, this.y = v.y, this
    }
    add(v) {
        return this.x += v.x, this.y += v.y, this
    }
    addScalar(s) {
        return this.x += s, this.y += s, this
    }
    addVectors(a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this
    }
    addScaledVector(v, s) {
        return this.x += v.x * s, this.y += v.y * s, this
    }
    sub(v) {
        return this.x -= v.x, this.y -= v.y, this
    }
    subScalar(s) {
        return this.x -= s, this.y -= s, this
    }
    subVectors(a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this
    }
    multiply(v) {
        return this.x *= v.x, this.y *= v.y, this
    }
    multiplyScalar(scalar) {
        return this.x *= scalar, this.y *= scalar, this
    }
    divide(v) {
        return this.x /= v.x, this.y /= v.y, this
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar)
    }
    applyMatrix3(m) {
        let x = this.x,
            y = this.y,
            e = m.elements;
        return this.x = e[0] * x + e[3] * y + e[6], this.y = e[1] * x + e[4] * y + e[7], this
    }
    min(v) {
        return this.x = Math.min(this.x, v.x), this.y = Math.min(this.y, v.y), this
    }
    max(v) {
        return this.x = Math.max(this.x, v.x), this.y = Math.max(this.y, v.y), this
    }
    clamp(min, max) {
        return this.x = Math.max(min.x, Math.min(max.x, this.x)), this.y = Math.max(min.y, Math.min(max.y, this.y)), this
    }
    clampScalar(minVal, maxVal) {
        let min = new Vector2,
            max = new Vector2;
        return min.set(minVal, minVal), max.set(maxVal, maxVal), this.clamp(min, max)
    }
    clampLength(min, max) {
        let length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
    }
    floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }
    ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
    }
    round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }
    roundToZero() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
    }
    negate() {
        return this.x = -this.x, this.y = -this.y, this
    }
    dot(v) {
        return this.x * v.x + this.y * v.y
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    angle() {
        let angle = Math.atan2(this.y, this.x);
        return angle < 0 && (angle += 2 * Math.PI), angle
    }
    angleTo(a, b) {
        return b || (b = this), Math.atan2(a.y - b.y, a.x - b.x)
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v))
    }
    distanceToSquared(v) {
        let dx = this.x - v.x,
            dy = this.y - v.y;
        return dx * dx + dy * dy
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y)
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length)
    }
    lerp(v, alpha) {
        return this.x = Math.lerp(v.x, this.x, alpha), this.y = Math.lerp(v.y, this.y, alpha), this
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1)
    }
    equals(v) {
        return v.x === this.x && v.y === this.y
    }
    setAngleRadius(a, r) {
        return this.x = Math.cos(a) * r, this.y = Math.sin(a) * r, this
    }
    addAngleRadius(a, r) {
        return this.x += Math.cos(a) * r, this.y += Math.sin(a) * r, this
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this.x = array[offset], this.y = array[offset + 1], this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this.x, array[offset + 1] = this.y, array
    }
    rotateAround(center, angle) {
        let c = Math.cos(angle),
            s = Math.sin(angle),
            x = this.x - center.x,
            y = this.y - center.y;
        return this.x = x * c - y * s + center.x, this.y = x * s + y * c + center.y, this
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.array[2 * index + 0], this.y = attribute.array[2 * index + 1]
    }
}
class Vector3 {
    constructor(x, y, z) {
        this.x = x || 0, this.y = y || 0, this.z = z || 0
    }
    set(x, y, z) {
        return this.x = x || 0, this.y = y || 0, this.z = z || 0, this
    }
    setScalar(scalar) {
        return this.x = scalar, this.y = scalar, this.z = scalar, this
    }
    clone() {
        return new Vector3(this.x, this.y, this.z)
    }
    copy(v) {
        return this.x = v.x, this.y = v.y, this.z = v.z, this
    }
    add(v) {
        return this.x += v.x, this.y += v.y, this.z += v.z, this
    }
    addScalar(s) {
        return this.x += s, this.y += s, this.z += s, this
    }
    addVectors(a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
    }
    addScaledVector(v, s) {
        return this.x += v.x * s, this.y += v.y * s, this.z += v.z * s, this
    }
    sub(v) {
        return this.x -= v.x, this.y -= v.y, this.z -= v.z, this
    }
    subScalar(s) {
        return this.x -= s, this.y -= s, this.z -= s, this
    }
    subVectors(a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
    }
    multiply(v) {
        return this.x *= v.x, this.y *= v.y, this.z *= v.z, this
    }
    multiplyScalar(scalar) {
        return this.x *= scalar, this.y *= scalar, this.z *= scalar, this
    }
    multiplyVectors(a, b) {
        return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
    }
    applyEuler(euler) {
        let quaternion = this.Q1 || new Quaternion;
        return this.Q1 = quaternion, this.applyQuaternion(quaternion.setFromEuler(euler))
    }
    applyAxisAngle(axis, angle) {
        let quaternion = this.Q1 || new Quaternion;
        return this.Q1 = quaternion, this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle))
    }
    applyMatrix3(m) {
        let x = this.x,
            y = this.y,
            z = this.z,
            e = m.elements;
        return this.x = e[0] * x + e[3] * y + e[6] * z, this.y = e[1] * x + e[4] * y + e[7] * z, this.z = e[2] * x + e[5] * y + e[8] * z, this
    }
    applyMatrix4(m) {
        let x = this.x,
            y = this.y,
            z = this.z,
            e = m.elements,
            w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        return this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w, this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w, this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w, this
    }
    applyQuaternion(q) {
        let x = this.x,
            y = this.y,
            z = this.z,
            qx = q.x,
            qy = q.y,
            qz = q.z,
            qw = q.w,
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        return this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy, this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz, this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx, this
    }
    project(camera) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld)), this.applyMatrix4(matrix)
    }
    unproject(camera) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix)), this.applyMatrix4(matrix)
    }
    transformDirection(m) {
        let x = this.x,
            y = this.y,
            z = this.z,
            e = m.elements;
        return this.x = e[0] * x + e[4] * y + e[8] * z, this.y = e[1] * x + e[5] * y + e[9] * z, this.z = e[2] * x + e[6] * y + e[10] * z, this.normalize()
    }
    divide(v) {
        return this.x /= v.x, this.y /= v.y, this.z /= v.z, this
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar)
    }
    min(v) {
        return this.x = Math.min(this.x, v.x), this.y = Math.min(this.y, v.y), this.z = Math.min(this.z, v.z), this
    }
    max(v) {
        return this.x = Math.max(this.x, v.x), this.y = Math.max(this.y, v.y), this.z = Math.max(this.z, v.z), this
    }
    clamp(min, max) {
        return this.x = Math.max(min.x, Math.min(max.x, this.x)), this.y = Math.max(min.y, Math.min(max.y, this.y)), this.z = Math.max(min.z, Math.min(max.z, this.z)), this
    }
    clampScalar(minVal, maxVal) {
        let min = new Vector3,
            max = new Vector3;
        return min.set(minVal, minVal, minVal), max.set(maxVal, maxVal, maxVal), this.clamp(min, max)
    }
    clampLength(min, max) {
        let length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
    }
    floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
    }
    ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
    }
    round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
    }
    roundToZero() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
    }
    negate() {
        return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length)
    }
    lerp(v, alpha) {
        return this.x = Math.lerp(v.x, this.x, alpha), this.y = Math.lerp(v.y, this.y, alpha), this.z = Math.lerp(v.z, this.z, alpha), this
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1)
    }
    cross(v) {
        return this.crossVectors(this, v)
    }
    crossVectors(a, b) {
        let ax = a.x,
            ay = a.y,
            az = a.z,
            bx = b.x,
            by = b.y,
            bz = b.z;
        return this.x = ay * bz - az * by, this.y = az * bx - ax * bz, this.z = ax * by - ay * bx, this
    }
    projectOnVector(vector) {
        let scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar)
    }
    projectOnPlane(planeNormal) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, v1.copy(this).projectOnVector(planeNormal), this.sub(v1)
    }
    reflect(normal) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)))
    }
    angleTo(v) {
        let theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());
        return Math.acos(Math.clamp(theta, -1, 1))
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v))
    }
    distanceToSquared(v) {
        let dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z)
    }
    setFromCylindrical(c) {
        return this.x = c.radius * Math.sin(c.theta), this.y = c.y, this.z = c.radius * Math.cos(c.theta), this
    }
    setFromMatrixPosition(m) {
        let e = m.elements;
        return this.x = e[12], this.y = e[13], this.z = e[14], this
    }
    setFromMatrixScale(m) {
        let sx = this.setFromMatrixColumn(m, 0).length(),
            sy = this.setFromMatrixColumn(m, 1).length(),
            sz = this.setFromMatrixColumn(m, 2).length();
        return this.x = sx, this.y = sy, this.z = sz, this
    }
    setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, 4 * index)
    }
    setAngleRadius(a, r, dir = "xy") {
        return this[dir[0]] = Math.cos(a) * r, this[dir[1]] = Math.sin(a) * r, this
    }
    addAngleRadius(a, r, dir = "xy") {
        return this[dir[0]] += Math.cos(a) * r, this[dir[1]] += Math.sin(a) * r, this
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this.x = array[offset], this.y = array[offset + 1], this.z = array[offset + 2], this
    }
    setFromSpherical(s) {
        this.setFromSphericalCoords(s.radius, s.phi, s.theta)
    }
    setFromSphericalCoords(radius, phi, theta) {
        let sinPhiRadius = Math.sin(phi) * radius;
        return this.x = sinPhiRadius * Math.sin(theta), this.y = Math.cos(phi) * radius, this.z = sinPhiRadius * Math.cos(theta), this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this.x, array[offset + 1] = this.y, array[offset + 2] = this.z, array
    }
    fromBufferAttribute(attribute, index) {
        return this.x = attribute.array[3 * index + 0], this.y = attribute.array[3 * index + 1], this.z = attribute.array[3 * index + 2], this
    }
}
class Vector3D {
    constructor(x, y, z) {
        this._x = x || 0, this._y = y || 0, this._z = z || 0
    }
    get x() {
        return this._x
    }
    set x(v) {
        if (window.Hydra && Hydra.LOCAL && isNaN(v)) return console.trace("Vector3D::NaN");
        Math.abs(this._x - v) > 1e-4 && this.onChangeCallback(), this._x = v
    }
    get y() {
        return this._y
    }
    set y(v) {
        if (window.Hydra && Hydra.LOCAL && isNaN(v)) return console.trace("Vector3D::NaN");
        Math.abs(this._y - v) > 1e-4 && this.onChangeCallback(), this._y = v
    }
    get z() {
        return this._z
    }
    set z(v) {
        if (window.Hydra && Hydra.LOCAL && isNaN(v)) return console.trace("Vector3D::NaN");
        Math.abs(this._z - v) > 1e-4 && this.onChangeCallback(), this._z = v
    }
    onChangeCallback() {}
    set(x, y, z) {
        return this._x = x || 0, this._y = y || 0, this._z = z || 0, this.onChangeCallback(), this
    }
    setScalar(scalar) {
        return this._x = scalar, this._y = scalar, this._z = scalar, this.onChangeCallback(), this
    }
    clone() {
        return new Vector3(this._x, this._y, this._z)
    }
    copy(v) {
        let dirty = Math.abs(this._x - v.x) > 1e-4 || Math.abs(this._y - v.y) > 1e-4 || Math.abs(this._z - v.z) > 1e-4;
        return this._x = v.x, this._y = v.y, this._z = v.z, dirty && this.onChangeCallback(), this
    }
    add(v) {
        return this._x += v.x, this._y += v.y, this._z += v.z, this.onChangeCallback(), this
    }
    addScalar(s) {
        return this._x += s, this._y += s, this._z += s, this.onChangeCallback(), this
    }
    addVectors(a, b) {
        return this._x = a.x + b.x, this._y = a.y + b.y, this._z = a.z + b.z, this.onChangeCallback(), this
    }
    addScaledVector(v) {
        return this._x += v.x * s, this._y += v.y * s, this._z += v.z * s, this.onChangeCallback(), this
    }
    sub(v) {
        return this._x -= v.x, this._y -= v.y, this._z -= v.z, this.onChangeCallback(), this
    }
    subScalar(s) {
        return this._x -= s, this._y -= s, this._z -= s, this.onChangeCallback(), this
    }
    subVectors(a, b) {
        return this._x = a.x - b.x, this._y = a.y - b.y, this._z = a.z - b.z, this.onChangeCallback(), this
    }
    multiply(v) {
        return this._x *= v.x, this._y *= v.y, this._z *= v.z, this.onChangeCallback(), this
    }
    multiplyScalar(scalar) {
        return this._x *= scalar, this._y *= scalar, this._z *= scalar, this.onChangeCallback(), this
    }
    multiplyVectors(a, b) {
        return this._x = a.x * b.x, this._y = a.y * b.y, this._z = a.z * b.z, this.onChangeCallback(), this
    }
    applyEuler(euler) {
        let quaternion = this.Q1 || new Quaternion;
        return this.Q1 = quaternion, this.applyQuaternion(quaternion.setFromEuler(euler))
    }
    applyAxisAngle(axis, angle) {
        let quaternion = this.Q1 || new Quaternion;
        return this.Q1 = quaternion, this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle))
    }
    applyMatrix3(m) {
        let x = this._x,
            y = this._y,
            z = this._z,
            e = m.elements;
        return this._x = e[0] * x + e[3] * y + e[6] * z, this._y = e[1] * x + e[4] * y + e[7] * z, this._z = e[2] * x + e[5] * y + e[8] * z, this.onChangeCallback(), this
    }
    applyMatrix4(m) {
        let x = this._x,
            y = this._y,
            z = this._z,
            e = m.elements,
            w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        return this._x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w, this._y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w, this._z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w, this.onChangeCallback(), this
    }
    applyQuaternion(q) {
        let x = this._x,
            y = this._y,
            z = this._z,
            qx = q.x,
            qy = q.y,
            qz = q.z,
            qw = q.w,
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        return this._x = ix * qw + iw * -qx + iy * -qz - iz * -qy, this._y = iy * qw + iw * -qy + iz * -qx - ix * -qz, this._z = iz * qw + iw * -qz + ix * -qy - iy * -qx, this.onChangeCallback(), this
    }
    project(camera) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld)), this.applyMatrix4(matrix)
    }
    unproject(camera) {
        let matrix = this.M1 || new Matrix4;
        return this.M1 = matrix, matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix)), this.applyMatrix4(matrix)
    }
    transformDirection(m) {
        let x = this._x,
            y = this._y,
            z = this._z,
            e = m.elements;
        return this._x = e[0] * x + e[4] * y + e[8] * z, this._y = e[1] * x + e[5] * y + e[9] * z, this._z = e[2] * x + e[6] * y + e[10] * z, this.onChangeCallback(), this.normalize()
    }
    divide(v) {
        return this._x /= v.x, this._y /= v.y, this._z /= v.z, this.onChangeCallback(), this
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar)
    }
    min(v) {
        return this._x = Math.min(this._x, v.x), this._y = Math.min(this._y, v.y), this._z = Math.min(this._z, v.z), this.onChangeCallback(), this
    }
    max(v) {
        return this._x = Math.max(this._x, v.x), this._y = Math.max(this._y, v.y), this._z = Math.max(this._z, v.z), this
    }
    clamp(min, max) {
        return this._x = Math.max(min.x, Math.min(max.x, this._x)), this._y = Math.max(min.y, Math.min(max.y, this._y)), this._z = Math.max(min.z, Math.min(max.z, this._z)), this
    }
    clampScalar(minVal, maxVal) {
        let min = new Vector3,
            max = new Vector3;
        return min.set(minVal, minVal, minVal), max.set(maxVal, maxVal, maxVal), this.clamp(min, max)
    }
    clampLength(min, max) {
        let length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
    }
    floor() {
        return this._x = Math.floor(this._x), this._y = Math.floor(this._y), this._z = Math.floor(this._z), this.onChangeCallback(), this
    }
    ceil() {
        return this._x = Math.ceil(this._x), this._y = Math.ceil(this._y), this._z = Math.ceil(this._z), this.onChangeCallback(), this
    }
    round() {
        return this._x = Math.round(this._x), this._y = Math.round(this._y), this._z = Math.round(this._z), this.onChangeCallback(), this
    }
    roundToZero() {
        return this._x = this._x < 0 ? Math.ceil(this._x) : Math.floor(this._x), this._y = this._y < 0 ? Math.ceil(this._y) : Math.floor(this._y), this._z = this._z < 0 ? Math.ceil(this._z) : Math.floor(this._z), this.onChangeCallback(), this
    }
    negate() {
        return this._x = -this._x, this._y = -this._y, this._z = -this._z, this.onChangeCallback(), this
    }
    dot(v) {
        return this._x * v.x + this._y * v.y + this._z * v.z
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z)
    }
    manhattanLength() {
        return Math.abs(this._x) + Math.abs(this._y) + Math.abs(this._z)
    }
    normalize() {
        return this.onChangeCallback(), this.divideScalar(this.length() || 1)
    }
    setLength(length) {
        return this.onChangeCallback(), this.normalize().multiplyScalar(length)
    }
    lerp(v, alpha) {
        return this._x = Math.lerp(v.x, this._x, alpha), this._y = Math.lerp(v.y, this._y, alpha), this._z = Math.lerp(v.z, this._z, alpha), this.onChangeCallback(), this
    }
    lerpVectors(v1, v2, alpha) {
        return this.onChangeCallback(), this.subVectors(v2, v1).multiplyScalar(alpha).add(v1)
    }
    cross(v) {
        return this.crossVectors(this, v)
    }
    crossVectors(a, b) {
        let ax = a.x,
            ay = a.y,
            az = a.z,
            bx = b.x,
            by = b.y,
            bz = b.z;
        return this._x = ay * bz - az * by, this._y = az * bx - ax * bz, this._z = ax * by - ay * bx, this.onChangeCallback(), this
    }
    projectOnVector(vector) {
        let scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar)
    }
    projectOnPlane(planeNormal) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, this.onChangeCallback(), v1.copy(this).projectOnVector(planeNormal), this.sub(v1)
    }
    reflect(normal) {
        let v1 = this.V1 || new Vector3;
        return this.V1 = v1, this.onChangeCallback(), this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)))
    }
    angleTo(v) {
        let theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());
        return Math.acos(Math.clamp(theta, -1, 1))
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v))
    }
    distanceToSquared(v) {
        let dx = this._x - v.x,
            dy = this._y - v.y,
            dz = this._z - v.z;
        return dx * dx + dy * dy + dz * dz
    }
    manhattanDistanceTo(v) {
        return Math.abs(this._x - v.x) + Math.abs(this._y - v.y) + Math.abs(this._z - v.z)
    }
    setFromSpherical(s) {
        let sinPhiRadius = Math.sin(s.phi) * s.radius;
        return this._x = sinPhiRadius * Math.sin(s.theta), this._y = Math.cos(s.phi) * s.radius, this._z = sinPhiRadius * Math.cos(s.theta), this.onChangeCallback(), this
    }
    setFromCylindrical(c) {
        return this._x = c.radius * Math.sin(c.theta), this._y = c.y, this._z = c.radius * Math.cos(c.theta), this.onChangeCallback(), this
    }
    setFromMatrixPosition(m) {
        let e = m.elements;
        return this._x = e[12], this._y = e[13], this._z = e[14], this.onChangeCallback(), this
    }
    setFromMatrixScale(m) {
        let sx = this.setFromMatrixColumn(m, 0).length(),
            sy = this.setFromMatrixColumn(m, 1).length(),
            sz = this.setFromMatrixColumn(m, 2).length();
        return this.onChangeCallback(), this._x = sx, this._y = sy, this._z = sz, this
    }
    setFromMatrixColumn(m, index) {
        return this.onChangeCallback(), this.fromArray(m.elements, 4 * index)
    }
    equals(v) {
        return v.x === this._x && v.y === this._y && v.z === this._z
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this._x = array[offset], this._y = array[offset + 1], this._z = array[offset + 2], this.onChangeCallback(), this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this._x, array[offset + 1] = this._y, array[offset + 2] = this._z, array
    }
    fromBufferAttribute(attribute, index) {
        this._x = attribute.array[3 * index + 0], this._y = attribute.array[3 * index + 1], this._z = attribute.array[3 * index + 2], this.onChangeCallback()
    }
    onChange(callback) {
        this.onChangeCallback = callback
    }
    onChangeCallback() {}
}
class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x, this.y = y, this.z = z, this.w = w
    }
    multiplyScalar(s) {
        return this.x *= s, this.y *= s, this.z *= s, this.w *= s, this
    }
    set(x, y, z, w) {
        return this.x = x, this.y = y, this.z = z, this.w = w, this
    }
    copy(v) {
        return this.x = v.x, this.y = v.y, this.z = v.z, this.w = v.w, this
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }
    lerp(v, alpha) {
        return this.x = Math.lerp(v.x, this.x, alpha), this.y = Math.lerp(v.y, this.y, alpha), this.z = Math.lerp(v.z, this.z, alpha), this.w = Math.lerp(v.w, this.w, alpha), this
    }
    applyMatrix4(m) {
        let x = this.x,
            y = this.y,
            z = this.z,
            w = this.w,
            e = m.elements;
        return this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w, this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w, this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w, this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w, this
    }
    toArray(array, offset) {
        return void 0 === array && (array = []), void 0 === offset && (offset = 0), array[offset] = this.x, array[offset + 1] = this.y, array[offset + 2] = this.z, array[offset + 3] = this.w, array
    }
    fromArray(array, offset) {
        return void 0 === offset && (offset = 0), this.x = array[offset], this.y = array[offset + 1], this.z = array[offset + 2], this.w = array[offset + 3], this
    }
    set width(v) {
        this.z = v
    }
    set height(v) {
        this.w = v
    }
    get width() {
        return this.z
    }
    get height() {
        return this.w
    }
}
class Face3 {
    constructor(a, b, c, normal = new Vector3) {
        this.a = a, this.b = b, this.c = c, this.normal = normal
    }
}
Class((function zUtils3D() {
    var diff, edge1, edge2, normal, v1, v0;
    Math.euclideanModulo = function(n, m) {
        return (n % m + m) % m
    }, Math.isPowerOf2 = function(w, h) {
        let test = value => 0 == (value & value - 1);
        return test(w) && test(h)
    }, Math.floorPowerOf2 = function(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2))
    }, Geometry.TYPES = {
        SphereGeometry: SphereGeometry,
        IcosahedronGeometry: IcosahedronGeometry,
        BoxGeometry: BoxGeometry,
        PlaneGeometry: PlaneGeometry,
        CylinderGeometry: CylinderGeometry
    }, Matrix4.prototype.isMatrix4 = !0, Matrix3.prototype.isMatrix3 = !0, Vector3.prototype.isVector3 = !0, Vector2.prototype.isVector2 = !0, CameraBase3D.prototype.isCamera = !0, PerspectiveCamera.prototype.isPerspective = !0, window.THREAD && (Shader = {
        FRONT_SIDE: "shader_front_side",
        BACK_SIDE: "shader_back_side",
        DOUBLE_SIDE: "shader_double_side"
    }), Ray.prototype.intersectTriangle = (diff = new Vector3, edge1 = new Vector3, edge2 = new Vector3, normal = new Vector3, function intersectTriangle(a, b, c, backfaceCulling, target) {
        edge1.subVectors(b, a), edge2.subVectors(c, a), normal.crossVectors(edge1, edge2);
        var sign, DdN = this.direction.dot(normal);
        if (DdN > 0) {
            if (backfaceCulling) return null;
            sign = 1
        } else {
            if (!(DdN < 0)) return null;
            sign = -1, DdN = -DdN
        }
        diff.subVectors(this.origin, a);
        var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));
        if (DdQxE2 < 0) return null;
        var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));
        if (DdE1xQ < 0) return null;
        if (DdQxE2 + DdE1xQ > DdN) return null;
        var QdN = -sign * diff.dot(normal);
        return QdN < 0 ? null : this.at(QdN / DdN, target)
    }), Mesh.prototype.raycast = function() {
        let inverseMatrix = new Matrix4,
            ray = new Ray,
            sphere = new Sphere,
            vA = new Vector3,
            vB = new Vector3,
            vC = new Vector3,
            uvA = (new Vector3, new Vector3, new Vector3, new Vector3, new Vector2),
            uvB = new Vector2,
            uvC = new Vector2,
            barycoord = new Vector3,
            intersectionPoint = new Vector3,
            intersectionPointWorld = new Vector3;

        function checkBufferGeometryIntersection(object, raycaster, ray, position, uv, a, b, c) {
            vA.fromBufferAttribute(position, a), vB.fromBufferAttribute(position, b), vC.fromBufferAttribute(position, c);
            let intersection = function checkIntersection(object, shader, raycaster, ray, pA, pB, pC, point) {
                let intersect;
                if (intersect = shader.side === Shader.BACK_SIDE ? ray.intersectTriangle(pC, pB, pA, !0, point) : ray.intersectTriangle(pA, pB, pC, shader.side !== Shader.DOUBLE_SIDE, point), null === intersect) return null;
                intersectionPointWorld.copy(point), intersectionPointWorld.applyMatrix4(object.matrixWorld);
                let distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
                return distance < raycaster.near || distance > raycaster.far ? null : {
                    distance: distance,
                    point: intersectionPointWorld.clone(),
                    object: object
                }
            }(object, object.shader, raycaster, ray, vA, vB, vC, intersectionPoint);
            if (intersection) {
                uv && (uvA.fromBufferAttribute(uv, a), uvB.fromBufferAttribute(uv, b), uvC.fromBufferAttribute(uv, c), intersection.uv = function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {
                    return Triangle.getBarycoord(point, p1, p2, p3, barycoord), uv1.multiplyScalar(barycoord.x), uv2.multiplyScalar(barycoord.y), uv3.multiplyScalar(barycoord.z), uv1.add(uv2).add(uv3), uv1.clone()
                }(intersectionPoint, vA, vB, vC, uvA, uvB, uvC));
                let face = new Face3(a, b, c);
                Triangle.getNormal(vA, vB, vC, face.normal), intersection.face = face
            }
            return intersection
        }
        return function raycast(raycaster, intersects) {
            let intersection, a, b, c, geometry = this.geometry,
                shader = this.shader,
                matrixWorld = this.matrixWorld;
            if (void 0 === shader) return;
            if (null === geometry.boundingSphere && geometry.computeBoundingSphere(), sphere.copy(geometry.boundingSphere), sphere.applyMatrix4(matrixWorld), !1 === raycaster.ray.intersectsSphere(sphere)) return;
            if (inverseMatrix.getInverse(matrixWorld), ray.copy(raycaster.ray).applyMatrix4(inverseMatrix), null !== geometry.boundingBox && !1 === ray.intersectsBox(geometry.boundingBox)) return;
            let i, l, index = geometry.index,
                position = geometry.attributes.position,
                uv = geometry.attributes.uv;
            if (null !== index)
                for (i = 0, l = index.length; i < l; i += 3) a = index[i], b = index[i + 1], c = index[i + 2], intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c), intersection && (intersection.faceIndex = Math.floor(i / 3), intersects.push(intersection));
            else if (void 0 !== position)
                for (i = 0, l = position.count; i < l; i += 3) a = i, b = i + 1, c = i + 2, intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c), intersection && (intersection.faceIndex = Math.floor(i / 3), intersects.push(intersection))
        }
    }(), Triangle.prototype.closestPointToPoint = function() {
        let plane = new Plane,
            edgeList = [new Line3, new Line3, new Line3],
            projectedPoint = new Vector3,
            closestPoint = new Vector3;
        return function closestPointToPoint(point, target = new Vector3) {
            let minDistance = 1 / 0;
            if (plane.setFromCoplanarPoints(this.a, this.b, this.c), plane.projectPoint(point, projectedPoint), !0 === this.containsPoint(projectedPoint)) target.copy(projectedPoint);
            else {
                edgeList[0].set(this.a, this.b), edgeList[1].set(this.b, this.c), edgeList[2].set(this.c, this.a);
                for (let i = 0; i < edgeList.length; i++) {
                    edgeList[i].closestPointToPoint(projectedPoint, !0, closestPoint);
                    let distance = projectedPoint.distanceToSquared(closestPoint);
                    distance < minDistance && (minDistance = distance, target.copy(closestPoint))
                }
            }
            return target
        }
    }(), Points.prototype.raycast = function() {
        let inverseMatrix = new Matrix4,
            ray = new Ray,
            sphere = new Sphere;
        return function raycast(raycaster, intersects) {
            let object = this,
                geometry = this.geometry,
                matrixWorld = this.matrixWorld,
                threshold = raycaster.params.Points.threshold;
            if (null === geometry.boundingSphere && geometry.computeBoundingSphere(), sphere.copy(geometry.boundingSphere), sphere.applyMatrix4(matrixWorld), sphere.radius += threshold, !1 === raycaster.ray.intersectsSphere(sphere)) return;
            inverseMatrix.getInverse(matrixWorld), ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
            let localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                localThresholdSq = localThreshold * localThreshold,
                position = new Vector3,
                intersectPoint = new Vector3;

            function testPoint(point, index) {
                let rayPointDistanceSq = ray.distanceSqToPoint(point);
                if (rayPointDistanceSq < localThresholdSq) {
                    ray.closestPointToPoint(point, intersectPoint), intersectPoint.applyMatrix4(matrixWorld);
                    let distance = raycaster.ray.origin.distanceTo(intersectPoint);
                    if (distance < raycaster.near || distance > raycaster.far) return;
                    intersects.push({
                        distance: distance,
                        distanceToRay: Math.sqrt(rayPointDistanceSq),
                        point: intersectPoint.clone(),
                        index: index,
                        face: null,
                        object: object
                    })
                }
            }
            let index = geometry.index,
                positions = geometry.attributes.position.array;
            if (null !== index) {
                let indices = index.array;
                for (let i = 0, il = indices.length; i < il; i++) {
                    let a = indices[i];
                    position.fromArray(positions, 3 * a), testPoint(position, a)
                }
            } else
                for (let i = 0, l = positions.length / 3; i < l; i++) position.fromArray(positions, 3 * i), testPoint(position, i)
        }
    }(), Object.assign(Triangle, {
        getNormal: (v0 = new Vector3, function getNormal(a, b, c, target = new Vector3) {
            target.subVectors(c, b), v0.subVectors(a, b), target.cross(v0);
            var targetLengthSq = target.lengthSq();
            return targetLengthSq > 0 ? target.multiplyScalar(1 / Math.sqrt(targetLengthSq)) : target.set(0, 0, 0)
        }),
        getBarycoord: function() {
            var v0 = new Vector3,
                v1 = new Vector3,
                v2 = new Vector3;
            return function getBarycoord(point, a, b, c, target = new Vector3) {
                v0.subVectors(c, a), v1.subVectors(b, a), v2.subVectors(point, a);
                var dot00 = v0.dot(v0),
                    dot01 = v0.dot(v1),
                    dot02 = v0.dot(v2),
                    dot11 = v1.dot(v1),
                    dot12 = v1.dot(v2),
                    denom = dot00 * dot11 - dot01 * dot01;
                if (0 === denom) return target.set(-2, -1, -1);
                var invDenom = 1 / denom,
                    u = (dot11 * dot02 - dot01 * dot12) * invDenom,
                    v = (dot00 * dot12 - dot01 * dot02) * invDenom;
                return target.set(1 - u - v, v, u)
            }
        }(),
        containsPoint: (v1 = new Vector3, function containsPoint(point, a, b, c) {
            return Triangle.getBarycoord(point, a, b, c, v1), v1.x >= 0 && v1.y >= 0 && v1.x + v1.y <= 1
        })
    })
}), "static"), Class((function FXLayer(_parentNuke, _type, _preventDrawBuffers = !1) {
    Inherit(this, Component);
    var _nuke, _rt, _this = this,
        _scene = new Scene,
        _objects = [],
        _textureIndex = -1,
        _visible = !0,
        _id = Utils.timestamp(),
        _name = Utils.getConstructorName(_this),
        _useDrawBuffers = !_preventDrawBuffers;

    function resizeHandler() {
        _rt.setSize && _rt.setSize(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr)
    }
    this.resolution = 1, this.enabled = !0, this.renderShadows = !0, this.set("visible", v => _this.scene.visible = _visible = v), this.get("visible", _ => _visible), this.onInvisible = function() {
        _this.scene.visible = !1
    }, this.onVisible = function() {
        _this.scene.visible = !0
    }, this.create = function(nuke = World.NUKE, type, rt) {
        if (!nuke) return;
        let format;
        _useDrawBuffers = nuke.useDrawBuffers, type && "object" == typeof type && ("boolean" == typeof type.useDrawBuffers && (_useDrawBuffers = type.useDrawBuffers), format = type.format, type = type.type), _this.rtType = type || Texture.UNSIGNED_BYTE, _this.rtFormat = format || Texture.RGBFormat, (_this = this).scene = _scene, (_nuke = _this.initClass(Nuke, nuke.stage, {
                renderer: nuke.renderer,
                camera: nuke.camera,
                scene: _scene,
                dpr: nuke.dpr,
                useDrawBuffers: !1
            })).parentNuke = nuke, _parentNuke = nuke, _this.nuke = _nuke,
            function initRT(rt) {
                if (_useDrawBuffers) {
                    let texture = new Texture;
                    texture.minFilter = Texture.LINEAR, texture.magFilter = Texture.LINEAR, texture.format = Texture.RGBAFormat, _this.rtType && (texture.type = _this.rtType), _this.rtFormat && (texture.format = _this.rtFormat), texture.wrapS = texture.wrapT = Texture.CLAMP_TO_EDGE, texture.fxLayer = _this, _this.textureIndex = _textureIndex = _parentNuke.attachDrawBuffer(texture), _rt = {
                        texture: texture
                    }
                } else _rt = rt || Utils3D.createRT(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr, _this.rtType || Texture.RGBAFormat);
                _this.rt = _rt, _this.nuke.setSize(_rt.width, _rt.height)
            }(rt),
            function addListeners() {
                _this.events.sub(Events.RESIZE, resizeHandler)
            }()
    }, this.addObject = this.add = function(object) {
        if (_nuke)
            if (_useDrawBuffers) object.shader && object.shader.fragmentShader && (! function editDBShader(mesh) {
                const WEBGL2 = Renderer.type == Renderer.WEBGL2;
                let modifyMarker = (fs, name, index) => {
                        if (WEBGL2 && !fs.includes(`layout(location=${index})`)) {
                            let mainAt = (fs = fs.replace("out vec4 FragColor;", "")).indexOf("void main()"),
                                before = fs.slice(0, mainAt),
                                after = fs.slice(mainAt);
                            fs = before + `layout(location=${index}) out vec4 ${name};\n` + after
                        }
                        let marker = "#drawbuffer " + name;
                        if (fs.includes(marker)) {
                            let split = fs.split(marker + " "),
                                finalOut = WEBGL2 ? name : `gl_FragData[${index}]`;
                            split[1] = split[1].replace("gl_FragColor", finalOut), fs = split[0] + split[1]
                        }
                        for (; fs.includes("#applyShadow");) {
                            fs = fs.split("\n");
                            for (let i = 0; i < fs.length; i++) fs[i].includes("#applyShadow") && (fs[i] = fs[i].replace("#applyShadow", ""));
                            fs = fs.join("\n")
                        }
                        return fs
                    },
                    shader = mesh.shader,
                    fs = shader.fragmentShader,
                    name = _this.name || _name;
                WEBGL2 && fs.includes("location=0") || (fs = modifyMarker(fs, "Color", 0)), fs = modifyMarker(fs, name, _textureIndex), shader.fragmentShader = fs
            }(object), object.shader._attachmentData = {
                format: _this.rtFormat,
                type: _this.rtType,
                attachments: _parentNuke.attachments
            });
            else {
                let clone = object.clone();
                for (object["clone_" + _id] = clone, _scene.add(clone), _objects.push(object), object.shader && function editShader(mesh) {
                        let modifyShader = (shader, name) => {
                                let fs = shader._fragmentShader;
                                if (!fs) return;
                                let marker = "#drawbuffer " + name;
                                if (fs.includes(marker)) {
                                    let split = fs.split(marker + " ");
                                    fs = split[0] + split[1]
                                }
                                for (; fs.includes("#drawbuffer");) {
                                    fs = fs.split("\n");
                                    for (let i = 0; i < fs.length; i++) fs[i].includes("#drawbuffer") && (fs[i] = "");
                                    fs = fs.join("\n")
                                }
                                shader.fragmentShader = fs
                            },
                            applyShadow = (shader, bool) => {
                                let fs = shader.fragmentShader;
                                if (fs) {
                                    for (; fs.includes("#applyShadow");) {
                                        fs = fs.split("\n");
                                        for (let i = 0; i < fs.length; i++) bool ? fs[i].includes("#applyShadow") && (fs[i] = fs[i].replace("#applyShadow", "")) : fs[i].includes("#applyShadow") && (fs[i] = "");
                                        fs = fs.join("\n")
                                    }
                                    shader.fragmentShader = fs
                                }
                            };
                        mesh.shader._fragmentShader || (mesh.shader._fragmentShader = mesh.shader.fragmentShader), modifyShader(mesh.shader, "Color");
                        let shader = mesh.shader.clone(!_this.renderShadows, "-" + (_this.name || _name));
                        modifyShader(shader, _this.name || _name), applyShadow(shader, _this.renderShadows), applyShadow(mesh.shader, !0), mesh.shader.copyUniformsTo(shader, !0), mesh.shader = shader
                    }(clone); clone.children.length;) clone.remove(clone.children[0])
            }
    }, this.removeObject = function(object) {
        _nuke && (_scene.remove(object["clone_" + _id]), _objects.remove(object), delete object["clone_" + _id])
    }, this.render = this.draw = function(stage, camera) {
        if (_nuke && _this.enabled && !_useDrawBuffers && _parentNuke.enabled && _objects.length) {
            stage && (_nuke.stage = stage, _this.setSize(stage.width, stage.height)), _nuke.camera = camera || _nuke.parentNuke.camera, _this.renderShadows || (_nuke.renderer.overridePreventShadows = !0);
            for (let i = _objects.length - 1; i > -1; i--) {
                let obj = _objects[i],
                    clone = obj["clone_" + _id];
                _this.forceVisible ? clone.visible = !0 : clone.visible = obj.determineVisible(), clone.visible && (obj.updateMatrixWorld(), obj.ignoreMatrix || Utils3D.decompose(obj, clone))
            }
            _nuke.rtt = _rt, _nuke.render(), RenderStats.update("FXLayer"), _nuke.renderer.overridePreventShadows = !1
        }
    }, this.addPass = function(pass) {
        _nuke && _nuke.add(pass)
    }, this.removePass = function(pass) {
        _nuke && _nuke.remove(pass)
    }, this.setSize = function(width, height) {
        _nuke && (_rt.width == width && _rt.height == height || (_this.events.unsub(Events.RESIZE, resizeHandler), _rt && _rt.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr), _nuke.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr)))
    }, this.setDPR = function(dpr) {
        _nuke && (_nuke.dpr = dpr, resizeHandler())
    }, this.setResolution = function(res) {
        _this.resolution = res, resizeHandler()
    }, this.getObjects = function() {
        return _objects
    }, this.useRT = function(rt) {
        _rt = _this.rt = rt
    }, this.getName = function() {
        return _this.name || _name
    }, _parentNuke instanceof Nuke && this.create(_parentNuke, _type)
})), Namespace("FX"), Class((function FXScene(_parentNuke, _type) {
    Inherit(this, Component);
    var _nuke, _rt, _this = this,
        _scene = new Scene,
        _id = Utils.timestamp(),
        _objects = [],
        _visible = !0;

    function resizeHandler() {
        _rt.setSize && _rt.setSize(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr), _this.nuke.setSize(_rt.width, _rt.height), _this.width = _rt.width, _this.height = _rt.height
    }
    this.resolution = 1, this.autoVisible = !0, this.enabled = !0, this.scene = _scene, this.renderShadows = !0, this.set("visible", v => {
        _this.scene && (_this.scene.visible = _visible = v)
    }), this.get("visible", _ => _visible), this.onInvisible = function() {
        this.scene.visible && (this.scene.visible = !1, _this.flag("needsOnVisible", !0))
    }, this.onVisible = function() {
        _this.flag("needsOnVisible") && (this.scene.visible = !0, _this.flag("needsOnVisible", !1))
    }, this.create = function(nuke = World.NUKE, rt, options) {
        rt && "object" == typeof rt && (rt.isRT || (options = rt, rt = void 0)), options || (options = {}), _this.rtFormat = options.format || Texture.RGBFormat, _this.rtType = options.type || Texture.UNSIGNED_BYTE, (_this = this).scene = _scene, _this.nuke = _nuke = _this.initClass(Nuke, nuke.stage, {
                renderer: nuke.renderer,
                camera: nuke.camera,
                scene: _scene,
                dpr: nuke.dpr
            }), _scene.nuke = _nuke,
            function initRT(rt, options = {}) {
                options.type == Texture.FLOAT && (options.format = Texture.RGBAFormat), _this.width = _nuke.stage.width * _this.resolution * _nuke.dpr, _this.height = _nuke.stage.height * _this.resolution * _nuke.dpr, _rt = rt || new RenderTarget(_this.width, _this.height, Object.assign({
                    minFilter: Texture.LINEAR,
                    magFilter: Texture.LINEAR,
                    generateMipmaps: !1
                }, options)), _this.rt = _rt, _rt.fxscene = _this
            }(rt, options), rt ? _this.flag("recycle_rt", !0) : function addListeners() {
                _this.events.sub(Events.RESIZE, resizeHandler)
            }(), FXScene.onCreate && FXScene.onCreate(_this)
    }, this.onDestroy = this.fxDestroy = function() {
        _this.scene.deleted = !0, _this.flag("recycle_rt") || _rt && _rt.destroy && _rt.destroy()
    }, this.setSize = function(width, height, exact) {
        _nuke && (_rt.width == width && _rt.height == height || (_this.events.unsub(Events.RESIZE, resizeHandler), exact ? (_this.width = width, _this.height = height) : (_this.width = width * _this.resolution * _nuke.dpr, _this.height = height * _this.resolution * _nuke.dpr), _rt && _rt.setSize(_this.width, _this.height), _nuke.setSize(_this.width, _this.height)))
    }, this.add = this.addObject = function(object) {
        if (!object) return console.error("FXScene addObject undefined!");
        let clone = object.clone();
        for (object["clone_" + _id] = clone, _scene.add(clone), _objects.push(object), object.shader._attachmentData = {
                format: _this.rtFormat,
                type: _this.rtType,
                attachments: 1
            }; clone.children.length;) clone.remove(clone.children[0]);
        return clone
    }, this.removeObject = function(object) {
        _scene.remove(object["clone_" + _id]), _objects.remove(object), delete object["clone_" + _id]
    }, this.setScissor = function(x, y, w, h) {
        this.scissor || (this.scissor = new Vector4), this.scissor.x = x * _this.width, this.scissor.y = _this.height - h * _this.height - y * _this.height, this.scissor.width = w * _this.width, this.scissor.height = h * _this.height, this.rt.scissor = this.scissor
    }, this.render = this.draw = function(stage, camera) {
        if (_this.isVrWorldMode) return;
        stage && (_this.events.unsub(Events.RESIZE, resizeHandler), _this.setSize(stage.width, stage.height), _this.nuke.stage = stage), camera && (_this.nuke.camera = camera, RenderManager.type == RenderManager.WEBVR && (_this.vrRT || (_this.vrRT = new Map), _this.vrRT.get(camera) || _this.vrRT.set(camera, _rt.clone())));
        let clearColor = null,
            alpha = 1;
        _this.clearColor && (clearColor = _nuke.renderer.getClearColor().getHex(), _nuke.renderer.setClearColor(_this.clearColor)), _this.clearAlpha > -1 && (alpha = _nuke.renderer.getClearAlpha(), _nuke.renderer.setClearAlpha(_this.clearAlpha)), _this.renderShadows || (_nuke.renderer.overridePreventShadows = !0);
        for (let i = _objects.length - 1; i > -1; i--) {
            let obj = _objects[i],
                clone = obj["clone_" + _id];
            _this.forceVisible || obj.cloneVisible ? clone.visible = "boolean" != typeof clone.isVisible || clone.isVisible : clone.visible = obj.determineVisible(), clone.visible && (obj.updateMatrixWorld(!1 === obj.visible || void 0), obj.ignoreMatrix || (Utils3D.decompose(obj, clone), clone.overrideScale && clone.scale.setScalar(clone.overrideScale)))
        }
        _this.preventRTDraw || (RenderStats.update("FXScene", 1, _this), _nuke.rtt = _rt, camera && RenderManager.type == RenderManager.WEBVR && (_nuke.rtt = _this.vrRT.get(camera)), _nuke.render()), _nuke.renderer.overridePreventShadows = !1, _this.clearColor && _nuke.renderer.setClearColor(clearColor), _this.clearAlpha > -1 && _nuke.renderer.setClearAlpha(_this.clearAlpha)
    }, this.setDPR = function(dpr) {
        return _nuke ? (_nuke.dpr = dpr, resizeHandler(), _this) : _this
    }, this.addPass = function(pass) {
        _nuke && _nuke.add(pass)
    }, this.removePass = function(pass) {
        _nuke && _nuke.remove(pass)
    }, this.setResolution = function(res) {
        return _this.resolution = res, resizeHandler(), this
    }, this.useRT = function(rt) {
        _rt = _this.rt = rt
    }, this.upload = function() {
        _rt && _rt.upload()
    }, this.useCamera = function(camera) {
        _this.nuke.camera = camera.camera || camera
    }, this.useScene = function(scene) {
        _this.nuke.scene = scene
    }, this.vrWorldMode = function() {
        _this.isVrWorldMode = !0, this.group = new Group;
        for (let i = 0; i < this.scene.children.length; i++) this.group.add(this.scene.children[i]);
        _scene = this.scene = this.group, World.SCENE.add(this.group)
    }, this.createDepthTexture = function(useRTTBuffer) {
        return _this.depthTexture || (_this.nuke.passes.length || useRTTBuffer ? (_this.nuke.rttBuffer.createDepthTexture(), _this.depthTexture = _this.nuke.rttBuffer.depth) : (_this.rt.createDepthTexture(), _this.depthTexture = _this.rt.depth)), _this.depthTexture
    }, _parentNuke instanceof Nuke && this.create(_parentNuke, _type)
})), Class((function BlitPass(_forceNuke) {
    Inherit(this, NukePass);
    this.uniforms = {}, this.init("BlitPass"), _forceNuke || (this.blitFramebuffer = !0)
})), Class((function Nuke(_stage, _params) {
    Inherit(this, Component);
    var _width, _height, _nukeMesh, _this = this;
    _params.renderer || console.error("Nuke :: Must define renderer"), _this.stage = _stage, _this.renderer = _params.renderer, _this.camera = _params.camera, _this.scene = _params.scene, _this.rtt = _params.rtt, _this.enabled = 0 != _params.enabled, _this.passes = _params.passes || [], _this.useDrawBuffers = void 0 !== _params.useDrawBuffers ? _params.useDrawBuffers : !(Renderer.type != Renderer.WEBGL2 && !window.Metal) || !Utils.query("noDrawBuffers") && !Nuke.NO_DRAWBUFFERS && Device.graphics.webgl && Device.graphics.webgl.detect("draw_buffers");
    var _rttPing, _rttPong, _rttBuffer, _dpr = _params.dpr || 1,
        _drawBuffers = [];

    function resizeHandler() {
        var width = _this.stage.width * _dpr,
            height = _this.stage.height * _dpr;
        _rttPing.setSize(width, height), _rttPong.setSize(width, height), _rttBuffer.setSize(width, height)
    }
    _this.scene.nuke = _this,
        function initNuke() {
            let width = _this.stage.width * _dpr,
                height = _this.stage.height * _dpr;
            _rttPing = Nuke.getRT(width, height, !1, 1), _rttPong = Nuke.getRT(width, height, !1, 2), _rttBuffer = Nuke.getRT(width, height, _this.useDrawBuffers), (_nukeMesh = new Mesh(World.QUAD, null)).frustumCulled = !1, _nukeMesh.noMatrices = !0, _nukeMesh.transient = !0, _width = width, _height = height
        }(),
        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }(), _this.onBeforeShaderCompile = function(obj) {
            if (!obj) return;
            let shader = obj.shader;
            if (!(shader && shader.fragmentShader && _this.useDrawBuffers && _drawBuffers.length)) return;
            const WEBGL2 = Renderer.type == Renderer.WEBGL2;
            let key = WEBGL2 ? " Color " : "gl_FragData[0]";
            if (!shader.fragmentShader.includes(key)) {
                let fs = shader.fragmentShader;
                WEBGL2 || (fs = "#extension GL_EXT_draw_buffers : require\n" + fs), fs = fs.split("void main() {"), fs = fs[0] + "void main() {\nvec4 tmpFragColor;\n" + fs[1], fs = fs.replace(/gl_FragColor/g, "tmpFragColor");
                let idx = fs.lastIndexOf("}");
                fs = fs.slice(0, idx) + "#drawbuffer Color gl_FragColor = tmpFragColor;\n" + fs.slice(idx), shader.fragmentShader = fs
            }
            _drawBuffers.forEach((t, i) => {
                let name = t.fxLayer.getName(),
                    key = WEBGL2 ? name + " =" : `gl_FragData[${i+1}]`;
                if (!shader.fragmentShader.includes(key)) {
                    let fs = shader.fragmentShader,
                        idx = fs.lastIndexOf("}");
                    fs = fs.slice(0, idx) + `#drawbuffer ${name} gl_FragColor = vec4(0.0);\n` + fs.slice(idx), shader.fragmentShader = fs, t.fxLayer.add(obj)
                }
            })
        }, _this.add = function(pass, index) {
            "number" != typeof index ? _this.passes.push(pass) : _this.passes.splice(index, 0, pass)
        }, _this.remove = function(pass) {
            "number" == typeof pass ? _this.passes.splice(pass) : _this.passes.remove(pass)
        }, _this.render = function(directCallback) {
            if (RenderStats.update("Nuke"), _this.events.fire(Nuke.RENDER, _this, !0), _this.onBeforeRender && _this.onBeforeRender(), !_this.enabled || !_this.passes.length) return _this.renderer.render(_this.scene, _this.camera, _this.rtt, null, directCallback), _this.onBeforeProcess && _this.onBeforeProcess(), void(_this.postRender && _this.postRender());
            RenderStats.update("NukePass", _this.passes.length), _this.hasRendered = !0, _this.onBeforeProcess && _this.onBeforeProcess(), _this.renderer.render(_this.scene, _this.camera, _rttBuffer, !0);
            let usedBuffer = !1,
                pingPong = !0,
                count = _this.passes.length;
            for (var i = 0; i < count; i++) {
                if (_this.passes[i].disabled) continue;
                let shader = _this.passes[i].pass,
                    inTexture = usedBuffer ? pingPong ? _rttPing.texture : _rttPong.texture : _rttBuffer.texture,
                    outTexture = pingPong ? _rttPong : _rttPing;
                i == count - 1 && (outTexture = _this.rtt), _nukeMesh.shader = shader, _nukeMesh.shader.depthTest = !1, _nukeMesh.shader.depthWrite = !1, _nukeMesh.shader.uniforms.tDiffuse.value = inTexture, _this.renderer.renderSingle(_nukeMesh, _this.camera || World.CAMERA, outTexture, i == count - 1 ? directCallback : null), usedBuffer = !0, pingPong = !pingPong
            }
            _this.postRender && _this.postRender()
        }, _this.setSize = function(width, height) {
            width == _width && height == _height || (_width = width, _height = height, resizeHandler())
        }, _this.attachDrawBuffer = function(texture) {
            if (_this.hasRendered && console.warn("Attempt to attach draw buffer after first render! Create FXLayer instance before first render."), _drawBuffers.push(texture), _rttBuffer && _rttBuffer.attachments) {
                _rttBuffer.attachments = [_rttBuffer.attachments[0]];
                for (let i = 0; i < _drawBuffers.length; i++) _rttBuffer.attachments.push(_drawBuffers[i])
            }
            return _drawBuffers.length
        }, _this.upload = function() {
            _this.passes.length && _this.enabled && (_rttPing.upload(), _rttPong.upload(), _rttBuffer.upload()), _rttBuffer.depth && _rttBuffer.depth.upload(), _this.rtt && _this.rtt.upload()
        }, _this.set("dpr", (function(v) {
            _dpr = v, resizeHandler()
        })), _this.get("dpr", (function() {
            return _dpr
        })), _this.get("output", (function() {
            return _nukeMesh.shader && _nukeMesh.shader.uniforms ? _nukeMesh.shader.uniforms.tDiffuse.value : null
        })), _this.get("rttBuffer", (function() {
            return _rttBuffer
        })), this.set("rttBuffer", (function(v) {
            _rttBuffer = v
        })), _this.get("prevFrameRT", (function() {
            return _rttBuffer && _rttBuffer.texture ? _rttBuffer.texture : null
        })), _this.get("nukeScene", (function() {
            return _nukeScene
        })), _this.get("ping", (function() {
            return _rttPing
        })), _this.get("pong", (function() {
            return _rttPong
        })), _this.get("attachments", (function() {
            return _rttBuffer.attachments.length
        })), this.onDestroy = function() {
            _rttBuffer.destroy()
        }
}), (function() {
    Nuke.RENDER = "nuke_render";
    var _rts = {};
    Nuke.getRT = function(width, height, multi, index) {
        let rt, exists = _rts[`${width}_${height}_${multi}_${index}`];
        return exists || (rt = multi ? Utils3D.createMultiRT(width, height) : Utils3D.createRT(width, height), index > 0 && Nuke.recyclePingPong && (_rts[`${width}_${height}_${multi}_${index}`] = rt), rt)
    }
})), Class((function NukePass(_fs, _uniforms, _pass) {
    Inherit(this, Component);
    var _this = this;
    this.UILPrefix = "string" == typeof _fs ? _fs : Utils.getConstructorName(_fs), this.init = function(fs, vs) {
        if (_this.pass) return;
        _this = this;
        fs || this.constructor.toString().match(/function ([^\(]+)/)[1], Array.isArray(fs) && fs.join("");
        if (_this.uniforms = _uniforms || _this.uniforms || {}, _this.uniforms.tDiffuse = {
                type: "t",
                value: null,
                ignoreUIL: !0
            }, _this.uniforms.unique && (_this.UILPrefix += "_" + _this.uniforms.unique + "_"), window.UILStorage)
            for (let key in _this.uniforms) "unique" !== key && (_this.uniforms[key] = UILStorage.parse(_this.UILPrefix + key, _this.uniforms[key].value) || _this.uniforms[key]);
        _this.pass = _this.initClass(Shader, vs || "NukePass", fs, Utils.mergeObject(_this.uniforms, {
            precision: "high"
        }), (code, type) => "fs" == type ? function prefix(code) {
            if (!code) throw `No shader ${_fs} found`;
            let pre = "";
            return code.includes("uniform sampler2D tDiffuse") || (pre += "uniform sampler2D tDiffuse;\n", pre += "varying vec2 vUv;\n"), code = pre + code
        }(code) : code), _this.uniforms = _this.pass.uniforms
    }, this.set = function(key, value) {
        TweenManager.clearTween(_this.uniforms[key]), _this.uniforms[key].value = value
    }, this.get = function(key) {
        return void 0 === _this.uniforms[key] ? null : _this.uniforms[key].value
    }, this.tween = function(key, value, time, ease, delay, callback, update) {
        return tween(_this.uniforms[key], {
            value: value
        }, time, ease, delay, callback, update)
    }, this.clone = function() {
        return _this.pass || _this.init(_fs), new NukePass(null, null, _this.pass.clone())
    }, this.upload = function() {
        _this.pass.upload()
    }, "string" == typeof _fs ? _this.init(_fs) : _pass && (_this.pass = _pass, _this.uniforms = _pass.uniforms)
})), Class((function Raycaster(_camera) {
    Inherit(this, Component);
    const _this = this;
    let _mouse = new Vector3,
        _raycaster = new RayManager;

    function ascSort(a, b) {
        return a.distance - b.distance
    }

    function intersect(objects) {
        Array.isArray(objects) || (objects = [objects]);
        let intersects = [];
        return objects.forEach(object => {
            ! function intersectObject(object, raycaster, intersects, recursive) {
                let obj = object;
                for (; obj && _this.testVisibility;) {
                    if (!1 === obj.visible && !obj.forceRayVisible && !1 !== obj.testVisibility) return;
                    obj = obj.parent
                }
                if (object.raycast && (object.raycast(raycaster, intersects), !0 === recursive)) {
                    let children = object.children;
                    for (let i = 0, l = children.length; i < l; i++) intersectObject(children[i], raycaster, intersects, !0)
                }
            }(object, _raycaster, intersects, !1)
        }), intersects.sort(ascSort), intersects
    }
    this.testVisibility = !0, this.set("camera", (function(camera) {
        _camera = camera
    })), this.set("pointsThreshold", (function(value) {
        _raycaster.params.Points.threshold = value
    })), this.get("ray", () => _raycaster.ray), this.checkHit = function(objects, mouse, rect = Stage) {
        return mouse = mouse || Mouse, _mouse.x = mouse.x / rect.width * 2 - 1, _mouse.y = -mouse.y / rect.height * 2 + 1, _raycaster.setFromCamera(_mouse, _camera), intersect(objects)
    }, this.checkFromValues = function(objects, origin, direction) {
        return _raycaster.set(origin, direction, 0, Number.POSITIVE_INFINITY), intersect(objects)
    }
}), _ => {
    var _ray, _map = new WeakMap;
    Raycaster.checkHit = function(objects, mouse) {
        return _ray || (_ray = new Raycaster(World.CAMERA)), _ray.checkHit(objects, mouse)
    }, Raycaster.checkFromValues = function(objects, origin, direction) {
        return _ray || (_ray = new Raycaster(World.CAMERA)), _ray.checkFromValues(objects, origin, direction)
    }, Raycaster.find = function(camera) {
        if (!_map.has(camera)) {
            let ray = new Raycaster(camera);
            _map.set(camera, ray)
        }
        return _map.get(camera)
    }
}), Class((function Object3D() {
    Inherit(this, Component);
    var _this = this,
        _visible = !0;
    this.__element = !0, this.group = new Group, this.group.classRef = this, this.add = function(child) {
        this.group.add(child.group || child)
    }, this.remove = function(child) {
        this.group.remove(child.group || child)
    }, this.onDestroy = function() {
        this.group.deleted = !0, this.group.classRef = null, this.group && this.group.parent && this.group.parent.remove(this.group)
    }, this.set("visible", v => _this.group.visible = _visible = v), this.get("visible", _ => _visible)
})), Class((function Utils3D() {
    const _this = this;
    var _emptyTexture, _q, _textures = {};
    window.Vec2 = window.Vector2, window.Vec3 = window.Vector3, async function() {
        await Hydra.ready();
        let threads = Thread.shared(!0);
        for (let i = 0; i < threads.array.length; i++) _this.loadEngineOnThread(threads.array[i])
    }(), this.decompose = function(local, world) {
        local.matrixWorld.decompose(world.position, world.quaternion, world.scale)
    }, this.createDebug = function(size = 1, color) {
        return new Mesh(new IcosahedronGeometry(size, 1), _this.getTestShader(color))
    }, this.getTestShader = function(color) {
        return color ? new Shader("ColorMaterial", {
            color: {
                value: color instanceof Color ? color : new Color(color)
            },
            alpha: {
                value: 1
            }
        }) : new Shader("TestMaterial")
    }, this.createMultiRT = function(width, height, type, format) {
        let rt = new MultiRenderTarget(width, height, {
            minFilter: Texture.LINEAR,
            magFilter: Texture.LINEAR,
            format: format || Texture.RGBFormat,
            type: type
        });
        return rt.texture.generateMipmaps = !1, rt
    }, this.createRT = function(width, height, type, format) {
        let rt = new RenderTarget(width, height, {
            minFilter: Texture.LINEAR,
            magFilter: Texture.LINEAR,
            format: format || Texture.RGBFormat,
            type: type
        });
        return rt.texture.generateMipmaps = !1, rt
    }, this.getFloatType = function() {
        return "android" == Device.system.os ? Texture.FLOAT : Texture.HALF_FLOAT
    }, this.getTexture = function(path, params = {}) {
        if (!Device.graphics.webgl && !window.AURA) {
            let texture = new Texture;
            return texture.promise = Promise.resolve(), texture.dimensions = {
                width: 0,
                height: 0
            }, texture
        }
        if (path.includes("://")) {
            let guard = path.split("://");
            guard[1] = guard[1].replace(/\/\//g, "/"), path = guard.join("://")
        } else path = path.replace(/\/\//g, "/");
        let cacheBust = path.includes("?");
        if (cacheBust && (path = path.split("?")[0]), _textures[path]) _textures[path].exists++;
        else {
            let texture = new Texture;
            texture.exists = 1, texture.loaded = !1, texture.compressed = path.includes("compressedKtx"), texture.promise = Promise.create(), texture._destroy = texture.destroy, texture.destroy = function() {
                texture.forcePersist || --texture.exists > 0 || (delete _textures[path], this._destroy())
            }, _textures[path] = texture, texture.format = path.match(/jpe?g/) ? Texture.RGBFormat : Texture.RGBAFormat, texture.src = path, !1 === params.premultiplyAlpha && (texture.premultiplyAlpha = !1), _this.onTextureCreated && _this.onTextureCreated(texture);
            let cb = imgBmp => {
                    imgBmp.crossOrigin = "anonymous", texture.image = imgBmp, texture.dimensions = {
                        width: imgBmp.width,
                        height: imgBmp.height
                    }, texture.loaded = !0, texture.needsReupload = !0, Math.isPowerOf2(imgBmp.width, imgBmp.height) || (texture.minFilter = Texture.LINEAR, texture.generateMipmaps = !1), imgBmp.gliFormat && (texture.minFilter = Texture.LINEAR), texture.onUpdate = function() {
                        !params.preserveData && imgBmp.close && imgBmp.close(), texture.onUpdate = null
                    }, texture.promise.resolve(), texture.onload && (texture.onload(), texture.onload = null)
                },
                imgPath = cacheBust ? path + "?" + Date.now() : path;
            ImageDecoder.decode(imgPath, params).then(cb).catch(e => {
                texture.promise.reject(e)
            })
        }
        return _textures[path]
    }, this.getLookupTexture = function(path) {
        let texture = _this.getTexture(path);
        return texture.minFilter = texture.magFilter = Texture.NEAREST, texture.generateMipmaps = !1, texture
    }, this.clearTextureCache = function() {
        for (let key in _textures) _textures[key].destroy();
        _textures = {}
    }, this.loadCurve = function(obj) {
        "string" == typeof obj && ((obj = Assets.JSON[obj]).curves = obj.curves[0]);
        let data = obj.curves,
            points = [];
        for (let j = 0; j < data.length; j += 3) points.push(new Vector3(data[j + 0], data[j + 1], data[j + 2]));
        if (!window.CatmullRomCurve) throw "loadCurve requires curve3d module";
        return new CatmullRomCurve(points)
    }, this.getEmptyTexture = function() {
        return _emptyTexture || (_emptyTexture = new Texture), _emptyTexture
    }, this.getRepeatTexture = function(src, scale) {
        let texture = _this.getTexture(src, scale);
        return texture.wrapS = texture.wrapT = Texture.REPEAT, texture
    }, this.findTexturesByPath = function(path) {
        let array = [];
        for (let key in _textures) key.includes(path) && array.push(_textures[key]);
        return array
    }, this.getHeightFromCamera = function(camera, dist) {
        camera = camera.camera || camera, dist || (dist = camera.position.length());
        let fov = camera.fov;
        return 2 * dist * Math.tan(.5 * Math.radians(fov))
    }, this.getPositionFromCameraSize = function(camera, size) {
        camera = camera.camera || camera;
        let fov = Math.radians(camera.fov);
        return Math.abs(size / Math.sin(fov / 2))
    }, this.loadEngineOnThread = function(thread) {
        ["Base3D", "CameraBase3D", "Mesh", "OrthographicCamera", "PerspectiveCamera", "Geometry", "GeometryAttribute", "Points", "Scene", "BoxGeometry", "CylinderGeometry", "PlaneGeometry", "PolyhedronGeometry", "IcosahedronGeometry", "SphereGeometry", "Box2", "Box3", "Face3", "Color", "Cylindrical", "Euler", "Frustum", "Line3", "Matrix3", "Matrix4", "Plane", "Quaternion", "Ray", "Sphere", "Spherical", "Triangle", "Vector2", "Vector3", "Vector4", "RayManager", "Vector3D", "Group"].forEach(name => {
            thread.importES6Class(name)
        }), thread.importCode(`Class(${zUtils3D.constructor.toString()}, 'static')`)
    }, this.billboard = function(mesh, camera = World.CAMERA) {
        _q || (_q = new Quaternion), mesh._parent ? (mesh._parent.getWorldQuaternion(_q).inverse(), _q.multiply(camera.quaternion), mesh.quaternion.copy(_q)) : mesh.quaternion.copy(World.CAMERA.quaternion)
    }, this.getQuad = function() {
        let geom = new Geometry,
            position = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
            uv = new Float32Array([0, 0, 2, 0, 0, 2]);
        return geom.addAttribute("position", new GeometryAttribute(position, 3)), geom.addAttribute("uv", new GeometryAttribute(uv, 2)), geom
    }
}), "static"), window.WebGLRenderingContext && function() {
    "use strict";
    var e = {};

    function r(r, t) {
        var i;
        e[r] = !0, void 0 !== t && (i = t, window.console && window.console.error && window.console.error(i))
    }
    var t = function e(r) {
        var t = r.gl;
        this.ext = r, this.isAlive = !0, this.hasBeenBound = !1, this.elementArrayBuffer = null, this.attribs = new Array(r.maxVertexAttribs);
        for (var i = 0; i < this.attribs.length; i++) {
            var a = new e.VertexAttrib(t);
            this.attribs[i] = a
        }
        this.maxAttrib = 0
    };
    (t.VertexAttrib = function(e) {
        this.enabled = !1, this.buffer = null, this.size = 4, this.type = e.FLOAT, this.normalized = !1, this.stride = 16, this.offset = 0, this.cached = "", this.recache()
    }).prototype.recache = function() {
        this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":")
    };
    var i = function(r) {
        var t, i, a = this;
        this.gl = r, i = (t = r).getError, t.getError = function() {
            do {
                (r = i.apply(t)) != t.NO_ERROR && (e[r] = !0)
            } while (r != t.NO_ERROR);
            for (var r in e)
                if (e[r]) return delete e[r], parseInt(r);
            return t.NO_ERROR
        };
        var n = this.original = {
            getParameter: r.getParameter,
            enableVertexAttribArray: r.enableVertexAttribArray,
            disableVertexAttribArray: r.disableVertexAttribArray,
            bindBuffer: r.bindBuffer,
            getVertexAttrib: r.getVertexAttrib,
            vertexAttribPointer: r.vertexAttribPointer
        };
        r.getParameter = function(e) {
            return e == a.VERTEX_ARRAY_BINDING_OES ? a.currentVertexArrayObject == a.defaultVertexArrayObject ? null : a.currentVertexArrayObject : n.getParameter.apply(this, arguments)
        }, r.enableVertexAttribArray = function(e) {
            var r = a.currentVertexArrayObject;
            return r.maxAttrib = Math.max(r.maxAttrib, e), r.attribs[e].enabled = !0, n.enableVertexAttribArray.apply(this, arguments)
        }, r.disableVertexAttribArray = function(e) {
            var r = a.currentVertexArrayObject;
            return r.maxAttrib = Math.max(r.maxAttrib, e), r.attribs[e].enabled = !1, n.disableVertexAttribArray.apply(this, arguments)
        }, r.bindBuffer = function(e, t) {
            switch (e) {
                case r.ARRAY_BUFFER:
                    a.currentArrayBuffer = t;
                    break;
                case r.ELEMENT_ARRAY_BUFFER:
                    a.currentVertexArrayObject.elementArrayBuffer = t
            }
            return n.bindBuffer.apply(this, arguments)
        }, r.getVertexAttrib = function(e, t) {
            var i = a.currentVertexArrayObject.attribs[e];
            switch (t) {
                case r.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                    return i.buffer;
                case r.VERTEX_ATTRIB_ARRAY_ENABLED:
                    return i.enabled;
                case r.VERTEX_ATTRIB_ARRAY_SIZE:
                    return i.size;
                case r.VERTEX_ATTRIB_ARRAY_STRIDE:
                    return i.stride;
                case r.VERTEX_ATTRIB_ARRAY_TYPE:
                    return i.type;
                case r.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                    return i.normalized;
                default:
                    return n.getVertexAttrib.apply(this, arguments)
            }
        }, r.vertexAttribPointer = function(e, r, t, i, s, A) {
            var o = a.currentVertexArrayObject;
            o.maxAttrib = Math.max(o.maxAttrib, e);
            var c = o.attribs[e];
            return c.buffer = a.currentArrayBuffer, c.size = r, c.type = t, c.normalized = i, c.stride = s, c.offset = A, c.recache(), n.vertexAttribPointer.apply(this, arguments)
        }, r.instrumentExtension && r.instrumentExtension(this, "OES_vertex_array_object"), r.canvas.addEventListener("webglcontextrestored", (function() {
            window.console && window.console.log && window.console.log("OESVertexArrayObject emulation library context restored"), a.reset_()
        }), !0), this.reset_()
    };
    i.prototype.VERTEX_ARRAY_BINDING_OES = 34229, i.prototype.reset_ = function() {
            if (void 0 !== this.vertexArrayObjects)
                for (var e = 0; e < this.vertexArrayObjects.length; ++e) this.vertexArrayObjects.isAlive = !1;
            var r = this.gl;
            this.maxVertexAttribs = r.getParameter(r.MAX_VERTEX_ATTRIBS), this.defaultVertexArrayObject = new t(this), this.currentVertexArrayObject = null, this.currentArrayBuffer = null, this.vertexArrayObjects = [this.defaultVertexArrayObject], this.bindVertexArrayOES(null)
        }, i.prototype.createVertexArrayOES = function() {
            var e = new t(this);
            return this.vertexArrayObjects.push(e), e
        }, i.prototype.deleteVertexArrayOES = function(e) {
            e.isAlive = !1, this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(e), 1), this.currentVertexArrayObject == e && this.bindVertexArrayOES(null)
        }, i.prototype.isVertexArrayOES = function(e) {
            return !!(e && e instanceof t && e.hasBeenBound && e.ext == this)
        }, i.prototype.bindVertexArrayOES = function(e) {
            var t = this.gl;
            if (!e || e.isAlive) {
                var i = this.original,
                    a = this.currentVertexArrayObject;
                this.currentVertexArrayObject = e || this.defaultVertexArrayObject, this.currentVertexArrayObject.hasBeenBound = !0;
                var n = this.currentVertexArrayObject;
                if (a != n) {
                    a && n.elementArrayBuffer == a.elementArrayBuffer || i.bindBuffer.call(t, t.ELEMENT_ARRAY_BUFFER, n.elementArrayBuffer);
                    for (var s = this.currentArrayBuffer, A = Math.max(a ? a.maxAttrib : 0, n.maxAttrib), o = 0; o <= A; o++) {
                        var c = n.attribs[o],
                            b = a ? a.attribs[o] : null;
                        if (a && c.enabled == b.enabled || (c.enabled ? i.enableVertexAttribArray.call(t, o) : i.disableVertexAttribArray.call(t, o)), c.enabled) {
                            var u = !1;
                            a && c.buffer == b.buffer || (s != c.buffer && (i.bindBuffer.call(t, t.ARRAY_BUFFER, c.buffer), s = c.buffer), u = !0), (u || c.cached != b.cached) && i.vertexAttribPointer.call(t, o, c.size, c.type, c.normalized, c.stride, c.offset)
                        }
                    }
                    this.currentArrayBuffer != s && i.bindBuffer.call(t, t.ARRAY_BUFFER, this.currentArrayBuffer)
                }
            } else r(t.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject")
        },
        function() {
            var e = WebGLRenderingContext.prototype.getSupportedExtensions;
            WebGLRenderingContext.prototype.getSupportedExtensions = function() {
                var r = e.call(this) || [];
                return r.indexOf("OES_vertex_array_object") < 0 && r.push("OES_vertex_array_object"), r
            };
            var r = WebGLRenderingContext.prototype.getExtension;
            WebGLRenderingContext.prototype.getExtension = function(e) {
                return r.call(this, e) || ("OES_vertex_array_object" !== e ? null : (this.__OESVertexArrayObject || (console.log("Setup OES_vertex_array_object polyfill"), this.__OESVertexArrayObject = new i(this)), this.__OESVertexArrayObject))
            }
        }()
}(), window.DebugControls = function(object, domElement) {
    var offset, quat, quatInverse, lastPosition, lastQuaternion;
    this.object = object, this.domElement = void 0 !== domElement ? domElement : document, this.enabled = !0, this.target = new Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !0, this.dampingFactor = .1, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = .1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !1, this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    }, this.mouseButtons = {
        ORBIT: 0,
        ZOOM: 2,
        PAN: 1
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function() {
        return spherical.phi
    }, this.getAzimuthalAngle = function() {
        return spherical.theta
    }, this.reset = function() {
        scope.target.copy(scope.target0), scope.object.position.copy(scope.position0), scope.object.zoom = scope.zoom0, scope.object.updateProjectionMatrix(), scope.update(), state = STATE.NONE
    }, this.update = (offset = new Vector3, quat = (new Quaternion).setFromUnitVectors(object.up, new Vector3(0, 1, 0)), quatInverse = quat.clone().inverse(), lastPosition = new Vector3, lastQuaternion = new Quaternion, function update() {
        var position = scope.object.position;
        return offset.copy(position).sub(scope.target), offset.applyQuaternion(quat), spherical.setFromVector3(offset), scope.autoRotate && state === STATE.NONE && rotateLeft(function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed
        }()), spherical.theta += sphericalDelta.theta, spherical.phi += sphericalDelta.phi, spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta)), spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi)), spherical.makeSafe(), spherical.radius *= scale, spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)), scope.target.add(panOffset), offset.setFromSpherical(spherical), offset.applyQuaternion(quatInverse), position.copy(scope.target).add(offset), scope.object.lookAt(scope.target), !0 === scope.enableDamping ? (sphericalDelta.theta *= 1 - scope.dampingFactor, sphericalDelta.phi *= 1 - scope.dampingFactor) : sphericalDelta.set(0, 0, 0), scale = 1, panOffset.set(0, 0, 0), !!(zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) && (lastPosition.copy(scope.object.position), lastQuaternion.copy(scope.object.quaternion), zoomChanged = !1, !0)
    }), this.dispose = function() {
        scope.domElement.removeEventListener("contextmenu", onContextMenu, !1), scope.domElement.removeEventListener("mousedown", onMouseDown, !1), scope.domElement.removeEventListener("mousewheel", onMouseWheel, !1), scope.domElement.removeEventListener("MozMousePixelScroll", onMouseWheel, !1), scope.domElement.removeEventListener("touchstart", onTouchStart, !1), scope.domElement.removeEventListener("touchend", onTouchEnd, !1), scope.domElement.removeEventListener("touchmove", onTouchMove, !1), document.removeEventListener("mousemove", onMouseMove, !1), document.removeEventListener("mouseup", onMouseUp, !1), window.removeEventListener("keydown", onKeyDown, !1)
    };
    var scope = this,
        STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY: 4,
            TOUCH_PAN: 5
        },
        state = STATE.NONE,
        EPS = 1e-6,
        spherical = new Spherical,
        sphericalDelta = new Spherical,
        scale = 1,
        panOffset = new Vector3,
        zoomChanged = !1,
        rotateStart = new Vector2,
        rotateEnd = new Vector2,
        rotateDelta = new Vector2,
        panStart = new Vector2,
        panEnd = new Vector2,
        panDelta = new Vector2,
        dollyStart = new Vector2,
        dollyEnd = new Vector2,
        dollyDelta = new Vector2;

    function getZoomScale() {
        return Math.pow(.95, scope.zoomSpeed)
    }

    function rotateLeft(angle) {
        sphericalDelta.theta -= angle
    }

    function rotateUp(angle) {
        sphericalDelta.phi -= angle
    }
    var v, panLeft = (v = new Vector3, function panLeft(distance, objectMatrix) {
            v.setFromMatrixColumn(objectMatrix, 0), v.multiplyScalar(-distance), panOffset.add(v)
        }),
        panUp = function() {
            var v = new Vector3;
            return function panUp(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 1), v.multiplyScalar(distance), panOffset.add(v)
            }
        }(),
        pan = function() {
            var offset = new Vector3;
            return function pan(deltaX, deltaY) {
                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
                if (scope.object instanceof PerspectiveCamera) {
                    var position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    var targetDistance = offset.length();
                    targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180), panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix), panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix)
                } else scope.object instanceof OrthographicCamera ? (panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix), panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), scope.enablePan = !1)
            }
        }();

    function dollyIn(dollyScale) {
        scope.object instanceof PerspectiveCamera ? scale /= dollyScale : scope.object instanceof OrthographicCamera ? (scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale)), scope.object.updateProjectionMatrix(), zoomChanged = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), scope.enableZoom = !1)
    }

    function dollyOut(dollyScale) {
        scope.object instanceof PerspectiveCamera ? scale *= dollyScale : scope.object instanceof OrthographicCamera ? (scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale)), scope.object.updateProjectionMatrix(), zoomChanged = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), scope.enableZoom = !1)
    }

    function onMouseDown(event) {
        if (!1 !== scope.enabled) {
            if (event.preventDefault(), event.button === scope.mouseButtons.ORBIT) {
                if (!1 === scope.enableRotate) return;
                ! function handleMouseDownRotate(event) {
                    rotateStart.set(event.clientX, event.clientY)
                }(event), state = STATE.ROTATE
            } else if (event.button === scope.mouseButtons.ZOOM) {
                if (!1 === scope.enableZoom) return;
                ! function handleMouseDownDolly(event) {
                    dollyStart.set(event.clientX, event.clientY)
                }(event), state = STATE.DOLLY
            } else if (event.button === scope.mouseButtons.PAN) {
                if (!1 === scope.enablePan) return;
                ! function handleMouseDownPan(event) {
                    panStart.set(event.clientX, event.clientY)
                }(event), state = STATE.PAN
            }
            state !== STATE.NONE && (document.addEventListener("mousemove", onMouseMove, !1), document.addEventListener("mouseup", onMouseUp, !1))
        }
    }

    function onMouseMove(event) {
        if (!1 !== scope.enabled)
            if (event.preventDefault(), state === STATE.ROTATE) {
                if (!1 === scope.enableRotate) return;
                ! function handleMouseMoveRotate(event) {
                    rotateEnd.set(event.clientX, event.clientY), rotateDelta.subVectors(rotateEnd, rotateStart);
                    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
                    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed), rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed), rotateStart.copy(rotateEnd), scope.update()
                }(event)
            } else if (state === STATE.DOLLY) {
            if (!1 === scope.enableZoom) return;
            ! function handleMouseMoveDolly(event) {
                dollyEnd.set(event.clientX, event.clientY), dollyDelta.subVectors(dollyEnd, dollyStart), dollyDelta.y > 0 ? dollyIn(getZoomScale()) : dollyDelta.y < 0 && dollyOut(getZoomScale()), dollyStart.copy(dollyEnd), scope.update()
            }(event)
        } else if (state === STATE.PAN) {
            if (!1 === scope.enablePan) return;
            ! function handleMouseMovePan(event) {
                panEnd.set(event.clientX, event.clientY), panDelta.subVectors(panEnd, panStart), pan(panDelta.x, panDelta.y), panStart.copy(panEnd), scope.update(), scope.onChange && scope.onChange()
            }(event)
        }
    }

    function onMouseUp(event) {
        !1 !== scope.enabled && (document.removeEventListener("mousemove", onMouseMove, !1), document.removeEventListener("mouseup", onMouseUp, !1), scope.onChange && scope.onChange(), state = STATE.NONE)
    }

    function onMouseWheel(event) {
        !1 === scope.enabled || !1 === scope.enableZoom || state !== STATE.NONE && state !== STATE.ROTATE || (event.preventDefault(), event.stopPropagation(), function handleMouseWheel(event) {
            var delta = 0;
            void 0 !== event.wheelDelta ? delta = event.wheelDelta : void 0 !== event.detail && (delta = -event.detail), delta > 0 ? dollyOut(getZoomScale()) : delta < 0 && dollyIn(getZoomScale()), scope.update()
        }(event), scope.onChange && scope.onChange())
    }

    function onKeyDown(event) {
        !1 !== scope.enabled && !1 !== scope.enableKeys && !1 !== scope.enablePan && function handleKeyDown(event) {
            switch (event.keyCode) {
                case scope.keys.UP:
                    pan(0, scope.keyPanSpeed), scope.update();
                    break;
                case scope.keys.BOTTOM:
                    pan(0, -scope.keyPanSpeed), scope.update();
                    break;
                case scope.keys.LEFT:
                    pan(scope.keyPanSpeed, 0), scope.update();
                    break;
                case scope.keys.RIGHT:
                    pan(-scope.keyPanSpeed, 0), scope.update()
            }
        }(event)
    }

    function onTouchStart(event) {
        if (!1 !== scope.enabled) {
            switch (event.touches.length) {
                case 1:
                    if (!1 === scope.enableRotate) return;
                    ! function handleTouchStartRotate(event) {
                        rotateStart.set(event.touches[0].pageX, event.touches[0].pageY)
                    }(event), state = STATE.TOUCH_ROTATE;
                    break;
                case 2:
                    if (!1 === scope.enableZoom) return;
                    ! function handleTouchStartDolly(event) {
                        var dx = event.touches[0].pageX - event.touches[1].pageX,
                            dy = event.touches[0].pageY - event.touches[1].pageY,
                            distance = Math.sqrt(dx * dx + dy * dy);
                        dollyStart.set(0, distance)
                    }(event), state = STATE.TOUCH_DOLLY;
                    break;
                case 3:
                    if (!1 === scope.enablePan) return;
                    ! function handleTouchStartPan(event) {
                        panStart.set(event.touches[0].pageX, event.touches[0].pageY)
                    }(event), state = STATE.TOUCH_PAN;
                    break;
                default:
                    state = STATE.NONE
            }
            STATE.NONE
        }
    }

    function onTouchMove(event) {
        if (!1 !== scope.enabled) switch (event.preventDefault(), event.stopPropagation(), event.touches.length) {
            case 1:
                if (!1 === scope.enableRotate) return;
                if (state !== STATE.TOUCH_ROTATE) return;
                ! function handleTouchMoveRotate(event) {
                    rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY), rotateDelta.subVectors(rotateEnd, rotateStart);
                    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
                    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed), rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed), rotateStart.copy(rotateEnd), scope.update()
                }(event);
                break;
            case 2:
                if (!1 === scope.enableZoom) return;
                if (state !== STATE.TOUCH_DOLLY) return;
                ! function handleTouchMoveDolly(event) {
                    var dx = event.touches[0].pageX - event.touches[1].pageX,
                        dy = event.touches[0].pageY - event.touches[1].pageY,
                        distance = Math.sqrt(dx * dx + dy * dy);
                    dollyEnd.set(0, distance), dollyDelta.subVectors(dollyEnd, dollyStart), dollyDelta.y > 0 ? dollyOut(getZoomScale()) : dollyDelta.y < 0 && dollyIn(getZoomScale()), dollyStart.copy(dollyEnd), scope.update()
                }(event);
                break;
            case 3:
                if (!1 === scope.enablePan) return;
                if (state !== STATE.TOUCH_PAN) return;
                ! function handleTouchMovePan(event) {
                    panEnd.set(event.touches[0].pageX, event.touches[0].pageY), panDelta.subVectors(panEnd, panStart), pan(panDelta.x, panDelta.y), panStart.copy(panEnd), scope.update()
                }(event);
                break;
            default:
                state = STATE.NONE
        }
    }

    function onTouchEnd(event) {
        !1 !== scope.enabled && (scope.onChange && scope.onChange(), state = STATE.NONE)
    }

    function onContextMenu(event) {}
    scope.domElement.addEventListener("contextmenu", onContextMenu, !1), scope.domElement.addEventListener("mousedown", onMouseDown, !1), scope.domElement.addEventListener("mousewheel", onMouseWheel, !1), scope.domElement.addEventListener("MozMousePixelScroll", onMouseWheel, !1), scope.domElement.addEventListener("touchstart", onTouchStart, !1), scope.domElement.addEventListener("touchend", onTouchEnd, !1), scope.domElement.addEventListener("touchmove", onTouchMove, !1), window.addEventListener("keydown", onKeyDown, !1), this.update()
}, window.WASDControls = function(object, domElement) {
    this.object = object, this.domElement = domElement, this.enabled = !0, this.scalar = Utils.query("wasd"), isNaN(this.scalar) && (this.scalar = 1), this.movementSpeed = 1, this.lookSpeed = .005, this.lookVertical = !0, this.autoForward = !1, this.activeLook = !0, this.heightSpeed = !1, this.heightCoef = 1, this.heightMin = 0, this.heightMax = 1, this.constrainVertical = !1, this.verticalMin = 0, this.verticalMax = Math.PI, this.mouseDragOn = !1, this.autoSpeedFactor = 0, this.mouseX = 0, this.mouseY = 0, this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.viewHalfX = 0, this.viewHalfY = 0;
    var lat = 0,
        lon = 0,
        _dragging = 0,
        _tick = 0,
        lookDirection = new Vector3,
        spherical = new Spherical,
        target = new Vector3,
        playground = Global.PLAYGROUND || "m";
    this.handleResize = function() {
        this.viewHalfX = Stage.width / 2, this.viewHalfY = Stage.height / 2
    }, this.onMouseDown = function(event) {
        this.domElement !== document && this.domElement.focus(), event.preventDefault(), event.stopPropagation(), _dragging = 1, this.mouseDragOn = !0
    }, this.onMouseUp = function(event) {
        event.preventDefault(), event.stopPropagation(), _dragging = 0, this.mouseDragOn = !1
    }, this.onMouseMove = function(event) {
        this.domElement === document ? (this.mouseX = event.pageX - this.viewHalfX, this.mouseY = event.pageY - this.viewHalfY) : (this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY)
    }, this.onKeyDown = function(event) {
        if (!this.cmd) switch (event.keyCode) {
            case 91:
            case 93:
                this.cmd = !0;
                break;
            case 87:
                this.moveForward = !0;
                break;
            case 37:
            case 65:
                this.moveLeft = !0;
                break;
            case 83:
                this.moveBackward = !0;
                break;
            case 39:
            case 68:
                this.moveRight = !0;
                break;
            case 82:
                this.moveUp = !0;
                break;
            case 70:
                this.moveDown = !0
        }
    }, this.onKeyUp = function(event) {
        switch (event.keyCode) {
            case 93:
                this.cmd = !1;
                break;
            case 87:
                this.moveForward = !1;
                break;
            case 37:
            case 65:
                this.moveLeft = !1;
                break;
            case 83:
                this.moveBackward = !1;
                break;
            case 39:
            case 68:
                this.moveRight = !1;
                break;
            case 82:
                this.moveUp = !1;
                break;
            case 70:
                this.moveDown = !1
        }
    }, this.lookAt = function(x, y, z) {
        return x.isVector3 ? target.copy(x) : target.set(x, y, z), this.object.lookAt(target), setOrientation(this), this
    };
    let _this = this;
    var targetPosition;

    function contextmenu(event) {
        event.preventDefault()
    }
    Events.emitter._addEvent(Events.VISIBILITY, _ => {
        _this.cmd = !1
    }), this.update = (targetPosition = new Vector3, function update(delta = .1) {
        if (delta *= this.scalar, !1 !== this.enabled) {
            if (this.heightSpeed) {
                var heightDelta = Math.clamp(this.object.position.y, this.heightMin, this.heightMax) - this.heightMin;
                this.autoSpeedFactor = delta * (heightDelta * this.heightCoef)
            } else this.autoSpeedFactor = 0;
            var actualMoveSpeed = delta * this.movementSpeed;
            (this.moveForward || this.autoForward && !this.moveBackward) && this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor)), this.moveBackward && this.object.translateZ(actualMoveSpeed), this.moveLeft && this.object.translateX(-actualMoveSpeed), this.moveRight && this.object.translateX(actualMoveSpeed), this.moveUp && this.object.translateY(actualMoveSpeed), this.moveDown && this.object.translateY(-actualMoveSpeed);
            var actualLookSpeed = delta * this.lookSpeed;
            this.activeLook || (actualLookSpeed = 0);
            var verticalLookRatio = 1;
            this.constrainVertical && (verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin)), lon -= this.mouseX * actualLookSpeed * .0025 * _dragging, this.lookVertical && (lat -= this.mouseY * actualLookSpeed * verticalLookRatio * .0025 * _dragging), lat = Math.max(-85, Math.min(85, lat));
            var phi = Math.radians(90 - lat),
                theta = Math.degrees(lon);
            this.constrainVertical && (phi = function mapLinear(x, a1, a2, b1, b2) {
                return b1 + (x - a1) * (b2 - b1) / (a2 - a1)
            }(phi, 0, Math.PI, this.verticalMin, this.verticalMax));
            var position = this.object.position;
            targetPosition.setFromSphericalCoords(1, phi, theta).add(position), this.object.lookAt(targetPosition), (this.mouseDragOn || this.moveForward || this.moveLeft || this.moveRight || this.moveBackward) && _tick++ % 20 == 0 && (Storage.set("wasd_lat_lon_" + playground, {
                lat: lat,
                lon: lon
            }), this.onChange())
        }
    }), this.dispose = function() {
        this.domElement.removeEventListener("contextmenu", contextmenu, !1), this.domElement.removeEventListener("mousedown", _onMouseDown, !1), this.domElement.removeEventListener("mousemove", _onMouseMove, !1), this.domElement.removeEventListener("mouseup", _onMouseUp, !1), window.removeEventListener("keydown", _onKeyDown, !1), window.removeEventListener("keyup", _onKeyUp, !1)
    };
    var _onMouseMove = bind(this, this.onMouseMove),
        _onMouseDown = bind(this, this.onMouseDown),
        _onMouseUp = bind(this, this.onMouseUp),
        _onKeyDown = bind(this, this.onKeyDown),
        _onKeyUp = bind(this, this.onKeyUp);

    function bind(scope, fn) {
        return function() {
            fn.apply(scope, arguments)
        }
    }

    function setOrientation(controls) {
        var quaternion = controls.object.quaternion;
        lookDirection.set(0, 0, -1).applyQuaternion(quaternion), spherical.setFromVector3(lookDirection), lat = 90 - Math.degrees(spherical.phi), lon = Math.radians(spherical.theta);
        let data = Storage.get("wasd_lat_lon_" + playground);
        data && (lat = data.lat, lon = data.lon)
    }
    this.domElement.addEventListener("contextmenu", contextmenu, !1), this.domElement.addEventListener("mousemove", _onMouseMove, !1), this.domElement.addEventListener("mousedown", _onMouseDown, !1), this.domElement.addEventListener("mouseup", _onMouseUp, !1), window.addEventListener("keydown", _onKeyDown, !1), window.addEventListener("keyup", _onKeyUp, !1), this.handleResize(), setOrientation(this)
}, Class((function GeomThread() {
    Inherit(this, Component);
    const _this = this;
    var _cache = {},
        _cacheWait = {},
        _receive = {};

    function computeBounding(data) {
        let geom = new Geometry;
        geom.addAttribute("position", new GeometryAttribute(data.position, 3)), geom.computeBoundingBox(), geom.computeBoundingSphere(), data.boundingBox = geom.boundingBox, data.boundingSphere = geom.boundingSphere
    }

    function loadGeometry(e, id) {
        get(e.path).then(data => {
            let buffers = [];
            for (let key in data) Array.isArray(data[key]) ? (data[key] = new Float32Array(data[key]), buffers.push(data[key].buffer)) : data[key].length > 0 && buffers.push(data[key].buffer);
            computeBounding(data), e.custom && self[e.custom](data), resolve(data, id, buffers)
        }).catch(er => {
            e.preloading || console.error(er)
        })
    }

    function loadSkinnedGeometry(e, id) {
        get(e.path).then(data => {
            let buffers = [];
            for (let key in data) "bones" != key && (Array.isArray(data[key]) ? (data[key] = new Float32Array(data[key]), buffers.push(data[key].buffer)) : data[key].length > 0 && buffers.push(data[key].buffer));
            computeBounding(data), e.custom && self[e.custom](data), resolve(data, id, buffers)
        })
    }

    function geom_useFn(e) {
        Global.FNS || (Global.FNS = []), Global.FNS.push(e.name)
    }
    this.caching = !0, async function() {
        await Hydra.ready(), Thread.upload(loadGeometry, loadSkinnedGeometry, geom_useFn, computeBounding)
    }(), this.loadGeometry = function(path, custom, preloading) {
        if (!Device.graphics.gpu) return Promise.resolve(new PlaneGeometry(1, 1));
        if (_cache[path]) return Promise.resolve(_cache[path]);
        if (path.includes("assets/geometry/") || (path = "assets/geometry/" + path), path.includes(".") || (path += ".json"), path = Thread.absolutePath(Assets.getPath(path)), _this.caching) {
            if (_cacheWait[path]) return _cacheWait[path];
            _cacheWait[path] = Promise.create()
        }
        return Thread.shared().loadGeometry({
            path: path,
            custom: custom,
            preloading: preloading
        }).then(data => {
            let geometry;
            if (custom && _receive[custom]) geometry = _receive[custom](data);
            else {
                let geom = new Geometry;
                geom.addAttribute("position", new GeometryAttribute(data.position, 3)), geom.addAttribute("normal", new GeometryAttribute(data.normal || data.position.length, 3)), geom.addAttribute("uv", new GeometryAttribute(data.uv || data.position.length / 3 * 2, 2)), data.uv2 && geom.addAttribute("uv2", new GeometryAttribute(data.uv2, 2)), geom.boundingBox = new Box3((new Vector3).set(data.boundingBox.min.x, data.boundingBox.min.y, data.boundingBox.min.z), (new Vector3).set(data.boundingBox.max.x, data.boundingBox.max.y, data.boundingBox.max.z)), geom.boundingSphere = new Sphere((new Vector3).set(data.boundingSphere.center.x, data.boundingSphere.center.y, data.boundingSphere.center.z), data.boundingSphere.radius), geometry = geom, geom._src = path
            }
            _this.caching && (_cache[path] = geometry), _cacheWait[path].resolve(geometry)
        }), _cacheWait[path]
    }, this.loadSkinnedGeometry = function(path, custom) {
        if (!Device.graphics.webgl) return Promise.resolve(new PlaneGeometry(1, 1));
        if (_cache[path]) return Promise.resolve(_cache[path]);
        if (path.includes("assets/geometry/") || (path = "assets/geometry/" + path), path.includes(".") || (path += ".json"), path = Thread.absolutePath(Assets.getPath(path)), _this.caching) {
            if (_cacheWait[path]) return _cacheWait[path];
            _cacheWait[path] = Promise.create()
        }
        return Thread.shared().loadSkinnedGeometry({
            path: path,
            custom: custom
        }).then(data => {
            let geometry;
            if (custom && _receive[custom]) geometry = _receive[custom](data);
            else {
                let geom = new Geometry;
                geom.addAttribute("position", new GeometryAttribute(data.position, 3)), geom.addAttribute("normal", new GeometryAttribute(data.normal || data.position.length, 3)), geom.addAttribute("uv", new GeometryAttribute(data.uv || data.position.length / 3 * 2, 2)), geom.addAttribute("skinIndex", new GeometryAttribute(data.skinIndex, 4)), geom.addAttribute("skinWeight", new GeometryAttribute(data.skinWeight, 4)), geom.bones = (data.rig ? data.rig.bones : data.bones).slice(0), geom.boundingBox = new Box3((new Vector3).set(data.boundingBox.min.x, data.boundingBox.min.y, data.boundingBox.min.z), (new Vector3).set(data.boundingBox.max.x, data.boundingBox.max.y, data.boundingBox.max.z)), geom.boundingSphere = new Sphere((new Vector3).set(data.boundingSphere.center.x, data.boundingSphere.center.y, data.boundingSphere.center.z), data.boundingSphere.radius), geometry = geom, geom._src = path
            }
            _this.caching && (_cache[path] = geometry), _cacheWait[path].resolve(geometry)
        }), _cacheWait[path]
    }, this.customFunction = function(fn, receive) {
        let name = Thread.upload(fn);
        name = name[0], t.geom_useFn({
            name: name
        }), _receive[name] = receive
    }
}), "static"), Class((function InstanceMesh(_mesh, _shader, _group, _input) {
    Inherit(this, Component);
    const _this = this;
    var _config, _shaderKey;

    function updateShader(shader) {
        shader.customCompile = `${shader.vsName}|${shader.fsName}|instance`, shader.resetProgram();
        let cached = MeshBatch.shaders[`${shader.vsName}|${shader.fsName}`];
        if (cached) return shader.fragmentShader = cached.fragment, void(shader.vertexShader = cached.vertex);
        let vsSplit = shader.vertexShader.split("__ACTIVE_THEORY_LIGHTS__"),
            fsSplit = shader.fragmentShader.split("__ACTIVE_THEORY_LIGHTS__");
        if (!vsSplit[1].includes("vec3 pos = position;")) throw `Shader ${shader.vsName} needs to have "vec3 pos = position;" in order for batching to work`;
        vsSplit[1] = vsSplit[1].replace(/vec3 pos = position;/g, "vec3 pos = transformPosition(position, offset, scale, orientation);"), vsSplit[1] = vsSplit[1].replace(/vNormal = normalMatrix \* normal;/g, "vNormal = normalMatrix * transformNormal(normal, orientation);"), vsSplit[1] = vsSplit[1].replace(/vec3 transformedNormal = normal;/g, "vec3 transformedNormal = transformNormal(normal, orientation);"), vsSplit[0] += "\n", vsSplit[1] += "#define INSTANCED 1", vsSplit[0] += "attribute vec3 offset;\n", vsSplit[0] += "attribute vec3 scale;\n", vsSplit[0] += "attribute vec4 orientation;\n", vsSplit[0] += Shaders.getShader("instance.vs") + "\n", vsSplit = vsSplit.join("__ACTIVE_THEORY_LIGHTS__"), fsSplit = fsSplit.join("__ACTIVE_THEORY_LIGHTS__"), shader.vertexShader = vsSplit, shader.fragmentShader = fsSplit, _shaderKey = `${shader.vsName}|${shader.fsName}`, MeshBatch.shaders[_shaderKey] = {
            fragment: shader.fragmentShader,
            vertex: shader.vertexShader
        }
    }! function() {
        (_config = InputUIL.create("im_" + _input.prefix, _group)).add("json"), _config.setLabel("Instance"), _mesh.visible = !1, _mesh.instanceMeshReady = Promise.create(), _mesh.instanceMeshBeforeReady = Promise.create();
        let json = _config.get("json");
        json && async function createInstanceMesh(json) {
            json.includes("assets/geometry") || (json = "assets/geometry/" + json);
            json.includes(".json") || (json += ".json");
            let geom = (new Geometry).instanceFrom(_mesh.geometry),
                buffers = await Thread.shared().parseInstanceMesh({
                    url: Thread.absolutePath(Assets.getPath(json))
                });
            for (let key in buffers) {
                let b = buffers[key];
                geom.addAttribute(key, new GeometryAttribute(b.buffer, b.components, 1))
            }
            let shader = _mesh.shader;
            updateShader(shader);
            let mesh = new Mesh(geom, shader);
            mesh.renderOrder = _mesh.renderOrder, mesh.castShadow = _mesh.castShadow, mesh.frustumCulled = !1, _mesh._parent.add(mesh), _mesh.instanceMesh = mesh, _mesh.instanceMeshReady.resolve(), _this.startRender(_ => {
                mesh.renderOrder = _mesh.renderOrder, mesh.castShadow = _mesh.castShadow
            }, 10)
        }(json)
    }(), this.applyToShader = function(shader) {
        updateShader(shader)
    }, this.onDestroy = function() {
        _mesh.instanceMesh && _mesh.instanceMesh.destroy(), delete MeshBatch.shaders[_shaderKey]
    }
}), _ => {
    Thread.upload((function parseInstanceMesh({
        url: url
    }, id) {
        get(url).then(data => {
            let buffers = [];
            for (let key in data) data[key].buffer = new Float32Array(data[key].buffer), buffers.push(data[key].buffer.buffer);
            resolve(data, id, buffers)
        })
    }))
}), Class((function MeshBatch(_input, _config) {
    Inherit(this, Object3D);
    const _this = this;
    var _geom, _shader, _mesh, _firstRender, _static, _shaderKey, _renderOrder = 0,
        _objects = [],
        _offset = [],
        _quaternion = [],
        _scale = [],
        _attributes = {},
        _uniformToAttrib = [],
        _frustumCulled = !0,
        _v1 = new Vector3,
        _v2 = new Vector3,
        _q = new Quaternion;
    async function initFromSceneLayout() {
        let wildcard = _input.get("wildcard");
        if (!wildcard || !wildcard.length) return;
        let groupName = wildcard.split("|")[0],
            group = await _this.parent.getLayer(groupName);
        await _this.wait(group.children, "length");
        let children = [...group.children];
        children.sort((a, b) => a.renderOrder - b.renderOrder), children.forEach(mesh => _this.add(mesh)), wildcard.includes("static") && (_this.static = !0), _this.group.renderOrder = children[0].renderOrder, group.add(_this.group)
    }

    function updateShader(shader) {
        shader.customCompile = `${shader.vsName}|${shader.fsName}|instance`;
        let cached = MeshBatch.shaders[`${shader.vsName}|${shader.fsName}`];
        if (cached) return shader.fragmentShader = cached.fragment, shader.vertexShader = cached.vertex, shader.resetProgram();
        shader.resetProgram();
        let vsSplit = shader.vertexShader.split("__ACTIVE_THEORY_LIGHTS__"),
            fsSplit = shader.fragmentShader.split("__ACTIVE_THEORY_LIGHTS__");
        if (!vsSplit[1].includes("vec3 pos = position;") && !shader.vertexShader.includes("vec3 transformPosition")) throw `Shader ${shader.vsName} needs to have "vec3 pos = position;" in order for batching to work`;
        let definitions = [];
        vsSplit[1].split("\n").forEach(line => {
            if (line.includes("uniform")) {
                if (line.includes("sampler2D")) return;
                let data = line.split(" "),
                    uni = data[2].replace(";", "");
                (function uniformToAttrib(key) {
                    for (let i = 0; i < _uniformToAttrib.length; i++) {
                        let val = _uniformToAttrib[i];
                        if (key.includes(val) || val.includes(key)) return !0
                    }
                    return !1
                })(uni) && (definitions.push(`${uni} = a_${data[2]}`), vsSplit[1] = vsSplit[1].replace(line, `attribute ${data[1]} a_${data[2]}\nvarying ${data[1]} ${data[2]}`), fsSplit[1] = fsSplit[1].replace(line, `varying ${data[1]} ${data[2]}`))
            }
        }), vsSplit[1] = vsSplit[1].replace(/vec3 pos = position;/g, "vec3 pos = transformPosition(position, offset, scale, orientation);"), vsSplit[1] = vsSplit[1].replace(/vNormal = normalMatrix \* normal;/g, "vNormal = normalMatrix * transformNormal(normal, orientation);"), vsSplit[1] = vsSplit[1].replace(/vec3 transformedNormal = normal;/g, "vec3 transformedNormal = transformNormal(normal, orientation);");
        let main = vsSplit[1].split("main() {");
        main[1] = "\n" + definitions.join("\n") + main[1], vsSplit[1] = main.join("main() {"), vsSplit[0] += "\n", vsSplit[0] += "attribute vec3 offset;\n", vsSplit[0] += "attribute vec3 scale;\n", vsSplit[0] += "attribute vec4 orientation;\n", shader.vertexShader.includes("vec3 transformPosition") || (vsSplit[0] += Shaders.getShader("instance.vs") + "\n"), vsSplit = vsSplit.join("__ACTIVE_THEORY_LIGHTS__"), fsSplit = fsSplit.join("__ACTIVE_THEORY_LIGHTS__"), shader.vertexShader = vsSplit, shader.fragmentShader = fsSplit, _shaderKey = `${shader.vsName}|${shader.fsName}`, MeshBatch.shaders[_shaderKey] = {
            fragment: shader.fragmentShader,
            vertex: shader.vertexShader
        }
    }

    function modifyGeometry(dir) {
        let count = _geom.attributes.offset.count + dir;
        _offset = new Float32Array(3 * count), _scale = new Float32Array(3 * count), _quaternion = new Float32Array(4 * count), _geom.attributes.offset.setArray(new Float32Array(3 * count)), _geom.attributes.scale.setArray(new Float32Array(3 * count)), _geom.attributes.orientation.setArray(new Float32Array(4 * count));
        for (let key in _attributes) {
            let components = _geom.attributes[key].itemSize;
            _attributes[key] = new Float32Array(count * components), _geom.attributes[key].setArray(new Float32Array(count * components))
        }
        _geom.maxInstancedCount = _objects.length, loop()
    }

    function dirty(a, b) {
        for (let i = a.length - 1; i > -1; i--)
            if (a[i] != b[i]) return !0;
        return !1
    }

    function loop() {
        _static && _this.stopRender(loop);
        let first = !_firstRender;
        _firstRender = !0;
        for (let i = 0; i < _objects.length; i++) {
            let mesh = _objects[i];
            first && mesh.updateMatrixWorld(!0);
            let pos = _v1,
                scale = _v2,
                quaternion = _q;
            if (_config.worldCoords) try {
                if (_config.parent > 0) switch (_config.parent) {
                    case 1:
                        pos.copy(mesh._parent.position), scale.copy(mesh._parent.scale), quaternion.copy(mesh._parent.quaternion);
                        break;
                    case 2:
                        pos.copy(mesh._parent._parent.position), scale.copy(mesh._parent._parent.scale), quaternion.copy(mesh._parent._parent.quaternion)
                } else pos.copy(mesh.getWorldPosition()), scale.copy(mesh.getWorldScale()), quaternion.copy(mesh.getWorldQuaternion());
                mesh.determineVisible() || (scale.x = scale.y = scale.z = 0)
            } catch (e) {
                pos.copy(mesh.position), scale.copy(mesh.scale), quaternion.copy(mesh.quaternion)
            } else pos.copy(mesh.position), scale.copy(mesh.scale), quaternion.copy(mesh.quaternion);
            let i3 = 3 * i,
                i4 = 4 * i;
            if (_offset[i3 + 0] = pos.x, _offset[i3 + 1] = pos.y, _offset[i3 + 2] = pos.z, _scale[i3 + 0] = scale.x, _scale[i3 + 1] = scale.y, _scale[i3 + 2] = scale.z, _quaternion[i4 + 0] = quaternion.x, _quaternion[i4 + 1] = quaternion.y, _quaternion[i4 + 2] = quaternion.z, _quaternion[i4 + 3] = quaternion.w, mesh.attributes)
                for (let key in mesh.attributes) {
                    let attr = mesh.attributes[key],
                        value = attr.value || attr;
                    value instanceof Color ? (_attributes[key][3 * i + 0] = value.r, _attributes[key][3 * i + 1] = value.g, _attributes[key][3 * i + 2] = value.b) : value instanceof Vector3 ? (_attributes[key][3 * i + 0] = value.x, _attributes[key][3 * i + 1] = value.y, _attributes[key][3 * i + 2] = value.z) : value instanceof Vector4 || value instanceof Quaternion ? (_attributes[key][4 * i + 0] = value.x, _attributes[key][4 * i + 1] = value.y, _attributes[key][4 * i + 2] = value.z, _attributes[key][4 * i + 3] = value.w) : value instanceof Vector2 ? (_attributes[key][2 * i + 0] = value.x, _attributes[key][2 * i + 1] = value.y) : _attributes[key][i] = value
                }
        }
        if (_mesh) {
            dirty(_quaternion, _geom.attributes.orientation.array) && (_geom.attributes.orientation.array.set(_quaternion), _geom.attributes.orientation.needsUpdate = !0), dirty(_offset, _geom.attributes.offset.array) && (_geom.attributes.offset.array.set(_offset), _geom.attributes.offset.needsUpdate = !0), dirty(_scale, _geom.attributes.scale.array) && (_geom.attributes.scale.array.set(_scale), _geom.attributes.scale.needsUpdate = !0);
            for (let key in _attributes) dirty(_attributes[key], _geom.attributes[key].array) && (_geom.attributes[key].array.set(_attributes[key]), _geom.attributes[key].needsUpdate = !0)
        } else ! function initMesh() {
            if (_geom.addAttribute("offset", new GeometryAttribute(new Float32Array(_offset), 3, 1)), _geom.addAttribute("scale", new GeometryAttribute(new Float32Array(_scale), 3, 1)), _geom.addAttribute("orientation", new GeometryAttribute(new Float32Array(_quaternion), 4, 1)), _frustumCulled) {
                let box = new Box3;
                _objects.forEach(mesh => box.expandByObject(mesh, !0)), _geom.boundingBox = box, _geom.boundingSphere = box.getBoundingSphere()
            }(_mesh = new Mesh(_geom, _shader)).asyncPromise = Promise.resolve(), _this.mesh = _mesh, _this.mesh.isMeshBatch = !0, _this.group.add(_mesh), _mesh.frustumCulled = _frustumCulled, _renderOrder && (_mesh.renderOrder = _renderOrder), _offset = new Float32Array(_offset), _quaternion = new Float32Array(_quaternion), _scale = new Float32Array(_scale);
            for (let key in _attributes) {
                _attributes[key] = new Float32Array(_attributes[key]);
                let components = 1,
                    attr = _objects[0].attributes[key],
                    value = attr.value || attr;
                value instanceof Vector3 ? components = 3 : value instanceof Vector4 || value instanceof Quaternion ? components = 4 : value instanceof Color ? components = 3 : value instanceof Vector2 && (components = 2), _geom.addAttribute(key, new GeometryAttribute(new Float32Array(_attributes[key]), components, 1))
            }
            _this.onMeshCreated && _this.onMeshCreated(_mesh)
        }()
    }
    _input instanceof InputUILConfig || (_config = _input, _input = null), _config = _config || {}, _input && _this.parent.ready(!0).then(initFromSceneLayout), Utils3D.getTestShader().visible = !1, this.add = function(mesh) {
        _objects.push(mesh), mesh.uploadIgnore = !0;
        let shader = mesh.shader;
        for (let key in shader.uniforms) {
            let uniform = shader.uniforms[key];
            (uniform.value instanceof Color || uniform.value instanceof Vector2 || uniform.value instanceof Vector3 || uniform.value instanceof Vector4 || uniform.value instanceof Quaternion || "number" == typeof uniform.value) && (uniform.batchUnique || _config.batchUnique) && (_uniformToAttrib.push(key), mesh.attributes || (mesh.attributes = {}), mesh.attributes["a_" + key] = uniform)
        }
        _geom || function initGeometry(mesh) {
            if (_geom = (new Geometry).instanceFrom(mesh.geometry), _this.geom = _geom, _shader || updateShader(_shader = mesh.shader.clone()), mesh.attributes)
                for (let key in mesh.attributes) _attributes[key] = []
        }(mesh), _mesh && modifyGeometry(1), mesh.shader.neverRender = !0, _this.startRender(loop, World.NUKE)
    }, this.remove = function(mesh) {
        _objects.remove(mesh), modifyGeometry(-1)
    }, this.onDestroy = function() {
        _this.mesh.destroy(), delete MeshBatch.shaders[_shaderKey]
    }, this.set("static", b => {
        _objects.length ? (loop(), _this.stopRender(loop, World.NUKE)) : _static = !0
    }), this.set("renderOrder", v => {
        _renderOrder = v, _mesh && (_mesh.renderOrder = v)
    }), this.get("renderOrder", _ => _renderOrder), this.set("frustumCulled", b => {
        _frustumCulled = b, _mesh && (_mesh.frustumCulled = b)
    })
}), _ => {
    MeshBatch.shaders = {}
}), Class((function MeshMerge(_input) {
    Inherit(this, Object3D);
    const _this = this;
    var _mesh, _geom, _pending = [];
    async function initFromSceneLayout() {
        let wildcard = _input.get("wildcard");
        if (!wildcard || !wildcard.length) return;
        let groupName = wildcard.split("|")[0];
        await _this.parent.loadedAllLayers();
        let group = await _this.parent.getLayer(groupName),
            children = [...group.children];
        children.sort((a, b) => a.renderOrder - b.renderOrder), children.forEach(mesh => _this.add(mesh)), group.add(_this.group)
    }
    "object" == typeof _input && _this.parent.ready().then(initFromSceneLayout), this.add = function(mesh) {
        if (mesh.uploadIgnore = !0, !mesh.visible) return;
        mesh.updateMatrixWorld(!0), _mesh || async function initMesh(mesh) {
            (_mesh = new Mesh(World.QUAD, mesh.shader)).asyncPromise = Promise.create(), _this.group.add(_mesh), await defer(), (await Promise.all(_pending)).forEach(data => {
                let geom = new Geometry;
                for (let key in data) "components" != key && geom.addAttribute(key, new GeometryAttribute(data[key], data.components[key]));
                _geom ? _geom.merge(geom) : _geom = geom
            }), _mesh.geometry = _geom, _mesh.asyncPromise.resolve(), _this.onMeshCreated && _this.onMeshCreated(_mesh)
        }(mesh);
        let geom = mesh.geometry;
        if (mesh.attributes)
            for (let key in mesh.attributes) {
                let attr = mesh.attributes[key];
                attr instanceof Vector4 && (attr.isVector4 = !0), attr instanceof Vector3 && (attr.isVector3 = !0), attr instanceof Vector2 && (attr.isVector2 = !0), attr instanceof Color && (attr.isColor = !0)
            }
        let data = {},
            components = {},
            buffers = [];
        for (let key in geom.attributes) data[key] = new Float32Array(geom.attributes[key].array), buffers.push(data[key].buffer), components[key] = geom.attributes[key].itemSize;
        data.attributes = mesh.attributes, data.components = components, data.matrix = "world" == _input ? mesh.matrixWorld.elements : mesh.matrix.elements, mesh.visible = !1, _pending.push(Thread.shared().meshMergeTransform(data, buffers))
    }
}), _ => {
    Thread.upload((function meshMergeTransform(e, id) {
        let geom = new Geometry;
        for (let key in e) !key.includes(["components", "matrix"]) && e[key] instanceof Float32Array && geom.addAttribute(key, new GeometryAttribute(e[key], e.components[key]));
        if (e.attributes)
            for (let key in e.attributes) {
                let components = 1,
                    attr = e.attributes[key];
                attr.isVector4 ? components = 4 : attr.isVector3 || attr.isColor ? components = 3 : attr.isVector2 && (components = 2);
                let buffer = new Float32Array(geom.attributes.position.count * components),
                    step = buffer.length / components;
                for (let i = 0; i < step; i++) 4 == components ? (buffer[3 * i + 0] = attr.x, buffer[3 * i + 1] = attr.y, buffer[3 * i + 2] = attr.z, buffer[3 * i + 3] = attr.w) : 3 == components ? (buffer[3 * i + 0] = attr.x || attr.r || 0, buffer[3 * i + 1] = attr.y || attr.g || 0, buffer[3 * i + 2] = attr.z || attr.b || 0) : 2 == components ? (buffer[2 * i + 0] = attr.x, buffer[2 * i + 1] = attr.y) : buffer[i] = attr;
                geom.addAttribute(key, new GeometryAttribute(buffer, components))
            }
        geom.applyMatrix((new Matrix4).fromArray(e.matrix));
        let data = {},
            buffers = [],
            components = {};
        for (let key in geom.attributes) data[key] = geom.attributes[key].array, components[key] = geom.attributes[key].itemSize, buffers.push(data[key].buffer);
        data.components = components, resolve(data, id, buffers)
    }))
}), Class((function RenderCount() {
    const _this = this;
    var $container, LOG, _map = {},
        _display = {};
    !async function() {
        await Hydra.ready(), _this.active = Utils.query("renderCount"), LOG = _this.active && Utils.query("log"), _this.active && async function initUIL() {
            await Hydra.ready(), ($container = Stage.create("RenderCount")).css({
                width: 150,
                height: "auto",
                paddingBottom: 5,
                bottom: 0
            }).bg("#111").setZ(9999999)
        }()
    }(), this.add = function(name, detail, amt = 1) {
        if (_this.active) {
            if (void 0 === _map[name] && (_map[name] = 0, $container)) {
                let $wrapper = $container.create("wrapper");
                $wrapper.css({
                    position: "relative",
                    width: "100%",
                    height: 20
                }), $wrapper.label = $wrapper.create("label"), $wrapper.label.fontStyle("Arial", 12, "#fff").text(name).css({
                    left: 10
                }), $wrapper.value = $wrapper.create("value"), $wrapper.value.fontStyle("Arial", 12, "#fff").text(0).css({
                    right: 10
                }), _display[name] = $wrapper
            }
            LOG && (console.groupCollapsed(name), detail && console.log(detail), console.trace(), console.groupEnd()), _map[name] += amt, _display[name].value.text(_map[name] || "0")
        }
    }, this.remove = function(name, amt = 1) {
        _this.active && _map[name] && (_map[name] -= amt, _display[name].value.text(_map[name] || "0"))
    }
}), "static"), Class((function RenderStats() {
    const _this = this;
    var _trace, _filter, $container, _map = {},
        _stats = {},
        _display = {};

    function flush() {
        for (let key in _map) _stats[key] = _map[key], _display[key] && _display[key].value.text(_map[key] || "0"), _map[key] = 0;
        _trace = null
    }!async function() {
        await Hydra.ready(), _this.active = Utils.query("renderStats"), Utils.query("renderStats") && async function initUIL() {
            await Hydra.ready(), ($container = Stage.create("RenderStats")).css({
                position: "fixed",
                width: 150,
                height: "auto",
                paddingTop: 5
            }).bg("#111").setZ(99999)
        }(), Render.drawFrame = flush
    }(), this.update = function(name, amt = 1, detail, detail2) {
        if (_trace == name) {
            if (_filter && detail) {
                if (!("string" == typeof detail ? detail : Utils.getConstructorName(detail)).toLowerCase().includes(_filter.toLowerCase())) return
            }
            console.groupCollapsed(name), detail && console.log("string" == typeof detail ? detail : Utils.getConstructorName(detail)), detail2 && console.log(detail2), console.trace(), console.groupEnd()
        }
        if (void 0 === _map[name] && (_map[name] = 0, $container)) {
            let $wrapper = $container.create("wrapper");
            $wrapper.css({
                position: "relative",
                width: "100%",
                height: 20
            }), $wrapper.label = $wrapper.create("label"), $wrapper.label.fontStyle("Arial", 12, "#fff").text(name).css({
                left: 10
            }), $wrapper.value = $wrapper.create("value"), $wrapper.value.fontStyle("Arial", 12, "#fff").text(0).css({
                right: 10
            }), _display[name] = $wrapper
        }
        _map[name] += amt
    }, this.trace = function(name, filter = null) {
        _trace = name, _filter = filter
    }, this.log = function() {
        for (let key in _stats) console.log(key, _stats[key]);
        console.log("----")
    }
}), "static"), Class((function Fluid(_simSize = 128, _dyeSize = 512, _rect = Stage) {
    Inherit(this, Component);
    const _this = this;
    var _fbos = {},
        _scenes = {},
        _tmpVec = new Vector2,
        _lastSplat = Render.TIME;
    const DYE_WIDTH = _dyeSize,
        DYE_HEIGHT = _dyeSize,
        SIM_WIDTH = _simSize,
        SIM_HEIGHT = _simSize,
        config = {
            DENSITY_DISSIPATION: .97,
            VELOCITY_DISSIPATION: .98,
            PRESSURE_DISSIPATION: .8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            DEBUG_MOUSE: !0,
            SPLAT_RADIUS: .25
        };

    function loop() {
        config.DEBUG_MOUSE && function drawMouse() {
            _this.drawInput(Mouse.x, Mouse.y, 10 * Mouse.delta.x, 10 * Mouse.delta.y, new Color("#777777"))
        }(), _scenes.curl.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.curl.render(_fbos.curl.fbo), _scenes.vorticity.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.vorticity.uniforms.uCurl.value = _fbos.curl.fbo, _scenes.vorticity.uniforms.curl.value = config.CURL, _scenes.vorticity.render(_fbos.velocity.write), _fbos.velocity.swap(), _scenes.divergence.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.divergence.render(_fbos.divergence.fbo), _scenes.clear.uniforms.uTexture.value = _fbos.pressure.read, _scenes.clear.uniforms.value.value = config.PRESSURE_DISSIPATION, _scenes.clear.render(_fbos.pressure.write), _fbos.pressure.swap(), _scenes.pressure.uniforms.uDivergence.value = _fbos.divergence.fbo;
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) _scenes.pressure.uniforms.uPressure.value = _fbos.pressure.read, _scenes.pressure.render(_fbos.pressure.write), _fbos.pressure.swap();
        _scenes.gradientSubtract.uniforms.uPressure.value = _fbos.pressure.read, _scenes.gradientSubtract.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.gradientSubtract.render(_fbos.velocity.write), _fbos.velocity.swap(), _scenes.advection.uniforms.texelSize.value.set(1 / SIM_WIDTH, 1 / SIM_HEIGHT), _scenes.advection.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.advection.uniforms.uSource.value = _fbos.velocity.read, _scenes.advection.uniforms.dissipation.value = config.VELOCITY_DISSIPATION, _scenes.advection.render(_fbos.velocity.write), _fbos.velocity.swap(), _scenes.advection.uniforms.texelSize.value.set(1 / DYE_WIDTH, 1 / DYE_HEIGHT), _scenes.advection.uniforms.uVelocity.value = _fbos.velocity.read, _scenes.advection.uniforms.uSource.value = _fbos.density.read, _scenes.advection.uniforms.dissipation.value = config.DENSITY_DISSIPATION, _scenes.advection.render(_fbos.density.write), _fbos.density.swap(), _scenes.display.uniforms.uTexture.value = _fbos.density.read, _scenes.display.uniforms.texelSize.value.set(1 / _rect.width, 1 / _rect.height), _scenes.display.render(_this.rt)
    }
    this.rt = Utils3D.createRT(_rect.width, _rect.height), this.fbos = _fbos, this.additiveBlending = !0, _this.rt.disableDepth = !0,
        function initFBOs() {
            _fbos.density = _this.initClass(FluidFBO, DYE_WIDTH, DYE_HEIGHT, Texture.LINEAR), _fbos.velocity = _this.initClass(FluidFBO, SIM_WIDTH, SIM_HEIGHT, Texture.LINEAR), _fbos.divergence = _this.initClass(FluidFBO, SIM_WIDTH, SIM_HEIGHT, Texture.NEAREST), _fbos.curl = _this.initClass(FluidFBO, SIM_WIDTH, SIM_HEIGHT, Texture.NEAREST), _fbos.pressure = _this.initClass(FluidFBO, SIM_WIDTH, SIM_HEIGHT, Texture.NEAREST)
        }(),
        function initScenes() {
            _scenes.curl = _this.initClass(FluidScene, "fluidBase", "curlShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uVelocity: {
                    value: null
                },
                depthWrite: !1
            }), _scenes.vorticity = _this.initClass(FluidScene, "fluidBase", "vorticityShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uVelocity: {
                    value: null
                },
                uCurl: {
                    value: null
                },
                curl: {
                    value: config.CURL
                },
                dt: {
                    value: .016
                }
            }), _scenes.divergence = _this.initClass(FluidScene, "fluidBase", "divergenceShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uVelocity: {
                    value: null
                }
            }), _scenes.clear = _this.initClass(FluidScene, "fluidBase", "clearShader", {
                uTexture: {
                    value: null
                },
                value: {
                    value: config.PRESSURE_DISSIPATION
                }
            }), _scenes.pressure = _this.initClass(FluidScene, "fluidBase", "pressureShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uPressure: {
                    value: null
                },
                uDivergence: {
                    value: null
                }
            }), _scenes.gradientSubtract = _this.initClass(FluidScene, "fluidBase", "gradientSubtractShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uPressure: {
                    value: null
                },
                uVelocity: {
                    value: null
                }
            }), _scenes.advection = _this.initClass(FluidScene, "fluidBase", "advectionShader", {
                texelSize: {
                    value: new Vector2(1 / SIM_WIDTH, 1 / SIM_HEIGHT)
                },
                uVelocity: {
                    value: null
                },
                uSource: {
                    value: null
                },
                dt: {
                    value: .016
                },
                dissipation: {
                    value: config.VELOCITY_DISSIPATION
                }
            }), _scenes.display = _this.initClass(FluidScene, "fluidBase", "displayShader", {
                texelSize: {
                    value: new Vector2(1 / _rect.width, 1 / _rect.height)
                },
                uTexture: {
                    value: null
                }
            }), _scenes.splat = _this.initClass(FluidScene, "fluidBase", "splatShader", {
                uTarget: {
                    value: null
                },
                aspectRatio: {
                    value: _rect.width / _rect.height
                },
                point: {
                    value: new Vector2
                },
                prevPoint: {
                    value: new Vector2
                },
                color: {
                    value: new Vector3
                },
                bgColor: {
                    value: new Color("#000000")
                },
                radius: {
                    value: config.SPLAT_RADIUS / 100
                },
                canRender: {
                    value: 0
                },
                uAdd: {
                    value: 1
                }
            })
        }(), _this.startRender(loop), this.updateConfig = function(key, value) {
            config[key] = value
        }, this.drawInput = function(x, y, dx, dy, color, radius = config.SPLAT_RADIUS) {
            _scenes.splat.uniforms.uTarget.value = _fbos.velocity.read, _scenes.splat.uniforms.radius.value = radius / 200, _scenes.splat.uniforms.aspectRatio.value = _rect.width / _rect.height, _tmpVec.set(x / _rect.width, 1 - y / _rect.height);
            let now = Render.TIME,
                delta = now - _lastSplat;
            _lastSplat = now, delta > 50 ? _scenes.splat.uniforms.prevPoint.value.copy(_tmpVec) : _scenes.splat.uniforms.prevPoint.value.copy(_scenes.splat.uniforms.point.value), _scenes.splat.uniforms.point.value.copy(_tmpVec), _scenes.splat.uniforms.color.value.set(dx, -dy, 1), _scenes.splat.uniforms.uAdd.value = 1, _scenes.splat.render(_fbos.velocity.write), _fbos.velocity.swap(), _scenes.splat.uniforms.uTarget.value = _fbos.density.read, _scenes.splat.uniforms.color.value.set(color.r, color.g, color.b), _scenes.splat.uniforms.uAdd.value = _this.additiveBlending ? 1 : 0, _scenes.splat.render(_fbos.density.write, !0), _fbos.density.swap(), _scenes.splat.uniforms.canRender.value = 1
        }
})), Class((function FluidFBO(_width, _height, _filter) {
    Inherit(this, Component);
    const _this = this,
        type = Device.mobile || Renderer.type != Renderer.WEBGL1 ? Texture.HALF_FLOAT : Texture.FLOAT;
    var _fbo1 = new RenderTarget(_width, _height, {
            minFilter: _filter,
            magFilter: _filter,
            format: Texture.RGBAFormat,
            type: type
        }),
        _fbo2 = new RenderTarget(_width, _height, {
            minFilter: _filter,
            magFilter: _filter,
            format: Texture.RGBAFormat,
            type: type
        });
    this.fbo = _fbo1, this.uniform = {
        value: _fbo1
    }, _fbo1.disableDepth = !0, _fbo2.disableDepth = !0, _fbo1.generateMipmaps = !1, _fbo2.generateMipmaps = !1, this.swap = function() {
        let temp = _fbo1;
        _fbo1 = _fbo2, _fbo2 = temp, _this.uniform.value = _fbo1
    }, this.get("read", _ => _fbo1), this.get("write", _ => _fbo2)
})), Class((function FluidLayer(_input, _group) {
    Inherit(this, Object3D);
    var _fluid, _config, _this = this;
    ! function initConfig() {
        (_config = InputUIL.create(_input.prefix + "fluid", _group)).setLabel("Fluid Config"), _config.add("dyeSize", 512), _config.add("simSize", 128), _config.add("velocity", .98), _config.add("density", .97), _config.add("pressure", .8), _config.add("iterations", 20), _config.add("curl", 30), _config.add("defaultRadius", 25), _config.addToggle("debugMouse", !1)
    }(),
    function initFluid() {
        let rect = Stage,
            wildcard = _input.get("wildcard");
        if (wildcard && wildcard.includes("x")) {
            let split = wildcard.split("x");
            rect = {
                width: Number(split[0]),
                height: Number(split[1])
            }
        }
        _fluid = _this.initClass(Fluid, _config.getNumber("simSize"), _config.getNumber("dyeSize"), rect), _this.rt = _fluid.rt, _this.fbos = _fluid.fbos, _config.onUpdate = key => {
            switch (key) {
                case "velocity":
                    _fluid.updateConfig("VELOCITY_DISSIPATION", _config.getNumber(key));
                    break;
                case "density":
                    _fluid.updateConfig("DENSITY_DISSIPATION", _config.getNumber(key));
                    break;
                case "pressure":
                    _fluid.updateConfig("PRESSURE_DISSIPATION", _config.getNumber(key));
                    break;
                case "iterations":
                    _fluid.updateConfig("PRESSURE_ITERATIONS", _config.getNumber(key));
                    break;
                case "curl":
                    _fluid.updateConfig("CURL", _config.getNumber(key));
                    break;
                case "defaultRadius":
                    _fluid.updateConfig("SPLAT_RADIUS", _config.getNumber(key));
                    break;
                case "debugMouse":
                    _fluid.updateConfig("DEBUG_MOUSE", _config.get(key))
            }
        }, ["velocity", "density", "pressure", "iterations", "curl", "defaultRadius", "debugMouse"].forEach(_config.onUpdate)
    }(),
    function initMesh() {
        let shader = _this.initClass(Shader, "ScreenQuad", {
                tMap: {
                    value: _fluid.rt
                }
            }),
            mesh = new Mesh(World.QUAD, shader);
        _this.add(mesh), _this.mesh = mesh
    }(), this.drawInput = _fluid.drawInput, this.set("additiveBlending", v => _fluid.additiveBlending = v)
})), Class((function FluidScene(_vs, _fs, _uniforms) {
    Inherit(this, Component);
    const _this = this;
    var _scene = new Scene;
    ! function() {
        _uniforms.depthWrite = !1;
        let shader = _this.initClass(Shader, _vs, _fs, _uniforms),
            mesh = new Mesh(World.QUAD, shader);
        shader.depthWrite = !1, mesh.noMatrices = !0, _scene.add(mesh), _this.uniforms = shader.uniforms
    }(), this.render = function(rt) {
        World.RENDERER.autoClear = !1, World.RENDERER.renderSingle(_scene.children[0], World.CAMERA, rt), World.RENDERER.autoClear = !0
    }
})), Class((function Fullscreen() {
    Inherit(this, Events);
    const _this = this;

    function update() {
        const isOpen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        isOpen !== _this.isOpen && (_this.isOpen = isOpen, _this.events.fire(Events.FULLSCREEN, {
            fullscreen: _this.isOpen
        }))
    }
    this.isOpen = !1,
        function addHandlers() {
            ["onfullscreenchange", "onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange", "onfullscreenerror", "onwebkitfullscreenerror", "onmozfullscreenerror", "onmsfullscreenerror"].forEach(evt => {
                void 0 !== document[evt] && (document[evt] = update)
            })
        }(), this.open = function(element) {
            element = element || document.body, ["requestFullscreen", "webkitRequestFullscreen", "mozRequestFullScreen", "msRequestFullscreen"].every(method => {
                if (void 0 === element[method]) return !0;
                element[method]()
            })
        }, this.close = function() {
            ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"].every(method => {
                if (void 0 === document[method]) return !0;
                document[method]()
            })
        }
}), "static"), Class((function FXAA() {
    Inherit(this, NukePass);
    this.uniforms = {}, this.init("FXAA", "FXAA")
})), Interaction.Class((function Renderer(_object) {
    var _hydraObject = _object instanceof HydraObject;
    this.needsUpdate = !!_hydraObject, _hydraObject && (_object.x = _object.x || 0, _object.y = _object.y || 0, _object.z = _object.z || 0, _object.pos = {
        x: 0,
        y: 0,
        z: 0
    }), this.update = function() {
        _object.transform()
    }
})), Interaction.Class((function Slider(_object, _direction, _config) {
    Inherit(this, Component);
    var _input, _values, _renderer, _side, _delta, _addInput, _axis, _views, _dragging, _lockMove, _cacheStart, _this = this,
        _holdOffset = 0;

    function getFullElapsed() {
        if (!_this.preventVisible && (_this.elapsed = Math.abs(_object.x) / Math.abs(-_this[_side] * (_this.maxSlides - 1)), _views))
            for (var i = 0; i < _views.length; i++) {
                var view = _views[i],
                    pos = _this[_side] * i,
                    offset = (_object[_axis] + pos) / _this[_side];
                view.sliderOffset = offset, view.updatePosition && view.updatePosition(offset, _dragging)
            }
    }

    function copyFromTo(o1, o2) {
        void 0 !== o1.x && (o2.x = o1.x), void 0 !== o1.y && (o2.y = o1.y), void 0 !== o1.z && (o2.z = o1.z)
    }

    function tweenObj(_to) {
        var css = _this.cssTransitions;
        if (_this.needsRender = !0, copyFromTo(_object, _values), tween(_values, _to, _this.easeTime, _this.ease).onUpdate(() => {
                copyFromTo(_values, css ? _object.pos : _object), !css && _this.autoRender && _renderer.needsUpdate && _renderer.update(), getFullElapsed(), _this.onUpdate && _this.onUpdate(_this.elapsed)
            }).onComplete(_ => _this.needsRender = !1), css) {
            var cssTo = {};
            cssTo[_axis] = _to[_axis], _object.tween(cssTo, _this.easeTime, _this.ease)
        }
    }

    function incSlide() {
        _this.currentSlide++, _this.repeatable && _this.currentSlide > _this.maxSlides - 1 && (_this.currentSlide = 0), !_this.infinite && _this.currentSlide > _this.maxSlides - 1 && (_this.currentSlide = _this.maxSlides - 1), onUpdateSlide(_this.currentSlide)
    }

    function decSlide() {
        _this.currentSlide--, _this.repeatable && _this.currentSlide < 0 && (_this.currentSlide = _this.maxSlides - 1), !_this.infinite && _this.currentSlide < 0 && (_this.currentSlide = 0), onUpdateSlide(_this.currentSlide)
    }

    function onUpdateSlide(slide) {
        _this.events.fire(Interaction.Slider.UPDATE, {
            slide: slide
        })
    }

    function inputUpdate(e, delta = _input.move, override) {
        !Device.mobile && !_this.desktopDrag || !_dragging && !override || _this.preventMovement || _this.preventVisible || (_object[_axis] = -_this[_side] * _this.currentSlide + delta[_axis] * _this.multiplier + _holdOffset, !_this.infinite && function outOfBounds() {
            return _object[_axis] > 0 || _this.currentSlide == _this.maxSlides - 1 && _object[_axis] < -_this[_side] * _this.currentSlide
        }() && function clampWithFriction() {
            var val = _object[_axis],
                max = -_this[_side] * _this.currentSlide;
            val > 0 ? _object[_axis] = val * _this.friction : val < max && (_object[_axis] = max + (val - max) * _this.friction)
        }(), getFullElapsed(), _this.cssTransitions && _object.stopTween(), e.elapsed = _this.elapsed, _this.events.fire(Interaction.MOVE, e, !0), _this.autoRender && _renderer.needsUpdate && (_object.pos[_axis] = _object[_axis], _renderer.update()), _delta = delta)
    }

    function lockStart(e) {
        _cacheStart = e
    }

    function lockMove(e) {
        Math.abs(_input.move[_axis]) > _lockMove && !_this.flag("overrideLock") && !_this.flag("preventMove") && (inputStart(_cacheStart), _this.flag("overrideLock", !0), _this.events.fire(Interaction.Slider.OVERRIDE_LOCK, {
            action: "start"
        })), Math.abs(_input.move["x" == _axis ? "y" : "x"]) > _lockMove && _this.flag("preventMove", !0)
    }

    function lockEnd(e) {
        _cacheStart = null, _this.flag("overrideLock") && _this.events.fire(Interaction.Slider.OVERRIDE_LOCK, {
            action: "end"
        }), _this.flag("overrideLock", !1), _this.flag("preventMove", !1)
    }

    function inputStart(e) {
        !Device.mobile && !_this.desktopDrag || "hit" == e.target.className && 1 != _config.allowHit || _this.preventMovement || _this.preventVisible || (_dragging = !0, clearTween(_values), _holdOffset = _values[_axis] + _this[_side] * _this.currentSlide || 0, Date.now(), _delta = 0, _this.needsRender = !0, _this.events.fire(Interaction.Slider.START_INTERACTION, null, !0))
    }

    function inputEnd(e, override) {
        if ((Device.mobile || _this.desktopDrag) && (_dragging || override) && !_this.preventMovement && !_this.preventVisible) {
            var target = {},
                elapsed = function getElapsed() {
                    if (_delta) return -_delta[_axis] / _this[_side]
                }(),
                velocity = _input.velocity[_axis] * Math.sign(_input.delta[_axis]);
            Date.now();
            if (Math.abs(velocity) > .1 || override) {
                (override || velocity) > 0 ? decSlide() : incSlide()
            } else velocity < 0 ? elapsed > _this.snapPoint && incSlide() : velocity > 0 && Math.abs(elapsed) > _this.snapPoint && decSlide();
            target[_axis] = -_this[_side] * _this.currentSlide, _dragging = !1, tweenObj(target), _this.events.fire(Interaction.Slider.END_INTERACTION, null, !0)
        }
    }
    this.autoRender = !0, this.currentSlide = 0, this.maxSlides = _config.slides, this.width = _config.width, this.height = _config.height, this.snapPoint = .3, this.ease = "easeOutCubic", this.easeTime = 500, this.friction = .3, this.infinite = !1, this.desktopDrag = "boolean" != typeof _config.desktopDrag || _config.desktopDrag, this.preventMovement = !1, this.cssTransitions = !1, this.multiplier = 1, this.elapsed = 0,
        function initHelpers() {
            _input = _this.initClass(Interaction, _config.hit || _object), _this.events.sub(_input, Interaction.MOVE, inputUpdate), _this.events.sub(_input, Interaction.START, inputStart), _this.events.sub(_input, Interaction.END, inputEnd), _this.input = _input, _values = {}, _renderer = _this.initClass(Interaction.Renderer, _object)
        }(),
        function initDirection() {
            _side = _direction.x ? "width" : "height", _axis = _direction.x ? "x" : "y"
        }(), _this.startRender(_ => {}), this.set("views", (function(v) {
            _views = v, _this.delayedCall(getFullElapsed, 50)
        })), this.set("lockMove", (function(v) {
            _lockMove = v
        })), this.lockDirection = function(move = 50) {
            _lockMove = move, _this.events.unsub(_input, Interaction.START, inputStart), _this.events.sub(_input, Interaction.START, lockStart), _this.events.sub(_input, Interaction.MOVE, lockMove), _this.events.sub(_input, Interaction.END, lockEnd)
        }, this.moveTo = function(slide) {
            _this.infinite || (slide < 0 && (slide = 0), slide >= _this.maxSlides && (slide = _this.maxSlides - 1)), _this.currentSlide = slide;
            var target = {};
            target[_axis] = -_this[_side] * _this.currentSlide, tweenObj(target), onUpdateSlide(_this.currentSlide)
        }, this.jumpTo = function(slide) {
            _this.infinite || (slide < 0 && (slide = 0), slide >= _this.maxSlides && (slide = _this.maxSlides - 1)), _this.currentSlide = slide, _values[_axis] = -_this[_side] * _this.currentSlide, copyFromTo(_values, _object), _this.autoRender && _renderer.needsUpdate && (_object.pos[_axis] = _object[_axis], _renderer.update()), getFullElapsed(), onUpdateSlide(_this.currentSlide)
        }, this.next = function() {
            incSlide();
            var target = {};
            target[_axis] = -_this[_side] * _this.currentSlide, tweenObj(target)
        }, this.prev = function() {
            decSlide();
            var target = {};
            target[_axis] = -_this[_side] * _this.currentSlide, tweenObj(target)
        }, this.clearTween = function() {
            clearTween(_values)
        }, this.onInvisible = function() {
            _this.preventVisible = !0
        }, this.onVisible = function() {
            _this.preventVisible = !1
        }, this.addInput = function(x = 0, y = 0) {
            if (!_this.flag("preventInput") && (_addInput || ((_addInput = {}).delta = {}), _addInput.delta.x = x, _addInput.delta.y = y, _addInput.total || (_addInput.total = 0), inputUpdate(_addInput, _addInput.delta, !0), Math.abs(_object[_axis]) > .2 * Math.abs(_this[_side]))) {
                let val = Math.abs(y) > Math.abs(x) ? y : x;
                _this.moveTo(_this.currentSlide + Math.sign(val)), _this.flag("preventInput", !0, _this.easeTime)
            }
        }
}), _ => {
    Interaction.Slider.OVERRIDE_LOCK = "slider_override_lock", Interaction.Slider.UPDATE = "slider_update", Interaction.Slider.START_INTERACTION = "slider_start_interaction", Interaction.Slider.END_INTERACTION = "slider_end_interaction"
}), Class((function GLText({
    font: font,
    italic: italic = !1,
    bold: bold = !1,
    text: text,
    width: width = 1 / 0,
    align: align = "left",
    size: size = 1,
    direction: direction = "ltr",
    letterSpacing: letterSpacing = 0,
    lineHeight: lineHeight = 1.4,
    wordSpacing: wordSpacing = 0,
    wordBreak: wordBreak = !1,
    langBreak: langBreak = !1,
    paragraphSpacing: paragraphSpacing = 1,
    color: color = new Color("#000000"),
    alpha: alpha = 1,
    shader: shader = "DefaultText"
}) {
    const _this = this;
    var _override, _promise = Promise.create();
    const config = GLText.FONT_CONFIG[font];

    function overrideParams() {
        if (GLText.overrideParams) {
            _override = {
                letterSpacing: letterSpacing,
                size: size,
                wordSpacing: wordSpacing,
                lineHeight: lineHeight
            };
            let obj = GLText.overrideParams({
                letterSpacing: letterSpacing,
                size: size,
                wordSpacing: wordSpacing,
                lineHeight: lineHeight
            });
            letterSpacing = obj.letterSpacing, size = obj.size, wordSpacing = obj.wordSpacing, lineHeight = obj.lineHeight
        }
    }

    function resetOverride() {
        _override && (letterSpacing = _override.letterSpacing, size = _override.size, wordSpacing = _override.wordSpacing, lineHeight = _override.lineHeight)
    }! function init() {
        overrideParams(), _this.charLength = text.length, _this.text = new GLTextGeometry({
            font: font,
            italic: italic,
            bold: bold,
            text: text,
            width: width,
            align: align,
            direction: direction,
            wordSpacing: wordSpacing,
            letterSpacing: letterSpacing,
            paragraphSpacing: paragraphSpacing,
            size: size,
            lineHeight: lineHeight,
            wordBreak: wordBreak,
            langBreak: langBreak,
            config: config
        }), _this.string = text, resetOverride(), _this.text.loaded.then(({
            buffers: buffers,
            image: image,
            imageBold: imageBold,
            imageItalic: imageItalic,
            height: height,
            numLines: numLines
        }) => {
            _this.texture = GLText.getTexture(image), bold && (_this.textureBold = GLText.getTexture(imageBold)), italic && (_this.textureItalic = GLText.getTexture(imageItalic)), _this.shader = new Shader(shader, {
                    tMap: {
                        value: _this.texture,
                        ignoreUIL: !0
                    },
                    tMapBold: {
                        value: _this.textureBold || Utils3D.getEmptyTexture(),
                        ignoreUIL: !0
                    },
                    tMapItalic: {
                        value: _this.textureItalic || Utils3D.getEmptyTexture(),
                        ignoreUIL: !0
                    },
                    uColor: {
                        value: color,
                        ignoreUIL: !0
                    },
                    uAlpha: {
                        value: alpha,
                        ignoreUIL: !0
                    },
                    transparent: !0
                }), _this.onCreateShader && _this.onCreateShader(_this.shader),
                function createGeometry(buffers) {
                    _this.geometry = new Geometry, _this.geometry.addAttribute("position", new GeometryAttribute(buffers.position, 3)), _this.geometry.addAttribute("uv", new GeometryAttribute(buffers.uv, 2)), _this.geometry.addAttribute("animation", new GeometryAttribute(buffers.animation, 3)), _this.geometry.addAttribute("weight", new GeometryAttribute(buffers.weight, 1)), _this.geometry.setIndex(new GeometryAttribute(buffers.index, 1)), _this.geometry.boundingBox = buffers.boundingBox, _this.geometry.letterCount = buffers.letterCount + 1, _this.geometry.wordCount = buffers.wordCount + 1, _this.geometry.lineCount = buffers.lineCount + 1
                }(buffers), _this.mesh = new Mesh(_this.geometry, _this.shader), _this.height = height, _promise.resolve()
        })
    }(), void 0 === font && console.log(font, text), this.destroy = function() {
        _this.mesh && _this.mesh.destroy && _this.mesh.destroy()
    }, this.ready = this.loaded = function() {
        return _promise
    }, this.centerY = function() {
        _this.mesh.position.y = .5 * _this.height, _this.needsCenterY = !0
    }, this.resize = function(options) {
        return this.setText(text, options)
    }, this.tweenColor = function(c, time = 300, ease = "easeOutCubic") {
        c && color.tween(c, time, ease)
    }, this.setColor = function(c) {
        c && color.set(c)
    }, this.setText = function(txt, options) {
        if ((text != txt || ! function match(options) {
                return !options || options.font == font && (options.italic == italic && (options.bold == bold && (options.width == width && (options.align == align && (options.direction == direction && (!(options.wordSpacing > 0 && options.wordSpacing != wordSpacing) && (options.letterSpacing == letterSpacing && (options.paragraphSpacing == paragraphSpacing && (options.size == size && (options.lineHeight == lineHeight && !(!0 === options.wordBreak && !options.wordBreak || 0 == options.wordBreak && options.wordBreak)))))))))))
            }(options)) && (text = txt)) return function setVars(options) {
            font = options.font || font, bold = options.bold || bold, italic = options.italic || italic, width = options.width || width, align = options.align || align, wordSpacing = options.wordSpacing || wordSpacing, letterSpacing = options.letterSpacing || letterSpacing, paragraphSpacing = options.paragraphSpacing || paragraphSpacing, size = options.size || size, lineHeight = options.lineHeight || lineHeight, wordBreak = options.wordBreak || wordBreak, langBreak = options.langBreak || langBreak, direction = options.direction || direction
        }(options || {}), overrideParams(), _this.string = text, _this.charLength = text.length, _this.text = new GLTextGeometry({
            font: font,
            italic: italic,
            bold: bold,
            text: text,
            width: width,
            align: align,
            direction: direction,
            wordSpacing: wordSpacing,
            letterSpacing: letterSpacing,
            paragraphSpacing: paragraphSpacing,
            size: size,
            lineHeight: lineHeight,
            wordBreak: wordBreak,
            langBreak: langBreak,
            config: config
        }), resetOverride(), _promise = Promise.create(), _this.text.loaded.then(({
            buffers: buffers,
            image: image,
            imageBold: imageBold,
            imageItalic: imageItalic,
            height: height,
            numLines: numLines
        }) => {
            ! function updateGeometry(buffers) {
                _this.geometry.attributes.position.setArray(buffers.position), _this.geometry.attributes.uv.setArray(buffers.uv), _this.geometry.attributes.animation.setArray(buffers.animation), _this.geometry.attributes.weight.setArray(buffers.weight), _this.geometry.index = buffers.index, _this.geometry.indexNeedsUpdate = !0, _this.geometry.boundingBox = buffers.boundingBox, _this.geometry.letterCount = buffers.letterCount + 1, _this.geometry.wordCount = buffers.wordCount + 1, _this.geometry.lineCount = buffers.lineCount + 1
            }(buffers), _this.height = height, _this.needsCenterY && _this.centerY(), _promise.resolve()
        }), _promise
    }, this.getData = function() {
        return {
            font: font,
            italic: italic,
            bold: bold,
            text: text,
            width: width,
            align: align,
            direction: direction,
            wordSpacing: wordSpacing,
            letterSpacing: letterSpacing,
            paragraphSpacing: paragraphSpacing,
            size: size,
            lineHeight: lineHeight,
            wordBreak: wordBreak,
            langBreak: langBreak,
            color: color
        }
    }
}), _ => {
    GLText.FONT_CONFIG = {};
    var _map = new Map;
    GLText.getTexture = function(image) {
        if (!_map.get(image)) {
            let texture = new Texture(image);
            texture.generateMipmaps = !1, texture.minFilter = Texture.LINEAR, _map.set(image, texture)
        }
        return _map.get(image)
    }
}), Class((function GLTextGeometry({
    font: font,
    italic: italic,
    bold: bold,
    text: text,
    width: width = 1 / 0,
    align: align = "left",
    size: size = 1,
    direction: direction = "ltr",
    letterSpacing: letterSpacing = 0,
    paragraphSpacing: paragraphSpacing = 1,
    lineHeight: lineHeight = 1.4,
    wordSpacing: wordSpacing = 0,
    wordBreak: wordBreak = !1,
    langBreak: langBreak = !1,
    config: config = {}
}) {
    let json, image, glyphs, bJson, bImage, bGlyphs, iJson, iImage, iGlyphs, _this = this;
    _this.loaded = Promise.create(), async function init() {
        await async function loadFont() {
            [json, image, glyphs] = await GLTextGeometry.loadFont(font), bold && ([bJson, bImage, bGlyphs] = await GLTextGeometry.loadFont(bold));
            italic && ([iJson, iImage, iGlyphs] = await GLTextGeometry.loadFont(italic))
        }(), async function createGeometry() {
            let buffers = await GLTextThread.generate({
                font: font,
                bold: bold,
                italic: italic,
                text: text,
                width: width,
                align: align,
                size: size,
                direction: direction,
                letterSpacing: letterSpacing,
                paragraphSpacing: paragraphSpacing,
                lineHeight: lineHeight,
                wordSpacing: wordSpacing,
                wordBreak: wordBreak,
                langBreak: langBreak,
                json: json,
                glyphs: glyphs,
                bJson: bJson,
                bGlyphs: bGlyphs,
                iJson: iJson,
                iGlyphs: iGlyphs,
                config: config
            });
            _this.buffers = buffers, _this.image = image, _this.imageBold = bImage, _this.imageItalic = iImage, _this.numLines = buffers.lineLength, _this.height = _this.numLines * size * lineHeight, _this.onLayout && _this.onLayout(buffers, image, _this.height, _this.numLines), _this.loaded.resolve({
                buffers: buffers,
                image: image,
                imageBold: bImage,
                imageItalic: iImage,
                height: _this.height,
                numLines: _this.numLines
            })
        }()
    }()
}), _ => {
    async function loadJSON(font) {
        return await get(getPathTo(font, "json"))
    }
    async function loadImage(font) {
        return await new Promise(resolve => {
            let img = new Image;
            img.onload = () => resolve(img), img.crossOrigin = "anonymous", img.src = getPathTo(font, "png")
        })
    }

    function getPathTo(font, ext) {
        let mapped = !1,
            fontName = function() {
                for (let key in GLTextGeometry.fontMapping) {
                    let mapping = GLTextGeometry.fontMapping[key];
                    if (key == font) return mapped = !0, mapping
                }
                return font
            }(),
            path = mapped && GLTextGeometry.fontPath ? GLTextGeometry.fontPath : "assets/fonts/";
        return Assets.getPath(path + fontName + "." + ext + "?" + (window._CACHE_ || Date.now()))
    }
    let _promises = {};
    GLTextGeometry.fontMapping = {}, GLTextGeometry.chars = {}, GLTextGeometry.loadFont = function(font) {
        if (!_promises[font]) {
            let promise = Promise.create();
            _promises[font] = promise, async function() {
                let [json, image] = await Promise.all([loadJSON(font), loadImage(font)]);
                glyphs = {}, json.chars.forEach(d => glyphs[d.char] = d), promise.resolve([json, image, glyphs]), GLTextGeometry.chars[font] = json.chars
            }()
        }
        return _promises[font]
    }
}), Class((function GLTextThread() {
    function loadTextGeometry({
        font: font,
        bold: bold,
        italic: italic,
        text: text,
        width: width,
        align: align,
        size: size,
        direction: direction,
        letterSpacing: letterSpacing,
        paragraphSpacing: paragraphSpacing,
        lineHeight: lineHeight,
        wordSpacing: wordSpacing,
        wordBreak: wordBreak,
        langBreak: langBreak,
        json: json,
        glyphs: glyphs,
        bJson: bJson,
        bGlyphs: bGlyphs,
        iJson: iJson,
        iGlyphs: iGlyphs,
        config: config
    }, pid) {
        const newline = /\n/,
            whitespace = /\s/,
            langbreak = !!langBreak && new RegExp(langBreak),
            dir = "rtl" === direction ? -1 : 1;
        config || (config = {}), config.boldBaseOffset = config.boldBaseOffset ? config.boldBaseOffset : 0, config.italicBaseOffset = config.italicBaseOffset ? config.italicBaseOffset : 0;
        let weights = [],
            weight = {
                0: glyphs,
                1: bGlyphs,
                2: iGlyphs
            };
        var buffers;

        function getKernPairOffset(id1, id2) {
            for (let i = 0; i < json.kernings.length; i++) {
                let k = json.kernings[i];
                if (!(k.first < id1) && !(k.second < id2)) return k.first > id1 || k.first === id1 && k.second > id2 ? 0 : k.amount
            }
            return 0
        }! function setWeights() {
            let i = 0,
                w = 0;
            for (; i < text.length;) {
                let code = text.substring(i, i + 3),
                    endcode = text.substring(i, i + 4);
                "<b>" !== code && "<i>" !== code || (w = "<b>" === code ? 1 : 2, text = text.substr(0, i) + text.substr(i + 3)), "</b>" !== endcode && "</i>" !== endcode || (w = 0, text = text.substr(0, i) + text.substr(i + 4)), weights.push(w), i++
            }
        }(),
        function createGeometry() {
            fontHeight = json.common.lineHeight, baseline = json.common.base, scale = size / baseline;
            let numChars = text.replace(/[ \n]/g, "").length;
            buffers = {
                position: new Float32Array(4 * numChars * 3),
                uv: new Float32Array(4 * numChars * 2),
                animation: new Float32Array(3 * numChars * 4),
                index: new Uint16Array(6 * numChars),
                weight: new Float32Array(4 * numChars)
            };
            for (let i = 0; i < numChars; i++) buffers.index.set([4 * i, 4 * i + 2, 4 * i + 1, 4 * i + 1, 4 * i + 2, 4 * i + 3], 6 * i);
            ! function layout() {
                const lines = [];
                let cursor = 0,
                    wordCursor = 0,
                    wordWidth = 0,
                    line = newLine();

                function newLine(br = !1) {
                    const line = {
                        width: 0,
                        glyphs: []
                    };
                    return lines.last() && (lines.last().br = br), lines.push(line), wordCursor = cursor, wordWidth = 0, line
                }
                for (; cursor < text.length;) {
                    let prev = text[cursor - 1],
                        char = text[cursor];
                    text[cursor + 1];
                    if (!line.width && whitespace.test(char) && !(prev && newline.test(char) && newline.test(prev))) {
                        cursor++, wordCursor = cursor, wordWidth = 0;
                        continue
                    }
                    if (newline.test(char)) {
                        cursor++, line = newLine(!0);
                        continue
                    }
                    let style = weight[weights[cursor]] || weight[0],
                        glyph = style[char];
                    if (glyph || (glyph = style.a), glyph.weight = weights[cursor], line.glyphs.length) {
                        const prevGlyph = line.glyphs[line.glyphs.length - 1][0];
                        let kern = getKernPairOffset(glyph.id, prevGlyph.id) * scale;
                        line.width += kern, wordWidth += kern * dir
                    }
                    let gl = Object.assign({}, glyph);
                    gl.weight = weights[cursor], line.glyphs.push([gl, line.width]);
                    let advance = 0;
                    if (whitespace.test(char) ? (gl.whitespace = !0, wordCursor = cursor, wordWidth = 0, advance += wordSpacing * size) : advance += letterSpacing * size, advance += glyph.xadvance * scale, line.width += advance, wordWidth += advance, line.width > width) {
                        if ((wordBreak || char && langBreak && !langbreak.test(char)) && line.glyphs.length > 1) {
                            line.width -= advance, line.glyphs.pop(), line = newLine();
                            continue
                        }
                        if (!wordBreak && wordWidth !== line.width) {
                            let numGlyphs = cursor - wordCursor + 1;
                            line.glyphs.splice(-numGlyphs, numGlyphs), cursor = wordCursor, line.width -= wordWidth, line = newLine();
                            continue
                        }
                    }
                    cursor++
                }
                line.width || lines.pop();
                if ("justify" === align) {
                    let max = -1 / 0;
                    lines.forEach(l => {
                        l.whitespaces = 0, max < l.width && (max = l.width), l.glyphs.forEach(g => {
                            g[0].whitespace && l.whitespaces++
                        })
                    }), lines.forEach(l => {
                        let totalToAdd = max - l.width,
                            addToWhitespace = 0 === l.whitespaces ? 0 : totalToAdd / l.whitespaces;
                        l.width = max;
                        let additionalOffset = 0;
                        l.glyphs.forEach(g => {
                            g[1] += additionalOffset, g[0].whitespace && (additionalOffset += addToWhitespace)
                        })
                    })
                }! function populateBuffers(lines) {
                    const texW = json.common.scaleW,
                        texH = json.common.scaleH;
                    let geom, y = (config.baseOffset ? config.baseOffset : .07) * size,
                        j = 0,
                        glyphIndex = 0,
                        wordIndex = -1,
                        lineId = -1;
                    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        let line = lines[lineIndex];
                        wordIndex++, lineId++;
                        for (let i = 0; i < line.glyphs.length; i++) {
                            const glyph = line.glyphs[i][0];
                            let x = line.glyphs[i][1];
                            if (-1 === dir && (x = line.width - x), "center" === align || "justify" === align ? x -= .5 * line.width : "right" === align && (x -= line.width * dir), whitespace.test(glyph.char)) {
                                wordIndex++;
                                continue
                            }
                            1 === glyph.weight && (y += config.boldBaseOffset * scale), 2 === glyph.weight && (y += config.italicBaseOffset * scale), x += glyph.xoffset * scale * dir, y -= glyph.yoffset * scale, buffers.weight.set([glyph.weight, glyph.weight, glyph.weight, glyph.weight], 4 * glyphIndex);
                            let w = glyph.width * scale,
                                h = glyph.height * scale; - 1 === dir ? buffers.position.set([x - w, y - h, 0, x - w, y, 0, x, y - h, 0, x, y, 0], 4 * j * 3) : buffers.position.set([x, y - h, 0, x, y, 0, x + w, y - h, 0, x + w, y, 0], 4 * j * 3), buffers.animation.set([glyphIndex, wordIndex, lineId, glyphIndex, wordIndex, lineId, glyphIndex, wordIndex, lineId, glyphIndex, wordIndex, lineId], 3 * glyphIndex * 4), glyphIndex++;
                            let u = glyph.x / texW,
                                uw = glyph.width / texW,
                                v = 1 - glyph.y / texH,
                                vh = glyph.height / texH;
                            buffers.uv.set([u, v - vh, u, v, u + uw, v - vh, u + uw, v], 4 * j * 2), 1 === glyph.weight && (y -= config.boldBaseOffset * scale), 2 === glyph.weight && (y -= config.italicBaseOffset * scale), y += glyph.yoffset * scale, j++
                        }
                        y -= size * lineHeight * (line.br ? paragraphSpacing : 1)
                    }
                    window.zUtils3D && (geom = new Geometry, geom.addAttribute("position", new GeometryAttribute(buffers.position, 3)), geom.computeBoundingBox());
                    let backing = [];
                    for (let key in buffers) backing.push(buffers[key].buffer);
                    buffers.lineLength = lines.length, geom && (buffers.boundingBox = geom.boundingBox);
                    buffers.letterCount = glyphIndex, buffers.lineCount = lineId, buffers.wordCount = wordIndex, resolve(buffers, pid, backing)
                }(lines)
            }()
        }()
    }
    Thread.upload(loadTextGeometry), this.generate = async function(obj) {
        return Thread.shared().loadTextGeometry(obj)
    }
}), "static"), Class((function GLUI() {
    Inherit(this, Component);
    const _this = this;

    function loop() {
        window.Metal || (window.AURA_AR && AURA_AR.active && (World.NUKE.postRender = null, AURA_AR.postRender = loop), _this.Scene && _this.Scene.render(), _this.Stage && _this.Stage.render())
    }
    window.$gl = function(width, height, map) {
        return new GLUIObject(width, height, map)
    }, window.$glText = function(text, fontName, fontSize, options) {
        return new GLUIText(text, fontName, fontSize, options)
    }, this.init = async function(is2D, is3D) {
        _this.initialized || (void 0 === is2D && (is2D = !0, is3D = !0), await AssetLoader.waitForLib("zUtils3D"), is2D && (_this.Stage = new GLUIStage), is3D && (_this.Scene = new GLUIStage3D, _this.Scene.interaction.input = Mouse), _this.wait(World, "NUKE", _ => {
            _this.initialized = !0, _this.Scene && (World.NUKE.onBeforeRender = _this.Scene.mark), World.NUKE.postRender = loop
        }))
    }, this.clear = function() {
        _this.Stage.clear(), _this.Scene.clear()
    }, this.ready = function() {
        return _this.wait(_this, "initialized")
    }, this.renderDirect = function(render) {
        _this.Scene && _this.Scene.renderDirect(render), _this.Stage && _this.Stage.renderDirect(render)
    }
}), "static"), Class((function GLUIElement() {
    Inherit(this, Component);
    this.element = $gl(), this.create = function(w, h, t) {
        return this.element.create(w, h, t)
    }
})), Class((function GLUIBatch(globalUniforms = {}) {
    Inherit(this, Component);
    const _this = this;
    var _timer, _geometry, _shader, _objects = [];

    function loop() {
        if (_geometry)
            for (let i = 0; i < _objects.length; i++) {
                let obj = _objects[i];
                obj.mesh.onBeforeRender(), obj._buffers.forEach(buffer => {
                    let dirty = !1;
                    if (dirty = !buffer.value.equals(buffer.lookup), buffer.value.copy(buffer.lookup), dirty) {
                        let attribute = _geometry.attributes[buffer.key],
                            array = attribute.array;
                        switch (buffer.key) {
                            case "scale":
                                array[2 * i + 0] = obj.group.scale.x * obj.mesh.scale.x, array[2 * i + 1] = obj.group.scale.y * obj.mesh.scale.y;
                                break;
                            case "rotation":
                                array[i] = buffer.lookup.z;
                                break;
                            default:
                                array[2 * i + 0] = obj.group.position.x, array[2 * i + 1] = obj.group.position.y
                        }
                        attribute.needsUpdate = !0
                    }
                }), obj._uniforms.forEach(uniform => {
                    let dirty = !1;
                    if ("f" == uniform.type ? (dirty = obj.mesh.shader.uniforms[uniform.key].value != uniform.value, uniform.value = obj.mesh.shader.uniforms[uniform.key].value) : (dirty = !obj.mesh.shader.uniforms[uniform.key].value.equals(uniform.value), uniform.value.copy(obj.mesh.shader.uniforms[uniform.key].value)), dirty) {
                        let attribute = _geometry.attributes["a_" + uniform.key],
                            array = attribute.array;
                        "f" == uniform.type ? array[i] = uniform.value : uniform.value.toArray(array, i * uniform.components), attribute.needsUpdate = !0
                    }
                })
            }
    }

    function getTypeFromSize(size) {
        switch (size) {
            case 1:
                return "float";
            case 2:
                return "vec2";
            case 3:
                return "vec3";
            case 4:
                return "vec4"
        }
    }

    function createMesh() {
        let shader = _objects[0].mesh.shader;
        _geometry = (new Geometry).instanceFrom(_objects[0].mesh.geometry.clone());
        let map = {},
            arrays = {};
        _objects.forEach((obj, i) => {
            obj.mesh.onBeforeRender();
            let buffers = [],
                uniforms = [];
            for (let key in shader.uniforms) {
                let uniform = shader.uniforms[key];
                uniform.value instanceof Color && uniforms.push({
                    key: key,
                    type: "c",
                    components: 3
                }), uniform.value instanceof Vector3 && uniforms.push({
                    key: key,
                    type: "v3",
                    components: 3
                }), uniform.value instanceof Vector2 && uniforms.push({
                    key: key,
                    type: "v",
                    components: 2
                }), "number" == typeof uniform.value && uniforms.push({
                    key: key,
                    type: "f",
                    components: 1
                })
            }
            buffers.push({
                key: "offset",
                lookup: obj.group.position,
                components: 2
            }), buffers.push({
                key: "scale",
                lookup: obj.group.scale,
                components: 2
            }), buffers.push({
                key: "rotation",
                lookup: obj.group.rotation,
                components: 1
            }), uniforms.forEach(uniform => {
                arrays["a_" + uniform.key] || (arrays["a_" + uniform.key] = []), map["a_" + uniform.key] || (map["a_" + uniform.key] = uniform);
                let value = shader.uniforms[uniform.key].value;
                "object" == typeof value ? (uniform.value = value.clone(), uniform.value.toArray(arrays["a_" + uniform.key], i * uniform.components)) : (uniform.value = shader.uniforms[uniform.key].value, arrays["a_" + uniform.key].push(uniform.value))
            }), buffers.forEach(buffer => {
                switch (arrays[buffer.key] || (arrays[buffer.key] = []), map[buffer.key] || (map[buffer.key] = buffer), buffer.value = buffer.lookup.clone(), buffer.key) {
                    case "scale":
                        arrays[buffer.key].push(obj.group.scale.x * obj.mesh.scale.x, obj.group.scale.y * obj.mesh.scale.y);
                        break;
                    case "rotation":
                        arrays[buffer.key].push(buffer.lookup.z);
                        break;
                    default:
                        arrays[buffer.key].push(buffer.lookup.x, buffer.lookup.y)
                }
            }), obj._buffers = buffers, obj._uniforms = uniforms, obj.shader.neverRender = !0
        });
        let attributes = [],
            defines = [];
        for (let key in map) key.includes("a_") && (attributes.push(`% ${getTypeFromSize(map[key].components)} ${key};`), defines.push(`${key.replace("a_","v_")} = ${key};`));
        attributes = attributes.join("\n"), defines = defines.join("\n");
        for (let key in arrays) _geometry.addAttribute(key, new GeometryAttribute(new Float32Array(arrays[key]), map[key].components, 1));
        if (GLUIBatch.cache[shader.fsName]) _shader = GLUIBatch.cache[shader.fsName];
        else {
            let vsSplit = (_shader = _this.initClass(Shader, "GLUIBatch", shader.fsName, Object.assign({}, {
                    transparent: !0
                }, globalUniforms))).vertexShader.split("__ACTIVE_THEORY_LIGHTS__"),
                fsSplit = _shader.fragmentShader.split("__ACTIVE_THEORY_LIGHTS__"),
                definitions = [];
            fsSplit[1].split("\n").forEach(line => {
                if (line.includes("uniform")) {
                    if (line.includes("sampler2D")) return;
                    let data = line.split(" ");
                    definitions.push(`${data[2].replace(";","")} = a_${data[2]}`), vsSplit[1] = `\nattribute ${data[1]} a_${data[2]}\nvarying ${data[1]} ${data[2]}` + vsSplit[1], vsSplit[1] = vsSplit[1].replace(line, ""), fsSplit[1] = fsSplit[1].replace(line, `varying ${data[1]} ${data[2]}`)
                }
            }), vsSplit[1] = vsSplit[1].replace("//vdefines", "\n" + definitions.join("\n")), _shader.vertexShader = vsSplit.join("__ACTIVE_THEORY_LIGHTS__"), _shader.fragmentShader = fsSplit.join("__ACTIVE_THEORY_LIGHTS__"), GLUIBatch.cache[shader.fsName] = _shader
        }
        shader.copyUniformsTo(_shader), _this.mesh = new Mesh(_geometry, _shader), _this.mesh.frustumCulled = !1, _this.group.add(_this.mesh)
    }
    this.group = new Group, GLUIBatch.cache || (GLUIBatch.cache = {}), _this.startRender(loop), this.add = function(obj) {
        clearTimeout(_timer), _timer = _this.delayedCall(createMesh, 50), _this.parent.add(obj), _objects.push(obj)
    }, this.onDestroy = function() {
        _this.mesh.destroy()
    }
})), Class((function GLUIBatchText(globalUniforms = {}) {
    Inherit(this, Component);
    const _this = this;
    var _geometry, _shader, _timer, _forceUpdate, _promises = [],
        _toSplice = [],
        _objects = [],
        _offset = 0;

    function loop() {
        if (!_geometry) return;
        let updated = !1;
        for (let key in _geometry.attributes) {
            let attrib = _geometry.attributes[key];
            attrib.updateRange.length && (attrib.updateRange.length = 0)
        }
        let len = _objects.length;
        for (let i = 0; i < len; i++) {
            let obj = _objects[i];
            obj.mesh.onBeforeRender();
            let offset = obj._offset,
                count = obj._count,
                end = offset + count;
            obj._buffers.forEach(buffer => {
                let dirty = !1;
                if (dirty = !buffer.value.equals(buffer.lookup), buffer.value.copy(buffer.lookup), dirty) {
                    let array = _geometry.attributes[buffer.key].array;
                    for (let j = offset; j < end; j++) switch (buffer.components) {
                        case 2:
                            array[2 * j + 0] = buffer.lookup.x, array[2 * j + 1] = buffer.lookup.y;
                            break;
                        case 1:
                            array[j] = buffer.lookup.z
                    }
                    updated = !0, buffer.updateRange.offset = offset * buffer.components, buffer.updateRange.count = count * buffer.components, _geometry.attributes[buffer.key].updateRange.push(buffer.updateRange), _geometry.attributes[buffer.key].needsUpdate = !0
                }
            }), obj._uniforms.forEach(uniform => {
                let dirty = !1;
                if ("f" == uniform.type ? (dirty = obj.mesh.shader.uniforms[uniform.key].value != uniform.value, uniform.value = obj.mesh.shader.uniforms[uniform.key].value) : (dirty = !obj.mesh.shader.uniforms[uniform.key].value.equals(uniform.value), uniform.value.copy(obj.mesh.shader.uniforms[uniform.key].value)), dirty || _forceUpdate) {
                    let array = _geometry.attributes["a_" + uniform.key].array;
                    for (let j = offset; j < end; j++) "f" == uniform.type ? array[j] = obj.mesh.shader.uniforms[uniform.key].value : obj.mesh.shader.uniforms[uniform.key].value.toArray(array, j * uniform.components);
                    updated = !0, uniform.updateRange.offset = offset * uniform.components, uniform.updateRange.count = count * uniform.components, _geometry.attributes["a_" + uniform.key].updateRange.push(uniform.updateRange), _geometry.attributes["a_" + uniform.key].needsUpdate = !0
                }
            })
        }
        if (updated)
            for (let key in _geometry.attributes) {
                let bottom, attrib = _geometry.attributes[key];
                if (!attrib.updateRange.length) continue;
                let toSplice = _toSplice;
                toSplice.length = 0;
                for (let i = 0; i < attrib.updateRange.length; i++) {
                    let current = attrib.updateRange[i],
                        prev = attrib.updateRange[i - 1];
                    prev ? prev.offset + prev.count == current.offset ? (bottom.count += current.count, toSplice.push(i)) : bottom = current : bottom = current
                }
                for (let i = toSplice.length - 1; i > -1; i--) attrib.updateRange.splice(toSplice[i], 1)
            }
        _forceUpdate = !1
    }
    async function createMesh() {
        if (_this.flag("mesh")) return;
        _this.flag("mesh", !0), await Promise.all(_promises), await _this.wait(100);
        let mesh = new Mesh(_geometry, _shader);
        _this.mesh = mesh, mesh.frustumCulled = !1, _this.group.add(mesh)
    }
    this.group = new Group, _this.flag("canLoad", !0), _this.startRender(loop), _this.add = async function(obj) {
        await _this.flag("canLoad"), _this.flag("canLoad", !1), await obj.loaded(), obj.mesh.shader.neverRender = !0, _promises.push(obj.loaded()),
            function addAttributes(obj, mesh) {
                let {
                    geometry: geometry,
                    shader: shader
                } = mesh, count = geometry.attributes.uv.count;
                mesh.onBeforeRender();
                let buffers = [],
                    uniforms = [];
                for (let key in shader.uniforms) {
                    let uniform = shader.uniforms[key];
                    uniform.value instanceof Color && uniforms.push({
                        key: key,
                        type: "c",
                        components: 3
                    }), uniform.value instanceof Vector3 && uniforms.push({
                        key: key,
                        type: "v3",
                        components: 3
                    }), uniform.value instanceof Vector2 && uniforms.push({
                        key: key,
                        type: "v",
                        components: 2
                    }), "number" == typeof uniform.value && uniforms.push({
                        key: key,
                        type: "f",
                        components: 1
                    })
                }
                buffers.push({
                    key: "offset",
                    lookup: obj.group.position,
                    components: 2
                }), buffers.push({
                    key: "scale",
                    lookup: obj.group.scale,
                    components: 2
                }), buffers.push({
                    key: "rotation",
                    lookup: obj.group.rotation,
                    components: 1
                }), uniforms.forEach(uniform => {
                    uniform.updateRange = {}, uniform.value = shader.uniforms[uniform.key].value, "object" == typeof uniform.value && (uniform.value = uniform.value.clone()), uniform.buffer = new Float32Array(count * uniform.components)
                }), buffers.forEach(buffer => {
                    buffer.updateRange = {}, buffer.value = buffer.lookup.clone(), buffer.buffer = new Float32Array(count * buffer.components)
                });
                for (let i = 0; i < count; i++) buffers.forEach(buffer => {
                    switch (buffer.components) {
                        case 2:
                            buffer.buffer[2 * i + 0] = buffer.lookup.x, buffer.buffer[2 * i + 1] = buffer.lookup.y;
                            break;
                        case 1:
                            buffer.buffer[i] = buffer.lookup.z
                    }
                }), uniforms.forEach(uniform => {
                    "f" == uniform.type ? uniform.buffer[i] = shader.uniforms[uniform.key].value : shader.uniforms[uniform.key].value.toArray(uniform.buffer, i * uniform.components)
                });
                buffers.forEach(buffer => {
                    geometry.addAttribute(buffer.key, new GeometryAttribute(buffer.buffer, buffer.components))
                }), uniforms.forEach(uniform => {
                    geometry.addAttribute("a_" + uniform.key, new GeometryAttribute(uniform.buffer, uniform.components))
                }), obj._offset = _offset, obj._count = count, obj._uniforms = uniforms, obj._buffers = buffers, _objects.push(obj), _offset += count
            }(obj, obj.mesh), _this.parent.add(obj), _geometry ? _geometry.merge(obj.mesh.geometry) : function initGeometry(mesh) {
                let vsSplit = (_shader = _this.initClass(Shader, "GLUIBatchText", mesh.shader.fsName, Object.assign({}, {
                        transparent: !0
                    }, globalUniforms))).vertexShader.split("__ACTIVE_THEORY_LIGHTS__"),
                    fsSplit = _shader.fragmentShader.split("__ACTIVE_THEORY_LIGHTS__"),
                    definitions = [];
                fsSplit[1].split("\n").forEach(line => {
                    if (line.includes("uniform")) {
                        if (line.includes("sampler2D")) return;
                        let data = line.split(" ");
                        definitions.push(`${data[2].replace(";","")} = a_${data[2]}`), vsSplit[1] = `\nattribute ${data[1]} a_${data[2]}\nvarying ${data[1]} ${data[2]}` + vsSplit[1], vsSplit[1] = vsSplit[1].replace(line, ""), fsSplit[1] = fsSplit[1].replace(line, `varying ${data[1]} ${data[2]}`)
                    }
                }), vsSplit[1] = vsSplit[1].replace("//vdefines", "\n" + definitions.join("\n")), _shader.vertexShader = vsSplit.join("__ACTIVE_THEORY_LIGHTS__"), _shader.fragmentShader = fsSplit.join("__ACTIVE_THEORY_LIGHTS__"), mesh.shader.copyUniformsTo(_shader), _geometry = mesh.geometry.clone();
                for (let key in _geometry.attributes) _geometry.attributes[key].updateRange = []
            }(obj.mesh), _this.flag("canLoad", !0), clearTimeout(_timer), _timer = _this.delayedCall(createMesh, 50)
    }, _this.forceUpdate = function() {
        _forceUpdate = !0
    }, _this.onDestroy = function() {
        _this.mesh && _this.mesh.destroy()
    }
})), Class((function GLUIStageInteraction2D(_camera, _scene, _stage, _custom) {
    Inherit(this, Component);
    const _this = this;
    var _ray, _over, _click, _customTest, _disabled, _blocked, _test = [],
        _objects = this.objects = [],
        _hold = new Vector2,
        _lastTestedPoint = (new Vector2, new Vector2);

    function cacheTopScene(obj) {
        let p = obj;
        for (; p;) p instanceof Scene && (obj.interactionScene = p), p = p._parent
    }

    function externalStart() {
        _this._invisible || start(_lastTestedPoint)
    }

    function externalRelease() {
        _this._invisible || end(_lastTestedPoint)
    }

    function move(e) {
        if (GLUI.PREVENT_INTERACTION || _this._invisible || _disabled || _blocked) return;
        _ray || ((_ray = new Raycaster(_camera)).testVisibility = !1);
        let objects = function testObjects() {
            let objects = GLUI.Stage.interaction.objects;
            _test.length = 0;
            for (let i = objects.length - 1; i > -1; i--) {
                let obj = objects[i];
                obj.interactionScene || cacheTopScene(obj), obj.determineVisible() && _scene == obj.interactionScene && _test.push(obj)
            }
            return _test
        }();
        if (!objects.length) return;
        let hit = _ray.checkHit(objects, e, _stage);
        try {
            if (hit[0]) {
                GLUI.HIT = !0;
                let obj = hit[0].object.glui;
                _over || ((_over = obj)._onOver({
                    action: "over",
                    object: obj
                }), Stage.cursor("pointer")), _over != obj && (_over._onOver({
                    action: "out",
                    object: _over
                }), (_over = obj)._onOver({
                    action: "over",
                    object: obj
                }), Stage.cursor("pointer"))
            } else GLUI.HIT = !1, _over && (_over._onOver({
                action: "out",
                object: _over
            }), _over = null, Stage.cursor("auto"))
        } catch (e) {
            console.warn(e)
        }
    }

    function start(e) {
        GLUI.PREVENT_INTERACTION || _this._invisible || _disabled || _blocked || ((Device.mobile || RenderManager.type == RenderManager.WEBVR) && move(e), _over && !_click && (_click = _over, _hold.copy(e), _hold.time = Date.now()))
    }

    function end(e) {
        if (!(GLUI.PREVENT_INTERACTION || _this._invisible || _disabled || _blocked)) {
            if (_customTest && Device.mobile && _click && null == _over && (_over = _click), GLUI.HIT = !1, _click) {
                if (Date.now() - _hold.time > 750) return _click = null;
                if (_click == _over) try {
                    _blocked = !0, _this.delayedCall(_ => {
                        _blocked = !1
                    }, _this.preventDoubleClickTime), _click._onClick({
                        action: "click",
                        object: _click
                    }), Device.mobile && _over && (_over._onOver({
                        action: "out",
                        object: _over
                    }), _over = null, Stage.cursor("auto"))
                } catch (e) {
                    console.warn(e)
                }
            }
            _click = null
        }
    }
    this.preventDoubleClickTime = 100,
        function addListeners() {
            _custom || _this.events.sub(Mouse.input, Interaction.MOVE, move), _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end), _this.events.sub(Interaction3D.EXTERNAL_PRESS, externalStart), _this.events.sub(Interaction3D.EXTERNAL_RELEASE, externalRelease)
        }(), _this.startRender(_ => {}), this.add = function(obj) {
            obj && _objects.push(obj.mesh || obj)
        }, this.remove = function(obj) {
            obj && _objects.remove(obj.mesh || obj)
        }, this.testWith = function(point, id) {
            point.customTest = !0, _lastTestedPoint.copy(point), _lastTestedPoint.customTest = !0, move(point), Device.mobile && RenderManager.type != RenderManager.WEBVR && _over && start(point), _customTest || (_customTest = !0)
        }, this.set("_disabled", v => {
            (_disabled = v) && (_click = null, _over = null)
        })
})), Class((function GLUIStageInteraction3D() {
    Inherit(this, Component);

    function onHover(e) {
        e.mesh.glui._onOver({
            action: e.action,
            object: e.mesh.glui
        })
    }

    function onClick(e) {
        e.mesh.glui._onClick({
            action: e.action,
            object: e.mesh.glui
        })
    }
    this.add = function(obj, camera = World.CAMERA) {
        Interaction3D.find(camera).add(obj.mesh || obj, onHover, onClick)
    }, this.remove = function(group, camera = World.CAMERA) {
        Interaction3D.find(camera).remove(obj.mesh || obj)
    }
})), Class((function GLUICornerPin($obj) {
    Inherit(this, Component);
    const _this = this;
    var _geom, _vertices, _last;

    function loop() {
        _vertices[0] = _this.tl.x, _vertices[1] = -_this.tl.y, _vertices[3] = _vertices[9] = _this.bl.x, _vertices[4] = _vertices[10] = -_this.bl.y, _vertices[6] = _vertices[15] = _this.tr.x, _vertices[7] = _vertices[16] = -_this.tr.y, _vertices[12] = _this.br.x, _vertices[13] = -_this.br.y,
            function dirty() {
                let a = _vertices,
                    b = _last;
                for (let i = a.length - 1; i > -1; i--)
                    if (a[i] != b[i]) return !0;
                return !1
            }() && (_geom.attributes.position.needsUpdate = !0), _last.set(_vertices)
    }
    this.tl = new Vector2(0, 0), this.tr = new Vector2($obj.width, 0), this.bl = new Vector2(0, $obj.height), this.br = new Vector2($obj.width, $obj.height),
        function initGeometry() {
            _geom = $obj.mesh.geometry.toNonIndexed(), $obj.useGeometry(_geom), $obj.mesh.scale.set(1, 1, 1), _vertices = _geom.attributes.position.array, _last = new Float32Array(_vertices)
        }(), _this.startRender(loop), this.update = function() {
            this.tl.set(0, 0), this.tr.set($obj.width, 0), this.bl.set(0, $obj.height), this.br.set($obj.width, $obj.height)
        }, this.tween = function(type, val, time, ease, delay) {
            return val = val instanceof Vector2 ? val : new Vector2(val.x, val.y), tween(_this[type], val, time, ease, delay)
        }
}));
class GLUIObject {
    constructor(width, height, map) {
        let shader = this.textureShader = new Shader("GLUIObject", {
            tMap: {
                value: null
            },
            uAlpha: {
                type: "f",
                value: 1
            },
            transparent: !0,
            depthTest: !1
        });
        shader.persists = !0, map || (shader.visible = !1), this.usingMap = null != map && "empty" != map && "" != map, this.tMap = shader.uniforms.tMap, this.group = new Group, this.alpha = 1, this._x = 0, this._y = 0, this._z = 0, this._scaleX = 1, this._scaleY = 1, this._scale = 1, this._rotation = 0, this.multiTween = !0, this.children = [], this.dimensions = new Vector3(width, height, 1), this._shader = shader, this.mesh = new Mesh(GLUIObject.getGeometry("2d"), shader), this.mesh.glui = this, this.group.add(this.mesh), window.GLSEO && GLSEO.objectNode(this), this.bg("string" == typeof map ? map.includes(["#", "0x"]) ? map : "empty" === map || "" === map ? null : Utils3D.getTexture(map, {
            premultiplyAlpha: !1
        }) : map);
        const _this = this;
        this.mesh.onBeforeRender = _ => {
            if (!_this.mesh.determineVisible() && !_this.firstRender) return;
            let alpha = _this.getAlpha();
            if (_this.mesh.shader.uniforms.uAlpha && (_this.mesh.shader.uniforms.uAlpha.value = alpha), _this.usingMap) {
                if (0 == alpha) return void(_this.mesh.shader.visible = !1);
                _this.mesh.shader.visible = !0
            }
            if (!_this.isDirty && _this.firstRender) return;
            RenderStats.active && RenderStats.update("GLUIObject", 1, _this.mesh.shader.vsName + "|" + _this.mesh.shader.fsName, _this.mesh), _this.group.position.x = _this._x, _this.group.position.y = _this._3d ? _this._y : -_this._y, _this.group.position.z = _this._z, 1 != _this.scale && (_this.group.position.x += (_this.dimensions.x - _this.dimensions.x * _this.scale) / 2, _this.group.position.y -= (_this.dimensions.y - _this.dimensions.y * _this.scale) / 2);
            _this.mesh.shader;
            if (_this.calcMask) {
                let v = _this.isMasked;
                v.copy(v.origin), _this.group.localToWorld(v), v.z = v.width, v.w = v.height
            }
            map ? _this.corners || (_this.mesh.scale.set(1, 1, 1).multiply(_this.dimensions), _this.group.scale.x = _this._scaleX * _this._scale, _this.group.scale.y = _this._scaleY * _this._scale) : _this.group.scale.set(_this._scaleX * _this._scale, _this._scaleY * _this._scale, 1), _this._3d || (_this.group.rotation.z = Math.radians(_this._rotation)), _this.anchor && _this.anchor._parent ? (_this.anchor.position.copy(_this.group.position), _this.anchor.scale.copy(_this.group.scale), _this.anchor.quaternion.setFromEuler(_this._rotation), _this.anchor.isDirty = !0) : (_this.group.quaternion.setFromEuler(_this._rotation), _this.group.matrixDirty = !0), _this.firstRender || (_this.group.updateMatrixWorld(!0), _this.firstRender = !0), _this.isDirty = !1
        }, _this.isDirty = !0
    }
    get width() {
        return this.dimensions.x
    }
    set width(w) {
        this.dimensions.x = w, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get height() {
        return this.dimensions.y
    }
    set height(h) {
        this.dimensions.y = h, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get x() {
        return this._x
    }
    set x(v) {
        this._x = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get y() {
        return this._y
    }
    set y(v) {
        this._y = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get z() {
        return this._z
    }
    set z(v) {
        this._z = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get scale() {
        return this._scale
    }
    set scale(v) {
        this._scale = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get scaleX() {
        return this._scaleX
    }
    set scaleX(v) {
        this._scaleX = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get scaleY() {
        return this._scaleY
    }
    set scaleY(v) {
        this._scaleY = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    get rotation() {
        return this._rotation
    }
    set rotation(v) {
        this._rotation = v, this.isDirty = !0, this.__internalDirty && this.__internalDirty()
    }
    style(props) {
        for (let prop in props) void 0 !== this[prop] && (this[prop] = props[prop]);
        return this
    }
    size(w, h) {
        return this.width = w, this.height = h, this.corners && this.corners.update(), this
    }
    add($obj) {
        return $obj.parent = this, this.group.add($obj.group), this.children.push($obj), this.isMasked && $obj.mask(this.isMasked, this.maskShader), this._3d && !$obj._3d && $obj.enable3D(), this.deferred && ($obj.deferRender(!0), $obj.anchor && this.anchor && this.anchor.add($obj.anchor)), this
    }
    interact(over, click, camera = World.CAMERA, url, label) {
        "string" == typeof camera && (label = url, url = camera, camera = World.CAMERA), this._onOver = over, this._onClick = click, this._interactCamera = camera;
        let stage = this._3d ? GLUI.Scene : GLUI.Stage;
        if (over ? stage.interaction.add(this, camera) : stage.interaction.remove(this, camera), "string" == typeof url && "string" == typeof label) {
            const _this = this;
            defer(_ => {
                !_this.seo && window.GLSEO && GLSEO.objectNode(_this), _this.seo && _this.seo.aLink(url, label)
            })
        }
        return this
    }
    clearInteract() {
        if (this._onOver) {
            (this._3d ? GLUI.Scene : GLUI.Stage).interaction.remove(this, this._interactCamera), this._onClick = GLUIObject.noop, this._onOver = GLUIObject.noop
        }
        return this
    }
    remove() {
        this.children.forEach(child => child.remove()), this.clearInteract(), this.parent && (this.parent.children ? this.parent.children.remove(this) : GLUI.Stage.remove(this)), this.mesh.parent ? this.group.parent.remove(this.group) : this._3d ? GLUI.Scene.remove(this) : GLUI.Stage.remove(this);
        let textureShader = this.textureShader;
        for (let key in textureShader.uniforms) {
            let uniform = textureShader.uniforms[key];
            uniform && uniform.value && uniform.value.destroy && uniform.value.destroy()
        }
    }
    create(width, height, map) {
        let $obj = $gl(width, height, map);
        return this.add($obj), this._3d && $obj.enable3D(), $obj
    }
    removeChild(obj) {
        return this.group.remove(obj.group), this
    }
    tween(obj, time, ease, delay) {
        return tween(this, obj, time, ease, delay)
    }
    enable3D(style2d) {
        this._3d = !0, this.mesh.geometry = GLUIObject.getGeometry(style2d ? "2d" : "3d"), this.mesh.shader.depthTest = !0, this._rotation = new Euler;
        const _this = this;
        return _this._rotation.onChange(_ => {
            _this.isDirty = !0
        }), this
    }
    loaded() {
        return !0
    }
    setZ(z) {
        return this.mesh.renderOrder = z, this
    }
    bg(path) {
        if (void 0 !== path) return "string" == typeof path ? path.includes(["#", "0x"]) ? (this.colorShader || (this.colorShader = new Shader("GLUIColor", {
            transparent: !0,
            uAlpha: {
                type: "f",
                value: 1
            },
            uColor: {
                value: new Color(path)
            }
        })), this.colorShader.set("uColor", new Color(path)), this._shader != this.colorShader && this.useShader(this.colorShader)) : (this.textureShader.uniforms.tMap.value = Utils3D.getTexture(path, {
            premultiplyAlpha: !1
        }), this._shader != this.textureShader && this.useShader(this.textureShader)) : this._shader.uniforms.tMap.value = path, this
    }
    show() {
        return this.group.matrixDirty = !0, this.mesh.matrixDirty = !0, this.group.visible = !0, this
    }
    hide() {
        return this.group.visible = !1, this
    }
    useShader(shader) {
        return shader && (shader != this.textureShader && shader != this.colorShader && (shader.uniforms.tMap = this.mesh.shader.uniforms.tMap, shader.uniforms.uAlpha = this.mesh.shader.uniforms.uAlpha), shader.depthTest = !1, shader.transparent = !0), this._shader = shader, this.mesh.shader = shader || this._shader, this
    }
    depthTest(bool) {
        this.mesh.shader.depthTest = bool
    }
    useGeometry(geom) {
        return this.mesh.geometry = geom, this
    }
    updateMap(src) {
        this._shader.uniforms.tMap.value = "string" == typeof src ? Utils3D.getTexture(src) : src
    }
    mask(d, shaderName) {
        var v;
        if (d instanceof Vector4 ? (this.isMasked = !0, v = d) : ((v = new Vector4(d.x, d.y, 0, 1)).origin = (new Vector4).copy(v), v.width = d.width, v.height = d.height, this.calcMask = !0, this.isMasked = v), this.maskShader = shaderName, this.usingMap) {
            let shader = new Shader(shaderName || "GLUIObjectMask", {
                tMap: this.tMap,
                uAlpha: {
                    value: 1
                },
                mask: {
                    type: "v4",
                    value: v
                },
                transparent: !0,
                depthWrite: !1,
                depthTest: !1
            });
            this.useShader(shader)
        }
        return this.group.traverse(obj => {
            obj.glui && obj.glui != this && obj.glui.mask(v, shaderName)
        }), v
    }
    deferRender(parent) {
        this.deferred = !0, parent || (this.anchor = new Group, GLUI.Scene.addDeferred(this))
    }
    clearTween() {
        return this._mathTweens && this._mathTweens.forEach(t => {
            t.tween.stop()
        }), this
    }
    createCorners() {
        this.corners = new GLUICornerPin(this)
    }
    getAlpha() {
        if (this._gluiParent) {
            let alpha = this._gluiParent.getAlpha();
            return this.alpha = alpha, alpha
        }
        let alpha = this.alpha,
            $parent = this.parent;
        for (; $parent;) alpha *= $parent.alpha, $parent = $parent.parent;
        return alpha
    }
    get shader() {
        return this._shader
    }
    _divFocus() {
        this._onOver && this._onOver({
            action: "over",
            object: this
        }), this.onDivFocus && this.onDivFocus()
    }
    _divBlur() {
        this._onOver && this._onOver({
            action: "out",
            object: this
        }), this.onDivBlur && this.onDivBlur()
    }
    _divSelect() {
        this._onClick && this._onClick({
            action: "click",
            object: this
        }), this.onDivBlurSelect && this.onDivSelect()
    }
    get _parent() {
        return this.parent
    }
}! function() {
    var _geom2d, _geom3d;
    GLUIObject.getGeometry = function(type) {
        return "2d" == type ? (_geom2d || (_geom2d = new PlaneGeometry(1, 1)).applyMatrix((new Matrix4).makeTranslation(.5, -.5, 0)), _geom2d) : (_geom3d || (_geom3d = World.PLANE), _geom3d)
    }, GLUIObject.clear = function() {
        _geom2d = _geom3d = null
    }, GLUIObject.noop = _ => {}
}();
class GLUIText {
    constructor(text, fontName, fontSize, options = {}) {
        options.font = fontName || options.font, options.text = text, options.width = options.width, options.align = options.align || "left", options.size = fontSize || options.size, options.lineHeight = options.lineHeight, options.letterSpacing = options.letterSpacing, options.wordSpacing = options.wordSpacing, options.wordBreak = options.wordBreak, options.langBreak = options.langBreak, options.color = new Color(options.color), this.text = new GLText(options), this.group = new Group, this.alpha = 1, this._x = 0, this._y = 0, this._z = 0, this._scaleX = 1, this._scaleY = 1, this._scale = 1, this._rotation = 0, this.multiTween = !0;
        const _this = this;
        defer(_ => text && _this.seoText(text)), this.text.ready().then(_ => {
            let mesh = _this.text.mesh;
            mesh.glui = _this, mesh.shader.visible = !1, _this.mesh = mesh, _this.group.add(mesh), _this._3d && !_this._style2d && _this.text.centerY(), _this._3d || (_this.text.mesh.shader.depthTest = !1), mesh.onBeforeRender = _ => {
                if (!mesh.determineVisible() && !_this.firstRender) return;
                let alpha = _this.getAlpha();
                mesh.shader.uniforms.uAlpha && (mesh.shader.uniforms.uAlpha.value = alpha), 0 != alpha ? (mesh.shader.visible = !0, !_this.isDirty && _this.firstRender || (RenderStats.active && RenderStats.update("GLUIText", 1, mesh.shader.vsName + "|" + mesh.shader.fsName, mesh), _this.group.position.x = _this._x, _this.group.position.y = _this._3d ? _this._y : -_this._y, _this.group.position.z = _this._z, _this.group.scale.set(_this._scaleX * _this._scale, _this._scaleY * _this._scale, 1), _this._3d ? _this.anchor && _this.anchor._parent ? (_this.anchor.position.copy(_this.group.position), _this.anchor.scale.copy(_this.group.scale), _this.anchor.quaternion.setFromEuler(_this._rotation)) : _this.group.quaternion.setFromEuler(_this._rotation) : _this.group.rotation.z = Math.radians(_this._rotation), _this.firstRender || (_this.group.updateMatrixWorld(!0), _this.firstRender = !0, mesh.shader.visible = !0), _this.onInternalUpdate && _this.onInternalUpdate(), _this.isDirty = !1)) : mesh.shader.visible = !1
            }
        })
    }
    get x() {
        return this._x
    }
    set x(v) {
        this._x = v, this.isDirty = !0
    }
    get y() {
        return this._y
    }
    set y(v) {
        this._y = v, this.isDirty = !0
    }
    get z() {
        return this._z
    }
    set z(v) {
        this._z = v, this.isDirty = !0
    }
    get scale() {
        return this._scale
    }
    set scale(v) {
        this._scale = v, this.isDirty = !0
    }
    get scaleX() {
        return this._scaleX
    }
    set scaleX(v) {
        this._scaleX = v, this.isDirty = !0
    }
    get scaleY() {
        return this._scaleY
    }
    set scaleY(v) {
        this._scaleY = v, this.isDirty = !0
    }
    get rotation() {
        return this._rotation
    }
    set rotation(v) {
        this._rotation = v, this.isDirty = !0
    }
    get dimensions() {
        return this._dimensions || (this._dimensions = {}), this.text && this.text.geometry && !this._dimensions.max && (this._dimensions = this.text.geometry.boundingBox, this._dimensions.width = Math.abs(this._dimensions.min.x - this._dimensions.max.x), this._dimensions.height = Math.abs(this._dimensions.min.y - this._dimensions.max.y)), this._dimensions
    }
    interact(over, click, camera = World.CAMERA, seoLink) {
        "string" == typeof camera && (seoLink = camera, camera = World.CAMERA), this._onOver = over, this._onClick = click, this._interactCamera = camera;
        let stage = this._3d ? GLUI.Scene : GLUI.Stage;
        const _this = this;
        return _this.text.ready().then(_ => {
            if (over) {
                if (_this.text.geometry.boundingBox || _this.text.geometry.computeBoundingBox(), !_this.hitArea) {
                    let bb = _this.text.geometry.boundingBox,
                        shader = Utils3D.getTestShader();
                    if (shader.visible = !1, _this.hitArea = new Mesh(World.PLANE, shader), _this.hitArea.glui = _this, _this.hitArea.scale.set(Math.abs(bb.min.x) + Math.abs(bb.max.x), Math.abs(bb.min.y) + Math.abs(bb.max.y), 1), _this._3d && !_this._style2d || (_this.hitArea.position.x = (bb.max.x - bb.min.x) / 2), _this.hitArea.position.y = (bb.min.y - bb.max.y) / 2, _this._3d) switch (_this.text.getData().align) {
                        case "center":
                            _this.hitArea.position.x = 0;
                            break;
                        case "right":
                            _this.hitArea.position.x = (bb.min.x - bb.max.x) / 2
                    } else switch (_this.text.getData().align) {
                        case "center":
                            _this.hitArea.position.x = 0;
                            break;
                        case "right":
                            _this.hitArea.position.x = -(bb.max.x - bb.min.x) / 2
                    }
                    _this.text.mesh.add(_this.hitArea)
                }
                stage.interaction.add(_this.hitArea, camera)
            } else stage.interaction.remove(_this.hitArea, camera)
        }), defer(_ => {
            seoLink && _this.seo && _this.seo.aLink(seoLink)
        }), this
    }
    clearInteract() {
        if (this._onOver) {
            (this._3d ? GLUI.Scene : GLUI.Stage).interaction.remove(this.hitArea, this._interactCamera), this._onClick = GLUIObject.noop, this._onOver = GLUIObject.noop
        }
        return this
    }
    remove() {
        let stage = this._3d ? GLUI.Scene : GLUI.Stage;
        this.mesh && this.mesh.parent ? this.group.parent.remove(this.group) : stage.remove(this), this.hitArea && stage.interaction.remove(this.hitArea, this._interactCamera), this.text && this.text.destroy && this.text.destroy(), Utils.nullObject(this.mesh), Utils.nullObject(this)
    }
    tween(obj, time, ease, delay) {
        return tween(this, obj, time, ease, delay)
    }
    enable3D(style2d) {
        this._3d = !0, this._style2d = style2d, this._rotation = new Euler;
        const _this = this;
        return _this._rotation.onChange(_ => {
            _this.isDirty = !0
        }), _this.text.ready().then(_ => {
            _this.text.mesh.shader.depthTest = !0
        }), _this.isDirty = !0, this
    }
    depthTest(bool) {
        const _this = this;
        return _this.text.ready().then(_ => {
            _this.text.mesh.shader.depthTest = bool
        }), this
    }
    setZ(z) {
        const _this = this;
        return _this.text.ready().then(_ => {
            _this.text.mesh.renderOrder = z
        }), this
    }
    height() {
        return this.mesh ? this.text.height : 0
    }
    setText(text, options) {
        text && (text = text.toString(), this.seoText(text));
        const _this = this;
        return this._dimensions = null, _this.text.ready().then(_ => _this.text.setText(text, options)), this
    }
    seoText(text) {
        window.GLSEO && GLSEO.textNode(this, text)
    }
    getTextString() {
        return this.text.string
    }
    setColor(color) {
        const _this = this;
        return _this.text.ready().then(_ => _this.text.setColor(color)), this
    }
    tweenColor(color, time, ease, delay) {
        const _this = this;
        return _this.text.ready().then(_ => _this.text.tweenColor(color, time, ease, delay)), this
    }
    resize(options) {
        const _this = this;
        _this.text.ready().then(_ => _this.text.resize(options))
    }
    show() {
        return this.text.ready().then(_ => {
            this.text.mesh.visible = !0, this.text.mesh.updateMatrixWorld(!0)
        }), this
    }
    hide() {
        const _this = this;
        return _this.text.ready().then(_ => _this.text.mesh.visible = !1), this
    }
    loaded() {
        return this.text.ready()
    }
    length() {
        return this.text.charLength
    }
    deferRender(parent) {
        this.deferred = !0, parent || (this.anchor || (this.anchor = new Group), GLUI.Scene.addDeferred(this))
    }
    getAlpha() {
        if (this._gluiParent) {
            let alpha = this._gluiParent.getAlpha();
            return this.alpha = alpha, alpha
        }
        let alpha = this.alpha,
            $parent = this.parent;
        for (; $parent;) alpha *= $parent.alpha, $parent = $parent.parent;
        return alpha
    }
    size() {}
    upload() {
        const _this = this;
        return _this.text.ready().then(_ => _this.text.mesh.upload()), this
    }
    _divFocus() {
        this._onOver && this._onOver({
            action: "over",
            object: this
        }), this.onDivFocus && this.onDivFocus()
    }
    _divBlur() {
        this._onOver && this._onOver({
            action: "out",
            object: this
        }), this.onDivBlur && this.onDivBlur()
    }
    _divSelect() {
        this._onClick && this._onClick({
            action: "click",
            object: this
        }), this.onDivBlurSelect && this.onDivSelect()
    }
    get _parent() {
        return this.parent
    }
    async useShader(shader) {
        await this.text.ready(), shader.uniforms.tMap = this.text.shader.uniforms.tMap, shader.uniforms.uAlpha = this.text.shader.uniforms.uAlpha, shader.uniforms.uColor = this.text.shader.uniforms.uColor, shader.transparent = !0, (!this._3d || this._3d || this.parent) && (shader.depthTest = !1), this.text.mesh.shader = shader || text.shader
    }
}
Class((function GLUIStage() {
    Inherit(this, Component);
    const _this = this;
    var _scene = new Scene,
        _camera = new OrthographicCamera(1, 1, 1, 1, .1, 1);

    function resizeHandler() {
        _camera.left = Stage.width / -2, _camera.right = Stage.width / 2, _camera.top = Stage.height / 2, _camera.bottom = Stage.height / -2, _camera.near = .01, _camera.far = 1e3, _camera.updateProjectionMatrix(), _camera.position.x = Stage.width / 2, _camera.position.y = -Stage.height / 2
    }
    this.interaction = new GLUIStageInteraction2D(_camera, _scene, Stage), this.alpha = 1, this.scene = _scene, _scene.disableAutoSort = !0, _camera.position.z = 1,
        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }(), resizeHandler(), this.add = function($obj) {
            $obj.parent = _this, _scene.add($obj.group || $obj.mesh)
        }, this.remove = function($obj) {
            $obj.parent = null, _scene.remove($obj.group)
        }, this.clear = function() {
            _scene.traverse(obj => {
                obj.geometry && obj.shader && obj.destroy()
            }), _scene.children.length = _scene.childrenLength = 0
        }, this.renderToRT = function(scene, rt) {
            let clearAlpha;
            rt.fxscene && rt.fxscene.clearAlpha > -1 && (clearAlpha = World.RENDERER.getClearAlpha(), World.RENDERER.setClearAlpha(0));
            let autoClear = World.RENDERER.autoClear;
            World.RENDERER.autoClear = !1, World.RENDERER.render(scene, _camera, rt), World.RENDERER.autoClear = autoClear, clearAlpha && World.RENDERER.setClearAlpha(clearAlpha)
        }, this.render = function loop() {
            if (!_scene.children.length) return;
            let clear = World.RENDERER.autoClear;
            World.RENDERER.autoClear = !1, World.RENDERER.render(_scene, _camera, null, !0), World.RENDERER.autoClear = clear
        }, this.renderDirect = callback => {
            _scene.children.length && (_scene.traverse(obj => {
                obj.shader && (obj.shader.depthTest = !1)
            }), callback(_scene, _camera))
        }
})), Class((function GLUIStage3D() {
    Inherit(this, Object3D);
    const _this = this;
    var _camera, _externalRenders = [],
        _scene = new Scene,
        _list = new LinkedList;
    this.alpha = 1, this.interaction = new GLUIStageInteraction3D, this.add = function(obj, parent) {
        obj.parent = _this, obj._gluiParent = parent, obj._3d || obj.enable3D(), obj.deferRender()
    }, this.clear = function() {
        _scene.traverse(obj => {
            obj.geometry && obj.shader && obj.destroy()
        }), _scene.children.length = _scene.childrenLength = 0
    }, this.addDeferred = function(obj) {
        _list.push(obj), _scene.add(obj.group || obj.mesh)
    }, this.remove = function(obj) {
        _scene.remove(obj.group || obj.mesh), _list.remove(obj)
    }, this.disableAutoSort = function() {
        _scene.disableAutoSort = !0
    }, this.renderToRT = function(scene, camera) {
        camera = camera.camera || camera, scene.traverse(mesh => {
            let obj = mesh.glui;
            obj && obj.anchor.determineVisible() && Utils3D.decompose(obj.anchor, obj.group)
        }), scene._textRenderCamera = camera, _externalRenders.push(scene)
    }, this.renderToRT2 = function(scene, rt, camera) {
        let clearAlpha;
        rt.fxscene && rt.fxscene.clearAlpha > -1 && (clearAlpha = World.RENDERER.getClearAlpha(), World.RENDERER.setClearAlpha(0));
        let autoClear = World.RENDERER.autoClear;
        World.RENDERER.autoClear = !1, World.RENDERER.render(scene, camera, rt), World.RENDERER.autoClear = autoClear, clearAlpha && World.RENDERER.setClearAlpha(clearAlpha)
    }, this.render = function loop() {
        if (!window.Metal) {
            if (_list.length) {
                let obj = _list.start();
                for (; obj;) obj._marked && (obj._marked = !1, Utils3D.decompose(obj.anchor, obj.group)), obj = _list.next();
                let clear = World.RENDERER.autoClear;
                Renderer.context.clear(Renderer.context.DEPTH_BUFFER_BIT), World.RENDERER.autoClear = !1, World.RENDERER.render(_scene, _camera || World.CAMERA), World.RENDERER.autoClear = clear
            }
            if (_externalRenders.length)
                for (; _externalRenders.length;) {
                    let scene = _externalRenders.shift(),
                        camera = scene._textRenderCamera,
                        clear = World.RENDERER.autoClear;
                    Renderer.context.clear(Renderer.context.DEPTH_BUFFER_BIT), World.RENDERER.autoClear = !1, World.RENDERER.render(scene, camera), World.RENDERER.autoClear = clear
                }
        }
    }, this.mark = function mark() {
        let obj = _list.start();
        for (; obj;) obj.anchor._parent && (obj.group.visible = obj.anchor.determineVisible()), obj.mesh && obj.mesh.determineVisible() && obj.anchor._parent && (obj._marked = !0), obj = _list.next()
    }, this.renderDirect = function(callback) {
        if (_list.length) {
            let obj = _list.start();
            for (; obj;) obj._marked && (obj._marked = !1, Utils3D.decompose(obj.anchor, obj.group)), obj = _list.next();
            _scene.traverse(obj => {
                obj.shader && (obj.shader.depthTest = !1)
            }), callback(_scene, _camera || World.CAMERA)
        }
    }, this.set("camera", c => {
        _camera = c.camera || c
    })
})), Class((function GPU() {
    Inherit(this, Component);
    var _this = this,
        _split = {};
    Hydra.ready(async () => {
        for (var key in _this.detect = function(match) {
                if (Device.graphics.gpu) return Device.graphics.gpu.detect(match)
            }, _this.detectAll = function() {
                if (Device.graphics.gpu) {
                    for (var match = !0, i = 0; i < arguments.length; i++) Device.graphics.gpu.detect(arguments[i]) || (match = !1);
                    return match
                }
            }, _this.matchGPU = function(str, min, max = 99999) {
                let num = function splitGPU(string) {
                    if (_split[string]) return _split[string];
                    if (!_this.detect(string)) return -1;
                    try {
                        var num = Number(_this.gpu.split(string)[1].split(" ")[0]);
                        return _split[string] = num, num
                    } catch (e) {
                        return -1
                    }
                }(str);
                return num >= min && num < max
            }, _this.gpu = Device.graphics.gpu ? Device.graphics.gpu.identifier : "", "ios" == Device.system.os && "apple gpu" == _this.gpu && require("iOSGPUTest")(), _this.BLACKLIST = require("GPUBlacklist").match(), _this.T0 = !(Device.mobile || !_this.BLACKLIST && !_this.detect("radeon(tm) r5") && !_this.detect("hd graphics family") && !_this.matchGPU("hd graphics ", 1e3, 5001) && !(_this.matchGPU("hd graphics ", 0, 618) && Device.pixelRatio > 1) && !(_this.detect(["hd graphics", "iris"]) && Math.max(Stage.width, Stage.height) > 1800) && "intel iris opengl engine" !== _this.gpu.toLowerCase() && !_this.matchGPU("iris(tm) graphics ", 1e3)), _this.T1 = !(_this.BLACKLIST || Device.mobile || _this.T0 || !_this.matchGPU("iris(tm) graphics ", 540, 1e3) && !_this.matchGPU("hd graphics ", 514, 1e3) && _this.detect(["nvidia", "amd", "radeon", "geforce"])), _this.T2 = !_this.BLACKLIST && !Device.mobile && !(!_this.detect(["nvidia", "amd", "radeon", "geforce"]) || _this.T1 || _this.T0), _this.T3 = !(_this.BLACKLIST || Device.mobile || !_this.detect(["titan", "amd radeon pro", "quadro"]) && !_this.matchGPU("gtx ", 940) && !_this.matchGPU("radeon (tm) rx ", 400) && !_this.matchGPU("radeon rx ", 400) && !_this.matchGPU("radeon pro ", 420)), _this.T4 = !(_this.BLACKLIST || Device.mobile || !_this.detect(["titan", "quadro", "radeon vii"]) && !_this.matchGPU("gtx ", 1040) && !_this.matchGPU("rtx") && !_this.matchGPU("radeon rx ", 500) && !_this.matchGPU("vega ", 50)), _this.T5 = !(_this.BLACKLIST || Device.mobile || !_this.detect(["titan", "radeon vii"]) && !_this.matchGPU("gtx ", 1080) && !_this.matchGPU("rtx ", 2060)), _this.MT0 = !!Device.mobile && (!!_this.BLACKLIST || !("ios" != Device.system.os || !_this.detect("a7")) || !("android" != Device.system.os || !_this.detect("sgx")) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 0, 415) : !!_this.detect("mali") && _this.matchGPU("mali-t", 0, 628))), _this.MT1 = !(!Device.mobile || _this.BLACKLIST || ("ios" != Device.system.os || !_this.detect(["a8", "a9"])) && ("android" != Device.system.os || _this.MT0)), _this.MT2 = function() {
                if (!Device.mobile) return !1;
                if (_this.BLACKLIST) return !1;
                if ("ios" == Device.system.os && _this.detect("a10")) return !0;
                if (_this.detect("nvidia tegra") && Device.detect("pixel c")) return !0;
                if (_this.detect("mali-g")) return _this.matchGPU("mali-g", 71);
                if (_this.detect("adreno")) {
                    if (_this.matchGPU("adreno (tm) ", 600, 616)) return !0;
                    if (_this.matchGPU("adreno (tm) ", 420)) return !0
                }
                return !!_this.detect("mali-g")
            }(), _this.MT3 = !!Device.mobile && !_this.BLACKLIST && (!("ios" != Device.system.os || !_this.detect(["a11", "a12"])) || !!_this.matchGPU("adreno (tm) ", 530, 600) || (_this.detect("mali-g") ? _this.matchGPU("mali-g", 71) : !(!navigator.platform.toLowerCase().includes(["mac", "windows"]) || "chrome" != Device.system.browser))), _this.MT4 = !!Device.mobile && !_this.BLACKLIST && (!("ios" != Device.system.os || !_this.detect(["a13", "a14", "a15", "a16", "a17", "a18"])) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 630) : !(!navigator.platform.toLowerCase().includes(["mac", "windows"]) || "chrome" != Device.system.browser))), _this.lt = function(num) {
                return _this.TIER > -1 && _this.TIER <= num
            }, _this.gt = function(num) {
                return _this.TIER > -1 && _this.TIER >= num
            }, _this.eq = function(num) {
                return _this.TIER > -1 && _this.TIER == num
            }, _this.mobileEq = function(num) {
                return _this.M_TIER > -1 && _this.M_TIER == num
            }, _this.mobileLT = function(num) {
                return _this.M_TIER > -1 && _this.M_TIER <= num
            }, _this.mobileGT = function(num) {
                return _this.M_TIER > -1 && _this.M_TIER >= num
            }, _this) "T" == key.charAt(0) && !0 === _this[key] && (_this.TIER = Number(key.charAt(1))), "MT" == key.slice(0, 2) && !0 === _this[key] && (_this.M_TIER = Number(key.charAt(2)));
        !1 !== Utils.query("gpu") && (Device.mobile || Utils.query("gpu").toString().includes("m") ? (_this.TIER = -1, _this.M_TIER = Number(Utils.query("gpu").slice(1))) : _this.TIER = Number(Utils.query("gpu"))), _this.OVERSIZED = !Device.mobile && _this.TIER < 2 && Math.max(window.innerWidth, window.innerHeight) > 1500, "ie" == Device.system.browser && (_this.OVERSIZED = !0), _this.initialized = !0
    }), this.ready = function() {
        return this.wait("initialized")
    }
}), "static"), Module((function iOSGPUTest() {
    function test() {
        let results = [];

        function getPrime() {
            return function largest_prime_factor(n) {
                return factors(n).filter(primep).pop()
            }(1e11)
        }

        function factors(n) {
            var i, out = [],
                sqrt_n = Math.sqrt(n);
            for (i = 2; i <= sqrt_n; i++) n % i == 0 && out.push(i);
            return out
        }

        function primep(n) {
            return 0 === factors(n).length
        }
        for (let i = 0; i < 3; i++) {
            let time = performance.now();
            getPrime(), results.push(10 * (performance.now() - time))
        }
        return results.sort((a, b) => a - b), results[0]
    }
    this.exports = function() {
        let res = Math.min(screen.width, screen.height) + "x" + Math.max(screen.width, screen.height),
            time = test();
        switch (res) {
            case "320x480":
                Device.graphics.webgl.gpu = "legacy";
                break;
            case "320x568":
                Device.graphics.webgl.gpu = time <= 400 ? "apple a8" : time <= 500 ? "apple a7" : "legacy";
                break;
            case "375x812":
            case "414x896":
                Device.graphics.webgl.gpu = time <= 160 ? "apple a13" : time <= 180 ? "apple a12" : "apple a11";
                break;
            default:
            case "414x736":
            case "375x667":
            case "768x1024":
                Device.graphics.webgl.gpu = time <= 160 ? "apple a13" : time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : time <= 250 ? "apple a10" : time <= 360 ? "apple a9" : time <= 400 ? "apple a8" : time <= 600 ? "apple a7" : "legacy";
                break;
            case "834x1112":
                Device.graphics.webgl.gpu = time <= 160 ? "apple a13" : time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : "apple a10";
                break;
            case "834x1194":
                Device.graphics.webgl.gpu = "apple a12";
                break;
            case "1024x1366":
                Device.graphics.webgl.gpu = time <= 160 ? "apple a13" : time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : time <= 250 ? "apple a10" : "apple a9"
        }
    }
})), Module((function GPUBlacklist() {
    this.exports = {
        match: function() {
            return !Device.graphics.gpu || Device.graphics.gpu.detect(["radeon hd 6970m", "radeon hd 6770m", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 5750", "radeon hd 5670", "radeon hd 4850", "radeon hd 4870", "radeon hd 4670", "geforce 9400m", "geforce 320m", "geforce 330m", "geforce gt 130", "geforce gt 120", "geforce gtx 285", "geforce 8600", "geforce 9600m", "geforce 9400m", "geforce 8800 gs", "geforce 8800 gt", "quadro fx 5", "quadro fx 4", "radeon hd 2600", "radeon hd 2400", "radeon hd 2600", "radeon r9 200", "mali-4", "mali-3", "mali-2", "google swiftshader", "sgx543", "legacy", "sgx 543"])
        }
    }
})), Class((function Initializer3D() {
    Inherit(this, Component);
    const _this = this;
    let _loader, _working, _promises = [],
        _queue = [];
    async function resolve() {
        await Promise.all(_promises), clearTimeout(_this.fire), _this.fire = _this.delayedCall(_ => {
            _this.events.fire(_this.READY), _this.resolved = !0, Utils3D.onTextureCreated = null, _loader && _loader.trigger(50)
        }, 100)
    }
    async function workQueue() {
        clearTimeout(_this.warningTimer), _working = !0;
        let promise = _queue.shift();
        if (!promise) return _working = !1;
        promise.resolve(workQueue), Hydra.LOCAL && (_this.warningTimer = _this.delayedCall(_ => {
            console.warn("Long running queue has taken more than 5 seconds.")
        }, 5e3))
    }

    function incCompleted() {
        _loader && _loader.trigger(1)
    }
    this.READY = "initializer_ready", this.bundle = function() {
        return new function PromiseBundler() {
            const promises = [],
                ready = Promise.create();
            let timer;

            function run() {
                clearTimeout(timer), timer = _this.delayedCall(_ => {
                    Promise.all(promises).then(_ => ready.resolve())
                }, 100)
            }
            this.capture = function(promise) {
                promises.push(promise), run()
            }, this.ready = function() {
                return run(), ready
            }
        }
    }, this.promise = this.capture = function(promise) {
        return _loader && _loader.add(1), promise.then(incCompleted), _promises.push(promise), clearTimeout(_this.timer), _this.timer = _this.delayedCall(resolve, 100), promise
    }, this.ready = this.loaded = function() {
        return _this.wait(_this, "resolved")
    }, this.createWorld = async function() {
        await Promise.all([AssetLoader.waitForLib("zUtils3D"), Shaders.ready(), UILStorage.ready()]), World.instance()
    }, this.linkSceneLayout = function(loader) {
        _this.captureTextures(), SceneLayout.initializer = _this.capture, _loader = loader
    }, this.queue = function(immediate) {
        if (immediate) return Promise.resolve(_ => {});
        let promise = Promise.create();
        return _queue.push(promise), _working || workQueue(), promise
    }, this.captureTextures = function() {
        Utils3D.onTextureCreated = texture => {
            _this.promise(texture.promise)
        }
    }, this.uploadAll = async function(group) {
        if (!group) throw "Undefined passed to uploadAll";
        let sceneLayout;
        if (group instanceof SceneLayout || window.StageLayout && group instanceof StageLayout) {
            if (sceneLayout = group, sceneLayout.uploaded) return;
            sceneLayout.uploaded = !0, await sceneLayout.loadedAllLayers(), group = group.group
        }
        let promises = [],
            layouts = [],
            textures = [];
        sceneLayout && (sceneLayout.textures = textures), group.traverse(obj => {
            if (obj.sceneLayout && obj != group && layouts.push(obj.sceneLayout), obj.stageLayout && obj != group && layouts.push(obj.stageLayout), !obj.uploadIgnore && 0 != obj.visible) {
                if (obj.shader)
                    for (let key in obj.shader.uniforms) {
                        let uniform = obj.shader.uniforms[key];
                        uniform && uniform.value && uniform.value.promise && (textures.push(uniform.value), promises.push(uniform.value.promise.then(_ => uniform.value.upload.bind(uniform.value)).catch(e => {})))
                    }
                obj.asyncPromise ? promises.push(obj.asyncPromise.then(_ => obj.upload.bind(obj))) : obj.upload && obj.upload()
            }
        }), await Promise.catchAll(promises), textures.forEach(t => t.upload());
        for (let i = 0; i < layouts.length; i++) await _this.uploadAll(layouts[i]);
        sceneLayout && sceneLayout._completeInitialization && sceneLayout._completeInitialization(!0)
    }, this.uploadAllDistributed = this.uploadAllAsync = async function(group) {
        if (!group) throw "Undefined passed to uploadAllDistributed";
        let sceneLayout;
        if (group instanceof SceneLayout || window.StageLayout && group instanceof StageLayout) {
            if (sceneLayout = group, sceneLayout.uploaded) return;
            sceneLayout.uploaded = !0, await sceneLayout.loadedAllLayers(), group = group.group
        }
        let uploads = [],
            _async = [],
            promises = [],
            layouts = [],
            textures = [];
        sceneLayout && (sceneLayout.textures = textures), group.traverse(obj => {
            if (obj.sceneLayout && obj != group && layouts.push(obj.sceneLayout), obj.stageLayout && obj != group && layouts.push(obj.stageLayout), !obj.uploadIgnore && 0 != obj.visible) {
                if (obj.shader)
                    for (let key in obj.shader.uniforms) {
                        let uniform = obj.shader.uniforms[key];
                        uniform && uniform.value && uniform.value.promise && (textures.push(uniform.value), promises.push(uniform.value.promise.then(_ => uploads.push(uniform.value.upload.bind(uniform.value))).catch(e => {})))
                    }
                if (obj.asyncPromise) promises.push(obj.asyncPromise.then(_ => {
                    obj.geometry && (obj.geometry.distributeBufferData = !0), uploads.push(obj.upload.bind(obj)), obj.geometry && _async.push(obj.geometry.uploadBuffersAsync.bind(obj.geometry))
                }));
                else if (obj.upload) {
                    if (obj.geometry) {
                        if (obj.geometry.uploaded) return;
                        obj.geometry.distributeBufferData = !0
                    }
                    uploads.push(obj.upload.bind(obj)), obj.geometry && _async.push(obj.geometry.uploadBuffersAsync.bind(obj.geometry))
                }
            }
        });
        let canFinish = !1,
            promise = Promise.create(),
            worker = new Render.Worker(_ => {
                let upload = uploads.shift();
                upload ? upload() : canFinish ? ((async _ => {
                    for (let i = 0; i < _async.length; i++) await _async[i]();
                    for (let i = 0; i < layouts.length; i++) await _this.uploadAllAsync(layouts[i]);
                    promise.resolve()
                })(), worker.stop()) : worker.pause()
            }, 1);
        return Promise.catchAll(promises).then(_ => {
            worker.resume(), canFinish = !0
        }), sceneLayout && sceneLayout._completeInitialization && sceneLayout._completeInitialization(!1), promise
    }, this.detectUploadAll = function(group, sync) {
        return sync ? _this.uploadAll(group) : _this.uploadAllDistributed(group)
    }, this.detectUploadNuke = function(nuke, sync) {
        return sync ? _this.uploadNukeAsync(nuke) : _this.uploadNuke(nuke)
    }, this.uploadNuke = async function(nuke) {
        for (let i = 0; i < nuke.passes.length; i++) {
            let pass = nuke.passes[i],
                uniforms = pass.uniforms;
            for (let key in uniforms) uniforms[key].promise && await uniforms[key].promise, uniforms[key].upload && uniforms[key].upload();
            pass.upload()
        }
    }, this.uploadNukeAsync = function(nuke) {
        return this.uploadNuke(nuke)
    }, this.set("loader", loader => {
        _loader = loader
    })
}), "static"), Class((function Webcam(_width, _height, _audio) {
    Inherit(this, Component);
    var _this = this;
    let _stream, _cameras = {},
        _config = {},
        _back = !1,
        _attempts = 0;

    function establishWebcam() {
        if (_attempts >= 2 || !navigator.mediaDevices) return error();
        (function lookupDevices() {
            let promise = Promise.create();
            return Device.mobile ? (navigator.mediaDevices.enumerateDevices().then(devices => {
                devices.forEach(device => {
                    device.label.includes("front") && (_cameras.front = {
                        deviceId: {
                            exact: device.deviceId
                        }
                    }), device.label.includes("back") && (_cameras.back = {
                        deviceId: {
                            exact: device.deviceId
                        }
                    }, _back = !0)
                }), _cameras.front || (_cameras.front = {
                    facingMode: "user"
                }), _cameras.back || (_cameras.back = {
                    facingMode: "environment"
                }, _back = !1), promise.resolve()
            }), promise) : Promise.resolve()
        })().then(() => {
            _stream && _config.back && _stream.getTracks()[0].stop(), Device.mobile.phone && (_cameras && _cameras.back && (_cameras.back.frameRate = {
                ideal: 60
            }), _cameras && _cameras.front && (_cameras.front.frameRate = {
                ideal: 60
            })), navigator.mediaDevices.getUserMedia({
                video: _config.back ? _cameras.back : _cameras.front || !0,
                audio: _audio
            }).then(success).catch(error)
        }), _attempts += 1
    }

    function success(stream) {
        _this.denied = !1, _stream = stream, _config.back && !_back ? establishWebcam() : (_this.div.srcObject = stream, _this.events.fire(Events.READY, null, !0))
    }

    function error() {
        _this.denied = !0, _this.events.fire(Events.ERROR, null, !0)
    }
    _this.facing = "back",
        function createVideo() {
            _this.div = window.AURA ? document.createElement() : document.createElement("video"), _this.div.width = _width, _this.div.height = _height, _this.div.autoplay = !0, _this.div.controls = !0, _this.div.playsinline = !0, _this.div.setAttribute("playsinline", !0), _this.div.setAttribute("controls", !0), Stage.add(_this.div), _this.element = $(_this.div), _this.element.transformPoint(0, 0).transform({
                scaleX: Device.mobile ? 1 : -1,
                scale: .25
            }).setZ(-1)
        }(),
        function initNavigator() {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
        }(), this.createStream = function(config = {}) {
            _attempts = 0, _config = config, establishWebcam()
        }, this.flip = function() {
            if (!_back) return;
            let direction;
            "front" === _this.facing ? (_this.facing = "back", direction = _cameras.back) : (_this.facing = "front", direction = _cameras.front), _stream.getTracks()[0].stop(), navigator.getUserMedia({
                video: direction || !0,
                audio: _audio
            }, success, error)
        }, this.get("width", (function() {
            return _width
        })), this.get("height", (function() {
            return _height
        })), this.size = function(w, h) {
            _this.div.width = _width = w, _this.div.height = _height = h, _this.element.size(w, h)
        }, this.getPixels = function(width = _width, height = _height) {
            return _this.canvas || (_this.canvas = document.createElement("canvas"), _this.canvas.width = width, _this.canvas.height = height, _this.canvas.context = _this.canvas.getContext("2d")), _this.canvas.context.drawImage(_this.div, 0, 0, width, height), _this.canvas.context.getImageData(0, 0, width, height)
        }, this.getCanvas = function() {
            return _this.canvas || (_this.canvas = document.createElement("canvas"), _this.canvas.width = _width, _this.canvas.height = _height, _this.canvas.context = _this.canvas.getContext("2d")), _this.canvas.context.drawImage(_this.div, 0, 0, _width, _height), _this.canvas
        }, this.ready = function() {
            return _this.div.readyState > 0
        }, this.end = function() {
            _this.active = !1, _this.div.pause(), _stream && (_stream.getTracks()[0].enabled = !1)
        }, this.restart = function() {
            _this.div.play(), _stream && (_stream.getTracks()[0].enabled = !0), _this.active = !0
        }, this.deviceCount = async function(kind) {
            if (!navigator.mediaDevices) return 0;
            let devices = await navigator.mediaDevices.enumerateDevices(),
                count = 0;
            return devices.forEach(d => {
                d.kind.includes(kind) && count++
            }), count
        }
})), Class((function MouseFluid(_params = {
    active: !0
}) {
    Inherit(this, Object3D);
    const _this = this;
    var _fluid;
    this.scale = 1;
    var _scale = 1,
        _last = new Vector2,
        _mouse = new Vector2,
        _white = new Color("#ffffff");

    function loop() {
        if (_scale += .05 * (_this.scale - _scale), _mouse.copy(Mouse), Mouse.x < 2 || Mouse.x > Stage.width - 2) return;
        if (Mouse.y < 2 || Mouse.y > Stage.height - 2) return;
        let len = _mouse.distanceTo(_last),
            size = _this.scaleBasedOnVelocity ? .7 * Math.range(len, 0, 5, 0, 60, !0) : 25,
            delta = Math.range(len, 0, 30, 0, 10, !0);
        len > .01 && _fluid.drawInput(Mouse.x, Mouse.y, (_mouse.x - _last.x) * delta, (_mouse.y - _last.y) * delta, _white, size * _scale), _last.copy(_mouse)
    }
    this.scaleBasedOnVelocity = !0, async function() {
        let layout = _this.initClass(SceneLayout, "mousefluid");
        _fluid = await layout.getLayer("fluid"), _this.flag("fluid", !0), _params.active ? _this.startRender(loop) : _fluid.visible = !1
    }(), this.applyTo = async function(shader) {
        await _this.wait("fluid"), shader.uniforms.tFluid = _fluid.fbos.velocity.uniform, shader.uniforms.tFluidMask = {
            value: _fluid
        }
    }
}), "singleton"), Class((function Performance() {
    Inherit(this, Component);
    var _overrides = Storage.get("performance_override") || {};

    function save(key, value) {
        _overrides[key] = value, Storage.set("performance_override", _overrides)
    }

    function convert(tier) {
        if (GPU.BLACKLIST) return "F";
        switch (tier) {
            case 5:
                return "A++";
            case 4:
                return "A+";
            case 3:
                return "A";
            case 2:
                return "B";
            case 1:
                return "C";
            case 0:
                return "D"
        }
    }!async function() {
        if (Utils.query("performance") && Utils.query("edit") || Utils.query("custom")) {
            await Hydra.ready();
            for (let key in _overrides) Tests[key] = _ => _overrides[key]
        }
    }(), this.displayResults = async function() {
        let editing = Utils.query("edit");
        await GPU.ready(), __body.bg("#000");
        let $results = __body.create("PerformanceResults");
        __body.css({
            overflowY: "scroll"
        }), $results.fontStyle("Arial", 18, "#fff").css({
            marginLeft: 50,
            marginRight: 50,
            "user-select": "auto"
        }), Mobile.allowNativeScroll(), CSS.style(".PerformanceResults *", {
            position: "relative",
            "user-select": "auto"
        });
        Tests.constructor.toString();
        let tests = "";
        for (let key in Tests) {
            let result = Tests[key]();
            tests += `<p><b>${key}:</b> `, editing ? ("number" == typeof result && (tests += `<input class="${key}" value="${result.toString()}" /></p>`), "boolean" == typeof result && (tests += `<input class="${key}" type="checkbox" ${result?"checked":""}/></p>`)) : tests += result + "</p>"
        }
        let html = `<h1>Performance Results</h1>\n                    <p><b>GPU:</b> ${Device.graphics.webgl?Device.graphics.webgl.gpu:"WEBGL UNAVAILABLE"}</p>\n                    <p><b>WebGL Version:</b> ${Device.graphics.webgl?Device.graphics.webgl.version:"WEBGL UNAVAILABLE"}</p>\n                    <p><b>GPU Tier:</b> ${Device.mobile?convert(GPU.M_TIER):convert(GPU.TIER)} [${Device.mobile?GPU.M_TIER:GPU.TIER}]</p>\n                    <p><b>Mobile:</b> ${Device.mobile}</p>\n                    <p><b>User Agent:</b> ${Device.agent}</p>\n                    <p><b>DPR:</b> ${Device.pixelRatio}</p>\n                    <p><b>Screen Size:</b> ${screen.width} x ${screen.height}</p>\n                    <p><b>Stage Size:</b> ${Stage.width} x ${Stage.height}</p>\n                    \n                    <h2>Project-Specific Tests</h2>\n                    ${editing?'<button class="resetBtn">Reset All</button>':""}\n                    ${tests}\n        `;
        if ($results.html(html), editing) {
            await defer(), document.querySelector(".resetBtn").onclick = _ => {
                Storage.set("performance_override", null), location.reload()
            };
            for (let key in Tests) {
                ! function(div, key) {
                    div.onchange = _ => {
                        let value = div.value;
                        value = isNaN(value) ? div.checked : Number(value), save(key, value)
                    }
                }(document.querySelector("." + key), key)
            }
        }
    }
}), "static"), Class((function RenderManager() {
    Inherit(this, Component);
    const _this = this;
    var _dpr = null;

    function resizeHandler() {
        _this.renderer && _this.renderer.setSize(Stage.width, Stage.height)
    }

    function getDPR() {
        return window.AURA ? Device.pixelRatio : GPU.OVERSIZED ? 1 : GPU.lt(0) ? Math.min(1.3, Device.pixelRatio) : GPU.lt(1) ? Math.min(1.8, Device.pixelRatio) : GPU.mobileLT(2) ? Math.min(2, Device.pixelRatio) : GPU.gt(4) ? Math.min(1.5, Device.pixelRatio) : Math.max(1.25, Device.pixelRatio)
    }

    function directRenderCallback(render) {
        window.GLUI && window.Metal && GLUI.renderDirect(render)
    }
    this.NORMAL = "normal", this.MAGIC_WINDOW = "magic_window", this.VR = this.WEBVR = "webvr", this.AR = this.WEBAR = "webar", this.RENDER = "RenderManager_render", this.POST_RENDER = "RenderManager_post_render", this.EYE_RENDER = "RenderManager_eye_render", this.READY = "render_gl_ready", _this.events.sub(Events.RESIZE, resizeHandler), this.get("DPR", v => getDPR()), this.initialize = function(type, params = {}) {
        if (_this.camera && _this.camera.destroy(), _this.renderer && _this.renderer.destroy(), type != _this.WEBVR && type != _this.WEBAR || (params.xrCompatible = !0, params.alpha = !1), !_this.gl) {
            let camera = new PerspectiveCamera(45, Stage.width / Stage.height, .01, 200);
            _this.gl = function() {
                "safari" == Device.system.browser && Device.system.browserVersion < 13 && delete params.powerPreference, Utils.query("compat") && (params.forceWebGL1 = !0);
                let renderer = new(window.Metal ? MetalRenderer : Renderer)(params);
                return renderer.setSize(Stage.width, Stage.height), renderer.setPixelRatio(getDPR()), renderer
            }(), _this.scene = new Scene, _this.nuke = _this.initClass(Nuke, Stage, Object.assign({
                renderer: _this.gl,
                scene: _this.scene,
                camera: camera,
                dpr: World.DPR
            }, params))
        }
        switch (_dpr = _dpr || World.DPR || 1, type) {
            case _this.WEBVR:
                _this.renderer = _this.initClass(VRRenderer, _this.gl, _this.nuke), _this.camera = _this.initClass(VRCamera);
                break;
            case _this.WEBAR:
                _this.renderer = _this.initClass(window.Metal ? MetalARRenderer : ARRenderer, _this.gl, _this.nuke), _this.camera = _this.initClass(ARCamera);
                break;
            case _this.MAGIC_WINDOW:
                _this.renderer = _this.initClass(MagicWindowRenderer, _this.gl, _this.nuke), _this.camera = _this.initClass(VRCamera);
                break;
            case _this.NORMAL:
                _this.renderer = _this.initClass(RenderManagerRenderer, _this.gl, _this.nuke), _this.camera = _this.initClass(RenderManagerCamera)
        }
        _this.type = type, _this.nuke.camera = _this.camera.worldCamera
    }, this.render = function(scene, camera, renderTarget, forceClear) {
        _this.renderer.render(scene || _this.scene, camera || _this.camera.worldCamera, renderTarget, forceClear, directRenderCallback), _this.events.fire(_this.POST_RENDER)
    }, this.startRender = function() {
        Render.start(_this.render)
    }, this.stopRender = function() {
        Render.stop(_this.render)
    }, this.requestPresent = function(bool) {
        _this.renderer.requestPresent && _this.renderer.requestPresent(bool)
    }, this.setSize = function(width, height) {
        _this.events.unsub(Events.RESIZE, resizeHandler), _this.renderer.setSize(width, height)
    }, this.set("onRenderEye", callback => {
        _this.renderer.onRenderEye = callback
    })
}), "static"), Class((function RenderManagerCamera() {
    Inherit(this, Component);
    const _this = this;
    this.worldCamera = window.THREE ? new THREE.PerspectiveCamera(30, Stage.width / Stage.height, .1, 1e3) : new PerspectiveCamera(30, Stage.width / Stage.height, .1, 1e3), _this.events.sub(Events.RESIZE, () => {
        _this.worldCamera.aspect = Stage.width / Stage.height, _this.worldCamera.updateProjectionMatrix()
    })
})), Class((function RenderManagerRenderer(_renderer, _nuke) {
    Inherit(this, Component);
    const _this = this;
    var _evt = {};
    _nuke.onBeforeProcess = _ => {
        _evt.stage = Stage, _evt.camera = _nuke.camera, _this.events.fire(RenderManager.RENDER, _evt)
    }, this.render = function(scene, camera, _1, _2, directRender) {
        _nuke.camera = camera, _nuke ? _nuke.render(directRender) : _renderer.render(scene, camera, null, null, directRender)
    }, this.setSize = function(width, height) {
        _renderer.setSize(width, height)
    }
})), Class((function SceneLayout(_name, _options = {}) {
    Inherit(this, Object3D);
    const _this = this;
    var _dataStore, _data, _timeline, _breakpoint;
    const ZERO = new Vector3;
    var _initializers = [],
        _promises = [],
        _breakpoints = [],
        _folders = {},
        _groups = {},
        _custom = {},
        _meshes = {},
        _exists = {},
        _layers = {},
        _uil = UIL.sidebar,
        _graph, _config, _groupIndex = 0,
        _groupsSynced = Promise.create();

    function initialize(promise) {
        _promises.push(promise)
    }

    function createFolder(name) {
        let folder = new UILFolder(`sl_${_name}_${name}`, {
            label: name,
            closed: !0
        });
        return folder.hide(), _folders[`sl_${_name}_${name}`] = folder, folder
    }
    async function initConfig() {
        let input = InputUIL.create("CONFIG_sl_" + _name, _uil);
        input.add("Animation"), input.add("Layout"), input.add("Cinema Config"), _graph && _graph.addSpecial("Config", `Config (${_name})`, "Config"), input.setLabel("Config");
        let animation = input.get("Animation"),
            layout = input.get("Layout");
        animation && (await ready(), _groupsSynced.then(async () => {
            if (animation = animation.replace(/^\//g, ""), _this.animation = _this.initClass(HierarchyAnimation, animation, linkObjects), _timeline) _this.startRender(_ => {
                _this.animation.elapsed = _timeline.elapsed, _this.animation.update()
            });
            else if (_uil) {
                let range = new UILControlRange("Animation", {
                    min: 0,
                    max: 1,
                    step: .001
                });
                range.onChange(val => {
                    _this.animation.elapsed = val, _this.animation.update()
                }), _uil.add(range)
            }
            await _this.animation.ready(), _this.animation.update()
        })), layout && (await ready(), _this.layout = _this.initClass(HierarchyLayout, layout, linkObjects), await _this.layout.ready()), _config = input, await defer(), _this.configured = !0
    }
    async function linkObjects(data) {
        let array = [];
        for (let i = 0; i < data.length; i++) {
            let name = data[i].name,
                exists = _this.exists(name);
            exists || "null" == name.toLowerCase() || console.warn(`linkAnimation :: ${name} does not exist`);
            let group = new Group,
                mesh = exists ? await _this.getLayer(name) : null;
            mesh && (_this.layout && mesh instanceof Mesh ? (mesh._parent.add(group), group.add(mesh)) : group = mesh.group || mesh), group.name = name, array.push(group)
        }
        return array
    }
    async function initGraph() {
        if (_options.noGraph || !window.UILGraph || SceneLayout.noGraph) return _uil = null;
        (_graph = UILGraph.instance().getGraph(_name, _this)) && (UIL.sidebar.element.show(), await _this.ready(), _graph.syncVisibility(_layers), _graph.syncGroupNames(_groups, _folders), _groupsSynced.resolve(), Global.PLAYGROUND && Utils.getConstructorName(_this.parent) == Global.PLAYGROUND && _graph.open())
    }

    function initParams() {
        if (_options.rootPath ? "/" != _options.rootPath.charAt(_options.rootPath.length - 1) && (_options.rootPath += "/") : _options.rootPath = "", _this.timeline = _timeline = _options.timeline, _timeline && (_timeline.add({
                v: 0
            }, {
                v: 1
            }, 100, "linear"), _uil)) {
            let range = new UILControlRange("Timeline", {
                min: 0,
                max: 1,
                step: .001
            });
            range.onChange(val => {
                _timeline.elapsed = val, _timeline.update()
            }), _uil.add(range), range.hide(), _graph && _graph.addSpecial("Timeline", "Timeline")
        }
        _this.baseRenderOrder = _options.baseRenderOrder || 0, _this.data = _options.data, _breakpoint = _options.breakpoint || SceneLayout.breakpoint, _options.breakpoint && (_this.localBreakpoint = !0), _options.uil && (_uil = _options.uil)
    }
    async function initData() {
        if (await UILStorage.ready(), _dataStore = InputUIL.create("scenelayout_" + _name, null), void 0 === (_data = JSON.parse(_dataStore.get("data") || "{}")).layers && (_data.layers = -1), _options.perFrame) _data.layers > 0 && createLayers();
        else {
            for (let i = 0, c = _data.layers + 1; i < c; i++) initialize(createLayer(i));
            _this.loaded = !0
        }
    }

    function createLayers() {
        let index = 0,
            renderWorker = new Render.Worker((function() {
                initialize(createLayer(index)), index++ == _data.layers && (renderWorker.stop(), _this.loaded = !0)
            }), _options.perFrame)
    }

    function getGroup(name) {
        if (!name) return _this.group;
        if (name == _name) return _this.group;
        if (!_groups[name]) {
            let uilGroup = _uil ? createFolder(name) : null;
            uilGroup && (uilGroup.setLabel(name + " (Group)"), _uil.add(uilGroup), _graph && _graph.addGroup(uilGroup.id, name));
            let config = InputUIL.create(`GROUP_${_name}_${name}`, uilGroup);
            config.setLabel("Parameters"), _timeline && config.add("tween"), config.addToggle("billboard"), config.add("breakpoints"), config.add("name", "hidden");
            let breakpoints = config.get("breakpoints");
            breakpoints && (breakpoints = breakpoints.replace(/ /g, "").split(","));
            let breakpoint = breakpoints && _breakpoint ? "-" + _breakpoint : "";
            "-" == breakpoint.charAt(breakpoint.length - 1) && (breakpoint = "");
            let group = new Group;
            _groups[name] = group, _layers[name] = group, _exists[name] = "group", group.prefix = `${name}_${_name}${breakpoint}`, MeshUIL.add(group, uilGroup).setLabel("Mesh"), _this.add(group), uilGroup && (uilGroup.params = config), breakpoints && _breakpoints.push(group), config.get("billboard") && _this.startRender(_ => Utils3D.billboard(group)), config.get("tween") && applyTween(group, name, uilGroup)
        }
        return _groupIndex++, _groups[name]
    }
    async function applyTween(mesh, id, group, shader) {
        let config = TweenUIL.create(`Element_${id}_${_name}`, group),
            a = config.add(tween(mesh.position, mesh.position.clone(), 100, "linear", 0, null, !0), "position"),
            b = config.add(tween(mesh.rotation, mesh.rotation.clone(), 100, "linear", 0, null, !0), "rotation"),
            c = config.add(tween(mesh.scale, mesh.scale.clone(), 100, "linear", 0, null, !0), "scale"),
            d = shader && shader.uniforms.uAlpha ? config.add(tween(shader.uniforms.uAlpha, {
                value: 1
            }, 100, "linear", 0, null, !0), "alpha") : null;
        await defer(), await defer(), config.setLabel("Tween"), mesh.position.equals(a.props) || 0 == a.props.x && 0 == a.props.y && 0 == a.props.z || _timeline.add(a), mesh.rotation.equals(b.props) || 0 == b.props.x && 0 == b.props.y && 0 == b.props.z || _timeline.add(b), mesh.scale.equals(c.props) || 1 == c.props.x && 1 == c.props.y && 1 == c.props.z || _timeline.add(c), d && shader.uniforms.uAlpha.value != d.props.uAlpha && _timeline.add(d), mesh.tweens = {
            position: a,
            rotation: b,
            scale: c,
            alpha: d
        }
    }
    async function createLayer(index, groupName) {
        let id = "number" == typeof index ? index : ++_data.layers,
            graphGroupName = groupName;
        if (graphGroupName) {
            let nameLabel = UILStorage.get(`INPUT_GROUP_${_name}_${groupName}_name`);
            nameLabel && (groupName = nameLabel)
        }
        if (UILStorage.get(`sl_${_name}_${id}_deleted`)) return;
        if (_this.preventLayerCreation && _this.preventLayerCreation(UILStorage.get(`INPUT_Config_${id}_${_name}_name`))) return;
        let group = _uil ? createFolder(id) : null,
            shader, mesh, input = InputUIL.create(`Config_${id}_${_name}`, group);
        input.setLabel("Parameters"), input.add("name", "hidden").add("geometry").addToggle("visible", !0).addToggle("transparent").addToggle("depthWrite", !0).addToggle("depthTest", !0).addToggle("castShadow").addToggle("receiveShadow").addToggle("receiveLight").addToggle("billboard").add("shader").add("customClass").add("scriptClass").add("wildcard").add("renderOrder", "hidden").add("group", "hidden").add("breakpoints").addSelect("side", [{
            label: "Front Side",
            value: "shader_front_side"
        }, {
            label: "Back Side",
            value: "shader_back_side"
        }, {
            label: "Double Side",
            value: "shader_double_side"
        }]).addSelect("blending", [{
            label: "Normal",
            value: "shader_normal_blending"
        }, {
            label: "Additive",
            value: "shader_additive_blending"
        }]), input.name = _name, input.prefix = `Element_${id}_${_name}`, input.id = id, group && (group.params = input), _timeline && input.addToggle("tween"), _options.physics && (input.addToggle("physics"), input.add("physicsCode"));
        let name = input.get("name") || id,
            shaderName = input.get("shader") || "SceneLayout",
            geomPath = input.get("geometry"),
            visible = input.get("visible"),
            transparent = input.get("transparent"),
            depthWrite = input.get("depthWrite"),
            depthTest = input.get("depthTest"),
            billboard = input.get("billboard"),
            doTween = input.get("tween"),
            renderOrder = input.getNumber("renderOrder"),
            blending = input.get("blending"),
            side = input.get("side"),
            physics = input.get("physics"),
            castShadow = input.get("castShadow"),
            receiveShadow = input.get("receiveShadow"),
            receiveLight = input.get("receiveLight"),
            breakpoints = input.get("breakpoints");
        breakpoints && (breakpoints = breakpoints.replace(/ /g, "").split(","));
        let breakpoint = breakpoints && _breakpoint ? "-" + _breakpoint : "";
        "-" == breakpoint.charAt(breakpoint.length - 1) && (breakpoint = ""), name && group && group.setLabel(name), groupName && input.setValue("group", groupName);
        let groupParent = getGroup(input.get("group"));
        if (group) {
            let groupName = input.get("group"),
                groupId = groupName ? `sl_${_name}_${graphGroupName||groupName}` : void 0;
            _graph && _graph.addLayer(group.id, name || id + "", groupId)
        }
        if (_uil && _uil.add(group), "ignore" == name) return;
        let customClass = input.get("customClass"),
            scriptClass = input.get("scriptClass");
        if (_exists[name] = customClass ? "custom" : "mesh", customClass) {
            if (!window[customClass]) return console.warn(`Tried to initialize ${customClass} but it doesn't  exist!`);
            let obj = _this.initClass(window[customClass], input, group, id, null);
            if (mesh = obj.group, "boolean" == typeof visible && mesh && (mesh.visible = visible), doTween && obj.group && applyTween(obj.group, id, group), _custom[name] = obj, _layers[name] = obj, _this.onCreateLayer) {
                let capture = cb => (_this.delayedCall(_ => cb(obj, name), 32), !0);
                if (_this.onCreateLayer(name, capture)) return
            }
            return obj.group && groupParent.add(obj.group), obj.renderOrder = _this.baseRenderOrder + renderOrder, void(mesh && (mesh.prefix = `Element_${id}_${_name}${breakpoint}`, MeshUIL.add(mesh, group).setLabel("Mesh"), _breakpoints.push(mesh), scriptClass && (scriptClass.includes(",") ? (scriptClass = scriptClass.replace(/ /g, "").split(","), scriptClass.forEach(script => {
                window[script] ? (mesh.scriptClass = mesh.scriptClass || [], mesh.scriptClass.push(_this.initClass(window[script], mesh, shader, group, input))) : console.warn(`scriptClass ${script} not found`)
            })) : window[scriptClass] ? mesh.scriptClass = _this.initClass(window[scriptClass], mesh, shader, group, input) : console.warn(`scriptClass ${scriptClass} not found`))))
        }
        if (_this.onCreateLayer) {
            let capture = cb => {
                let mesh = new Group;
                return mesh.prefix = `Element_${id}_${_name}${breakpoint}`, MeshUIL.add(mesh, group), doTween && applyTween(mesh, id, group, {
                    uniforms: {
                        uAlpha: {
                            value: 1
                        }
                    }
                }), _meshes[name] = mesh, _layers[name] = mesh, _this.delayedCall(_ => cb(mesh, name), 32), !0
            };
            if (_this.onCreateLayer(name, capture)) return
        }
        let geom = World.PLANE;
        if (geomPath && geomPath.includes(["World", "SceneLayout"]) && (geom = eval(geomPath), geomPath = null), shaderName.includes(".shader")) {
            let shaderLayer = shaderName.split(".shader")[0],
                layer = await _this.getLayer(shaderLayer);
            shader = layer.shader, shader._copied = layer
        } else if (shaderName.includes("PBR")) shader = _this.initClass(PBRShader, shaderName, {
            unique: `Element_${id}_${_name}`
        });
        else {
            let texturePath = input.getImage("texture");
            texturePath ? texturePath.includes("assets/images") || (texturePath = _options.rootPath + texturePath) : texturePath = "assets/images/_scenelayout/uv.jpg", shader = _this.initClass(Shader, shaderName, {
                unique: `Element_${id}_${_name}`
            }), "SceneLayout" != shaderName && window[shaderName] || shader.addUniforms({
                tMap: {
                    value: Utils3D.getTexture(texturePath)
                },
                uAlpha: {
                    value: 1
                }
            }), defer(_ => {
                for (let key in shader.uniforms) {
                    let uniform = shader.uniforms[key];
                    uniform.value instanceof Texture && initialize(uniform.value.promise)
                }
            })
        }
        if ("boolean" == typeof depthWrite && (shader.depthWrite = depthWrite), "boolean" == typeof depthTest && (shader.depthTest = depthTest), "boolean" == typeof transparent && (shader.transparent = transparent), _this.onCreateGeometry && (geomPath = _this.onCreateGeometry(geomPath, input.get("wildcard"))), geomPath && (geom = await GeomThread.loadGeometry(geomPath)), mesh = new Mesh(geom, shader), "boolean" == typeof _options.frustumCulled && (mesh.frustumCulled = _options.frustumCulled), "boolean" == typeof visible && (mesh.visible = visible), groupParent.add(mesh), mesh.prefix = `Element_${id}_${_name}${breakpoint}`, MeshUIL.add(mesh, group).setLabel("Mesh"), physics) {
            let obj = Physics.instance().create(mesh);
            obj.prefix = `Physics_${id}_${_name}`, PhysicsUIL.add(obj, group).setLabel("Physics");
            let code = input.get("physicsCode");
            code && _this.initClass(window[code], obj, mesh, group, input)
        }
        _meshes[name] = mesh, _layers[name] = mesh, breakpoints && _breakpoints.push(mesh), mesh.renderOrder = _this.baseRenderOrder + (renderOrder || 0), billboard && _this.startRender(_ => Utils3D.billboard(mesh)), doTween && applyTween(mesh, id, group, shader), "SceneLayout" != shaderName && window[shaderName] && (mesh.shaderClass = _this.initClass(window[shaderName], mesh, shader, group, input)), shader._copied || shader !== mesh.shader && !shaderName.includes("PBR") || ShaderUIL.add(shader, group).setLabel("Shader"), shader._copied && shader._copied.shaderClass && shader._copied.shaderClass.applyClone && shader._copied.shaderClass.applyClone(mesh), "number" != typeof index && _dataStore.setValue("data", JSON.stringify(_data)), blending && (shader.blending = blending), side && (shader.side = side), castShadow && (mesh.castShadow = castShadow), receiveShadow && (shader.receiveShadow = receiveShadow), receiveLight && (shader.receiveLight = receiveLight), scriptClass && (scriptClass.includes(",") ? (scriptClass = scriptClass.replace(/ /g, "").split(","), scriptClass.forEach(script => {
            window[script] ? (mesh.scriptClass = mesh.scriptClass || [], mesh.scriptClass.push(_this.initClass(window[script], mesh, shader, group, input))) : console.warn(`scriptClass ${script} not found`)
        })) : window[scriptClass] ? mesh.scriptClass = _this.initClass(window[scriptClass], mesh, shader, group, input) : console.warn(`scriptClass ${scriptClass} not found`)), input.onUpdate = key => {
            switch (key) {
                case "name":
                    group.setLabel(input.get(key));
                    break;
                case "visible":
                    mesh.visible = input.get(key);
                    break;
                case "renderOrder":
                    mesh.renderOrder = _this.baseRenderOrder + input.getNumber(key);
                    break;
                case "transparent":
                    shader.transparent = input.get(key);
                    break;
                case "depthWrite":
                    shader.depthWrite = input.get(key);
                    break;
                case "depthTest":
                    shader.depthTest = input.get(key);
                    break;
                case "side":
                    shader.side = input.get(key);
                    break;
                case "blending":
                    shader.blending = input.get(key)
            }
        }
    }

    function addListeners() {
        _this.events.sub(SceneLayout.BREAKPOINT, e => _this.localBreakpoint ? null : setBreakpoint(e))
    }

    function setBreakpoint({
        value: value
    }) {
        value != _breakpoint && (_breakpoint = value, _breakpoints.forEach(mesh => {
            mesh.prefix = mesh.prefix.split("-")[0] + "-" + _breakpoint, "-" == mesh.prefix.charAt(mesh.prefix.length - 1) && (mesh.prefix = mesh.prefix.slice(0, -1)), new MeshUILConfig(mesh)
        }))
    }
    async function ready() {
        await _this.wait(_this, "loaded"), UIL.sidebar && UIL.sidebar.toolbar.hideAll()
    }

    function copyFolderProps(from, to) {
        let mesh, params, shader;
        to.forEachFolder(child => {
            switch (child.label) {
                case "Parameters":
                    params = child;
                    break;
                case "Mesh":
                    mesh = child;
                    break;
                case "Shader":
                    shader = child
            }
        });
        let allowed = ["Parameters", "Mesh", "Shader"];
        from.forEachFolder(child => {
            if (!(allowed.indexOf(child.label) < 0)) switch (child.toClipboard(), child.label) {
                case "Parameters":
                    params.fromClipboard();
                    break;
                case "Mesh":
                    mesh.fromClipboard();
                    break;
                case "Shader":
                    shader.fromClipboard()
            }
        })
    }
    this.isSceneLayout = !0, this.name = _name, async function() {
        _this.group.sceneLayout = _this, await initialize(defer()), SceneLayout.getTexture || (SceneLayout.getTexture = Utils3D.getTexture), initGraph(), initParams(), initialize(initConfig()), initData(), addListeners(), ready()
    }(), this.ready = async function(early) {
        if (await _this.wait(_this, "loaded"), await _this.wait(_this, "configured"), early) return !0;
        await defer(), await defer()
    }, this.getLayer = async function(name) {
        let timer;
        return Hydra.LOCAL && (timer = _this.delayedCall(_ => {
            _exists[name] || console.warn(`${name} doesn't exist in SceneLayout ${_name}`)
        }, 1e3)), await _this.wait(_layers, name), timer && clearTimeout(timer), _layers[name]
    }, this.getLayers = async function() {
        let array = [];
        for (let i = 0; i < arguments.length; i++) array.push(_this.getLayer(arguments[i]));
        return Promise.all(array)
    }, this.getAllLayers = async function() {
        return await this.ready(), await this.loadedAllLayers(), _layers
    }, this.getAllMatching = async function(label) {
        let layers = await _this.getAllLayers(),
            array = [];
        for (let key in layers) key.includes(label) && array.push(layers[key]);
        return array
    }, this.exists = function(name) {
        return _exists[name]
    }, this._createLayer = function(parentId) {
        createLayer(null, parentId)
    }, this._createGroup = function(parentId) {
        getGroup("group_" + _groupIndex, parentId)
    }, this._rename = function(id, name, value) {
        let folder = _folders[id] || _folders[`sl_${_name}_${id}`];
        folder && (folder.setLabel(value), folder.params && folder.params.setValue("name", value), [_groups, _custom, _meshes, _exists, _layers].forEach((function(store) {
            store[name] && (store[value] = store[name], store[name] = null, delete store[name])
        })))
    }, this._deleteLayer = function(id, name) {
        id.includes("_") && (id = (id = id.split("_"))[id.length - 1]);
        let folder = _folders[id] || _folders[`sl_${_name}_${id}`],
            layer = _layers[id] || _layers[name];
        return layer && layer.isGroup && layer.length > 1 ? (alert("Can't delete a group that has nested layers."), !1) : !!confirm("Are you sure you want to delete this layer?") && (layer && layer._parent && (layer._parent.remove(layer), layer._parent = null), folder && folder.parent && folder.parent.remove(folder), UILStorage.set(`sl_${_name}_${id}_deleted`, !0), !0)
    }, this._changeParent = function(childId, childName, parentId, parentName) {
        let child = _layers[childId] || _layers[childName],
            parent = _layers[parentId] || _layers[parentName] || _this;
        if (!child) return;
        let folder = _folders[childId] || _folders[`sl_${_name}_${childName}`];
        folder && folder.params && folder.params.setValue("group", parentName || null);
        let parentObject = parent.group || parent,
            childObject = child.group || child;
        parentObject.isObject3D && childObject.isObject3D && parentObject.add(childObject), child.updateMatrix && child.updateMatrix()
    }, this._visible = function(name, visible) {
        let mesh = _layers[name];
        mesh && (mesh.group && (mesh = mesh.group), mesh.visible = visible)
    }, this._focus = function(name) {
        UIL.sidebar.toolbar.filterSingle(name)
    }, this._blur = function(name) {
        let folder = _folders[name] || _folders[`sl_${_name}_${name}`];
        folder && folder.forEachFolder && (folder.forEachFolder(f => f.close()), folder.close())
    }, this._sort = function(order) {
        order.forEach((label, index) => {
            label.children && label.children.forEach((function(child, j, all) {
                let folder = _folders[child];
                if (!folder || !folder.params) return;
                let renderOrder = _this.baseRenderOrder + index + (j + 1) / (all.length + 1);
                folder.params.setValue("renderOrder", renderOrder - _this.baseRenderOrder);
                let mesh = _layers[child] || _layers[folder.label];
                mesh && (mesh.renderOrder = renderOrder)
            }));
            let folder = _folders[label];
            if (!folder || !folder.params) return;
            let renderOrder = _this.baseRenderOrder + index;
            folder.params.setValue("renderOrder", renderOrder - _this.baseRenderOrder);
            let mesh = _layers[label] || _layers[folder.label];
            mesh && (mesh.renderOrder = renderOrder)
        })
    }, this._duplicateLayer = function(id, parentId) {
        let folder = _folders[id] || _folders[`sl_${_name}_${id}`];
        folder && (createLayer(null, parentId), copyFolderProps(folder, Object.values(_folders).last()))
    }, this._duplicateGroup = function(id, children) {
        let folder = _folders[id] || _folders[`sl_${_name}_${id}`];
        if (!folder) return;
        let copyId = "group_" + (_groupIndex + 1);
        getGroup(copyId), copyFolderProps(folder, Object.values(_folders).last()), children.forEach(childId => {
            _this._duplicateLayer(childId, copyId)
        })
    }, this._getCinemaConfig = async function() {
        let _cinemaConfig = _config.get("Cinema Config").replace(".json", "");
        return await get(Assets.getPath(`assets/geometry/${_cinemaConfig}.json`))
    }, this._applyCinemaConfig = function(id, params) {
        let folder = _folders[id] || _folders[`sl_${_name}_${id}`];
        if (!folder) return;
        let mesh = folder.getAll().filter(sub => "Mesh" == sub.label)[0];
        if (params.geometry && folder.params.setValue("geometry", params.geometry.replace("assets/geometry/", "")), ["position", "quaternion", "scale"].forEach(transform => {
                if (params[transform]) {
                    let value = JSON.parse(params[transform]);
                    if ("quaternion" == transform) {
                        let quat = (new Quaternion).fromArray(value);
                        value = (new Euler).setFromQuaternion(quat).toArray().slice(0, 3).map(angle => 180 * angle / Math.PI), transform = "rotation"
                    }
                    mesh.getAll().filter(control => control.label == transform)[0].force(value)
                }
            }), params.visible && "false" === params.visible && !params.geometry && (folder.params.setValue("geometry", "World.PLANE"), folder.params.setValue("side", "shader_double_side"), !Global.PLAYGROUND)) {
            _meshes[folder.params.get("name")].shader.neverRender = !0
        }
        params.shader && folder.params.setValue("shader", params.shader)
    }, this.loadedAllLayers = async function() {
        return await _this.ready(), Promise.all(_promises)
    }, this.set("breakpoint", value => {
        _this.localBreakpoint = !0, setBreakpoint({
            value: value
        })
    }), this.get("breakpoint", _ => _breakpoint), this.get("layers", _ => _layers), this.get("layerCount", _ => _data.layers), this.onDestroy = function() {
        _this.textures && !_options.persistTextures && _this.textures.forEach(t => {
            t.destroy && t.destroy()
        })
    }, this.addInitializer = function(callback) {
        _initializers.push(callback)
    }, this._completeInitialization = async function(sync) {
        if (!_initializers.length) return !0;
        for (let i = 0; i < _initializers.length; i++) await _initializers[i](sync);
        _initializers.length = 0
    }
}), _ => {
    SceneLayout.BREAKPOINT = "sl_breakpoint", SceneLayout.setBreakpoint = function(value) {
        SceneLayout.breakpoint !== value && (SceneLayout.breakpoint = value, Events.emitter._fireEvent(SceneLayout.BREAKPOINT, {
            value: value
        }))
    }
}), Class((function SceneLayoutPreloader(_name) {
    Inherit(this, Component);

    function findMatch(src) {
        for (let i = ASSETS.length - 1; i > -1; i--)
            if (ASSETS[i].includes(src)) return !0;
        return !1
    }
    this.load = function(name) {
        let ext, promise = Promise.create(),
            array = [],
            settings_dxt = !!Renderer.extensions.s3tc,
            settings_etc = !!Renderer.extensions.etc1,
            settings_pvrtc = !!Renderer.extensions.pvrtc,
            settings_astc = !!Renderer.extensions.astc;
        settings_dxt ? ext = "dxt" : settings_etc ? ext = "astc" : settings_pvrtc ? ext = "pvrtc" : settings_astc && (ext = "astc");
        let keys = UILStorage.getKeys(),
            i = 0,
            worker = new Render.Worker(_ => {
                let key = keys[i];
                if (!key) return worker.stop(), void Promise.all(array).then(promise.resolve);
                if (key.includes(name)) {
                    let val = UILStorage.get(key);
                    if (!val.includes) return i++;
                    if (val.includes(".json")) key.includes("geometry") ? findMatch(val.split("assets/")[1]) && array.push(GeomThread.loadGeometry(val, null, !0)) : (val.includes("assets/") || (val = "assets/geometry/" + val), findMatch(val.split("assets/")[1]) && array.push(fetch(Assets.getPath(val)).catch(e => {})));
                    else if (val.includes("src")) {
                        let obj = JSON.parse(val),
                            src = obj.src;
                        obj.compressed && (src = src.split(".")[0] + "-" + ext + ".kxt"), findMatch(src.split("assets/")[1]) && array.push(fetch(Assets.getPath(src)).catch(e => {}))
                    }
                }
                i++
            }, 1);
        return promise
    }
}), "static"), Class((function Scroll(_object, _params) {
    Inherit(this, Component);
    const _this = this;
    this.x = 0, this.y = 0, this.max = {
        x: 0,
        y: 0
    }, this.delta = {
        x: 0,
        y: 0
    }, this.enabled = !0;
    const _scrollTarget = {
            x: 0,
            y: 0
        },
        _scrollInertia = {
            x: 0,
            y: 0
        };
    let _axes = ["x", "y"];
    var _lastDelta, _deltaChange = 0;

    function loop() {
        _this.object && (Math.round(_this.object.div.scrollLeft) === Math.round(_this.x) && Math.round(_this.object.div.scrollTop) === Math.round(_this.y) || (_this.x = _scrollTarget.x = _this.object.div.scrollLeft, _this.y = _scrollTarget.y = _this.object.div.scrollTop, stopInertia())), _axes.forEach(axis => {
            _this.isInertia && (_scrollInertia[axis] *= .9, _scrollTarget[axis] += _scrollInertia[axis]), _this.limit && (_scrollTarget[axis] = Math.max(_scrollTarget[axis], 0)), _this.limit && (_scrollTarget[axis] = Math.min(_scrollTarget[axis], _this.max[axis] / _this.scale)), _this.delta[axis] = _this.flag("block") ? 0 : .5 * (_scrollTarget[axis] * _this.scale - _this[axis]), _this[axis] += _this.delta[axis], Math.abs(_this.delta[axis]) < .01 && (_this.delta[axis] = 0), Math.abs(_this[axis]) < .001 && (_this[axis] = 0), _this.flag("block") && (_scrollTarget[axis] = 0, _this.delta[axis] = 0, _this[axis] = 0), _this.object && ("x" == axis && (_this.object.div.scrollLeft = Math.round(_this.x)), "y" == axis && (_this.object.div.scrollTop = Math.round(_this.y)))
        })
    }

    function stopInertia() {
        _this.isInertia = !1, clearTween(_scrollTarget)
    }

    function edgeScroll(e) {
        _params.lockMouseX && Mouse.x > Stage.width || "touch" === e.pointerType && _this.enabled && (e.preventDefault && e.preventDefault(), _axes.forEach(axis => {
            let dir = axis.toUpperCase(),
                delta = "offset" + dir,
                diff = (_this["ieDelta" + dir] || e[delta]) - e[delta];
            _scrollTarget[axis] += diff, _scrollInertia[axis] = diff, _this.isInertia = !0, _this["ieDelta" + dir] = e[delta]
        }), _this.onUpdate && _this.onUpdate(), _this.events.fire(Events.UPDATE, _scrollInertia))
    }

    function edgeScrollEnd() {
        _this.ieDeltaX = !1, _this.ieDeltaY = !1
    }

    function scroll(e) {
        if (_params.lockMouseX && Mouse.x > Stage.width) return;
        if (!_this.enabled) return;
        if (_this.limit && e.preventDefault && e.preventDefault(), !_this.mouseWheel) return;
        stopInertia();
        let newDelta = 0;
        _axes.forEach(axis => {
            let delta = "delta" + axis.toUpperCase();
            if ("mac" == Device.system.os) {
                if ("firefox" == Device.system.browser) return 1 === e.deltaMode ? (_scrollTarget[axis] += 4 * e[delta], _scrollInertia[axis] = 4 * e[delta], _this.isInertia = !0, void(newDelta = _scrollInertia[axis])) : void(_scrollTarget[axis] += e[delta]);
                if (Device.system.browser.includes(["chrome", "safari"])) return _scrollTarget[axis] += .33 * e[delta], _scrollInertia[axis] = .33 * e[delta], _this.isInertia = !0, void(newDelta = _scrollInertia[axis])
            }
            if ("windows" == Device.system.os) {
                if ("firefox" == Device.system.browser && 1 === e.deltaMode) return _scrollTarget[axis] += 10 * e[delta], _scrollInertia[axis] = 10 * e[delta], _this.isInertia = !0, void(newDelta = _scrollInertia[axis]);
                if (Device.system.browser.includes(["chrome"])) {
                    let s = .025;
                    return _scrollTarget[axis] += e[delta] * s, _scrollInertia[axis] = e[delta] * s, _this.isInertia = !0, void(newDelta = _scrollInertia[axis])
                }
                if ("ie" == Device.system.browser) return _scrollTarget[axis] += e[delta], _scrollInertia[axis] = e[delta], _this.isInertia = !0, void(newDelta = _scrollInertia[axis])
            }
            _scrollTarget[axis] += e[delta], newDelta = _scrollInertia[axis]
        }), newDelta = Math.abs(newDelta), newDelta != _lastDelta && _deltaChange++, _this.flag("hardBlock") || (_deltaChange > 3 ? newDelta > _lastDelta && _this.flag("block", !1) : newDelta >= _lastDelta && _this.flag("block", !1)), _lastDelta = newDelta, _this.onUpdate && _this.onUpdate(), _this.events.fire(Events.UPDATE, _scrollInertia)
    }

    function down() {
        _this.enabled && stopInertia()
    }

    function drag() {
        _this.enabled && (_axes.forEach(axis => {
            let newDelta = Math.abs(Mouse.delta[axis]);
            _this.flag("hardBlock") || newDelta > _lastDelta && _this.flag("block", !1), _lastDelta = newDelta, _scrollTarget[axis] -= Mouse.delta[axis]
        }), _this.events.fire(Events.UPDATE))
    }

    function up() {
        if (!_this.enabled || _this.preventInertia) return;
        const m = "android" == Device.system.os ? 35 : 25,
            obj = {};
        _axes.forEach(axis => {
            obj[axis] = _scrollTarget[axis] - Mouse.delta[axis] * m
        }), tween(_scrollTarget, obj, 2500, "easeOutQuint")
    }

    function resize() {
        if (!_this.enabled) return;
        if (stopInertia(), !_this.object) return;
        const p = {};
        Device.mobile && _axes.forEach(axis => p[axis] = _this.max[axis] ? _scrollTarget[axis] / _this.max[axis] : 0), void 0 === _params.height && (_this.max.y = _this.object.div.scrollHeight - _this.object.div.clientHeight), void 0 === _params.width && (_this.max.x = _this.object.div.scrollWidth - _this.object.div.clientWidth), Device.mobile && _axes.forEach(axis => _this[axis] = _scrollTarget[axis] = p[axis] * _this.max[axis])
    }! function initParams() {
        _object && _object.div || (_params = _object, _object = null), _params || (_params = {}), _this.object = _object, _this.hitObject = _params.hitObject || _this.object, _this.max.y = _params.height || 0, _this.max.x = _params.width || 0, _this.scale = _params.scale || 1, _this.drag = void 0 !== _params.drag ? _params.drag : !!Device.mobile, _this.mouseWheel = !1 !== _params.mouseWheel, _this.limit = "boolean" == typeof _params.limit && _params.limit, Array.isArray(_params.axes) && (_axes = _params.axes)
    }(), _this.object && function style() {
            _this.object.css({
                overflow: "auto"
            })
        }(),
        function addHandlers() {
            if (Device.mobile || ("ie" === Device.system.browser && Device.system.browserVersion >= 17 && (document.body.addEventListener("pointermove", edgeScroll, !0), document.body.addEventListener("pointerup", edgeScrollEnd, !0)), "ie" == Device.system.browser ? document.body.addEventListener("wheel", scroll, !0) : __window.bind("wheel", scroll)), _this.drag) {
                _this.hitObject && _this.hitObject.bind("touchstart", e => e.preventDefault());
                let input = _this.hitObject ? _this.initClass(Interaction, _this.hitObject) : Mouse.input;
                _this.events.sub(input, Interaction.START, down), _this.events.sub(input, Interaction.DRAG, drag), _this.events.sub(input, Interaction.END, up)
            }
            _this.events.sub(Events.RESIZE, resize)
        }(), resize(), _this.startRender(loop), this.reset = function() {
            return _this.object && _this.object.div && (_this.object.div.scrollLeft = _this.x = 0, _this.object.div.scrollTop = _this.y = 0), _scrollTarget.x = _scrollTarget.y = 0, _scrollInertia.x = _scrollInertia.y = 0, stopInertia(), this
        }, this.onDestroy = function() {
            __window.unbind("wheel", scroll)
        }, this.resize = resize, this.scrollTo = function(value, axis = "y") {
            let values = {};
            values[axis] = value, tween(_scrollTarget, values, 800, "easeInOutCubic")
        }, this.blockUntilNewScroll = function() {
            return _this.reset(), _this.flag("block", !0), _this.flag("hardBlock", !0, 200), this
        }, this.stopInertia = stopInertia
}), _ => {
    var _scroll;
    Scroll.createUnlimited = Scroll.getUnlimited = function(options) {
        return _scroll || (_scroll = new Scroll({
            limit: !1,
            drag: Device.mobile
        })), _scroll
    }
}), Class((function Shaders() {
    Inherit(this, Component);
    var _this = this;

    function parseSingleShader(code, fileName) {
        let uniforms = code.split("#!UNIFORMS")[1].split("#!")[0],
            varyings = code.split("#!VARYINGS")[1].split("#!")[0],
            attributes = code.split("#!ATTRIBUTES")[1].split("#!")[0];
        for (; code.includes("#!SHADER");) {
            let split = (code = code.slice(code.indexOf("#!SHADER"))).split("#!SHADER")[1],
                br = split.indexOf("\n"),
                name = split.slice(0, br).split(": ")[1];
            name.slice(0, 6).includes("Vertex") && (name = fileName.split(".")[0] + ".vs"), name.slice(0, 8).includes("Fragment") && (name = fileName.split(".")[0] + ".fs");
            let glsl = split.slice(br);
            glsl = name.includes(".vs") ? attributes + uniforms + varyings + glsl : uniforms + varyings + glsl;
            let splitName = name.split(".");
            _this[splitName[0] + (splitName[1].includes("vs") ? ".vs" : ".fs")] = glsl, code = code.replace("#!SHADER", "$")
        }
    }

    function parseCompiled(shaders) {
        var split = shaders.split("{@}");
        split.shift();
        for (var i = 0; i < split.length; i += 2) {
            var name = split[i],
                text = split[i + 1];
            text.includes("#!UNIFORMS") ? parseSingleShader(text, name) : _this[name] = text
        }
    }

    function parseRequirements() {
        for (var key in _this) {
            var obj = _this[key];
            "string" == typeof obj && (_this[key] = require(obj))
        }
    }

    function require(shader) {
        if (!shader.includes("require")) return shader;
        for (shader = shader.replace(/# require/g, "#require"); shader.includes("#require");) {
            var name = shader.split("#require(")[1].split(")")[0];
            if (name = name.replace(/ /g, ""), !_this[name]) throw "Shader required " + name + ", but not found in compiled shaders.\n" + shader;
            shader = shader.replace("#require(" + name + ")", _this[name])
        }
        return shader
    }
    this.parse = function(code, file) {
        code.includes("{@}") ? (parseCompiled(code), parseRequirements()) : (file = (file = file.split("/"))[file.length - 1], _this[file] = code), _this.shadersParsed = !0
    }, this.onReady = this.ready = function(callback) {
        let promise = Promise.create();
        return callback && promise.then(callback), _this.wait(() => promise.resolve(), _this, "shadersParsed"), promise
    }, this.getShader = function(string) {
        _this.FALLBACKS && _this.FALLBACKS[string] && (string = _this.FALLBACKS[string]);
        var code = _this[string];
        if (!code) throw `No shader ${string} found`;
        for (; code.includes("#test ");) try {
            var test = code.split("#test ")[1],
                name = test.split("\n")[0],
                glsl = code.split("#test " + name + "\n")[1].split("#endtest")[0];
            eval(name) || (code = code.replace(glsl, "")), code = code.replace("#test " + name + "\n", ""), code = code.replace("#endtest", "")
        } catch (e) {
            throw "Error parsing test :: " + string
        }
        return code
    }
}), "static"), Class((function UIL() {
    Inherit(this, Component);
    const _this = this;
    let _style, $el, _ui = {};
    Hydra.ready(async _ => {
        if (!Utils.query("editMode") && !(window.Platform && window.Platform.isDreamPlatform && Utils.query("uil")) && (!Hydra.LOCAL || Device.mobile || window._BUILT_ || !Utils.query("uil") && !Device.detect("hydra"))) return function doNotLoad() {
            Hydra.LOCAL && Utils.query("remoteUIL") && (_this.sidebar = _this.global = new UILPanel("null"))
        }();
        ! function init() {
            (function initContainer() {
                $el = $("UIL"), $el.css({
                    position: "fixed",
                    contain: "strict"
                }).size("100%", "100%").mouseEnabled(!1), document.body.insertAdjacentElement("beforeend", $el.div), $el.setZ(9999)
            })(),
            function initStyle() {
                let style = document.head.appendChild(document.createElement("style"));
                style.type = "text/css", style.id = "uil-style", style.appendChild(document.createTextNode("\n            .UIL ::-webkit-scrollbar { width:2px; }\n            .UIL ::-webkit-scrollbar-track { background:#161616; }\n            .UIL ::-webkit-scrollbar-thumb { background:#37A1EF; }\n        ")), _style = style
            }(),
            function initSidebar() {
                _this.add(new UILPanel("sidebar")), _this.add(new UILPanel("global", {
                    side: "left"
                }))
            }(),
            function initGraph() {
                if (!_this.sidebar) return;
                let parent = _ui.sidebar.element.div;
                parent.insertBefore(UILGraph.instance().element.div, parent.firstChild)
            }()
        }(), _this.loaded = !0
    }), this.ready = function() {
        return _this.wait(_this, "loaded")
    }, this.add = function(panel) {
        return _ui[panel.id] = panel, _this[panel.id] = panel, $el.add(panel), _this
    }, this.remove = function(id) {
        let $panel = _ui[id];
        return $panel.eliminate && $panel.eliminate(), $panel.destroy(), delete _ui[id], delete _this[id], _this
    }, this.find = function(id) {
        return Object.values(_ui).reduce((acc, el) => acc.concat(el.find(id)), [])
    }, this.enableSorting = function(id, enable) {
        let el = _this.find(id)[0];
        return el && el.enableSorting && el.enableSorting(enable), _this
    }, this.addCSS = function(control, style) {
        if (control.styled) return;
        let node = document.createTextNode(style);
        return _style && _style.appendChild(node), control.styled = !0, _this
    }, this.REORDER = "uil_reorder"
}), "static"), Class((function CameraUIL() {
    this.UPDATE = "camera_uil_update", this.add = function(light, group) {
        return new CameraUILConfig(light, null === group ? null : group || UIL.global)
    }
}), "static"), Class((function CameraUILConfig(_camera, _uil) {
    const _this = this;
    if (!_camera.prefix) throw "camera.prefix required when using MeshUIL";
    var prefix = "CAMERA_" + _camera.prefix,
        _group = _uil ? function createFolder() {
            if (!UIL.sidebar) return null;
            let folder = new UILFolder(prefix, {
                label: _camera.prefix,
                closed: !0
            });
            return _uil.add(folder), folder
        }() : null;

    function initVec(key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || _camera[key].toArray();
        if (_group) {
            let vector = new UILControlVector(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            vector.onChange(e => {
                _group && Events.emitter._fireEvent(CameraUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: e,
                    vec: !0,
                    group: _this
                }), _camera[key].fromArray(e)
            }), vector.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(vector)
        }
        _camera[key].fromArray(initValue)
    }

    function initNumber(key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || (void 0 === _camera[key] ? 9999 : _camera[key]);
        if (_group) {
            let number = new UILControlNumber(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            number.onChange(e => {
                _camera[key] = e, _group && Events.emitter._fireEvent(CameraUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: e,
                    number: !0,
                    group: _this
                })
            }), number.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(number)
        }
        _camera[key] = initValue
    }

    function update(e) {
        e.prefix == prefix && e.group != _this && (e.fov && _camera.setFOV(e.val), e.number && (_camera[e.key] = e.val), e.rotation && _camera.group[e.key].fromArray(e.val), e.vec && _camera[e.key].fromArray(e.val))
    }
    _camera.position && initVec("position"), _camera.group && (_camera.groupPos = _camera.group.position, initVec("groupPos"), function initRotation() {
            let key = "rotation",
                toRadians = array => array ? (array.length = 3, array.map(x => Math.radians(x))) : [0, 0, 0],
                initValue = toRadians(UILStorage.get(`${prefix}${key}`));
            if (_group) {
                let vector = new UILControlVector(`${prefix}${key}`, {
                    label: key,
                    value: (array = initValue, array ? (array.length = 3, array.map(x => Math.degrees(x))) : [0, 0, 0])
                });
                vector.onChange(e => {
                    _group && Events.emitter._fireEvent(CameraUIL.UPDATE, {
                        prefix: prefix,
                        key: key,
                        val: toRadians(e),
                        rotation: !0,
                        group: _this
                    }), _camera.group[key].fromArray(toRadians(e))
                }), vector.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(vector)
            }
            var array;
            _camera.group[key].fromArray(initValue)
        }()),
        function initFOV(key) {
            let initValue = UILStorage.get(`${prefix}${key}`) || _camera.camera.fov || 9999;
            if (_group) {
                let number = new UILControlNumber(`${prefix}${key}`, {
                    label: key,
                    value: initValue,
                    step: .05
                });
                number.onFinishChange(e => {
                    _group && Events.emitter._fireEvent(CameraUIL.UPDATE, {
                        prefix: prefix,
                        key: key,
                        val: e,
                        fov: !0,
                        group: _this
                    }), _camera.setFOV(e), UILStorage.set(`${prefix}${key}`, e)
                }), _group.add(number)
            }
            defer(_ => {
                _camera.setFOV(initValue)
            })
        }("fov"), _camera.moveXY && (initVec("moveXY"), initVec("lookAt"), initNumber("lerpSpeed"), initNumber("lerpSpeed2"), initNumber("deltaRotate"), initNumber("deltaLerp"), initNumber("wobbleSpeed"), initNumber("wobbleStrength"), initNumber("wobbleZ")), _group && function addListeners() {
            Events.emitter._addEvent(CameraUIL.UPDATE, update, _this)
        }(), this.setLabel = function(name) {
            _group && _group.setLabel(name)
        }
})), Class((function InputUIL() {
    this.UPDATE = "inputUil_Update", this.create = function(name, group, decoupled) {
        return new InputUILConfig(name, null === group ? null : group || UIL.global, decoupled)
    }
}), "static"), Class((function InputUILConfig(_name, _uil, _decoupled, _slim) {
    var _this = this;
    const prefix = "INPUT_" + _name;
    var _group = _uil ? function createFolder() {
            if (!UIL.sidebar) return null;
            let folder = new UILFolder(_name, {
                closed: !0
            });
            _decoupled || (_uil.add(folder), _uil == UIL.sidebar && folder.hide());
            return folder
        }() : null,
        _fields = _uil ? {} : null;

    function externalUpdate(e) {
        e.prefix == prefix && e.group != _this && (UILStorage.set(`${prefix}_${e.key}`, e.value), _this.onUpdate && _this.onUpdate(e.key))
    }
    _this.group = _group, _uil && function addListeners() {
        Events.emitter._addEvent(InputUIL.UPDATE, externalUpdate, _this)
    }(), this.get = function(key) {
        let val = UILStorage.get(`${prefix}_${key}`);
        return "boolean" == typeof val ? val : val && "" != val ? "true" === val || "false" !== val && (val.charAt && "[" == val.charAt(0) ? JSON.parse(val) : val) : void 0
    }, this.getNumber = function(key) {
        return Number(this.get(key))
    }, _slim || (this.add = function(key, initValue, uil = window.UILControlText, options, params = {}) {
        if (!_group || "hidden" == initValue || !UIL.sidebar) return this;
        let value = UILStorage.get(`${prefix}_${key}`);
        "true" === value && (value = !0), "false" === value && (value = !1), uil == UILControlVector && "string" == typeof value && (value = JSON.parse(value)), void 0 === value && (value = initValue), "string" == typeof value && uil == UILControlImage && (value = JSON.parse(value));
        let change = (val, fromInit) => {
            val = "string" == typeof val ? val : JSON.stringify(val), UILStorage.set(`${prefix}_${key}`, val), _this.onUpdate && _this.onUpdate(key, val), fromInit || Events.emitter._fireEvent(InputUIL.UPDATE, {
                prefix: prefix,
                key: key,
                value: val,
                group: _this
            })
        };
        "string" != typeof initValue && "number" != typeof initValue && uil != UILControlVector || UILStorage.get(`${prefix}_${key}`) || change(initValue, !0);
        let opts = Utils.mergeObject(params, {
            label: key,
            value: value,
            options: options
        });
        uil == window.UILControlButton && (opts = options);
        let config = new uil(`${prefix}_${key}`, opts);
        return config.onFinishChange(change), uil != UILControlVector && uil != UILControlRange || config.onChange(change), _group.add(config), _fields[key] = config, this
    }, this.addToggle = function(key, initValue) {
        return UIL.sidebar ? this.add(key, initValue, UILControlCheckbox) : this
    }, this.addSelect = function(key, options) {
        return UIL.sidebar ? this.add(key, null, UILControlSelect, options) : this
    }, this.addImage = function(key, options) {
        return UIL.sidebar ? this.add(key, null, UILControlImage, null, options) : this
    }, this.addRange = function(key, initValue, options) {
        return UIL.sidebar ? this.add(key, initValue, UILControlRange, null, options) : this
    }, this.addNumber = function(key, initValue, step) {
        return UIL.sidebar ? this.add(key, initValue, UILControlNumber, null, {
            step: step
        }) : this
    }, this.addColor = function(key, initValue = new Color) {
        return UIL.sidebar ? this.add(key, initValue.getHexString(), UILControlColor) : this
    }, this.addTextarea = function(key, initValue) {
        return UIL.sidebar ? this.add(key, initValue, UILControlTextarea, null, {
            monospace: !0,
            rows: 4
        }) : this
    }, this.addButton = function(key, options) {
        return UIL.sidebar ? this.add(key, null, UILControlButton, options) : this
    }, this.addVector = function(key, initValue, options) {
        return UIL.sidebar ? (options || (options = {
            step: .05
        }), this.add(key, initValue, UILControlVector, null, options)) : this
    }, this.getImage = function(key) {
        let data = this.get(key);
        if (data) return JSON.parse(data).src
    }, this.setValue = function(key, value) {
        if (UILStorage.set(`${prefix}_${key}`, value), _this.onUpdate && _this.onUpdate(key), _fields) {
            let field = _fields[key];
            field && (field.value = value, field.update && field.update())
        }
        return this
    }, this.copyFrom = function(input, fields) {
        fields.forEach(key => {
            let val = input.get(key);
            void 0 !== val && ("string" != typeof val && (val = JSON.stringify(val)), _this.setValue(key, val))
        })
    }, this.setLabel = function(name) {
        _group && _group.setLabel(name)
    }, this.getField = function(key) {
        if (_fields) return _fields[key]
    })
})), Class((function ListUIL() {
    Inherit(this, Component);
    const _this = this;
    var _panel, _created = {};

    function removePanel() {
        _panel && _panel.destroy && (_this.events.unsub(_panel, Events.COMPLETE, removePanel), _panel = _panel.destroy())
    }
    this.create = function(id, version = 1, group) {
        "number" != typeof version && (group = version, version = 1), group = null === group ? null : group || UIL.global;
        let config = new ListUILConfig(id, version, UIL.global && !_created[id]);
        return UIL.global && (_created[id] || (_created[id] = config, null != group && config.appendUILGroup(group || UIL.global))), config
    }, this.openPanel = function(id, name, template) {
        return removePanel(), _panel = new ListUILEditor(id, name, template), _this.events.sub(_panel, Events.COMPLETE, removePanel), _panel
    }, this.set = function() {}, this.get = function() {}, this.getPanel = function() {
        return _panel
    }
}), "static"), Class((function ListUILConfig(_id, _version = 1, _store) {
    Inherit(this, Component);
    const _this = this;
    var _items, _folder, _config, _template = {
            onSort: _ => {},
            onAdd: _ => {},
            onRemove: _ => {}
        },
        _name = "";

    function name() {
        return `LIST_${_id}_config`
    }

    function updateConfig() {
        _config.version = _version, UILStorage.setWrite(name(), _config)
    }

    function edit() {
        let panel = ListUIL.openPanel(_id, _name, _this.template);
        _this.events.bubble(panel, Events.UPDATE), _this.events.fire(ListUIL.OPEN)
    }
    _store && (_items = []),
        function initConfig() {
            (_config = UILStorage.get(name())) ? _config.version != _version && (updateConfig(), UILStorage.clearMatch(name().split("_config")[0])): (_config = {}, updateConfig())
        }(), this.add = function(item) {
            return _items && _items.push(item), item
        }, this.template = function(config) {
            return "function" == typeof config && (_template = config), _template
        }, this.appendUILGroup = function(uil) {
            let folder = new UILFolder("LIST_" + _id, {
                    closed: !0
                }),
                button = new UILControlButton("button", {
                    actions: [{
                        title: "Edit List",
                        callback: edit
                    }],
                    hideLabel: !0
                });
            folder.add(button), uil.add(folder), _folder = folder
        }, this.setLabel = function(name) {
            _folder && _folder.setLabel(name), _name = name
        }, this.onAdd = function(cb) {
            _template.onAdd = cb
        }, this.onRemove = function(cb) {
            _template.onRemove = cb
        }, this.onSort = function(cb) {
            _template.onSort = cb
        }, this.internalAddItems = function(count) {
            if (!count) return;
            let array = [];
            for (let i = 0; i < count; i++) {
                let id = `${_id}_${Utils.timestamp()}`;
                array.push(id)
            }
            UILStorage.set(_id + "_list_items", JSON.stringify(array))
        }
}), _ => {
    ListUIL.OPEN = "list_uil_open"
}), Class((function ListUILEditor(_id, _name, _template) {
    Inherit(this, Component);
    const _this = this,
        PANEL_CONFIG = {
            label: _name || "List",
            width: "400px",
            height: "auto",
            drag: !0
        };
    var _gui, _list, _add, _items, _tabs = [],
        _index = 0;

    function initList() {
        ! function read() {
            let data = UILStorage.get(_id + "_list_items");
            void 0 === data && (data = "[]");
            _items = JSON.parse(data)
        }(), (_list = new UILFolder(_id + "_list", {
            hideTitle: !0
        })).enableSorting(_id), _gui.add(_list);
        for (let id of _items) {
            let view = new ListUILItem(id, _list, _template, _index++);
            _this.events.sub(view, Events.UPDATE, reorder), _this.events.sub(view, Events.END, remove), _tabs.push(view)
        }
    }

    function initAdd() {
        ! function initButton(title, callback) {
            _add = new UILControlButton("button", {
                actions: [{
                    title: title,
                    callback: callback
                }],
                hideLabel: !0
            }), _gui.add(_add)
        }("Add Item", add)
    }

    function add() {
        let id = `${_id}_${Utils.timestamp()}`,
            view = new ListUILItem(id, _list, _template, _index++);
        _this.events.sub(view, Events.UPDATE, reorder), _this.events.sub(view, Events.END, remove), _tabs.push(view), _items.push(id), write()
    }

    function reorder(e) {
        let order = [];
        for (let item of e.order) order.push(item.split("_folder")[0]);
        _items = order, _template().onSort(_items), write(), _this.events.fire(Events.UPDATE, {
            order: order
        })
    }

    function close() {
        _this.events.fire(Events.COMPLETE)
    }

    function remove(e) {
        _items.remove(e.id), write(), refresh()
    }

    function write() {
        let data = JSON.stringify(_items);
        UILStorage.set(_id + "_list_items", data)
    }

    function refresh() {
        _index = 0, _list && _list.destroy && (_list = _list.destroy()), _add && _add.destroy && (_add = _add.destroy()), initList(), initAdd()
    }! function initPanel() {
        _this.gui = _gui = new UILWindow(_id, PANEL_CONFIG), _this.gui.onClose = close, UIL.add(_gui)
    }(), refresh(), this.onDestroy = function() {
        _gui.destroy()
    }, this.add = function() {
        add()
    }
})), Class((function ListUILItem(_id, _parent, _template, _index) {
    Inherit(this, Component);
    const _this = this;
    var _folder;

    function onDelete() {
        if (!confirm("You sure you want to delete this?")) return;
        let id = _id;
        _template().onRemove(id), _this.events.fire(Events.END, {
            id: id
        })
    }

    function onReorder(e) {
        _this.events.fire(Events.UPDATE, e)
    }!async function initFolder() {
            (_folder = InputUIL.create(_id + "_folder", _parent)).setLabel("Item"), _folder.group.draggable(!0), _this.events.sub(_folder.group, UIL.REORDER, onReorder), _folder.listUILItem = _this
        }(),
        function initTemplate() {
            let id = _id;
            (0, _template().onAdd)(id, _folder, _index)
        }(),
        function initUI() {
            let actions = [{
                title: "Delete",
                callback: onDelete
            }];
            _folder.addButton("delete", {
                actions: actions,
                hideLabel: !0
            })
        }(), this.setLabel = function(label) {
            _folder.setLabel(label)
        }, this.forceSort = function(index) {
            _folder.group.forceSort(index)
        }, this.open = function() {
            _folder.group.open(), _folder.group.openChildren()
        }, this.close = function() {
            _folder.group.close()
        }
})), Class((function MeshUIL() {
    Inherit(this, Component);
    this.exists = {}, this.UPDATE = "mesh_uil_update", this.add = function(mesh, group) {
        return new MeshUILConfig(mesh, null === group ? null : group || UIL.global)
    }
}), "static"), Class((function MeshUILConfig(_mesh, _uil) {
    const _this = this;
    if (!_mesh.prefix) throw "mesh.prefix required when using MeshUIL";
    var prefix = "MESH_" + _mesh.prefix,
        _group = _uil && !MeshUIL.exists[prefix] ? function createFolder() {
            if (!UIL.sidebar) return null;
            let folder = new UILFolder(prefix, {
                label: _mesh.prefix,
                closed: !0
            });
            return _uil.add(folder), folder
        }() : null,
        _controls = _group ? {} : null;

    function initVec(key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || _mesh[key].toArray();
        if (_group) {
            let vector = new UILControlVector(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            vector.onChange(e => {
                _mesh[key].fromArray(e), _group && Events.emitter._fireEvent(MeshUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: e,
                    group: _this
                })
            }), vector.onFinishChange(save), _group.add(vector), _controls[key] = vector
        }
        _mesh[key].fromArray(initValue)
    }

    function save() {
        for (let key in _controls) {
            let value = _controls[key].value;
            UILStorage.set(`${prefix}${key}`, value)
        }
    }

    function update(e) {
        e.prefix == prefix && e.group != _this && _mesh[e.key].fromArray(e.val)
    }
    this.group = _group, MeshUIL.exists[prefix] = !0, initVec("position"), initVec("scale"),
        function initRotation() {
            let key = "rotation",
                toRadians = array => array ? (array.length = 3, array.map(x => Math.radians(x))) : [0, 0, 0],
                initValue = toRadians(UILStorage.get(`${prefix}${key}`));
            if (_group) {
                let vector = new UILControlVector(`${prefix}${key}`, {
                    label: key,
                    value: (array = initValue, array ? (array.length = 3, array.map(x => Math.degrees(x))) : [0, 0, 0])
                });
                vector.onChange(e => {
                    _mesh[key].fromArray(toRadians(e)), _group && Events.emitter._fireEvent(MeshUIL.UPDATE, {
                        prefix: prefix,
                        key: key,
                        val: toRadians(e),
                        group: _this
                    })
                }), vector.onFinishChange(save), _group.add(vector), _controls[key] = vector
            }
            var array;
            _mesh[key].fromArray(initValue)
        }(), _group && function addListeners() {
            Events.emitter._addEvent(MeshUIL.UPDATE, update, _this)
        }(), this.setLabel = function(name) {
            _group && _group.setLabel(name)
        }
})), Class((function ShaderUIL() {
    this.exists = {}, this.UPDATE = "shader_update", this.TEXTURE_UPDATE = "shader_texture_update", this.add = function(shader, group) {
        return new ShaderUILConfig(shader.shader || shader, null === group ? null : group || UIL.global)
    }
}), "static"), Class((function ShaderUILConfig(_shader, _uil) {
    var _textures, _this = this;
    const prefix = _shader.UILPrefix;
    var _group = _uil && !ShaderUIL.exists[prefix] ? function createFolder() {
        if (!UIL.sidebar) return null;
        let label = function getName() {
            let split = _shader.UILPrefix.split("/");
            return split.length > 2 ? split[0] + "_" + split[2] : split[0]
        }();
        "_" == label.charAt(label.length - 1) && (label = label.slice(0, -1));
        let folder = new UILFolder(prefix + label, {
            label: label,
            closed: !0
        });
        return _uil.add(folder), folder
    }() : null;

    function createVector(obj, key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || obj.value.toArray();
        if (_group) {
            let vector = new UILControlVector(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            vector.onChange(val => {
                obj.value.fromArray(val), _shader.ubo && (_shader.ubo.needsUpdate = !0), Events.emitter._fireEvent(ShaderUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: val,
                    group: _this,
                    vector: !0
                })
            }), vector.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(vector)
        }
        obj.value.fromArray(initValue)
    }

    function createTexture(obj, key) {
        _group && !_textures && (_textures = {});
        const getTexture = obj.getTexture || ShaderUIL.getTexture || Utils3D.getTexture,
            set = _shader.parent && _shader.parent.setOverride ? _shader.parent.setOverride : _shader.set || _shader.setUniform,
            get = _shader.get || _shader.getUniform;
        let prefix = _shader.UILPrefix + "_tx",
            data = UILStorage.get(`${prefix}_${key}`);
        data && (data = JSON.parse(data));
        let value = data ? data.src : null,
            change = data => {
                let val = data.src,
                    cleanPath = val.includes("?") ? val.split("?")[0] : val;
                data.compressed && (val += "-compressedKtx"), _textures && (_textures[cleanPath] = change), data.src = cleanPath, UILStorage.set(`${prefix}_${key}`, JSON.stringify(data)), set(key, getTexture(val, {
                    premultiplyAlpha: obj.premultiplyAlpha,
                    scale: obj.scale
                }), _shader), _group && Events.emitter._fireEvent(ShaderUIL.UPDATE, {
                    prefix: _shader.UILPrefix,
                    key: key,
                    val: val,
                    texture: get(key, _shader),
                    group: _this
                })
            };
        if (value && value.length && change(data), _group) {
            let img = new UILControlImage(prefix + key, {
                label: key,
                value: data
            });
            img.onFinishChange(change), _group.add(img)
        }
    }

    function createNumber(obj, key) {
        let initValue = UILStorage.get(`${prefix}${key}`);
        if (void 0 === initValue && (initValue = obj.value), _group) {
            let number = new UILControlNumber(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            number.onChange(val => {
                _shader.ubo && (_shader.ubo.needsUpdate = !0), Events.emitter._fireEvent(ShaderUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: val,
                    group: _this
                }), obj.value = val
            }), number.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(number)
        }
        obj.value = initValue
    }

    function createColor(obj, key) {
        let initValue = UILStorage.get(`${prefix}${key}`);
        if (_group) {
            let color = new UILControlColor(`${prefix}${key}`, {
                label: key,
                value: initValue
            });
            color.onChange(val => {
                obj.value.set(val), _shader.ubo && (_shader.ubo.needsUpdate = !0), _group && Events.emitter._fireEvent(ShaderUIL.UPDATE, {
                    prefix: prefix,
                    key: key,
                    val: val,
                    color: !0,
                    group: _this
                })
            }), color.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(color)
        }
        initValue && obj.value.set(initValue)
    }

    function textureUpdate(e) {
        if (!_textures) return;
        let cleanPath = e.file.split("?")[0];
        for (let key in _textures) cleanPath == key && _textures[key]({
            src: e.file
        })
    }

    function update(e) {
        if (e.prefix == _shader.UILPrefix && e.group != _this)
            if (e.color) {
                let val = e.val,
                    obj = _shader.uniforms[e.key];
                Array.isArray(val) ? obj.value.setRGB(val[0], val[1], val[2]) : obj.value.set(val)
            } else e.texture ? "remote" != e.texture && _shader.set(e.key, e.texture) : e.vector ? _shader.uniforms[e.key].value.fromArray(e.val) : _shader.uniforms[e.key].value = e.val
    }
    this.group = _group, ShaderUIL.exists[_shader.UILPrefix] = !0,
        function initItems() {
            for (var key in _shader.uniforms) {
                let obj = _shader.uniforms[key];
                obj && !obj.ignoreUIL && (obj.value instanceof Color && createColor(obj, key), "number" == typeof obj.value && createNumber(obj, key), (null === obj.value || obj.value instanceof Texture) && createTexture(obj, key), obj.value instanceof Vector2 && createVector(obj, key), obj.value instanceof Vector3 && createVector(obj, key), obj.value instanceof Vector4 && createVector(obj, key))
            }
        }(), _group && function addListeners() {
            Events.emitter._addEvent(ShaderUIL.UPDATE, update, _this), Events.emitter._addEvent(ShaderUIL.TEXTURE_UPDATE, textureUpdate, _this)
        }(), this.setLabel = function(name) {
            _group && _group.setLabel(name)
        }
})), Class((function ShadowUIL() {
    this.add = function(light, group) {
        return new ShadowUILConfig(light, null === group ? null : group || UIL.global)
    }
}), "static"), Class((function ShadowUILConfig(_light, _uil) {
    if (!_light.prefix) throw "light.prefix required when using MeshUIL";
    var prefix = "SHADOW_" + _light.prefix,
        _group = _uil ? function createFolder() {
            if (!UIL.sidebar) return null;
            let folder = new UILFolder(prefix, {
                label: _light.prefix,
                closed: !0
            });
            return _uil.add(folder), folder
        }() : null;

    function initNumber(key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || _light.shadow[key];
        if (_group) {
            let number = new UILControlNumber(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            number.onFinishChange(e => {
                _light.shadow[key] = e, UILStorage.set(`${prefix}${key}`, e)
            }), _group.add(number)
        }
        _light.shadow[key] = initValue
    }

    function initVec(key) {
        let initValue = UILStorage.get(`${prefix}${key}`) || _light[key].toArray();
        if (_group) {
            let vector = new UILControlVector(`${prefix}${key}`, {
                label: key,
                value: initValue,
                step: .05
            });
            vector.onChange(e => {
                _light[key].fromArray(e), "target" == key && _light.shadow.camera.lookAt(_light.target)
            }), vector.onFinishChange(e => UILStorage.set(`${prefix}${key}`, e)), _group.add(vector)
        }
        _light[key].fromArray(initValue)
    }
    _light.target = _light.shadow.target, initVec("position"), initVec("target"), initNumber("fov"), initNumber("size"), initNumber("area"), initNumber("near"), initNumber("far"),
        function initTick(key) {
            let initValue = UILStorage.get(`${prefix}${key}`);
            if (_group) {
                let tick = new UILControlCheckbox(`${prefix}${key}`, {
                    label: key,
                    value: initValue
                });
                tick.onFinishChange(e => {
                    _light[key] = e, UILStorage.set(`${prefix}${key}`, e)
                }), _group.add(tick)
            }
            _light[key] = initValue
        }("static"), this.setLabel = function(name) {
            _group && _group.setLabel(name)
        }
})), Class((function TimelineUIL() {
    Inherit(this, Component);
    const _this = this;
    var _panel, _created = {};

    function removePanel() {
        _panel && _panel.destroy && (_this.events.unsub(_panel, Events.COMPLETE, removePanel), _panel = _panel.destroy())
    }
    this.create = function(id, version = 1, group) {
        "number" != typeof version && (group = version, version = 1), group = null === group ? null : group || UIL.global;
        let config = new TimelineUILConfig(id, version, UIL.global && !_created[id]);
        return UIL.global && (_created[id] || (_created[id] = config, null != group && config.appendUILGroup(group || UIL.global))), config
    }, this.openPanel = function(id, name, template) {
        return removePanel(), _panel = new TimelineUILEditor(id, name, template), _this.events.sub(_panel, Events.COMPLETE, removePanel), _panel
    }, this.set = function() {}, this.get = function() {}
}), "static"), Class((function TimelineUILConfig(_id, _version = 1, _store) {
    Inherit(this, Component);
    const _this = this;
    var _items, _folder, _config, _template = {
            onSort: _ => {},
            onAdd: _ => {},
            onRemove: _ => {}
        },
        _name = "";

    function name() {
        return `TL_${_id}_config`
    }

    function updateConfig() {
        _config.version = _version, UILStorage.setWrite(name(), _config)
    }

    function edit() {
        let panel = TimelineUIL.openPanel(name(), _name, _this.template);
        _this.events.bubble(panel, Events.UPDATE), _this.events.fire(TimelineUIL.OPEN)
    }
    this.model = new TimelineUILModel(name()), _store && (_items = []),
        function initConfig() {
            (_config = UILStorage.get(name())) ? _config.version != _version && (updateConfig(), UILStorage.clearMatch(name().split("_config")[0])): (_config = {}, updateConfig())
        }(), this.add = function(item) {
            return _items && _items.push(item), item
        }, this.template = function(config) {
            return "function" == typeof config && (_template = config), _template
        }, this.appendUILGroup = function(uil) {
            let folder = new UILFolder("TL_" + _id, {
                    closed: !0
                }),
                button = new UILControlButton("button", {
                    actions: [{
                        title: "Edit Timeline",
                        callback: edit
                    }],
                    hideLabel: !0
                });
            folder.add(button), uil.add(folder), _folder = folder
        }, this.setLabel = function(name) {
            _folder && _folder.setLabel(name), _name = name
        }, this.onAdd = function(cb) {
            _template.onAdd = cb
        }, this.onRemove = function(cb) {
            _template.onRemove = cb
        }, this.onSort = function(cb) {
            _template.onSort = cb
        }, this.internalAddItems = function(count) {
            if (!count) return;
            let array = [];
            for (let i = 0; i < count; i++) {
                let id = `${_id}_${Utils.timestamp()}`;
                array.push(id)
            }
            UILStorage.set(_id + "_list_items", JSON.stringify(array))
        }
}), _ => {
    TimelineUIL.OPEN = "list_uil_open"
}), Class((function TimelineUILEditor(_id, _name, _template) {
    Inherit(this, Component);
    const _this = this,
        PANEL_CONFIG = {
            label: "Timeline Editor",
            width: "800px",
            height: "auto",
            drag: !0
        };
    var _gui, _list, _add, _config, _items, _tabs = [],
        _index = 0;

    function initList() {
        ! function read() {
            let data = UILStorage.get(_id + "_list_items");
            void 0 === data && (data = "[]");
            _items = JSON.parse(data)
        }(), _list = new UILFolder(_id + "_list", {
            hideTitle: !0
        }), _gui.add(_list);
        for (let id of _items) {
            let view = _this.initClass(TimelineUILItem, id, _list, _template, _index++);
            _this.events.sub(view, Events.UPDATE, reorder), _this.events.sub(view, Events.END, remove), _tabs.push(view)
        }
        _config.rails && function attachRails() {
            _tabs.forEach((t, i) => {
                t.onUpdate = v => {
                    _tabs.forEach((t2, j) => {
                        t2 != t && (j < i && t.getValue() < t2.getValue() && t2.setValue(t.getValue()), j > i && t.getValue() > t2.getValue() && t2.setValue(t.getValue()))
                    })
                }
            })
        }()
    }

    function initButton(title, callback) {
        let btn = new UILControlButton("button", {
            actions: [{
                title: title,
                callback: callback
            }],
            hideLabel: !0
        });
        return _gui.add(btn), btn
    }

    function spaceEvenly() {
        _tabs.forEach((t, i) => {
            let perc = Math.range(i, 0, _tabs.length - 1, 0, 1);
            t.setValue(perc)
        })
    }

    function add() {
        let id = `${_id}_${Utils.timestamp()}`,
            view = new TimelineUILItem(id, _list, _template, _index++);
        _this.events.sub(view, Events.UPDATE, reorder), _this.events.sub(view, Events.END, remove), _tabs.push(view), _items.push(id), write()
    }

    function reorder(e) {
        let order = [];
        for (let item of e.order) order.push(item.split("_folder")[0]);
        _items = order, _template().onSort(_items), write(), _this.events.fire(Events.UPDATE, {
            order: order
        })
    }

    function remove(e) {
        _items.remove(e.id), write(), refresh()
    }

    function write() {
        let data = JSON.stringify(_items);
        UILStorage.set(_id + "_list_items", data)
    }

    function refresh() {
        _index = 0, _list && _list.destroy && (_list = _list.destroy()), _add && _add.destroy && (_add = _add.destroy()), initList(),
            function initAdd() {
                _config.lock || (_add = initButton("Add Item", add)).element.css({
                    width: "20%"
                }), initButton("Space Evenly", spaceEvenly).element.css({
                    width: "20%"
                })
            }()
    }
    _this.config = _config = JSON.parse(UILStorage.get(_id + "_config") || "{}"),
        function initPanel() {
            _this.gui = _gui = new UILWindow(_id, PANEL_CONFIG), UIL.add(_gui)
        }(), refresh(), this.onDestroy = function() {
            _gui.destroy()
        }
})), Class((function TimelineUILItem(_id, _parent, _template, _index) {
    Inherit(this, Component);
    const _this = this;
    var _folder;

    function onDelete() {
        if (!confirm("You sure you want to delete this?")) return;
        let id = _id;
        _template().onRemove(id), _this.events.fire(Events.END, {
            id: id
        })
    }

    function onReorder(e) {
        _this.events.fire(Events.UPDATE, e)
    }!async function initFolder() {
            (_folder = InputUIL.create(_id + "_folder", _parent)).setLabel("Item"), _this.parent && _this.parent.config.lock || _folder.group.draggable(!0), _this.events.sub(_folder.group, UIL.REORDER, onReorder), _folder.group.open()
        }(),
        function initTemplate() {
            let id = _id;
            (0, _template().onAdd)(id, _folder, _index)
        }(),
        function initUI() {
            _folder.add("label", _this.parent && _this.parent.config.lock ? "hidden" : void 0), _folder.addRange("keyframe"), _folder.add("percent", "hidden"), _folder.getField("keyframe").force(Math.round(100 * _folder.getNumber("percent")) || 0), _folder.onUpdate = key => {
                if ("keyframe" == key) {
                    let val = _folder.getNumber(key) / 100;
                    _folder.setValue("percent", val), _this.onUpdate && _this.onUpdate(val)
                }
            };
            let label = _folder.get("label");
            if (label && _folder.setLabel(label), !_this.parent || !_this.parent.config.lock) {
                let actions = [{
                        title: "Delete",
                        callback: onDelete
                    }],
                    hideLabel = !0,
                    btn = (_folder.addButton("delete", {
                        actions: actions,
                        hideLabel: hideLabel
                    }), _folder.getField("delete"));
                btn && btn.$content.css({
                    width: "20%"
                })
            }
        }(), this.setLabel = function(label) {
            _folder.setLabel(label)
        }, this.getValue = function(value) {
            return _folder.getNumber("percent")
        }, this.setValue = function(value) {
            _folder.setValue("percent", value), _folder.getField("keyframe").force(Math.round(100 * value) || 0)
        }
})), Class((function TimelineUILModel(_id) {
    var _items, _config, _data = [],
        _map = {};
    ! function initItems() {
        _config = JSON.parse(UILStorage.get(_id + "_config") || "{}"), _items = JSON.parse(UILStorage.get(_id + "_list_items") || "[]")
    }(),
    function initData() {
        _items.forEach((item, i) => {
            let input = InputUIL.create(item + "_folder", null, null, !!UIL.global),
                data = {};
            data.label = input.get("label") || "Item", data.value = input.getNumber("percent") || 0, data.arbitrary = input.get("arbitrary"), _data.push(data), _map[data.label] = data, UIL.global && Render.start(_ => {
                data.label = input.get("label") || "Item", data.value = input.getNumber("percent") || 0
            }, 10)
        })
    }(), this.setState = function(array) {
        for (let i = 0; i < array.length; i++) _items[i] || _items.push(`${_id}_${Utils.timestamp()}`);
        _items.length > array.length && (_items = _items.slice(0, array.length)), _items.forEach((item, i) => {
            let data = array[i],
                input = InputUIL.create(item + "_folder", null);
            input.setValue("label", data.label), data.percent && input.setValue("percent", data.percent), data.arbitrary && input.setValue("percent", data.arbitrary)
        }), UILStorage.set(_id + "_list_items", JSON.stringify(_items))
    }, this.lock = function() {
        return _config.lock || (_config.lock = !0, UIL.global && UILStorage.set(_id + "_config", JSON.stringify(_config))), this
    }, this.rails = function() {
        return _config.rails || (_config.rails = !0, UIL.global && UILStorage.set(_id + "_config", JSON.stringify(_config))), this
    }, this.getData = function() {
        return _data
    }, this.get = function(key) {
        return _map[key]
    }
})), Class((function TweenUIL() {
    Inherit(this, Component);
    const _this = this;
    var _editor, _data = {},
        _created = {};

    function removeEditor() {
        _editor = _editor.destroy()
    }
    this.create = function(name, version = 1, group) {
        "number" != typeof version && (group = version, version = 1);
        let config = new TweenUILConfig(name, version, UIL.global && !_created[name]);
        return UIL.global && (_created[name] || (_created[name] = config, config.appendUILGroup(group || UIL.global))), config
    }, this.openEditor = function(name, tweens) {
        _editor && _editor.destroy(), _editor = new TweenUILEditor(name, tweens), _this.events.sub(_editor, Events.COMPLETE, removeEditor)
    }, this.set = function(key, value) {
        _data[key] = value
    }, this.get = function(key) {
        return _data[key]
    }
}), "static"), Class((function TweenUILConfig(_name, _version = 1, _store) {
    var _tweens, _folder, _config = UILStorage.get("TWEEN_" + _name + "_config");

    function updateConfig() {
        _config.version = _version, UILStorage.setWrite("TWEEN_" + _name + "_config", _config)
    }

    function override(tween, object, props, time, ease, delay) {
        let key = "TWEEN_" + _name + "_" + tween._id,
            storage = UILStorage.get(key),
            obj = {
                props: props,
                time: time,
                ease: ease,
                delay: delay
            };
        for (let key in storage) obj[key] = storage[key];
        return TweenUIL.set(key, obj), obj
    }

    function edit() {
        TweenUIL.openEditor(_name, _tweens)
    }
    _store && (_tweens = []), _config ? _config.version != _version && (updateConfig(), UILStorage.clearMatch("TWEEN_" + _name)) : (_config = {}, updateConfig()), this.add = function(tween, name) {
        return tween._id = name, tween.overrideValues = override, _tweens && _tweens.push(tween), tween
    }, this.appendUILGroup = function(uil) {
        let folder = new UILFolder("TWEEN_" + _name, {
                closed: !0
            }),
            button = new UILControlButton("button", {
                actions: [{
                    title: "Edit",
                    callback: edit
                }],
                hideLabel: !0
            });
        folder.add(button), uil.add(folder), _folder = folder
    }, this.setLabel = function(name) {
        _folder && _folder.setLabel(name)
    }
})), Class((function TweenUILEditor(_name, _tweens) {
    Inherit(this, Component);
    const _this = this;
    var _gui = new UILWindow(_name, {
        label: "Tween Editor",
        width: "400px",
        height: "auto",
        drag: !0
    });

    function createGroup(tween) {
        let obj = TweenUIL.get("TWEEN_" + _name + "_" + tween._id),
            group = new UILFolder(tween._id);
        _gui.add(group);
        let lookup = "TWEEN_" + _name + "_" + tween._id;
        for (let key in obj)
            if ("props" == key) switch (tween._id) {
                case "position":
                case "scale":
                    createVector(obj, key, group, lookup);
                    break;
                case "rotation":
                    createRotation(obj, key, group, lookup);
                    break;
                default:
                    createNumber(obj, key, group, lookup)
            } else createString(obj, key, group, lookup)
    }

    function createString(obj, key, group, lookup) {
        let value = obj[key],
            text = new UILControlText(lookup + key, {
                label: key,
                value: value.toString(),
                monospace: !0
            });
        text.onFinishChange(val => {
            "time" != key && "delay" != key || (val = Number(val)), write(lookup, key, val)
        }), group.add(text)
    }

    function createNumber(obj, key, group, lookup) {
        let {
            props: props
        } = obj, keys = Object.keys(props);
        if (keys.length > 1) throw "TweenUIL can't deal with a basic Object with more than one key. Define position/rotation/scale or create a tween for each property.";
        let number = new UILControlNumber(`${lookup}${key}`, {
            label: key,
            value: props[keys[0]]
        });
        number.onFinishChange(val => {
            let output = {};
            output[keys[0]] = val, write(lookup, key, output)
        }), group.add(number)
    }

    function createVector(obj, key, group, lookup) {
        let {
            props: props
        } = obj, vector = new UILControlVector(`${lookup}${key}`, {
            label: key,
            value: [props.x, props.y, props.z],
            step: .05
        });
        vector.onFinishChange(val => {
            write(lookup, key, {
                x: val[0],
                y: val[1],
                z: val[2]
            })
        }), group.add(vector)
    }

    function createRotation(obj, key, group, lookup) {
        let {
            props: props
        } = obj, v = (array = [props.x, props.y, props.z]) ? (array.length = 3, array.map(x => Math.degrees(x))) : [0, 0, 0];
        var array;
        let vector = new UILControlVector(`${lookup}${key}`, {
            label: key,
            value: v
        });
        vector.onFinishChange(val => {
            let output = (array => array ? (array.length = 3, array.map(x => Math.radians(x))) : [0, 0, 0])(val);
            write(lookup, key, {
                x: output[0],
                y: output[1],
                z: output[2]
            })
        }), group.add(vector)
    }

    function write(lookup, key, value) {
        let obj = UILStorage.get(lookup) || {};
        obj[key] = value, UILStorage.set(lookup, obj)
    }

    function exit() {
        _this.events.fire(Events.COMPLETE)
    }
    this.gui = _gui,
        function() {
            UIL.add(_gui);
            for (let tween of _tweens) createGroup(tween);
            let button = new UILControlButton("button", {
                actions: [{
                    title: "Exit",
                    callback: exit
                }],
                hideLabel: !0
            });
            _gui.add(button)
        }(), this.onDestroy = function() {
            _gui.destroy()
        }
})), Class((function UILFile(_offline, _path) {
    Inherit(this, Component);
    this.load = async function() {
        let path = window.UIL_STATIC_PATH || "assets/data/uil.json";
        try {
            return await get(path)
        } catch (e) {
            return {}
        }
    }, this.save = async function(sessionData, data) {
        if (Dev.writeFile(window.UIL_STATIC_PATH || "assets/data/uil.json", data), _offline) {
            let partial = {};
            try {
                partial = await get("assets/data/uil-partial.json", data);
                for (let key in sessionData) partial[key] = sessionData[key]
            } catch (e) {
                partial = sessionData
            }
            Dev.writeFile("assets/data/uil-partial.json", partial), Storage.set("uil_update_partial", !0)
        }
    }
})), Class((function UILStorage() {
    Inherit(this, Component);
    const _this = this;
    var _platform, _fs, _keys, _storeIds = [],
        _data = {},
        _dataSession = {},
        _id = window.UIL_ID || "default";
    this.SAVE = "uil_save";
    const OFFLINE_FIREBASE = Utils.query("offlineFB");

    function clearOfflineData() {
        Storage.set("uil_update_partial", !1), Dev.writeFile("assets/data/uil-partial.json", {})
    }
    async function init() {
        if (_fs && _fs.destroy(), _fs = _this.initClass(uilFile() ? UILFile : UILRemote, OFFLINE_FIREBASE), _data[_id] = await _fs.load(), _this.loaded = !0, !OFFLINE_FIREBASE && Storage.get("uil_update_partial") && !uilFile()) {
            if (!confirm("Looks like you have UIL data captured offline, do you want to sync it to Firebase?")) return clearOfflineData();
            let data = await get("assets/data/uil-partial.json");
            for (let key in data) _this.set(key, data[key]);
            write(!0, !0), clearOfflineData()
        }
    }
    async function write(direct, silent) {
        let prevent = !1,
            e = {
                prevent: _ => prevent = !0
            };
        _this.events.fire(_this.SAVE, e), !direct && (e.wait && await e.wait(), prevent) || (_fs.save(_dataSession, _data[_id]), _dataSession = {}, silent || (__body.css({
            display: "none"
        }), _this.delayedCall(() => {
            __body.css({
                display: "block"
            })
        }, 100)))
    }

    function uilFile() {
        return !Utils.query("editMode") && ((!window.DREAM_CONFIG || !Utils.query("uil")) && (!Hydra.LOCAL || (!!Device.mobile || (!!OFFLINE_FIREBASE || (!!window._BUILT_ || (!!window.AURA || (!!window._UIL_FILE_ || (!window._FIREBASE_UIL_ && !window.UIL_ID || !Device.detect("hydra") && !Utils.query("uil")))))))))
    }
    Hydra.ready(async _ => {
        window.Platform && Platform.isDreamPlatform && window.DREAM_CONFIG ? async function initLocalCached() {
            _fs = _this.initClass(UILFile), _data[_id] = await _fs.load(), _this.loaded = !0
        }(): window.Platform && window.Platform.isPlatform || init(), (Utils.query("editMode") || window.Platform && window.Platform.isDreamPlatform && Utils.query("uil") || Hydra.LOCAL && !Device.mobile && !window._BUILT_ && (Utils.query("uil") || Device.detect("hydra"))) && __window.bind("keydown", e => {
            (e.ctrlKey || e.metaKey) && 83 == e.keyCode && (e.preventDefault(), write())
        })
    }), this.reload = function(id, path, persist) {
        _this.loaded = !1, _platform || (_platform = _id), persist && _storeIds.push(id), _id = id, window.UIL_ID = id, window.UIL_STATIC_PATH = path, init()
    }, this.set = function(key, value) {
        null === value ? (delete _data[_id][key], delete _dataSession[key]) : (_data[_id][key] = value, _dataSession[key] = value)
    }, this.setWrite = function(key, value) {
        this.set(key, value), write(!0)
    }, this.clearMatch = function(string) {
        for (let key in _data[_id]) key.includes(string) && delete _data[_id][key];
        write(!0)
    }, this.write = function(silent) {
        write(!0, silent)
    }, this.get = function(key) {
        let val = _data[_id] && _data[_id][key];
        if (void 0 === val && _platform && (val = _data[_platform][key]), void 0 === val && _storeIds)
            for (let i = 0; i < _storeIds.length; i++) val = _data[_storeIds[i]][key];
        return val
    }, this.ready = function() {
        return _this.wait(_this, "loaded")
    }, this.getKeys = function() {
        return _keys || (_keys = Object.keys(_data[_id])), _keys
    }, this.parse = function(key, hint) {
        let data = _data[_id][key];
        if (void 0 === data) return null;
        if (Array.isArray(data)) {
            if (hint instanceof Vector2) return {
                value: (new Vector2).fromArray(data)
            };
            if (hint instanceof Vector3) return {
                value: (new Vector3).fromArray(data)
            };
            if (hint instanceof Vector4) return {
                value: (new Vector4).fromArray(data)
            }
        } else if ("string" == typeof data && "#" === data.charAt(0)) return {
            value: new Color(data)
        };
        return {
            value: data
        }
    }
}), "static"), Class((function UILControl() {
    Inherit(this, Element);
    const _this = this;
    let $this, $label, $content, $view, _value, _previous, _label, _opts, _visible = !0,
        _onChange = () => {},
        _onFinishChange = () => {};

    function isEqual(a, b) {
        return Array.isArray(a) || Array.isArray(b) ? a + "" == b + "" : "object" == typeof a || "object" == typeof b ? JSON.stringify(a) === JSON.stringify(b) : a === b
    }

    function clone(value) {
        return Array.isArray(value) ? [...value] : "object" == typeof value ? Object.assign({}, value) : value
    }! function initHTML() {
        $this = _this.element, $this.size("100%", "auto"), $this.css({
            position: "relative",
            display: "inline-block",
            borderBottom: "1px solid #161616",
            padding: "2px 0",
            boxSizing: "border-box"
        }), $this.attr("data-type", "UILControl"), $this.div._this = _this
    }(),
    function initLabel() {
        $label = $this.create("label"), $label.size("100px", "auto").fontStyle("sans-serif", 12, "#9B9C9B"), $label.css({
            paddingLeft: 4,
            paddingTop: 2,
            boxSizing: "border-box",
            verticalAlign: "top",
            float: "left"
        }), _this.$label = $label
    }(),
    function initContent() {
        $content = $this.create("content"), $content.size("calc(100% - 100px)", "auto").css({
            float: "left"
        }), _this.$content = $content
    }(), this.init = function(id, opts = {}) {
        _this.id = id, _opts = opts, _this.setLabel(opts.label || id), _value = clone(opts.value), _previous = clone(_value), $this.attr("data-id", id)
    }, this.finish = function(history = !0) {
        _onFinishChange(_value), isEqual(_value, _previous) || (history && UILHistory.set(_this, _previous), UILLocalStorage.set(_this.id, _value), _previous = clone(_value))
    }, this.force = function(value) {
        _this.value = clone(value), _this.finish(!1)
    }, this.debounce = function(callback, time = 250) {
        let interval;
        return (...args) => {
            clearTimeout(interval), interval = setTimeout(() => {
                interval = null, callback(...args)
            }, time)
        }
    }, this.onChange = function(cb) {
        return _onChange = cb, _this
    }, this.onFinishChange = function(cb) {
        return _onFinishChange = cb, _this
    }, this.get("value", () => _value), this.set("value", value => {
        isEqual(value, _value) || (_value = clone(value), _this.update && _this.update(_value), _onChange(_value))
    }), this.get("view", () => $view), this.set("view", view => {
        $view && $view.destroy(), $view = view, $content.add($view)
    }), this.hide = function() {
        return _visible = !1, $this.css({
            display: "none"
        }), _this
    }, this.show = function() {
        return _visible = !0, $this.css({
            display: "inline-block"
        }), _this
    }, this.isVisible = function() {
        return _visible
    }, this.setLabel = function(label) {
        _label = label, _this.label = label, $label.text(label), $label.attr("title", label)
    }
})), Class((function UILFolder(_id, _opts = {
    drag: !0
}) {
    Inherit(this, Element);
    const _this = this;
    let $this, $header, $container, $toggle, $drag, $title, _children = {},
        _open = !_opts.closed,
        _visible = !0,
        _order = [],
        _draggable = !1,
        _sortableChildren = !1,
        _headerDrag = !1;
    var _hasClipboard = !1;
    _this.id = _id, _this.label = "" + (_opts.label || _id), _this.level = -1;

    function removeDragHandlers() {
        $this.div.removeEventListener("dragstart", dragStart, !1), $this.div.removeEventListener("dragover", dragOver, !1), $this.div.removeEventListener("drop", drop, !1)
    }

    function matchItem(str, item) {
        return UILFuzzySearch.search(str, item.id.toLowerCase()) || UILFuzzySearch.search(str, item.label.toLowerCase())
    }

    function dragStart(e) {
        if (!UILFolder.DragLock) {
            if (!_headerDrag) return e.preventDefault(), void e.stopPropagation();
            UILFolder.DragLock = _this.id, e.dataTransfer.setData("text/plain", _this.id), e.dataTransfer.effectAllowed = "move", $this.css({
                opacity: .5
            })
        }
    }

    function dragOver(e) {
        e.preventDefault(), e.dataTransfer.dropEffect = "move"
    }

    function drop(e) {
        if (!UILFolder.DragLock) return;
        if (e.dataTransfer.items)
            for (var i = 0; i < e.dataTransfer.items.length; i++)
                if ("file" === e.dataTransfer.items[i].kind) return;
        e.preventDefault(), _headerDrag = !1;
        let target = e.currentTarget._this,
            dragging = _this.parent.get(UILFolder.DragLock);
        UILFolder.DragLock = null, target && target.parent && dragging && (dragging.element.css({
            opacity: 1
        }), dragging.parent.get(target.id) && (e.stopPropagation(), target.parent.container.insertBefore(dragging.element.div, target.element.div), _order = [...target.parent.container.childNodes].map(el => el._this.id), _this.events.fire(UIL.REORDER, {
            order: [..._order]
        }), function saveSort() {
            UILStorage.set(`UIL_${UIL.sortKey}_${_this.parent.id}_order`, JSON.stringify(_order))
        }()))
    }

    function getUrlID() {
        return `${Global.PLAYGROUND||"Global"}_folder_${_id}`
    }

    function saveFolderState() {
        sessionStorage.setItem(getUrlID(), JSON.stringify({
            open: _open
        }))
    }

    function open(keepClosed = !1) {
        _open = !0, $container.css({
            display: "flex"
        }), $toggle && $toggle.text("â–¼"), 1 != keepClosed && forEachFolder(f => f.close()), saveFolderState(), _this.onOpen && _this.onOpen()
    }

    function close() {
        _open = !1, $container.css({
            display: "none"
        }), $toggle && $toggle.text("â–¶"), saveFolderState()
    }

    function onToggle(e) {
        _open ? close() : open()
    }

    function onMouseDown(e) {
        _headerDrag = !0, $header.div.addEventListener("mouseup", onMouseUp)
    }

    function onMouseUp(e) {
        _headerDrag = !1, $header.div.removeEventListener("mouseup", onMouseUp)
    }

    function onKeydown(e) {
        13 === e.which && (_open ? close() : open())
    }

    function onKeyup(e) {
        _hasClipboard && ("c" == e.key && e.metaKey ? function onCopy() {
            UILClipboard.copy(_children)
        }() : "v" == e.key && e.metaKey && function onPaste() {
            UILClipboard.paste(_children)
        }())
    }

    function onFocus() {
        $this.css({
            border: "1px solid #37a1ef"
        }), $this.div.classList.add("active"), _hasClipboard = !0
    }

    function onBlur() {
        $this.css({
            border: "none",
            border: "1px solid #161616"
        }), $this.div.classList.remove("active"), _hasClipboard = !1
    }

    function forEachFolder(cb) {
        return Object.values(_children).forEach(el => {
            el instanceof UILFolder && (cb(el), el.forEachFolder(cb))
        }), _this
    }! function init() {
        $this = _this.element, $this.size("100%", "auto").bg(_opts.background || "#272727"), $this.css({
            position: "relative",
            border: "1px solid #161616",
            boxSizing: "border-box",
            maxHeight: _opts.maxHeight || "none"
        }), $this.attr("data-id", _id), $this.attr("data-type", "UILFolder"), $this.div._this = _this
    }(),
    function style() {
        UIL.addCSS(UILFolder, "\n            .UILFolder *:focus { outline: none; }\n            .UILFolder input:focus { border-color:#37a1ef!important; }\n            .UILFolder button:focus { border-color:#37a1ef!important; }\n            .UILFolder .UILFolder .UILFolder .toggle {margin-left:8px; }\n            .UILFolder .UILFolder .UILFolder .UILFolder .toggle {margin-left:16px; }\n            .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .toggle {margin-left:24px; }\n            .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .toggle {margin-left:32px; }\n            .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .UILFolder .toggle {margin-left:40px; }\n        ")
    }(),
    function initHeader() {
        _opts.hideTitle || ($header = $this.create("title", "a"), $header.attr("tabindex", "0"), $header.size("100%", "auto").bg("#272727"), $header.css({
            display: "block",
            padding: "4px 4px",
            boxSizing: "border-box",
            fontWeight: "bold",
            userSelect: "none",
            borderBottom: "1px solid #161616"
        }), $header.fontStyle("sans-serif", 11, "#B1B1B1"), $header.div.addEventListener("keydown", onKeydown, !1), $header.div.addEventListener("click", onToggle, !1), $header.div.addEventListener("mousedown", onMouseDown), $header.div.addEventListener("focus", onFocus, !1), $header.div.addEventListener("blur", onBlur, !1), $header.div.addEventListener("keydown", onKeyup, !1), $toggle = $header.create("toggle"), $toggle.text(_open ? "â–¼" : "â–¶").css({
            fontSize: 8,
            display: "inline-block",
            verticalAlign: "middle"
        }), $drag = $header.create("drag"), $drag.text("â˜°").css({
            position: "absolute",
            right: 7,
            top: 3,
            display: "inline-block",
            pointerEvents: "none"
        }), $drag.hide(), $title = $header.create("title"), $title.text(_this.label).css({
            display: "inline-block",
            marginLeft: 4
        }))
    }(),
    function initContainer() {
        $container = $this.create("container"), $container.size("100%", "100%").css({
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflowY: "auto"
        }), _open || $container.css({
            display: "none"
        }), _this.container = $container.div
    }(),
    function restoreFolderState() {
        let json = JSON.parse(sessionStorage.getItem(getUrlID()));
        json && (json.open ? open() : close())
    }(), this.add = function(child) {
        return child.draggable && child.draggable(_sortableChildren), child.parent = _this, _children[child.id] = child, $container.add(child), _this
    }, this.remove = function(x) {
        let id = "string" == typeof x ? x : x.id,
            child = _children[id];
        return child.eliminate && child.eliminate(), child.destroy(), _order && (_order = _order.filter(child => child !== id)), delete _children[id], _this
    }, this.get = function(id) {
        return _children[id]
    }, this.getAll = function() {
        return Object.values(_children)
    }, this.getVisible = function() {
        return Object.values(_children).filter(x => x.isVisible())
    }, this.find = function(id) {
        return id === _id ? _this : Object.values(_children).reduce((acc, item) => item.id === id ? acc.concat(item) : item instanceof UILFolder ? acc.concat(item.find(id)) : acc, [])
    }, this.filter = function(str) {
        return function filter(str, match = !1) {
            str = str.toLowerCase();
            let result = [],
                haystack = Object.values(_children);
            for (let el of haystack)
                if (el instanceof UILFolder) {
                    let matches = el.filter(str, !0);
                    matches.length ? (result.concat(matches), el.show(), el.open()) : matchItem(str, el) ? (result.push(el), el.show(), el.showChildren(), el.close()) : el.getVisible().length ? el.show() : el.hide()
                } else matchItem(str, el) ? (result.push(el), el.show()) : el.hide();
            return result
        }(str)
    }, this.filterSingle = function filterSingle(str) {
        str = str.toLowerCase();
        let haystack = Object.values(_children);
        for (let el of haystack) el instanceof UILFolder ? (el.filterSingle(str), str == el.label.toLowerCase() || str == el.id.toLowerCase() ? (el.show(), el.showChildren(), el.open(!0)) : el.getVisible().length ? el.show() : el.hide()) : matchItem(str, el) ? (el.show(), el.open && el.open(!0)) : el.hide();
        return []
    }, this.open = function(keepClosed) {
        return open(keepClosed), _this
    }, this.close = function() {
        return close(), _this
    }, this.setLabel = function(label) {
        return _this.label = "" + label, $title.text(label), _this
    }, this.hide = function() {
        return _visible = !1, $this.css({
            display: "none"
        }), _this
    }, this.show = function() {
        return _visible = !0, $this.css({
            display: "block"
        }), _this
    }, this.showChildren = function() {
        return Object.values(_children).forEach(el => el instanceof UILFolder ? el.showChildren() : el.show()), _this.show(), _this
    }, this.isOpen = function() {
        return _open
    }, this.isVisible = function() {
        return _visible
    }, this.forEachFolder = function(cb) {
        return forEachFolder(cb)
    }, this.forEachControl = function(cb) {
        return Object.values(_children).forEach(el => {
            el instanceof UILFolder ? el.forEachControl(cb) : cb(el)
        }), _this
    }, this.enableSorting = function(key) {
        _sortableChildren = !0, UIL.sortKey = key, Object.values(_children).forEach(el => {
            el instanceof UILFolder && el.draggable(!0)
        });
        let order = function getSort() {
            let sort = UILStorage.get(`UIL_${UIL.sortKey}_${_id}_order`);
            if (sort) return JSON.parse(sort)
        }();
        return order && (_order = order, function restoreSort() {
            _order.forEach(id => {
                _children[id] && $container.add(_children[id])
            })
        }()), _this
    }, this.draggable = function(enable) {
        _draggable = enable, $this.attr("draggable", enable), enable ? (! function addDragHandlers() {
            $this.div.addEventListener("dragstart", dragStart, !1), $this.div.addEventListener("dragover", dragOver, !1), $this.div.addEventListener("drop", drop, !1)
        }(), $drag && $drag.show()) : (removeDragHandlers(), $drag && $drag.hide())
    }, this.toClipboard = function() {
        UILClipboard.copy(_children)
    }, this.fromClipboard = function() {
        UILClipboard.paste(_children)
    }, this.eliminate = function() {
        _opts.hideTitle || ($header.div.removeEventListener("keydown", onToggle, !1), $header.div.removeEventListener("click", onToggle, !1), $header.div.removeEventListener("mousedown", onMouseDown), $header.div.removeEventListener("focus", onFocus, !1), $header.div.removeEventListener("blur", onBlur, !1)), _draggable && removeDragHandlers()
    }, this.forceSort = function(index) {
        _this.parent.container.insertBefore(_this.element.div, _this.parent.container.children[index]), _order = [..._this.parent.container.childNodes].map(el => el._this.id), _this.events.fire(UIL.REORDER, {
            order: [..._order]
        })
    }, this.openChildren = function() {
        Object.values(_children).forEach(el => el instanceof UILFolder ? el.open() : null)
    }
})), Class((function UILPanel(_title, _opts = {}) {
    Inherit(this, Element);
    const _this = this;
    let $this, _folder, _toolbar, _hidden = !1;

    function onKeydown(e) {
        if (e.ctrlKey || e.metaKey) {
            if (72 == e.keyCode && e.shiftKey) {
                if (("" + document.activeElement.type).includes(["textarea", "input", "number"])) return;
                e.preventDefault(), _hidden ? function show() {
                    $this.visible(), _hidden = !1
                }() : function hide() {
                    $this.invisible(), _hidden = !0
                }()
            }
            37 == e.keyCode && e.shiftKey && (e.preventDefault(), $this.css({
                left: 0,
                right: "auto"
            })), 39 == e.keyCode && e.shiftKey && (e.preventDefault(), $this.css({
                left: "auto",
                right: 0
            })), 67 == e.which && e.shiftKey && (e.preventDefault(), _folder.forEachFolder(f => f.close())), 79 == e.which && e.shiftKey && (e.preventDefault(), _folder.forEachFolder(f => f.open()))
        }
    }

    function undim() {
        $this.css({
            opacity: 1
        })
    }

    function dim() {
        $this.css({
            opacity: .3
        })
    }
    _this.id = _title,
        function initHTML() {
            $this = _this.element, $this.size(_opts.width || "300px", _opts.height || "auto").bg("#161616").mouseEnabled(!0), "left" === _opts.side ? $this.css({
                left: 0
            }) : $this.css({
                right: 0
            }), $this.css({
                top: 0,
                maxHeight: _opts.maxHeight || "100%",
                position: "absolute",
                userSelect: "none",
                padding: 4,
                overflowY: "auto",
                borderRadius: 4
            }), $this.hide()
        }(),
        function initToolbar() {
            _toolbar = _this.toolbar = _this.initClass(UILPanelToolbar)
        }(),
        function initGroup() {
            _folder = _this.initClass(UILFolder, _title, {
                hideTitle: !0,
                drag: !1,
                background: "#161616"
            }), _this.folder = _folder
        }(),
        function addHandlers() {
            document.addEventListener("keydown", onKeydown, !1), _opts.hide && ($this.div.addEventListener("mouseover", undim, !1), $this.div.addEventListener("mouseleave", dim, !1))
        }(), this.add = function(child) {
            return $this.show(), _folder.add(child), _this
        }, this.remove = function(x) {
            return _folder.remove(x.id), _this
        }, this.get = function(id) {
            return _folder.get(id)
        }, this.find = function(id) {
            return _folder.find(id)
        }, this.filter = function(str) {
            return _folder.filter(str)
        }, this.enableSorting = function(key) {
            return _folder.enableSorting && _folder.enableSorting(key), _this
        }, this.eliminate = function() {
            _toolbar.eliminate(), $this.div.removeEventListener("mouseover", undim, !1), $this.div.removeEventListener("mouseleave", dim, !1), document.removeEventListener("keydown", onKeydown, !1)
        }
})), Class((function UILControlButton(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, _buttons = [];
    ! function init() {
        _this.init(_id, _opts), _opts.hideLabel && (_this.$label.css({
            display: "none"
        }), _this.$content.css({
            width: "100%"
        }))
    }(),
    function initActions() {
        $view = $("inputs");
        let config = [].concat(_opts.actions);
        _buttons = [].concat(_opts.actions).map(({
            title: title,
            callback: callback
        }) => {
            let btn = $view.create("btn btn-" + title, "button");
            return btn.text(title).bg("#1d1d1d"), btn.css({
                width: "calc(100% / " + (config.length || 1),
                border: "1px solid #2e2e2e",
                color: "#37a1ef",
                position: "relative"
            }), btn.interact(e => function hover(btn, e) {
                "over" === e.action ? btn.css({
                    border: "1px solid #9b9c9b"
                }) : btn.css({
                    border: "1px solid #2e2e2e"
                })
            }(btn, e)), btn.click(e => function click(e, title, callback) {
                _this.value = title, callback && callback(title, e), _this.finish()
            }(e, title, callback)), btn
        }), _this.view = $view
    }(), this.setTitle = function(text) {
        _buttons.forEach(btn => {
            btn.text(text)
        })
    }
})), Class((function UILControlCheckbox(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, $label, $checkbox, $slider;

    function toggle() {
        $checkbox.attr("checked", _this.value), $slider.css({
            right: _this.value ? 0 : "auto"
        }), $label.bg(_this.value ? "#37a1ef" : "#1d1d1d")
    }

    function click() {
        _this.value = !_this.value, toggle(), _this.finish()
    }

    function focus() {
        $label.css({
            border: "1px solid #37a1ef"
        })
    }

    function blur() {
        $label.css({
            border: "1px solid #2e2e2e"
        })
    }! function init() {
        _opts.value = _opts.value || !1, _this.init(_id, _opts)
    }(),
    function initView() {
        $view = $("view"), $label = $view.create("label", "label"), $label.size(30, 15).css({
            position: "relative",
            display: "inline-block",
            borderRadius: 15,
            border: "1px solid #2e2e2e"
        }).bg(_this.value ? "#37a1ef" : "#1d1d1d"), $checkbox = $label.create("checkbox", "input"), $checkbox.attr("type", "checkbox"), $checkbox.attr("checked", _this.value), $checkbox.css({
            opacity: 0,
            width: "100%",
            position: "absolute"
        }), $slider = $label.create("slider"), $slider.size(15, 15).css({
            borderRadius: 15,
            position: "absolute",
            right: _this.value ? 0 : "auto",
            boxSizing: "border-box"
        }).bg("#ffffff"), _this.view = $view
    }(),
    function addHandlers() {
        $checkbox.div.addEventListener("focus", focus, !1), $checkbox.div.addEventListener("blur", blur, !1), $checkbox.div.addEventListener("click", click, !1), $checkbox.div.addEventListener("keypress", click, !1)
    }(), this.update = function() {
        toggle()
    }, this.onDestroy = function() {
        $checkbox.div.removeEventListener("focus", focus, !1), $checkbox.div.removeEventListener("blur", blur, !1), $checkbox.div.removeEventListener("click", click, !1), $checkbox.div.removeEventListener("keypress", click, !1)
    }
})), Class((function UILControlColor(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    var $display, _input;

    function onDisplayClick() {
        _input && (_this.events.unsub(_input, Events.UPDATE, onChange), _input = _input.destroy()), _input = _this.initClass(UILExternalColor, _opts.label || _id, _this.value), _this.events.sub(_input, Events.UPDATE, onChange)
    }

    function onChange({
        value: value
    }) {
        _this.value = value, $display.bg(_this.value), $display.hex.css({
            color: _this.value
        }).text(_this.value), finishChange()
    }

    function finishChange() {
        _this.finish()
    }! function init() {
        _opts.value = _opts.value || "#ffffff", _this.init(_id, _opts)
    }(),
    function initInput() {
        let $view = $("color");
        $view.css({
            position: "relative"
        }).css({
            padding: 1
        }), ($display = $view.create("color")).size("100%", "100%").bg(_this.value), $display.css({
            border: "1px solid #2E2E2E",
            boxSizing: "border-box"
        }), $display.hex = $display.create("hex"), $display.hex.text(_this.value), $display.hex.css({
            color: _this.value,
            filter: "invert(100%)",
            fontSize: 12,
            fontFamily: "sans-serif",
            padding: 1
        }), _this.view = $view
    }(),
    function addHandlers() {
        $display.interact(null, onDisplayClick), finishChange = _this.debounce(finishChange, 250)
    }(), this.update = function() {
        $display.bg(_this.value), $display.hex.css({
            color: _this.value
        }).text(_this.value)
    }, this.onDestroy = function() {}
})), Class((function UILControlFile(_id, _opts = {
    value: {}
}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, $picker, $preview, $img, $input, $$copy, _value;
    async function change(e) {
        let file = $picker.div.files[0];
        file && (_value.filename = file.name, _value.relative = function getRelative() {
                return _value.relative.includes(_value.prefix) ? _value.relative.replace("" + _value.prefix, "") : _value.relative
            }(), _value.src = function getSrc() {
                return `${_value.prefix?_value.prefix+"/":""}${_value.relative?_value.relative+"/":""}${_value.filename}`
            }(), await
            function fileExists(url) {
                return fetch(url).then(e => 404 != e.status).catch(e => console.warn("UILControlImage image url validation failed", e))
            }(_value.src) ? (_this.value = Object.assign({}, _value), $img.attr("title", _value.src), $$copy.text(_value.filename), _this.finish()) : ($picker.div.value = "", console.warn("UIL: Could not find file", _value), alert(`"${_value.src}" not found!\nMake sure "relative path" is correct.`)))
    }

    function focus() {
        $img.css({
            border: "1px solid #37a1ef"
        })
    }

    function blur() {
        $img.css({
            border: "1px dotted #2e2e2e"
        })
    }

    function inputChange() {
        _value.relative = $input.div.value
    }! function init() {
        _opts.value = Object.assign({
            src: "",
            relative: _opts.relative || "",
            prefix: _opts.prefix,
            filename: ""
        }, _opts.value), _value = Object.assign({}, _opts.value), _this.init(_id, _opts)
    }(),
    function initView() {
        $view = $("view"), $view.css({
            position: "relative",
            padding: 5
        }), $input = $view.create("path", "input"), $input.size("100%").bg("#1D1D1D"), $input.css({
            boxSizing: "border-box",
            border: "1px solid #2E2E2E",
            color: "#37A1EF",
            marginBottom: 5
        }), _this.value.relative ? $input.div.value = _this.value.relative : $input.attr("placeholder", "Relative Path"), $preview = $view.create("preview"), $preview.size("100%", 60), $preview.css({
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
        }), $img = $preview.create("img"), $img.size("100%"), $img.css({
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "1px dotted #2e2e2e",
            boxSizing: "border-box"
        }), $picker = $preview.create("picker", "input"), $picker.attr("type", "file"), $picker.css({
            opacity: 0,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }), $$copy = $preview.create("copy"), $$copy.html("Drag file here<br><small>or Click to Select</small>"), $$copy.fontStyle("sans-serif", 11, "#9B9C9B").css({
            textAlign: "center"
        }), _this.view = $view
    }(),
    function addHandlers() {
        $picker.div.addEventListener("change", change, !1), $picker.div.addEventListener("focus", focus, !1), $picker.div.addEventListener("blur", blur, !1), $input.div.addEventListener("change", inputChange, !1)
    }(), this.force = function(value) {
        _value = Object.assign({}, value), $input.div.value = _value.relative, $img.attr("title", _value.src), $$copy.text(_value.filename)
    }, this.onDestroy = function() {
        $picker.div.removeEventListener("change", change, !1), $picker.div.removeEventListener("focus", focus, !1), $picker.div.removeEventListener("blur", blur, !1), $input.div.removeEventListener("change", inputChange, !1)
    }
})), Class((function UILControlImage(_id, _opts = {
    value: {}
}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, $picker, $preview, $img, $input, $check, $compress, _value;
    async function compressClick() {
        if (_value.src && !_this.flag("compressPending")) {
            _this.flag("compressPending", !0), $compress.bg("#f4ee42").text("---");
            try {
                "Error" == await Dev.execUILScript("compressktx", {
                    src: _value.src
                }) ? $compress.bg("#f44141").html("Failed") : $compress.bg("#46f441").html("Success")
            } catch (e) {
                $compress.bg("#f44141").html("Failed"), console.error(e)
            }
            _this.flag("compressPending", !1)
        }
    }

    function checkChange() {
        _this.value.compressed = _value.compressed = !!$check.div.checked, _this.finish(!1)
    }
    async function change(e) {
        let file = $picker.div.files[0];
        file && (_value.filename = file.name, _value.relative = function getRelative() {
                return _value.relative.includes(_value.prefix) ? _value.relative.replace("" + _value.prefix, "") : _value.relative
            }(), _value.src = function getSrc() {
                return `${_value.prefix?_value.prefix+"/":""}${_value.relative?_value.relative+"/":""}${_value.filename}`
            }(), _value.compressed = !!$check.div.checked, await
            function imageExists(url) {
                return url = Assets.getPath(url), fetch(url).then(e => 404 != e.status).catch(e => console.warn("UILControlImage image url validation failed", e))
            }(_value.src) ? (_this.value = Object.assign({}, _value), $img.attr("title", _value.src), $img.css({
                backgroundImage: `url(${Assets.getPath(_value.src)})`
            }), _this.finish()) : ($picker.div.value = "", console.warn("UIL: Could not find image", _value), alert(`"${_value.src}" not found!\nMake sure "relative path" is correct.`)))
    }

    function focus() {
        $img.css({
            border: "1px solid #37a1ef"
        })
    }

    function blur() {
        $img.css({
            border: "1px dotted #2e2e2e"
        })
    }

    function inputChange() {
        _value.relative = $input.div.value
    }! function init() {
        _opts.value = Object.assign({
            src: "",
            relative: _opts.relative || "",
            prefix: _opts.prefix || "assets/images",
            filename: ""
        }, _opts.value), _value = Object.assign({}, _opts.value), _this.init(_id, _opts)
    }(),
    function initView() {
        $view = $("view"), $view.css({
            position: "relative",
            padding: 5
        }), $input = $view.create("path", "input"), $input.size("100%").bg("#1D1D1D"), $input.css({
            boxSizing: "border-box",
            border: "1px solid #2E2E2E",
            color: "#37A1EF",
            marginBottom: 5
        }), _this.value.relative ? $input.div.value = _this.value.relative : $input.attr("placeholder", "Relative Path"), $compress = $view.create("compress"), $compress.text("Compress").bg("#fff").css({
            top: 3,
            width: 70,
            height: 15,
            textAlign: "center",
            borderRadius: 5,
            position: "relative",
            float: "left",
            paddingTop: 2
        }).fontStyle("sans-serif", 11, "#000"), $check = $view.create("#compressed", "input"), $check.attr("type", "checkbox"), $check.size(20, 20), $check.css({
            boxSizing: "border-box",
            position: "relative"
        }), $check.div.checked = !!_this.value.compressed;
        let $label = $view.create("compressed-label", "label");
        $label.attr("for", "compressed"), $label.text("Use Compressed").fontStyle("sans-serif", 9, "#9B9C9B").css({
            top: -6,
            position: "relative"
        }), $preview = $view.create("preview"), $preview.size("100%", 60), $preview.css({
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
        }), $img = $preview.create("img"), $img.size("100%"), $img.css({
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "1px dotted #2e2e2e",
            boxSizing: "border-box"
        }), _this.value.src && $img.css({
            backgroundImage: `url('${Assets.getPath(_this.value.src)}')`
        }), $picker = $preview.create("picker", "input"), $picker.attr("type", "file"), $picker.attr("accept", "image/*"), $picker.css({
            opacity: 0,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        });
        let copy = $preview.create("copy");
        copy.html("Drag image here<br><small>or Click to Select</small>"), copy.fontStyle("sans-serif", 11, "#9B9C9B").css({
            textAlign: "center"
        }), _this.view = $view
    }(),
    function addHandlers() {
        $picker.div.addEventListener("change", change, !1), $picker.div.addEventListener("focus", focus, !1), $picker.div.addEventListener("blur", blur, !1), $input.div.addEventListener("change", inputChange, !1), $compress.div.onclick = compressClick, $check.div.onchange = checkChange
    }(), this.force = function(value, isClipboard) {
        _value = Object.assign({}, value), !0 === isClipboard && (_this.value = _value), $input.div.value = _value.relative, $img.attr("title", _value.src), $img.css({
            backgroundImage: `url('${Assets.getPath(_value.src)}')`
        }), $check.div.checked = _value.compressed
    }, this.onDestroy = function() {
        $picker.div.removeEventListener("change", change, !1), $picker.div.removeEventListener("focus", focus, !1), $picker.div.removeEventListener("blur", blur, !1), $input.div.removeEventListener("change", inputChange, !1)
    }
})), Class((function UILControlNumber(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let _input;
    ! function init() {
        _opts.value = _opts.value || 0, _this.init(_id, _opts)
    }(),
    function initInput() {
        _input = _this.initClass(UILInputNumber, Object.assign(_opts, {
            value: _this.value
        })), _input.onInput(v => _this.value = v), _input.onFinish(v => _this.finish()), _this.view = _input.input
    }(), this.update = function(value) {
        _input.value = _this.value || 0
    }
})), Class((function UILControlRange(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, $slider, _max = _opts.max || 100,
        _min = _opts.min || 0,
        _step = _opts.step || 1;

    function change() {
        _this.finish()
    }

    function input(e) {
        _this.value = Number($slider.div.value)
    }

    function focus() {
        $slider.css({
            border: "1px solid #37a1ef"
        })
    }

    function blur() {
        $slider.css({
            border: "1px solid #2e2e2e"
        })
    }! function init() {
        _opts.value = _opts.value || 0, _this.init(_id, _opts)
    }(),
    function style() {
        UIL.addCSS(UILControlRange, "\n            .UILControlRange input { -webkit-appearance:none; appearance:none; }\n            .UILControlRange input::-webkit-slider-thumb { -webkit-appearance: none; }\n            .UILControlRange input::-webkit-slider-thumb { \n                -webkit-appearance:none; appearance:none;\n                width:15px; height:15px;\n                background:#FFF;\n                border-radius:15px;\n            }\n            .UILControlRange input::-moz-slider-thumb { \n                -webkit-appearance:none; appearance:none;\n                width:15px; height:15px;\n                background:#FFF;\n                border-radius:15px;\n            }\n        ")
    }(),
    function initView() {
        $view = $("view"), $slider = $view.create("range", "input"), $slider.attr("type", "range"), $slider.attr("max", _max), $slider.attr("min", _min), $slider.attr("step", _step), $slider.div.value = _this.value, $slider.css({
            width: "100%",
            margin: 0,
            padding: 0,
            background: "#1d1d1d",
            height: 4,
            borderRadius: 15,
            border: "1px solid #2e2e2e",
            boxSizing: "border-box"
        }), _this.view = $view
    }(),
    function addHandlers() {
        $slider.div.addEventListener("change", change, !1), $slider.div.addEventListener("input", input, !1), $slider.div.addEventListener("focus", focus, !1), $slider.div.addEventListener("blur", blur, !1)
    }(), this.force = function(value) {
        _this.value = value, $slider.div.value = value, _this.finish(!1)
    }, this.onDestroy = function() {
        $slider.div.removeEventListener("change", change, !1), $slider.div.removeEventListener("input", input, !1), $slider.div.removeEventListener("focus", focus, !1), $slider.div.removeEventListener("blur", blur, !1)
    }
})), Class((function UILControlSelect(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, $select, _options;

    function change() {
        _this.finish()
    }

    function input() {
        let i = $select.div.selectedIndex;
        _this.value = _options[i].value
    }

    function focus() {
        $select.css({
            border: "1px solid #37a1ef"
        })
    }

    function blur() {
        $select.css({
            border: "1px solid #2e2e2e"
        })
    }! function init() {
        if (!_opts.options) throw "UILControlSelect is missing select options";
        _opts.value = _opts.value || _opts.options[0].value, _this.init(_id, _opts)
    }(),
    function style() {
        UIL.addCSS(UILControlSelect, "\n            .UILControlSelect select { -webkit-appearance:none; appearance:none; }\n        ")
    }(),
    function initView() {
        $view = $("view"), $view.css({
            position: "relative"
        }), $select = $view.create("dropdown", "select"), $select.css({
            width: "100%",
            margin: 0,
            padding: 0,
            background: "#1d1d1d",
            height: 15,
            border: "1px solid #2e2e2e",
            boxSizing: "border-box",
            color: "#37a1ef",
            borderRadius: 0,
            height: 17
        }), $select.div.value = _this.value, $view.create("arrow").text("â–¼").css({
            color: "#37a1ef",
            fontSize: 6,
            position: "absolute",
            right: 8,
            top: 7,
            pointerEvents: "none"
        }), _this.view = $view
    }(),
    function initOptions() {
        _options = _opts.options.map(({
            value: value,
            label: label
        }) => {
            let el = document.createElement("option");
            return el.setAttribute("value", value), _this.value === value && el.setAttribute("selected", !0), el.text = label || value, el.value = value, $select.add(el), el
        })
    }(),
    function addHandlers() {
        $select.div.addEventListener("change", change, !1), $select.div.addEventListener("input", input, !1), $select.div.addEventListener("focus", focus, !1), $select.div.addEventListener("blur", blur, !1)
    }(), this.force = function(value) {
        $select.div.value = value, _this.value = value
    }, this.onDestroy = function() {
        $select.div.removeEventListener("change", change, !1), $select.div.removeEventListener("input", input, !1), $select.div.removeEventListener("focus", focus, !1), $select.div.removeEventListener("blur", blur, !1)
    }
})), Class((function UILControlText(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $input, _timeout;

    function onChange(v) {
        clearTimeout(_timeout), _timeout = setTimeout(onFinishChange, 400), _this.value = $input.div.value
    }

    function onFinishChange() {
        null !== _timeout && (clearTimeout(_timeout), _timeout = null, _this.finish())
    }
    _this.init(_id, _opts),
        function initInput() {
            $input = $("input", "input"), $input.size("100%").bg("#1D1D1D"), $input.css({
                boxSizing: "border-box",
                border: "1px solid #2E2E2E",
                color: "#37A1EF"
            }), _this.value && ($input.div.value = _this.value || ""), _this.view = $input
        }(),
        function addHandlers() {
            $input.div.addEventListener("input", onChange, !1), $input.div.addEventListener("change", onFinishChange, !1)
        }(), this.update = function() {
            $input.div.value = _this.value || ""
        }, this.onDestroy = function() {
            $input.div.removeEventListener("input", onChange, !1), $input.div.removeEventListener("change", onBlur, !1)
        }
})), Class((function UILControlTextarea(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $input, _timeout;

    function onChange(v) {
        clearTimeout(_timeout), _timeout = setTimeout(onFinishChange, 400), _this.value = $input.div.value
    }

    function onFinishChange() {
        null !== _timeout && (clearTimeout(_timeout), _timeout = null, _this.finish())
    }
    _this.init(_id, _opts),
        function initInput() {
            $input = $("input", "textarea"), $input.attr("maxlength", _opts.max || 1 / 0), $input.attr("minlength", _opts.min || -1 / 0), $input.attr("rows", _opts.rows || 2), $input.attr("readonly", _opts.readonly || !1), $input.size("100%").bg("#1D1D1D"), $input.css({
                boxSizing: "border-box",
                resize: _opts.resize || "vertical",
                minWidth: _opts.minWidth || 0,
                border: "1px solid #2E2E2E",
                color: "#37A1EF"
            }), (_opts.monospace || _opts.editor) && $input.css({
                fontFamily: "monospace"
            }), _this.value && ($input.div.value = _this.value || ""), _this.view = $input
        }(), _opts.editor && function enableTab() {
            $input.div.onkeydown = function(e) {
                if (9 === e.keyCode) {
                    let val = this.value,
                        start = this.selectionStart,
                        end = this.selectionEnd;
                    this.value = val.substring(0, start) + "\t" + val.substring(end), this.selectionStart = this.selectionEnd = start + 1, e.preventDefault()
                }
            }
        }(),
        function addHandlers() {
            $input.div.addEventListener("input", onChange, !1), $input.div.addEventListener("change", onFinishChange, !1)
        }(), this.update = function() {
            $input.div.value = _this.value || ""
        }, this.onDestroy = function() {
            $input.div.removeEventListener("input", onChange, !1), $input.div.removeEventListener("change", onBlur, !1)
        }
})), Class((function UILControlVector(_id, _opts = {}) {
    Inherit(this, UILControl);
    const _this = this;
    let $view, _length, _inputs = [],
        _vector = [];

    function onInput(value, index, master) {
        master ? _vector = _vector.map(v => value) : _vector[index] = value, _this.value = [..._vector]
    }! function init() {
        if (_opts.value) _length = _vector.length;
        else {
            if (!_opts.components) throw 'UILControlVector: Cannot detect vector type. Define "options.components" count or init with a initial value';
            _opts.value = new Array(_opts.components).fill(0)
        }
        _length = _opts.value.length, _this.init(_id, _opts), _vector = [..._this.value]
    }(),
    function initInputs() {
        $view = $("inputs");
        for (let i = 0; i < _length; i++) {
            let input = _this.initClass(UILInputNumber, _opts);
            input.value = _this.value[i], input.onInput((v, m) => onInput(v, i, m)), input.onFinish((v, m) => {
                _this.finish()
            }), input.input.css({
                display: "inline-block",
                width: `calc(100% / ${_length})`
            }), _inputs.push(input), $view.add(input.input)
        }
        _this.view = $view
    }(), this.force = function(value) {
        _vector = [...value], _this.value = [..._vector], _inputs.forEach((input, index) => input.value = _this.value[index]), _this.finish(!1)
    }, this.update = function() {
        _inputs.forEach((input, index) => input.value = _this.value[index])
    }
})), Class((function UILInputNumber(_opts = {}) {
    Inherit(this, Component);
    const _this = this;
    let $input, _timeout, _distance, _onMouseDownValue, _editing = !1,
        _precision = _opts.precision || 3,
        _step = _opts.step || 1,
        _min = _opts.min || -1 / 0,
        _max = _opts.max || 1 / 0,
        _value = _opts.value || 0,
        _pointer = [0, 0],
        _prevPointer = [0, 0],
        _onInputCB = () => {},
        _onFinishCB = () => {};

    function setValue(value) {
        (value = parseFloat(value) || 0) < _min && (value = _min), value > _max && (value = _max), _value = value, _onInputCB(value, _this.master)
    }

    function onBlur() {
        onFinishChange(), $input.div.value = parseFloat(_value).toFixed(_precision)
    }

    function onKeyUp(e) {
        13 === e.keyCode && e.altKey && (_this.master = !0, onInput())
    }

    function onInput(e) {
        _timeout = setTimeout(onFinishChange, 400), _editing = !0, setValue(parseFloat($input.div.value))
    }

    function onFinishChange() {
        _editing && (_editing = !1, clearTimeout(_timeout), _onFinishCB(_value, _this.master), _this.master = !1)
    }

    function onMouseDown(e) {
        (1 === e.button || 0 === e.button && e.metaKey || e.ctrlKey) && (e.preventDefault(), $input.css({
            cursor: "col-resize"
        }), _distance = 0, _onMouseDownValue = _value, _prevPointer = [e.screenX, e.screenY], document.addEventListener("mousemove", onMouseMove, !1), document.addEventListener("mouseup", onMouseUp, !1))
    }

    function onMouseMove(e) {
        clearTimeout(_timeout), _editing = !0;
        let currentValue = _value;
        _pointer = [e.screenX, e.screenY], _distance += _pointer[0] - _prevPointer[0] - (_pointer[1] - _prevPointer[1]);
        let value = _onMouseDownValue + _distance / (e.shiftKey ? 5 : 50) * _step;
        value = Math.min(_max, Math.max(_min, value)), _this.master = e.altKey, currentValue !== value && function setValueDrag(value) {
            void 0 === value && value === $input.div.value || (setValue(value), $input.div.value = _value.toFixed(_precision))
        }(value), _prevPointer = [e.screenX, e.screenY]
    }

    function onMouseUp(e) {
        onFinishChange(), $input.css({
            cursor: ""
        }), document.removeEventListener("mousemove", onMouseMove, !1), document.removeEventListener("mouseup", onMouseUp, !1)
    }! function initInput() {
        $input = $("input", "input"), $input.attr("type", "number"), $input.attr("step", _step), $input.size("100%").bg("#1D1D1D"), $input.css({
            boxSizing: "border-box",
            border: "1px solid #2E2E2E",
            color: "#37A1EF",
            boxShadow: "none"
        }), $input.div.value = parseFloat(_value).toFixed(_precision), _this.input = $input
    }(),
    function addHandlers() {
        $input.div.addEventListener("mousedown", onMouseDown, !1), $input.div.addEventListener("keyup", onKeyUp, !1), $input.div.addEventListener("change", onFinishChange, !1), $input.div.addEventListener("blur", onBlur, !1), $input.div.addEventListener("input", onInput, !1)
    }(), this.set("value", value => {
        _value = value, _editing || ($input.div.value = parseFloat(value).toFixed(_precision))
    }), this.get("value", () => _value), this.onInput = cb => _onInputCB = cb, this.onFinish = cb => _onFinishCB = cb, this.onDestroy = function() {
        $input.div.removeEventListener("mousedown", onMouseDown, !1), $input.div.removeEventListener("change", onFinishChange, !1), $input.div.removeEventListener("blur", onBlur, !1), $input.div.removeEventListener("input", onInput, !1)
    }
})), Class((function UILExternalColor(_title, _value) {
    Inherit(this, Component);
    const _this = this;
    var _window;

    function onReload() {
        _this.onDestroy()
    }(_window = window.open("http://localhost/hydra/editor/color/index.html", "hydra_color_" + _title, "width=480,height=220,left=200,top=100,location=no")).window.onload = _ => {
        _window.window.initPicker(_title, _value, _this)
    }, window.addEventListener("beforeunload", onReload), this.update = function(value) {
        _this.events.fire(Events.UPDATE, {
            value: value
        })
    }, this.onDestroy = function() {
        window.removeEventListener("beforeunload", onReload), _window && _window.window && _window.window.close()
    }
})), Class((function UILExternalEditor(_title, _height = 500) {
    Inherit(this, Component);
    const _this = this;
    var _window, _code, _language;
    _window = window.open("http://localhost/hydra/editor/code/index.html", "_blank", `width=700,height=${_height},left=200,top=100`), _this.events.sub(Events.UNLOAD, _ => _window.close()), _window.window.onload = _ => {
        _window.window.initEditor(_title, _code, _language, _this)
    }, this.setCode = function(code, language) {
        _code = code, _language = language
    }, this.saved = async function(code) {
        _this.onSave && _this.onSave(code), await defer(), UILStorage.write()
    }
})), Class((function UILPanelToolbar() {
    Inherit(this, Element);
    const _this = this;
    let $this, $filter, _state = new Map;

    function restoreFolderState() {
        _this.parent.folder.forEachFolder(folder => {
            _state.get(folder) ? folder.open() : folder.close()
        }), _state.clear()
    }

    function onInput(e) {
        if (!$filter.div.value.length) return restoreFolderState(), _this.parent.folder.showChildren();
        _this.parent.folder.filter($filter.div.value)
    }

    function onFocus() {
        ! function saveFolderState() {
            _this.parent.folder.forEachFolder(folder => {
                _state.set(folder, folder.isOpen())
            })
        }(), $filter.css({
            border: "1px solid #37a1ef"
        })
    }

    function onBlur() {
        $filter.css({
            border: "1px solid #2e2e2e"
        })
    }

    function onKeyPressed(e) {
        if (27 === e.keyCode) return $filter.div.value = "", restoreFolderState(), _this.parent.folder.showChildren()
    }! function initHTML() {
        $this = _this.element, $this.size("100%", "auto").bg("#272727"), $this.css({
            padding: 4,
            boxSizing: "border-box",
            marginBottom: 4
        })
    }(),
    function initFilter() {
        $filter = $this.create("filter", "input"), $filter.div.addEventListener("input", onInput, !1), $filter.div.addEventListener("keydown", onKeyPressed, !1), $filter.div.addEventListener("focus", onFocus, !1), $filter.div.addEventListener("blur", onBlur, !1), $filter.size("100%", "auto").bg("#161616"), $filter.css({
            color: "#B1B1B1",
            border: "1px solid #2e2e2e",
            outline: "none",
            padding: 2,
            boxSizing: "border-box"
        })
    }(), this.eliminate = function() {
        $filter.div.removeEventListener("input", onInput, !1), $filter.div.removeEventListener("keydown", onKeyPressed, !1), $filter.div.removeEventListener("focus", onFocus, !1), $filter.div.removeEventListener("blur", onBlur, !1)
    }, this.filter = function(text) {
        $filter.div.value = text, onInput()
    }, this.filterSingle = function(text) {
        $filter.div.value = text, _this.parent.folder.filterSingle($filter.div.value)
    }, this.hideAll = function() {
        _this.flag("init") || (_this.flag("init", !0), this.filterSingle("xxxxxx"))
    }
})), Class((function Video(_params) {
    Inherit(this, Component);
    const _this = this;
    let $video, _video, _loadingState, _handlers, _ready = Promise.create(),
        _loaded = Promise.create(),
        _initialPlay = !0;

    function startPreload() {
        return _loadingState = !0, _ready
    }
    async function startPlayback() {
        _this.playing || (_loadingState = !1, await _ready, _this.playing || (_initialPlay && (_initialPlay = !1, _video.currentTime = _params.currentTime), _this.playing = !0, _video.play()))
    }

    function getSource(src = "") {
        return src.includes(["webm", "mp4", "ogv"]) || (src += "." + Device.media.video), src
    }

    function progress(e) {
        _this.events.fire(Video.PROGRESS, e)
    }

    function timeupdate(e) {
        _this.events.fire(Video.UPDATE, e)
    }

    function play(e) {
        if (_loadingState) return _loadingState = !1;
        _this.events.fire(Video.PLAY, e)
    }

    function pause(e) {
        _this.events.fire(Video.PAUSE, e)
    }

    function playing(e) {
        _this.events.fire(Video.PLAYING, e)
    }

    function ended(e) {
        _this.events.fire(Video.ENDED, e)
    }

    function waiting(e) {
        _this.events.fire(Video.WAITING, e)
    }

    function canplay(e) {
        loadeddata(), _this.events.fire(Video.CANPLAY, e)
    }

    function loadeddata(e) {
        _video.readyState >= 2 && _ready.resolve(), _video.readyState >= 4 && _loaded.resolve()
    }! function initParam() {
        _params = Object.assign({
            muted: !0,
            loop: !1,
            autoplay: !1,
            inline: !0,
            controls: !1,
            currentTime: 0,
            playback: 1,
            preload: !1,
            width: 640,
            height: 360,
            events: []
        }, _params)
    }(),
    function init() {
        return _video = document.createElement("video"), _video.src = getSource(_params.src), _video.setAttribute("crossorigin", "anonymous"), _video.autoplay = _params.autoplay, _video.loop = _params.loop, _video.controls = _params.controls, _video.height = _params.height, _video.width = _params.width, _video.defaultMuted = _params.muted, _video.defaultPlaybackRate = _params.playback, _video.preload = _params.preload, _video.muted = _params.autoplay || _params.muted, _video.setAttribute("webkit-playsinline", _params.inline), _video.setAttribute("playsinline", _params.inline), _video.autoplay && _video.setAttribute("autoplay", _params.autoplay), _video.setAttribute("muted", _params.muted), _params.loop && _video.setAttribute("loop", _params.loop), _this.div = _video, $video = $(_video), _params.autoplay ? startPlayback() : _params.preload ? startPreload() : void 0
    }(),
    function addHandlers() {
        _params.events.push("loadeddata"), _handlers = {
            play: play,
            pause: pause,
            ended: ended,
            playing: playing,
            progress: progress,
            waiting: waiting,
            timeupdate: timeupdate,
            loadeddata: loadeddata,
            canplay: canplay
        }, _params.events.forEach(ev => _video.addEventListener(ev, _handlers[ev], !0))
    }(), this.set("loop", bool => _video.loop = bool), this.get("loop", () => _video.loop), this.set("src", src => {
        src !== _video.src && (_video.src = getSource(src))
    }), this.get("src", () => _video.currentSrc), this.set("volume", v => {
        _video.muted = 0 === v, _video.volume = v
    }), this.get("volume", () => _video.volume), this.set("muted", bool => _video.muted = bool), this.get("muted", () => _video.muted), this.set("controls", bool => _video.controls = bool), this.get("controls", () => _video.controls), this.get("duration", () => _video.duration), this.get("ended", () => _video.ended), this.get("playback", () => _video.playbackRate), this.get("time", () => _video.currentTime), this.get("canRender", () => _video.readyState >= 2), this.get("canPlayThrough", () => _video.readyState >= 4), this.get("paused", () => _video.paused), this.get("element", () => $video), this.get("object", () => $video), this.get("video", () => _video), this.get("bufferedSeconds", _ => _video.readyState < 2 ? 0 : _video.buffered.end(0) - _video.buffered.start(0)), this.load = async function() {
        return startPreload()
    }, this.play = async function() {
        return startPlayback()
    }, this.pause = function() {
        _this.playing = !1, _video.pause()
    }, this.stop = function() {
        _this.playing && (_this.playing = !1, _video.pause(), _this.seek(0))
    }, this.seek = function(t) {
        if (_video.fastSeek) return _video.fastSeek(t);
        _video.currentTime = t
    }, this.seekExact = function(t) {
        _video.currentTime = t
    }, this.ready = function() {
        return _ready
    }, this.loaded = function() {
        return _loaded
    }, this.onDestroy = function() {
        _this.stop(), _video.src = "",
            function removeListeners() {
                _params.events.forEach(ev => _video.removeEventListener(ev, _handlers[ev], !0))
            }(), _video = null
    }
}), () => {
    Video.PLAY = "hydra_video_play", Video.CANPLAY = "hydra_video_can_play", Video.PAUSE = "hydra_video_pause", Video.PROGRESS = "hydra_video_progress", Video.UPDATE = "hydra_video_update", Video.PLAYING = "hydra_video_playing", Video.ENDED = "hydra_video_ended", Video.WAITING = "hydra_video_waiting"
}), Class((function SocketConnection(_server, _channel) {
    Inherit(this, Component);
    var _socket, _pingPong, _this = this,
        _fail = 0;

    function connect() {
        _this.pending = !1, (_socket = new WebSocket(_server, ["permessage-deflate"])).onopen = open, _socket.onmessage = message, _socket.onclose = close, _socket.onerror = close
    }

    function sendPing() {
        _socket && _socket.readyState == WebSocket.OPEN && _socket.send("ping")
    }

    function open(e) {
        _fail = 0, _this.connected = !0, _this.events.fire(SocketConnection.OPEN, {
            socket: _this
        }, !0), _channel && _this.send("register", {
            channel: _channel
        }), _pingPong = setInterval(sendPing, 5e3)
    }

    function message(e) {
        if ("pong" == e.data || "ping" == e.data) return;
        let data = JSON.parse(e.data),
            evt = data._evt;
        delete data._evt, _this.events.fire(evt, data, !0)
    }

    function close(e) {
        _this.pending || _fail++ > 25 || (_this.connected = !1, _this.pending = !0, _this.events.fire(SocketConnection.CLOSE, {
            socket: _this
        }, !0), _this.delayedCall(connect, 250), clearTimeout(_pingPong))
    }
    this.connected = !1, async function() {
        try {
            connect()
        } catch (e) {
            await defer(), _this.events.fire(SocketConnection.ERROR, {
                socket: _this
            }), _this.delayedCall(connect, 250)
        }
    }(), this.send = function(evt, data = {}) {
        if (!_this.connected) return _this.delayedCall(_ => _this.send(evt, data), 100);
        data._evt = evt, _socket && _socket.readyState == WebSocket.OPEN && _socket.send(null != data.length ? data : JSON.stringify(data))
    }
}), _ => {
    SocketConnection.OPEN = "socket_connection_open", SocketConnection.CLOSE = "socket_connection_close", SocketConnection.ERROR = "socket_connection_error"
}), Class((function Tests() {
    this.getDPR = function() {
        return GPU.OVERSIZED ? .8 : GPU.lt(0) ? 1 : GPU.lt(1) ? Math.min(Device.pixelRatio, 1.2) : GPU.lt(2) ? Math.min(Device.pixelRatio, 1.35) : GPU.lt(3) ? Math.min(Device.pixelRatio, 1.5) : GPU.lt(4) ? Math.min(Device.pixelRatio, 2) : GPU.mobileLT(0) ? 1 : GPU.mobileLT(1) ? Math.min(Device.pixelRatio, 1.2) : GPU.mobileLT(2) ? Math.min(Device.pixelRatio, 1.35) : GPU.mobileLT(3) ? Math.min(Device.pixelRatio, 1.5) : GPU.mobileLT(4) ? Math.min(Device.pixelRatio, 2) : 1
    }, this.renderClouds = function() {
        return !0
    }, this.multiVideo = function() {
        return !!GPU.gt(2)
    }
}), "static"), Class((function ViewportEnter($element, {
    onEnter: onEnter,
    onLeave: onLeave
} = {}) {
    Inherit(this, Component);
    const _this = this;
    var _ready = Promise.create();
    async function onViewportEnter() {
        clearTimeout(_this.outTimeout), $element && onEnter && !_this.visible && (await _ready, _this.visible = !0, onEnter($element))
    }
    async function onViewportLeave() {
        clearTimeout(_this.outTimeout), $element && onLeave && _this.visible && (await _ready, _this.outTimeout = _this.delayedCall(_ => {
            _this.visible = !1, onLeave($element)
        }, 2e3))
    }
    _this.visible = !1, ViewportEnter.observer.observe($element.div), $element._onViewportEnter = onViewportEnter, $element._onViewportLeave = onViewportLeave, onLeave($element), _this.wait(300).then(() => {
        _ready.resolve()
    }), this.onDestroy = function() {
        $element.div && ViewportEnter.observer.unobserve($element.div)
    }
}), () => {
    ViewportEnter.observer = new IntersectionObserver((function onIntersection(entries) {
        entries.forEach(entry => {
            entry.isIntersecting ? entry.target.hydraObject._onViewportEnter() : entry.target.hydraObject._onViewportLeave()
        })
    }), {
        threshold: [.4]
    })
}), Class((function Container() {
    Inherit(this, Element);
    const _this = this,
        $this = this.element;
    var _landing;
    ! function initHTML() {
        Stage.add($this), $this.css({
            position: "static"
        })
    }(), async function loadView() {
        let loaderView = _this.initClass(LoaderView),
            loader = _this.initClass(AssetLoader, Assets.list().filter(["shaders", "data"]));
        _this.events.sub(loader, Events.PROGRESS, loaderView.progress), _this.events.sub(loader, Events.COMPLETE, () => {
                loaderView.animateOut(() => loaderView = loaderView.destroy())
            }), await Initializer3D.createWorld(), await Content.ready(),
            function initView() {
                World.instance(), $this.add(World.ELEMENT), _landing = _this.initClass(Landing), World.SCENE.add(_landing.group), UI.instance()
            }()
    }()
}), "singleton"), Class((function Playground() {
    Inherit(this, Component);
    const _this = this;
    let _view;
    !async function() {
        await UILStorage.ready(), Global.PLAYGROUND = Utils.query("p"),
            function initThree() {
                World.instance(), Stage.add(World.ELEMENT)
            }(),
            function initView() {
                let request = Global.PLAYGROUND.split("/")[0],
                    view = window["Playground" + request] || window[request] || null;
                if (!view) throw `No Playground class ${request} found.`;
                _view = view.instance ? view.instance() : _this.initClass(view), _view.element && Stage.add(_view.element);
                if (_view.rt && _view.scene && _view.nuke)
                    if (request.includes("Figma")) {
                        let dimensions = _view.dimensions,
                            $obj = $gl(dimensions[0], dimensions[1], _view.rt.texture);
                        $obj.x = 40, $obj.y = 40, "portrait" === Utils.query("orientation") && ($obj.scale = .5, $obj.y = -300), GLUI.Stage.add($obj)
                    } else {
                        let shader = _this.initClass(Shader, "ScreenQuad", {
                                tMap: {
                                    value: _view
                                }
                            }),
                            mesh = new Mesh(World.QUAD, shader);
                        mesh.frustumCulled = !1, World.SCENE.add(mesh)
                    }
                else World.SCENE.add(_view.group || _view.mesh || _view.object3D || new Group);
                Dev.expose("view", _view)
            }(), defer(window.onresize)
    }()
}), "singleton"), Class((function UI() {
    Inherit(this, Element), Inherit(this, PushState);
    var $this, $wrapper, _content, _title, _this = this;
    async function changePage(e) {
        if (_this.value == e.split[0]) return;
        _this.value = e.split[0];
        let home = !0,
            data = Content.HOME;
        if (Content.EVENTS.forEach((event, index) => {
                event.perma == _this.value && event.active && (data = event, _this.index = index, "home" !== _this.value && (home = !1))
            }), home && _this.setState(""), _content && (await _content.animateOut(), _content = _content.destroy(), $wrapper.div.innerHTML = ""), Overlay.instance().visible && Overlay.instance().animateOut(), $this.div.scrollTop = 0, home) _this.events.fire(LiquidBackground.RESET);
        else {
            let color1 = data.bg[0] || "#ffffff",
                color2 = data.bg[1] || "#ff0000",
                color3 = data.bg[2] || "#0000ff";
            _this.events.fire(LiquidBackground.CHANGE_COLOR, {
                color1: color1,
                color2: color2,
                color3: color3
            })
        }
        _title && data.title && _title.update(data.title), await _this.wait(home ? 700 : 1100), _content = _this.initClass(home ? UILanding : ContentView, data, [$wrapper]), data.perma && _this.setState(data.perma), await _this.wait(100), _content.animateIn()
    }
    _this.fireChangeWhenSet = !0,
        function initHTML() {
            ($this = _this.element).size("100%"), Stage.add($this), $this.overflowScroll({
                y: 1
            }), $this.css({
                overflowY: "scroll"
            }), ($wrapper = $this.create(".wrapper")).css({
                position: "relative",
                display: "block"
            })
        }(),
        function initLogos() {
            _this.initClass(UILogo, [Stage]), _this.initClass(UIBuiltby, [Stage]), _title = _this.initClass(UITitle, [Stage])
        }(), _this.setRoot("/"),
        function addHandlers() {
            _this.events.sub(_this, Events.UPDATE, changePage)
        }(), _this.delayedCall(_ => {
            let value = _this.getState();
            changePage({
                value: value,
                split: value ? value.split("/") : [""]
            })
        }, 300), this.nextProject = function() {
            let index = _this.index + 1;
            index > Content.EVENTS.length - 1 && (index = 0), UI.instance().setState(Content.EVENTS[index].perma)
        }, this.animateIn = function() {
            _content.animateIn()
        }
}), "singleton"), Class((function World() {
    Inherit(this, Component);
    const _this = this;
    let _renderer, _scene, _camera, _nuke, _controls;

    function resize() {
        _renderer.setSize(Stage.width, Stage.height), _camera.aspect = Stage.width / Stage.height, _camera.updateProjectionMatrix()
    }

    function loop(t, delta) {
        _controls && _controls.enabled && _controls.update(), RenderManager.render()
    }
    World.DPR = Tests.getDPR(),
        function initWorld() {
            World.PLANE = new PlaneGeometry(1, 1), World.PLANE_HIGH = new PlaneGeometry(1, 1, 20, 20), World.QUAD = Utils3D.getQuad(), World.BOX = new BoxGeometry(1, 1, 1), World.SPHERE = new SphereGeometry(1, 16, 16), RenderManager.initialize(RenderManager.NORMAL, {
                powerPreference: "high-performance"
            }), _renderer = RenderManager.gl, _scene = RenderManager.scene, _camera = RenderManager.camera.worldCamera, _nuke = RenderManager.nuke, World.SCENE = _scene, World.RENDERER = _renderer, World.ELEMENT = $(_renderer.domElement), World.CAMERA = _camera, World.NUKE = _nuke, _nuke.add(new FXAA)
        }(),
        function initControls() {
            if (!Utils.query("orbit")) return;
            if (!window.DebugControls) return;
            let Controls = Utils.query("wasd") ? WASDControls : DebugControls;
            _controls = new Controls(_camera, World.ELEMENT.div), RenderManager.type == RenderManager.NORMAL ? (_camera.position.set(0, 0, 6), _camera.target = new Vector3(0, 0, 0), _camera.lookAt(_camera.target), _controls.target = _camera.target) : _controls.enabled = !1, World.CONTROLS = _controls
        }(),
        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize)
        }(), Utils.query("uilOnly") || Render.onDrawFrame(loop), RenderManager.type == RenderManager.NORMAL && Camera.instance(_camera)
}), (function() {
    var _instance;
    World.instance = function() {
        return _instance || (_instance = new World), _instance
    }
})), Class((function ContentView(_data) {
    Inherit(this, Element);
    var $this, _content, _scroll, _this = this,
        _videos = [],
        _lastIndex = -1;

    function loop() {
        let dir = _scroll.delta.y;
        dir && _videos.forEach((video, index) => {
            let diff = video.element.div.getBoundingClientRect().top;
            index == _lastIndex || (dir > 0 || diff >= 0) && diff <= Stage.height / 2 && (dir > 0 ? index >= _lastIndex : index <= _lastIndex) ? (_lastIndex = index, video.play()) : video.stop()
        })
    }! function initHTML() {
        ($this = _this.element).css({
            width: "100%",
            minHeight: 1e3,
            marginBottom: 100,
            display: "block",
            position: "relative"
        }).invisible(), _data.color && $this.css({
            color: _data.color
        })
    }(), _scroll = _this.initClass(Scroll, {
        limit: !1
    }), _data.content && function initContent() {
        _content = [];
        let count = 0;
        _data.content.forEach((data, index) => {
            if (data.view) {
                "ContentDetail" == data.view && (count++, count % 2 == 0 && (data.right = !0)), data.parentView = _this;
                let view = _this.initClass(window[data.view], data, _data, [$this]);
                _content.push(view), data.video && _videos.push(view)
            }
        });
        let end = _this.initClass(ContentFooter, null, _data, [$this]);
        _content.push(end)
    }(), _this.delayedCall(() => {
        Tests.multiVideo() || _this.startRender(loop)
    }, 100), this.animateIn = async function() {
        $this.visible(), _content.forEach((content, i) => {
            content.element.animateIn(400 * i, i < 2)
        })
    }, this.animateOut = async function() {
        $this.tween({
            opacity: 0
        }, 200, "easeOutSine"), await _this.wait(200)
    }
})), Class((function ContentAbstract() {
    Inherit(this, Element);
    var $this, $wrapper, _this = this;

    function resize() {
        let padding = Device.mobile.phone ? 0 : 210,
            width = Math.min(1800, Stage.width) - padding;
        $wrapper.css({
            width: width,
            left: (Stage.width - width) / 2
        }), $wrapper.width = width
    }! function initHTML() {
        ($this = _this.element).css({
            width: "100%",
            minHeight: 300,
            overflow: "hidden",
            marginBottom: 1,
            position: "relative",
            display: "inline-block"
        }).invisible(), ($wrapper = $this.create(".wrapper")).css({
            position: "relative",
            display: "block",
            margin: Device.mobile.phone ? "25px 0" : "50px 0"
        }).setZ(10), Device.mobile.phone && $wrapper.css({
            width: "100%",
            padding: 0
        }), _this.wrapper = $wrapper
    }(),
    function addHandlers() {
        _this.events.sub(Events.RESIZE, resize)
    }(), resize(), _this.element.animateIn = function(delay, animate) {
        $this.visible(), animate && ($this.css({
            opacity: 0
        }).transform({
            y: 50
        }).tween({
            opacity: 1,
            y: 0
        }, 1e3, "easeOutQuart", delay), _this.animate && _this.animate.forEach(($element, i) => {
            $element.css({
                opacity: 0
            }).transform({
                y: 50
            }).tween({
                opacity: 1,
                y: 0
            }, 1e3, "easeOutQuart", delay + 150 * i)
        }))
    }
})), Class((function ContentBreak(_data) {
    Inherit(this, ContentAbstract);
    var $inner, _this = this;
    _this.element.css({
        minHeight: 200
    }), ($inner = _this.wrapper.create(".inner")).css({
        display: "flex",
        maxWidth: 800,
        margin: "60px auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center"
    }), Device.mobile.phone && $inner.css({
        width: "80%"
    }), _data.title && function initTitle() {
        _this.initClass(ContentTitle, _data.title, [$inner]).element.css({
            fontWeight: "300"
        })
    }(), this.animateIn = function() {}
})), Class((function ContentButton({
    text: text,
    url: url,
    fontSize: fontSize = (Device.mobile.phone ? 11 : 13),
    fontColor: fontColor = "#222222",
    hoverColor: hoverColor = "#ffffff",
    borderWeight: borderWeight = 1,
    icon: icon = !1
}) {
    Inherit(this, Element);
    var $this, $text, $bg, $wrapper, $over, _this = this;

    function hover(e) {
        switch (e.action) {
            case "over":
                $bg.tween({
                    scaleY: 1
                }, 200, "easeOutCubic"), $text.tween({
                    y: -10,
                    opacity: 0
                }, 200, "easeOutCubic"), $over.tween({
                    y: 0,
                    opacity: 1
                }, 200, "easeOutCubic");
                break;
            case "out":
                $bg.tween({
                    scaleY: 0
                }, 400, "easeOutCubic"), $text.tween({
                    color: fontColor
                }, 400, "easeOutSine"), $text.tween({
                    y: 0,
                    opacity: 1
                }, 400, "easeOutCubic"), $over.tween({
                    y: 10,
                    opacity: 0
                }, 400, "easeOutCubic")
        }
    }

    function click() {
        url ? open(url) : _this.events.fire(Events.CLICK, {
            text: text
        })
    }! function initHTML() {
        ($this = _this.element).css({
            position: "relative",
            marginTop: 10,
            display: "inline-block",
            width: "auto"
        }), $this.create(".border").size("100%").css({
            left: -borderWeight,
            top: -borderWeight,
            border: borderWeight + "px solid " + fontColor
        }), ($bg = $this.create(".bg")).size("100%").bg(fontColor).css({
            border: "1px solid " + fontColor
        }).transformPoint("50%", "100%").transform({
            scaleY: 0
        });
        let padding = "watch video" == text.toLowerCase() ? "17px 30px" : "15px 23px";
        ($wrapper = $this.create(".wrapper")).css({
            position: "relative",
            display: "block",
            padding: padding,
            textAlign: "center"
        })
    }(),
    function initText() {
        let size = "watch video" == text.toLowerCase() ? fontSize + 1 : fontSize;
        ($text = $wrapper.create(".text")).fontStyle("DM Sans", size, fontColor), $text.css({
            textTransform: "uppercase",
            display: "inline-block",
            letterSpacing: "0.1em",
            fontWeight: "700",
            position: "relative"
        }), $text.text(text), ($over = $wrapper.create(".text")).fontStyle("DM Sans", size, hoverColor), $over.css({
            textTransform: "uppercase",
            top: "50%",
            marginTop: .6 * -size,
            letterSpacing: "0.1em",
            fontWeight: "700",
            opacity: 0
        }).transform({
            y: 10
        }), $over.text(text)
    }(),
    function addHandlers() {
        $this.interact(hover, click)
    }(), this.animateIn = function() {}
})), Class((function ContentCopy(_text = "Missing Copy") {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        let size = 16;
        Device.mobile.phone && (size = 14), ($this = _this.element).fontStyle("Roboto", size, "#7f909a"), $this.css({
            fontWeight: "400",
            color: "inherit",
            marginTop: 20,
            position: "relative",
            lineHeight: "1.7em",
            display: "inline-block"
        }), $this.html(_text)
    }(), this.animateIn = function() {}
})), Class((function ContentHeading(_text = "Missing Title") {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        let size = 24;
        Device.mobile.phone && (size = 18), ($this = _this.element).fontStyle("Roboto", size, "#2d3b3e"), $this.css({
            fontWeight: "300",
            color: "inherit",
            position: "relative",
            lineHeight: "1.5em",
            display: "inline-block"
        }), $this.html(_text)
    }(), this.animateIn = function() {}
})), Class((function ContentImage() {
    Inherit(this, Element);
    var $this, _this = this;

    function resize() {
        $this.css({
            width: "100%",
            height: "56.6&"
        })
    }! function initHTML() {
        ($this = _this.element).css({
            width: "70%",
            height: "50%",
            position: "relative",
            display: "inline-block"
        }).bg("#f0f")
    }(),
    function addHandlers() {
        _this.events.sub(Events.RESIZE, resize)
    }(), resize(), this.animateIn = function() {}
})), Class((function ContentSubTitle(_text = "Missing Title") {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        let size = 30;
        Device.mobile.phone && (size = 20), ($this = _this.element).fontStyle("Roboto", size, "#2d3b3e"), $this.css({
            fontWeight: "300",
            color: "inherit",
            position: "relative",
            lineHeight: "1.5em",
            display: "inline-block"
        }), $this.html(_text)
    }(), this.animateIn = function() {}
})), Class((function ContentTitle(_text = "Missing Title") {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        let size = 40;
        Device.mobile.phone && (size = 28), ($this = _this.element).fontStyle("DM Sans", size, "#2d3b3e"), $this.css({
            fontWeight: "400",
            lineHeight: "1.2em",
            color: "inherit",
            letterSpacing: "-0.01em",
            position: "relative",
            display: "inline-block"
        }), $this.html(_text)
    }(), this.animateIn = function() {}
})), Class((function ContentVideo(_video) {
    Inherit(this, Element);
    var _this = this;

    function resize() {}! function initHTML() {
        _this.element.css({
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            display: "inline-block"
        }).mouseEnabled(!1)
    }(),
    function initVideo() {
        (_video = _this.initClass(Video, {
            width: 960,
            height: 540,
            loop: !0,
            muted: !0,
            autoplay: !0,
            src: _video
        })).element.css({
            width: "100%",
            height: "auto",
            position: "relative",
            display: "inline-block"
        }), Device.mobile.phone || _video.element.css({
            borderRadius: "30px 0 30px 0"
        })
    }(),
    function addHandlers() {
        _this.events.sub(Events.RESIZE, resize)
    }(), this.play = function() {
        _video.play()
    }, this.stop = function() {
        _video.pause()
    }, this.animateIn = function() {}
})), Class((function ContentDetail(_data) {
    Inherit(this, ContentAbstract);
    var $left, $right, _video, _this = this;
    _data.bg && _this.element.css({
        background: _data.bg
    }), _data.color && _this.element.css({
        color: _data.color
    }), _this.wrapper.css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }), ($left = _this.wrapper.create(".wrapper")).css({
        position: "relative",
        minHeight: 300,
        width: "70%"
    }), ($right = _this.wrapper.create(".wrapper")).css({
        position: "relative",
        marginLeft: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
        width: "25%"
    }), _data.right && (_this.wrapper.css({
        flexDirection: "row-reverse"
    }), $right.css({
        marginLeft: "",
        marginRight: "5%",
        textAlign: Device.mobile.phone ? "center" : "right"
    })), Device.mobile.phone && (_this.wrapper.css({
        textAlign: "center",
        flexDirection: "column"
    }), $left.css({
        position: "relative",
        display: "block",
        width: "100%",
        margin: "0 auto",
        minHeight: ""
    }), $right.css({
        position: "relative",
        display: "block",
        width: "70%",
        margin: "0 auto",
        minHeight: "",
        marginTop: 20
    })), _data.title && function initTitle() {
        _this.initClass(ContentHeading, _data.title, [$right])
    }(), _data.image && function initImage() {
        _this.initClass(ContentImage, _data.image, [$left])
    }(), _data.video && function initVideo() {
        _video = _this.initClass(ContentVideo, _data.video, [$left])
    }(), this.play = function() {
        _video && _video.play()
    }, this.stop = function() {
        _video && _video.stop()
    }, this.animateIn = function() {}
})), Class((function ContentFooter(_data, _parentData) {
    Inherit(this, ContentAbstract);
    var $buttons, _return, _next, _this = this;
    ! function initButton() {
        _this.element.css({
            minHeight: 100,
            marginBottom: Device.mobile.phone ? 50 : 100,
            overflow: "visible"
        }), _this.wrapper.css({
            minHeight: "",
            margin: 0,
            marginTop: 30,
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }), ($buttons = _this.wrapper.create(".buttons")).css({
            postion: "relative",
            display: "flex",
            padding: "0 20px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }), _return = _this.initClass(ContentButton, {
            text: "Return Home",
            fontColor: _parentData.color,
            hoverColor: _parentData.bg[1]
        }, [$buttons]), _this.events.sub(_return, Events.CLICK, _ => {
            UI.instance().setState("")
        }), _return.element.css({
            margin: 5
        }), _next = _this.initClass(ContentButton, {
            text: "Next",
            fontColor: _parentData.color,
            hoverColor: _parentData.bg[1]
        }, [$buttons]), _this.events.sub(_next, Events.CLICK, _ => {
            UI.instance().nextProject()
        }), _next.element.css({
            margin: 5
        }), _this.initClass(ContentButton, {
            text: "Contact",
            url: "mailto:hello@dreamwave.tech",
            fontColor: _parentData.color,
            hoverColor: _parentData.bg[1]
        }, [$buttons]).element.css({
            margin: 5
        })
    }(), this.animateIn = function() {}
})), Class((function ContentGallery(_data, _parentData) {
    Inherit(this, ContentAbstract);
    var $images, $progress, _images, _slider, _progressDots, _this = this,
        _activeSliderIndex = 0;

    function onSliderUpdate(e) {
        _activeSliderIndex = e.slide, _progressDots.forEach(dot => {
            dot.index == e.slide ? (dot.tween({
                opacity: 1,
                scale: 1
            }, 300, "easeOutCubic"), _images[dot.index].tween({
                opacity: 1
            }, 300, "easeOutCubic")) : (dot.tween({
                opacity: .25,
                scale: .8
            }, 400, "easeOutCubic"), _images[dot.index].tween({
                opacity: .7
            }, 400, "easeOutCubic"))
        })
    }

    function onDotHover(e) {
        switch (e.action) {
            case "over":
                e.object.index != _activeSliderIndex && e.object.tween({
                    opacity: .7,
                    scale: .9
                }, 300, "easeOutCubic");
                break;
            case "out":
                e.object.index != _activeSliderIndex && e.object.tween({
                    opacity: .3,
                    scale: .8
                }, 300, "easeOutCubic")
        }
    }

    function onDotClick(e) {
        _slider.moveTo(e.object.index)
    }
    async function resize() {
        await defer();
        let width = Math.range(Stage.width, 300, 1200, 350, 700);
        Device.mobile && Stage.width < Stage.height && (width = Stage.width - 40), width > 960 && (width = 960), width = Math.round(width), _slider.width = width, $images.css({
            width: _data.images.length * (width + 0),
            height: width * $images.rotio
        });
        let offset = _this.wrapper.width / 2 - width / 2;
        _images.forEach(($image, index) => {
            $image.css({
                width: width,
                height: width * $image.inner.ratio
            }), $image.transform({
                x: (width + 0) * index + offset,
                y: (width * $images.rotio - width * $image.inner.ratio) / 2
            })
        }), _progressDots.forEach(dot => {
            dot.css({
                width: Device.mobile ? "11px" : "14px",
                height: Device.mobile ? "11px" : "14px"
            })
        })
    }
    _this.wrapper.css({
            textAlign: "center"
        }), _data.title && function initTitle() {
            _this.initClass(ContentSubTitle, _data.title, [_this.wrapper]).element.css({
                maxWidth: 600,
                margin: "0 auto",
                padding: "0 20px"
            })
        }(), _data.images && (function initImages() {
            ($images = _this.wrapper.create(".images")).css({
                position: "relative",
                display: "block",
                marginTop: 30,
                marginBottom: 30
            }), $images.rotio = 9 / 16, _images = [], _data.images.forEach((data, i) => {
                let $image = $images.create(".image");
                $image.css({
                    position: "absolute",
                    opacity: 0 == i ? 1 : .7
                }), $image.inner = $image.create(".image-inner"), $image.inner.css({
                    position: "absolute",
                    borderRadius: 10,
                    width: "98%",
                    left: "1%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }).bg(data || "#666"), $image.inner.ratio = 9 / 16;
                let image = new Image;
                image.src = data, image.onload = function(d) {
                    $image.inner.ratio = image.height / image.width, $images.rotio = Math.max($images.rotio, $image.inner.ratio)
                }, _images.push($image)
            }), _slider = _this.initClass(Interaction.Slider, $images, {
                x: !0
            }, {
                hit: $images,
                slides: _images.length
            })
        }(), function initProgress() {
            _progressDots = [], ($progress = _this.wrapper.create(".progress")).css({
                position: "relative",
                display: "flex",
                justifyContent: "center"
            });
            for (let i = 0; i < _data.images.length; i++) {
                let $progressDot = $progress.create(".progress-dot");
                $progressDot.css({
                    position: "relative",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: _parentData.color,
                    opacity: 0 == i ? 1 : .25,
                    margin: "0 9px"
                }).transform({
                    scale: 0 == i ? 1 : .8,
                    y: 0
                }), $progressDot.index = i, $progressDot.interact(onDotHover, onDotClick), $progressDot.hit.size(32, 32).center(), _progressDots.push($progressDot)
            }
        }()),
        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize), _this.events.sub(Interaction.Slider.UPDATE, onSliderUpdate)
        }(), resize(), _this.delayedCall(resize, 1e3), this.animateIn = function() {}
})), Class((function ContentGrid(_data, _dataParent) {
    Inherit(this, ContentAbstract);
    var $content, _content, _this = this;
    _this.wrapper.css({
        textAlign: "center"
    }), _data.title && function initTitle() {
        _this.initClass(ContentTitle, _data.title, [_this.wrapper])
    }(), _data.results && function initContent() {
        ($content = _this.wrapper.create(".images")).css({
            position: "relative",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 50
        }), _content = [], _data.results.forEach(data => {
            let $item = $content.create(".item");
            $item.css({
                width: 180,
                position: "relative",
                margin: 10,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
                flexDirection: "column",
                width: 300,
                height: Device.mobile.phone ? 150 : 200
            }), $item.create(".glow").size("100%").css({
                border: "1px solid " + _dataParent.color,
                opacity: .15
            });
            let $text = $item.create(".name");
            $text.fontStyle("Roboto", 40, "#2d3b3e"), $text.css({
                fontWeight: "300",
                lineHeight: "1.4em",
                color: "inherit",
                position: "relative",
                display: "block"
            }), $text.text(data.text);
            let $title = $item.create(".title");
            $title.fontStyle("DM Sans", 11, "#2d3b3e"), $title.css({
                fontWeight: "500",
                textTransform: "uppercase",
                marginTop: 0,
                color: "inherit",
                letterSpacing: "0.1em",
                position: "relative",
                display: "block"
            }), $title.text(data.title), _content.push($item)
        })
    }(), this.animateIn = function() {}
})), Class((function ContentHero(_data, _parentData) {
    Inherit(this, ContentAbstract);
    var _title, _copy, _video, _play, _link, $inner, $buttons, _this = this;
    _this.animate = [], ($inner = _this.wrapper.create(".inner")).css({
        display: "flex",
        paddingBottom: 50,
        maxWidth: 800,
        margin: "0 auto",
        marginTop: Device.mobile.phone ? 150 : 200,
        position: "relative",
        overflow: "visible",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center"
    }), Device.mobile.phone && $inner.css({
        width: "85%"
    }), _data.title && function initTitle() {
        (_title = _this.initClass(ContentTitle, _data.title, [$inner])).element.css({
            fontSize: Device.mobile.phone ? 42 : 60
        }), _this.animate.push(_title.element)
    }(), _data.copy && function initCopy() {
        _copy = _this.initClass(ContentCopy, _data.copy, [$inner]), _this.animate.push(_copy.element)
    }(), (_parentData.embed_id || _parentData.experience_url) && (function initButtons() {
        ($buttons = $inner.create(".buttons")).css({
            position: "relative",
            display: "block",
            marginTop: 30
        })
    }(), _parentData.embed_id && function initPlay() {
        _play = _this.initClass(ContentButton, {
            text: "Watch Video",
            fontColor: _parentData.color,
            hoverColor: _parentData.bg[2],
            borderWeight: 2
        }, [$buttons]), _this.animate.push(_play.element), _this.events.sub(_play, Events.CLICK, _ => {
            Overlay.instance().animateIn(_parentData.bg[0], _parentData.embed_id, _parentData.embed_ratio)
        })
    }(), _parentData.experience_url && function initLink() {
        _link = _this.initClass(ContentButton, {
            text: "Try it out",
            fontColor: _parentData.color,
            hoverColor: _parentData.bg[2],
            borderWeight: 2
        }, [$buttons]), _play && _link.element.css({
            marginLeft: 10
        }), _this.animate.push(_link.element), _this.events.sub(_link, Events.CLICK, _ => {
            open(_parentData.experience_url)
        })
    }()), console.log(_parentData), this.play = function() {
        _video && _video.play()
    }, this.stop = function() {
        _video && _video.stop()
    }, this.animateIn = function() {
        console.log("animate in")
    }
})), Class((function ContentReviews(_data, _dataParent) {
    Inherit(this, ContentAbstract);
    var $reviews, _reviews, _this = this;
    _this.wrapper.css({
        textAlign: "center"
    }), _data.title && function initTitle() {
        _this.initClass(ContentTitle, _data.title, [_this.wrapper])
    }(), _data.reviews && function initReviews() {
        ($reviews = _this.wrapper.create(".images")).css({
            position: "relative",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 50
        }), _reviews = [], _data.reviews.forEach(data => {
            let $review = $reviews.create(".image");
            $review.css({
                width: 200,
                position: "relative",
                margin: Device.mobile.phone ? 5 : 10,
                display: "inline-block",
                textAlign: "left",
                width: "auto",
                flexBasis: Device.mobile.phone ? "70%" : "25%",
                padding: 30,
                height: "auto"
            }), $review.create(".glow").size("100%").css({
                top: 0,
                left: 0,
                border: "1px solid " + _dataParent.color,
                opacity: .15
            }), Device.mobile.phone && $review.css({
                width: 130,
                padding: 20
            });
            let $name = $review.create(".name");
            $name.fontStyle("DM Sans", Device.mobile.phone ? 9 : 11, "#2d3b3e"), $name.css({
                opacity: .6,
                fontWeight: "600",
                textTransform: "uppercase",
                color: "inherit",
                letterSpacing: "0.1em",
                position: "relative",
                display: "block"
            }), $name.text(data.user);
            let size = Math.range(data.text.length, 10, 100, 28, 17, !0);
            Device.mobile.phone && (size *= .8), size = Math.round(size);
            let $text = $review.create(".name");
            $text.fontStyle("Roboto", size, "#2d3b3e"), $text.css({
                fontWeight: "300",
                lineHeight: "1.4em",
                color: "inherit",
                marginTop: 12,
                position: "relative",
                display: "block"
            }), $text.text(data.text), _reviews.push($review)
        })
    }(), this.animateIn = function() {}
})), Class((function Horizon(_mesh, _shader) {
    Inherit(this, Component);
    const _this = this;
    _shader.addUniforms({
        tFBM: {
            value: Utils3D.getRepeatTexture("assets/images/bg/fbm-64.png")
        },
        tStars: {
            value: Utils3D.getRepeatTexture("assets/images/bg/stars.jpg")
        },
        uStars: {
            value: 0
        },
        uColor: {
            value: new Color("#000000")
        },
        uColor2: {
            value: new Color("#000000")
        },
        uColor3: {
            value: new Color("#000000")
        },
        uCldColor: {
            value: new Color("#000000")
        },
        uBlack: {
            value: 0
        },
        uCldScale: {
            value: 15
        },
        uCldWeight: {
            value: .3
        },
        uCldSpeed: {
            value: .01
        },
        uCldDark: {
            value: .5
        },
        uCldLight: {
            value: 0
        },
        uCldClamp: {
            value: 2
        },
        uCldAlpha: {
            value: 1
        },
        uIntro: {
            value: 0
        },
        uEnabled: {
            value: 0,
            ignoreUIL: !0
        },
        uClds: {}
    }), _this.startRender((function loop() {
        _shader.set("uIntro", Global.INTRO_ALPHA)
    }))
})), Class((function LiquidBackground(_mesh, _shader, _group, _input) {
    Inherit(this, Component);
    var _this = this,
        _saveColor1 = (new Color, new Color, new Color, new Color),
        _saveColor2 = new Color,
        _saveColor3 = new Color;

    function changeColor(e) {
        _shader.uniforms.uTransitionColor1.value.setStyle(e.color1), _shader.uniforms.uTransitionColor2.value.setStyle(e.color2), _shader.uniforms.uTransitionColor3.value.setStyle(e.color3), _shader.tween("uTransition", 1, 1100, "easeInOutCubic", _ => {
            _shader.set("uTransition", 0), _shader.uniforms.uColor1.value.setStyle(e.color1), _shader.uniforms.uColor2.value.setStyle(e.color2), _shader.uniforms.uColor3.value.setStyle(e.color3)
        })
    }

    function reset() {
        _shader.uniforms.uTransitionColor1.value.copy(_saveColor1), _shader.uniforms.uTransitionColor2.value.copy(_saveColor2), _shader.uniforms.uTransitionColor3.value.copy(_saveColor3), _shader.tween("uTransition", 1, 1100, "easeInOutCubic", _ => {
            _shader.set("uTransition", 0), _shader.uniforms.uColor1.value.copy(_saveColor1), _shader.uniforms.uColor2.value.copy(_saveColor2), _shader.uniforms.uColor3.value.copy(_saveColor3)
        })
    }!async function() {
        _shader.addUniforms({
                uAlpha: {
                    value: 1
                },
                uColor1: {
                    value: new Color
                },
                uColor2: {
                    value: new Color
                },
                uColor3: {
                    value: new Color
                },
                uTransition: {
                    value: 0
                },
                uTransitionColor1: {
                    value: new Color
                },
                uTransitionColor2: {
                    value: new Color
                },
                uTransitionColor3: {
                    value: new Color
                }
            }), MouseFluid.instance().applyTo(_shader), await defer(), _saveColor1.copy(_shader.uniforms.uColor1.value), _saveColor2.copy(_shader.uniforms.uColor2.value), _saveColor3.copy(_shader.uniforms.uColor3.value),
            function addHandlers() {
                _this.events.sub(LiquidBackground.CHANGE_COLOR, changeColor), _this.events.sub(LiquidBackground.RESET, reset)
            }()
    }()
}), _ => {
    LiquidBackground.CHANGE_COLOR = "liquid_change_color", LiquidBackground.RESET = "liquid_reset"
}), Class((function LoaderView() {
    Inherit(this, Element);
    const _this = this,
        $this = this.element;
    let $text, $left;

    function loop() {
        Math.round(100 * $text.percent);
        $left.scaleX = $text.percent, $left.transform()
    }! function initHTML() {
        $this.size("100%").bg("#fff").setZ(1e3)
    }(),
    function initText() {
        $text = $this.create("Text"), $text.size(200, 14).center().fontStyle("DM Sans", 14, "#aaa").css({
            textAlign: "center",
            lineHeight: 14,
            letterSpacing: "0.3em",
            opacity: .8
        }), $text.percent = 0, $left = $this.create(".line"), $left.size("100%", 2).css({
            width: "100%"
        }).bg("#666").transformPoint("0%", "50%").transform({
            scaleX: 0
        })
    }(), _this.startRender(loop), this.progress = function(e) {
        tween($text, {
            percent: .8 * e.percent
        }, 500, "easeOutSine")
    }, this.animateOut = async function(callback) {
        await tween($text, {
            percent: 1
        }, 500, "easeOutSine").promise(), _this.stopRender(loop), $left.transformPoint("100%", "50%").tween({
            scaleX: 0
        }, 800, "easeInOutCubic"), $this.tween({
            opacity: 0
        }, 800, "easeInOutCubic", 200).onComplete(() => callback && callback()), $text.tween({
            opacity: 0
        }, 800, "easeOutCubic")
    }
})), Class((function Overlay() {
    Inherit(this, Element);
    var $this, $bg, $video, $frame, _this = this;

    function resize() {
        let scale = Device.mobile.phone ? .92 : .75,
            width = Math.min(Stage.width * scale, 1280),
            height = Math.round(width * _this.ratio);
        height > Stage.height * scale && (height = Stage.height * scale, width = height * (16 / 9)), $video.size(width, height).center().css({
            boxShadow: `0px ${.1*height}px ${.3*height}px rgba(0,0,0,0.5)`
        })
    }

    function close() {
        _this.animateOut()
    }
    _this.ratio = 9 / 16,
        function initHTML() {
            ($this = _this.element).size("100%").hide().setZ(200), Stage.add($this), ($bg = $this.create(".bg")).size("100%").bg("#222").css({
                opacity: 0
            }).setZ(1)
        }(),
        function initVideo() {
            ($video = $this.create(".video")).size(960, 540).center().bg("#111").setZ(10).css({
                boxShadow: "0 10px 50px rgba(0,0,0,0.2)"
            })
        }(),
        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize), $bg.interact(null, close)
        }(), resize(), this.animateIn = function(color = "#000", embedId, ratio = 16 / 9) {
            _this.visible || (_this.visible = !0, resize(), _this.canClose = !1, _this.delayedCall(_ => {
                _this.canClose = !0
            }, 600), $bg.bg(color), $this.clearAlpha().show(), $bg.css({
                opacity: 0
            }).tween({
                opacity: .85
            }, 1e3, "easeOutSine"), ($frame = $video.create(".frame", "iframe")).div.src = `https://player.vimeo.com/video/${embedId}?autoplay=1&allow=autoplay`, $frame.div.width = "100%", $frame.size("100%"), $frame.div.height = "100%", $frame.div.allow = "autoplay", $frame.css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 1e3, "easeInOutSine", 500), $video.css({
                opacity: 0
            }).bg(color).transform({
                scale: .85,
                y: 0
            }).tween({
                scale: 1,
                y: 0,
                opacity: 1
            }, 1e3, "easeOutQuart"))
        }, this.animateOut = function() {
            _this.visible && _this.canClose && (_this.visible = !1, $video.tween({
                scale: .96,
                y: 0,
                opacity: 0
            }, 500, "easeOutCubic"), $this.tween({
                opacity: 0
            }, 500, "easeOutSine", _ => {
                $this.clearAlpha().hide(), $frame.remove()
            }))
        }
}), "singleton"), Class((function UIBuiltby() {
    Inherit(this, Element);
    var $this, _this = this;

    function hover(e) {
        switch (e.action) {
            case "over":
                $this.tween({
                    opacity: .8
                }, 200, "easeOutSine");
                break;
            case "out":
                $this.tween({
                    opacity: 1
                }, 200, "easeOutSine")
        }
    }

    function click() {
        open("https://activetheory.net/")
    }! function initHTML() {
        let size = Device.mobile.phone ? 30 : 40;
        ($this = _this.element).size(size, size).bg("assets/images/atproduct-white.png"), $this.div.style.mixBlendMode = "difference";
        let offset = Device.mobile.phone ? 20 : 35;
        $this.css({
            top: offset,
            right: offset
        }).setZ(100)
    }(),
    function addHandlers() {
        $this.interact(hover, click)
    }(), this.animateIn = function() {}
})), Class((function UILanding(_data) {
    Inherit(this, ContentAbstract);
    var $inner, $buttons, _portfolio, _headline, _copy, _link, _form, _this = this,
        _elements = [];

    function resize() {
        if (Device.mobile.phone) _this.wrapper.css({
            margin: "0 auto",
            width: Stage.width - 68,
            marginBottom: 40
        }), $inner.css({
            marginTop: 130
        }), _copy.element.css({
            width: "100%"
        });
        else {
            let margin = Math.range(Stage.height, 500, 2e3, 120, 300, !0);
            $inner.css({
                marginTop: margin,
                maxWidth: 740
            }), _this.element.css({
                marginBottom: 100
            }), _copy.element.css({
                width: "75%"
            })
        }
    }
    _this.element.invisible(), ($inner = _this.wrapper.create(".inner")).css({
            textAlign: "left",
            position: "relative",
            display: "block"
        }), Global.Z_INDEX = 5,
        function initHeadline() {
            _headline = _this.initClass(ContentTitle, _data.headline, [$inner]), _elements.push(_headline.element)
        }(),
        function initSub() {
            (_copy = _this.initClass(ContentCopy, _data.text, [$inner])).element.css({
                width: "75%",
                opacity: .6
            }), _elements.push(_copy.element)
        }(),
        function initLink() {
            ($buttons = _this.wrapper.create(".buttons")).css({
                position: "relative",
                display: "block",
                margin: "20px 0 0 0",
                textAlign: "left"
            }), _link = _this.initClass(ContentButton, {
                text: "Contact",
                url: "mailto:hello@dreamwave.tech",
                icon: "mail"
            }, [$buttons]), _elements.push(_link.element), _link.element.css({
                marginRight: 10
            }), _link = _this.initClass(ContentButton, {
                text: "Follow",
                url: "https://twitter.com/dreamwave",
                icon: "twitter"
            }, [$buttons]), _elements.push(_link.element), _link.element.css({
                marginRight: 10
            }), _form = _this.initClass(ContentButton, {
                text: "Request a Demo",
                url: "https://docs.google.com/forms/d/e/1FAIpQLSeQnm3ZzG2-uuaHIzKiP_z7LJ_txQ8FO2COCOC8VlvEiYIzvw/viewform"
            }, [$buttons]), _elements.push(_form.element)
        }(),
        function initPortfolio() {
            _portfolio = _this.initClass(UILandingPortfolio, [_this.wrapper]), _elements.push(_portfolio.element)
        }(),
        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize)
        }(), resize(), this.animateIn = function() {
            _this.element.visible(), _elements.forEach(($element, i) => {
                $element.visible().css({
                    opacity: 0
                }).transform({
                    y: 50
                }).tween({
                    opacity: 1,
                    y: 0
                }, 1e3, "easeOutQuart", 100 * i)
            }), _portfolio.animateIn(600)
        }, this.animateOut = async function() {
            _this.element.tween({
                opacity: 0
            }, 500, "easeOutSine"), await _this.wait(500)
        }
})), Class((function UILandingPortfolio() {
    Inherit(this, Element);
    var $this, $boxes, _items, _this = this;
    ! function initHTML() {
        ($this = _this.element).css({
            marginTop: Device.mobile.phone ? 50 : 80,
            display: "block",
            position: "relative",
            overflow: "visible",
            marginBottom: 100
        })
    }(),
    function initHeadline() {
        _this.initClass(ContentHeading, "Our Past Events")
    }(),
    function initBoxes() {
        _items = [], ($boxes = $this.create(".boxes")).css({
            marginTop: 10,
            display: "block",
            textAlign: "left",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
            alignItems: "center",
            position: "relative"
        }), Content.EVENTS.forEach(content => {
            if (content.active) {
                let item = _this.initClass(UILandingPortfolioItem, content, [$boxes]);
                item.$parent = $boxes, _items.push(item)
            }
        })
    }(), this.animateIn = function(delay) {
        _items.forEach(($element, i) => {
            $element.element.visible().css({
                opacity: 0
            }).transform({
                y: 50
            }).tween({
                opacity: 1,
                y: 0
            }, 1e3, "easeOutQuart", delay + 100 * i)
        })
    }
})), Class((function UILandingPortfolioItem({
    perma: perma,
    title: title,
    bg: bg,
    color: color,
    image: image
}) {
    Inherit(this, Element);
    var $this, $wrapper, $shadow, $bg, _title, _over, _this = this;

    function resize() {
        let parentWidth = _this.$parent.div.offsetWidth,
            columns = (Math.range(Stage.width, 1400, 3e3, 560, 800, !0), Math.round(Stage.width / 560));
        columns > 3 && (columns = 3);
        let width = parentWidth / columns;
        columns > 1 && (width -= 10);
        let height = Math.round(.5625 * width);
        $this.size(width, height).css({
            marginRight: columns > 1 ? 10 : 0
        }), $shadow.css({
            boxShadow: `0 ${Math.round(.05*height)}px ${Math.round(.25*height)}px #000`
        });
        let fontSize = Math.round(.85 * Math.range(width, 200, 450, 20, 30));
        _title.element.css({
            fontSize: fontSize,
            lineHeight: "120%"
        }), _over.element.css({
            fontSize: fontSize,
            lineHeight: "120%"
        })
    }

    function hover(e) {
        if (!Device.mobile.phone) switch (e.action) {
            case "over":
                Global.Z_INDEX++, $shadow.tween({
                    opacity: .3
                }, 500, "easeOutSine"), $this.setZ(Global.Z_INDEX).tween({
                    scale: 1.025,
                    y: 0
                }, 500, "easeOutQuart"), _title.element.tween({
                    opacity: 0,
                    y: -20
                }, 300, "easeOutQuart"), _over.element.tween({
                    opacity: 1,
                    y: 0
                }, 600, "easeOutQuart"), $bg.clearTween().transformPoint("50%", "100%").transform({
                    scaleY: 0
                }).tween({
                    scaleY: 1
                }, 500, "easeOutQuart");
                break;
            case "out":
                $shadow.tween({
                    opacity: 0
                }, 500, "easeOutSine"), $this.tween({
                    scale: 1
                }, 700, "easeOutQuart"), _title.element.tween({
                    opacity: 1,
                    y: 0
                }, 800, "easeOutQuart"), _over.element.tween({
                    opacity: 0,
                    y: 20
                }, 500, "easeOutQuart"), $bg.transformPoint("50%", "0%").tween({
                    scaleY: 0
                }, 700, "easeOutQuart")
        }
    }

    function click() {
        Device.mobile.phone && (_title.element.tween({
            opacity: 0,
            y: -20
        }, 300, "easeOutQuart"), _over.element.tween({
            opacity: 1,
            y: 0
        }, 300, "easeOutQuart"), $bg.tween({
            scaleY: 1
        }, 300, "easeOutQuart"), $this.transform({
            y: 1.025
        }).tween({
            scale: 1
        }, 500, "easeOutQuart")), UI.instance().setState(perma)
    }!async function() {
        ! function initHTML() {
            ($this = _this.element).size(500, 300).css({
                position: "relative",
                display: "inline-block",
                marginRight: 10,
                marginBottom: 10
            }), Device.mobile.phone && $this.size(300, 220);
            ($wrapper = $this.create(".wrapper")).size("100%").css({
                overflow: "hidden"
            }), $wrapper.create(".image").size("100%").bg(image, "cover"), ($shadow = $this.create(".border")).size("100%").css({
                boxShadow: "0 10px 80px #000",
                opacity: 0
            }), ($bg = $wrapper.create(".bg-blur")).size("100%").transformPoint("50%", "100%").transform({
                scaleY: 0
            }), $bg.inner = $bg.create(".bg"), $bg.inner.size("100%").bg(bg[1]).css({
                opacity: .3
            })
        }(),
        function initTitle() {
            (_title = _this.initClass(ContentSubTitle, title, [$wrapper])).element.css({
                position: "",
                width: "80%",
                fontWeight: "300",
                color: color,
                bottom: 15,
                left: 20
            }), (_over = _this.initClass(ContentSubTitle, title, [$wrapper])).element.css({
                position: "",
                width: "80%",
                fontWeight: "600",
                color: color,
                opacity: 0,
                bottom: 15,
                left: 20
            }).transform({
                y: 20
            })
        }(), await _this.wait(100),
            function addHandlers() {
                $this.interact(hover, click), _this.events.sub(Events.RESIZE, resize)
            }(), resize()
    }(), this.animateIn = function() {}
})), Global.Z_INDEX = 0, Class((function UILogo() {
    Inherit(this, Element);
    var $this, _this = this;

    function hover(e) {
        switch (e.action) {
            case "over":
                $this.tween({
                    opacity: .8
                }, 200, "easeOutSine");
                break;
            case "out":
                $this.tween({
                    opacity: 1
                }, 200, "easeOutSine")
        }
    }

    function click() {
        UI.instance().setState("")
    }! function initHTML() {
        $this = _this.element;
        let size = Device.mobile.phone ? 30 : 40;
        ($this = _this.element).size(size, size).bg("assets/images/dreamwave-small-white.png"), $this.div.style.mixBlendMode = "difference";
        let offset = Device.mobile.phone ? 20 : 35;
        $this.css({
            top: offset,
            left: offset
        }).setZ(100)
    }(),
    function addHandlers() {
        $this.interact(hover, click)
    }(), this.animateIn = function() {}
})), Class((function UINav() {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        ($this = _this.element).size("100%", 60), $this.css({
            borderBottom: "1px solid rgba(0,0,0,0.2)"
        })
    }(), this.animateIn = function() {}
})), Class((function UITitle() {
    Inherit(this, Element);
    var $this, _this = this;
    ! function initHTML() {
        let size = Device.mobile.phone ? 9 : 11,
            offset = Device.mobile.phone ? 30 : 50;
        ($this = _this.element).size(300, size).center(1, 0).css({
            top: offset
        }), $this.fontStyle("Roboto", size, "#fff"), $this.css({
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "0.3em",
            textTransform: "uppercase"
        }).setZ(100), $this.div.style.mixBlendMode = "difference"
    }(), this.update = function(title) {
        $this.tween({
            y: -10,
            opacity: 0
        }, 300, "easeInSine", _ => {
            $this.html(title), $this.transform({
                y: 30
            }).tween({
                opacity: 1,
                y: 0
            }, 1200, "easeOutQuart")
        })
    }, this.animateIn = function() {}
})), Class((function Landing() {
    Inherit(this, Object3D);
    var _camera, _this = this;

    function loop() {}!async function() {
        _this.layout = _this.initClass(SceneLayout, "Landing_layout"), _this.add(_this.layout.group), _this.layers = await _this.layout.getAllLayers(),
            function initCamera() {
                (_camera = _this.initClass(GazeCamera)).moveXY.set(0, 0), _camera.position.set(0, 0, 6), _camera.lerpSpeed = .02, _camera.deltaRotate = 0, _camera.lookAt = new Vector3(0, 0, -.5), _camera.lock()
            }(), _this.startRender(loop)
    }(), this.animateIn = function() {}
})), Class((function Main() {
    ! function() {
        if (Utils.query("performance")) return Performance.displayResults();
        ! function init() {
            if (GLUI.init(), window.location.search.includes("p=")) return AssetLoader.loadAssets(Assets.list().filter(["data", "shaders"])).then(Playground.instance);
            Container.instance()
        }()
    }()
}));
window._MINIFIED_ = true;
window._BUILT_ = true;