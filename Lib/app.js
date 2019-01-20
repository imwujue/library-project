//app.js

var bookSort = [
  
  { sid: 'A1', tt: 'A1 马克思、恩格斯著作' },
  { sid: 'A2', tt: 'A2 列宁著作' },
  { sid: 'A3', tt: 'A3 斯大林著作' },
  { sid: 'A4', tt: 'A4 毛泽东著作' },
  { sid: 'A5', tt: 'A5 邓小平著作' },
  { sid: 'A6', tt: 'A6 马克思、恩格斯、列宁、斯大林、毛泽东、邓小平著作汇编' },
  { sid: 'A7', tt: 'A7 马克思、恩格斯、列宁、斯大林、毛泽东、邓小平生平和传记' },
  { sid: 'A8', tt: 'A8 马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究' },
  { sid: 'B1', tt: 'B1 世界哲学' },
  { sid: 'B2', tt: 'B2 中国哲学' },
  { sid: 'B3', tt: 'B3 亚洲哲学' },
  { sid: 'B4', tt: 'B4 非洲哲学' },
  { sid: 'B5', tt: 'B5 欧洲哲学' },
  { sid: 'B6', tt: 'B6 大洋州哲学' },
  { sid: 'B7', tt: 'B7 美洲哲学' },
  { sid: 'B80', tt: 'B80 思维科学' },
  { sid: 'B81', tt: 'B81 逻辑学(论理学)' },
  { sid: 'B82', tt: 'B82 伦理学(道德哲学)' },
  { sid: 'B83', tt: 'B83 美学' },
  { sid: 'B84', tt: 'B84 心理学' },
  { sid: 'B9', tt: 'B9 宗教' },
  { sid: 'C0', tt: 'C0 社会科学理论与方法论' },
  { sid: 'C1', tt: 'C1 社会科学概况、现状、进展' },
  { sid: 'C2', tt: 'C2 社会科学机构、团体、会议' },
  { sid: 'C3', tt: 'C3 社会科学研究方法' },
  { sid: 'C4', tt: 'C4 社会科学教育与普及' },
  { sid: 'C5', tt: 'C5 社会科学丛书、文集、连续性出版物' },
  { sid: 'C6', tt: 'C6 社会科学参考工具书' },
  { sid: 'C7', tt: 'C7 社会科学文献检索工具书' },
  { sid: 'C79', tt: 'C79 非书资料、视听资料' },
  { sid: 'C8', tt: 'C8 统计学' },
  { sid: 'C91', tt: 'C91 社会学' },
  { sid: 'C92', tt: 'C92 人口学' },
  { sid: 'C93', tt: 'C93 管理学' },
  { sid: 'C94', tt: 'C94 系统科学' },
  { sid: 'C95', tt: 'C95 民族学、文化人类学' },
  { sid: 'C96', tt: 'C96 人才学' },
  { sid: 'C97', tt: 'C97 劳动科学' },
  { sid: 'D0', tt: 'D0 政治学、政治理论' },
  { sid: 'D1', tt: 'D1 国际共产主义运动' },
  { sid: 'D2', tt: 'D2 中国共产党' },
  { sid: 'D33/37', tt: 'D33/37 各国共产党' },
  { sid: 'D4', tt: 'D4 工人、农民、青年、妇女运动与组织' },
  { sid: 'D5', tt: 'D5 世界政治' },
  { sid: 'D6', tt: 'D6 中国政治' },
  { sid: 'D73/77', tt: 'D73/77 各国政治' },
  { sid: 'D8', tt: 'D8 外交、国际关系' },
  { sid: 'D9', tt: 'D9 法律' },
  { sid: 'E0', tt: 'E0 军事理论' },
  { sid: 'E1', tt: 'E1 世界军事' },
  { sid: 'E2', tt: 'E2 中国军事' },
  { sid: 'E3/7', tt: 'E3/7 各国军事' },
  { sid: 'E8', tt: 'E8 战略学、战役学、战术学' },
  { sid: 'E9', tt: 'E9 军事技术' },
  { sid: 'E99', tt: 'E99 军事地形学、军事地理学' },
  { sid: 'F0', tt: 'F0 经济学' },
  { sid: 'F1', tt: 'F1 世界各国经济概况、经济史、经济地理' },
  { sid: 'F2', tt: 'F2 经济管理' },
  { sid: 'F3', tt: 'F3 农业经济' },
  { sid: 'F4', tt: 'F4 工业经济' },
  { sid: 'F49', tt: 'F49 信息产业经济' },
  { sid: 'F5', tt: 'F5 交通运输经济' },
  { sid: 'F59', tt: 'F59 旅游经济' },
  { sid: 'F6', tt: 'F6 邮电通信经济' },
  { sid: 'F7', tt: 'F7 贸易经济' },
  { sid: 'F8', tt: 'F8 财政、金融' },
  { sid: 'G0', tt: 'G0 文化理论' },
  { sid: 'G1', tt: 'G1 世界各国文化与文化事业' },
  { sid: 'G2', tt: 'G2 信息与知识传播' },
  { sid: 'G3', tt: 'G3 科学、科学研究' },
  { sid: 'G4', tt: 'G4 教育' },
  { sid: 'G8', tt: 'G8 体育' },
  { sid: 'H0', tt: 'H0 语言学 ' },
  { sid: 'H1', tt: 'H1 汉语' },
  { sid: 'H2', tt: 'H2 中国少数民族语言' },
  { sid: 'H3', tt: 'H3 常用外国语' },
  { sid: 'H4', tt: 'H4 汉藏语系' },
  { sid: 'H5', tt: 'H5 阿尔泰语系' },
  { sid: 'H61', tt: 'H61 南亚语系（澳斯特罗' },
  { sid: 'H62', tt: 'H62 南印语系（达罗毗荼语系、德拉维达语系）' },
  { sid: 'H63', tt: 'H63 南岛语系（马来亚' },
  { sid: 'H64', tt: 'H64 东北亚诸语言' },
  { sid: 'H65', tt: 'H65 高加索语系（伊比利亚' },
  { sid: 'H66', tt: 'H66 乌拉尔语系（芬兰)' },
  { sid: 'H67', tt: 'H67 闪-含语系（阿非罗-亚细亚语系）' },
  { sid: 'H7', tt: 'H7 印欧语系' },
  { sid: 'H81', tt: 'H81 非洲诸语言' },
  { sid: 'H83', tt: 'H83 美洲诸语言' },
  { sid: 'H84', tt: 'H84 大洋州诸语言' },
  { sid: 'H9', tt: 'H9 国际辅助语' },
  { sid: 'I0', tt: 'I0 文学理论' },
  { sid: 'I1', tt: 'I1 世界文学' },
  { sid: 'I2', tt: 'I2 中国文学' },
  { sid: 'I3/7', tt: 'I3/7 各国文学' },
  { sid: 'J0', tt: 'J0 艺术理论' },
  { sid: 'J1', tt: 'J1 世界各国艺术概况' },
  { sid: 'J19', tt: 'J19 专题艺术与现代边缘艺术' },
  { sid: 'J2', tt: 'J2 绘画' },
  { sid: 'J29', tt: 'J29 书法、篆刻' },
  { sid: 'J3', tt: 'J3 雕塑' },
  { sid: 'J4', tt: 'J4 摄影艺术' },
  { sid: 'J5', tt: 'J5 工艺美术' },
  { sid: 'J59', tt: 'J59 建筑艺术' },
  { sid: 'J6', tt: 'J6 音乐' },
  { sid: 'J7', tt: 'J7 舞蹈' },
  { sid: 'J8', tt: 'J8 戏剧、曲艺、杂技艺术' },
  { sid: 'J9', tt: 'J9 电影、电视艺术' },
  { sid: 'K0', tt: 'K0 史学理论' },
  { sid: 'K1', tt: 'K1 世界史' },
  { sid: 'K2', tt: 'K2 中国史' },
  { sid: 'K3', tt: 'K3 亚洲史' },
  { sid: 'K4', tt: 'K4 非洲史' },
  { sid: 'K5', tt: 'K5 欧洲史' },
  { sid: 'K6', tt: 'K6 大洋州史' },
  { sid: 'K7', tt: 'K7 美洲史' },
  { sid: 'K81', tt: 'K81 传记' },
  { sid: 'K85', tt: 'K85 文物考古' },
  { sid: 'K89', tt: 'K89 风俗习惯' },
  { sid: 'N0', tt: 'N0 自然科学理论与方法论' },
  { sid: 'N1', tt: 'N1 自然科学概况、现状、进展' },
  { sid: 'N2', tt: 'N2 自然科学机构、团体、会议' },
  { sid: 'N3', tt: 'N3 自然科学研究方法' },
  { sid: 'N4', tt: 'N4 自然科学教育与普及' },
  { sid: 'N5', tt: 'N5 自然科学丛书、文集、连续性出版物' },
  { sid: 'N6', tt: 'N6 自然科学参考工具书' },
  { sid: '[N7]', tt: '[N7] 自然科学文献检索工具' },
  { sid: 'N79', tt: 'N79 非书资料、视听资料' },
  { sid: 'N8', tt: 'N8 自然科学调查、考察' },
  { sid: 'N91', tt: 'N91 自然研究、自然历史' },
  { sid: 'N93', tt: 'N93 非线性科学' },
  { sid: 'N94', tt: 'N94 系统科学' },
  { sid: '[N99]', tt: '[N99] 情报学、情报工作' },
  { sid: 'O1', tt: '01 数学' },
  { sid: 'O3', tt: 'O3 力学' },
  { sid: 'O4', tt: 'O4 物理学' },
  { sid: 'O6', tt: 'O6 化学' },
  { sid: 'O7', tt: 'O7 晶体学' },
  { sid: 'P1', tt: 'P1 天文学' },
  { sid: 'P2', tt: 'P2 测绘学' },
  { sid: 'P3', tt: 'P3 地球物理学' },
  { sid: 'P4', tt: 'P4 大气科学（气象学）' },
  { sid: 'P5', tt: 'P5 地质学' },
  { sid: 'P7', tt: 'P7 海洋学' },
  { sid: 'P9', tt: 'P9 自然地理学' },
  { sid: 'Q1', tt: 'Q1 普通生物学' },
  { sid: 'Q2', tt: 'Q2 细胞生物学' },
  { sid: 'Q3', tt: 'Q3 遗传学' },
  { sid: 'Q4', tt: 'Q4 生理学' },
  { sid: 'Q5', tt: 'Q5 生物化学' },
  { sid: 'Q6', tt: 'Q6 生物物理学' },
  { sid: 'Q7', tt: 'Q7 分子生物学' },
  { sid: 'Q81', tt: 'Q81 生物工程学（生物技术）' },
  { sid: 'Q89', tt: 'Q89 环境生物学' },
  { sid: 'Q91', tt: 'Q91 古生物学' },
  { sid: 'Q93', tt: 'Q93 微生物学' },
  { sid: 'Q94', tt: 'Q94 植物学' },
  { sid: 'Q95', tt: 'Q95 动物学' },
  { sid: 'Q96', tt: 'Q96 昆虫学' },
  { sid: 'Q98', tt: 'Q98 人类学' },
  { sid: 'R1', tt: 'R1 预防医学、卫生学' },
  { sid: 'R2', tt: 'R2 中国医学' },
  { sid: 'R3', tt: 'R3 基础医学' },
  { sid: 'R4', tt: 'R4 临床医学' },
  { sid: 'R5', tt: 'R5 内科学' },
  { sid: 'R6', tt: 'R6 外科学' },
  { sid: 'R71', tt: 'R71 妇产科学' },
  { sid: 'R72', tt: 'R72 儿科学' },
  { sid: 'R73', tt: 'R73 肿瘤学' },
  { sid: 'R74', tt: 'R74 神经病学与精神病学' },
  { sid: 'R75', tt: 'R75 皮肤病学与性病学' },
  { sid: 'R76', tt: 'R76 耳鼻咽喉科学' },
  { sid: 'R77', tt: 'R77 眼科学' },
  { sid: 'R78', tt: 'R78 口腔科学' },
  { sid: 'R79', tt: 'R79 外国民族医学' },
  { sid: 'R8', tt: 'R8 特种医学' },
  { sid: 'R9', tt: 'R9 药学' },
  { sid: 'S1', tt: 'S1 农业基础科学' },
  { sid: 'S2', tt: 'S2 农业工程' },
  { sid: 'S3', tt: 'S3 农学（农艺学）' },
  { sid: 'S4', tt: 'S4 植物保护' },
  { sid: 'S5', tt: 'S5 农作物' },
  { sid: 'S6', tt: 'S6 园艺' },
  { sid: 'S7', tt: 'S7 林业' },
  { sid: 'S8', tt: 'S8 畜牧、动物医学、狩猎、蚕、蜂' },
  { sid: 'S9', tt: 'S9 水产、渔业' },
  { sid: 'TB', tt: 'TB 一般工业技术' },
  { sid: 'TD', tt: 'TD 矿业工程' },
  { sid: 'TE', tt: 'TE 石油、天然气工业' },
  { sid: 'TF', tt: 'TF 冶金工业' },
  { sid: 'TG', tt: 'TG 金属学与金属工艺' },
  { sid: 'TH', tt: 'TH 机械、仪表工业' },
  { sid: 'TJ', tt: 'TJ 武器工业' },
  { sid: 'TK', tt: 'TK 能源与动力工程' },
  { sid: 'TL', tt: 'TL 原子能技术' },
  { sid: 'TM', tt: 'TM 电工技术' },
  { sid: 'TN', tt: 'TN 电子技术、通信技术' },
  { sid: 'TP', tt: 'TP 自动化技术、计算机技术' },
  { sid: 'TQ', tt: 'TQ 化学工业' },
  { sid: 'TS', tt: 'TS 轻工业、手工业、生活服务业' },
  { sid: 'TU', tt: 'TU 建筑科学' },
  { sid: 'TV', tt: 'TV 水利工程' },
  { sid: 'U1', tt: 'U1 综合运输' },
  { sid: 'U2', tt: 'U2 铁路运输' },
  { sid: 'U4', tt: 'U4 公路运输' },
  { sid: 'U6', tt: 'U6 水路运输' },
  { sid: '[U8]', tt: '[U8] 航空运输' },
  { sid: 'V1', tt: 'V1 航空、航天技术的研究与探索' },
  { sid: 'V2', tt: 'V2 航空' },
  { sid: 'V4', tt: 'V4 航天（宇宙航行）' },
  { sid: '[V7]', tt: '[V7] 航空、航天医学' },
  { sid: 'X1', tt: 'X1 环境科学基础理论' },
  { sid: 'X2', tt: 'X2 社会与环境' },
  { sid: 'X3', tt: 'X3 环境保护管理' },
  { sid: 'X4', tt: 'X4 灾害及其防治' },
  { sid: 'X5', tt: 'X5 环境污染及其防治' },
  { sid: 'X7', tt: 'X7 行业污染、废物处理与综合利用' },
  { sid: 'X8', tt: 'X8 环境质量评价与环境监测' },
  { sid: 'X9', tt: 'X9 安全科学' },
  ];

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据

    //初始化是否开启推荐的数据
    this.globalData.open_recommendation = wx.getStorageSync('open_recommendation');
    this.globalData.selected_frequence = wx.getStorageSync('selected_frequence');

    if (this.globalData.open_recommendation.length == 0) {
      wx.setStorageSync('open_recommendation', true);
    }
    if (this.globalData.selected_frequence.length == 0) {
      wx.setStorageSync('selected_frequence', "1");
    }
    this.globalData.open_recommendation = wx.getStorageSync('open_recommendation');
    this.globalData.selected_frequence = wx.getStorageSync('selected_frequence');

    // 调用微信登录，建立第三方session
    wx.login({
      success: function (res) {
        console.log(res);

        if (res.errMsg == 'login:ok') {
          // 如果登录成功，发送到服务器换取session key
          wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/login/create_session',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              // 将结果写入到微信本地保存
              if (res.data.state == 'success') {
                wx.setStorageSync('sessionID', res.data.sessionID);
                wx.setStorageSync('openID', res.data.openID);
              } else {
                wx.clearStorageSync('sessionID');
              }
            },
            failed: function () {
              wx.clearStorageSync('sessionID');
            }
          })
        }
      },
      fail: function () {
        wx.clearStorageSync('sessionID');
        console.log('log in failed')
      }
    })
  },





  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     // wx.login({
  //     //   success: function () {
  //     //     wx.getUserInfo({
  //     //       success: function (res) {
  //     //         that.globalData.userInfo = res.userInfo
  //     //          typeof cb == "function" && cb(that.globalData.userInfo)
  //     //       }
  //     //     })
  //     //   }
  //     // })
  //     wx.navigateTo({
  //       url: 'pages/Login/LoginMain',
  //     })
  //   }
  // },
  bookSorts: function(sid){
    var tt ;
   for(var sort in bookSort){
     if (sid == bookSort[sort].sid){
       tt = bookSort[sort].tt;
     }
   }
    return tt;
  },

  globalData: {
    userInfo: null,
    open_recommendation: null,
    selected_frequence: null
  }
})

