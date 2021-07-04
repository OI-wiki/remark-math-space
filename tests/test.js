'use strict';
import test from 'ava';
import remark from 'remark';
import math from 'remark-math';
import sp from '../index.js';
import de from 'remark-details';
import preset from 'remark-preset-lint-markdown-style-guide';
import space from 'remark-copywriting-correct';

import fs from 'fs';

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
