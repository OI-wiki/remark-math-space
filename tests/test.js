'use strict';
import test from 'ava';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkMathSpace from '../index.js';
// import remarkDetails from 'remark-details';
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide';
import remarkCopywritingCorrect from 'remark-copywriting-correct';

import fs from 'fs';

for (let i = 1; i <= 2; i++) {
  const in_md = fs.readFileSync(`tests/${i}.in.md`);
  const out_md = fs.readFileSync(`tests/${i}.out.md`);

  test(`TestCase ${i}`, (t) => {
    remark()
      .use(remarkPresetLintMarkdownStyleGuide)
      .use(remarkMath)
      //.use(remarkDetails)
      .use(remarkCopywritingCorrect)
      .use(remarkMathSpace)
      .process(in_md, function (err, res) {
        t.is(String(res), String(out_md));

        if (String(res) !== String(out_md)) {
          console.log(String(res));
        }
      });
  });
}
