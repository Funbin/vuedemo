<template>
  <div v-show="visible" class="loading__mask">
    <div class="loading__spinner">
      <!-- <svg class="loading__circular" viewBox="25 25 50 50">
            <circle class="loading__path" cx="50" cy="50" r="20" fill="none"/>
          </svg> -->
      <img src="../../../../static/loading.gif">
      <p v-if="text" class="loading__text">{{ currentText }}</p>
      <el-button class="loading__button" @click="skip" v-show="isButton">跳过信息拉取</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentText: null,
        visible: false,
        text: [],
        delay: 3000,
        intervalId: -1,
        isButton: false,
      };
    },
    methods: {
      launch() {
        clearInterval(this.intervalId);
        if (typeof this.text === 'string') {
          this.currentText = this.text;
          return;
        }
        if (this.text && this.text.length > 0) {
          let currentIndex = 0;
          this.currentText = this.text[currentIndex];
          currentIndex++;
          this.intervalId = setInterval(() => {
            if (currentIndex <= this.text.length - 1) {
              this.currentText = this.text[currentIndex];
              currentIndex++;
            } else {
              clearInterval(this.intervalId);
            }
          }, this.delay);
        }
      },
      setText(newText) {
        if (typeof newText === 'object') {
          this.text = newText.text;
          this.delay = newText.delay ? newText.delay : this.delay;
        } else if (typeof newText === 'string') {
          this.text = newText;
        }
        this.launch();
      },
      skip() {
        this.$emit('skip');
      },
      showButton() {
        this.isButton = true;
      },
      hideButton() {
        this.isButton = false;
      },
    },
    watch: {
    }
  };
</script>

<style lang="less" type="text/less">
  @baseColor: #ff7e0f;
  .loading__mask {
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    transition: opacity .3s;
    background-color: rgba(255, 255, 255, .9);
  }

  .loading__spinner {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-70%);
    text-align: center;
  }

  .loading__circular {
    width: 42px;
    height: 42px;
    animation: loading-rotate 2s linear infinite;
  }

  .loading__path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: @baseColor;
    stroke-linecap: round;
  }

  .loading__text {
    margin: 3px 0;
    font-size: 14px;
    color: @baseColor;
  }

  .loading__button {
    margin-top: 30px;
  }

  @keyframes loading-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
