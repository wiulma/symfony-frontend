import i18next from 'i18next';

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
  },

  cleanFormValidation(form) {
    form.classList.remove('was-validated');
    form.querySelectorAll('.invalid-feedback')
      .forEach(function(elm) {
        elm.innerText = '';
      });
  },

  showInvalidFormMessage(form) {
    var errorElements = document.querySelectorAll(
      "input.form-control:invalid");
    errorElements.forEach(function(element) {
      element.parentNode.childNodes.forEach(function(node) {
        if (node.className == 'invalid-feedback') {
          for (let k in element.validity) {
            if (k && element.validity[k] === true){
              const n = document.getElementById('validity-'+element.id);
              if(n) {
                const s = (k === 'customError' && n.dataset.customMessage) ? 
                form.dataset.validator+".validation."+n.dataset.customMessage :
                  form.dataset.validator+".validation."+element.id+'-'+k;
                n.innerText = i18next.t([s, 'common.validation.value-invalid']);
              }
              break;
            }
          }
        }
      });
    });
  }
  
}