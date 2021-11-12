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
        }
    },
    methods: {
        remove: function () {
            ApiService.prototype.removeComputer({id : this.computer.id}).then(({ data }) => {
                console.log(data)
                this.$emit('remove');
                this.flashMessage.success({
                    message: "Poste supprimé avec succès.",
                    time: 5000,
                });
                this.dialog = false
            })
                .catch(error => {
                    this.flashMessage.error({
                        message: "Une erreur est survenue lors de la suppression de ce poste.",
                        time: 5000,
                    });
                    console.log(error);
                });

        },
    }
}
