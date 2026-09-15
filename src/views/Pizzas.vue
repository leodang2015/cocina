<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
        height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold">Masa Madre Fermentada 72 Horas</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Pizzas Artesanales</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Ingredientes importados de Italia horneados en piedra a alta temperatura.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="local_pizza" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Especial de la Casa</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Pizza Insignia</h2>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="destacado.imagen" class="col-12 col-md-6 chef-img" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Especialidad del Pizzaiolo</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ destacado.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ destacado.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Precio</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ destacado.precio }}</span>
                </div>
                <div class="row items-center q-gutter-sm">
                  <q-btn flat round color="amber-5" icon="visibility" @click="abrirDetalle(destacado)" />
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRAS PIZZAS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="q-mb-lg row items-center justify-between q-col-gutter-md">
        <div class="row items-center q-gutter-sm">
          <q-btn v-for="cat in categoriasFiltro" :key="cat.value" :label="cat.label" :icon="cat.icon"
            :unelevated="filtroActivo === cat.value" :flat="filtroActivo !== cat.value"
            :class="['filter-btn', { 'filter-btn-active': filtroActivo === cat.value }]"
            @click="filtroActivo = cat.value" no-caps />
        </div>

        <div class="search-container full-width-sm">
          <q-input v-model="busqueda" placeholder="Buscar por ingrediente o nombre..." dense dark outlined
            class="search-input">
            <template v-slot:prepend>
              <q-icon name="search" color="amber-5" />
            </template>
            <template v-slot:append v-if="busqueda">
              <q-icon name="close" class="cursor-pointer" @click="busqueda = ''" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="row q-col-gutter-lg items-stretch">
        <div v-for="(producto, index) in productosFiltrados" :key="index" class="col-12 col-sm-6 col-md-4 flex">
          <q-card
            class="card-gourmet bg-grey-9 text-grey-2 full-height full-width border-grey border-radius-md overflow-hidden flex column justify-between">
            <div>
              <q-img :src="producto.imagen" height="220px" fit="cover" position="center" class="full-width product-img">
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
      <q-card class="bg-grey-9 text-grey-2 border-gold border-radius-lg overflow-hidden"
        style="width: 500px; max-width: 90vw;">
        <div class="relative-position bg-black">
          <q-img :src="productoSeleccionado.imagen" height="260px" fit="cover" class="full-width modal-img">
            <div v-if="productoSeleccionado.etiqueta" class="absolute-top-left bg-transparent q-pa-xs">
              <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                ★ {{ productoSeleccionado.etiqueta }}
              </q-chip>
            </div>
          </q-img>
          <q-btn icon="close" flat round dense v-close-popup color="white" class="absolute-top-right q-ma-xs"
            style="background: rgba(0,0,0,0.6);" />
        </div>

        <q-card-section class="q-pt-md">
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-h5 text-weight-bold text-amber-1 playfair-font">{{ productoSeleccionado.nombre }}</div>
            <div class="text-h5 text-weight-bolder text-amber-4">{{ productoSeleccionado.precio }}</div>
          </div>

          <p class="text-body2 text-grey-4 font-light q-mb-md">{{ productoSeleccionado.descripcion }}</p>

          <div v-if="productoSeleccionado.ingredientes && productoSeleccionado.ingredientes.length" class="q-mb-md">
            <div class="text-subtitle2 text-amber-2 text-bold q-mb-xs">
              <q-icon name="stars" class="q-mr-xs" /> Ingredientes principales:
            </div>
            <div class="row q-gutter-xs">
              <q-chip v-for="(item, idx) in productoSeleccionado.ingredientes" :key="idx" outline color="amber-5"
                text-color="grey-2" size="sm" icon="check">
                {{ item }}
              </q-chip>
            </div>
          </div>

          <div class="q-mt-md">
            <q-input v-model="instruccionesEspeciales" outlined dense dark color="amber-5"
              label="Notas para el pedido (p. ej. sin picante, adición de queso)" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const modalDetalle = ref(false)
const productoSeleccionado = ref({})
const instruccionesEspeciales = ref('')

const filtroActivo = ref('todos')
const busqueda = ref('')

const categoriasFiltro = [
  { label: 'TODAS', value: 'todos', icon: 'local_pizza' },
  { label: 'TRADICIONALES', value: 'Tradicional', icon: 'star' },
  { label: 'GOURMET', value: 'Gourmet', icon: 'military_tech' },
  { label: 'VEGETARIANAS', value: 'Vegetariana', icon: 'eco' }
]

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto
  instruccionesEspeciales.value = ''
  modalDetalle.value = true
}

const destacado = {
  nombre: "Prosciutto Di Parma & Tartufata",
  descripcion: "Masa madre 72 horas, salsa de tomate San Marzano, Mozzarella di Bufala, Jamón Prosciutto di Parma D.O.P. y crema de trufa negra.",
  precio: "$38.000",
  imagen: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=600&auto=format&fit=crop",
  ingredientes: ["Prosciutto di Parma", "Aceite de Trufa", "Mozzarella di Bufala", "San Marzano"]
}

const productos = [
  {
    nombre: "Pepperoni & Honey Picante",
    descripcion: "Salsa de tomate napolitano, doble queso Mozzarella, pepperoni artesanal crocante y un toque de miel infusionada en ají.",
    precio: "$32.000",
    etiqueta: "Gourmet",
    imagen: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Pepperoni", "Miel Picante", "Mozzarella", "Tomate Napolitano"]
  },
  {
    nombre: "Margherita Verace D.O.P.",
    descripcion: "Tomates San Marzano, Mozzarella fior di latte, albahaca fresca fresca de huerta y aceite de oliva virgen extra.",
    precio: "$27.000",
    etiqueta: "Tradicional",
    imagen: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["San Marzano", "Mozzarella Fior di Latte", "Albahaca", "Aceite Oliva"]
  },
  {
    nombre: "Quattro Formaggi",
    descripcion: "Base blanca gourmet con Mozzarella, Gorgonzola D.O.P., Fontina y Parmigiano Reggiano rallado con nueces tostadas.",
    precio: "$35.000",
    etiqueta: "Gourmet",
    imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Gorgonzola", "Parmigiano", "Fontina", "Mozzarella", "Nueces"]
  },
  {
    nombre: "Huerta Veggie Supreme",
    descripcion: "Salsa de tomate artesanal, queso vegano o mozzarella, alcachofas, pimientos asados, champiñones y rúgula fresca.",
    precio: "$29.000",
    etiqueta: "Vegetariana",
    imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Alcachofas", "Pimientos Asados", "Champiñones", "Rúgula"]
  }
]

const productosFiltrados = computed(() => {
  return productos.filter(prod => {
    const texto = busqueda.value.toLowerCase().trim()
    const coincideTexto = !texto ||
      prod.nombre.toLowerCase().includes(texto) ||
      prod.descripcion.toLowerCase().includes(texto)

    let coincideFiltro = true
    if (filtroActivo.value !== 'todos') {
      coincideFiltro = prod.etiqueta === filtroActivo.value
    }

    return coincideTexto && coincideFiltro
  })
})
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

.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
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

:deep(.modal-img .q-img__image) {
  object-fit: cover !important;
  object-position: center !important;
  background-size: cover !important;
  background-position: center !important;
}

.filter-btn {
  color: #ffffff !important;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  border-radius: 20px;
  padding: 4px 16px;
  transition: all 0.2s ease-in-out;
}

.filter-btn:hover {
  background: rgba(255, 193, 7, 0.15) !important;
  color: #ffc107 !important;
}

.filter-btn-active {
  background-color: #ffc107 !important;
  color: #121212 !important;
  border-radius: 20px;
}

.search-container {
  width: 320px;
}

.search-input :deep(.q-field__inner) {
  border-radius: 6px;
}

.search-input :deep(.q-field__control) {
  background-color: #2b2b2b !important;
  border-radius: 6px;
  border: 1px solid #4f4f4f;
}

.search-input :deep(.q-field__control:before),
.search-input :deep(.q-field__control:after) {
  display: none;
}

.search-input :deep(input) {
  color: #e0e0e0 !important;
  font-size: 0.9rem;
}

.search-input :deep(input::placeholder) {
  color: #9e9e9e !important;
}

@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .full-width-sm {
    width: 100%;
  }
}
</style>
