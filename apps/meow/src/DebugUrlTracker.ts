interface DebugEntry {
    fragment: Record<string, string>;
    query: Record<string, string>;
}

interface DebugData {
    [timeKey: string]: DebugEntry;
}

export class DebugUrlTracker {
    private readonly storageKey = 'meow_debug';
    private readonly sensitiveKeys = ['provider_token', 'access_token', 'refresh_token'];
    private readonly preserveLength = 4; // Show first 4 characters
    
    constructor() {
        this.initialize();
    }
    
    private initialize(): void {
        // Ensure the debug object exists in localStorage
        this.ensureDebugObject();
        
        // Get current URL parameters
        const currentParams = this.getCurrentUrlParams();
        
        // Get time key for current session (YYYY-MM-DD HH:MM format)
        const timeKey = this.getCurrentTimeKey();
        
        // Read existing debug data
        const debugData = this.getDebugData();
        
        // Add/update entry for current time
        debugData[timeKey] = currentParams;
        
        // Save updated data back to localStorage
        this.saveDebugData(debugData);
        
        // Log the current state to console
        this.logDebugData(debugData);
    }
    
    private ensureDebugObject(): void {
        const existing = localStorage.getItem(this.storageKey);
        if (!existing) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
            console.log('🐱 Meow Debug: Initialized empty debug object in localStorage');
        }
    }
    
    private getCurrentTimeKey(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    private sanitizeValue(key: string, value: string): string {
        if (this.sensitiveKeys.includes(key.toLowerCase())) {
            if (value.length <= this.preserveLength) {
                // If the value is very short, just show dots
                return '...';
            }
            // Show first few characters then truncate with dots
            return value.substring(0, this.preserveLength) + '...';
        }
        return value;
    }
    
    private sanitizeRawFragment(fragment: string): string {
        // Check if the raw fragment contains any sensitive token patterns
        let sanitized = fragment;
        
        for (const sensitiveKey of this.sensitiveKeys) {
            // Look for patterns like "access_token=abc123" in the raw fragment
            const regex = new RegExp(`(${sensitiveKey}=)([^&]+)`, 'gi');
            sanitized = sanitized.replace(regex, (_match, keyPart, valuePart) => {
                const sanitizedValue = valuePart.length <= this.preserveLength 
                    ? '...' 
                    : valuePart.substring(0, this.preserveLength) + '...';
                return keyPart + sanitizedValue;
            });
        }
        
        return sanitized;
    }
    
    private getCurrentUrlParams(): DebugEntry {
        const url = new URL(window.location.href);
        
        const entry: DebugEntry = {
            fragment: {},
            query: {}
        };
        
        // Get query parameters (after ?)
        const searchParams = url.searchParams;
        for (const [key, value] of searchParams.entries()) {
            entry.query[key] = this.sanitizeValue(key, value);
        }
        
        // Get fragment/hash parameters (after #)
        const hashFragment = url.hash.substring(1); // Remove the # character
        if (hashFragment) {
            // Try to parse as URLSearchParams first
            try {
                const hashParams = new URLSearchParams(hashFragment);
                for (const [key, value] of hashParams.entries()) {
                    entry.fragment[key] = this.sanitizeValue(key, value);
                }
            } catch (error) {
                // If it's not valid URLSearchParams format, store the entire fragment
                // Check if it might contain sensitive data and sanitize accordingly
                const sanitizedFragment = this.sanitizeRawFragment(hashFragment);
                entry.fragment['_raw'] = sanitizedFragment;
            }
        }
        
        return entry;
    }
    
    private getDebugData(): DebugData {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('🐱 Meow Debug: Error parsing debug data from localStorage:', error);
            return {};
        }
    }
    
    private saveDebugData(data: DebugData): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data, null, 2));
            console.log('🐱 Meow Debug: Saved updated debug data to localStorage');
        } catch (error) {
            console.error('🐱 Meow Debug: Error saving debug data to localStorage:', error);
        }
    }
    
    private logDebugData(data: DebugData): void {
        console.log('🐱 Meow Debug: URL parameters tracking by time:');
        console.table(data);
        console.log('🐱 Meow Debug: Raw data:', data);
        
        // Also log the current session specifically
        const currentTimeKey = this.getCurrentTimeKey();
        if (data[currentTimeKey]) {
            console.log(`🐱 Meow Debug: Current session (${currentTimeKey}):`, data[currentTimeKey]);
        }
    }
    
    // Public method to manually refresh and log current state
    public refresh(): void {
        console.log('🐱 Meow Debug: Manual refresh triggered');
        this.initialize();
    }
    
    // Public method to clear debug data
    public clear(): void {
        localStorage.removeItem(this.storageKey);
        console.log('🐱 Meow Debug: Cleared debug data from localStorage');
    }
    
    // Public method to get current debug data
    public getData(): DebugData {
        return this.getDebugData();
    }
    
    // Public method to get data for a specific time
    public getDataForTime(timeKey: string): DebugEntry | undefined {
        const data = this.getDebugData();
        return data[timeKey];
    }
    
    // Public method to get all time keys
    public getTimeKeys(): string[] {
        const data = this.getDebugData();
        return Object.keys(data).sort();
    }
}