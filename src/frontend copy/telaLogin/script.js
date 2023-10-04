let buttonCancel = document.getElementById("cancelar");
let buttonSave = document.getElementById("salvar");

function md5(input) {
    let md5Hash = CryptoJS.MD5(input);
    return md5Hash.toString();
};

buttonCancel.addEventListener("click", function () {
    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("email").value = "";
    document.getElementById("situacao").value = "A";
});

buttonSave.addEventListener("click", async function () {
    let nome = document.getElementById("nome").value;
    let senha = await md5(document.getElementById("senha").value);
    let email = document.getElementById("email").value;
    let situacao = document.getElementById("situacao").value;

            
    let userData = {
        nome: nome,
        senha: senha,
        email: email,
        situacao: situacao
    };

});
 
