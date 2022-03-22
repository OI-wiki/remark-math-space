import { visit } from 'unist-util-visit';

function is_cn_en(char) {
  if (typeof char === 'undefined') {
    return false;
  }
  let cn =
    /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
  let en = /[0-9A-Za-z]/;
  return cn.test(char) || en.test(char);
}

function toString(node) {
  return (
    node.value ||
    node.alt ||
    node.title ||
    node.url ||
    ('children' in node && all(node.children)) ||
    ('length' in node && all(node)) ||
    ''
  );
}

function all(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString(values[index]);
  }

  return result.join('');
}

function isSpace(node) {
  const s = toString(node);
  return s == ' ' || s == '';
}

function gap() {
  function visitor(node, index, parent) {
    let prevNode, nextNode;
    const nothing = '';

    // get prev none space node
    let cur = index - 1;
    while (cur >= 0 && isSpace(parent.children[cur])) cur -= 1;
    if (cur == -1) {
      prevNode = nothing;
    } else {
      prevNode = toString(parent.children[cur]);
    }
    // get next none space node
    cur = index + 1;
    let len = parent.children.length;
    while (cur < len && isSpace(parent.children[cur])) cur += 1;
    if (cur == len) {
      nextNode = nothing;
    } else {
      nextNode = toString(parent.children[cur]);
    }

    let offset = 0;
    if (is_cn_en(prevNode[prevNode.length - 1])) {
      parent.children.splice(index, 0, { type: 'text', value: ' ' }); // insert space before this node
      offset = 1;
    }
    if (is_cn_en(nextNode[0])) {
      parent.children.splice(index + 1 + offset, 0, {
        type: 'text',
        value: ' ',
      }); // insert space after current node
      offset += 1;
    }
    return [visit.SKIP, index + 1 + offset];
  }

  return function (tree) {
    visit(tree, 'inlineCode', visitor);
    visit(tree, 'inlineMath', visitor);
    visit(tree, 'strong', visitor);
    visit(tree, 'emphasis', visitor);
    visit(tree, 'link', visitor);
  };
}

export default gap;
