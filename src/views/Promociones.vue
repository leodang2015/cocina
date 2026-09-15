<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
        height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold">Sabor para Compartir</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Combo Promociones</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Aprovecha nuestras super ofertas pensadas para compartir.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="full-width q-px-sm q-mt-xl">
      <div class="q-mb-xl q-mx-auto" style="max-width: 1400px;">
        <div class="text-center q-mb-lg">
          <q-icon name="local_offer" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Super Oferta</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Hamburguesa Insignia</h2>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="chefPromo.imagen" class="col-12 col-md-6 chef-img" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Edición Especial</div>
              <div class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-xs">{{ chefPromo.nombre }}</div>
              <p class="text-body1 text-grey-4 q-mb-md font-light">{{ chefPromo.descripcion }}</p>
              <q-separator color="grey-8" class="q-my-md" />
              <div class="row items-center justify-between">
                <div>
                  <span class="text-caption text-grey-5 block">Precio de Promoción</span>
                  <span class="text-h4 text-weight-bolder text-amber-4">{{ chefPromo.precio }}</span>
                </div>
                <div class="row items-center q-gutter-sm">
                  <q-btn flat round color="amber-5" icon="visibility" @click="abrirDetalle(chefPromo)" />
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">TODOS NUESTROS COMBOS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="q-mb-lg q-mx-auto" style="max-width: 1400px;">
        <div class="row items-center justify-between q-gutter-y-sm q-mb-md">
          <div class="row items-center q-gutter-xs">
            <q-btn v-for="cat in categoriasFiltro" :key="cat.value" :label="cat.label" :icon="cat.icon"
              :unelevated="filtroActivo === cat.value" :flat="filtroActivo !== cat.value"
              :class="['filter-btn', { 'filter-btn-active': filtroActivo === cat.value }]"
              @click="filtroActivo = cat.value" no-caps />
          </div>

          <div class="search-container">
            <q-input v-model="busqueda" placeholder="Buscar por texto o ingrediente..." dense dark outlined
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

        <div class="products-grid-4">
          <q-card v-for="(producto, index) in productosFiltrados" :key="index"
            class="card-narrow bg-grey-9 text-grey-2 border-grey border-radius-md overflow-hidden flex column justify-between">

            <div>
              <q-img :src="producto.imagen" height="180px" fit="cover" class="full-width product-img">
                <div v-if="producto.etiqueta" class="absolute-top-right bg-transparent q-pa-xs">
                  <q-chip color="amber-9" text-color="grey-1" size="xs" class="text-bold q-ma-none">
                    {{ producto.etiqueta }}
                  </q-chip>
                </div>
              </q-img>

              <q-card-section class="q-pa-sm">
                <div class="text-subtitle2 text-weight-bold text-amber-1 playfair-font title-clamp">{{ producto.nombre }}</div>
                <div class="text-caption text-grey-4 font-light desc-clamp q-mt-xs">{{ producto.descripcion }}</div>
              </q-card-section>
            </div>

            <q-card-actions class="row items-center justify-between q-px-sm q-pb-sm q-pt-none">
              <div>
                <div class="text-caption text-grey-5 uppercase" style="font-size: 0.65rem;">Precio COP</div>
                <span class="text-subtitle1 text-weight-bold text-amber-4">{{ producto.precio }}</span>
              </div>
              <q-btn flat round dense color="amber-5" icon="visibility" @click="abrirDetalle(producto)" />
            </q-card-actions>

          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="modalDetalle">
      <q-card class="bg-grey-9 text-grey-2 border-gold border-radius-lg overflow-hidden modal-amplio">
        <div class="relative-position bg-black">
          <q-img :src="productoSeleccionado.imagen" height="360px" fit="cover" class="full-width modal-img">
            <div v-if="productoSeleccionado.etiqueta" class="absolute-top-left bg-transparent q-pa-sm">
              <q-chip color="amber-9" text-color="grey-1" size="md" class="text-bold">
                ★ {{ productoSeleccionado.etiqueta }}
              </q-chip>
            </div>
          </q-img>
          <q-btn icon="close" flat round dense v-close-popup color="white" class="absolute-top-right q-ma-sm"
            style="background: rgba(0,0,0,0.6);" />
        </div>

        <q-card-section class="q-pa-lg">
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-h4 text-weight-bold text-amber-1 playfair-font">{{ productoSeleccionado.nombre }}</div>
            <div class="text-h4 text-weight-bolder text-amber-4">{{ productoSeleccionado.precio }}</div>
          </div>

          <q-separator color="amber-9" class="q-mb-md" />

          <div class="text-subtitle1 text-grey-3 font-light q-mb-lg leading-relaxed">
            {{ productoSeleccionado.descripcion }}
          </div>

          <div v-if="productoSeleccionado.ingredientes && productoSeleccionado.ingredientes.length" class="q-mb-md">
            <div class="text-subtitle1 text-amber-3 text-bold q-mb-sm flex items-center">
              <q-icon name="restaurant_menu" color="amber-5" size="20px" class="q-mr-xs" /> Ingredientes incluidos:
            </div>
            <div class="row q-gutter-sm">
              <q-chip v-for="(ing, idx) in productoSeleccionado.ingredientes" :key="idx" outline color="amber-5"
                text-color="grey-2" size="md" icon="check">
                {{ ing }}
              </q-chip>
            </div>
          </div>

          <div v-if="productoSeleccionado.incluye && productoSeleccionado.incluye.length" class="q-mb-md">
            <div class="text-subtitle1 text-amber-3 text-bold q-mb-sm flex items-center">
              <q-icon name="stars" color="amber-5" size="20px" class="q-mr-xs" /> Qué incluye esta promoción:
            </div>
            <div class="row q-gutter-sm">
              <q-chip v-for="(item, idx) in productoSeleccionado.incluye" :key="idx" outline color="amber-5"
                text-color="grey-2" size="md" icon="check">
                {{ item }}
              </q-chip>
            </div>
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
const busqueda = ref('')
const filtroActivo = ref('TODAS')

const categoriasFiltro = [
  { label: 'TODAS', value: 'TODAS', icon: 'apps' },
  { label: 'MÁS PEDIDAS', value: 'MAS_PEDIDAS', icon: 'local_fire_department' },
  { label: 'RECOMENDADAS', value: 'RECOMENDADAS', icon: 'thumb_up' },
  { label: 'NUEVAS', value: 'NUEVAS', icon: 'new_releases' }
]

const chefPromo = {
  nombre: "Hamburguesa Insignia Royale",
  descripcion: "Doble carne madurada de res, tocino ahumado al arce, queso cheddar fundido, cebolla caramelizada y salsa secreta de la casa en pan brioche artesanal.",
  precio: "$38.000",
  imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
  ingredientes: ["Carne madurada", "Tocino al arce", "Queso cheddar", "Cebolla caramelizada", "Pan brioche"],
  incluye: ["Hamburguesa Insignia", "Papas rústicas", "Gaseosa personal"]
}

const productos = ref([
  {
    nombre: "Combo Mega Familiar",
    descripcion: "2 Hamburguesas Clásicas + 2 Perros Sencillos + 1 Pizza Mediana + 1 Gaseosa 1.5L ideal para compartir en grupo.",
    precio: "$65.000",
    categoria: "MAS_PEDIDAS",
    etiqueta: "MÁS PEDIDA",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    ingredientes: ["Carne de res", "Salchicha premium", "Queso mozzarella", "Masa artesanal"],
    incluye: ["2 Hamburguesas", "2 Perros", "1 Pizza Mediana", "Gaseosa 1.5L"]
  },
  {
    nombre: "Combo Dúo Burger",
    descripcion: "2 Hamburguesas artesanales con carne de res, queso cheddar, lechuga fresca y tomate maduro.",
    precio: "$32.000",
    categoria: "RECOMENDADAS",
    etiqueta: "RECOMENDADA",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    ingredientes: ["Carne artesanal", "Queso cheddar", "Lechuga", "Tomate"],
    incluye: ["2 Hamburguesas", "Papas en cascos", "2 Bebidas 350ml"]
  },
  {
    nombre: "Combo Smoked BBQ",
    descripcion: "Hamburguesa con carne ahumada, aros de cebolla crujientes, doble queso fundido y salsa BBQ artesanal.",
    precio: "$28.000",
    categoria: "NUEVAS",
    etiqueta: "NUEVA",
    imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop",
    ingredientes: ["Carne ahumada", "Aros de cebolla", "Salsa BBQ", "Queso fundido"],
    incluye: ["Hamburguesa BBQ", "Papas francesas", "Gaseosa personal"]
  },
  {
    nombre: "Combo Perro Especial",
    descripcion: "Perro caliente gigante con salchicha suiza, queso fundido, tocino crujiente y papa fosforito.",
    precio: "$22.000",
    categoria: "MAS_PEDIDAS",
    etiqueta: "MÁS PEDIDA",
    imagen: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=1000&auto=format&fit=crop",
    ingredientes: ["Salchicha suiza", "Tocino crujiente", "Queso fundido", "Papa fosforito"],
    incluye: ["Perro Especial", "Papas francesas", "Gaseosa personal"]
  }
])

const productosFiltrados = computed(() => {
  return productos.value.filter(prod => {
    const coincideFiltro = filtroActivo.value === 'TODAS' || prod.categoria === filtroActivo.value
    const query = busqueda.value.toLowerCase().trim()
    
    if (!query) return coincideFiltro

    const coincideNombre = prod.nombre.toLowerCase().includes(query)
    const coincideDesc = prod.descripcion.toLowerCase().includes(query)
    const coincideIngredientes = prod.ingredientes && prod.ingredientes.some(ing => ing.toLowerCase().includes(query))

    return coincideFiltro && (coincideNombre || coincideDesc || coincideIngredientes)
  })
})

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto
  modalDetalle.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap');

.modal-amplio {
  width: 700px !important;
  max-width: 95vw !important;
}

.leading-relaxed {
  line-height: 1.6;
}

.products-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}

.card-narrow {
  width: 100%;
  height: 100%;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-narrow:hover {
  transform: translateY(-4px);
  border-color: #d4af37;
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.2);
}

.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.85rem;
  line-height: 1.2;
}

.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.75rem;
  line-height: 1.25;
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
  height: 180px !important;
}

:deep(.product-img .q-img__image) {
  background-size: cover !important;
  background-position: center center !important;
  object-fit: cover !important;
  object-position: center !important;
  height: 180px !important;
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

@media (max-width: 900px) {
  .products-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .products-grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
