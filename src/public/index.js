console.log("catoy")

function addToCart(pid) {
  cartId="6461ab11c75bfb8f6f81a12f"
  
  const url = `http://localhost:8080/api/carrito/${cartId}/product/${pid}`
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
    } else {
      throw new Error('Error en la solicitud')
    }
  })
  .then(data => {
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