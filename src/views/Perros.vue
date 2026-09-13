<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=1200&auto=format&fit=crop" height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold">Haute Cuisine Casual</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Perros de Autor</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Salchichas artesanales, panes brioche de masa madre y emulsiones hechas en casa.
            </p>
          </div>
        </div>
      </q-img>
    </div>
    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="restaurant" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Firma del Chef</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Creación Exclusiva</h2>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="chefDog.imagen" class="col-12 col-md-6 chef-img" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Edición Limitada</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefDog.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefDog.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Precio de Degustación</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefDog.precio }}</span>
                </div>
                <q-btn color="amber-7" text-color="grey-10" icon="restaurant_menu" label="Ordenar Creación" class="text-bold q-px-md" unelevated />
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA CARTA DE AUTOR</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>
      <div class="row q-col-gutter-lg items-stretch">
        <div v-for="(producto, index) in dogs" :key="index" class="col-12 col-sm-6 col-md-4 flex">
          <q-card class="card-gourmet bg-grey-9 text-grey-2 full-height full-width border-grey border-radius-md overflow-hidden flex column justify-between">
            
            <!-- Contenedor superior: Imagen fija y texto -->
            <div>
              <q-img 
                :src="producto.imagen" 
                height="220px" 
                fit="cover" 
                position="center" 
                class="full-width product-img"
              >
                <div v-if="producto.etiqueta" class="absolute-top-right bg-transparent q-pa-xs">
                  <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                    {{ producto.etiqueta }}
                  </q-chip>
                </div>
              </q-img>

              <q-card-section class="q-pb-none">
                <div class="text-h6 text-weight-bold text-amber-1 playfair-font q-mb-xs">{{ producto.nombre }}</div>
                <div class="text-body2 text-grey-4 font-light">{{ producto.descripcion }}</div>
              </q-card-section>
            </div>
            <q-card-actions class="row items-center justify-between q-px-md q-pb-md q-pt-lg">
              <span class="text-h6 text-weight-bold text-amber-4">{{ producto.precio }}</span>
            </q-card-actions>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
const chefDog = {
  nombre: "Trufa & Brie Haute Dog",
  descripcion: "Salchicha artesanal de ternera infusionada con romero, queso Brie derretido, láminas de trufa negra fresca, mermelada de cebolla frita al oporto y pan brioche horneado al momento.",
  precio: "$28.000",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUpfH3V-4c8-xjVxO8ECw-FNc1dswEjdqt1DiaNg-X7fGNYakUXfrgato&s=8"
}

const dogs = [
  {
    nombre: "Perro Campestre al Ahumado",
    descripcion: "Salchicha de cerdo marinada en finas hierbas, tocineta crocante ahumada con madera de roble y fondue de queso Gruyère.",
    precio: "$19.000",
    etiqueta: "Especialidad",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweSq4kAUpPFoX57593Y_wSytNGYJTzvFt27iA3hVinjulOUpX4ZXGNig&s=10"
  },
  {
    nombre: "Perro Suizo Glaseado",
    descripcion: "Salchicha suiza tradicional, queso Emmental gratinado, chutney de piña artesanal y lluvia de alioli de ajos asados.",
    precio: "$21.500",
    etiqueta: "Recomendado",
    imagen: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Perro Serrano & Jalapeño",
    descripcion: "Carne picada de res madurada, suero costeño batido con lima, pico de gallo con cilantro silvestre y crocante de maíz.",
    precio: "$22.000",
    etiqueta: "Toque Picante",
    imagen: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Perro Botánico Veggie",
    descripcion: "Salchicha de setas y portobellos, vegetales baby salteados en vino blanco, hummus de garbanzo y mayonesa vegetal.",
    precio: "$18.500",
    etiqueta: "Plant Based",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrBX8a2N1khxVyeiCtk15Dt2TNmFfGUrdmhTOcv0hkx6ge4SViBlGyQbOm&s=10"
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
  box-shadow: 0 12px 24px rgba(212, 175, 55, 0.2);
}
.product-img {
  height: 220px !important;
  max-height: 220px !important;
}
:deep(.product-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
  object-position: center !important;
  height: 220px !important;
}

:deep(.chef-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
}

@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}
</style>
