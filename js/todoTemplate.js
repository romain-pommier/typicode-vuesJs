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