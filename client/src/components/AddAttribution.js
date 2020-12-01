import axios from 'axios';
import _ from 'lodash';

export default {
    props: {
        computer: {
            required: true
        },
        horaire: {
            required: true
        },
        date: {
            required: true
        },
    },
    components: {
    },
    data() {
        return {
            name: '',
            firstname: '',
            lastname : '',
            ajouter: false,
            customer: {},
            dialog: false,
            //
            loading: false,
            search: null,
            customers: [],
        }
    },

    created() {
    },

    watch: {
        search: function (val) {
            if (val && val.length > 1) {
                this.loading = true
                axios.get('http://127.0.0.1:3000/api/customers/search', { params: { query: val } })
                    .then(({ data }) => {
                        console.log(data)
                        this.loading = false;
                        data.forEach(customer => {
                            this.customers.push(this.formattedCustomer(customer))
                        });

                    });
            }
        },
    },
    methods: {
        init: function () {
            this.name = ''
            this.lastname = ''
            this.firstname = ''
            this.ajouter = false
            this.customer = {}
        },

        attribute: function () {
            if (this.isValid()) {
                axios.post('http://127.0.0.1:3000/api/attributions/create', this.theCustomer())
                    .then(({ data }) => {
                        console.log(data)
                        this.$emit('addAttribution', data)
                        this.dialog = false
                    })
                    .catch(error => {
                        //TODO catch error
                        console.log(error);
                    });
            }

        },
        theCustomer: function () {
            return {
                computerId: this.computer.id,
                date: this.date,
                hour: this.horaire,
                id_client: this.customer.id ,
                name: this.name,
                firstname: this.firstname,
                lastname: this.lastname
            };
        },
        formattedCustomer: function (customer) {
            return {
                id: customer.id,
                name: customer.firstname + " " + customer.lastname,
            }
        },
        isValid() {
            return ((!_.isEmpty(this.customer)) || (!_.isEmpty(this.firstname)) || (!_.isEmpty(this.lastname)))
        }
    },
    computed: {
        validate() {
            return this.isValid()
        }
    }
}