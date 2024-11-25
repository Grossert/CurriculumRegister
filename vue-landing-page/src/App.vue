<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <div class="text-2xl font-bold">Sistema de Currículos</div>
      <div class="space-x-4">
        <router-link class="hover:text-yellow-300 transition" to="/"
          >Início
        </router-link>
        <router-link class="hover:text-yellow-300 transition" to="/cadastrar"
          >Cadastrar
        </router-link>
        <router-link class="hover:text-yellow-300 transition" to="/curriculos"
          >Visualizar
        </router-link>
      </div>
    </nav>

    <main class="flex-grow p-6 bg-gray-50">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-gray-200 text-center py-4">
      <div class="text-sm">
        © 2024 Sistema de Currículos - Todos os direitos reservados
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  @apply font-sans bg-gray-100;
}
</style>
