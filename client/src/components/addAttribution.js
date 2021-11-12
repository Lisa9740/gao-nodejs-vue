import _ from 'lodash';
import {ApiService} from "@/service/api";

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
            loading: false,
            search: null,
            customers: [],
        }
    },
    watch: {
        search: function (val) {
            if (val && val.length > 1) {
                this.loading = true
                ApiService.prototype.getCustomers(val).then(({ data }) => {
                        this.loading = false;
                        data.forEach(customer => {
                            this.customers.push(this.formattedCustomerData(customer))
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
                ApiService.prototype.createAttribution(this.dataCustomer())
                    .then(({ data }) => {
                        this.$emit('addAttribution', data)

                        this.flashMessage.success({
                            message: "Attribution ajouté avec succès.",
                            time: 5000,
                        });
                        this.dialog = false
                    })
                    .catch(error => {
                        this.flashMessage.error({
                            message: "Une erreur est survenue lors de l'attribution de ce poste.",
                            time: 5000,
                        });
                        console.log(error);
                    });
            }

        },
        dataCustomer: function () {
            return {
                computerId: this.computer.id,
                customerId: this.customer.id,
                date: this.date,
                hour: this.horaire,
                name: this.name,
                firstname: this.firstname,
                lastname: this.lastname
            };
        },
        formattedCustomerData: function (customer) {
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
