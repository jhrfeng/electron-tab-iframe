const tabGroup = document.querySelector("tab-group");

tabGroup.on("ready", () => console.info("TabGroup is ready"));

tabGroup.setDefaultTab({
  title: "",
  src: "https://www.mymind365.com/doc/manage/list",
  active: false,
  ready: () => console.info("New Tab is ready")
});

tabGroup.addTab({
  title: "主页",
  src: "https://www.mymind365.com/doc/manage/list",
  iconURL: "mark-github.svg",
  closable: false,
  active: true,
  webviewAttributes:{
    allowpopups: true,
    nodeintegration: true
  },
  ready: function(tab) {
    
  }
});
