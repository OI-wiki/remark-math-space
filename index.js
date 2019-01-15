module.exports = gap;

function gap() {
  var Compiler = this.Compiler;
  var visitors = Compiler.prototype.visitors;
  var original = visitors.inlineMath;

  visitors.inlineMath = inlineMath;

  function inlineMath(node) {
    return " " + original.apply(this, arguments) + " ";
  }
}
