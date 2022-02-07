//definindo variáveis essenciais
const form1 = document.getElementById("formstart");
const selec = document.getElementById("contrato");
const renda = document.getElementById("renda");
const resul = document.getElementById("resultado");
const botos = document.getElementById("bot");

//variáveis para mudança de tema
var thedark = false;
const tdark = document.getElementById("tema");

//Definições de estilo
renda.style.display = 'none';
resul.style.display = 'none';

/*FUNÇÕES*/

    //Função para mudança de tema
    function DarkTheme(){
        if (thedark == false){
            document.body.style.color = 'white';
            document.body.style.background = 'black';
            tdark.innerText = "Tema Claro";
            thedark = true;
        }
        else{
            document.body.style.color = '';
            document.body.style.background = '';
            tdark.innerText = "Tema Escuro";
            thedark = false;
        }
    }

    //Função que cria os inputs para inserção de números para o cálculo
    function criacaoPdr(_id, _class, _name, _type, _place, _leg){
        const label = document.createElement("label");
        renda.appendChild(label);
        label.setAttribute('for', _id);
        label.appendChild(document.createTextNode(_leg));

        const cria1 = document.createElement("input");
        renda.appendChild(cria1);
        cria1.setAttribute('id', _id);
        cria1.setAttribute('class', _class);
        cria1.setAttribute('name', _name);
        cria1.setAttribute('type', _type);
        cria1.setAttribute('placeholder', _place);
    }

    //Função para gerar na div renda os inputs baseada na opção inserida no select
    function gerarForm(){
        if (selec.value != 'NADA'){

            renda.style.display = 'block';
            form1.style.display = 'none';
            const h = document.createElement("h2");
            renda.appendChild(h);
            h.appendChild(document.createTextNode("Preencha o Formulário:"));
            const p = document.createElement("p");
            renda.appendChild(p);
            p.appendChild(document.createTextNode("*Campos Obrigatórios"));
            p.setAttribute('id', "p_one");
            const mud1 = document.getElementById("mud");
            mud1.setAttribute('onclick', "Calc()");

            if (selec.value != 'HORA' && selec.value != 'NADA'){
                console.log("Gerando Formulário...");
                /* Ordem de distribuição dos valores para caracterização do input
                _id = "ip1";
                _class = "in";
                _name = "SALARIO";
                _type = "number";
                _place = "Ganho Bruto $"
                _leg = "Remuneração Mensal";
                */
                criacaoPdr("ip1", "in", "SALARIO", "number", "Ganho Bruto($)*", "Remuneração Mensal");

                criacaoPdr("ip2", "in", "INSS", "number", "Taxa INSS(%)*", "Taxa do INSS");
                console.log("Formulário Gerado!");
            }

            if (selec.value == 'HORA'){
                console.log("Gerando Formulário...");

                criacaoPdr("ih1", "in", "HORAS", "number", "Horas(H)*", "Tempo Mensal Trabalhado");
                criacaoPdr("im", "indf", "MINUTOS", "number", "Minutos(M)", "");
                document.getElementsByTagName("label")[1].setAttribute('id', "zero");

                criacaoPdr("ih2", "in", "VALORH", "number", "Valor da Hora($)*", "Remuneração por Hora");

                criacaoPdr("ih3", "in", "INSS", "number", "Taxa INSS(%)", "Taxa do INSS");
                console.log("Formulário Gerado!");
            }
        }
        else{
            alert("Escolha a opção de contrato em que você se enquadra!!!");
        }
    }

    //Função para calculo do salário líquido e taxa de desconto do INSS
    function Calc(){
        const allIN = document.getElementsByClassName("in");

        if (allIN[0].value != "" && allIN[1].value != ""){
            if (selec.value != 'HORA'){
                let ip1ID = document.getElementById("ip1").value;
                let ip2ID = document.getElementById("ip2").value;

                let taxaINSS = ip1ID * (ip2ID/100);
                let resultPdr = ip1ID - taxaINSS;
                console.log(resultPdr.toFixed(2));
                resultadoInstA(taxaINSS, resultPdr);
            }
            if (selec.value == 'HORA'){
                let imID = document.getElementById("im").value;
                let ih1ID = document.getElementById("ih1").value;
                let ih2ID = document.getElementById("ih2").value;
                let ih3ID = document.getElementById("ih3").value;

                let remMes = ih2ID * (Number(ih1ID)+Number(imID/60));
                let taxIN = remMes * (ih3ID/100);
                let resultH = remMes - taxIN;
                resultadoInstB(ih1ID, imID, taxIN, resultH);
                //desabilita o input de minutos após finalizar o cálculo
                document.getElementById("im").setAttribute('disabled', "true");
            }
            //div para exibição dos resultados volta a aparecer
            //uma função para ajustes estéticos é executada
            resul.style.display = 'block';
            botos.style.display = 'none';
            Ajuste(allIN);
        }else{alert("PREENCHA OS CAMPOS OBRIGATÓRIOS");}
    }

    //Funções que exibem o resultado
    function resultadoInstA(INSS, SalL){
        let h2A = document.createElement("h2");
        resul.appendChild(h2A);
        h2A.appendChild(document.createTextNode("Resultado Salárial"));
        resul.innerHTML += (`<p>A taxa descontada do INSS foi aproximadamente: R$ ${INSS.toFixed(2)}</p>`);
        resul.innerHTML += (`<p>Sua remuneração líquida foi aproximadamente: R$ ${SalL.toFixed(2)}</p>`);
    }
    
    function resultadoInstB(hora, minuto, INSS, SalL){
        let h2B = document.createElement("h2");
        resul.appendChild(h2B);
        h2B.appendChild(document.createTextNode("Resultado Salarial"));
        resul.innerHTML += (`<p>Seu total de horas mensais foi: ${hora}h e ${minuto}min</p>`);
        resul.innerHTML += (`<p>A taxa descontada do INSS foi aproximadamente: R$ ${INSS.toFixed(2)}</p>`);
        resul.innerHTML += (`<p>Sua remuneração líquida foi aproximadamente: R$ ${SalL.toFixed(2)}</p>`);
    }

    //Função que ajusta a página após execução bem sucedida do cálculo e evita possíveis erros
    function Ajuste(InClass){
        //desabilita o botao de cálculo após a execução bem sucedida da operação
        document.getElementById("mud").style.display = 'none';
        document.getElementsByTagName("h2")[1].style.display = 'none';
        document.getElementsByTagName("p")[0].style.display = 'none';
        let mud2 = document.getElementById("mud2");
        resul.appendChild(mud2);
        mud2.innerText = "Retornar";

        //loop que desabilita os inputs para evitar a alteração de dados após a execução do cálculo
        for (let dis = 0; dis < InClass.length;){
            let INalvo = InClass[dis];
            INalvo.setAttribute('disabled', "true");
            dis++
        }
    }