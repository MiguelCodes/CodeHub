function filter(content) {
  let result = content;
  while (/^\s/.test(result)) {
    result = result.replace(/^\s/g, "")
  }

  while (/`(.*?)`/.test(result)) {
    let index = /`(.*?)`/.exec(result).index;
    let lastindex = result.indexOf("`", index+1);
    result = result.substring(0, index) + "<code style='color:orange; background-color:gainsboro; border-radius:5px; padding:2px; opacity:0.9;'>" + result.substring(index+1, lastindex) + "</code>" + result.substring(lastindex+1);
  }

  if (result === "") {
    result = "<br>";
  }

  if (result.startsWith("# ")) {
    result = "<h1>"+result.substring(2)+"</h1>";
  } else if (result.startsWith("## ")) {
    result = "<h2>"+result.substring(3)+"</h2>";
  } else if (result.startsWith("### ")) {
    result = "<h3>"+result.substring(4)+"</h3>";
  } else if (result.startsWith("#### ")) {
    result = "<h4>"+result.substring(5)+"</h4>";
  } else if (result.startsWith("##### ")) {
    result = "<h5>"+result.substring(6)+"</h5>";
  } else if (result.startsWith("###### ")) {
    result = "<h6 style='color:gray; opacity:0.4;'>"+result.substring(7)+"</h6>";
  } 

  if (result.startsWith("- ")) {
    result = "<li>"+result.substring(2)+"</li>"
  } else if (/^[0-9]\.\s/.test(result)) {
    result = "<p style='margin-left:5px; margin-top:0px; margin-bottom:0px;'>"+result+"</p>";
  }

  if (result === "---") {
    result = "<hr style='border-top:2px solid gray; width:100%; border-radius:5px; opacity:0.5; margin:5px;'>"
  }

  return result
}

function replaceHTML(content) {
  content = content.split("\n");
  for (let i = 0; i < content.length; i++) {
    content[i] = filter(content[i]);
  }
  let result = "";
  for (i = 0; i < content.length; i++) {
    result += content[i];
  }
  return result
}

for (let i = 0; i < document.getElementsByClassName("markdown").length; i++) {
  document.getElementsByClassName("markdown")[i].innerHTML = replaceHTML(document.getElementsByClassName("markdown")[i].innerHTML);
}