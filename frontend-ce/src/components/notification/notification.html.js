export default (m) => {
  return `<div class="notification alert alert-${m.style} alert-dismissible fade show" role="alert">
    <h4>${m.title}</h4>
    <p>${m.message || ""}</p>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
}