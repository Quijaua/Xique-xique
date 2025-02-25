class ThemeManager {
    constructor() {
        this.configPath = '/xique-xique.config.json';
        this.defaultTheme = {
            primary: '#1a237e',
            secondary: '#424242',
            light: '#f5f5f5',
            dark: '#212121',
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
    }

    async loadTheme() {
        try {
            const response = await fetch(this.configPath);
            if (!response.ok) throw new Error('Arquivo de configuração não encontrado');
            
            const config = await response.json();
            this.applyTheme(config.theme.colors);
        } catch (error) {
            console.warn('Usando tema padrão:', error);
            this.applyTheme(this.defaultTheme);
        }
    }

    applyTheme(colors) {
        const root = document.documentElement;

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}-color`, value);
        });
    }
}

// Inicializar o tema quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.loadTheme();
});
