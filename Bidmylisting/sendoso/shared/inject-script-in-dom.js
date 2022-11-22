class InjectScriptInDom {
  static inject(scriptPath) {
    let script = document.createElement('script');
    script.src = chrome.extension.getURL(scriptPath);
    (document.head || document.documentElement).appendChild(script);
    script.onload = function () {
      script.remove();
    };
  }
}
