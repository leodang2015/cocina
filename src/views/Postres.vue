<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <!-- Hero Banner Gourmet -->
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop" height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2">
            <div class="text-overline letter-spacing-2 text-amber-5">Repostería de Alta Escuela</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Postres de Autor</h1>
            <p class="text-subtitle1 text-grey-4 font-italic">Texturas equilibradas, chocolates de origen y el cierre dulce perfecto.</p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <!-- Plato de Firma (Chef Signature) -->
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="cake" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Creación Pastetera</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">La Joya Dulce</h2>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row no-wrap border-responsive items-center">
            <q-img :src="chefPostre.imagen" class="col-12 col-md-6" height="300px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Cacao 70% Origen</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefPostre.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefPostre.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Servido Tibio</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefPostre.precio }}</span>
                </div>
                <q-btn color="amber-7" text-color="grey-10" icon="icecream" label="Degustar Postre" class="text-bold q-px-md" unelevated />
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <!-- Menú General -->
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA CARTA DE REPOSTERÍA</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="row q-col-gutter-lg">
        <div v-for="(producto, index) in postres" :key="index" class="col-12 col-sm-6 col-md-4">
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
              <span class="text-h6 text-weight-bolder text-amber-4">{{ producto.precio }}</span>
              <q-btn flat round color="amber-5" icon="add_shopping_cart" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const chefPostre = {
  nombre: "Coulant de Chocolate & Fleur de Sel",
  descripcion: "Volcán de chocolate negro ecuatoriano 70% de cacao con corazón fluido, acompañado de quenelle de helado de vainilla Bourbon de Madagascar y escamas de sal marina.",
  precio: "$20.000",
  imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop"
}

const postres = [
  {
    nombre: "Cheesecake de Frutos Rojos y Cardamomo",
    descripcion: "Cremoso de queso estilo neoyorquino sobre sablée de almendras, compota de frambuesa fresca y perfume de cardamomo.",
    precio: "$16.500",
    etiqueta: "Fav del Chef",
    imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Tiramisú Tradicional al Marsala",
    descripcion: "Bizcochos Savoiardi embebidos en espresso Illy y licor Marsala, intercalados con mousse fina de mascarpone y cacao en polvo.",
    precio: "$17.000",
    etiqueta: "Receta Italiana",
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Tarta Tatin de Manzana",
    descripcion: "Manzanas caramelizadas en mantequilla de Normandía, horneadas invertidas sobre hojaldre crujiente con helado de canela.",
    precio: "$15.000",
    etiqueta: "Clásico Francés",
    imagen: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Panna Cotta de Vainilla & Mango",
    descripcion: "Postre cremoso piamontés a base de crema de leche fresca, vainilla natural en vaina y coulis de mango de azúcar.",
    precio: "$14.000",
    etiqueta: "Textura Suave",
    imagen: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=500&auto=format&fit=crop"
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