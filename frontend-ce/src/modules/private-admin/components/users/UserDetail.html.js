function getSecurityPanel(user) {
  if (user.id) {
    return `<fieldset><legend data-i18n="user.security"></legend>
        <div className="form-group">
          <div class="floating-label">
            <label htmlFor="role" data-i18n="user.role"></label>
            <select class="form-control" id="role" name="role">
                <option value="A" data-i18n="user.roles.admin" ${user.role === 'A' ? 'selected' : ''}></option>
                <option value="U" data-i18n="user.roles.user" ${user.role === 'U' ? 'selected' : ''}></option>
            </select>
          </div>
        </div>
    </fieldset>`;
  } else {
    return `<fieldset><legend data-i18n="user.security"></legend>
        <div className="form-group">
          <div class="floating-label">
            <label htmlFor="role" data-i18n="user.role"></label>
            <select class="form-control" id="role" name="role">
                <option value="A" data-i18n="user.roles.admin"></option>
                <option value="U" data-i18n="user.roles.user"></option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div class="floating-label">
            <label for="username" data-i18n="login.username"></label>
            <input type="text" id="username" name="username" required class="form-control" />
            <div id="validity-username"></div>
          </div>
        </div>
        <div className="form-group">
          <div class="floating-label">
            <label for="password" data-i18n="login.password"></label>
            <input type="password" class="form-control" name="password" id="password" required />
            <div id="validity-password"></div>
          </div>
        </div>
        <div className="form-group">
          <div class="floating-label">
            <label for="repeatPassword" data-i18n="user.repeatPassword"></label>
            <input type="password" class="form-control" id="repeatPassword" name="repeatPassword" required />
            <div id="validity-repeatPassword"></div>
          </div>
        </div>
      </fieldset>`
  }
}

export default (user) => {
    return `<div class="modal fade" id="userDetailModal" tabindex="-1" role="dialog" aria-labelledby="userDetailModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" data-i18n="${user.id ? 'user.detailTitle' : 'user.createTitle'}"
            data-i18n-options="${user.id ? '{"fullname": '+user.fullname+'}' : ''}"></h5>
        </div>
        <div class="modal-body">
          <form id="userDetailForm" novalidate data-validator="user">
            <input type="hidden" name="id" id="id" value="${user.id || ''}" />
            <div class="form-group">
                <div class="floating-label">
                  <label for="name" data-i18n="user.name"></label>
                  <input type="text" id="name" name="name" required class="form-control" autofocus value="${user.name || ''}">
                  <div id="validity-name" class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group">
                <div class="floating-label">
                  <label for="username" data-i18n="user.surname"></label>
                  <input type="text" id="surname" name="surname" required class="form-control" value="${user.surname || ''}">
                  <div id="validity-surname" class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group">
              <div class="floating-label">
                <label for="gender" data-i18n="user.gender"></label>
                <select class="form-control" id="gender" name="gender">
                  <option label=""></option>
                  <option value="M" ${user.gender === 'M' ? 'selected' : ''}>M</option>
                  <option value="F" ${user.gender === 'F' ? 'selected' : ''}>F</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="floating-label">
                <label for="email" data-i18n="user.email"></label>
                <input type="email" id="email" name="email" required class="form-control" value="${user.email || ''}">
                <div id="validity-email" class="invalid-feedback"></div>
              </div>
            </div>
            ${getSecurityPanel(user)}
          </form>
          <div id="userMessageContainer"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal" data-i18n="common.cancel"></button>
          <button type="button" class="btn btn-primary btn-save" data-i18n="common.save"></button>
        </div>
      </div>
    </div>
  </div>`
}