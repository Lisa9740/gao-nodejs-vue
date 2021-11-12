import _ from 'lodash';
import AddAttribution from './AddAttribution.vue'
import RemoveAttribution from './RemoveAttribution.vue'
import RemoveComputer from './RemoveComputer.vue'
import EditComputer from "./EditComputer.vue";
export default {
    props: {
        computer: {
            required: true
        },
        date: {
            required: true
        },
    },
    watch: {
        computer: function () {
            this.getAttributions();
        }
    },
    components: {
        AddAttribution,
        RemoveAttribution,
        RemoveComputer,
        EditComputer
    },
    data() {
        return {
            horaires: [],
            hourSlots: [],
            attributions: {}
        }
    },
    created() {
        this.getAttributions();
    },
    methods : {
        getAttributions() {
            let attribution = this.computer.Attributions[0];
            if (attribution){
                attribution.forEach(attr => {
                    this.attributions[attr.hour] = {
                        id: attr.id,
                        name: attr.Customer.firstname + " " + attr.Customer.lastname ,
                    }
                });
            }
            this.buildHourSlots();
        },
        buildHourSlots() {
            this.hourSlots = [];
            for (let i = 0; i < 10; i++) {
                this.hourSlots.push({
                    index: i + 8,
                    attribution: (typeof this.attributions[i + 8] !== 'undefined' ) ? this.attributions[i + 8] : false
                });
            }
        },
        addAttribution: function (attribution) {
            if (this.computer.Attributions[0]){
                this.computer.Attributions[0].push(attribution);
            }
            this.getAttributions();
            this.$emit('refresh');
        },
        editComputer: function (){
            this.$emit('refresh')
        },
        removeAttribution: function(hour){
            _.unset(this.attributions, hour);
            this.buildHourSlots();
        },
        removeComputer: function (){
            this.$emit('refresh');
        }
    }
}
