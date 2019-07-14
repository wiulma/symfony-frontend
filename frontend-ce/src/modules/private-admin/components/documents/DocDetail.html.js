export default (doc) => {
    return `<div class="modal fade" id="docDetailModal" tabindex="-1" role="dialog" aria-labelledby="docDetailModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" data-i18n="${doc.id ? 'docs.detailTitle' : 'docs.createTitle'}"></h5>
        </div>
        <div class="modal-body">
          <form id="docDetailForm" novalidate data-validator="doc">
            <input type="hidden" name="id" id="id" value="${doc.id || ''}" />
            <div class="form-group">
                <div class="floating-label">
                  <label for="name" data-i18n="docs.type"></label>
                  <input type="text" id="type" name="type" required class="form-control" autofocus value="${doc.type || ''}">
                  <div id="validity-type" class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group">
                <div class="floating-label">
                  <label for="docname" data-i18n="docs.title"></label>
                  <input type="text" id="title" name="title" required class="form-control" value="${doc.title || ''}">
                  <div id="validity-title" class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group">
              <div class="floating-label">
                <label for="path" data-i18n="docs.path"></label>
                <input type="text" id="path" name="path" required class="form-control" value="${doc.path || ''}">
                <div id="validity-path" class="invalid-feedback"></div>
              </div>
            </div>
          </form>
          <div id="docMessageContainer"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal" data-i18n="common.cancel"></button>
          <button type="button" class="btn btn-primary btn-save" data-i18n="common.save"></button>
        </div>
      </div>
    </div>
  </div>`
}