<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop"
        height="260px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5 text-bold">Carne 100% Black Angus</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Hamburguesas Gourmet</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Pan brioche artesanal, jugosa carne a la parrilla y combinaciones únicas.
            </p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <div class="q-mb-xl">
        <div class="text-center q-mb-lg">
          <q-icon name="lunch_dining" color="amber-5" size="28px" />
          <div class="text-caption text-uppercase letter-spacing-2 text-amber-5 text-bold">Favorita de la Casa</div>
          <h2 class="text-h4 text-weight-bold text-amber-1 q-my-none playfair-font">Hamburguesa Insignia</h2>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row items-center border-responsive">
            <q-img :src="destacado.imagen" class="col-12 col-md-6 chef-img" height="320px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-lg">
              <div class="text-overline text-amber-5 text-bold">Recomendación del Chef</div>
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
                  <q-btn color="amber-7" text-color="grey-10" icon="shopping_bag" label="Pedir Ahora"
                    class="text-bold q-px-md" unelevated />
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>

      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRAS HAMBURGUESAS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="q-mb-lg">
        <div class="row items-center q-gutter-sm q-mb-md">
          <q-btn v-for="cat in categoriasFiltro" :key="cat.value" :label="cat.label" :icon="cat.icon"
            :unelevated="filtroActivo === cat.value" :flat="filtroActivo !== cat.value"
            :class="['filter-btn', { 'filter-btn-active': filtroActivo === cat.value }]"
            @click="filtroActivo = cat.value" no-caps />
        </div>

        <div class="search-container">
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
              label="Notas (p. ej. término de la carne, sin cebolla)" />
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
  { label: 'TODAS', value: 'todos', icon: 'restaurant' },
  { label: 'MÁS PEDIDAS', value: 'Más pedido', icon: 'local_fire_department' },
  { label: 'RECOMENDADAS', value: 'Recomendada', icon: 'stars' },
  { label: 'NUEVAS', value: 'Nueva', icon: 'new_releases' }
]

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto
  instruccionesEspeciales.value = ''
  modalDetalle.value = true
}

const destacado = {
  nombre: "Truffle & Truffle Angus",
  descripcion: "200g de carne Angus, queso Gouda madurado, cebolla caramelizada al vino tinto, mayonesa de trufa negra y pan brioche artesanal.",
  precio: "$32.000",
  imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
  ingredientes: ["200g Carne Angus", "Queso Gouda", "Cebolla Caramelizada", "Mayonesa de Trufa", "Pan Brioche"]
}

const productos = [
  {
    nombre: "Classic Bacon Cheeseburger",
    descripcion: "180g de carne de res, queso cheddar fundido, doble tocineta crocante, pepinillos, lechuga y salsa especial.",
    precio: "$26.000",
    etiqueta: "Más pedido",
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Carne de Res 180g", "Cheddar", "Tocineta", "Pepinillos", "Salsa de la casa"]
  },
  {
    nombre: "Smoky BBQ Supreme",
    descripcion: "Carne a la parrilla, queso Jack ahumado, aros de cebolla crocantes, tocineta y salsa BBQ ahumada artesanal.",
    precio: "$28.000",
    etiqueta: "Recomendada",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgCjBXNP0Dgc0_ezyATJnjnxyz8-yN-pQpN5NHxrlAXljjE-ASMOlyXPE&s=10",
    ingredientes: ["Carne Parrillera", "Queso Jack", "Aros de Cebolla", "Salsa BBQ"]
  },
  {
    nombre: "Doble Smash Burger",
    descripcion: "Dos medallones smash de 100g, cuádruple queso americano, cebolla picada, pepinillos y mostaza artesanal.",
    precio: "$25.000",
    etiqueta: "Más pedido",
    imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["2 Medallones Smash", "Queso Americano", "Cebolla", "Pepinillos"]
  },
  {
    nombre: "Blue Cheese & Mushroom",
    descripcion: "Carne de res 180g, queso azul fundido, champiñones salteados en mantequilla de ajo y rúgula fresca.",
    precio: "$29.000",
    etiqueta: "Nueva",
    imagen: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Carne de Res 180g", "Queso Azul", "Champiñones al Ajo", "Rúgula"]
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
  object-fit: contain !important;
  object-position: center !important;
  background-size: contain !important;
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
  max-width: 380px;
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
</style>
