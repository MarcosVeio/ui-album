import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "./fragments/tabPanel";
import { useState } from "react";
import { Typography } from "@mui/material";
import { HeaderForm, PaperCustom } from "./styles";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabPanelComponent({
  loginForm,
  registerForm,
}: Readonly<{
  loginForm: React.ReactNode;
  registerForm: React.ReactNode;
}>) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PaperCustom elevation={4}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            bgcolor: "background.paper",
          }}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Cadastro" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <HeaderForm>
        <Typography variant="h4" fontWeight={700} color="#2d3a4a">
          Bem-vindo!
        </Typography>
        <Typography color="#6b7a90">
          Acesse ou crie sua conta para continuar
        </Typography>
      </HeaderForm>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {loginForm}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {registerForm}
      </TabPanel>
    </PaperCustom>
  );
}
