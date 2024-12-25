Page({
  data: {
    inputValue: '',
    activationCode: '',
    activationCodePreview: '',
    showResult: false,
    errorMessage: '',
    updateTime: '',
    wechatId: 'wanzhuancode'
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
  },

  handleInput(e) {
    const value = e.detail.value;
    this.setData({
      inputValue: value,
      errorMessage: ''
    });

    // 判断输入的密钥
    if (value === 'cxycsx') {
      const fullCode = `YQLSN55KLT-eyJsaWNlbnNlSWQiOiJZUUxTTjU1S0xUIiwibGljZW5zZWVOYW1lIjoi5rC45LmF5Zyw5Z2AIHd3d8K3YWppaHVvwrdjb20iLCJsaWNlbnNlZVR5cGUiOiJQRVJTT05BTCIsImFzc2lnbmVlTmFtZSI6IiIsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiIiLCJjaGVja0NvbmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IkdPIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSUzAiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRNIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJDTCIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUlNVIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU0MiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRTIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSRCIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUUEiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJDIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU0YiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUk0iLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IklJIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJEUE4iLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRCIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJEQyIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUFMiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJSIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU1YiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiV1MiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlBTSSIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQQ1dNUCIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJBSUwiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJTIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IkRQIiwicGFpZFVwVG8iOiIyMDI1LTAxLTIyIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBEQiIsInBhaWRVcFRvIjoiMjAyNS0wMS0yMiIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQUlIiLCJwYWlkVXBUbyI6IjIwMjUtMDEtMjIiLCJleHRlbmRlZCI6dHJ1ZX1dLCJtZXRhZGF0YSI6IjAyMjAyNDEyMjRQUEFNMDAxMDA1QSIsImhhc2giOiI2NDU5MzE5Mi8wOjk2NTI2Nzc2MiIsImdyYWNlUGVyaW9kRGF5cyI6NywiYXV0b1Byb2xvbmdhdGVkIjpmYWxzZSwiaXNBdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJ0cmlhbCI6ZmFsc2UsImFpQWxsb3dlZCI6dHJ1ZX0=-gQwtjy894c0xbgG5zoG4OHjkERm+L3LJK2W3/GPujewdoYWCf187k9R6iNugDlJJwA2U/yh1DyqqFaijeknuLFVIIRetG7ZMV0TVgHXiO6jBfYIyr8DFqxjm+Oey9EuCPbuBeSMfDMNESMKgdDlZHqAXFEHdaI8cXn9zvbIALXj3FnMI5imwdQgnrnaXpvmmIKjgjrgfVFZ8y3pw5iOsfILg6umoalAxEQrq7azvnpuJNjrGo/rmhSZIC+RW5ipyaHGXO/WlYrLD9rGW5/OatPKbOuCuZtYP6XfUK7oSX3E5PmalMvtt/uyqa8t54CZAYyDr3ybKGbhYjTctrMJBIw==-MIIETDCCAjSgAwIBAgIBETANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTI0MDkyMDEyMTEyN1oXDTI2MDkyMjEyMTEyN1owHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyNDA5MjAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7SH/XcUoMwkDi8JJPzXWWHWFdOZdrP2Dqkz2W8iUi650cwz2vdPEd0tMzosLAj7ifkFEHUyiuEcL//q9d9Op7ZsV23lpPXX8tFMLFwugoQ9D8jDLT/XP9pp/YukWkKF5jpNbaCvsVQkDdYkArBkYvhH3aN4v9BkEsXahfgLLOPe4IG2FDJNf9R4to9V1vt+m2UVJB0zV4a/sVMKUZLgqKmKKKOKoLrE3OjBlZlb+Q0z2N5dsW0hDEVRFGmBUAbHN/mp44MMMvEIFKfoLIGpgic92P2O6uFh75PI7mcultL6yuR48ajErx8CjjQEGOSnoq/8hD+yVE+6GW2gJa2CPvAgMBAAGjgZkwgZYwCQYDVR0TBAIwADAdBgNVHQ4EFgQUb5NERj05GyNerQ/Mjm9XH8HXtLIwSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBaAwDQYJKoZIhvcNAQELBQADggIBALq6VfVUjmPI3N/w0RYoPGFYUieCfRO0zVvD1VYHDWsN3F9buVsdudhxEsUb8t7qZPkDKTOB6DB+apgt2ZdKwok8S0pwifwLfjHAhO3b+LUQaz/VmKQW8gTOS5kTVcpM0BY7UPF8cRBqxMsdUfm5ejYk93lBRPBAqntznDY+DNc9aXOldFiACyutB1/AIh7ikUYPbpEIPZirPdAahroVvfp2tr4BHgCrk9z0dVi0tk8AHE5t7Vk4OOaQRJzy3lST4Vv6Mc0+0z8lNa+Sc3SVL8CrRtnTAs7YpD4fpI5AFDtchNrgFalX+BZ9GLu4FDsshVI4neqV5Jd5zwWPnwRuKLxsCO/PB6wiBKzdapQBG+P9z74dQ0junol+tqxd7vUV/MFsR3VwVMTndyapIS+fMoe+ZR5g+y44R8C7fXyVE/geg+JXQKvRwS0C5UpnS5FcGk+61b0e4U7pwO20RlwhEFHLSaP61p2TaVGo/TQtT/fWmrtV+HegAv9P3X3Se+xIVtJzQsk8QrB/w52IB3FKiAKl/KRn1egbMIs4uoNAkqNZ9Ih2P1NpiQnONFmkiAgeynJ+0FPykKdJQbV3Mx44jkaHIif4aFReTsYX1WUBNu/QerZRjn4FVSHRaZPSR5Oi82Wz0Nj7IY9ocTpLnXFrqkb/Kt3S6B9s2Kol3Lr1ElYA`;
      this.showActivationCode(fullCode);
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