<template>
  <!-- 页眉的第一行是一个QToolbar -->
  <div>
    <q-toolbar style="max-height: 50px">
      <q-icon
        size="30px"
        name="public"/>
      <span class="text-weight-bold q-ml-md">代理工具平台</span>

      <div class="absolute-right">
        <!--<q-btn class="full-height shadow-0"-->
        <!--@click.native=user_info_btn_click-->
        <!--icon="person">-->
        <!--<q-tooltip :offset="[5,5]">{{user_info_btn_tip()}}</q-tooltip>-->
        <!--</q-btn>-->
        <!--<q-btn v-show=isAdmin-->
        <!--class="full-height shadow-0"-->
        <!--icon="settings"-->
        <!--&gt;-->
        <!--<q-tooltip :offset="[5,5]">配置</q-tooltip>-->
        <!--</q-btn>-->
        <!--<q-btn class="shadow-0 full-height"-->
               <!--size="xl"-->
               <!--icon="get_app">-->
          <!--<q-tooltip :offset="[5,5]">获取证书</q-tooltip>-->
          <!--<q-popover>-->
            <!--<div class="q-pa-md" id="qrCode" ref="qrCodeDiv"/>-->
            <!--<div class="items-center row flex-center q-pl-md q-pr-md q-pb-md" >-->
              <!--<q-btn label="点击下载" color="primary" style="width: 100%"  v-on:click="this.download_ca"/>-->
            <!--</div>-->
          <!--</q-popover>-->
        <!--</q-btn>-->
      </div>
    </q-toolbar>
  </div>
</template>
<script>

  export default {
    name: 'header-menu',
    mixins: [],
    components: {},
    props: {
      defaultMiniMenu: false,
    },
    data: () => {
      return {
        show_log_out: false,
        host_ip: null,
      }
    },
    computed: {
      // showMenu() {
      //   return this.$store.state.main.show_menu;
      // }
      // userName () {
      //   return this.$store.state.user.login_name
      // },
      // isAdmin () {
      //   return this.$store.state.user.type === 2 ? true : false
      // }
    },
    methods: {
      // user_info_btn_click () {
      //   if (this.userName) {
      //     //this.$router.push({path: '/user/update'})
      //   } else {
      //     this.$router.push(({path: '/login'}))
      //   }
      // },
      // user_info_btn_tip () {
      //   if (this.userName) {
      //     return '欢迎，' + this.userName
      //   } else {
      //     return '登录/注册'
      //   }
      // }
      // bindQRCode: function () {
      //   new QRCode(this.$refs.qrCodeDiv, {
      //     text: this.ca_url,
      //     width: 200,
      //     height: 200,
      //     colorDark: "#333333", //二维码颜色
      //     colorLight: "#ffffff", //二维码背景色
      //     correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      //   })
      // },
      // download_ca(){
      //   window.location.href=this.ca_url
      // }
    },
    mounted(){
      this.$nextTick(this.bindQRCode)
    }
  }
</script>
