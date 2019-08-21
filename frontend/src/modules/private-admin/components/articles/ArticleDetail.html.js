export default (article) => {
    return `<div class="modal fade" id="articleDetailModal" tabindex="-1" role="dialog" aria-labelledby="articleDetailModal" aria-hidden="true">
    <div class="modal-dialog" role="documentType">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" data-i18n="${article.id ? 'articles.detailTitle' : 'articles.createTitle'}"></h5>
        </div>
        <div class="modal-body">
          <form id="articleDetailForm" novalidate data-validator="article">
            <input type="hidden" name="id" id="id" value="${article.id || ''}" />
            <div class="form-group">
                <div class="floating-label">
                  <label for="title" data-i18n="articles.title"></label>
                  <input type="text" id="title" name="title" required class="form-control" autofocus value="${article.title || ''}" maxLength="100">
                  <div id="validity-title" class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group">
                <div class="floating-label">
                  <label for="content" data-i18n="articles.content"></label>
                  <input type="text" id="content" name="content" required class="form-control" value="${article.content || ''}">
                  <div id="validity-content" class="invalid-feedback"></div>
                </div>
            </div>
          </form>
          <div id="articlesMessageContainer"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal" data-i18n="common.cancel"></button>
          <button type="button" class="btn btn-primary btn-save" data-i18n="common.save"></button>
        </div>
      </div>
    </div>
  </div>`
}