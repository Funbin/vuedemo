import Vue from 'vue';
import LoadingVue from './main.vue'
let LoadingConstructor = Vue.extend(LoadingVue)
let fullscreen;

LoadingConstructor.prototype.close = function () {
  clearInterval(this.vm.intervalId);
  this.vm.visible = false;
  this.$el.parentNode ? this.$el.parentNode.removeChild(this.$el) : '';
  this.$destroy();
};

LoadingConstructor.prototype.hidden = function () {
  clearInterval(this.vm.intervalId);
  this.vm.visible = false;
};

LoadingConstructor.prototype.show = function () {
  this.vm.visible = true;
  this.vm.launch();
};

const Loading = (options) => {
  if (typeof options === 'string') {
    options = {
      currentText: options,
    }
  }
  //单例模式
  // if (fullscreen) {
  //   return fullscreen;
  // } else {
  fullscreen = new LoadingConstructor({
    data: options
  });
  // }
  fullscreen.vm = fullscreen.$mount();
  fullscreen.vm.visible = true;
  document.body.appendChild(fullscreen.vm.$el);
  fullscreen.launch();
  return fullscreen;
};

export default Loading;
