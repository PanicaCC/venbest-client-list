import React, { Component } from "react"
import "./app.scss"
import ClientList from "./components/client-list/client-list";
import SearchClient from "./components/search-client/search-client";

import ApiService from "./api";

export default class App extends Component {

    AService = new ApiService();
    state = {
        clients: null
    }

    updateData = () => {
       this.AService.getClients().then(res => {
           this.setState({
               clients: res
           })
       })
    }

    componentDidMount() {
        this.updateData();
    }

    searchHandler = (data, targetName) => {
        const isEmpty = Object.values(data).every(x => (x === null || x === '' || x === false));
        const newState = [ ...this.state.clients ]

        if (isEmpty){
            return this.setState({
                clients: this.state.clients
            })
        } else {
           //todo need finished !!!
        }

    }

    // search = (items, term) => {
    //     if (items.length === 0){
    //         return items
    //     }
    //     return items.filter(item => item.label.toLowerCase().indexOf(term) > -1)
    // }

  render() {

    if(!this.state.clients){
        return <p>Загрузка данных ...</p>
    }

    return (
      <div className="app ">
          <div className="container">
              <SearchClient searchHandler={ this.searchHandler } />
              <ClientList clients={ this.state.clients } />
          </div>
      </div>
    )
  }
}