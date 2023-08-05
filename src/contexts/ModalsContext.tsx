"use client";

import { ModalProps } from "@/components/container/Modal";
import { FC, ReactNode, createContext, useContext, useState } from "react";

export interface ModalTemplate {
  props?: ModalProps,
  sticky?: boolean, // Prevent any other modal from opening and it can be only instance of same modal
  modal: FC<ModalProps>
}

interface ModalsContextInterface {
  openModal: (template: ModalTemplate) => void;
  closeModal: (template: ModalTemplate) => void,
}

const ModalsContext = createContext<ModalsContextInterface | null>(null);

export function useModalsContext() {
  return useContext(ModalsContext);
}

export function ModalsContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [templateStack, setTemplateStack] = useState<ModalTemplate[]>([]);

  const currentTemplate = templateStack.length > 0 ? templateStack[templateStack.length - 1] : null;
  const CurrentModal = currentTemplate?.modal;
  const isModalOpen = CurrentModal != null;

  const { onClose: onModalClose, ...restModalProps } = currentTemplate?.props ?? {
    onClose: () => { }
  };

  function addTemplate(newTemplate: ModalTemplate) {
    setTemplateStack((prevTemplateStack) => {
      const newTemplateStack = [];
      for (const t of prevTemplateStack) {
        if (t.modal === newTemplate.modal) {
          if (!newTemplate.sticky) {
            if (t.sticky) {
              newTemplate.props?.onClose?.apply(null);
              return prevTemplateStack;
            } else {
              newTemplateStack.push(t);
            }
          }else{
            t.props?.onClose?.apply(null);
          }
        } else {
          newTemplateStack.push(t);
        }
      }
      newTemplateStack.push(newTemplate);
      return newTemplateStack;
    });
  }

  function removeTemplate(removeTemplate: ModalTemplate) {
    setTemplateStack((prevTemplateStack) => {
      const index = prevTemplateStack.indexOf(removeTemplate);
      if (index !== -1) {
        removeTemplate.props?.onClose?.apply(null);
        return prevTemplateStack.slice(index, -1);
      }
      return prevTemplateStack;
    });
  }

  function handleModalClose() {
    if (currentTemplate) {
      removeTemplate(currentTemplate);
    }
  }

  const modalsContextInterface: ModalsContextInterface = {
    openModal(template: ModalTemplate) {
      addTemplate(template);
    },
    closeModal(template: ModalTemplate) {
      removeTemplate(template);
    },
  }

  return (
    <ModalsContext.Provider value={modalsContextInterface}>
      {children}

      {isModalOpen && <CurrentModal onClose={handleModalClose} {...restModalProps} />}
    </ModalsContext.Provider>
  );
}