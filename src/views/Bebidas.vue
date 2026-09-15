<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
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

      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTRA CARTA DE BEBIDAS</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <!-- Contenedor unificado para filtros, buscador y grid alineados al ras -->
      <div class="q-mb-lg q-mx-auto" style="max-width: 1400px;">
        <!-- Filtros y Búsqueda -->
        <div class="row items-center justify-between q-gutter-y-sm q-mb-md">
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
                <div class="text-subtitle2 text-weight-bold text-amber-1 playfair-font title-clamp">{{ producto.nombre
                  }}</div>
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

          <div v-if="productoSeleccionado.ingredientes && productoSeleccionado.ingredientes.length" class="q-mb-sm">
            <div class="text-subtitle1 text-amber-3 text-bold q-mb-sm flex items-center">
              <q-icon name="stars" color="amber-5" size="20px" class="q-mr-xs" /> Ingredientes Seleccionados:
            </div>
            <div class="row q-gutter-sm">
              <q-chip v-for="(item, idx) in productoSeleccionado.ingredientes" :key="idx" outline color="amber-5"
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
  modalDetalle.value = true
}

const destacado = {
  nombre: "Limonada de Coco & Menta",
  descripcion: "Leche de coco artesanal extraída diariamente en nuestra cocina, batida a la perfección con zumo fresco de limón criollo recién exprimido, un toque de jarabe de caña pura y macerado de hojas de menta fresca. Servida con hielo frappé en copa alta artesanal.",
  precio: "$14.000",
  imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
  ingredientes: ["Leche de Coco Artesanal", "Limón Criollo Exprimido", "Hojas de Menta Maceradas", "Jarabe de Caña", "Hielo Frappé"]
}

const productos = [
  {
    nombre: "Mojito Artesanal de Frutos Rojos",
    descripcion: "Una reinterpretación caribeña preparada con ron blanco de reserva infusionado, infusión concentrada de moras silvestre y fresas maduras maceradas al momento, menta recién cortada del huerto, zumo de limón verde y agua con gas burbujeante para dar frescura perfecta.",
    precio: "$25.000",
    etiqueta: "Coctel",
    imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Ron Blanco Reserva", "Macerado de Moras & Fresas", "Menta del Huerto", "Zumo de Limón Verde", "Soda Gasificada"]
  },
  {
    nombre: "Cerveza IPA Artesanal",
    descripcion: "Cerveza de elaboración local dorada e intensa, procesada con triples lúpulos aromáticos seleccionados a mano. Posee un cuerpo medio robusto con un perfil equilibrado de amargor frutal y notas cítricas persistentes en el paladar.",
    precio: "$16.000",
    etiqueta: "Cerveza",
    imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Lúpulos Cítricos Seleccionados", "Malta Dorada Especial", "Agua Manantial", "5.8% Vol. Alcohol"]
  },
  {
    nombre: "Soda Saborizada de Cítricos",
    descripcion: "Mezcla refrescante sin alcohol elaborada a base de néctar de maracuyá maduro, extracto natural de toronja rosada y rodajas de naranja fresca. Finalizada con agua de manantial con finas burbujas y decoración de hojas de menta.",
    precio: "$12.000",
    etiqueta: "Sin Alcohol",
    imagen: "https://thumbs.dreamstime.com/b/fizz-de-fruta-la-pasi%C3%B3n-tropical-servida-con-c%C3%ADtricos-frescos-ai-generativo-una-refrescante-bebida-se-presenta-en-un-vaso-lleno-390587915.jpg",
    ingredientes: ["Néctar de Maracuyá", "Extracto de Toronja Rosada", "Rodajas de Naranja Criolla", "Soda Burbujeante"]
  },
  {
    nombre: "Gaseosa Personal 350ml",
    descripcion: "Refresco clásico embotellado (disponible en variaciones Coca-Cola, Sprite o Cuatro) servido a temperatura bajo cero en vaso de cristal labrado, acompañado con hielo en cubos de agua purificada y una rodaja de limón fresco.",
    precio: "$6.000",
    etiqueta: "Sin Alcohol",
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop",
    ingredientes: ["Presentación 350ml Glass", "Hielo Purificado", "Rodaja de Limón"]
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

/* Tamaño ampliado del modal */
.modal-amplio {
  width: 700px !important;
  max-width: 95vw !important;
}

.leading-relaxed {
  line-height: 1.6;
}

/* Grid fija de 4 columnas */
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

/* Responsivo */
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
