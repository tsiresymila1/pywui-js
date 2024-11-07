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
export {
  emit,
  invoke,
  listen
};
//# sourceMappingURL=index.mjs.map