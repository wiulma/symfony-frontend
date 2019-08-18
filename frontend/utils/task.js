module.exports = function() {
  return {
    iterObj(obj) {
      for (var key in obj) {
        if (obj[key] !== null && typeof obj[key] === "object") {
          obj[key] = this.iterObj(obj[key]);
        } else {
          obj[key] = JSON.stringify(obj[key])
        }
      }
      return obj;
    }
  }
}