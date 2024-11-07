"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  emit: () => emit,
  invoke: () => invoke,
  listen: () => listen
});
module.exports = __toCommonJS(src_exports);
function invoke(command, ...args) {
  return __async(this, null, function* () {
    try {
      const response = yield window.pywebview.api.invoke(command, ...args);
      if (response.status === "success" && response.data !== void 0) {
        return response.data;
      } else {
        throw new Error(response.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error calling Python command:", error);
      throw error;
    }
  });
}
function listen(event, callback) {
  window.addEventListener(`pywui:${event}`, (e) => {
    const payload = e["detail"];
    callback(payload.event, payload.data);
  });
  function unlisten(callback2) {
    const defaultCallback = (ev) => {
    };
    window.removeEventListener(`pywui:${event}`, callback2 != null ? callback2 : defaultCallback);
  }
  return unlisten;
}
function emit(event, data) {
  return __async(this, null, function* () {
    try {
      yield window.pywebview.api.emit(event, data);
    } catch (error) {
      console.error("Error emitting  event:", error);
      throw error;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emit,
  invoke,
  listen
});
//# sourceMappingURL=index.js.map