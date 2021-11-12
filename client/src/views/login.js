import tokenConfig from '../utils/tokenConfig';
import {ApiService} from "@/service/api";

export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Adresse E-mail est requis',
            v => /.+@.+\..+/.test(v) || 'Adresse email invalide',
        ],
        password: '',
        passwordRule: [
            v => !!v || 'Le mot de passe est requis',
        ],
    }),

    methods: {
        async validate() {
            let isReady = this.$refs.form.validate();
            let dataSend = {
                email : this.email,
                password : this.password
            }
            if(isReady) {
                const connectInfo = await ApiService.prototype.login(dataSend);
                if(connectInfo.data.token) {
                    tokenConfig.setToken(connectInfo.data.token);
                    location.href = '/';

                    console.log('true', connectInfo.data);
                    this.flashMessage.success({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                } else {
                    console.log('false',connectInfo.data);
                    this.flashMessage.error({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                }
            }
        }
    },
}
