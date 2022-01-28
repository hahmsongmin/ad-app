import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const CustomAlert = ({ successMsg, errorMsg }: { successMsg?: string; errorMsg?: string }) => {
  return (
    <StackContainer spacing={2}>
      {errorMsg && (
        <AlertS severity="error" variant="filled" color="error">
          {errorMsg}
        </AlertS>
      )}
      {successMsg && (
        <AlertS severity="success" variant="filled" color="info">
          {successMsg}
        </AlertS>
      )}
    </StackContainer>
  );
};

export default CustomAlert;

const StackContainer = styled(Stack)({
  width: "40%",
  position: "absolute",
  top: 350,
  left: 280,
  zIndex: 10,
});

const AlertS = styled(Alert)({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
});
