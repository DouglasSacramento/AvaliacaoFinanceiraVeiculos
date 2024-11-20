let valorFipe = document.querySelector("#valor-fipe");
let valorParcelas = document.querySelector("#valor-parcelas");

const valorIpva = document.querySelector("#valor-ipva");
const valorSeguro = document.querySelector("#valor-seguro");
const calcTotal = document.querySelector("#button-calcTotal");

const textTotal = document.querySelector("h2");
const tabelaFipe = document.querySelector("#tabela-fipe");
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

  valorFipe.value = formatNumber(valorFipe.value);
  valorParcelas.value = formatNumber(valorParcelas.value);

  calculaIpva();
  calculaSeguro();
  calculoGeralText();
  destaqueResultado();
  limpaInputs();
});

valorFipe.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  valorFipe.value = valorFipe.value.replace(hasCharactersRegex, "");
});

valorParcelas.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  valorParcelas.value = valorParcelas.value.replace(hasCharactersRegex, "");
});

function calculaIpva() {
  let ipva = valorFipe.value;
  const justNumbersIpva = ipva.split(",")[0].match(/\d+/g).join("");

  ipva = justNumbersIpva * 0.04;
  valorIpva.value = formatValuesBRL(ipva);
}

function calculaSeguro() {
  let seguro = valorFipe.value;
  const justNumbersSeguro = seguro.split(",")[0].match(/\d+/g).join("");

  seguro = justNumbersSeguro * 0.06;
  valorSeguro.value = formatValuesBRL(seguro);
}

function calculoGeralText() {
  let fipe = valorFipe.value;
  let parcela = valorParcelas.value;
  let ipva = valorIpva.value;
  let seguro = valorSeguro.value;

  const justNumbersFipe = fipe.split(",")[0].match(/\d+/g).join("");
  const justNumbersParcela = parcela.split(",")[0].match(/\d+/g).join("");
  const justNumbersIpva = ipva.split(",")[0].match(/\d+/g).join("");
  const justNumbersSeguro = seguro.split(",")[0].match(/\d+/g).join("");

  fipe = Number(justNumbersFipe);
  parcela = Number(justNumbersParcela);
  ipva = justNumbersIpva / 12;
  seguro = justNumbersSeguro / 12;

  const totalMes = parcela + ipva + seguro;

  tabelaFipe.textContent = `Tabela fipe: ${formatValuesBRL(fipe)}`;
  parcelaMensal.textContent = `Parcela mensal: ${formatValuesBRL(parcela)}`;
  ipvaMensal.textContent = `IPVA mensal: ${formatValuesBRL(ipva)}`;
  seguroMensal.textContent = `Seguro mensal: ${formatValuesBRL(seguro)}`;
  textTotal.textContent = `Total mensal: ${formatValuesBRL(totalMes)}`;
}

function destaqueResultado() {
  const labelIpva = document.querySelector("#label-ipva");
  const labelSeguro = document.querySelector("#label-seguro");
  labelIpva.style.color = "black";
  labelSeguro.style.color = "black";
}

function formatValuesBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatNumber(value) {
  const number = parseFloat(value.replace(/\D/g, ""));
  if (isNaN(number)) return "0,00";

  return number
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function limpaInputs() {
  valorFipe.value = "";
  valorParcelas.value = "";
}
