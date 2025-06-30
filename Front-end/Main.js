window.addEventListener("DOMContentLoaded", () => {
    definirFolha();
});


window.addEventListener("keypress", ({key}) => {
    if (key == "Enter"){
        document.getElementsByName("entrarBtn")[0].click();
    }
});

function loginUsuario(){
    if(campoFaltando()) return;

    var email = document.getElementsByName("emailTxt")[0].value;
    var senha = document.getElementsByName("senhaTxt")[0].value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "email": email,
        "password": senha
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

     fetch("http://localhost:8080/user/login", requestOptions)
    .then((response) => {
        console.log(response.status)
        if (response.status === 200){
            window.location.href="main_page.html";
        }
            
        return response.text();
    })
    .then((result) => {
        console.log(result);
        mostrarPopUp("botaoPopUp",result);
    }) 
    .catch((error) => console.error(error));
}

function cadastrarUsuario(){
    if (campoFaltando()) return;

    var email = document.getElementsByName("emailTxt")[0].value;
    var senha = document.getElementsByName("senhaTxt")[0].value;

    const myHeaders = new Headers();

    myHeaders.append("Content-type","application/json");
    const raw = JSON.stringify({
        "email":email,
        "password":senha
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/user/signup", requestOptions)
    .then((response) => {
        console.log(response.status)
        if (response.status === 200){
            window.location.href="main_page.html";
        }
        return response.text();
    })
    .then((result) => {
        console.log(result);
        mostrarPopUp("loginPopUp",result);
    }) 
    .catch((error) => console.error(error));

}

function campoFaltando(){
    if(document.getElementsByName("emailTxt")[0].value === ""){
        mostrarPopUp("loginPopUp","Preencha o Email");
        return true;
    }
    if(document.getElementsByName("senhaTxt")[0].value === ""){
        mostrarPopUp("senhaPopUp","Preencha a senha");
        return true;
    }
    return false;
}

function mostrarPopUp(popupid,mensagem){
    var popup = document.getElementById(popupid);
    popup.textContent = mensagem;
    popup.classList.remove('hide');
    popup.classList.add('show');
}

function esconderPopUp(popupid){
    var popup = document.getElementById(popupid);
    popup.classList.remove('show');
    popup.classList.add('hide');
}

function definirFolha(){
    var leaves = document.querySelectorAll(".leafImg");
    leaves.forEach((leaf, index) =>{
        bright = 1 + Math.random() * 0.5; 
        hue = 330 + Math.random() * 55;
        width = 50 + Math.random() * 40;
        heigth = 30 + Math.random() * 20;
        depth = 30 + Math.random() * 40;
        left = Math.random() * 35;
        duration = 10 + Math.random() * 20;

        leaf.animate(
            {offsetDistance: [0, "100%"]},
            {
                duration: 1500 + Math.random() * 2500,
                iterations:Infinity,
                delay: -Math.random() * 5000,
                easing:"cubic-bezier(.38,-0.06,.61,1.02)",
                direction:"alternate",
            },
        );
        leaf.style.width=`${width}px`;
        leaf.style.heigth=`${heigth}px`;
        leaf.style.left=`${left}%`;
        leaf.style.filter= `brightness(${bright}) hue-rotate(${hue}deg) drop-shadow(0px 0px 10px rgb(0, 0, 0)) drop-shadow(0px 0px 2px rgb(0, 0, 0)) drop-shadow(0px 0px 2px rgb(0, 0, 0))`;
        leaf.style.offsetPath=`path('M0 0 C0 0, ${depth*2} ${depth}, ${depth*4} 0')`;
        leaf.style.animation=`fall ${duration}s linear infinite`;
        leaf.style.transform=`scaleX(${-1+Math.round(Math.random())*2}) rotate(-35deg)`;
        leaf.style.animationDelay=`-${Math.random()*25}s`;
    });
}

function mostrarSenha(){
    senha = document.getElementsByName("senhaTxt")[0]
    if(senha.type === "password"){
        senha.type = "text";
    }
    else{
        senha.type = "password";
    }
}