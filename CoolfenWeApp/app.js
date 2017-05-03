//app.js
const message = require('/utils/message.js');
const auth = require('/requestapi/auth.js');
const store = require('/utils/holdnoEventListener.js');
const waitingImgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAY1BMVEXMzMxmZmZsbGxvb2+mpqbDw8OSkpKpqanKysq/v7+Pj49paWm4uLiJiYmzs7OWlpa7u7t/f393d3efn590dHSwsLCbm5uDg4N7e3txcXHHx8erq6uioqKGhobBwcFubm7FxcWDkGx9AAAB80lEQVR42u3W246qMACF4bU4WeSMqHie93/KPUiUzMgeDW3v1nfDBWnzh7akEBERERERERERERERERERERERERERX6J9jYc1Q8wL/vumKU4YVWQN59KA4dEiMCXXGO2ZGbhmerKEReBmGn9jA+cKcgObwIbh9C0TuJaQyf3xW/BhYExWGJ3IlYe+AlaBG7JGylcl7JmCvBjAZolbNvAVmPZkYWAVmJPnaQtWcCof99+2sTjFazLC6EyWcKsa5jbdh//BHxrcxdkUeGFg4MGOPGFpYMJnoMlYwIN8mDfgjPz9En9l98CCc3ZwwbQ8HBcHVsx8ByZkhPfmA9OM1XN8yAbuRSRXry3JZ4EXttdHYElu4FyZ2QRuyTImI39XrTxgbxWY4BnYsoNr9Y1dfA88cMbm7RKvzRSY8acK9k48pLAI/OY3EEUKWCzxFPhLGfCWw4kpcFc4C9xmDGs4DozIxCYw7s8Go1XGQw3XgbiQO4vAguwiDM4ctrb7wGNPnpYHflUZ2W6BDdml8BCI642dsdiD8ZrkPiHbK7wEotzHGBguPCT1nt/aGD4CJ8fqcYvP+af89RRvOzKM/AWuOQquCwNhdhnZ1L4CIw7CS47PTIGTdE+2xk/gZHngt1WfQkRERERERERERERERERERERERERkzj+L4hI/l71ydgAAAABJRU5ErkJggg==';

if(!Object.assign) {
    Object.assign = require('/utils/object-assign');
}
App({
    onLaunch: function () {
        
    },
    onShow: function () {

    },
    onError: function (err) {
        message.error.show({title: '系统错误', content: JSON.stringify(err)});
    },
    store: store,
    message:message,
    auth:auth,
    waitingImgBase64:waitingImgBase64
});