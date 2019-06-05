export default (m) => {
  return `<div class="notification alert alert-${m.style} alert-dismissible fade show" role="alert">
    <strong>${m.message}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
}