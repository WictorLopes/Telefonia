import emailjs from "emailjs-com";

const sendFormDataAndFile = async (
  formData,
  contaTelefonica,
  contaTelefonicaFile0800,
  contaTelefonicaFile3003
) => {
  const formDataToSend = new FormData();

  // Substitua os valores abaixo pelos seus IDs do EmailJS
  const serviceId = "default_service";
  const templateId = "template_h27n7pt";
  const userId = "BPob_mL7QPHghOJmN";

  const templateParams = {
    // fidelidade
    fidelidade: formData[0].fidelidade,
    // plano de voz
    assinaturaSTFC: formData[1].assinaturaSTFC,
    canaisPlanoDeVoz: formData[1].canaisPlanoDeVoz,
    planoIlimitado: formData[1].planoIlimitado,
    tipoPlanoDeVoz: formData[1].tipoPlanoDeVoz,
    valorTotalPlanoDeVoz: formData[1].valorTotalPlanoDeVoz,
    tipoPessoaPort: formData[1].tipoPessoaPort,
    nomeSocialPort: formData[1].nomeSocialPort,
    nomeCompletoPort: formData[1].nomeCompletoPort,
    cpfPort: formData[1].cpfPort,
    cnpjPort: formData[1].cnpjPort,
    dddPort: formData[1].dddPort,
    emailPort: formData[1].emailPort,
    numeroPort: formData[1].numeroPort,
    cidadePort: formData[1].cidadePort,
    ufPort: formData[1].ufPort,
    bairroPort: formData[1].bairroPort,
    enderecoPort: formData[1].enderecoPort,
    dataNascPort: formData[1].dataNascPort,
    cepPort: formData[1].cepPort,
    numeroEndPort: formData[1].numeroEndPort,
    complementoPort: formData[1].complementoPort,
    contaTelefonica: formData[1].downloadLink,
    // assinatura0800
    assinatura0800pos: formData[2].assinatura0800pos,
    portarNumero: formData[2].portarNumero,
    canais0800: formData[2].canais0800,
    tipoPlano0800: formData[2].tipoPlano0800,
    selectedNumbersData0800: formData[2].selectedNumbersData,
    valorTotalAssinatura0800: formData[2].calculateTotal,
    tipoPessoaPort0800: formData[2].tipoPessoaPort0800,
    nomeSocialPort0800: formData[2].nomeSocialPort0800,
    nomeCompletoPort0800: formData[2].nomeCompletoPort0800,
    cpfPort0800: formData[2].cpfPort0800,
    cnpjPort0800: formData[2].cnpjPort0800,
    dddPort0800: formData[2].dddPort0800,
    emailPort0800: formData[2].emailPort0800,
    numeroPort0800: formData[2].numeroPort0800,
    cidadePort0800: formData[2].cidadePort0800,
    ufPort0800: formData[2].ufPort0800,
    bairroPort0800: formData[2].bairroPort0800,
    enderecoPort0800: formData[2].enderecoPort0800,
    dataNascPort0800: formData[2].dataNascPort0800,
    cepPort0800: formData[2].cepPort0800,
    numeroEndPort0800: formData[2].numeroEndPort0800,
    complementoPort0800: formData[2].complementoPort0800,
    contaTelefonica0800: formData[2].downloadLink0800,

    // assinatura3003
    assinatura3003pos: formData[3].assinatura3003pos,
    portarNumero: formData[3].portarNumero,
    canais3003: formData[3].canais3003,
    tipoPlano3003: formData[3].tipoPlano3003,
    selectedNumbersData3003: formData[3].selectedNumbersData3003,
    valorTotalAssinatura3003: formData[3].valorTotalAssinatura3003,
    tipoPessoaPort3003: formData[3].tipoPessoaPort3003,
    nomeSocialPort3003: formData[3].nomeSocialPort3003,
    nomeCompletoPort3003: formData[3].nomeCompletoPort3003,
    cpfPort3003: formData[3].cpfPort3003,
    cnpjPort3003: formData[3].cnpjPort3003,
    dddPort3003: formData[3].dddPort3003,
    emailPort3003: formData[3].emailPort3003,
    numeroPort3003: formData[3].numeroPort3003,
    cidadePort3003: formData[3].cidadePort3003,
    ufPort3003: formData[3].ufPort3003,
    bairroPort3003: formData[3].bairroPort3003,
    enderecoPort3003: formData[3].enderecoPort3003,
    dataNascPort3003: formData[3].dataNascPort3003,
    cepPort3003: formData[3].cepPort3003,
    numeroEndPort3003: formData[3].numeroEndPort3003,
    complementoPort3003: formData[3].complementoPort3003,
    contaTelefonica3003: formData[3].downloadLink3003,

    // vencimento
    vencimento: formData[4].vencimento,
    // dados do cliente
    nomeSocial: formData[5].nomeSocial,
    nomeCompleto: formData[5].nomeCompleto,
    cpf: formData[5].cpf,
    cnpj: formData[5].cnpj,
    tipoPessoa: formData[5].tipoPessoa,
    cidade: formData[5].cidade,
    uf: formData[5].uf,
    bairro: formData[5].bairro,
    endereco: formData[5].endereco,
    email: formData[5].email,
    telefone: formData[5].telefone,
    ddd: formData[5].ddd,
    dataNasc: formData[5].dataNasc,
    cep: formData[5].cep,
    numeroEnd: formData[5].numeroEnd,
    complemento: formData[5].complemento,
    // dados do responsavel
    nomeResponsavel: formData[6].nomeResponsavel,
    emailResponsavel: formData[6].emailResponsavel,
    cpfResponsavel: formData[6].cpfResponsavel,
    dataNascimentoResponsavel: formData[6].dataNascimentoResponsavel,
    numeroCelularResponsavel: formData[6].numeroCelularResponsavel,
  };


  emailjs
    .send(serviceId, templateId, templateParams, userId)
    .then((result) => {
      console.log("Email sent successfully:", result.text);
    })
    .catch((error) => {
      console.error("Error sending email:", error.text);
    });
};

export default sendFormDataAndFile;
