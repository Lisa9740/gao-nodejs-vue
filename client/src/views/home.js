import Computer from '../components/Computer.vue'
import AddComputer from '../components/AddComputer.vue'
import {ApiService} from "@/service/api";

export default {
    name: 'Home',
    components: {
        Computer,
        AddComputer
    },
    data() {
        return {
            computers: [],
            date: new Date().toISOString().substr(0, 10),
            menuDate: false,
            page: 1,
            pageSize: null
        }
    },
    watch: {
        page: function (page) {
            this.page = page
            this.getComputers();
        }
    },
    computed: {},
    created() {
        this.getComputers();
    },
    methods: {
        getComputers: function () {
            this.computers = [];
            ApiService.prototype.getComputers({params: {date: this.date, page: this.page}})
                .then(({data}) => {
                    this.getPageLength()
                    this.computers = data;
                }).catch(error => {
                console.log(error);
            });
        },
        getPageLength: function () {
            ApiService.prototype.getComputersSize()
                .then(({data}) => {
                    this.pageSize = data;
                }).catch(error => {
                console.log(error);
            });
        },
        // eslint-disable-next-line no-unused-vars
        addComputer: function () {
            this.refreshData()
        },
        refreshData: function () {
            this.getComputers()
        }
    }
}
