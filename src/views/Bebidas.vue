<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop" height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2">
            <div class="text-overline letter-spacing-2 text-amber-5">Mixología & Maridaje</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Elixir & Refrescos</h1>
            <p class="text-subtitle1 text-grey-4 font-italic">Infusiones de botánicos, frutas de temporada y cócteles artesanales sin alcohol.</p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="local_bar" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Creación del Mixólogo</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Bebida Insignia</h2>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row no-wrap border-responsive items-center">
            <q-img :src="chefBebida.imagen" class="col-12 col-md-6" height="300px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Signature Mocktail</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefBebida.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefBebida.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Servido Helado</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefBebida.precio }}</span>
                </div>
                <div class="row items-center q-gutter-sm">
                  <q-btn flat round color="amber-5" icon="visibility" @click="abrirDetalle(chefBebida)" />
                  <q-btn color="amber-7" text-color="grey-10" icon="local_drink" label="Pedir Coctel" class="text-bold q-px-md" unelevated />
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">CARTA DE BEBIDAS Y REFRESHERS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="row q-col-gutter-lg">
        <div v-for="(producto, index) in bebidas" :key="index" class="col-12 col-sm-6 col-md-4">
          <q-card class="card-gourmet bg-grey-9 text-grey-2 full-height flex flex-center column justify-between border-grey border-radius-md overflow-hidden">
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
              <div>
                <div class="text-caption text-grey-5 uppercase">Precio COP</div>
                <span class="text-h6 text-weight-bold text-amber-4">{{ producto.precio }}</span>
              </div>
              <q-btn flat round color="amber-5" icon="visibility" @click="abrirDetalle(producto)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="modalDetalle">
      <q-card class="bg-grey-9 text-grey-2 border-gold border-radius-lg overflow-hidden" style="width: 500px; max-width: 90vw;">
        <div class="relative-position bg-black">
          <q-img :src="productoSeleccionado.imagen" height="260px" fit="contain" class="full-width modal-img">
            <div v-if="productoSeleccionado.etiqueta" class="absolute-top-left bg-transparent q-pa-xs">
              <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                ★ {{ productoSeleccionado.etiqueta }}
              </q-chip>
            </div>
          </q-img>
          <q-btn icon="close" flat round dense v-close-popup color="white" class="absolute-top-right q-ma-xs" style="background: rgba(0,0,0,0.6);" />
        </div>

        <q-card-section class="q-pt-md">
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-h5 text-weight-bold text-amber-1 playfair-font">{{ productoSeleccionado.nombre }}</div>
            <div class="text-h5 text-weight-bolder text-amber-4">{{ productoSeleccionado.precio }}</div>
          </div>

          <p class="text-body2 text-grey-4 font-light q-mb-md">{{ productoSeleccionado.descripcion }}</p>

          <div v-if="productoSeleccionado.ingredientes && productoSeleccionado.ingredientes.length" class="q-mb-md">
            <div class="text-subtitle2 text-amber-2 text-bold q-mb-xs">
              <q-icon name="list_alt" class="q-mr-xs" /> Ingredientes incluidos:
            </div>
            <div class="row q-gutter-xs">
              <q-chip 
                v-for="(ing, idx) in productoSeleccionado.ingredientes" 
                :key="idx" 
                outline 
                color="amber-5" 
                text-color="grey-2" 
                size="sm" 
                icon="check"
              >
                {{ ing }}
              </q-chip>
            </div>
          </div>

          <div class="q-mt-md">
            <q-input 
              v-model="instruccionesEspeciales" 
              outlined 
              dense 
              dark 
              color="amber-5" 
              label="Instrucciones especiales para cocina (opcional)" 
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const modalDetalle = ref(false)
const productoSeleccionado = ref({})
const instruccionesEspeciales = ref('')

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto
  instruccionesEspeciales.value = ''
  modalDetalle.value = true
}

const chefBebida = {
  nombre: "Limonada de Coco & Jengibre",
  descripcion: "Extracción fresca de limones Tahití, reducción de leche de coco artesanal, toque de jengibre fresco procesado al momento y borde escarchado en flor de sal.",
  precio: "$14.000",
  imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
  ingredientes: ["Limón Tahití", "Leche de coco artesanal", "Jengibre fresco", "Flor de sal"]
}

const bebidas = [
  {
    nombre: "Té Frío de Frutos del Bosque",
    descripcion: "Infusión de té negro Ceylon con macerado orgánico de moras silvestre, frambuesas y toque de romero.",
    precio: "$11.000",
    etiqueta: "Muy Refrescante",
    imagen: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Té negro Ceylon", "Macerado de moras", "Frambuesas frescas", "Romero"]
  },
  {
    nombre: "Jugo de Maracuyá & Albahaca",
    descripcion: "Néctar concentrado de maracuyá de cultivo local batido con hojas frescas de albahaca y almíbar orgánico.",
    precio: "$10.500",
    etiqueta: "100% Natural",
    imagen: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Maracuyá natural", "Hojas de albahaca", "Almíbar orgánico", "Hielo picado"]
  },
  {
    nombre: "Cerveza IPA de la Casa",
    descripcion: "Cerveza artesanal de autor tipo India Pale Ale, notas cítricas a maracuyá y amargor equilibrado.",
    precio: "$15.000",
    etiqueta: "Artesanal",
    imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Lúpulos seleccionados", "Cebada malteada", "Notas cítricas de maracuyá"]
  },
  {
    nombre: "Agua Mineral San Pellegrino",
    descripcion: "Agua de manantial natural ligeramente gasificada importada de los Alpes Italianos (500ml).",
    precio: "$9.000",
    etiqueta: "Importado",
    imagen: "https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Agua mineral con gas de manantial natural"]
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
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
:deep(.modal-img .q-img__image) {
  object-fit: contain !important;
  object-position: center !important;
  background-size: contain !important;
  background-position: center !important;
}
@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}
</style>
