import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createTheme, CSSVariablesResolver, MantineProvider} from "@mantine/core";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {Notifications} from '@mantine/notifications';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const theme = createTheme({
    primaryColor: 'primary',
    primaryShade: 6,
    autoContrast: true,
    luminanceThreshold: 0.4,
    colors: {
        primary: ['#edeff4', '#d3d5dc', '#b9bbc4', '#9fa1ac', '#858794', '#6b6d7c', '#505263', '#36394b', '#1b1d32', '#0b0d11'],
        secondary: ['#eff1f5', '#e0e3eb', '#c0c7d8', '#a1abc4', '#8290b0', '#62749d', '#4f5d7d', '#3b455e', '#272e3f', '#14171f'],
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
        '--mantine-color-text': theme.colors.text[0],
    },
    light: {
        '--mantine-color-body': theme.colors.primary[0],
        '--mantine-color-text': theme.colors.text[9],
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <MantineProvider forceColorScheme="dark" theme={theme} cssVariablesResolver={cssVariablesResolver}>
                    <Notifications />
                    <App />
                </MantineProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
