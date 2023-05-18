const app = Vue.createApp({
    // data, functions
    data() {
        return {
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1",
            showBooks: true,
            books: [
                {title: 'The First Empire', author: 'Victor Hincu', age: 22, img: 'assets/1.jpg', isFav: true},
                {title: 'The Second Empire', author: 'Victor Hincu', age: 22, img: 'assets/2.jpg', isFav: false},
                {title: 'The Third Empire', author: 'Victor Hincu', age: 22, img: 'assets/3.jpg', isFav: true},
            ],
            x: 0,
            y: 0,
        }
    },
    methods: {
        toggleShowBooks() {
            this.showBooks = !this.showBooks
        },
        handleEvent(e, data) {
            console.log(e, e.type)
            if(data) {
                console.log(data)
            }
        },
        handleMouseMove(e) {
            this.x = e.offsetX
            this.y = e.offsetY
        },
        toggleFav(book) {
            book.isFav = !book.isFav
        }
    },
    computed: {
        filteredBooks() {
            return this.books.filter((book) => book.isFav)
        }
    }
})

app.mount("#app")