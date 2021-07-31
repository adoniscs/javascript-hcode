class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();
  }

  // método para evendo de click do botao submit
  // também para tratar o upload de imagem
  onSubmit() {
    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formEl.querySelector("[type=submit]");

      btn.disabled = true;

      let values = this.getValues();

      if (!values) return false;

      this.getPhoto().then(
        (content) => {
          values.photo = content;

          this.addLine(values);

          this.formEl.reset();

          btn.disabled = false;
        },
        (e) => {
          console.error(e);
        }
      );
    });
  }

  // método para ler o arquivo de upload - fotos
  getPhoto() {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();

      let elements = [...this.formEl.elements].filter((item) => {
        if (item.name === "photo") {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (e) => {
        reject(e);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve("./dist/img/boxed-bg.jpg");
      }
    });
  }

  // método que percorre todos os campos do fomulario
  // e depois monta um JSON
  getValues() {
    const user = {};
    let isValid = true;

    [...this.formEl.elements].forEach((field) => {
      if (
        ["name", "email", "password"].indexOf(field.name) > -1 &&
        !field.value
      ) {
        field.parentElement.classList.add("has-error");
        isValid = false;
      }

      // verifica o campo radio que está checked
      if (field.name === "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
        // verifica se o checkbox admin esta ativado
      } else if (field.name === "admin") {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value;
      }
    });

    if (!isValid) {
      return false;
    }

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
          src="${dataUser.photo}"
          alt="User Image"
          class="img-circle img-sm"
        />
      </td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin ? "Sim" : "Não"}</td>
      <td>${Utils.dateFormat(dataUser.register)}</td>
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
