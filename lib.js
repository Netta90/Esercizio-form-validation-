/* inserendo nome utente e paswword, confermando la password cliccando sul bottone deve dare un messaggio di esito */

let _v = {
    emailPattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,

    isValidPassword: false,

    hasError: false,

    checkPasswordStrength: function () {
        this.form.password.addEventListener('keyup', (e) => {
            const isValid = {
                isLow: false,
                isHigh: false
            }

            let pwd = e.target.value
            this.resetSpan();

            if (pwd.length >= 8) {
                this.passwordStrenght[0].classList.add('active');
                if (this.regexCount(/[&%?!]/g, pwd) === 1) {
                    this.passwordStrenght[1].classList.add('active');
                }
                isValid.isLow = true;
            }

            if (pwd.length >= 10 && this.regexCount(/[&%?!]/g, pwd) >= 2) {
                this.passwordStrenght.forEach(item => {
                    item.classList.add('active');
                })
                isValid.isHigh = true;
            }
            this.isValidPassword = (isValid.isLow || isValid.isHigh) ? true : false;
        });
    },


    regexCount: function (pattern, password) {
        return (password.match(pattern) || []).length;
    },


    submitForm: function () {
        this.form.addEventListener('submit', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.checkValidation();

        }, true);
    },

    checkValidation: function () {
        try {
            // controllo campi obbligatori
            this.requiredFields();

            // verificare la validità della mail
            this.isValidEmail();

            // verificare che la pw sia uguiale al conferma pw e verificarne la validità
            this.checkPassword();
            // controllo superato
            this.notificationItem.className = 'notification-success';
            this.notificationItem.textContent = 'La registrazione è avvenuta correttamente.';
            this.resetForm();

        } catch (e) {
            this.notificationItem.textContent = e.message;
        }
    },

    requiredFields: function () {
        let error;
        this.hasError = false;

        this.formItems.forEach(item => {
            error = false;
            if (item.type !== 'checkbox' && item.required && item.value == '') {
                error = true;
            }
            if (item.type === 'checkbox' && item.required && !item.checked) {
                error = true;
            }

            if (error && item.type !== "submit") {
                this.hasError = true;
                item.classList.add("error");
            }
        });
        if (this.hasError) {
            throw new Error('compilare i campi obbligatori');
        }

    },

    isValidEmail: function () {
        if (!this.emailPattern.test(this.form.email.value)) {
            throw new Error(' mail non valida');

        }

    },

    checkPassword: function () {
        let pwd = this.form.password.value;
        let re_pwd = this.form.re_password.value;
        if (!this.isValidPassword) {
            throw new Error('Password non valida');
        }
        if (pwd !== re_pwd) {
            throw new Error('Le password non coincidono');
        }
    },

    resetForm: function () {
        this.form.reset();
        this.resetSpan();
        this.formItems.forEach(item => {
            item.classList.remove('error');
        });
    },

    resetSpan: function () {
        this.passwordStrenght.forEach(span => {
            span.classList.remove('active');
        })

    }



}



function formValidation(form, notifica) {
    _v.form = document.querySelector(`${form}`);
    _v.notificationItem = document.querySelector(`${notifica}`);
    _v.passwordStrenght = document.querySelectorAll('#password > span');
    _v.formItems = Array.from(_v.form.elements);
    _v.checkPasswordStrength();
    _v.submitForm();



};

export default formValidation; 