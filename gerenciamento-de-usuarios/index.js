const fields = document.querySelectorAll("#form-user-create [name]");
const user = {};

// percorre todos os campos do folumário
// e verifica o campo do tipo radio que está checked
fields.forEach((field) => {
  if (field.name === "gender") {
    if (field.checked) {
      user[field.name] = field.value;
    }
  } else {
    user[field.name] = field.value;
  }
});

console.log(user);
