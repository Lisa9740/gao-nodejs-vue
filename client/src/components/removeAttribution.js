import {ApiService} from "@/service/api";

export default {
    props: {
        computer: {
            required: true
        },
        horaire: {
            required: true
        },
        attribution: {
            required: true
        },
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        supprimer: function () {
            ApiService.prototype.removeAttribution({
                id: this.attribution.id,
            }).then(({ data }) => {
                console.log(data)
                    this.$emit('removeAttribution', this.horaire)
                    this.flashMessage.success({
                        message: "Attribution retiré avec succès.",
                        time: 5000,
                    });
                    this.dialog = false
                })
                .catch(error => {
                    this.flashMessage.error({
                        message: "Une erreur est survenue lors de la suppression de cette attribution.",
                        time: 5000,
                    });
                    console.log(error);
                });

        },
    }
}
