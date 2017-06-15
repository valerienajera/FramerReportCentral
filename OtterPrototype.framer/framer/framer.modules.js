require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"InputField":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.InputField = (function(superClass) {
  var INPUT_HIDE_PSUEDO_UI, INPUT_SELECTOR_NUMBER, INPUT_SELECTOR_SEARCH, PATTERN_NUMBER;

  extend(InputField, superClass);

  PATTERN_NUMBER = "[0-9]*";

  INPUT_HIDE_PSUEDO_UI = "{ -webkit-appearance: none; display: none; }";

  INPUT_SELECTOR_NUMBER = "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button";

  INPUT_SELECTOR_SEARCH = "input[type=search]::-webkit-search-cancel-button";

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

  Events.Valid = "InputField.OnValid";

  Events.Invalid = "InputField.OnInvalid";

  Events.Match = "InputField.OnMatch";

  InputField.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(v) {
      if (!v) {
        return;
      }
      if (this.input) {
        return this.changeInputValue(v);
      }
    }
  });

  function InputField(options) {
    var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, inputStyle, key, ref, val;
    this.options = options != null ? options : {};
    this.isNumber = false;
    this.isSearch = false;
    this.isEmpty = true;
    this.isValid = null;
    this.originalTextColor = null;
    if ((this.options.pattern != null) || (this.options.match != null)) {
      this.shouldCheckValidity = true;
    }
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).name == null) {
      base.name = this.options.type + "Input";
    }
    if ((base1 = this.options).color == null) {
      base1.color = "black";
    }
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = "";
    }
    if ((base3 = this.options).borderRadius == null) {
      base3.borderRadius = 0;
    }
    if ((base4 = this.options).type == null) {
      base4.type = "text";
    }
    if ((base5 = this.options).fontSize == null) {
      base5.fontSize = 32;
    }
    if ((base6 = this.options).fontWeight == null) {
      base6.fontWeight = 300;
    }
    if ((base7 = this.options).fontFamily == null) {
      base7.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base8 = this.options).lineHeight == null) {
      base8.lineHeight = 1.25;
    }
    if ((base9 = this.options).indent == null) {
      base9.indent = 0;
    }
    if ((base10 = this.options).placeHolderFocus == null) {
      base10.placeHolderFocus = null;
    }
    if ((base11 = this.options).placeHolderColor == null) {
      base11.placeHolderColor = null;
    }
    InputField.__super__.constructor.call(this, this.options);
    switch (this.options.type) {
      case "search":
        this.isSearch = true;
        break;
      case "number":
        this.isNumber = true;
        break;
      case "numbers-only":
      case "number-only":
        this.isNumber = true;
        this.options.type = this.options.pattern != null ? "number" : "text";
        this.options.pattern = this.options.pattern != null ? this.options.pattern : PATTERN_NUMBER;
    }
    this.html += (function() {
      switch (false) {
        case !this.isNumber:
          return "<style type='text/css'>" + INPUT_SELECTOR_NUMBER + INPUT_HIDE_PSUEDO_UI + "</style>";
        case !this.isSearch:
          return "<style type='text/css'>" + INPUT_SELECTOR_SEARCH + INPUT_HIDE_PSUEDO_UI + "</style>";
        default:
          return "";
      }
    }).call(this);
    if (this.options.placeHolderColor != null) {
      this.html += "<style type='text/css'>::-webkit-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-moz-placeholder { color: " + this.options.placeHolderColor + "; } :-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } :placeholder-shown { color: " + this.options.placeHolderColor + "; }</style>";
    }
    this.input = document.createElement("input");
    this.input.type = this.options.type;
    if (this.options.value != null) {
      this.input.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.input.placeholder = this.options.placeHolder;
    }
    if (this.options.pattern != null) {
      this.input.pattern = this.options.pattern;
    }
    if (this.options.maxLength != null) {
      this.input.setAttribute("maxLength", this.options.maxLength);
    }
    this.input.setAttribute("autocapitalize", (this.options.autoCapitalize === true ? "on" : "off"));
    this.input.setAttribute("autocomplete", (this.options.autoComplete === true ? "on" : "off"));
    this.input.setAttribute("autocorrect", (this.options.autoCorrect === true ? "on" : "off"));
    this._element.appendChild(this.input);
    this.isEmpty = !(((ref = this.options.value) != null ? ref.length : void 0) > 0);
    this.originalTextColor = this.options.color;
    inputStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      textIndent: this.options.indent + "px",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      margin: "0",
      padding: "0",
      "-webkit-appearance": "none"
    };
    for (key in inputStyle) {
      val = inputStyle[key];
      this.input.style[key] = val;
    }
    if (this.options.color != null) {
      this.input.style.color = this.options.color;
    }
    this.input.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (_this.options.placeHolderFocus != null) {
          _this.input.placeholder = _this.options.placeHolderFocus;
        }
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.input.value, _this);
      };
    })(this);
    this.input.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.input.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.input.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.input.value, _this);
      };
    })(this);
    this.input.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.input.value) != null ? ref1.length : void 0) > 0);
        _this.emit(Events.Input, _this.input.value, _this);
        return _this.checkValidity();
      };
    })(this);
    this.on(Events.TouchEnd, function() {
      return this.input.focus();
    });
    this.on("change:color", function() {
      return this.changeInputTextColor();
    });
  }

  InputField.prototype.checkValidity = function() {
    var ref, validity;
    if (!this.shouldCheckValidity) {
      return;
    }
    if (this.options.pattern != null) {
      validity = this.input.checkValidity();
      this.isEmpty = !(((ref = this.input.value) != null ? ref.length : void 0) > 0);
      if (this.isValid !== validity || this.isEmpty) {
        if (this.isEmpty || !validity) {
          this.isValid = false;
          this.emit(Events.Invalid, this.input.value, this);
        } else {
          this.isValid = true;
          this.emit(Events.Valid, this.input.value, this);
        }
      }
    }
    if (this.checkMatch()) {
      this.isValid = true;
      return this.emit(Events.Match, this.input.value, this);
    }
  };

  InputField.prototype.checkMatch = function() {
    var i, len, match, ref;
    if (this.options.match == null) {
      return false;
    }
    if (Array.isArray(this.options.match)) {
      ref = this.options.match;
      for (i = 0, len = ref.length; i < len; i++) {
        match = ref[i];
        if (this.input.value.indexOf(match) > -1) {
          return true;
        }
      }
    } else {
      if (this.input.value.indexOf(this.options.match) > -1) {
        return true;
      }
    }
    return false;
  };

  InputField.prototype.clear = function() {
    this.input.value = "";
    this.isValid = null;
    return this.isEmpty = true;
  };

  InputField.prototype.changeInputTextColor = function() {
    return this.input.style.color = this.color.toHexString();
  };

  InputField.prototype.changeInputValue = function(v) {
    this.input.value = v;
    return this.input.oninput();
  };

  return InputField;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0RvY3VtZW50cy9PdHRlclByb3RvdHlwZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Eb2N1bWVudHMvT3R0ZXJQcm90b3R5cGUuZnJhbWVyL21vZHVsZXMvSW5wdXRGaWVsZC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIDA3IEphbiAyMDE2IGJ5IEpvcmRhbiBSb2JlcnQgRG9ic29uIC8gQGpvcmRhbmRvYnNvbiAvIEpvcmRhbkRvYnNvbi5jb21cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jXG4jIFZhbGlkICYgVGVzdGVkIElucHV0RmllbGQgVHlwZXM6IFxuIyBcdFwidGV4dFwiLCBcImVtYWlsXCIsIFwibnVtYmVyXCIsIFwibnVtYmVyLW9ubHlcIiwgXCJ1cmxcIiwgXCJ0ZWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiXG4jIFx0XCJ0aW1lXCIsIFwibW9udGhcIiwgXCJkYXRlXCIsIFwiZGF0ZXRpbWUtbG9jYWxcIlxuIyBcbiMgVGhlIHRpbWUgJiBkYXRlIHR5cGVzIFJFUVVJUkUgdGhlIHZhbHVlIHByb3BlcnR5IGlzIGluIGEgY29ycmVjdCBmb3JtYXQgJiBJR05PUkUgdGhlIHBsYWNlaG9sZGVyIHByb3BlcnR5LlxuIyBcbiMgSGVyZSdzIGEgZmV3IGV4YW1wbGVzIHRvIHVzZSBmb3IgdGhlIHZhbHVlOiBwcm9wZXJ0eSB3aGVuIHlvdSBjcmVhdGUgdGhlbTpcbiNcbiMgXHQqIHRpbWU6IFwiMTI6MzhcIlxuIyBcdCogbW9udGg6IFwiMjAxNi0wMVwiXG4jIFx0KiBkYXRlOiBcIjIwMTYtMDEtMDRcIlxuIyBcdCogZGF0ZXRpbWUtbG9jYWw6IFwiMjAxNi0wMS0wNFQxMjo0NDozMS4xOTJcIlxuI1xuIyBOT1RFUyAvIFxuIyBcdFNvbWUgdHlwZXMgd29yayBiZXR0ZXIgdGhhbiBvdGhlcnMgb24gbW9iaWxlIG9yIGRpc3BsYXkgZGlmZmVyZW50bHkgdGhhbiBkZXNrdG9wLlxuIyBcdEFsbCBwcm9wZXJ0aWVzIHdpbGwgd29yayB3aXRoIGlucHV0IHR5cGUgXCJ0ZXh0XCIgYnV0IG1heSBub3Qgd29yayB3aXRoIG90aGVyIHR5cGVzLlxuIyBcdFNvbWUgZXZlbnRzIHdvbid0IGZpcmUgaWYgeW91IGVudGVyIGluY29ycmVjdCBjb250ZW50IGZvciB0aGUgZmllbGQgdHlwZTogaS5lLiBcImhlbGxvXCIgZm9yIGlucHV0IHR5cGUgXCJudW1iZXJcIi5cbiMgXHRGaW5kIG1vcmUgcGF0dGVybnMgZm9yIFZhbGlkIGFuZCBJbnZhbGlkIGV2ZW50cyBhdCBodHRwOi8vaHRtbDVwYXR0ZXJuLmNvbVxuIyBcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cblxuY2xhc3MgZXhwb3J0cy5JbnB1dEZpZWxkIGV4dGVuZHMgTGF5ZXJcblxuXHRQQVRURVJOX05VTUJFUiA9IFwiWzAtOV0qXCJcblx0XG5cdElOUFVUX0hJREVfUFNVRURPX1VJICA9IFwieyAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IGRpc3BsYXk6IG5vbmU7IH1cIlxuXHRJTlBVVF9TRUxFQ1RPUl9OVU1CRVIgPSBcImlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uXCJcblx0SU5QVVRfU0VMRUNUT1JfU0VBUkNIID0gXCJpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b25cIlxuXHRcblx0RXZlbnRzLklucHV0ICAgPSBcIklucHV0RmllbGQuT25JbnB1dFwiXG5cdEV2ZW50cy5Gb2N1cyAgID0gXCJJbnB1dEZpZWxkLk9uRm9jdXNcIlxuXHRFdmVudHMuQmx1ciAgICA9IFwiSW5wdXRGaWVsZC5PbkJsdXJcIlxuXHRFdmVudHMuVmFsaWQgICA9IFwiSW5wdXRGaWVsZC5PblZhbGlkXCJcblx0RXZlbnRzLkludmFsaWQgPSBcIklucHV0RmllbGQuT25JbnZhbGlkXCJcblx0RXZlbnRzLk1hdGNoICAgPSBcIklucHV0RmllbGQuT25NYXRjaFwiXG5cdFxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+XG5cdFx0XHRAaW5wdXQudmFsdWVcblx0XHRcdFxuXHRcdHNldDogKHYpIC0+XG5cdFx0XHRyZXR1cm4gdW5sZXNzIHZcblx0XHRcdGlmIEBpbnB1dFxuXHRcdFx0XHRAY2hhbmdlSW5wdXRWYWx1ZSB2XG5cblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcblx0XHRAaXNOdW1iZXIgPSBmYWxzZVxuXHRcdEBpc1NlYXJjaCA9IGZhbHNlXG5cdFx0XG5cdFx0QGlzRW1wdHkgID0gdHJ1ZVxuXHRcdEBpc1ZhbGlkICA9IG51bGxcblx0XHRAb3JpZ2luYWxUZXh0Q29sb3IgPSBudWxsXG5cdFx0XG5cdFx0IyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBDaGVja2luZyBGbGFnXG5cdFx0QHNob3VsZENoZWNrVmFsaWRpdHkgPSB0cnVlIGlmIEBvcHRpb25zLnBhdHRlcm4/IG9yIEBvcHRpb25zLm1hdGNoP1xuXG5cdFx0IyBNYWtlIHN1cmUgdGhpcyBpcyBpbiBweFxuXHRcdEBvcHRpb25zLmxpbmVIZWlnaHQgPSBcIiN7QG9wdGlvbnMubGluZUhlaWdodH1weFwiIGlmIEBvcHRpb25zLmxpbmVIZWlnaHQ/XG5cdFx0IFx0XHRcdFx0XHRcdFx0XHRcblx0XHQjIEZyYW1lciBMYXllciBQcm9wc1xuXHRcdEBvcHRpb25zLm5hbWUgICAgICAgICAgICAgPz0gXCIje0BvcHRpb25zLnR5cGV9SW5wdXRcIlxuXHRcdEBvcHRpb25zLmNvbG9yICAgICAgICAgICAgPz0gXCJibGFja1wiXG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yICA/PSBcIlwiXG5cdFx0QG9wdGlvbnMuYm9yZGVyUmFkaXVzICAgICA/PSAwXG5cblx0XHQjIEN1c3RvbSBMYXllciBQcm9wc1x0XHRcblx0XHRAb3B0aW9ucy50eXBlICAgICAgICAgICAgID89IFwidGV4dFwiXG5cdFx0QG9wdGlvbnMuZm9udFNpemUgICAgICAgICA/PSAzMlxuXHRcdEBvcHRpb25zLmZvbnRXZWlnaHQgICAgICAgPz0gMzAwXG5cdFx0QG9wdGlvbnMuZm9udEZhbWlseSAgICAgICA/PSBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSBOZXVlXCJcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ICAgICAgID89IDEuMjVcblx0XHRAb3B0aW9ucy5pbmRlbnQgICAgICAgICAgID89IDBcblx0XHRAb3B0aW9ucy5wbGFjZUhvbGRlckZvY3VzID89IG51bGxcblx0XHRAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yID89IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0IyBBZGp1c3QgYSBmZXcgdGhpbmdzIGZvciB2YXJpb3VzIHR5cGVzXG5cdFx0XG5cdFx0c3dpdGNoIEBvcHRpb25zLnR5cGVcblx0XHRcdHdoZW4gXCJzZWFyY2hcIiB0aGVuIEBpc1NlYXJjaCA9IHRydWVcblx0XHRcdHdoZW4gXCJudW1iZXJcIiB0aGVuIEBpc051bWJlciA9IHRydWVcblx0XHRcdHdoZW4gXCJudW1iZXJzLW9ubHlcIiwgXCJudW1iZXItb25seVwiXG5cdFx0XHRcdEBpc051bWJlciA9IHRydWVcblx0XHRcdFx0QG9wdGlvbnMudHlwZSAgICA9IGlmIEBvcHRpb25zLnBhdHRlcm4/IHRoZW4gXCJudW1iZXJcIiAgICAgICAgICBlbHNlIFwidGV4dFwiXG5cdFx0XHRcdEBvcHRpb25zLnBhdHRlcm4gPSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyB0aGVuIEBvcHRpb25zLnBhdHRlcm4gZWxzZSBQQVRURVJOX05VTUJFUlxuXHRcdFxuXHRcdEBodG1sICs9IHN3aXRjaFxuXHRcdFx0d2hlbiBAaXNOdW1iZXIgdGhlbiBcIjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+I3tJTlBVVF9TRUxFQ1RPUl9OVU1CRVJ9I3tJTlBVVF9ISURFX1BTVUVET19VSX08L3N0eWxlPlwiXG5cdFx0XHR3aGVuIEBpc1NlYXJjaCB0aGVuIFwiPHN0eWxlIHR5cGU9J3RleHQvY3NzJz4je0lOUFVUX1NFTEVDVE9SX1NFQVJDSH0je0lOUFVUX0hJREVfUFNVRURPX1VJfTwvc3R5bGU+XCJcblx0XHRcdGVsc2UgXCJcIlxuXG5cdFx0aWYgQG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcj9cblx0XHRcdEBodG1sICs9IFwiPHN0eWxlIHR5cGU9J3RleHQvY3NzJz46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yfTsgfSA6Oi1tb3otcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yfTsgfSA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yfTsgfSA6cGxhY2Vob2xkZXItc2hvd24geyBjb2xvcjogI3tAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yfTsgfTwvc3R5bGU+XCJcblx0XHRcdFxuXHRcdCMgQ3JlYXRlIFRoZSBJbnB1dFxuXHRcdFxuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0XG5cdFx0QGlucHV0LnR5cGUgICAgICAgID0gQG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC52YWx1ZSAgICAgICA9IEBvcHRpb25zLnZhbHVlICAgICAgICAgICAgICAgICAgaWYgQG9wdGlvbnMudmFsdWU/XG5cdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXIgICAgICAgICAgICBpZiBAb3B0aW9ucy5wbGFjZUhvbGRlcj9cblx0XHRAaW5wdXQucGF0dGVybiAgICAgPSBAb3B0aW9ucy5wYXR0ZXJuICAgICAgICAgICAgICAgIGlmIEBvcHRpb25zLnBhdHRlcm4/XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcIm1heExlbmd0aFwiLCBAb3B0aW9ucy5tYXhMZW5ndGgpIGlmIEBvcHRpb25zLm1heExlbmd0aD9cblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NhcGl0YWxpemVcIiwgKGlmIEBvcHRpb25zLmF1dG9DYXBpdGFsaXplIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsICAgKGlmIEBvcHRpb25zLmF1dG9Db21wbGV0ZSAgIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvcnJlY3RcIiwgICAgKGlmIEBvcHRpb25zLmF1dG9Db3JyZWN0ICAgIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0XG5cdFx0IyBTZXR1cCBWYWx1ZXNcblx0XHRAaXNFbXB0eSAgICAgICAgICAgPSAhKEBvcHRpb25zLnZhbHVlPy5sZW5ndGggPiAwKVxuXHRcdEBvcmlnaW5hbFRleHRDb2xvciA9IEBvcHRpb25zLmNvbG9yXG5cdFx0XG5cdFx0IyBTZXR1cCBJbnB1dCBTdHlsZVxuXHRcdFxuXHRcdGlucHV0U3R5bGUgPVxuXHRcdFx0Zm9udDogXCIje0BvcHRpb25zLmZvbnRXZWlnaHR9ICN7QG9wdGlvbnMuZm9udFNpemV9cHgvI3tAb3B0aW9ucy5saW5lSGVpZ2h0fSAje0BvcHRpb25zLmZvbnRGYW1pbHl9XCJcblx0XHRcdG91dGxpbmU6IFwibm9uZVwiXG5cdFx0XHR0ZXh0SW5kZW50OiBcIiN7QG9wdGlvbnMuaW5kZW50fXB4XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRoZWlnaHQ6IFwiMTAwJVwiXG5cdFx0XHR3aWR0aDogIFwiMTAwJVwiXG5cdFx0XHRwb2ludGVyRXZlbnRzOiBcIm5vbmVcIlxuXHRcdFx0bWFyZ2luOiBcIjBcIlxuXHRcdFx0cGFkZGluZzogXCIwXCJcblx0XHRcdFwiLXdlYmtpdC1hcHBlYXJhbmNlXCI6IFwibm9uZVwiXG5cdFx0XHRcblx0XHRAaW5wdXQuc3R5bGVba2V5XSAgPSB2YWwgZm9yIGtleSwgdmFsIG9mIGlucHV0U3R5bGVcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBAb3B0aW9ucy5jb2xvciBpZiBAb3B0aW9ucy5jb2xvcj9cblx0XHRcblx0XHRAaW5wdXQub25mb2N1cyA9ID0+XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyRm9jdXMgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXJGb2N1cz9cblx0XHRcdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMFxuXHRcdFx0QGVtaXQoRXZlbnRzLkZvY3VzLCBAaW5wdXQudmFsdWUsIEApXG5cblx0XHRAaW5wdXQub25ibHVyICA9ID0+XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdHVubGVzcyBAaW5wdXQucGxhY2Vob2xkZXIgaXMgQG9wdGlvbnMucGxhY2VIb2xkZXIgb3IgIUBvcHRpb25zLnBsYWNlSG9sZGVyP1xuXHRcdFx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlclxuXHRcdFx0QGVtaXQoRXZlbnRzLkJsdXIsIEBpbnB1dC52YWx1ZSwgQClcblxuXHRcdEBpbnB1dC5vbmlucHV0ID0gPT5cblx0XHRcdEBpc0VtcHR5ID0gISggQGlucHV0LnZhbHVlPy5sZW5ndGggPiAwKVxuXHRcdFx0QGVtaXQoRXZlbnRzLklucHV0LCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRAY2hlY2tWYWxpZGl0eSgpXG5cdFx0XHRcblx0XHRAb24gRXZlbnRzLlRvdWNoRW5kLCAtPiBAaW5wdXQuZm9jdXMoKVxuXHRcdEBvbiBcImNoYW5nZTpjb2xvclwiLCAgLT4gQGNoYW5nZUlucHV0VGV4dENvbG9yKClcblx0XHRcblx0Y2hlY2tWYWxpZGl0eTogLT5cblx0XHRyZXR1cm4gdW5sZXNzIEBzaG91bGRDaGVja1ZhbGlkaXR5XG5cblx0XHRpZiBAb3B0aW9ucy5wYXR0ZXJuP1xuXHRcdFx0dmFsaWRpdHkgPSBAaW5wdXQuY2hlY2tWYWxpZGl0eSgpXG5cdFx0XHRAaXNFbXB0eSA9ICEoIEBpbnB1dC52YWx1ZT8ubGVuZ3RoID4gMClcblx0XHRcdFxuXHRcdFx0aWYgQGlzVmFsaWQgaXNudCB2YWxpZGl0eSBvciBAaXNFbXB0eVxuXHRcdFx0XHRpZiBAaXNFbXB0eSBvciAhdmFsaWRpdHlcblx0XHRcdFx0XHRAaXNWYWxpZCA9IGZhbHNlXG5cdFx0XHRcdFx0QGVtaXQoRXZlbnRzLkludmFsaWQsIEBpbnB1dC52YWx1ZSwgQClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEBpc1ZhbGlkID0gdHJ1ZVxuXHRcdFx0XHRcdEBlbWl0KEV2ZW50cy5WYWxpZCwgICBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRcdFx0XG5cdFx0aWYgQGNoZWNrTWF0Y2goKVxuXHRcdFx0QGlzVmFsaWQgPSB0cnVlXG5cdFx0XHRAZW1pdChFdmVudHMuTWF0Y2gsIEBpbnB1dC52YWx1ZSwgQClcblx0XHRcdFxuXHRjaGVja01hdGNoOiAtPlxuXHRcdHJldHVybiBmYWxzZSB1bmxlc3MgQG9wdGlvbnMubWF0Y2g/XG5cdFx0aWYgQXJyYXkuaXNBcnJheShAb3B0aW9ucy5tYXRjaClcblx0XHRcdGZvciBtYXRjaCBpbiBAb3B0aW9ucy5tYXRjaFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZSBpZiBAaW5wdXQudmFsdWUuaW5kZXhPZihtYXRjaCkgPiAtMVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB0cnVlIGlmIEBpbnB1dC52YWx1ZS5pbmRleE9mKEBvcHRpb25zLm1hdGNoKSA+IC0xXG5cdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRcblx0Y2xlYXI6IC0+XG5cdFx0QGlucHV0LnZhbHVlID0gXCJcIlxuXHRcdEBpc1ZhbGlkID0gbnVsbFxuXHRcdEBpc0VtcHR5ID0gdHJ1ZVxuXHRcdFxuXHRjaGFuZ2VJbnB1dFRleHRDb2xvcjogLT4gXG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gQGNvbG9yLnRvSGV4U3RyaW5nKClcblx0XG5cdGNoYW5nZUlucHV0VmFsdWU6ICh2KSAtPlxuXHRcdEBpbnB1dC52YWx1ZSA9IHZcblx0XHRAaW5wdXQub25pbnB1dCgpXG5cdFx0XG5cdFx0XG5cdFx0IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QUQwQkEsSUFBQTs7O0FBQU0sT0FBTyxDQUFDO0FBRWIsTUFBQTs7OztFQUFBLGNBQUEsR0FBaUI7O0VBRWpCLG9CQUFBLEdBQXdCOztFQUN4QixxQkFBQSxHQUF3Qjs7RUFDeEIscUJBQUEsR0FBd0I7O0VBRXhCLE1BQU0sQ0FBQyxLQUFQLEdBQWlCOztFQUNqQixNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLElBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxLQUFQLEdBQWlCOztFQUNqQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBRWpCLFVBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFDSixJQUFDLENBQUEsS0FBSyxDQUFDO0lBREgsQ0FBTDtJQUdBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFDSixJQUFBLENBQWMsQ0FBZDtBQUFBLGVBQUE7O01BQ0EsSUFBRyxJQUFDLENBQUEsS0FBSjtlQUNDLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixDQUFsQixFQUREOztJQUZJLENBSEw7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
