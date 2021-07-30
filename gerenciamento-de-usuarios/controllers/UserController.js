class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();
  }

  // método para evendo de click do botao submit
  onSubmit() {
    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      const user = this.getValues();

      this.addLine(user);
    });
  }

  // método que percorre todos os campos do fomulario
  // e depois monta um JSON
  getValues() {
    const user = {};
    [...this.formEl.elements].forEach((field) => {
      // verifica o campo radio que está checked
      if (field.name === "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else {
        user[field.name] = field.value;
      }
    });

    // instanciando a classe User.js, assim, sera criado
    // o objeto objectUser e os dados dos campos passara
    // para o formato JSON
    return new User(
      user.name,
      user.gen,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  // método que cria o layout apos os campos serem
  // preenchidos atraves de um objeto
  addLine(dataUser) {
    this.tableEl.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      <td>
        <img
          src="dist/img/user1-128x128.jpg"
          alt="User Image"
          class="img-circle img-sm"
        />
      </td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button
          type="button"
          class="btn btn-primary btn-xs btn-flat"
        >
          Editar
        </button>
        <button
          type="button"
          class="btn btn-danger btn-xs btn-flat"
        >
          Excluir
        </button>
      </td>
    </tr>
  `
    );
  }
}
