<template>
  <q-page class="bg-grey-10 text-grey-2 q-pb-xl">
    <div class="banner-container relative-position">
      <q-img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
        height="320px" fit="cover">
        <div class="absolute-full flex flex-center bg-overlay">
          <div class="text-center text-amber-2 q-px-md">
            <div class="text-overline letter-spacing-2 text-amber-5">Nuestra Historia & Filosofía</div>
            <h1 class="text-h3 text-weight-bolder q-my-xs playfair-font">Pasión por la Gastronomía</h1>
            <p class="text-subtitle1 text-grey-4 font-italic" style="max-width: 600px; margin: 0 auto;">
              Transformando ingredientes de origen en experiencias memorables para el paladar.
            </p>
          </div>
        </div>
      </q-img>
    </div>
    <div class="container q-mx-auto q-px-md q-mt-xl" style="max-width: 1100px;">
      <div class="q-mb-xl">
        <q-card class="bg-grey-9 text-grey-2 shadow-24 border-gold border-radius-lg overflow-hidden">
          <div class="row no-wrap border-responsive items-center">
            <q-img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=700&auto=format&fit=crop"
              class="col-12 col-md-6" height="380px" fit="cover" />
            <q-card-section class="col-12 col-md-6 q-pa-xl">
              <q-icon name="restaurant_menu" color="amber-5" size="32px" class="q-mb-sm" />
              <div class="text-overline text-amber-5 text-bold letter-spacing-2">Manifiesto Gourmet</div>
              <h2 class="text-h4 text-weight-bolder text-amber-1 playfair-font q-mb-md">El Arte de la Cocina de Autor
              </h2>
              <p class="text-body1 text-grey-4 font-light q-mb-sm">
                Nacimos con el propósito de redefinir los clásicos de la cocina urbana y tradicional, elevándolos
                mediante técnicas vanguardistas y materia prima de la más alta calidad.
              </p>
              <p class="text-body2 text-grey-5 font-light">
                Cada receta es diseñada minuciosamente por nuestro equipo de chefs, donde la temperatura, la textura y
                el maridaje perfecto son los protagonistas.
              </p>
            </q-card-section>
          </div>
        </q-card>
      </div>
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">NUESTROS PILARES</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>
      <div class="row q-col-gutter-lg q-mb-xl">
        <div v-for="(pilar, index) in pilares" :key="index" class="col-12 col-sm-4">
          <q-card
            class="card-gourmet bg-grey-9 text-grey-2 full-height flex flex-center column text-center q-pa-lg border-grey border-radius-md">
            <q-avatar size="64px" color="grey-10" text-color="amber-5" class="border-gold q-mb-md">
              <q-icon :name="pilar.icono" size="32px" />
            </q-avatar>
            <div class="text-h6 text-weight-bold text-amber-1 playfair-font q-mb-sm">{{ pilar.titulo }}</div>
            <div class="text-body2 text-grey-4 font-light">{{ pilar.descripcion }}</div>
          </q-card>
        </div>
      </div>
      <div class="text-center q-mb-lg q-pt-md">
        <h2 class="text-h5 text-weight-bold text-amber-2 playfair-font q-my-none">LA BRIGADA DE COCINA</h2>
        <div class="gold-line q-mx-auto q-mt-xs"></div>
      </div>

      <div class="row q-col-gutter-lg items-stretch">
        <div v-for="(miembro, index) in equipo" :key="index" class="col-12 col-sm-6 col-md-4">
          <q-card
            class="card-gourmet bg-grey-9 text-grey-2 full-height border-grey border-radius-md overflow-hidden flex column justify-between">
            <div>
              <q-img :src="miembro.imagen" height="280px" fit="cover" position="top center" class="full-width" />
              <q-card-section class="text-center">
                <div class="text-h6 text-weight-bold text-amber-1 playfair-font">{{ miembro.nombre }}</div>
                <div class="text-caption text-amber-5 text-bold text-uppercase letter-spacing-2 q-mb-xs">{{
                  miembro.cargo }}</div>
                <div class="text-body2 text-grey-4 font-light">{{ miembro.bio }}</div>
              </q-card-section>
            </div>

          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
const pilares = [
  {
    icono: "eco",
    titulo: "Origen Orgánico",
    descripcion: "Seleccionamos vegetales de huertos locales e ingredientes importados de denominación de origen protegida."
  },
  {
    icono: "local_fire_department",
    titulo: "Técnica Tradicional",
    descripcion: "Procesos de cocción a la leña, fermentaciones lentas de masa madre y maduraciones controladas."
  },
  {
    icono: "verified",
    titulo: "Excelencia Sin Reservas",
    descripcion: "Nos apasiona el detalle en el emplatado y el equilibrio de aromas en cada preparación."
  }
]

const equipo = [
  {
    nombre: "Chef Matteo Rossi",
    cargo: "Executive Chef & Fundador",
    bio: "Especialista en gastronomía mediterránea con más de 15 años de experiencia en restaurantes con estrellas Michelin.",
    imagen: "https://img.magnific.com/foto-gratis/joven-cocinero-feliz-preparando-bruschetta-salsa-aguacate-tomate-cereza-cocina_637285-3120.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    nombre: "Valentina Gómez",
    cargo: "Maestra Sommelier",
    bio: "Curadora de nuestra carta de elixires, refrescos botánicos y maridajes exclusivos para cada plato.",
    imagen: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop"
  },
  {
    nombre: "Pierre Laurent",
    cargo: "Chef Patissier",
    bio: "Maestro repostero formado en París, enfocado en texturas complejas y combinaciones de cacao fino de aroma.",
    imagen: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop"
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
  background: rgba(15, 15, 15, 0.8);
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
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}

@media (max-width: 1023px) {
  .border-responsive {
    flex-direction: column;
  }
}
</style>
