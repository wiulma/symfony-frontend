export default {


  mask(idNode) {
    document.getElementById(idNode).classList.add("mask")
  },

  unmask(idNode) {
    document.getElementById(idNode).classList.remove("mask")
  }
}
