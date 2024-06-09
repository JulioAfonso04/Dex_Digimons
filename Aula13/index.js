const { createApp } = Vue;

createApp({
    data() {
        return {
            digimons: [],
            loading: true,
            pesquisa: ''
        }
    },
    computed: {
        digimonsFiltro() {
            return this.digimons.filter(digimon => 
                digimon.name.toLowerCase().includes(this.pesquisa.toLowerCase())
            );
        }
    },  
    created() {
        this.buscarDigimons();
    },
    methods: {
        async buscarDigimons() {
            try {
                const response = await fetch('https://digimon-api.vercel.app/api/digimon');
                const data = await response.json();
                this.digimons = data.map(digimon => ({
                    ...digimon,
                    detalhes: true
                }));
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
        getLevelClass(nivel) {
            const classMap = {
                'Fresh': 'fresh',
                'In Training': 'in-training',
                'Rookie': 'rookie',
                'Champion': 'champion',
                'Ultimate': 'ultimate',
                'Mega': 'mega',
                'Armor': 'armor'
            };
            return classMap[nivel] || '';
        }
    }
}).mount("#app");