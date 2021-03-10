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
        this.clearGender()
    }

    clearGender = () => {
     this.updateData()
    }

    searchHandler = (data, targetName) => {
        const isEmpty = Object.values(data).every(x => (x === null || x === '' || x === false));
        const newState = [ ...this.state.clients ]

        if (isEmpty){
            this.clearGender()
        } else {
            if(targetName === "name" || targetName === "lastname"){
                const res = newState.filter(val => {
                    return val[targetName].toLowerCase().indexOf(data[targetName].toLowerCase()) > -1
                })
                return this.setState({
                    clients: res
                })
            }
            if (targetName === "genderM" || targetName === "genderF"){
                const updateState = [ ...newState ]
                const res = updateState.filter(val => {
                    if (targetName === "genderM" && data[targetName] === true && (!data['genderF'] || data["genderF"] === false)){
                        return val["sex"].indexOf('m') > -1
                    }
                    if (targetName === "genderF" && data[targetName] === true && (!data['genderM'] || data["genderM"] === false)){
                        return val["sex"].indexOf('f') > -1
                    }
                    return res
                })
                return this.setState({
                    clients: res,
                })
            }

            if (targetName === "age"){
                const res = newState.filter(val => {
                    const str = val[targetName].toString()
                    return str.indexOf(data['age']) > -1
                })
                return this.setState({
                    clients: res
                })
            }
        }
    }

  render() {
    if(!this.state.clients){
        return <p>Загрузка данных ...</p>
    }

    return (
      <div className="app ">
          <div className="container">
              <SearchClient
                  searchHandler={ this.searchHandler }
                  clearGender={ this.clearGender }
              />
              <ClientList clients={ this.state.clients } />
          </div>
      </div>
    )
  }
}