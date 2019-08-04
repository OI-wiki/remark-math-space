module.exports = gap;

function gap() {
  var Compiler = this.Compiler;
  var visitors = Compiler.prototype.visitors;
  var original = visitors.inlineMath;
  var originalInlineCode = visitors.inlineCode;
  var originalStrong = visitors.strong;
  var originalLink = visitors.link;

  visitors.inlineCode = inlineCode;
  visitors.strong = strong;
  visitors.inlineMath = inlineMath;
  visitors.link = link;

  function inlineMath(node) {
    return " " + original.apply(this, arguments) + " ";
  }
  function inlineCode(node) {
    return " " + originalInlineCode.apply(this, arguments) + " ";
  }
  function strong(node) {
    return " " + originalStrong.apply(this, arguments) + " ";
  }
  function link(node) {
    return " " + originalLink.apply(this, arguments) + " ";
  }
}
