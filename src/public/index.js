console.log("catoy")

function addToCart(id) {
    console.log(`${id} se agregara al carrito!`)
    Swal.fire({
    text: `${id} se agregara PRONTO al carrito! El programador aun esta en eso. Paciencia.`,
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: "bottom-left",
  }); 

}