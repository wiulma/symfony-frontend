import domUtils from '../../../../utils/Dom'
import i18nService from '../../../../services/I18nService'

import dialog from './Confirm.html.js';

import './confirm.scss';

export default {

    /**
     * 
     * @param {Object} cfg {title, message}
     * @param {Fn} handler 
     */
    show(message, handler) {
        const n = domUtils.htmlToElement(dialog(message));
        i18nService.localize(n);
        $(n).appendTo('body');
           
        //Trigger the modal
        $("#confirmModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        
        //Pass true to a callback function
        $(".btn-yes").click(function () {
            handler(true);
            $("#confirmModal").modal("hide");
        });
        
        //Pass false to callback function
        $(".btn-no").click(function () {
            handler(false);
            $("#confirmModal").modal("hide");
        });
    
        //Remove the modal once it is closed.
        $("#confirmModal").on('hidden.bs.modal', function () {
            $("#confirmModal").remove();
        });
    }
}