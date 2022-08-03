import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  }
});

export function SetTheme() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness4Icon/> : <Brightness7Icon/>}
      </IconButton>
    </>
  )
}

interface IProps {
  children: any
}

export default function ToggleColorMode(props: IProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{
          color: 'text.primary',
        }}>
          {props.children}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
