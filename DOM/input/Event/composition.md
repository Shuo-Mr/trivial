# composition

input Event 事件
文本合成系统如 input method editor（即输入法编辑器）的各种事件

## compositionstart

文本合成系统如 input method editor（即输入法编辑器）开始新的输入合成时会触发 compositionstart 事件。

场景: 用户使用拼音输入法输入汉字时,这个事件将被触发

实例:

    const inputElement = document.querySelector('input[type="text"]');

    // 监听 event: {data, type}
    inputElement.addEventListener('compositionstart', (event) => {
        console.log(`generated characters were: ${event.data}`);
    });

---

## compositionstend

当文本段落的组成完成或取消时, compositionend 事件将被触发 (具有特殊字符的触发, 需要一系列键和其他输入, 如语音识别或移动中的字词建议)。

---

## compositionupdate

事件触发于字符被输入到一段文字的时候.

    function handleEvent(event) {
        console.log('type', event.type, 'data', event.data)
    }

    inputElement.addEventListener('compositionstart', handleEvent);
    inputElement.addEventListener('compositionupdate', handleEvent);
    inputElement.addEventListener('compositionend', handleEvent);


    // 输入中文“我” 
    iuput:
    w
    我

    // log
    compositionstart, 
    compositionupdate, w
    compositionupdate, 我
    compositionend: 我
