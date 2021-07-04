'use strict';
const test = require('ava');
const remark = require('remark');
const math = require('remark-math');
const sp = require('../index.js');
const de = require('remark-details');
const preset = require('remark-preset-lint-markdown-style-guide');
const space = require('remark-copywriting-correct');

const fs = require('fs');
const www = fs.readFileSync('tests/test.md');

// const doc = "中文abc中文$a_i$中文";

test('main', (t) => {
  remark()
    .use(preset)
    .use(math)
    .use(space)
    //.use(de)
    .use(sp)
    .process(www, function (err, res) {
      console.log('finished');
      console.log(String(res));
      fs.writeFileSync('tmp', String(res));
    });
  t.pass();
});
