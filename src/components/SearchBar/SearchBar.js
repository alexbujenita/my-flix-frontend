import React, { Component } from 'react'
import './SearchBar.css'


class SearchBar extends Component {


  render() {
    const { setSearchTerm, searchTerm, handleSearch, adult, setAdult } = this.props
    return (
      <div className='search-form'>
        <form onSubmit={handleSearch} >
          <label>
            Search for a movie title:
              <input type='text' required={true} onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
              <label>
                Include adult results?
                  <input type='checkbox' checked={adult} onClick={setAdult} />
              </label>
              <button type='submit' >Search</button>
          </label>
        </form>
      </div>
    )
  }

}

export default SearchBar