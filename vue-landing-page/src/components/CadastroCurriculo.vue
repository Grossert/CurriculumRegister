<template>
  <div class="p-10 bg-gray-50 min-h-screen flex flex-col items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <h1 class="text-3xl font-bold text-blue-600 mb-8 text-center">
        Cadastrar Currículo
      </h1>
      <form @submit.prevent="cadastrarCurriculo" class="space-y-6">
        <!-- Campos principais -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            v-model="curriculo.nomeCompleto"
            placeholder="Nome Completo"
            class="input"
            required
          />
          <input
            v-model="curriculo.email"
            placeholder="E-mail"
            type="email"
            class="input"
            required
          />
          <input
            v-model="curriculo.telefone"
            placeholder="Telefone"
            type="tel"
            class="input"
            required
          />
          <input
            v-model="curriculo.enderecoCompleto"
            placeholder="Endereço Completo"
            class="input col-span-full sm:col-span-2"
            required
          />
        </div>

        <!-- Formação acadêmica -->
        <fieldset class="space-y-4">
          <legend class="text-lg font-semibold text-gray-800">Formação Acadêmica</legend>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input v-model="formacao.curso" placeholder="Curso" class="input" required />
            <input
              v-model="formacao.instituicao"
              placeholder="Instituição"
              class="input"
              required
            />
            <input
              v-model="formacao.anoConclusao"
              placeholder="Ano de Conclusão"
              type="number"
              class="input"
              required
            />
          </div>
        </fieldset>

        <!-- Experiência profissional -->
        <fieldset class="space-y-4">
          <legend class="text-lg font-semibold text-gray-800">
            Experiência Profissional
          </legend>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              v-model="experiencia.empresa"
              placeholder="Empresa"
              class="input"
              required
            />
            <input
              v-model="experiencia.cargo"
              placeholder="Cargo"
              class="input"
              required
            />
            <input
              v-model="experiencia.periodo"
              placeholder="Período"
              class="input"
              required
            />
          </div>
        </fieldset>

        <input v-model="curriculo.idiomas" placeholder="Idiomas" class="input" required />
        <textarea
          v-model="curriculo.objetivoProfissional"
          placeholder="Objetivo Profissional"
          class="input col-span-full sm:col-span-2"
          required
        >
        </textarea>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curriculo: {
        nomeCompleto: "",
        email: "",
        telefone: "",
        enderecoCompleto: "",
        idiomas: "",
        objetivoProfissional: "",
      },
      formacao: {
        curso: "",
        instituicao: "",
        anoConclusao: "",
      },
      experiencia: {
        empresa: "",
        cargo: "",
        periodo: "",
      },
    };
  },
  methods: {
    async cadastrarCurriculo() {
      if (!this.validarCampos()) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        return;
      }

      try {
        const payload = {
          ...this.curriculo,
          formacao: { ...this.formacao },
          experiencia: { ...this.experiencia },
        };

        const response = await fetch("http://localhost:3000/api/curriculos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Erro ao cadastrar currículo');
        }

        const data = await response.json();
        alert("Currículo cadastrado com sucesso!");
        console.log('Currículo cadastrado:', data);
      } catch (error) {
        console.error("Erro ao cadastrar currículo:", error);
        alert("Ocorreu um erro ao cadastrar o currículo.");
      }
    },

    validarCampos() {
      const {
        nomeCompleto,
        email,
        telefone,
        enderecoCompleto,
        idiomas,
        objetivoProfissional,
      } = this.curriculo;
      const { curso, instituicao, anoConclusao } = this.formacao;
      const { empresa, cargo, periodo } = this.experiencia;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const telefoneRegex = /^\d{10,11}$/;

      return (
        nomeCompleto &&
        emailRegex.test(email) &&
        telefoneRegex.test(telefone) &&
        enderecoCompleto &&
        idiomas &&
        objetivoProfissional &&
        curso &&
        instituicao &&
        anoConclusao &&
        empresa &&
        cargo &&
        periodo
      );
    },
  },
};
</script>

<style>
.input {
  @apply block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition;
}
</style>
