Page({
  data: {
    inputValue: '',
    activationCode: '',
    showResult: false,
    errorMessage: ''
  },

  handleInput(e) {
    const value = e.detail.value;
    this.setData({
      inputValue: value,
      errorMessage: ''
    });

    if (value === 'cxycsx') {
      this.setData({
        showResult: true,
        activationCode: '123',
        errorMessage: ''
      });
    } else if (value) {
      this.setData({
        showResult: false,
        errorMessage: '密钥错误，请重新输入'
      });
    }
  },

  handleCopy() {
    wx.setClipboardData({
      data: this.data.activationCode,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
}); 