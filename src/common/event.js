let Event = {
  on: function (eventName, callback) {
    if (!this[eventName]) this[eventName] = [];
    this[eventName].push(callback);
  },
  emit: function (eventName) {
    let context = this;
    let params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
    if (context[eventName]) {
      Array.prototype.forEach.call(context[eventName], function (arg) {
        arg.apply(self, params);
      });
    }
  }
};

export default Event;