import Vue from "vue";
import Vuex from "vuex";
import { getTodos, addTodo, removeTodo, updateTodo } from "@/api/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    completed: state => {
      return state.todos.filter(todo => todo.is_done === 1);
    },
    active: state => {
      return state.todos.filter(todo => todo.is_done === 0);
    },
    all: state => {
      return state.todos;
    }
  },
  mutations: {
    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    changeStatus(state, id) {
      const todo = state.todos.find(item => item.id == id);
      todo.is_done = +!todo.is_done;
    },
    changeText(state, todo) {
      const foundTodo = state.todos.find(item => item.id == todo.id);
      foundTodo.text = todo.text;
    },
    addTodo(state, { text, id }) {
      state.todos.push({
        id,
        text,
        is_done: 0
      });
    },
    setTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    setTodos({ commit }) {
      getTodos().then(({ data }) => {
        commit("setTodos", data);
      })
      .catch(({ response }) => {
        Vue.noty.error(response.data.error);
      });
    },
    addTodo({ commit }, text) {
      addTodo({ text })
        .then(({ data }) => {
          if (data.success) {
            commit("addTodo", { text, id: data.id });
          }
        })
        .catch(({ response }) => {
          Vue.noty.error(response.data.error);
        });
    },
    removeTodo({ commit }, id) {
      removeTodo(id)
        .then(({data}) => {
          if (data.success) {
            commit("removeTodo", id);
          }
        })
        .catch(({ response }) => {
          Vue.noty.error(response.data.error);
        });
    },
    updateTodo({ commit }, todo) {
      updateTodo({ id: todo.id, isDone: todo.is_done, text: todo.text })
        .then(({data}) => {
          if (data.success) {
            commit("changeText", todo);
          }
        })
        .catch(({ response }) => {
          Vue.noty.error(response.data.error);
        });
    },
    changeStatus({ commit }, todo) {
      updateTodo({ id: todo.id, isDone: +!todo.is_done, text: todo.text })
        .then(({data}) => {
          if (data.success) {
            commit("changeStatus", todo.id);
          }
        })
        .catch(({ response }) => {
          Vue.noty.error(response.data.error);
        });
    }
  }
});
