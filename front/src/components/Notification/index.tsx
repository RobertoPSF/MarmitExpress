import { useEffect } from "react";
import { Container, StyledIcon } from "./style";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Notification = ({ message, type = "error", onClose }: NotificationProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // desaparece após 3 segundos

    return () => clearTimeout(timeout);
  }, [onClose]);


  return <>
      <Container type={type}>
        {type === "success" ? <StyledIcon icon={'ep:success-filled'} /> : null}
        {type === "error" ? <StyledIcon icon={'typcn:warning'} /> : null}
        {message}
      </Container>
    </>
};

export default Notification;
