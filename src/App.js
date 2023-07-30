import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Element, animateScroll as scroll } from "react-scroll";
import axios from "axios";

import FidelidadeStep from "./Steps/FidelidadeStep";
import PlanoDeVozStep from "./Steps/PlanoDeVozStep";
import Assinatura0800Step from "./Steps/Assinatura0800Step";
import Assinatura3003Step from "./Steps/Assinatura3003Step";
import VencimentoStep from "./Steps/VencimentoStep";
import DadosCliente from "./Steps/DadosClienteStep";
import DadosResponsavel from "./Steps/DadosResponsavel";
import sendEmail from "../components/emailUtils";
import Portabilidade from "../components/PortarNumero";

export default function App() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [fidelidade, setFidelidade] = useState("escolha");
  const [assinaturas0800, setAssinatura0800] = useState("assinaturas");
  const [assinaturas3003, setAssinatura3003] = useState("assinaturas");
  const [vencimento, setVencimento] = useState("escolha");
  const [formData, setFormData] = useState({});
  const [planoDeVozStep, setPlanoDeVozStep] = useState("escolha");
  const [dados, setDados] = useState({});
  const [selectedNumbersData, setSelectedNumbersData] = useState([]);
  const vencimentoDefault = formData[4]?.vencimento;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const clearLocalStorage = () => {
    localStorage.removeItem("savedNumbers");
  };

  //   useEffect(() => {
  //   handleEnviar();
  // }, [selectedNumbersData]);

  const handleStepData = (stepData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [activeStep]:
        activeStep === 1 ? { ...prevFormData[1], ...stepData } : stepData,
    }));
  };

  const handlePreviousStepData = (stepData, stepIndex) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [stepIndex]: stepData,
    }));
  };

  const handlePortarNumeroDataChange = (portarNumeroData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [1]: { ...prevFormData[1], ...portarNumeroData },
    }));
  };
  const handlePortarNumeroDataChange0800 = (portarNumeroData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [1]: { ...prevFormData[1], ...portarNumeroData },
    }));
  };
  const handlePortarNumeroDataChange3003 = (portarNumeroData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [1]: { ...prevFormData[1], ...portarNumeroData },
    }));
  };

  const handleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const handleEnviar = () => {
    setCompletedSteps([...completedSteps, activeStep]);

    // Verifica se está na última etapa
    if (isLastStep) {
      sendEmail(formData);
      setEmailSent(true);
      handleConfirmationModal();
    }
  };
  const handleResetForm = () => {
    setFidelidade("escolha");
    setAssinatura0800("assinaturas");
    setAssinatura3003("assinaturas");
    setVencimento("escolha");
    setPlanoDeVozStep("escolha");
    setFormData({});
    setDados({});
    setSelectedNumbersData([]);
    setEmailSent(false);
    handleConfirmationModal();
    setCompletedSteps([]);
    setActiveStep(0);
    clearLocalStorage();
  };

  const handleNextStep = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    setActiveStep(activeStep + 1);
  };

  const handlePreviousStep = () => {
    handlePreviousStepData(formData[activeStep], activeStep);
    setActiveStep(activeStep - 1);
  };

  const handleFidelidadeChange = (value) => {
    setFidelidade(value);
  };

  const handleAssinatura0800Change = (value) => {
    setAssinatura0800(value);
  };

  const handleAssinatura3003Change = (value) => {
    setAssinatura3003(value);
  };

  const handleVencimentoChange = (value) => {
    setVencimento(value);
  };

  const steps = [
    {
      component: (
        <FidelidadeStep
          onNext={handleStepData}
          defaultValue={formData[0]?.fidelidade}
        />
      ),
      showNextButton: true,
    },
    {
      component: (
        <PlanoDeVozStep
          onNext={handleStepData}
          defaultValue={formData[1]}
          onPortarNumeroDataChange={handlePortarNumeroDataChange}
        />
      ),
      showNextButton: true,
    },
    {
      component: (
        <Assinatura0800Step
          onNext={handleStepData}
          assinaturas0800={assinaturas0800}
          onAssinatura0800Change={handleAssinatura0800Change}
          defaultValue={formData[2]}
          onPortarNumeroDataChange0800={handlePortarNumeroDataChange0800}
        />
      ),
      showNextButton: true,
    },
    {
      component: (
        <Assinatura3003Step
          onNext={handleStepData}
          assinaturas3003={assinaturas3003}
          onAssinatura3003Change={handleAssinatura3003Change}
          defaultValue={formData[3]}
          selectedNumbersData={selectedNumbersData}
          setSelectedNumbersData={setSelectedNumbersData}
          onPortarNumeroDataChange3003={handlePortarNumeroDataChange3003}
        />
      ),
      showNextButton: true,
    },
    {
      component: (
        <VencimentoStep
          onVencimentoChange={handleVencimentoChange}
          onNext={handleStepData}
          defaultValue={formData[4]?.vencimento}
        />
      ),
      showNextButton: true,
    },
    {
      component: (
        <DadosCliente
          onNext={handleStepData}
          formData={formData[5]}
          defaultValue={formData[5]}
        />
      ),
      showNextButton: true,
    },

    {
      component: (
        <DadosResponsavel onNext={handleStepData} defaultValue={formData[6]} />
      ),
      showNextButton: false,
    },
  ];

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  return (
    <div>
      <Container>
        <Box sx={{ my: 4 }}>
          <style jsx global>{`
            html,
            #root {
              height: 100%;
            }
            body {
              font-family: "Axiforma";
            }
            * {
              /* Aplicar a fonte personalizada a todos os elementos de texto */
              font-family: "Axiforma", sans-serif;
            }
          `}</style>

          <style jsx>{`
            .container {
              display: flex;
              flex-direction: column;
              min-height: 60vh; /* Ajuste o valor aqui para reduzir a altura */
              justify-content: space-between;
            }

            .stepContainer {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .stepButtons {
              position: fixed;
              bottom: 0;
              left: ${isFirstStep ? "25%" : "0"};
              display: flex;
              justify-content: space-around;
              padding: 1rem;
              width: 100%;

            .stepButtons button {
              outline: none;
              flex: 1; /* Faz os botões ocuparem o espaço disponível */
            }
          `}</style>

          <div className="container">
            <div>
              {steps.map((step, index) => (
                <Element
                  key={index}
                  name={`step-${index}`}
                  className="stepContainer"
                >
                  {index === activeStep && step.component}
                </Element>
              ))}
            </div>
            <div className="stepButtons">
              {!isFirstStep && (
                <Button variant="contained" onClick={handlePreviousStep}>
                  Voltar
                </Button>
              )}
              {steps[activeStep].showNextButton && (
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  // disabled={!formData[activeStep]}
                >
                  Seguinte
                </Button>
              )}
              {isLastStep && (
                <Button variant="contained" onClick={handleEnviar}>
                  Enviar
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Container>
      {/* Confirmation Modal */}
      <Dialog
        open={showConfirmationModal}
        onClose={handleConfirmationModal}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          Confirmação de envio
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {emailSent
              ? "O email foi enviado com sucesso!"
              : "Tem certeza que deseja enviar o formulário?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!emailSent && (
            <Button onClick={handleConfirmationModal} color="primary">
              Cancelar
            </Button>
          )}
          <Button onClick={handleResetForm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
