<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-4">Currículos Cadastrados</h1>
    <div v-for="curriculo in curriculos" :key="curriculo._id" class="border p-4 mb-4">
      <h2 class="text-xl font-bold">{{ curriculo.nomeCompleto }}</h2>
      <p>Email: {{ curriculo.email }}</p>
      <p>Telefone: {{ curriculo.telefone }}</p>
      <button
        @click="visualizarCurriculo(curriculo)"
        class="border px-2 mt-3 rounded bg-blue-600 text-white"
      >
        Visualizar
      </button>
      <button
        @click="editarCurriculo(curriculo)"
        class="border px-2 mt-3 rounded bg-yellow-600 text-white ml-2"
      >
        Editar
      </button>
      <button
        @click="deletarCurriculo(curriculo._id)"
        class="border px-2 mt-3 rounded bg-red-600 text-white ml-2"
      >
        Deletar
      </button>
    </div>

    <!-- Modal Visualizar -->
    <div
      v-if="isModalVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/2 max-h-[600px] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Detalhes do Currículo</h2>
        <p><strong>Nome:</strong> {{ selectedCurriculo.nomeCompleto }}</p>
        <p><strong>Email:</strong> {{ selectedCurriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ selectedCurriculo.telefone }}</p>
        <p><strong>Endereço:</strong> {{ selectedCurriculo.enderecoCompleto }}</p>
        <p><strong>Idiomas:</strong> {{ selectedCurriculo.idiomas }}</p>
        <p>
          <strong>Objetivo Profissional:</strong>
          {{ selectedCurriculo.objetivoProfissional }}
        </p>
        <p>
          <strong>Formação:</strong> {{ selectedCurriculo.formacao.curso }} -
          {{ selectedCurriculo.formacao.instituicao }} ({{
            selectedCurriculo.formacao.anoConclusao
          }})
        </p>
        <p>
          <strong>Experiência:</strong> {{ selectedCurriculo.experiencia.empresa }} -
          {{ selectedCurriculo.experiencia.cargo }} ({{
            selectedCurriculo.experiencia.periodo
          }})
        </p>

        <button @click="fecharModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Fechar
        </button>
      </div>
    </div>

    <!-- Modal Editar -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/2 max-h-[600px] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Editar Currículo</h2>
        <form @submit.prevent="salvarEdicoes">
          <!-- Nome Completo -->
          <div>
            <label class="block">Nome Completo:</label>
            <input
              v-model="curriculoEdicao.nomeCompleto"
              type="text"
              class="border p-2 w-full mb-4"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block">Email:</label>
            <input
              v-model="curriculoEdicao.email"
              type="email"
              class="border p-2 w-full mb-4"
              required
            />
          </div>

          <!-- Telefone -->
          <div>
            <label class="block">Telefone:</label>
            <input
              v-model="curriculoEdicao.telefone"
              type="text"
              class="border p-2 w-full mb-4"
              required
            />
          </div>

          <!-- Endereço Completo -->
          <div>
            <label class="block">Endereço Completo:</label>
            <input
              v-model="curriculoEdicao.enderecoCompleto"
              type="text"
              class="border p-2 w-full mb-4"
              required
            />
          </div>

          <!-- Idiomas -->
          <div>
            <label class="block">Idiomas:</label>
            <input
              v-model="curriculoEdicao.idiomas"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>

          <!-- Objetivo Profissional -->
          <div>
            <label class="block">Objetivo Profissional:</label>
            <textarea
              v-model="curriculoEdicao.objetivoProfissional"
              class="border p-2 w-full mb-4"
              rows="3"
            ></textarea>
          </div>

          <!-- Formação -->
          <div>
            <label class="block">Curso:</label>
            <input
              v-model="curriculoEdicao.formacao.curso"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <label class="block">Instituição:</label>
            <input
              v-model="curriculoEdicao.formacao.instituicao"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <label class="block">Ano de Conclusão:</label>
            <input
              v-model="curriculoEdicao.formacao.anoConclusao"
              type="number"
              class="border p-2 w-full mb-4"
            />
          </div>

          <!-- Experiência -->
          <div>
            <label class="block">Empresa:</label>
            <input
              v-model="curriculoEdicao.experiencia.empresa"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <label class="block">Cargo:</label>
            <input
              v-model="curriculoEdicao.experiencia.cargo"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <label class="block">Período:</label>
            <input
              v-model="curriculoEdicao.experiencia.periodo"
              type="text"
              class="border p-2 w-full mb-4"
            />
          </div>

          <button type="submit" class="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            Salvar
          </button>
          <button
            @click="fecharEditModal"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded ml-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Modal Deletar -->
    <div
      v-if="isDeleteModalVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 class="text-2xl font-bold mb-4">
          Tem certeza que deseja deletar este currículo?
        </h2>
        <button
          @click="confirmarDeletar"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Confirmar
        </button>
        <button
          @click="fecharDeleteModal"
          class="mt-4 px-4 py-2 bg-gray-500 text-white rounded ml-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curriculos: [],
      selectedCurriculo: null,
      isModalVisible: false,
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      curriculoEdicao: {}, // Para armazenar os dados de edição
      curriculoIdDelete: null, // Para armazenar o ID do currículo a ser deletado
    };
  },

  async mounted() {
    await this.buscarCurriculos();
  },

  methods: {
    async buscarCurriculos() {
      try {
        const response = await fetch("http://localhost:3000/api/curriculos");
        if (!response.ok) {
          throw new Error("Falha na requisição");
        }
        this.curriculos = await response.json();
      } catch (error) {
        console.error("Erro ao buscar currículos:", error);
      }
    },

    visualizarCurriculo(curriculo) {
      this.selectedCurriculo = curriculo;
      this.isModalVisible = true;
    },

    fecharModal() {
      this.isModalVisible = false;
    },

    editarCurriculo(curriculo) {
      this.curriculoEdicao = { ...curriculo }; // Cria uma cópia para edição
      this.isEditModalVisible = true;
    },

    fecharEditModal() {
      this.isEditModalVisible = false;
    },

    async salvarEdicoes() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/curriculos/${this.curriculoEdicao._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.curriculoEdicao),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao salvar as edições");
        }

        const updatedCurriculo = await response.json();
        const index = this.curriculos.findIndex(
          (curriculo) => curriculo._id === updatedCurriculo._id
        );
        if (index !== -1) {
          this.curriculos.splice(index, 1, updatedCurriculo); // Atualiza o currículo na lista
        }
        this.fecharEditModal();
      } catch (error) {
        console.error("Erro ao salvar edições:", error);
      }
    },

    async deletarCurriculo(id) {
      this.curriculoIdDelete = id;
      this.isDeleteModalVisible = true;
    },

    fecharDeleteModal() {
      this.isDeleteModalVisible = false;
    },

    async confirmarDeletar() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/curriculos/${this.curriculoIdDelete}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao deletar currículo");
        }

        // Remove o currículo da lista após a exclusão
        this.curriculos = this.curriculos.filter(
          (curriculo) => curriculo._id !== this.curriculoIdDelete
        );
        this.fecharDeleteModal();
      } catch (error) {
        console.error("Erro ao deletar currículo:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Modal Visualizar */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
