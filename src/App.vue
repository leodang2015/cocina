<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-10 text-grey-2">
    
    <!-- BARRA SUPERIOR DE NAVEGACIÓN -->
    <q-header class="bg-grey-10 text-grey-2 border-bottom-gold" elevated>
      <q-toolbar class="container q-mx-auto" style="max-width: 1200px;">
        <q-toolbar-title class="flex items-center cursor-pointer" @click="$router.push('/')">
          <q-icon name="restaurant" color="amber-5" size="28px" class="q-mr-sm" />
          <span class="playfair-font text-weight-bolder text-amber-2 text-h5 letter-spacing-1">
            HAUTE CUISINE
          </span>
        </q-toolbar-title>

        <!-- Navegación Escritorio -->
        <div class="gt-sm row items-center q-gutter-sm">
          <q-btn flat no-caps label="Inicio" to="/" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Hamburguesas" to="/hamburguesas" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Pizzas" to="/pizzas" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Perros" to="/perros" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Bebidas" to="/bebidas" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Postres" to="/postres" class="nav-link text-bold" active-class="nav-active" />
          <q-btn flat no-caps label="Nosotros" to="/nosotros" class="nav-link text-bold" active-class="nav-active" />
          
          <q-btn outline color="amber-5" icon="book" label="Carta Digital" class="q-ml-sm border-radius-md" />
        </div>

        <!-- Botón Menú Móvil -->
        <q-btn flat round icon="menu" color="amber-5" class="lt-md" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>

    <!-- MENÚ DESPLEGABLE MÓVIL -->
    <q-drawer v-model="drawer" side="right" class="bg-grey-9 text-grey-2 border-gold-left" behavior="mobile">
      <q-scroll-area class="fit q-pa-md">
        <div class="text-center q-mb-lg q-pt-md">
          <q-icon name="restaurant" color="amber-5" size="36px" />
          <div class="playfair-font text-h6 text-amber-2 text-weight-bold q-mt-xs">HAUTE CUISINE</div>
          <div class="gold-line q-mx-auto q-mt-xs"></div>
        </div>

        <q-list class="text-grey-3">
          <q-item clickable v-ripple to="/" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="home" color="amber-5" /></q-item-section>
            <q-item-section>Inicio</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/hamburguesas" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="lunch_dining" color="amber-5" /></q-item-section>
            <q-item-section>Hamburguesas</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/pizzas" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="local_pizza" color="amber-5" /></q-item-section>
            <q-item-section>Pizzas Artesanales</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/perros" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="hot_dog" color="amber-5" /></q-item-section>
            <q-item-section>Perros de Autor</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/bebidas" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="local_bar" color="amber-5" /></q-item-section>
            <q-item-section>Bebidas y Elixires</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/postres" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="cake" color="amber-5" /></q-item-section>
            <q-item-section>Postres</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/nosotros" active-class="text-amber-4 text-bold">
            <q-item-section avatar><q-icon name="info" color="amber-5" /></q-item-section>
            <q-item-section>Nosotros</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- SECCIÓN BIENVENIDA ESTILO FOLLETO (Sólo visible en el inicio) -->
    <q-page-container>
      <div v-if="$route.path === '/'" class="folleto-welcome q-pb-xl">
        
        <!-- Hero Portada del Folleto -->
        <div class="folleto-hero relative-position flex flex-center">
          <q-img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop" height="420px" fit="cover">
            <div class="absolute-full bg-overlay flex flex-center">
              <div class="text-center text-amber-2 q-px-md folleto-frame">
                <div class="text-overline letter-spacing-2 text-amber-5 text-bold">BIENVENIDO A NUESTRA MESA</div>
                <h1 class="text-h2 text-weight-bolder playfair-font q-my-sm">Haute Cuisine</h1>
                <p class="text-subtitle1 text-grey-3 font-italic" style="max-width: 650px; margin: 0 auto;">
                  "Una experiencia donde la comida rápida de autor se encuentra con el rigor de la alta gastronomía."
                </p>
                <div class="q-mt-lg row justify-center q-gutter-md">
                  <q-btn color="amber-7" text-color="grey-10" label="Ver Hamburguesas" to="/hamburguesas" class="text-bold q-px-lg" unelevated />
                  <q-btn outline color="amber-5" label="Conocer Historias" to="/nosotros" class="q-px-lg" />
                </div>
              </div>
            </div>
          </q-img>
        </div>

        <!-- Tríptico del Folleto / Secciones Destacadas -->
        <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
          <div class="text-center q-mb-xl">
            <span class="text-caption text-amber-5 text-bold letter-spacing-2 text-uppercase">Carta de Presentación</span>
            <h2 class="text-h4 text-weight-bold text-amber-1 playfair-font q-my-xs">Nuestras Especialidades</h2>
            <div class="gold-line q-mx-auto q-mt-xs"></div>
          </div>

          <div class="row q-col-gutter-lg">
            <!-- Columna 1 del Folleto -->
            <div class="col-12 col-md-4">
              <q-card class="bg-grey-9 text-grey-2 border-gold full-height text-center q-pa-md card-folleto">
                <q-card-section>
                  <q-avatar size="56px" color="grey-10" text-color="amber-5" class="border-gold q-mb-md">
                    <q-icon name="lunch_dining" size="28px" />
                  </q-avatar>
                  <div class="text-h6 playfair-font text-amber-2 text-bold">Hamburguesas Wagyu</div>
                  <p class="text-body2 text-grey-4 font-light q-mt-sm">
                    Carnes con maduración controlada, queso Gruyère artesanal y panes brioche braseados en mantequilla de trufa.
                  </p>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat color="amber-5" label="Explorar Selección" to="/hamburguesas" />
                </q-card-actions>
              </q-card>
            </div>

            <!-- Columna 2 del Folleto -->
            <div class="col-12 col-md-4">
              <q-card class="bg-grey-9 text-grey-2 border-gold full-height text-center q-pa-md card-folleto">
                <q-card-section>
                  <q-avatar size="56px" color="grey-10" text-color="amber-5" class="border-gold q-mb-md">
                    <q-icon name="local_pizza" size="28px" />
                  </q-avatar>
                  <div class="text-h6 playfair-font text-amber-2 text-bold">Pizzas Napolitanas</div>
                  <p class="text-body2 text-grey-4 font-light q-mt-sm">
                    Masa madre fermentada durante 48 horas, fermentación natural y horneadas a la piedra a altas temperaturas.
                  </p>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat color="amber-5" label="Ver Pizzas" to="/pizzas" />
                </q-card-actions>
              </q-card>
            </div>

            <!-- Columna 3 del Folleto -->
            <div class="col-12 col-md-4">
              <q-card class="bg-grey-9 text-grey-2 border-gold full-height text-center q-pa-md card-folleto">
                <q-card-section>
                  <q-avatar size="56px" color="grey-10" text-color="amber-5" class="border-gold q-mb-md">
                    <q-icon name="local_bar" size="28px" />
                  </q-avatar>
                  <div class="text-h6 playfair-font text-amber-2 text-bold">Elixires & Coctelería</div>
                  <p class="text-body2 text-grey-4 font-light q-mt-sm">
                    Bebidas botánicas artesanales, refrescos infusionados y maridajes diseñados exclusivamente para nuestra carta.
                  </p>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat color="amber-5" label="Descubrir Bebidas" to="/bebidas" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- VISTA DE LAS RUTAS HIJAS -->
      <router-view />
    </q-page-container>

    <!-- FOOTER ESTILO FOLLETO EDITORIAL -->
    <q-footer class="bg-grey-10 text-grey-5 border-top-grey q-py-lg">
      <div class="container q-mx-auto text-center q-px-md" style="max-width: 1100px;">
        <div class="row q-col-gutter-md items-center justify-between">
          <div class="col-12 col-md-4 text-md-left">
            <div class="playfair-font text-h6 text-amber-2 text-weight-bold">HAUTE CUISINE</div>
            <div class="text-caption font-light text-grey-5">Experiencia Gastronómica de Autor</div>
          </div>
          <div class="col-12 col-md-4 text-center">
            <div class="text-caption text-amber-5 text-bold text-uppercase letter-spacing-1">Atención & Reservas</div>
            <div class="text-caption font-light">Martes a Domingo: 12:00 PM - 11:00 PM</div>
          </div>
          <div class="col-12 col-md-4 text-md-right">
            <q-btn flat round icon="restaurant" color="amber-5" />
            <q-btn flat round icon="local_bar" color="amber-5" />
            <q-btn flat round icon="phone" color="amber-5" />
          </div>
        </div>
        <q-separator color="grey-9" class="q-my-md" />
        <div class="text-caption text-grey-6">
          © {{ new Date().getFullYear() }} Haute Cuisine. Carta Folleto Digital.
        </div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Roboto:wght@300;400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #121212;
}
/* Fuerza que todas las imágenes dentro de tarjetas tengan el mismo alto y recorte proporcional */
.card-gourmet .q-img,
.card-folleto .q-img {
  height: 280px !important;
  max-height: 280px !important;
  width: 100% !important;
}

/* Centra el encuadre de la foto */
.card-gourmet .q-img__image,
.card-folleto .q-img__image {
  background-size: cover !important;
  background-position: center center !important;
}

/* Alinea la altura de las tarjetas del grid */
.items-stretch {
  display: flex;
  align-items: stretch;}
</style>