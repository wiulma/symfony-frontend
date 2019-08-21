import i18next from 'i18next'

import domUtils from '../../../utils/Dom';
import i18nService from '../../../services/I18nService'
import notificationService from '../../../components/notification/NotificationService'

/**
 * Abstract detail component
 */
export default class AbstractDetailElement extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            save: this.save.bind(this),
            cancel: this.cancel.bind(this)
        }
        this.config = {};
    }
    
    loadData(service) {
        const id = this.dataset.id;
        if (id) {
            service.getById(id)
                .then((item => this.renderData(item)))
                .catch(() => {
                    // TODO: notify error
                })
        } else {
            this.renderData({});
        }
    }

    renderData(item) {
        const n = domUtils.htmlToElement(this.config.tmplDetails(item));
        i18nService.localize(n);
        this.appendChild(n);
        $('.floating-label .custom-select, .floating-label .form-control').floatinglabel();
        //Trigger the modal
        $(`#${this.config.containerId}`).modal({
            backdrop: 'static',
            keyboard: false
        });

        this.querySelector(".btn-save").addEventListener("click", this.listeners.save);
        this.querySelector(".btn-cancel").addEventListener("click", this.listeners.cancel);
        // TODO: add form keypress event: esc, submit

        $(`#${this.config.containerId}`).on('hidden.bs.modal', () => {
            this.clearEvents();
            $(`#${this.config.containerId}`).remove();
            this.parentNode.removeChild(this);
        });
    }

    cancel(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $(`#${this.config.containerId}`).modal("hide");
    }

    saveData(service, options) {
        const form = this.querySelector(`#${this.config.formId}`);
        domUtils.cleanFormValidation(form);
        notificationService.clearResult(`${this.config.messageContainerId}`);

        if (form.checkValidity()) {
            const data = new FormData(form);
            service.save(data)
                .then(([result, data]) => {
                    if (result) {
                        $(`#${this.config.containerId}`).modal("hide");
                        const t = options.saveSuccessTitle || "common.detailSave";
                        const m = options.saveSuccessMessage ||  "common.detailSaveSuccess";
                        notificationService.show(
                            { title: i18next.t(t), message: i18next.t(m) },
                            notificationService.STYLE.SUCCESS);
                    } else {
                        notificationService.showResult(
                            i18next.t('common.detailSaveError') + (data ? ('-' + i18next.t(data)) : ""),
                            notificationService.STYLE.ERROR,
                            this.config.messageContainerId
                        );
                    }
                })
                .catch(err => {
                    notificationService.showResult(
                        i18next.t('common.detailSaveError') + '-' + err.message,
                        notificationService.STYLE.ERROR,
                        this.config.messageContainerId
                    );
                });
        } else {
            domUtils.showInvalidFormMessage(form);
            form.classList.add('was-validated');
            console.log("Invalifd form");
            return false;
        }
    }

}