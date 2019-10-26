# MyFlix
![Screenshot](public/images/home.jpeg?raw=true "Title")
An app for film enthusiasts and collectors!
After you register you can explore a huge film library in a nice infinite scroller interface.
You can save all of your favourites to watch later; also while looking at a film detail hover over on an actor card and click the name to all of the films featuring that actor!
![Screenshot](public/images/cast.jpeg?raw=true "Title")
Don't know what to watch, try the **RANDOM** functionality, and every 4 seconds you'll be given ten random films to explore.

## Technical bits

Backend that deals with all of the calls and user authentications sits on a Rails project found [here](https://github.com/alexbujenita/my-flix-backend).
The FrontEnd uses:

 - React
 - CSS
 - Redux
 - Redux-Saga

By having a store manager the calls to retrieve the films has significantly dropped and also resulted in an improved performance.
![Screenshot](public/images/redux_store.jpeg?raw=true "Title")