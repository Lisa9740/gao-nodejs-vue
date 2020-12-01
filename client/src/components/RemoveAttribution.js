import axios from 'axios';

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
            axios.post('http://127.0.0.1:3000/api/attributions/remove', {
                id: this.attribution.id,
            }).then(({ data }) => {
                console.log(data)
                    this.$emit('removeAttribution', this.horaire)
                    this.dialog = false
                })
                .catch(error => {
                    //TODO catch error
                    console.log(error);
                });

        },
    }
}