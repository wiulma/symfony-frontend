import './Loader';

export default {

  show(idNode) {
    console.log("show loader");
    const n = document.createElement("app-loader");
    document.body.appendChild(n);
  },

  hide(idNode) {
    console.log("hide loader");
    const l = document.querySelector("app-loader");
    document.body.removeChild(l);
  }
}
