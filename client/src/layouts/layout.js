/**
 * Layout js file
 */


import tokenConfig  from '../utils/tokenConfig';

export default {
    data(){
        return {
            isLogged: tokenConfig.getToken()
        }
    },

    /**
     * List of methods
     */
    methods: {

        /**
         * Disconnect function
         */
        disconnected() {
            tokenConfig.removeToken();
            location.href = '/login';
            // this.$router.push('/connexion');
        }

    }
}