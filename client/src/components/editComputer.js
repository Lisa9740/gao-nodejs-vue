import {ApiService} from "@/service/api";

export default {
    props: {
        computer: {
            required: true
        },
    },
    data() {
        return {
            dialog: false,
            name: ''
        }
    },
    methods: {
        init: function () {
            this.ajouter = false
        },
        edit: function () {
            const data = {
                id : this.computer.id, name: this.name
            };
            ApiService.prototype.editComputer(data)
                .then(() => {
                    this.$emit('edit')
                    this.flashMessage.success({
                        message: "Poste modifié avec succès.",
                        time: 5000,
                    });
                    this.dialog = false
                })
                .catch(error => {
                    this.flashMessage.error({
                        message: "Erreur lors de la modification du poste.",
                        time: 5000,
                    });
                    console.log(error);
                });
        },
    },
}
