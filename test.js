"use strict";
var remark = require("remark");
var parse = require("remark-parse");
var math = require("remark-math");
var sp = require("./index.js");
var de = require("remark-details");


var fs = require("fs");
var www = fs.readFileSync("test.md");

// const doc = "中文abc中文$a_i$中文";
remark()
  .use(parse)
  .use(math)
  .use(de)
  .use(sp)
  .process(www, function(err, res) {
    console.log('finished');
    console.log(String(res));
  });
