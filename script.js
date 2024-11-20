let valorFipe = document.querySelector("#valor-fipe");
let valorParcelas = document.querySelector("#valor-parcelas");
const valorIpva = document.querySelector("#valor-ipva");
const valorSeguro = document.querySelector("#valor-seguro");
const calcTotal = document.querySelector("#button-calcTotal");

const textTotal = document.querySelector("h2");
const ipvaMensal = document.querySelector("#ipva-mensal");
const seguroMensal = document.querySelector("#seguro-mensal");
const parcelaMensal = document.querySelector("#parcela-mensal");

calcTotal.addEventListener("click", (event) => {
  event.preventDefault();

  if (!valorFipe.value) {
    valorFipe.classList.add("alertImput");
    return;
  } else {
    valorFipe.classList.remove("alertImput");
  }

  if (!valorParcelas.value) {
    valorParcelas.classList.add("alertImput");
    return;
  } else {
    valorParcelas.classList.remove("alertImput");
  }

  calculaIpva();
  calculaSeguro();
  calculoGeralText();

  destaqueResultado();
});

function calculaIpva() {
  const IPVA = valorFipe.value * 0.04;
  valorIpva.value = IPVA.toFixed([2]);
}

function calculaSeguro() {
  const SEGURO = valorFipe.value * 0.06;
  valorSeguro.value = SEGURO.toFixed([2]);
}

function calculoGeralText() {
  let parcela = Number(valorParcelas.value);
  let ipva = Number(valorIpva.value);
  let seguro = Number(valorSeguro.value);

  ipva = ipva / 12;
  seguro = seguro / 12;

  const totalMes = parcela + ipva + seguro;

  parcelaMensal.textContent = `Parcela mensal: R$ ${parcela.toFixed([2])}`;
  ipvaMensal.textContent = `IPVA mensal: R$ ${ipva.toFixed([2])}`;
  seguroMensal.textContent = `Seguro mensal: R$ ${seguro.toFixed([2])}`;
  textTotal.textContent = `Total mensal: R$ ${totalMes.toFixed([2])}`;
}

function destaqueResultado() {
  const labelIpva = document.querySelector("#label-ipva");
  const labelSeguro = document.querySelector("#label-seguro");
  labelIpva.style.color = "black";
  labelSeguro.style.color = "black";
}
