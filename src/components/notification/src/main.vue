 <script type="text/babel">
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        visible: true,
        intervalId: -1,
        currentNotice: null,
      };
    },

    computed: {
      ...mapGetters({
        newNotice: 'getNewNotice',
      }),
    },

    watch: {
      newNotice(newVal) {
        if (this.isMinStatus()) {
          this.hiddenTitle();
          this.showNotification();
        } else if (!this.visible && this.intervalId === -1) {
          this.showTitle();
        }
      }
    },
    methods: {
      open() {
        // 各种浏览器兼容
        let hidden, state, visibilityChange;
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          visibilityChange = "visibilitychange";
          state = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden";
          visibilityChange = "mozvisibilitychange";
          state = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          visibilityChange = "msvisibilitychange";
          state = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
          state = "webkitVisibilityState";
        }
        // 添加监听器，在title里显示状态变化
        document.addEventListener(visibilityChange, () => {
          if (document[state] === 'hidden') {
            this.visible = false;
          } else {
            this.visible = true;
            this.hiddenTitle();
          }
        }, false);
        this.getNotificationPermission();
      },
      showTitle() {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
          if (document.title.includes('新车进店')) {
            document.title = `北极星【　　　　】`;
          } else {
            document.title = `北极星【新车进店】`;
          }
        }, 500);
      },
      hiddenTitle() {
        clearInterval(this.intervalId);
        document.title = '北极星';
        this.intervalId = -1;
      },
      isMinStatus() {
        let isMin = false;
        if (window.outerWidth != undefined) {
          isMin = (window.outerWidth <= 160 && window.outerHeight <= 27) || (window.screenTop < -30000 && window.screenLeft < -30000);
        } else {
          isMin = window.screenTop < -30000 && window.screenLeft < -30000;
        }
        // console.log(`window.outerWidth == ${window.outerWidth}`);
        // console.log(`window.outerHeight == ${window.outerHeight}`);
        // console.log(`window.screenTop == ${window.screenTop}`);
        // console.log(`window.screenLeft == ${window.screenLeft}`);
        return isMin;
      },
      getNotificationPermission() {
        // 首先，让我们检查我们是否有权限发出通知
        // 如果没有，我们就请求获得权限
        if (window.Notification && Notification.permission !== "granted") {
          Notification.requestPermission(status => {
            if (Notification.permission !== status) {
              Notification.permission = status;
            }
          });
        }
      },
      showNotification() {
        let options = {
          tag: 'bjxcar',
          sticky: true,
          requireInteraction:true,
          body: `车险到期还有 89天，请留意跟进！`,
          icon: '../../../../../static/plate.png',
        }
        if (window.Notification && Notification.permission === "granted") {
          this.currentNotice = new Notification(`新车进店${this.newNotice}`, options);
        } else if (window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission(status => {
            if (Notification.permission !== status) {
              Notification.permission = status;
            }
            if (status === "granted") {
              this.currentNotice = new Notification(`新车进店${this.newNotice}`, options);
            }
          });
        }
        if (this.currentNotice) {
          this.currentNotice.onclick = () => {
            window.focus();
            this.currentNotice.close();
          }
          this.currentNotice.onclose = () => {
            this.currentNotice = null;
          }
        }
      },
    },
  };
</script>
