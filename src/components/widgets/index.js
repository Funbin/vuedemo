import Loading from '../loading';
import Message from '../message';

let components = [Loading, Message]

let install = function (Vue) {
  components.forEach(function(element) {
    Vue.component(element.name, element)
  });

  Vue.prototype.$myLoading = Loading;
  Vue.prototype.$msg = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install
}
