<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <!-- Hero Banner Gourmet -->
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop" height="280px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5">Carne Angus & Wagyu</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Hamburguesas de Autor</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Cortes seleccionados, pan brioche de masa madre braseado y queso madurado artesanal.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      
      <!-- Plato Insignia del Chef -->
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="lunch_dining" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Firma del Chef</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">La Creación Insignia</h2>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row no-wrap border-responsive items-center">
            <q-img :src="chefBurger.imagen" class="col-12 col-md-6" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Edición Signature</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefBurger.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefBurger.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Blend 200g Wagyu</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefBurger.precio }}</span>
                </div>
                <q-btn color="amber-7" text-color="grey-10" icon="restaurant_menu" label="Pedir Creación" class="text-bold q-px-md" unelevated />
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA SELECCIÓN ARTESANAL</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="row q-col-gutter-lg">
        <div v-for="(producto, index) in burgers" :key="index" class="col-12 col-sm-6 col-md-4">
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
            </q-card-actions>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
const chefBurger = {
  nombre: "Truffle & Smoked Wagyu",
  descripcion: "200g de carne Wagyu madurada, láminas de queso Gruyère derretido, panceta crujiente ahumada al manzano, alioli de trufa negra fresca y cebolla caramelizada al vino Oporto en pan Brioche artesanal.",
  precio: "$34.000",
  imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop"
}

const burgers = [
  {
    nombre: "Camembert & Red Fruit",
    descripcion: "Medallón de Angus 180g, queso Camembert frito crujiente, mermelada artesanal de frutos del bosque al vino tinto y rúgula fresca.",
    precio: "$29.000",
    etiqueta: "Fav del Chef",
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Bacon & Cheddar Añejo",
    descripcion: "Blend de Picanha y Bife de chorizo, queso Cheddar madurado 12 meses, tocineta ahumada artesanal y salsa BBQ al bourbon.",
    precio: "$27.500",
    etiqueta: "Clásico Gourmet",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Blue Cheese & Pear",
    descripcion: "Carne Angus madurada, queso Roquefort D.O.P., peras glaseadas en mantequilla y canela, nueces garrapiñadas y dijon.",
    precio: "$31.000",
    etiqueta: "Sabor Intenso",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeCMvxtD_erMJzk70lC7q4mg-uo9z4LGm_ng2hQDFzvz6NMfuJahTTUWY&s=10"
  },
  {
    nombre: "Portobello Veggie",
    descripcion: "Hongo Portobello marinado a la parrilla, queso Provolone gratinado, tomates deshidratados, pesto de albahaca y pan de masa madre.",
    precio: "$26.000",
    etiqueta: "Plant Based",
    imagen: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=500&auto=format&fit=crop"
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
