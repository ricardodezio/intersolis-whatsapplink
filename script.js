
const irradiacao = {
  AC: 4.81, AL: 5.00, AM: 4.53, BA: 5.33, CE: 5.45, DF: 5.37, ES: 4.85,
  GO: 5.32, MA: 5.06, MG: 5.20, MS: 5.36, MT: 5.30, PA: 4.71, PB: 5.34,
  PE: 5.31, PI: 5.49, PR: 4.46, RJ: 4.76, RN: 5.43, RO: 4.84, RR: 4.45,
  RS: 4.38, SC: 4.45, SE: 5.22, SP: 4.85, TO: 5.30
};

function calcularSistema() {
  const consumo = parseFloat(document.getElementById("consumo").value);
  const estado = document.getElementById("estado").value;

  if (!consumo || !estado || !(estado in irradiacao)) {
    document.getElementById("resultado").innerHTML = "<p>Preencha os dados corretamente.</p>";
    return;
  }

  const diasMes = 30;
  const perdaSistema = 0.80;
  const irradiacaoEstado = irradiacao[estado];

  const energiaDiaria = consumo / diasMes;
  const potenciaNecessariaKWp = energiaDiaria / (irradiacaoEstado * perdaSistema);

  const potenciaPainelW = 610;
  const potenciaPainelKW = potenciaPainelW / 1000;
  const qtdPlacas = Math.ceil(potenciaNecessariaKWp / potenciaPainelKW);

  document.getElementById("resultado").innerHTML =
    `<p><strong>Potência total necessária:</strong> ${potenciaNecessariaKWp.toFixed(2)} kWp</p>
     <p><strong>Quantidade de placas de ${potenciaPainelW}W:</strong> ${qtdPlacas}</p>`;
}

function exportarPDF() {
  const resultado = document.getElementById("resultado");
  const opt = {
    margin:       0.5,
    filename:     'resultado_calculo.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(resultado).set(opt).save();
}
