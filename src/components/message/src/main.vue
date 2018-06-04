<template>
  <transition name="el-message-fade">
    <div
      class="el-message message"
      :class="customClass"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <div class="el-message__group" :class="{ 'is-with-icon': iconClass }">
        <div class="message_content">
          车辆<span class="message_span">{{plateNo}}</span>进店，车险到期还<span class="message_span">{{remain}}</span>天，请留意跟进！
          <a href="javascript:void(0)" class="message_button" @click="toDetail">点击查看详情</a>
        </div>
        <div class="el-message__closeBtn el-icon-close" @click="close"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        visible: false,
        duration: 3000,
        iconClass: '',
        customClass: '',
        onClose: null,
        closed: false,
        timer: null,
        plateNo:'',
        remain:'',
      };
    },

    computed: {
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },

      toDetail(){
        this.close();
      }
    },

    mounted() {
      // this.startTimer();
    }
  };
</script>
<style lang="less">
  .message{
    z-index:2000;
    top:45px;
    background:#EFF5F8;
  }
  .message_content{
    font-size: 14px;
    margin: 0 34px 0 0;
    white-space: nowrap;
    text-align: justify;
  }
  .message_span{
    color: #32BDFA ;
  }
  .message_button{
    color: #32BDFA;
    text-decoration: underline !important;
  }
</style>
