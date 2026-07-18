export const lightColors = {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#222222',
    textSecondary: '#717171',
    border: '#EBEBEB',
    inputBorder: '#DDDDDD',
    primary: '#FF385C',
    card: '#FFFFFF',
    statusBarStyle: 'dark' as const,
};

export const darkColors = {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#F2F2F2',
    textSecondary: '#A0a0a0',
    border: '#2A2A2A',
    inputBorder: '#3a3a3a',
    primary: '#FF385C',
    card: '#1E1E1E',
    statusBarStyle: 'light' as const
}

export type ThemeColors = typeof lightColors;