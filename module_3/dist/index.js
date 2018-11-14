// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/input-core/lib/functions/defineMaskList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = defineMaskList;
/**
 *
 * @param {String} mask
 * @param format
 * @returns {Array}
 */
function defineMaskList(mask, format) {
    if (!mask) {
        return [];
    }

    var stack = [];
    var escape = false;

    for (var i = 0; i < mask.length; i++) {
        var item = format[mask[i]];
        if (escape && item) {
            item = null;
            escape = false;
        }
        if (!item) {
            if (!escape && mask[i] === '\\') {
                escape = true;
                continue;
            }
            escape = false;
            stack.push({
                char: mask[i],
                next: null
            });
        } else if (item.regexp) {
            stack.push(item);
        }
    }

    return stack;
}
},{}],"node_modules/input-core/lib/constants/charTypesEnum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    USER: 1,
    CHAR: 2,
    MASK: 3
};
},{}],"node_modules/input-core/lib/functions/inputValue.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = inputValue;

var _charTypesEnum = require('../constants/charTypesEnum.js');

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inputValue(_ref) {
    var data = _ref.data,
        _ref$input = _ref.input,
        input = _ref$input === undefined ? '' : _ref$input,
        selection = _ref.selection,
        mask = _ref.mask,
        maskChar = _ref.maskChar,
        maskString = _ref.maskString;

    var value = [];
    var maskedValue = '';

    var maskIndex = 0;
    var valueIndex = 0;
    var pastedIndex = 0;

    var inputValuesApplied = 0;

    while (mask[maskIndex]) {
        var item = data.length > valueIndex ? data[valueIndex] : null;
        var maskPart = mask[maskIndex];

        var pastedValuesStack = null;
        if (selection.start <= maskIndex && pastedIndex < input.length) {
            pastedValuesStack = input.slice(pastedIndex);
        }

        // Обработка захардкоженных в маску символов. 
        if (maskPart.char) {
            // Если есть вводимые пользователем значение, в первую очередь проверяем его.
            // Но не проверяем по всему стеку.
            if (pastedValuesStack && pastedValuesStack[0] === maskPart.char) {
                pastedIndex++;
            } else {
                if (item && (item.char === maskPart.char || item.type !== _charTypesEnum2.default.USER) || input) {
                    valueIndex++;
                }
            }

            value.push({
                char: maskPart.char,
                type: _charTypesEnum2.default.CHAR
            });

            if (pastedValuesStack) {
                inputValuesApplied++;
            }

            maskedValue += maskPart.char;
        }

        // Кастомный текст
        if (maskPart.regexp) {
            var part = null;

            // Если есть вводимое пользователем значение, то проверям его. 
            // Причем пробегаемся по стеку вводимых значений, пока не найдем нужное
            if (pastedValuesStack) {
                var i = 0;
                while (!maskPart.regexp.test(pastedValuesStack[i]) && pastedValuesStack.length > i) {
                    i++;
                    pastedIndex++;
                }
                if (pastedValuesStack.length > i) {
                    pastedIndex++;
                    inputValuesApplied++;

                    // Игнорируем предыдущее значение в инпуте
                    valueIndex++;

                    part = pastedValuesStack[i];
                    value.push({
                        char: part,
                        type: _charTypesEnum2.default.USER
                    });
                    maskedValue += part;
                }
            }

            // В пользовательском вводе нет или невалидные данные. Пытаемся аплаить те данные, что были раньше или заменяем на плейсхолдер
            if (!part) {
                // Если произошел сдвиг, пропускаем лишнее значение
                if (item && item.type === _charTypesEnum2.default.CHAR && data.length > valueIndex + 1) {
                    valueIndex++;
                    continue;
                }
                if (item && item.type === _charTypesEnum2.default.USER && maskPart.regexp.test(item.char)) {
                    value.push({
                        char: item.char,
                        type: _charTypesEnum2.default.USER
                    });
                    maskedValue += item.char;
                    valueIndex++;
                } else {
                    part = maskString ? maskString[maskIndex] : maskChar;

                    value.push({
                        char: part,
                        type: _charTypesEnum2.default.MASK
                    });

                    if (data.length > maskIndex) {
                        valueIndex++;
                    }

                    maskedValue += part;
                }
            }
        }

        maskIndex++;
    }

    var selectionPosition = selection.start + inputValuesApplied;

    // Удаляем все ведующие maskChar
    var bound = value.length - 1;
    var charsCount = 0;
    while (bound >= 0 && value[bound].type !== _charTypesEnum2.default.USER) {
        if (value[bound].type === _charTypesEnum2.default.MASK) {
            charsCount = 0;
        }
        if (value[bound].type === _charTypesEnum2.default.CHAR) {
            charsCount++;
        }
        bound--;
    }
    bound += charsCount;

    var visibleValue = '';
    for (var _i = 0; _i <= bound; _i++) {
        visibleValue += value[_i].char;
    }

    return {
        value: value,
        visibleValue: visibleValue,
        maskedValue: maskedValue,
        selection: {
            start: selectionPosition,
            end: selectionPosition
        }
    };
}
},{"../constants/charTypesEnum.js":"node_modules/input-core/lib/constants/charTypesEnum.js"}],"node_modules/input-core/lib/functions/removeSelectedRange.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeSelectedRange;

var _charTypesEnum = require('../constants/charTypesEnum');

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeSelectedRange(_ref) {
    var value = _ref.value,
        selection = _ref.selection,
        reformat = _ref.reformat,
        mask = _ref.mask,
        maskChar = _ref.maskChar,
        maskString = _ref.maskString;

    var copyMaskChar = function copyMaskChar(count) {
        var res = [];
        for (var i = 0; i < count; i++) {
            res.push({
                char: maskChar,
                type: _charTypesEnum2.default.MASK
            });
        }
        return res;
    };

    var pasteMaskSymbols = function pasteMaskSymbols() {
        if (reformat) {
            return '';
        }

        if (maskString) {
            var res = [];
            for (var i = selection.start; i < selection.end; i++) {
                res.push({
                    char: maskString[i],
                    type: _charTypesEnum2.default.MASK
                });
            }
            return res;
        }

        return copyMaskChar(selection.end - selection.start);
    };

    if (selection.end < selection.start) {
        var tmp = selection.end;
        selection.end = selection.start;
        selection.start = tmp;
    }

    if (selection.start === selection.end) {
        return value;
    }

    if (value.length > selection.start) {
        return value.slice(0, selection.start).concat(pasteMaskSymbols(), value.slice(selection.end, value.length));
    }

    return value;
}
},{"../constants/charTypesEnum":"node_modules/input-core/lib/constants/charTypesEnum.js"}],"node_modules/input-core/lib/inputCore.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInput = exports.defaults = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defineMaskList = require('./functions/defineMaskList');

var _defineMaskList2 = _interopRequireDefault(_defineMaskList);

var _inputValue = require('./functions/inputValue');

var _inputValue2 = _interopRequireDefault(_inputValue);

var _removeSelectedRange = require('./functions/removeSelectedRange');

var _removeSelectedRange2 = _interopRequireDefault(_removeSelectedRange);

var _charTypesEnum = require('./constants/charTypesEnum');

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputCore = function () {
    function InputCore(_ref) {
        var value = _ref.value,
            mask = _ref.mask,
            reformat = _ref.reformat,
            maskFormat = _ref.maskFormat,
            maskChar = _ref.maskChar,
            maskString = _ref.maskString;

        _classCallCheck(this, InputCore);

        if (maskString && maskString.length !== mask.length) {
            throw new Error('maskString must have same length as mask');
        }
        if (maskChar.length > 1) {
            throw new Error('maskChar must have only 1 char');
        }
        this._maskString = maskString;
        this._maskChar = maskChar;
        this._reformat = reformat;
        this.selection = { start: 0, end: 0 };

        this.setMaskFormat(maskFormat);
        this._mask = (0, _defineMaskList2.default)(mask, this._maskFormat);

        this.setValue(value);
    }

    /**
     * Заполняет _maskFormat, который является объектом byId объектов
     * @param {Array} maskFormat     
     */


    _createClass(InputCore, [{
        key: 'setMaskFormat',
        value: function setMaskFormat(maskFormat) {
            this._maskFormat = maskFormat.reduce(function (store, item) {
                store[item.str] = item;
                return store;
            }, {});
        }
    }, {
        key: 'input',
        value: function input(_input) {
            var _value = this._value;

            var result = void 0;

            if (this._reformat) {
                result = this._reformat({
                    data: _value,
                    input: _input,
                    selection: this.selection
                });
            } else {

                _value = (0, _removeSelectedRange2.default)({
                    value: _value,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
                this.selection.end = this.selection.start;

                result = (0, _inputValue2.default)({
                    data: _value,
                    input: _input,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
            }

            this._value = result.value;
            this._maskedValue = result.maskedValue;
            this._visibleValue = result.visibleValue;
            this.setSelection(result.selection);
        }
    }, {
        key: 'setSelection',
        value: function setSelection(_ref2) {
            var start = _ref2.start,
                end = _ref2.end;

            this.selection = {
                start: start,
                end: end
            };
        }
    }, {
        key: 'getSelection',
        value: function getSelection() {
            return {
                start: this.selection.start,
                end: this.selection.end
            };
        }
    }, {
        key: 'backspace',
        value: function backspace() {
            this.removePreviosOrSelected();
        }
    }, {
        key: 'paste',
        value: function paste(value) {
            this.input(value);
        }

        /**
         * Определяет циклический список, в котором учтены циклы маски, по которой будет проходить итерации.
         * @param {String} mask
         * @returns {{head: {}, hasCycle: boolean}}
         */

    }, {
        key: 'setMask',
        value: function setMask(mask) {

            this._mask = (0, _defineMaskList2.default)(mask, this._maskFormat);

            this.setValue(this._value);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return {
                value: this.getValue(),
                maskedValue: this.getMaskedValue(),
                visibleValue: this.getVisibleValue(),
                selection: this.getSelection()
            };
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }
    }, {
        key: 'setReformat',
        value: function setReformat(reformat) {
            this._reformat = reformat;
            this.setValue(this._value);
        }
    }, {
        key: 'getMaskedValue',
        value: function getMaskedValue() {
            return this._maskedValue;
        }
    }, {
        key: 'getVisibleValue',
        value: function getVisibleValue() {
            return this._visibleValue;
        }
    }, {
        key: 'setMaskChar',
        value: function setMaskChar(maskChar) {
            if (maskChar.length > 1) {
                throw new Error('maskChar must have only 1 char');
            }

            this._maskChar = maskChar;

            this.setValue(this._value);
        }
    }, {
        key: 'setMaskString',
        value: function setMaskString(maskString) {
            if (maskString && maskString.length !== this._mask.length) {
                throw new Error('maskString must have same length as mask');
            }

            this._maskString = maskString;

            this.setValue(this._value);
        }
    }, {
        key: 'removePreviosOrSelected',
        value: function removePreviosOrSelected() {
            if (this.selection.start === this.selection.end) {
                this.selection.start = this.selection.end - 1;
                if (this.selection.start < 0) {
                    this.selection.start = 0;
                }
            }

            this.input('');
        }
    }, {
        key: 'removeNextOrSelected',
        value: function removeNextOrSelected() {
            if (this.selection.start === this.selection.end) {
                this.selection.end++;
            }

            this.input('');
        }
    }, {
        key: 'setValue',
        value: function setValue(data) {
            var result = void 0;

            if (this._reformat) {
                result = this._reformat({
                    data: data,
                    selection: this.selection
                });
            } else {
                var dataList = data;
                if (!Array.isArray(dataList)) {
                    dataList = [];
                    for (var i = 0; i < data.length; i++) {
                        dataList.push({
                            char: data[i],
                            type: _charTypesEnum2.default.USER
                        });
                    }
                }
                result = (0, _inputValue2.default)({
                    data: dataList,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
            }

            this._value = result.value;
            this._maskedValue = result.maskedValue;
            this._visibleValue = result.visibleValue;
            this.setSelection(result.selection);
        }
    }]);

    return InputCore;
}();

var defaults = exports.defaults = {
    maskFormat: [{
        str: '0',
        regexp: /[0-9]/
    }, {
        str: '*',
        regexp: /./
    }, {
        str: 'a',
        regexp: /[a-zA-Z]/
    }],
    maskChar: '',
    showMask: false,
    removeSelectedRange: _removeSelectedRange2.default
};

var createInput = exports.createInput = function createInput(_ref3) {
    var value = _ref3.value,
        maskString = _ref3.maskString,
        mask = _ref3.mask,
        reformat = _ref3.reformat,
        _ref3$maskFormat = _ref3.maskFormat,
        maskFormat = _ref3$maskFormat === undefined ? defaults.maskFormat : _ref3$maskFormat,
        _ref3$maskChar = _ref3.maskChar,
        maskChar = _ref3$maskChar === undefined ? defaults.maskChar : _ref3$maskChar;

    var _reformat = reformat;
    var _mask = mask;
    if (!_reformat && !_mask) {
        _reformat = function _reformat(value) {
            return value;
        };
    } else if (_reformat) {
        _mask = null;
    }

    return new InputCore({ value: value, mask: _mask, reformat: _reformat, maskFormat: maskFormat, maskChar: maskChar, maskString: maskString });
};
},{"./functions/defineMaskList":"node_modules/input-core/lib/functions/defineMaskList.js","./functions/inputValue":"node_modules/input-core/lib/functions/inputValue.js","./functions/removeSelectedRange":"node_modules/input-core/lib/functions/removeSelectedRange.js","./constants/charTypesEnum":"node_modules/input-core/lib/constants/charTypesEnum.js"}],"node_modules/subscribe-event/subscribe.js":[function(require,module,exports) {
var define;
var global = arguments[3];
!(function() {
  "use strict";

  // Basic subscribe function both browser events or node.js events
  function subscribe(element, event, handler, options) {
    var unsubscribeFunctionName = "removeEventListener";
    var unsubscribe = function() {
      element[unsubscribeFunctionName](event, handler);
    };

    if (element.addEventListener) {
      element.addEventListener(event, handler, options);
      return unsubscribe;
    }

    if (element.attachEvent) {
      event = "on" + event;
      element.attachEvent(event, handler);
      unsubscribeFunctionName = "detachEvent";
      return unsubscribe;
    }

    if (element.on) {
      element.on(event, handler);
      unsubscribeFunctionName = "off";
      return unsubscribe;
    }
  }

  // define your own subscribe functions
  subscribe.define = function(addSubscription, removeSubscription) {
    return function(element, event, handler, options) {
      var unsubscribe = function() {
        element[removeSubscription](event, handler);
      };

      element[addSubscription](event, handler, options);
      return unsubscribe;
    };
  };

  // umd
  if (typeof exports === "object") {
    // CommonJS
    module.exports = subscribe;
  } else if (typeof define === "function" && define.amd) {
    // AMD. anonymous module
    define(subscribe);
  } else {
    // Global scope
    global.subscribeEvent = subscribe;
  }
})();

},{}],"node_modules/mask-input/lib/maskInput.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputCore = require('input-core');

var _subscribeEvent = require('subscribe-event');

var _subscribeEvent2 = _interopRequireDefault(_subscribeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEYBOARD = {
  BACKSPACE: 8,
  DELETE: 46
};
/**
 * Adapter of react-maskInput to vanilaJs
 */

var MaskInput = function () {
  function MaskInput(element, _ref) {
    var _this = this;

    var _ref$mask = _ref.mask,
        mask = _ref$mask === undefined ? _inputCore.defaults.mask : _ref$mask,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? '' : _ref$value,
        reformat = _ref.reformat,
        maskString = _ref.maskString,
        _ref$maskChar = _ref.maskChar,
        maskChar = _ref$maskChar === undefined ? _inputCore.defaults.maskChar : _ref$maskChar,
        _ref$maskFormat = _ref.maskFormat,
        maskFormat = _ref$maskFormat === undefined ? _inputCore.defaults.maskFormat : _ref$maskFormat,
        showMask = _ref.showMask,
        alwaysShowMask = _ref.alwaysShowMask,
        onChange = _ref.onChange;

    _classCallCheck(this, MaskInput);

    this.showValue = function () {
      if (_this.showMask && (_this.canSetSelection || _this.props.alwaysShowMask)) {
        _this.element.value = _this.input.getMaskedValue();
        return;
      }
      _this.element.value = _this.input.getVisibleValue();
    };

    this.setSelection = function () {
      if (!_this.canSetSelection) {
        return;
      }
      var selection = _this.input.getSelection();
      _this.element.setSelectionRange(selection.start, selection.end);

      var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
        return setTimeout(fn, 0);
      };
      // For android
      raf(function () {
        return _this.element.setSelectionRange(selection.start, selection.end);
      });
    };

    this.onPaste = function (e) {
      e.preventDefault();
      _this.getSelection();

      // getData value needed for IE also works in FF & Chrome
      _this.input.paste(e.clipboardData.getData('Text'));

      _this.showValue();

      // Timeout needed for IE
      setTimeout(_this.setSelection, 0);

      _this.props.onChange && _this.props.onChange(e);
    };

    this.onChange = function (e) {
      var currentValue = void 0;
      if (_this.showMask && (_this.canSetSelection || _this.props.alwaysShowMask)) {
        currentValue = _this.input.getMaskedValue();
      } else {
        currentValue = _this.input.getVisibleValue();
      }

      // fix conflict by update value in mask model
      if (e.target.value !== currentValue) {
        _this.getSelection();
        _this.input.setValue(e.target.value);

        _this.showValue();

        setTimeout(_this.setSelection, 0);
      }
      _this.props.onChange && _this.props.onChange(e);
    };

    this.onKeyPress = function (e) {
      if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
        return;
      }

      e.preventDefault();
      _this.getSelection();
      _this.input.input(e.key || e.data || String.fromCharCode(e.which));
      _this.showValue();
      _this.setSelection();
      _this.props.onChange && _this.props.onChange(e);
    };

    this.onKeyDown = function (e) {
      if (e.which === KEYBOARD.BACKSPACE) {
        e.preventDefault();
        _this.getSelection();
        _this.input.removePreviosOrSelected();

        _this.showValue();
        _this.setSelection();

        _this.props.onChange && _this.props.onChange(e);
      }

      if (e.which === KEYBOARD.DELETE) {
        e.preventDefault();
        _this.getSelection();
        _this.input.removeNextOrSelected();

        _this.showValue();
        _this.setSelection();

        _this.props.onChange && _this.props.onChange(e);
      }
    };

    this.onFocus = function () {
      _this.canSetSelection = true;
    };

    this.onBlur = function () {
      _this.canSetSelection = false;
    };

    this.input = this.input = (0, _inputCore.createInput)({
      value: value,
      reformat: reformat,
      maskString: maskString,
      maskChar: maskChar,
      mask: mask,
      maskFormat: maskFormat
    });

    this.props = {
      mask: mask,
      value: value,
      reformat: reformat,
      maskChar: maskChar,
      maskFormat: maskFormat,
      maskString: maskString,
      showMask: showMask,
      alwaysShowMask: alwaysShowMask,
      onChange: onChange
    };

    this.showMask = alwaysShowMask || showMask;

    this.element = element;
    this.showValue();
    this.subscribe();
  }

  _createClass(MaskInput, [{
    key: 'getSelection',
    value: function getSelection() {
      this.input.setSelection({
        start: this.element.selectionStart,
        end: this.element.selectionEnd
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe() {
      this.unsubscribe = {
        onPaste: (0, _subscribeEvent2.default)(this.element, 'paste', this.onPaste),
        onKeyDown: (0, _subscribeEvent2.default)(this.element, 'keydown', this.onKeyDown),
        onKeyPress: (0, _subscribeEvent2.default)(this.element, this.keyPressPropName(), this.onKeyPress),
        onChange: (0, _subscribeEvent2.default)(this.element, 'change', this.onChange),
        onFocus: (0, _subscribeEvent2.default)(this.element, 'focus', this.onFocus),
        onBlur: (0, _subscribeEvent2.default)(this.element, 'blur', this.onBlur)
      };
    }
  }, {
    key: 'keyPressPropName',
    value: function keyPressPropName() {
      if (typeof navigator !== 'undefined' && navigator.userAgent.match(/Android/i)) {
        return 'beforeinput';
      }
      return 'keypress';
    }
  }, {
    key: 'setProps',
    value: function setProps(_ref2) {
      var mask = _ref2.mask,
          value = _ref2.value,
          reformat = _ref2.reformat,
          maskString = _ref2.maskString,
          maskChar = _ref2.maskChar,
          maskFormat = _ref2.maskFormat,
          showMask = _ref2.showMask,
          alwaysShowMask = _ref2.alwaysShowMask,
          onChange = _ref2.onChange;

      var updated = false;

      if (this.props.onChange !== onChange) {
        this.props.onChange = onChange;
      }

      if (this.props.alwaysShowMask !== alwaysShowMask || this.props.showMask !== showMask) {
        this.showMask = alwaysShowMask || showMask;

        this.props.alwaysShowMask = alwaysShowMask;
        this.props.showMask = showMask;

        updated = true;
      }

      if (maskFormat && maskFormat !== this.props.maskFormat) {
        this.input.setMaskFormat(maskFormat);

        this.props.maskFormat = maskFormat;

        updated = true;
      }

      if (mask !== this.props.mask) {
        this.input.setMask(mask);

        this.props.mask = mask;

        updated = true;
      }

      if (maskString !== this.props.maskString) {
        this.input.setMaskString(maskString);

        this.props.maskString = maskString;

        updated = true;
      }

      if (maskChar !== this.props.maskChar) {
        this.input.setMaskChar(maskChar);

        this.props.maskChar = maskChar;

        updated = true;
      }

      if (reformat !== this.props.reformat) {
        this.input.setReformat(reformat);

        this.props.reformat = reformat;

        updated = true;
      }

      if (value !== this.props.value) {
        this.input.setValue(value);

        this.props.value = value;

        updated = true;
      }

      if (updated) {
        this.showValue();
        this.setSelection();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unsubscribe.onPaste();
      this.unsubscribe.onKeyDown();
      this.unsubscribe.onKeyPress();
      this.unsubscribe.onChange();
      this.unsubscribe.onFocus();
      this.unsubscribe.onBlur();
    }
  }]);

  return MaskInput;
}();

exports.default = MaskInput;
},{"input-core":"node_modules/input-core/lib/inputCore.js","subscribe-event":"node_modules/subscribe-event/subscribe.js"}],"ui_controller.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIController = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UIController =
/*#__PURE__*/
function () {
  function UIController(cardData) {
    _classCallCheck(this, UIController);

    this.data = cardData;
    this.divResult = document.getElementById('result');
    this.tabResult = document.getElementById('table_result');
    this.preloader = document.getElementById('preloader');
  }

  _createClass(UIController, [{
    key: "toTable",
    value: function toTable() {
      var keys = Object.keys(this.data);
      var values = Object.values(this.data);
      var table = document.getElementById('table_result');

      for (var i = 0; i < keys.length; i += 1) {
        var tr = document.createElement('tr');
        var td_key = document.createElement('td');
        td_key.innerText = "".concat(keys[i]);
        tr.append(td_key);
        var td_value = document.createElement('td');
        td_value.innerText = "".concat(values[i]);
        tr.append(td_value);
        table.append(tr);
      }
    }
  }, {
    key: "validInput",
    value: function validInput(name) {
      name.className = "green";
      name.valid = true;
    }
  }, {
    key: "invalidInput",
    value: function invalidInput(name) {
      name.className = "red";
      name.valid = false;
    }
  }, {
    key: "validation",
    value: function validation() {
      if (this.inputName.valid && this.inputCard.valid) {
        this.button.disabled = false;
      } else {
        this.button.disabled = true;
      }
    }
  }]);

  return UIController;
}(); // const inputName = document.getElementById('name');
// const inputCard = document.getElementById('card');
// const button = document.getElementById('submit');
// const divResult = document.getElementById('result');
// const tabResult = document.getElementById('table_result');
// const preloader = document.getElementById('preloader');
// function toTable(data) {
// 	const keys = Object.keys(data);
// 	const values = Object.values(data);
// 	const table = document.getElementById('table_result');
// 	for (let i = 0; i < keys.length; i += 1) {
// 		const tr = document.createElement('tr');
// 		const td_key = document.createElement('td');
// 		td_key.innerText = `${keys[i]}`;
// 		tr.append(td_key);
// 		const td_value = document.createElement('td');
// 		td_value.innerText = `${values[i]}`;
// 		tr.append(td_value);
// 		table.append(tr);
// 	}
// };


exports.UIController = UIController;
},{}],"card_data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CardData =
/*#__PURE__*/
function () {
  function CardData(card) {
    _classCallCheck(this, CardData);

    this.card = card;
  }

  _createClass(CardData, [{
    key: "getCardInfo",
    value: function getCardInfo() {
      preloader.className = 'preloader';
      divResult.className = 'hide';
      return fetch("https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=".concat(this.card)).then(function (res) {
        return res.json();
      }).then(function (res) {
        return console.log(res);
      }).then(function (res) {
        return toTable(res);
      }).then(function () {
        preloader.className = 'hide';
        divResult.className = 'result';
        resetInput();
      });
    }
  }]);

  return CardData;
}(); // getCardInfo(card){
//     preloader.className = 'preloader';
//     divResult.className = 'hide';
//     return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${this.card}`)
//         .then(res => res.json())
//         .then(res => console.log(res))
//         .then(res => toTable(res))
//         .then(() =>{
//             preloader.className = 'hide';
//             divResult.className = 'result';
//             resetInput();
//         })
// };


exports.default = CardData;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _maskInput = _interopRequireDefault(require("mask-input"));

var _ui_controller = require("./ui_controller");

var _card_data = _interopRequireDefault(require("./card_data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputName = document.getElementById('name');
var inputCard = document.getElementById('card');
var button = document.getElementById('submit');
var uiCntrl = new _ui_controller.UIController();
var cardData = new _card_data.default();
var maskInput = new _maskInput.default(document.querySelector('.js-input-selector'), {
  mask: '0000-0000-0000-0000',
  alwaysShowMask: true,
  maskChar: '_',
  onChange: function onChange() {
    if (inputCard.value.match(/^(\d{4}-){3}\d{4}/)) {
      uiCntrl.validInput(inputCard);
    } else {
      uiCntrl.invalidInput(inputCard);
    }

    uiCntrl.validation();
  }
});
inputName.addEventListener('change', function () {
  if (inputName.value.trim().length > 2) {
    uiCntrl.validInput(inputName);
  } else {
    uiCntrl.invalidInput(inputName);
  }

  uiCntrl.validation();
});
button.addEventListener('click', function () {
  var cardNumber = inputCard.value.split('-').join('');
  console.log(cardNumber);
  cardData.getCardInfo(cardNumber);
}); // class CardData{
//     constructor(card){
//         this.card = card;
//     }
//     getCardInfo(card){
//         preloader.className = 'preloader';
//         divResult.className = 'hide';
//         return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${this.card}`)
//             .then(res => res.json())
//             .then(res => console.log(res))
//             .then(res => toTable(res))
//             .then(() =>{
//                 preloader.className = 'hide';
//                 divResult.className = 'result';
//                 resetInput();
//             })
//     };
// }
// class UIController{
//     constructor(data){
//         this.data = data;
//         this.inputName = document.getElementById('name');
//         this.inputCard = document.getElementById('card');
//         this.button = document.getElementById('submit');
//         this.divResult = document.getElementById('result');
//         this.tabResult = document.getElementById('table_result');
//         this.preloader = document.getElementById('preloader');
//     }
//         toTable() {
//             const keys = Object.keys(this.data);
//             const values = Object.values(this.data);
//             const table = document.getElementById('table_result');
//             for (let i = 0; i < keys.length; i += 1) {
// 				const tr = document.createElement('tr');
//                 const td_key = document.createElement('td');
//                 td_key.innerText = `${keys[i]}`;
//                 tr.append(td_key);
//                 const td_value = document.createElement('td');
//                 td_value.innerText = `${values[i]}`;
//                 tr.append(td_value);
//                 table.append(tr);
//             }
//         };
//         onChange(){
//             if(inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
//                   validInput(inputCard);
//               } else {
//                   invalidInput(inputCard);
//               }
//               validation()
//           }
//         validInput(name){
//             name.className = "green";  
//             name.valid = true;
//         }
//         invalidInput(name){
//             name.className = "red";
//             name.valid = false;
//         }
//         validation(){
//             if(inputName.valid && inputCard.valid){
//                     button.disabled = false;
//                 } else {
//                     button.disabled = true;
//             }
//         }  
// }
// // const inputName = document.getElementById('name');
// // const inputCard = document.getElementById('card');
// // const button = document.getElementById('submit');
// // const divResult = document.getElementById('result');
// // const tabResult = document.getElementById('table_result');
// // const preloader = document.getElementById('preloader');
// // const controller = new UIController();
// // const maskInput = new MaskInput(document.querySelector('.js-input-selector'), {
// // 	mask: '0000-0000-0000-0000',
// // 	alwaysShowMask: true,
// // 	maskChar: '_',
// // 	onChange(){
// // 		if(inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
// // 			  validInput(inputCard);
// // 		  } else {
// // 			  invalidInput(inputCard);
// // 		  }
// // 		  validation()
// // 	  }
// //   });
// //   inputName.addEventListener('change', ()=>{
// // 	  if (inputName.value.trim().length > 2){
// // 		  validInput(inputName);
// // 	  } else {
// // 		  invalidInput(inputName);
// // 	  }
// // 	  validation();
// //   })
// //   button.addEventListener('click', ()=>{
// // 	  let cardNumber = inputCard.value.split('-').join('');
// // 	  console.log(cardNumber);
// // 	  getCardInfo(cardNumber);
// //   })
// //   function validInput(name){
// // 	  name.className = "green";  
// // 	  name.valid = true;
// //   }
// //   function invalidInput(name){
// // 	  name.className = "red";
// // 	  name.valid = false;
// //   }
// //   function validation(){
// // 	  if(inputName.valid && inputCard.valid){
// // 			  button.disabled = false;
// // 		  } else {
// // 			  button.disabled = true;
// // 	  }
// //   }
// //   function getCardInfo(card){
// // 	  preloader.className = 'preloader';
// // 	  divResult.className = 'hide';
// // 	  return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${card}`)
// // 		  .then(res => res.json())
// // 		  .then(res => console.log(res))
// // 		  .then(res => toTable(res))
// // 		  .then(() =>{
// // 			  preloader.className = 'hide';
// // 			  divResult.className = 'result';
// // 			  resetInput();
// // 		  })
// //    };
},{"mask-input":"node_modules/mask-input/lib/maskInput.js","./ui_controller":"ui_controller.js","./card_data":"card_data.js"}],"C:/Users/Yorik/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49284" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/Yorik/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map