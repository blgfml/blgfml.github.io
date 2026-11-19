// 引入 Node.js 专属的“文件系统”工具 (fs)
// 注意：浏览器里的 JavaScript 是没有这个工具的，因为浏览器不能随便在你的电脑上创建文件！
const fs = require('fs');

// 1. 你的“需求单”（模拟从 music.md 里读取的数据）
const songData = {
    title: "最美的印记",
    artist: "Shan"
};

// 2. 你的“半成品设计图”（模拟 music.ejs 模板）
// 这里的 ${songData.title} 就像是 EJS 里的 <%= page.song_title %>
const myTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <title>${songData.title}</title>
    </head>
    <body>
        <h1 class="song-title">${songData.title}</h1>
        <p>歌手: ${songData.artist}</p>
    </body>
</html>
`;

// 3. 加工厂开始运转：拼装数据，并直接在你的电脑硬盘上生成一个真实的 HTML 文件
console.log("Node.js 加工厂开始运转...");

fs.writeFileSync("music-page.html", myTemplate);

console.log("叮！专属网页蓝图 (music-page.html) 已经批量打印完毕！");