<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <!-- Header Banner -->
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop"
        height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold">Refrescantes y Exclusivas</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Bebidas & Cocteles</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              El maridaje perfecto para acompañar cualquiera de nuestros platos.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Contenedor principal sin padding lateral extenso -->
    <div class="full-width q-px-sm q-mt-xl">
      <!-- Sección Destacado -->
      <div class="q-mb-xl q-mx-auto" style="max-width: 1400px;">
        <div class="text-center q-mb-lg">
          <q-icon name="local_bar" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Coctel de la Casa</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Bebida Insignia</h2>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="destacado.imagen" class="col-12 col-md-6 chef-img" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Mixología de Autor</div>
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

      <!-- Filtros y Búsqueda -->
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA CARTA DE BEBIDAS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="q-mb-lg q-mx-auto" style="max-width: 1400px;">
        <div class="row items-center justify-between q-gutter-y-sm">
          <div class="row items-center q-gutter-xs">
            <q-btn v-for="cat in categoriasFiltro" :key="cat.value" :label="cat.label" :icon="cat.icon"
              :unelevated="filtroActivo === cat.value" :flat="filtroActivo !== cat.value"
              :class="['filter-btn', { 'filter-btn-active': filtroActivo === cat.value }]"
              @click="filtroActivo = cat.value" no-caps />
          </div>

          <div class="search-container">
            <q-input v-model="busqueda" placeholder="Buscar bebida..." dense dark outlined class="search-input">
              <template v-slot:prepend>
                <q-icon name="search" color="amber-5" />
              </template>
              <template v-slot:append v-if="busqueda">
                <q-icon name="close" class="cursor-pointer" @click="busqueda = ''" />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <!-- Grid forzada exactamente a 4 columnas sin espacios laterales excesivos -->
      <div class="products-grid-4">
        <q-card v-for="(producto, index) in productosFiltrados" :key="index"
          class="card-gourmet bg-grey-9 text-grey-2 border-grey border-radius-md overflow-hidden">
          <div class="card-media">
            <q-img :src="producto.imagen" height="190px" fit="cover" class="full-width product-img">
              <div v-if="producto.etiqueta" class="absolute-top-right bg-transparent q-pa-xs">
                <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                  {{ producto.etiqueta }}
                </q-chip>
              </div>
            </q-img>
          </div>

          <q-card-section class="card-body q-pa-sm">
            <div class="text-subtitle1 text-weight-bold text-amber-1 playfair-font q-mb-xs title-clamp">{{ producto.nombre }}</div>
            <div class="text-caption text-grey-4 font-light desc-clamp">{{ producto.descripcion }}</div>
          </q-card-section>

          <q-card-actions class="card-footer row items-center justify-between q-px-sm q-pb-sm q-pt-none">
            <div>
              <div class="text-caption text-grey-5 uppercase" style="font-size: 0.65rem;">Precio COP</div>
              <span class="text-subtitle1 text-weight-bold text-amber-4">{{ producto.precio }}</span>
            </div>
            <q-btn flat round dense color="amber-5" icon="visibility" @click="abrirDetalle(producto)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Modal Detalle -->
    <q-dialog v-model="modalDetalle">
      <q-card class="bg-grey-9 text-grey-2 border-gold border-radius-lg overflow-hidden"
        style="width: 500px; max-width: 90vw;">
        <div class="relative-position bg-black">
          <q-img :src="productoSeleccionado.imagen" height="260px" fit="contain" class="full-width modal-img">
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
              <q-icon name="stars" class="q-mr-xs" /> Ingredientes:
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
              label="Notas para el pedido (p. ej. con mucho hielo, endulzante)" />
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
  { label: 'TODAS', value: 'todos', icon: 'local_bar' },
  { label: 'COCTELES', value: 'Coctel', icon: 'liquor' },
  { label: 'CERVEZAS', value: 'Cerveza', icon: 'sports_bar' },
  { label: 'JUGOS & GASEOSAS', value: 'Sin Alcohol', icon: 'local_drink' }
]

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto
  instruccionesEspeciales.value = ''
  modalDetalle.value = true
}

const destacado = {
  nombre: "Limonada de Coco & Menta",
  descripcion: "Leche de coco artesanal, zumo de limón criollo recién exprimido y hojas de menta maceradas servidas con hielo frappé.",
  precio: "$14.000",
  imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
  ingredientes: ["Leche de Coco", "Limón Criollo", "Menta Fresca", "Hielo Frappé"]
}

const productos = [
  {
    nombre: "Mojito Artesanal de Frutos Rojos",
    descripcion: "Ron blanco premium, macerado de moras y fresas, menta fresca, limón y soda burbujeante.",
    precio: "$25.000",
    etiqueta: "Coctel",
    imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Ron Blanco", "Moras & Fresas", "Menta", "Soda"]
  },
  {
    nombre: "Cerveza IPA Artesanal",
    descripcion: "Cerveza dorada de cuerpo medio, con amargor equilibrado e intensos aromas a lúpulo cítrico.",
    precio: "$16.000",
    etiqueta: "Cerveza",
    imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Lúpulo Cítrico", "Cebada Malteada", "5.8% Alc"]
  },
  {
    nombre: "Soda Saborizada de Cítricos",
    descripcion: "Combinación refrescante de maracuyá, naranja y toronja macerada en agua con gas.",
    precio: "$12.000",
    etiqueta: "Sin Alcohol",
    imagen: "https://thumbs.dreamstime.com/b/fizz-de-fruta-la-pasi%C3%B3n-tropical-servida-con-c%C3%ADtricos-frescos-ai-generativo-una-refrescante-bebida-se-presenta-en-un-vaso-lleno-390587915.jpg",
    ingredientes: ["Maracuyá", "Toronja", "Naranja", "Soda"]
  },
  {
    nombre: "Gaseosa Personal 350ml",
    descripcion: "Coca-Cola, Sprite o Cuatro bien fría servida con vaso con hielo y rodaja de limón.",
    precio: "$6.000",
    etiqueta: "Sin Alcohol",
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["350ml", "Servida helada"]
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

/* Grid fija de 4 columnas */
.products-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}

.card-gourmet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-gourmet:hover {
  transform: translateY(-4px);
  border-color: #d4af37;
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.2);
}

.card-body {
  flex-grow: 1;
}

.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
}

.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

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
  border-radius: 8px;
}

.font-light {
  font-weight: 300;
}

.font-italic {
  font-style: italic;
}

.uppercase {
  text-transform: uppercase;
}

.product-img {
  height: 190px !important;
}

:deep(.product-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
  object-position: center !important;
  height: 190px !important;
}

:deep(.chef-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
}

:deep(.modal-img .q-img__image) {
  object-fit: contain !important;
  object-position: center !important;
  background-size: contain !important;
  background-position: center !important;
}

.filter-btn {
  color: #ffffff !important;
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  border-radius: 16px;
  padding: 2px 10px;
  transition: all 0.2s ease-in-out;
}

.filter-btn:hover {
  background: rgba(255, 193, 7, 0.15) !important;
  color: #ffc107 !important;
}

.filter-btn-active {
  background-color: #ffc107 !important;
  color: #121212 !important;
  border-radius: 16px;
}

.search-container {
  width: 280px;
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
  font-size: 0.85rem;
}

.search-input :deep(input::placeholder) {
  color: #9e9e9e !important;
}

/* Responsivo para móviles y tabletas */
@media (max-width: 1024px) {
  .products-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .border-responsive {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .products-grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
