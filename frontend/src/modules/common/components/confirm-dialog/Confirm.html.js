export default (message) => {
    return `<div class="modal fade confirm" id="confirmModal" role="dialog"> 
    <div class="modal-dialog modal-dialog-centered">
       <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" data-i18n="common.confirmTitle"></h4>
          </div>
          <div class="modal-body"> 
            <h6>${message}</h6>
          </div>
          <div class="modal-footer">
              <a class="btn btn-primary btn-yes" data-i18n="common.yes"></a> 
              <a class="btn btn-default btn-no" data-i18n="common.no"></a> 
          </div> 
      </div> 
   </div> 
 </div>`;
}