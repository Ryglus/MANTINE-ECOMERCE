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
        primary: ['#ffffff', '#e3fafc', '#c5f6fa', '#99e9f2', '#66d9e8', '#3bc9db', '#22b8cf', '#15aabf', '#1098ad', '#0c8599'],
        bg: ['#A5A6AE', '#828595', '#72768C', '#646983', '#585D7A', '#4C5273', '#464C6B', '#414663', '#3B405A', '#353A52']
    },
    components: {
        LoadingOverlay: {
            defaultProps: {
                overlayProps: { blur: 2.5, color: '#353A52' }
            }
        },
        Divider: {
            defaultProps: { color: 'bg.6' }
        }
    }
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
