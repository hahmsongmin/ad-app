import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const CustomAlert = ({ successMsg, errorMsg }: { successMsg?: string; errorMsg?: string }) => {
  return (
    <Stack sx={{ width: "40%", position: "absolute", transform: "translate(60%, 500%)", zIndex: 10 }} spacing={2}>
      {errorMsg && (
        <Alert
          severity="error"
          variant="filled"
          color="error"
          sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
        >
          {errorMsg}
        </Alert>
      )}
      {successMsg && (
        <Alert
          severity="success"
          variant="filled"
          color="info"
          sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
        >
          {successMsg}
        </Alert>
      )}
    </Stack>
  );
};

export default CustomAlert;
