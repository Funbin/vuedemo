import Vue from 'vue';
let MessageConstructor = Vue.extend(require('./main.vue'));

let instance;
let instances = [];
let seed = 1;

var Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    Message.close(id, userOnClose);
  };

  if (instance && !instance.closed) {
    instance.onClose(instance);
    instance.destroyElement();
    instance = new MessageConstructor({
      data: options
    });
  } else {
    instance = new MessageConstructor({
      data: options
    });
  }
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  // instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

Message.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

export default Message;
