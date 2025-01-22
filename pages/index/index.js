Page({
  data: {
    inputValue: '',
    activationCode: '',
    activationCodePreview: '',
    showResult: false,
    errorMessage: '',
    updateTime: '',
    wechatId: 'wanzhuancode',
    config: null
  },

  onLoad: function() {
    // 获取当前时间并格式化，只显示年月日
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    this.setData({
      updateTime: `${year}-${month}-${day}`
    });

    // 获取配置文件
    this.fetchConfig();
  },

  // 获取配置文件
  fetchConfig() {
    wx.request({
      url: 'https://idea.cxycsx.vip/config.json',
      success: (res) => {
        if (res.data && res.data.key) {
          this.setData({
            config: res.data
          });
        }
      },
      fail: (err) => {
        console.error('获取配置失败:', err);
        wx.showToast({
          title: '配置获取失败',
          icon: 'none'
        });
      }
    });
  },

  handleInput(e) {
    const value = e.detail.value;
    this.setData({
      inputValue: value,
      errorMessage: ''
    });

    // 判断输入的密钥
    if (value === 'cxycsx') {
      if (this.data.config && this.data.config.key) {
        this.showActivationCode(this.data.config.key);
      } else {
        this.setData({
          showResult: false,
          errorMessage: '激活码未就绪，请稍后重试'
        });
      }
    } else if (value) {
      this.setData({
        showResult: false,
        errorMessage: '密钥错误，请重新输入'
      });
    }
  },

  showActivationCode(code) {
    this.setData({
      activationCode: code,
      activationCodePreview: code.substring(0, 100),
      showResult: true
    });
  },

  handleCopy() {
    wx.setClipboardData({
      data: this.data.activationCode,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  },

  handleCopyWechat() {
    wx.setClipboardData({
      data: this.data.wechatId,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        });
      }
    });
  },

  handleAddFriend() {
    wx.openCustomerServiceChat({
      extInfo: { url: 'weixin://findfriend/wanzhuancode' },
      corpId: '',  // 企业ID，个人号可不填
      success(res) {
        console.log('跳转成功');
      },
      fail(err) {
        // 如果跳转失败，提示复制微信号
        wx.setClipboardData({
          data: this.data.wechatId,
          success: () => {
            wx.showToast({
              title: '请手动添加好友',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    });
  }
}); 