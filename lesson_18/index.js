'use strict';

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve( {isAuth: true} );
  }, 2000);
})
  .then((authInfo) => 
    new Promise((resolve, reject) => {
         if (!authInfo.isAuth) {
                reject(null);
           } else {
               setTimeout(() => {
                resolve( {name: 'Max'} )
           }, 2000)
        };
   })
)
  .then((user) => console.log(user.name));
