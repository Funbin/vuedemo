import Vue from 'vue';
let NotificationConstructor = Vue.extend(require('./main.vue'));

let instance = null;

const Notification = (options) => {
  if (Vue.prototype.$isServer) return;
  instance = new NotificationConstructor(options);
  return instance;
};

export default Notification;
