<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <!-- Hero Banner Gourmet -->
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop" height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2">
            <div class="text-overline letter-spacing-2 text-amber-5">Masa Madre de 72 Horas</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Pizzas Napoletanas</h1>
            <p class="text-subtitle1 text-grey-4 font-italic">Cocidas a 450°C en horno de piedra con ingredientes importados de Italia.</p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <!-- Plato de Firma (Chef Signature) -->
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="local_pizza" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Firma del Pizzaiolo</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Especialidad de la Casa</h2>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row no-wrap border-responsive items-center">
            <q-img :src="chefPizza.imagen" class="col-12 col-md-6" height="300px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Selección Gourmet</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefPizza.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefPizza.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Precio Pizza Personal</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefPizza.precio }}</span>
                </div>
                <q-btn color="amber-7" text-color="grey-10" icon="restaurant_menu" label="Pedir a la Leña" class="text-bold q-px-md" unelevated />
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <!-- Menú General -->
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRAS PIZZAS ARTESANALES</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="row q-col-gutter-lg">
        <div v-for="(producto, index) in pizzas" :key="index" class="col-12 col-sm-6 col-md-4">
          <q-card class="card-gourmet bg-grey-9 text-grey-2 full-height flex flex-center column justify-between border-grey border-radius-md">
            <q-img :src="producto.imagen" height="220px" fit="cover">
              <div v-if="producto.etiqueta" class="absolute-top-right bg-transparent q-pa-xs">
                <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                  {{ producto.etiqueta }}
                </q-chip>
              </div>
            </q-img>

            <q-card-section class="full-width q-pb-none">
              <div class="text-h6 text-weight-bold text-amber-1 playfair-font q-mb-xs">{{ producto.nombre }}</div>
              <div class="text-body2 text-grey-4 font-light">{{ producto.descripcion }}</div>
            </q-card-section>

            <q-card-actions class="full-width row items-center justify-between q-px-md q-pb-md q-pt-lg">
              <span class="text-h6 text-weight-bold text-amber-4">{{ producto.precio }}</span>
              <q-btn flat round color="amber-5" icon="add_shopping_cart" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const chefPizza = {
  nombre: "Prosciutto Di Parma & Tartufata",
  descripcion: "Masa madre de fermentación lenta, Mozzarella di Bufala Campana, madurado de Prosciutto di Parma, finas láminas de Parmigiano Reggiano, rúgula silvestre y aceite perfumado con trufa blanca.",
  precio: "$38.000",
  imagen: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=600&auto=format&fit=crop"
}

const pizzas = [
  {
    nombre: "Quattro Formaggi Nobile",
    descripcion: "Base blanca de Gorgonzola D.O.P., Mozzarella di Bufala, Fontina ahumado y velo de Parmesano con hilos de miel de acacia.",
    precio: "$34.000",
    etiqueta: "Gran Sabor",
    imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Pepperoni Artigianale",
    descripcion: "Salsa de tomate San Marzano, Mozzarella fior di latte, Pepperoni artesanal especiado y gotas de miel de chiles picantes.",
    precio: "$31.000",
    etiqueta: "Clásico de Casa",
    imagen: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Diavola Calabrese",
    descripcion: "Salsa pomodoro natural, Nduja picante de Calabria, Salami picante, hojuelas de chile rojo y albahaca fresca.",
    precio: "$33.000",
    etiqueta: "Picante Intenso",
    imagen: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Margherita Verace",
    descripcion: "Tomates San Marzano D.O.P., Mozzarella di Bufala fresca, hojas de albahaca orégano de montaña y aceite de oliva virgen extra.",
    precio: "$27.000",
    etiqueta: "Tradición",
    imagen: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop"
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap');

.playfair-font {
  font-family: 'Playfair Display', Georgia, serif;
}
.letter-spacing-2 {
  letter-spacing: 2px;
}
.bg-overlay {
  background: rgba(15, 15, 15, 0.75);
}
.border-gold {
  border: 1px solid #d4af37;
}
.border-grey {
  border: 1px solid #333333;
}
.gold-line {
  width: 50px;
  height: 2px;
  background-color: #d4af37;
}
.border-radius-lg {
  border-radius: 16px;
}
.border-radius-md {
  border-radius: 12px;
}
.font-light {
  font-weight: 300;
}
.font-italic {
  font-style: italic;
}
.card-gourmet {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card-gourmet:hover {
  transform: translateY(-6px);
  border-color: #d4af37;
  box-shadow: 0 12px 24px rgba(0,0,0,0.5);
}
@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}
</style>