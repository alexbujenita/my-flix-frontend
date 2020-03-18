import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, attr, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} {...attr}/>
        ) : (
          <Redirect to={{ pathname: '/'}} />
        )
      }
    />
  )
}

export default React.memo(PrivateRoute)
