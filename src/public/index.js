

const containerCarrito = document.querySelector("#items");
document.getElementById("cartButton").addEventListener("click",()=>populateCart())

async function populateCart(cid){
  cart=[]
  try {
    cid= '64718485d5276d27dfc25891'
    const url = `http://localhost:8080/api/carts/${cid}`
    const options = {
      method: 'GET' 
    }
    await fetch(url, options)
    .then((response)=>{
      // evaluate the API response
      if (!response.ok) throw new Error(response.message)
      return response.json()
    })
    .then(data=>{
    userCart= data.payload
    console.log(userCart)
    cart= userCart.products.map(item =>{
      return {
          quantity: item.quantity,
          title: item.product.title,
          price: item.product.price,
          total: item.quantity* item.product.price,
          thumbnails: item.product.thumbnails,
          code: item.product.code,
          productId: item.product._id.toString()
        }
      } )
      })

  } catch (error) {
    
  }

  let cuentaCarrito=0;
  containerCarrito.innerHTML = ""
//  totalCompra= pedido.reduce( (acum,elemento)=> acum+ elemento.total,0)
  cart.forEach(
      (elemento) => {
          cuentaCarrito+=1
          let lineasCarrito= document.createElement("tr")

          lineasCarrito.innerHTML = `
          <div class="itemCarrito">
              <div class="itemCarritoImg"><img src="${elemento.thumbnails}"></div>
              <div class="itemCarritoDet">
                  <div class="itemCarritoDetNom"><p>${elemento.title}</p></div>
                  <div class="itemCarritoCompra">
                      <div class="itemCompraDato itemCarritoPrecio">$${elemento.price}</div>
                      <div class="itemCompraDato itemCarritoTotal">$${elemento.total}</div>
                      <div class="itemCompraDato"><button id="eliminar-producto-${elemento.code}" type="button" class="btn btn-danger">
                          <i class="bi bi-trash-fill"></i></button></div>
                  </div>
              </div> 
          </div>`

        })

      
    }


function aplicar() {
  // get the selected category and order
  const catSelected = document.getElementById('categoria').value;
  const orderby = document.querySelector('input[name="orden"]:checked').value;
  let query = '?sort='+orderby
  if (catSelected!=="Todas") { query+= "&query=category:"+catSelected}
  window.location.href = "/"+query
}


function addToCart(cid, pid) {
  const url = `http://localhost:8080/api/carts/${cid}/product/${pid}`
  const data  = {quantity :1}
  const options = {
    method: 'PUT',
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
      '<input id="password" type="password" class="swal2-input" placeholder="Contraseña">'+
      '<HR><div><a href="/api/session/github"><button>Ingresar con GitHub</button></a></div>',
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
        if (!response.ok) { throw new Error("Usuario o Contraseña incorrecta") } 
           // Acepted..Redirect to main page
           window.location.href = "/"
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
          if (!response.ok) throw new Error("Ha ocurrido un error al registrar el usuario.") 
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
        }).catch(error =>{
          Swal.showValidationMessage(error.message)
        })
      }})
    }



  async function logout() {
    response= await fetch('/api/session/logout', { method: 'GET'})
    if (response.redirected) window.location.href = response.url

  }