import React, { Component } from 'react'
import './SearchBar.css'


class SearchBar extends Component {


  render() {
    const { setSearchTerm, searchTerm, handleSearch, adult, setAdult } = this.props
    return (
      <div className='search-form'>
        <form onSubmit={handleSearch} >
          <div>
              <input type='text' placeholder="Search your Flick and chill.." className="search-input" required={true} onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
              <label className="search-adult">
              Include adult results?
              </label>
              <input type='checkbox' checked={adult} onClick={setAdult} />
              <button type='submit' >Search</button>
          </div>
        </form>
      </div>
    )
  }

}

export default SearchBar