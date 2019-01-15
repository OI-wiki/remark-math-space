module.exports = gap;

function gap() {
  var Compiler = this.Compiler;
  var visitors = Compiler.prototype.visitors;
  var original = visitors.inlineMath;
  var originalInlineCode = visitors.inlineCode;

  visitors.inlineCode = inlineCode;
  visitors.inlineMath = inlineMath;

  function inlineMath(node) {
    return " " + original.apply(this, arguments) + " ";
  }
  function inlineCode(node) {
    return " " + originalInlineCode.apply(this, arguments) + " ";
  }
}
