import i18next from 'i18next'

import domUtils from '../../../../utils/Dom'
import serviceUtils from '../../../../utils/Service'
import i18nService from './../../../../services/I18nService'

import tmplDetails from './UserDetail.html.js'
import userService from './UserService';
import notificationService from '../../../../components/notification/NotificationService';

customElements.define('app-user-detail', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            'save': this.save.bind(this),
            'cancel': this.cancel.bind(this)
        }
	}

	connectedCallback() {
        // load loader
        const id = this.getAttribute("id");
        if (id) {
            userService.getById(id)
                .then((user => this.loadData(user)))
                .catch( () => {
                    // TODO: notify error
                })
        } else {
            this.loadData({});
        }

    }

    clearEvents() {
        this.querySelector(".btn-save").removeEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").removeEventListener("click", this.listeners.cancel);
    }
    
    loadData(user) {
		const n = domUtils.htmlToElement(tmplDetails(user));
		i18nService.localize(n);
        this.appendChild(n);
        $('.floating-label .custom-select, .floating-label .form-control').floatinglabel();
        //Trigger the modal
        $("#userDetailModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        this.querySelector(".btn-save").addEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").addEventListener("click", this.listeners.cancel);
        // TODO: add form keypress event: esc, submit
        
        $("#userDetailModal").on('hidden.bs.modal', () => {
            this.clearEvents();
            $("#userDetailModal").remove();
            this.parentNode.removeChild(this);
        });

    }

    save(evt) {
        const form = this.querySelector('#userDetailForm');
        domUtils.cleanFormValidation(form);
        notificationService.clearResult('userMessageContainer');
        
        evt.preventDefault();
        evt.stopPropagation();
        
        if (form.checkValidity()) {
            const data = new FormData(form);
            const d = serviceUtils.formDataToJson(data);
            userService.save(d)
                    .then((result, data) => {
                        if (result) {
                            $("#userDetailModal").modal("hide");
                            notificationService.show(
                                {title: i18next.t("user.detailSave"), message: i18next.t("user.detailSaveSuccess")}, 
                                notificationService.STYLE.SUCCESS);
                        } else {
                            notificationService.showResult(
                                i18next.t('user.detailSaveError') + '-'+i18next.t(data),
                                notificationService.STYLE.ERROR,
                                'userMessageContainer'
                            );
                        }

                    })
                    .catch(err => {
                        notificationService.showResult(
                            i18next.t('user.detailSaveError') + '-'+err.message,
                            notificationService.STYLE.ERROR,
                            'userMessageContainer'
                        );
                    });
    
        } else {
            domUtils.showInvalidFormMessage(form);
            form.classList.add('was-validated');
            console.log("Invalifd form");
        }
    }

    cancel(evt) {
        $("#userDetailModal").modal("hide");
    }
});