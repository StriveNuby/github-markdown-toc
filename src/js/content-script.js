// 获取节点
var _$ = function(str) {
  return document.querySelector(str);
};

// 查询 h 标签级别
function queryLevel(h) {
  return parseInt(h.tagName.replace("H", ""), 10);
}

// 渲染节点
// h1 h2 h3 h3
function renderChild(tree, ol, isChildNode) {
  console.log(tree, ol, isChildNode);
  var len = tree.length,
    arr = [];
  if (len === 0) return false;
  if (isChildNode) {
    var newOl = document.createElement("ol");
    ol.appendChild(newOl);
    ol = newOl;
  }
  if (len === 1) {
    ol.appendChild(addLi(tree[0]));
    return false;
  }
  for (var i = 0; i < len; i++) {
    console.log("======");
    console.log(arr[0]);
    if (arr[0] === undefined) {
      arr.push(tree[i]); // h1
    } else {
      var oldLevel = (arr[0] && queryLevel(arr[0])) || 0,
        level = queryLevel(tree[i]);
      console.log(level, oldLevel);
      console.log(arr);
      if (level > oldLevel) {
        var node = null,
          len1 = arr.length;
        // 2 1
        for (var j = 0; j < len1; j++) {
          node = addLi(arr[j]);
          ol.appendChild(node);
        }
        renderChild(tree.splice(len1, tree.length), node, true);
        break;
      } else {
        arr.push(tree[i]);
      }
    }
    // if (arr.length > 0 && i === len - 1) {
    //   var node = null,
    //     len1 = arr.length;
    //   for (var j = 0; j < len1; j++) {
    //     node = addLi(arr[j]);
    //     ol.appendChild(node);
    //   }
    // }
  }
}

// 添加 li
function addLi(h) {
  var li = document.createElement("li"),
    aim = h.querySelector("a").getAttribute("href"),
    a = document.createElement("a"),
    text = h.textContent || "";
  a.setAttribute("href", aim);
  a.setAttribute("title", text);
  a.innerText = text;
  li.appendChild(a);
  return li;
}

// 初始化
function init(list) {
  // nav
  var nav = document.createElement("div");
  nav.classList.add("markdown-nav-main");
  // content
  var content = document.createElement("div");
  content.classList.add("content");
  // title
  var title = document.createElement("div");
  title.classList.add("title");
  var title_msg = document.createTextNode("目录: ");
  title.appendChild(title_msg);
  // toc
  var toc = document.createElement("div");
  toc.classList.add("toc");

  var ol = document.createElement("ol");
  var tree = [],
    len = list.length;
  for (var i = 0; i < len; i++) {
    var header = list[i];
    //   1 2 2 3 2
    var level = queryLevel(header);
    if (tree.length < 1) {
      tree.push(header);
    } else {
      var oldLevel = queryLevel(tree[0]);
      // 2 1
      if (oldLevel >= level) {
        renderChild(tree, ol);
        tree = [];
      }
      tree.push(header);
    }
    if (i === len - 1 && tree.length !== 0) {
      renderChild(tree, ol);
    }
  }
  toc.appendChild(ol);
  content.appendChild(title);
  content.appendChild(toc);
  nav.appendChild(content);
  return nav;
}

setTimeout(function() {
  var git_reg = /[https://github.com].*/,
    _readme = _$("article");
  // if (git_reg.test(document.URL) && _readme) {
  if (_readme) {
    var data = _readme.querySelectorAll("h1,h2,h3,h4,h5,h6");
    var div = init(data);
    document.body.appendChild(div);
  }
}, 700);
