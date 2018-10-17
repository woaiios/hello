import {EventEmitter} from 'events'
const Store = Object.assign({}, EventEmitter.prototype, {
    list:[],
    getTodoListData: function () {
        return this.list
    },
    addTodoData: function(data) {
        this.list.push(data)
        console.log("sdfsa")
    },
    emitChange: function () {
        this.emit("change")
        console.log("eewweew")
    },
    addChangeListener: function (callback) {
        this.on("change", callback)
        console.log("pppp")    
    }
}) 

export default Store