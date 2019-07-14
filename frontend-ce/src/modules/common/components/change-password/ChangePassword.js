import i18next from 'i18next';

import domUtils from '../../../../utils/Dom';
import I18nService from '../../../../services/I18nService';
import notificationService from '../../../../components/notification/NotificationService';
import changePasswordService from './ChangePasswordService';
import serviceUtils from '../../../../utils/Service';

import template from './ChangePassword.html';

customElements.define ('app-change-pwd', class extends HTMLElement {

    constructor() {
        super();
        this.modalId = 'changePasswordModal';
        this.listeners = {
            save: this.save.bind(this),
            cancel: this.cancel.bind(this),
            checkValidityPwd: this.checkValidityPwd.bind(this)
        }
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        I18nService.localize(n);
        this.appendChild(n);
        $('.floating-label .custom-select, .floating-label .form-control').floatinglabel();
        //Trigger the modal
        $("#"+this.modalId).modal({
            backdrop: 'static',
            keyboard: false
        });

        this.querySelector(".btn-save").addEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").addEventListener("click", this.listeners.cancel);

        this.querySelector("#password").addEventListener("change", this.listeners.checkValidityPwd);
        this.querySelector("#repeatPassword").addEventListener("change", this.listeners.checkValidityPwd);

        // TODO: add form keypress event: esc, submit
        
        $("#"+this.modalId).on('hidden.bs.modal', () => {
            this.clearEvents();
            $("#"+this.modalId).remove();
            this.parentNode.removeChild(this);
        });
    }

    clearEvents() {
        this.querySelector(".btn-save").removeEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").removeEventListener("click", this.listeners.cancel);
    }

    checkValidityPwd(evt) {
        const p = this.querySelector("#password");
        const rp = this.querySelector("#repeatPassword");
        p.setCustomValidity('');
        rp.setCustomValidity('');
        const pf = p.parentNode.querySelector('.invalid-feedback');
        const rpf = rp.parentNode.querySelector('.invalid-feedback');
        pf.dataset.customMessage = '';
        rpf.dataset.customMessage = '';
        if (p.value !== rp.value) {
            p.setCustomValidity(pf.dataset.customMessage = 'password-valueCheckFailed');
            rp.setCustomValidity(rpf.dataset.customMessage = 'repeatPassword-valueCheckFailed');
        }
    }

    cancel(evt) {
        $("#"+this.modalId).modal("hide");
    }

    save(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const form = this.querySelector('#formChangePassword');
        domUtils.cleanFormValidation(form);
        notificationService.clearResult('securityMessageContainer');
        if (form.checkValidity()) {
            const id = this.dataset.userid;
            if (!id || id =="") {
                $("#"+this.modalId).modal("hide");
            } else {
                const {repeatPassword, ...data} = serviceUtils.formDataToJson(new FormData(form));
                changePasswordService.changePassword(id, data)
                    .then( (result) => {
                        if (result) {
                            $("#"+this.modalId).modal("hide");
                            notificationService.show(
                                {title: i18next.t("security.securityTitle"), message: i18next.t("security.confirmUpdatePassword")}, 
                                notificationService.STYLE.SUCCESS);
                        } else {
                            notificationService.showResult(
                                i18next.t('security.confirmUpdatePasswordFailed'),
                                notificationService.STYLE.ERROR,
                                'securityMessageContainer'
                            );
                        }
                    })
                    .catch(exc => {
                        notificationService.showResult(
                            i18next.t('security.confirmUpdatePasswordFailed') + 
                                (exc.message ? '-'+i18next.t(exc.message) : ''),
                            notificationService.STYLE.ERROR,
                            'securityMessageContainer'
                        );
                    })
            }
            
        } else {
            domUtils.showInvalidFormMessage(form);
            form.classList.add('was-validated');
        }

    }


})