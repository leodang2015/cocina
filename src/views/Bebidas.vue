<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop"
        height="320px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-lg">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold q-mb-xs">Refrescantes y Exclusivas</div>
            <h1 class="text-h2 text-weight-bolder q-my-sm playfair-font">Bebidas & Cocteles</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 650px; margin: 0 auto;">
              El maridaje perfecto para acompañar cualquiera de nuestros platos.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-lg q-mt-2xl" style="max-width: 1300px;">
      <div class="section-spacing">
        <div class="text-center q-mb-xl">
          <q-icon name="local_bar" color="amber-5" size="32px" class="q-mb-xs" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Coctel de la Casa</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-xs playfair-font">Bebida Insignia</h2>
          <div class="gold-line q-mx-auto q-mt-sm"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="destacado.imagen" class="col-12 col-md-6 chef-img" height="380px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-xl">
              <div class="text-overline text-amber-5 text-bold q-mb-xs">Mixología de Autor</div>
              <div class="text-h3 text-weight-bolder text-amber-1 playfair-font q-mb-sm">{{ destacado.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-lg font-light style-desc">{{ destacado.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-lg" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block uppercase">Precio</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ destacado.precio }}</span>
                </div>
                <div class="row items-center q-gutter-sm">
                  <q-btn flat round color="amber-5" icon="visibility" size="lg" @click="abrirDetalle(destacado)" />
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <div class="section-spacing text-center">
        <h2 class="text-h4 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA CARTA DE BEBIDAS</h2>
        <div class="gold-line q-mx-auto q-mt-sm"></div>
      </div>

      <div class="controls-wrapper q-mb-2xl">
        <div class="row items-center justify-center q-gutter-md q-mb-lg">
          <q-btn v-for="cat in categoriasFiltro" :key="cat.value" :label="cat.label" :icon="cat.icon"
            :unelevated="filtroActivo === cat.value" :flat="filtroActivo !== cat.value"
            :class="['filter-btn', { 'filter-btn-active': filtroActivo === cat.value }]"
            @click="filtroActivo = cat.value" no-caps />
        </div>

        <div class="search-container q-mx-auto">
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

      <div class="products-grid">
        <q-card v-for="(producto, index) in productosFiltrados" :key="index"
          class="card-gourmet bg-grey-9 text-grey-2 border-grey border-radius-md overflow-hidden">
          <div class="card-media">
            <q-img :src="producto.imagen" height="240px" fit="cover" class="full-width product-img">
              <div v-if="producto.etiqueta" class="absolute-top-right bg-transparent q-pa-sm">
                <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                  {{ producto.etiqueta }}
                </q-chip>
              </div>
            </q-img>
          </div>

          <q-card-section class="card-body q-pa-lg">
            <div class="text-h6 text-weight-bold text-amber-1 playfair-font q-mb-sm title-clamp">{{ producto.nombre }}</div>
            <div class="text-body2 text-grey-4 font-light desc-clamp">{{ producto.descripcion }}</div>
          </q-card-section>

          <q-card-actions class="card-footer row items-center justify-between q-px-lg q-pb-lg q-pt-none">
            <div>
              <div class="text-caption text-grey-5 uppercase">Precio COP</div>
              <span class="text-h6 text-weight-bold text-amber-4">{{ producto.precio }}</span>
            </div>
            <q-btn flat round color="amber-5" icon="visibility" @click="abrirDetalle(producto)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="modalDetalle">
      <q-card class="bg-grey-9 text-grey-2 border-gold border-radius-lg overflow-hidden"
        style="width: 540px; max-width: 90vw;">
        <div class="relative-position bg-black">
          <q-img :src="productoSeleccionado.imagen" height="280px" fit="contain" class="full-width modal-img">
            <div v-if="productoSeleccionado.etiqueta" class="absolute-top-left bg-transparent q-pa-sm">
              <q-chip color="amber-9" text-color="grey-1" size="sm" class="text-bold">
                ★ {{ productoSeleccionado.etiqueta }}
              </q-chip>
            </div>
          </q-img>
          <q-btn icon="close" flat round dense v-close-popup color="white" class="absolute-top-right q-ma-sm"
            style="background: rgba(0,0,0,0.6);" />
        </div>

        <q-card-section class="q-pa-lg">
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-h5 text-weight-bold text-amber-1 playfair-font">{{ productoSeleccionado.nombre }}</div>
            <div class="text-h5 text-weight-bolder text-amber-4">{{ productoSeleccionado.precio }}</div>
          </div>

          <p class="text-body2 text-grey-4 font-light q-mb-lg style-desc">{{ productoSeleccionado.descripcion }}</p>

          <div v-if="productoSeleccionado.ingredientes && productoSeleccionado.ingredientes.length" class="q-mb-lg">
            <div class="text-subtitle2 text-amber-2 text-bold q-mb-sm">
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

.q-mt-2xl {
  margin-top: 56px;
}

.q-mb-2xl {
  margin-bottom: 48px;
}

.section-spacing {
  margin-bottom: 48px;
}

.style-desc {
  line-height: 1.6;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

.card-gourmet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-gourmet:hover {
  transform: translateY(-6px);
  border-color: #d4af37;
  box-shadow: 0 16px 32px rgba(212, 175, 55, 0.18);
}

.card-body {
  flex-grow: 1;
}

.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
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
  width: 60px;
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

.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.product-img {
  height: 240px !important;
}

:deep(.product-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
  object-position: center !important;
  height: 240px !important;
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
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  border-radius: 20px;
  padding: 8px 22px;
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

.controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-container {
  width: 100%;
  max-width: 440px;
}

.search-input :deep(.q-field__inner) {
  border-radius: 8px;
}

.search-input :deep(.q-field__control) {
  background-color: #2b2b2b !important;
  border-radius: 8px;
  border: 1px solid #4f4f4f;
  padding: 4px 12px;
}

.search-input :deep(.q-field__control:before),
.search-input :deep(.q-field__control:after) {
  display: none;
}

.search-input :deep(input) {
  color: #e0e0e0 !important;
  font-size: 0.95rem;
}

.search-input :deep(input::placeholder) {
  color: #9e9e9e !important;
}

@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}
</style>
