import React, { PureComponent } from 'react';

class ActorMovies extends PureComponent {
  state = {
    movies: []
  }

  // TRY With 1772

  componentDidMount() {
    const actorId = this.props.match.params.id;
    console.log(actorId);
    
  }

  render() {
    console.log(this.props)
    return (
      <h1>Oh LALA</h1>
    )
  }
}

export default ActorMovies;