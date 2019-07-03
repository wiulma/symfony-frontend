export default (user) => {
    return `<div class="modal fade" id="userDetailModal" tabindex="-1" role="dialog" aria-labelledby="userDetailModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" data-i18n="${user.id ? 'user.detailTitle' : 'user.createTitle'}"
            data-i18n-options="${user.id ? '{"fullname": '+user.fullname+'}' : ''}"></h5>
        </div>
        <div class="modal-body">
          <form id="userDetailForm" novalidate>
          <div class="form-group">
              <div class="floating-label floating-label-lg">
                <label for="username" data-i18n="user.name"></label>
                <input type="text" id="name" name="name" required class="form-control" autofocus value="${user.name || ''}">
                <div class="invalid-feedback" data-i18n="user.validation.name"></div>
              </div>
          </div>
          <div class="form-group">
              <div class="floating-label floating-label-lg">
                <label for="username" data-i18n="user.surname"></label>
                <input type="text" id="surname" name="surname" required class="form-control" value="${user.surname || ''}">
                <div class="invalid-feedback" data-i18n="user.validation.surname"></div>
              </div>
          </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal" data-i18n="common.cancel"></button>
          <button type="button" class="btn btn-primary btn-save" data-i18n="common.save"></button>
        </div>
      </div>
    </div>
  </div>`
}