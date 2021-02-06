module.exports = gap;
var vfileLocation = require('vfile-location')
var visit = require('unist-util-visit')

function is_cn_en(char) {
  let cn = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/
  let en = /[0-9A-Za-z]/
  return cn.test(char) || en.test(char)
}

function gap() {
  function visitor(node, file) {
    console.log(node)
    node.value = ' ' + node.value + ' '
  }

  return function (tree, file) {
    visit(tree, 'inlineCode', visitor)
    visit(tree, 'inlineMath', visitor)
    visit(tree, 'strong', visitor)
    visit(tree, 'link', visitor)
  }
}
