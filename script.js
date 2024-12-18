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
valorFipe.focus();

calcTotal.addEventListener("click", (event) => {
  event.preventDefault();
  valorFipe.focus();

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
  limpaInputs();
});

valorFipe.addEventListener("input", () => {
  let value = valorFipe.value.replace(/\D/g, "");

  value = Number(value) / 100;
  valorFipe.value = formatMaskValuesBRL(value);
});

valorParcelas.addEventListener("input", () => {
  let value = valorParcelas.value.replace(/\D/g, "");

  value = Number(value) / 100;
  valorParcelas.value = formatMaskValuesBRL(value);
});

function calculaIpva() {
  let ipva = valorFipe.value;
  const justNumbersIpva = ipva.split(",")[0].match(/\d+/g).join("");

  ipva = justNumbersIpva * 0.04;
  valorIpva.value = formatMaskValuesBRL(ipva);
}

function calculaSeguro() {
  let seguro = valorFipe.value;
  const justNumbersSeguro = seguro.split(",")[0].match(/\d+/g).join("");

  seguro = justNumbersSeguro * 0.06;
  valorSeguro.value = formatMaskValuesBRL(seguro);
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

  tabelaFipe.textContent = `Tabela fipe: ${formatMaskValuesBRL(fipe)}`;
  parcelaMensal.textContent = `Parcela mensal: ${formatMaskValuesBRL(parcela)}`;
  ipvaMensal.textContent = `IPVA mensal: ${formatMaskValuesBRL(ipva)}`;
  seguroMensal.textContent = `Seguro mensal: ${formatMaskValuesBRL(seguro)}`;
  textTotal.textContent = `Total mensal: ${formatMaskValuesBRL(totalMes)}`;
}

function destaqueResultado() {
  const labelIpva = document.querySelector("#label-ipva");
  const labelSeguro = document.querySelector("#label-seguro");
  labelIpva.style.color = "black";
  labelSeguro.style.color = "black";
}

function formatMaskValuesBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

function limpaInputs() {
  valorFipe.value = "";
  valorParcelas.value = "";
}
