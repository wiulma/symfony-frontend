export default {

  formDataToJson(formData) {
    var obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}