import { cpf, cnpj } from "cpf-cnpj-validator";

export const validarCPF = (cpfInput) => {
    const cpfSemMascara = cpfInput.replace(/[^\d]+/g, "");
  
    if (!cpf.isValid(cpfSemMascara)) {
      return false;
    }
  
    return true;
  };
  

export const validarCNPJ = (cnpjInput) => {
  const cnpjSemMascara = cnpjInput.replace(/[^\d]+/g, "");

  if (!cnpj.isValid(cnpjSemMascara)) {
    return false;
  }

  return true;
};
