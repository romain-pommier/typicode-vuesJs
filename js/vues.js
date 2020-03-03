
let templatePhoto = {
    template: `
        <div v-if=" photos != null">
            <h5 class="mb-5" >Photos de l'album '{{ albumTitle }}'</h5>
            <div class="row">
                <div v-for="photo in photos " class="col-md-3 mb-4">
                    <h6 class="mb-3" > {{ photo.title }} </h6>
                    <img v-bind:src=" photo.thumbnailUrl "></img>
                </div>
            </div>
        </div>
    `,
    props: {
        photos: null,
        albumTitle: ""
    }
};
let albumTemplate = {
    template: `
    <div  v-if="albums != null">
        <h5> Albums photo de {{ user.name }} </h5>
         <ul>
            <li v-for="album in albums">{{ album.title }} <a href="#" @click="displayPictures( album.id, album.title )">| Voir les photos</a></li>
        </ul>
        <div-photo v-bind:photos="photos" v-bind:albumTitle="albumTitle"></div-photo>
    </div>
        
    `,
    data: function() {
        return {
            photos: null,
            albumTitle: ""
        };
    },
    props: {
        albums: null,
        user: null
    },
    methods: {
        displayPictures: function(albumId, albumTitle) {
            fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
                .then(response => response.json())
                .then(json => {
                    this.photos = json;
                    this.albumTitle = albumTitle;
                });
        }
    },
    components: {
        "div-photo": templatePhoto
    }
};
let liTodoTemplate = {
    template: `
    <div v-if=" todoStatus == true && showTodo == true">
        <li v-if="todo.completed == true" v-bind:style="{color:'green', display:'inline'}"> {{ todo.title }}  </li>
        <li v-else v-bind:style="{color:'red', display:'inline'}" > {{ todo.title }}   </li>
        <a href="#" @click="hideTodoOnClick">| Supprimer</a>
    </div>
    `,
    data: function() {
        return {
            todoStatus: true
        };
    },
    props: {
        todo: null,
        showTodo: true
    },
    computed: {},
    methods: {
        hideTodoOnClick: function() {
            this.todoStatus = false;
        }
    }
};

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
        };
    },
    methods: {
        hideAllTodo: function() {
            this.showTodo = !this.showTodo;
        }
    },
    props: {
        todos: null,
        user: null
    },
    computed: {},
    filters: {},
    components: {
        "li-todo": liTodoTemplate
    }
};
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
                    <button @click="getData('todos')">Voir les tâches </button>
                    <button @click="getData('albums')">Voir les albums </button>
                    <button>Voir les articles </button>
                    <div-todo  v-bind:todos="userData.todos" v-bind:user="user"></div-todo>
                    <div-album v-bind:albums="userData.album" v-bind:user="user"></div-album>


                </div>
                `,
    data: function() {
        return {
            userData:new Object,
        };
    },
    computed: {
        addressComplet: function() {
            return (
                this.user.address.street +
                ", " +
                this.user.address.suite +
                " " +
                this.user.address.city +
                " " +
                this.user.address.zipcode
            );
        }
    },
    props: {
        user: null
    },
    methods: {
        getData: function(value) {
            fetch("https://jsonplaceholder.typicode.com/"+value+"?userId=" + this.user.id)
                .then(response => response.json())
                .then(json => {
                    switch(value){
                        case "todos":
                            this.userData = { todos: json}
                            break
                        case "albums":
                            this.userData = { album: json}
                            break   
                    }
                });
        },
    },
    components: {
        "div-todo": todoTemplate,
        "div-album": albumTemplate
    },
    updated: function(){
        console.log('modifier')
    }
};

let vm = new Vue(
    {
    el: "#app",
    data: {
        users: [],
        userRoute: "users",
        dataUser: null,
        countUsers: 0,
        userSelected: ""
    },
    created: function() {
        this.getUsers();
    },
    methods: {
        getUsers: function() {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(json => {
                    this.users = json;
                    this.countUsers = json.length;
                });
        },
        displayUser: function() {
            fetch("https://jsonplaceholder.typicode.com/users/" + this.userSelected)
                .then(response => response.json())
                .then(json => {
                    this.dataUser = json;
                });
        }
    },
    components: {
        "div-user": TemplateUser
    }
});