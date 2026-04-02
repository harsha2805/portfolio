export interface AppDownload {
    label: string;
    fileName: string;
    size: string;
    type: 'installer' | 'portable';
}

export interface AppFeature {
    title: string;
    desc: string;
    icon: string;
}

export interface AppData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    features: AppFeature[];
    tech: string[];
    version: string;
    platform: string;
    downloads: AppDownload[];
    accentColor: string;
    accentRgb: string;
}

export const apps: AppData[] = [
    {
        id: 'smartawake',
        name: 'SmartAwake',
        tagline: 'Keeps your PC awake while downloads run — sleeps when they stop.',
        description:
            'A smart, set-it-and-forget-it power management tool for Windows. Watches network traffic in real time, prevents sleep while downloads are active, then automatically releases when activity drops. No more interrupted 10 GB downloads, no more forgetting to turn off "stay awake" all night.',
        features: [
            { title: 'Smart Mode', desc: 'Auto-detects downloads and prevents sleep. Configurable threshold, polling interval, idle timeout, and cooldown.', icon: '⚡' },
            { title: 'Manual Override', desc: 'Force awake indefinitely or for a set duration — "keep awake for 2 hours".', icon: '🔒' },
            { title: 'Display Control', desc: 'Keep screen on, let it sleep, or force it off without locking — saves power during long downloads.', icon: '🖥' },
            { title: 'Wake Scheduler', desc: 'Schedule wake from sleep at a specific time using Windows waitable timers.', icon: '⏰' },
            { title: 'Power Scheduler', desc: 'Schedule sleep, hibernate, or shutdown after a delay or at a specific time.', icon: '🔋' },
            { title: 'Mouse Simulator', desc: 'Subtle random movement to prevent idle detection by apps or remote sessions.', icon: '🖱' },
            { title: 'System Tray', desc: 'Color-coded status icons. Closing the window keeps it running in the background.', icon: '📌' },
            { title: 'Zero Dependencies', desc: 'Single self-contained EXE. No .NET runtime needed. No third-party packages.', icon: '📦' },
        ],
        tech: ['WPF', '.NET 10', 'Win32 P/Invoke', 'MVVM'],
        version: '1.0.0',
        platform: 'Windows',
        downloads: [
            { label: 'Installer', fileName: 'SmartAwake_Setup_1.0.0.exe', size: '51 MB', type: 'installer' },
            { label: 'Portable', fileName: 'SmartAwake.exe', size: '182 MB', type: 'portable' },
        ],
        accentColor: '#22c55e',
        accentRgb: '34,197,94',
    },
];

export function getAppById(id: string): AppData | undefined {
    return apps.find((a) => a.id === id);
}
