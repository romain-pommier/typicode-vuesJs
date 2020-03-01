let liTodoTemplate = {
    template: `
    <div v-if=" showTodo == true">
        <li v-if="todo.completed == true" v-bind:style="{color:'green', display:'inline'}"> {{ todo.title }}  </li>
        <li v-else v-bind:style="{color:'red', display:'inline'}" > {{ todo.title }}   </li>
        <a href="#" @click="hideTodoOnClick">| Supprimer</a>
    </div>
    
    `,
    data: function() {
        return {

        }
    },
    props: {
        todo: null,
        showTodo: true
    },
    computed: {

    },
    methods: {
        hideTodoOnClick: function() {
            this.showTodo = false
        }

    }
}

let todoTemplate = {
    template: ` <div v-if="todos != null"> 
                    <h4>Tâche de messieur {{user.name}}</h4>
                    <button @click="hideAllTodo">Cacher / Afficher les tâches déja réaliser</button>
                    <ul>
                        <li-todo v-for='todo in todos' v-bind:todo="todo" v-bind:showTodo="showTodo" v-bind:key="todo.id"> </li-todo>
                    </ul>
                    
                </div>`,
    data: function() {
        return {
            showTodo: true

        }
    },
    methods: {
        hideAllTodo: function() {
            this.showTodo = !this.showTodo
        }
    },
    props: {
        todos: null,
        user: null
    },
    computed: {

    },
    filters: {

    },
    components: {
        'li-todo': liTodoTemplate
    }

}
let TemplateUser = {
    template: `<div v-if="user != null " >
                    <h4 class="mt-5" >{{ user.name }}</h4>
                    <p>N°{{ user.id }}</p>
                    <ul>
                        <li>email: {{ user.email }}</li>
                        <li>tel: {{ user.phone }}</li>
                        <li>web: {{ user.website }}</li>
                    </ul>
                    <p style="font-style: italic;"> Adresse: {{ addressComplet }}</p>
                    <p>Entreprise: {{user.company.name}}</p>
                    <hr>
                    <button @click="displayTache">Voir les tâches </button>
                    <button>Voir les albums </button>
                    <button>Voir les articles </button>
                    <div-todo  v-bind:todos="todoInfo" v-bind:user="user"></div-todo>

                </div>
                `,

    data: function() {
        return {
            todoInfo: null

        }
    },
    computed: {
        addressComplet: function() {
            return this.user.address.street + ', ' + this.user.address.suite + ' ' + this.user.address.city + ' ' + this.user.address.zipcode
        },

    },


    props: {
        user: null
    },


    methods: {
        displayTache: function() {
            fetch("https://jsonplaceholder.typicode.com/todos?userId=" + this.user.id)
                .then(response => response.json())
                .then(json => {
                    this.todoInfo = json
                })

        }

    },
    components: {
        'div-todo': todoTemplate
    },

};

let vm = new Vue({
    el: '#app',
    data: {
        users: [],
        userRoute: 'users',
        dataUser: null,
        countUsers: 0,
        userSelected: ''

    },



    created: function() {
        this.getUsers()
    },
    methods: {
        getUsers: function() {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(json => {
                    this.users = json;
                    this.countUsers = json.length;
                })
        },
        displayUser: function() {
            fetch("https://jsonplaceholder.typicode.com/users/" + this.userSelected)
                .then(response => response.json())
                .then(json => {
                    this.dataUser = json
                })
        },
    },
    components: {
        'div-user': TemplateUser
    }

})