var stringToTemplate = (function(){
  var cache = {};

  function generateTemplate(template){
      var fn = cache[template];

      if (!fn){
          // Replace ${expressions} (etc) with ${map.expressions}.

          var sanitized = template
              .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                  return `\$\{map.${match.trim()}\}`;
                  })
              // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
              .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

          fn = Function('map', `return \`${sanitized}\``);
      }

      return fn;
  }

  return generateTemplate;
})();

export default {

  generateTemplateString(template) {
    return stringToTemplate(template);
  },
  
  /**
   * Create HTML element from html string
   * @param {string} html
   * @return Html Element
   */
  htmlToElement(html) {
    const template = document.createElement('template')
    template.innerHTML = html;
    return template.content.firstChild;
  },



  bindData(html, data) {
    return  this.htmlToElement(
      html.replace(/${\s?(\w+)\s?\}/g, (match, variable) => {
        return data[variable] || ''
      })
    );
  }
  
}