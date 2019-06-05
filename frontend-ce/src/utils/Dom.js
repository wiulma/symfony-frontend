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

  bind(str, data) {
    const fn = new Function(`with(this) { return \`${str}\`; }`);
    return fn.call(data);
  },

  bindData(html, data) {
    return  this.htmlToElement(
      html.replace(/${\s?(\w+)\s?\}/g, (match, variable) => {
        return data[variable] || ''
      })
    );
  }
  
}