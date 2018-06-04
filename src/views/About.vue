<template>
  <div class="about">
    <div>
      <!-- Safari要文字中间加空格才生效 -->
      <label class="text">两 端 对 齐</label>
    </div>
    <div>
      <el-input type="number" v-model="money">
        <template slot="prepend">金额: </template>
      </el-input>
      <el-input type="number" v-model="rate" :maxlength="6">
        <template slot="prepend">利率: </template>
        <template slot="append">%</template>
      </el-input>
      <el-input type="number" v-model="years">
        <template slot="prepend">年限: </template>
      </el-input>
      <el-input v-model="result" :readonly="true">
        <template slot="prepend">合计: </template>
      </el-input>
    </div>
    <div>{{dpr}}</div>
    <div>
      <el-button @click="showDialog">打开Dialog,模拟v-model语法糖</el-button>
      <el-button @click="startApp">打开App(通用)</el-button>
      <el-button @click="openLoading">Loading</el-button>
      <el-button @click="openWS">打开Websocket</el-button>
      <el-button @click="openNotify">打开Notify</el-button>
      <el-button @click="createWorker">createWorker</el-button>
      <el-button @click="sendMsg">事件监听</el-button>
    </div>
    <my-dialog v-model="show"></my-dialog>
    <!-- <div> -->
      <!-- 打开考拉APP -->
      <!-- 可以通过指定参数 S.browser_fallback_url 来指定去向URL -->
      <!-- <a href="intent://com.test/data#Intent;scheme=kaola;package=com.kaola;S.browser_fallback_url=http%3A%2F%2Fapp.kaola.com;end">打开APP(Android)</a> -->
    <!-- </div> -->
    <!-- app下载页 -->
    <!-- <iframe v-show="isShowIframe" class="full-screen" src="http://pages.book.qq.com/pages/qidian/qddown/qdreader.htm"></iframe> -->
  </div>
</template>

<script type="text/babel">
  import Dialog from '../components/Dialog'
  import io from 'socket.io-client';
  import WebNotify from 'web-notify.js';
  import Event from '../common/event';
  // import Push from 'push.js';
  export default {
    name: 'about',
    data() {
      return {
        msg: 'about',
        show: false,
        money: null,
        rate: null,
        years: null,
        isShowIframe: false,
        socket: null,
      }
    },
    components: {
      'my-dialog': Dialog
    },
    created() {
      window.onpopstate = (event) => {
        // alert("message?: DOMString")
        this.isShowIframe = false;
      }
      // WebNotify.Permission.request(null,()=>{
      //   console.log('jinll');
      //   this.$toast('您拒绝了桌面通知，如若继续接收请到设置中给予权限')
      // });
    },
    computed: {
      result() {
        var fuli = 0;
        for (var i = 1; i <= this.years; i++) {
          fuli += Math.pow((1 + this.rate / 100), i);
        }
        fuli = fuli.toFixed(6);
        let endMoney = this.money * fuli;
        if (endMoney > 10000) {
          endMoney = (endMoney / 10000).toFixed(2) + '万';
        } else {
          endMoney = endMoney.toFixed(2);
        }
        console.log(endMoney);
        return endMoney;
      },
      dpr() {
        // return document.body.clientWidth;
        return "dpr:" + window.devicePixelRatio + ";  width:" + window.document.documentElement.clientWidth;
      }
    },
    methods: {
      showDialog() {
        this.show = true;
      },
      startApp() {
        /**
         * Android端
         * @type {String}
         *    <intent-filter>
                  <action android:name="android.intent.action.VIEW" />
                  <category android:name="android.intent.category.BROWSABLE" />
                  <category android:name="android.intent.category.DEFAULT"/>
                  <data
                      android:scheme="app"
                      android:host="com.test"
                      android:pathPrefix="/data"/>
              </intent-filter>
         */

        // let schemeUrl = 'app://com.test/data';
        let schemeUrl = 'weixin://';
        // let schemeUrl = 'xxx://';

        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          //ios9+使用通用链接 支持微信跳转 Universal Links
          //或使用内置广告条iOS Smart App Banner
          //ios默认使用href
          window.location.href = schemeUrl;

        } else if (navigator.userAgent.match(/android/i)) {
          //使用AndroidIntent或iframe
          //7.0支持App Links

          // 如果是微信则跳应用宝微下载
          if (navigator.userAgent.toLowerCase().match('micromessenger')) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.example.lfb_fileexplorer';
            return;
          }
          //创建一个隐藏的iframe
          //Android默认使用iframe
          var ifr = document.createElement('iframe');
          ifr.src = schemeUrl;
          ifr.style.display = 'none';
          document.body.appendChild(ifr);
          let openTime = Date.now();
          setTimeout(() => {
            document.body.removeChild(ifr);
            //没有安装app跳转到下载页面
            if (!this.isHidden() && Date.now() - openTime < 1100) {
              this.isShowIframe = true;
              history.pushState({}, "下载链接页", "");
            }
          }, 1000);
        }
      },
      //只支持Android4.4+
      isHidden() {
        let prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
        for (let i = 0, length1 = prefixes.length; i < length1; i++) {
          if ((prefixes[i] + 'Hidden') in document) {
            return document[prefixes[i] + 'Hidden'];
          }
        }
        return false;
      },
      openLoading() {
        let xxx = this.$myLoading({ text: ['正在拉取太平续保信息...', '正在拉取平安续保信息...', '正在拉取太保续保信息...', '正在拉取人保续保信息...'], delay: 3000, isButton: true });
        xxx.$on('skip', () => {
          console.log('hahahhah');
          xxx.hidden();
        })
        setTimeout(() => {
          // xxx.setText({text:['正在校正起保日期...','正在报价...',],delay:5000});
          xxx.hidden();
          // let loading = this.$pmLoading();
          // loading.close();
        }, 3000);
      },
      openWS() {
        /**
         * 使用socket.io
         */
        let serverUrl = 'ws://192.168.31.101:8888';
        if (!this.socket) {
          this.socket = io(serverUrl, { autoConnect: false });
          this.socket.open();
          this.socket.on('connect', () => {
            console.log('============连接成功===========');
            this.$toast(`连接成功...`);
            this.socket.emit('join', { sessionId: 1 })
          });
          this.socket.on('comingRecord', (data) => {
            // console.log(data);
            if (data > 365) {
              this.socket.close();
              console.log(this.socket);
            } else {
              // this.$toast(`第${data}次推送`);
              this.$msg({ plateNo: "粤B12345", remain: data })
              this.openNotify();
            }
          });
          this.socket.on('disconnect', (event) => {
            console.log(`============断开连接 ${event}==============`);
            // this.$toast(`断开连接...`);
          });
          this.socket.on('reconnecting', (count) => {
            console.log(`============正在重连${count}==============`);
            // this.$toast(`正在重连...`);
          });
          this.socket.on('reconnect', () => {
            console.log("============成功重连==============");
            // this.$toast(`成功重连...`);
          });
        } else if (this.socket.connected) {
          this.socket.close();
          this.socket.open();
        }
        /**
         * 原生方法
         */
        // const ws = new WebSocket(serverUrl);
        // ws.onopen = (event) =>{
        //   this.$toast('连接成功');
        // }
        // ws.onmessage = (event) =>{
        //   this.$toast(event.data);
        // }
        // ws.close = (event) =>{
        //   console.log(event);
        // }
      },
      openNotify() {
        // Push.create("Hello world!", {
        //   body: "How's it hangin'?",
        //   icon: '/static/loading.gif',
        //   requireInteraction:true,
        //   onClick: function () {
        //     window.focus();
        //     this.close();
        //   }
        // });
        let options = {
          tag: 'bjxcar',
          sticky: true,
          requireInteraction: true,
          body: `我是内容`,
          icon: '../../../../static/loading.gif',
          onClick: function () {
            this.close();
          }
        }
        console.log(WebNotify);
        WebNotify.create("标题", options);
      },
      createWorker() {
        let worker = new Worker("../../static/workerServer.js");
        worker.postMessage('hahahahhahah');
        worker.addEventListener('message', function (event) {
          console.log(event.data);
        }, false);
      },
      sendMsg(){
        Event.emit('newNotify', { name: 'fantastic' })
      }
    },
  }
</script>

<style lang="less" scoped>
  .about {
    background: transparent;
    padding: 0 .25rem;
  }

  .about>div {
    margin-top: .3rem;
    background: #fff;
  }

  .text {
    display: inline-block;
    width: 100%;
    height: .4rem;
    overflow: hidden;
    /**
      *单行两端对齐  Safari浏览器不支持
      */
    text-align-last: justify;
    /**
      * 多行两端对齐，需要配合after
      * @type {[type]}
      */
    text-align: justify;
  }

  .text:after {
    display: inline-block;
    content: "";
    width: 100%;
    height: 0;
    visibility: hidden;
  }

  .full-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    border: none;
    width: 100%;
    height: 100%;
  }
</style>
