


function addToCart(pid) {
  console.log('ca toy')
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
    console.log(response)
    if (response.redirected) {
      window.location.href = response.url
      }else{
        if (response.ok) {
          return response.json()
        }  else {
          throw new Error('Error en la solicitud')
        }
      }
    }
    ).then(data => {
    const contadorCarrito = document.getElementById('contadorCarrito');
    contadorCarrito.innerHTML= data.productsQty 
    console.log(data)
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
