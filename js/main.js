var content = `
/* 
 * 面试官你好，我叫陈宇
 * 我用代码来做个自我介绍
 * 首先准备一些样式
 */
 
*{
    transition: all 1s;
}

body{
    background:#eee;
}

#code{
    border:1px solid red;
    padding:16px;
    font-size: 14px;
}

/* 给代码加个高亮 */

.token.selector{ 
    color: #690; 
}

.token.property{ 
    color: #905; 
}

/* 加点 3D 效果 */

#code{
    transform: rotate(360deg);
}

/* 加一个呼吸效果 */

#code{
  animation: breath 1s infinite alternate-reverse;
}

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; 
  height: 100%;
  position: fixed;
  left: 0;  
}

#paper > .content {
  display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`;

var contentPaper = `
/* 
 * 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
    `;
var md = `
# 自我介绍
我叫 陈宇

1995 年 6 月出生

是个可爱的男孩子~

于2017年6月毕业于重庆邮电大学移通学院电子信息科学与技术专业

应聘前端开发工程师 地区南京

# 项目介绍
1. <a href="http://resume.mydearest.cn" target="_blank">个人网页简历</a>
2. <a href="https://mydearest.cn" target="_blank">个人博客</a>
3. <a href="http://dir.mydearest.cn/motion/#/home?_k=4c4809" target="_blank">antd 中后台管理系统</a>
4. <a href="http://dir.mydearest.cn/thinkcmf/" target="_blank">thinkcmf 渝商官网</a>

# 代码 & 博客
<a href="https://github.com/cosyer" target="_blank">GitHub</a>

<a href="https://mydearest.cn" target="_blank">博客</a>

# 联系方式
QQ:    535509852

Email: chenyu@mydearest.cn

手机:    188-8326-9663


#### 如果你喜欢这样的简历，欢迎 <a href="https://github.com/cosyer/dynamicResume" target="_blank">star</a>
`;
var contentThanks = `
/*
 * 这就是我的动态简历
 * 谢谢观看
 */
`;
writeCode("", content, () => {
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCode(content, contentPaper, () => {
        convertMarkdownToHtml(() => {
          writeCode(content + contentPaper, contentThanks, () => {
            console.log("success");
          });
        });
      });
    });
  });
});

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code");
  let n = 0;
  let timerId = setInterval(() => {
    n++;
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css,
      "css"
    );
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollHeight;
    if (n >= code.length) {
      clearInterval(timerId);
      fn().call();
    }
  }, 30);
}

function createPaper(fn) {
  var paper = document.createElement("div");
  paper.id = "paper";
  var content = document.createElement("pre");
  content.className = "content";
  paper.appendChild(content);
  document.body.appendChild(paper);
  fn.call();
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector("#paper>.content");
  let n = 0;
  let timerId = setInterval(() => {
    n++;
    if (markdown[n] === "<") {
      for (n; markdown[n] !== ">"; n++) {}
    }
    domPaper.innerHTML = markdown.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight;
    if (n >= markdown.length) {
      clearInterval(timerId);
      fn().call();
    }
  }, 25);
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement("div");
  div.className = "html markdown-body";
  div.innerHTML = marked(md);
  let markdownContainer = document.querySelector("#paper > .content");
  markdownContainer.replaceWith(div);
  fn.call();
}
