import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createTheme, CSSVariablesResolver, MantineProvider} from "@mantine/core";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import App from './App'
import './index.css'

const queryClient = new QueryClient();

const theme = createTheme({
    autoContrast: true,
    luminanceThreshold: 0.4,
    primaryColor: 'primary',
    primaryShade: 6,
    colors: {
        secondary: ['#eff1f5', '#e0e3eb', '#c0c7d8', '#a1abc4', '#8290b0', '#62749d', '#4f5d7d', '#3b455e', '#272e3f', '#14171f'],
        primary: ['#f1eff5', '#e3e0eb', '#c7c0d8', '#aaa1c4', '#8e82b0', '#72629d', '#5b4f7d', '#443b5e', '#2e273f', '#17141f'],
        bg: ['#f3eff5', '#e6e0eb', '#cec0d8', '#b5a1c4', '#9d82b0', '#84629d', '#6a4f7d', '#4f3b5e', '#35273f', '#1a141f'],
        text: ['#eff1f5', '#dfe3ec', '#c0c7d8', '#a0abc5', '#818eb1', '#61729e', '#4e5b7e', '#3a455f', '#272e3f', '#131720'],
    },
    components: {
        LoadingOverlay: {
            defaultProps: {
                overlayProps: { blur: 2.5, color: '#353A52' },
            },
        },
        Divider: {
            defaultProps: { color: 'bg.6' },
        },
    },
});


const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
    variables: {},
    dark: {
        '--mantine-color-body': theme.colors.bg[9],
        '--mantine-color-text': theme.white
    },
    light: {}
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <MantineProvider forceColorScheme="dark" theme={theme} cssVariablesResolver={cssVariablesResolver}>
                  <App />
              </MantineProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
