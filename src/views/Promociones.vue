<template>
  <CategoriaLayout
    titulo="Combo Promociones"
    descripcion="Aprovecha nuestras super ofertas pensadas para compartir."
    bannerImg="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
    :recomendacionChef="chefPromo"
    :productos="promos"
  />
</template>

<script setup>

const chefPromo = {
  nombre: "Mega Combo Familiar",
  descripcion: "2 Hamburguesas Clásicas + 2 Perros Sencillos + 1 Pizza Mediana + 1 Gaseosa 1.5L.",
  precio: "$65.000",
  imagen: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop"
}

const promos = [
  {
    nombre: "Combo Pareja",
    descripcion: "2 Hamburguesas Clásicas + Porción Grande de Papas + 2 Gaseosas 350ml.",
    precio: "$38.000",
    etiqueta: "Más pedido",
    imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Combo Perro + Papa",
    descripcion: "1 Perro Suizo Extra + Papas a la francesa + Gaseosa 350ml.",
    precio: "$22.000",
    etiqueta: "Nuevo",
    imagen: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Pizza Party",
    descripcion: "2 Pizzas Grandes de cualquier sabor + 1 Gaseosa 1.5L.",
    precio: "$52.000",
    etiqueta: "",
    imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Dupla Cervecera",
    descripcion: "2 Hamburguesas BBQ + 2 Cervezas Artesanales.",
    precio: "$42.000",
    etiqueta: "",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop"
  }
]
</script>
