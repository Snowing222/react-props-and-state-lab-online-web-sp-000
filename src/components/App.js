import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilterUpdate = () =>{
    this.setState({
      filters: {
        type : e.target.value
      }
    })
  }

  onFindPetsClick = () =>{
    let type = this.state.filters.type
    let path =  type ==="all" ?  "" : `?type=${type}`
    fetch(`/api/pets${path}`) // '/api/' + type
    .then(resp=>resp.json)
    .then(json=>this.setState({pets:json}))
  }

  handleAdoptPet = (id)=>{
    this.state.pets.find(pet=>pet.id === id).isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.handleFilterUpdate} onFindPetsClick = {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet = {this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
