import {ApiService} from "@/service/api";
export default {
    props: {
    },
    data() {
        return {
            name: '',
            dialog: false
        }
    },
    methods: {
        addComputer: function () {
            if (this.isValid()) {
                const data = {
                    name: this.name,
                };
                ApiService.prototype.createComputer(data)
                    .then(({ data }) => {
                        this.flashMessage.success({
                            message: "Poste ajouté avec succès.",
                            time: 5000,
                        });

                        this.$emit('add', data)
                        this.dialog = false
                    })
                    .catch(error => {
                        //TODO catch error
                        console.log(error);
                    });
            }
        },
        isValid() {
            return this.name !== ''
        }
    },
    computed: {
        validate() {
            return this.isValid()
        }
    }
}
