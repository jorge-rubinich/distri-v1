function aplicar() {
  // get the selected category and order
  const catSelected = document.getElementById('categoria').value;
  const orderby = document.querySelector('input[name="orden"]:checked').value;
  let query = '?sort='+orderby
  if (catSelected!=="Todas") { query+= "&query=category:"+catSelected}
  window.location.href = "/"+query
}


function addToCart(pid) {
  const url = `http://localhost:8080/api/carrito/product/${pid}`
  const data  = {quantity :1}
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data) 
  }
  fetch(url, options)
  .then(response => {
        if (response.ok) {
          return response.json()
        }  else {
          throw new Error('Error en la solicitud')
        }
      }).then(data => {
    const contadorCarrito = document.getElementById('contadorCarrito');
    contadorCarrito.innerHTML= data.productsQty 
    Swal.fire({
      text: `Producto #${pid} ha sido agregado al carrito.`,
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      position: "bottom-left",
    })
  })
  .catch(error => {
    console.error(error); // Maneja los errores de la solicitud
  });

}


function deleteFromCart(pid) {
  const url = `http://localhost:8080/api/carrito/product/${pid}`

  const options = {
    method: 'DELETE' 
  }
  fetch(url, options)
  .then(response => {
        if (response.ok) {
          return response.json()
        }  else {
          throw new Error('Error en la solicitud')
        }
      }).then(data => {
    const contadorCarrito = document.getElementById('contadorCarrito');
    Swal.fire({
      text: `Producto #${pid} ha sido eliminado carrito.`,
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      position: "bottom-left",
    })
    window.location.href = "/"
  })
  .catch(error => {
    console.error(error); // Maneja los errores de la solicitud
  });

}


async function login() {
  event.preventDefault()
   Swal.fire({
    title: 'Iniciar sesión',
    html:
      '<input id="email" class="swal2-input" placeholder="Correo electrónico">' +
      '<input id="password" type="password" class="swal2-input" placeholder="Contraseña">',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: async () => {
      const email = Swal.getPopup().querySelector('#email').value
      const password = Swal.getPopup().querySelector('#password').value
      return await fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'content-type': 'application/json'}
      }) .then((response)=>{
         // evaluate the API response
        if (!response.ok) {
          throw new Error("Usuario o Contraseña incorrecta")
      } 
           // Acepted..Redirect to main page
           window.location.href = response.url
      }). catch(error =>{
        Swal.showValidationMessage(error.message)
      })
    }})
  }


  async function register() {
    event.preventDefault()
     Swal.fire({
      title: 'Registrate',
      html:
        '<input id="first_name" class="swal2-input" placeholder="Nombre">' +
        '<input id="last_name" class="swal2-input" placeholder="Apellido">'+
        '<input id="email" class="swal2-input" placeholder="Correo electrónico">' +
        '<input id="password" type="password" class="swal2-input" placeholder="Contraseña">',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: async () => {
        const first_name = Swal.getPopup().querySelector('#first_name').value
        const last_name = Swal.getPopup().querySelector('#last_name').value
        const email = Swal.getPopup().querySelector('#email').value
        const password = Swal.getPopup().querySelector('#password').value

        return await fetch('/api/session/register', {
          method: 'POST',
          body: JSON.stringify({first_name, last_name, email, password}),
          headers: {'content-type': 'application/json'}
        }) .then((response)=>{
          console.log(response)
           // if !ok . .
          if (!response.ok) throw new Error(response.message) 
             // Acepted..Redirect to main page
             //window.location.href = response.url
             Swal.fire({
              text: `Usuario ${email} creado correctamente. Ahora inicia sesión para comprar.`,
              toast: true,
              background: '#9fdf9f',
              showConfirmButton: false,
              timer: 3000,
              position: "top-right",
            })
        }). catch(error =>{
          Swal.showValidationMessage(error.message)
        })
      }})
    }



  async function logout() {
    response= await fetch('/api/session/logout', { method: 'GET'})
    if (response.redirected) window.location.href = response.url

  }