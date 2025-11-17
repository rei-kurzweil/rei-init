export class DebugUrlTracker {
    private readonly storageKey = 'meow_debug';
    
    constructor() {
        this.initialize();
    }
    
    private initialize(): void {
        // Ensure the debug object exists in localStorage
        this.ensureDebugObject();
        
        // Get current URL parameters
        const currentParams = this.getCurrentUrlParams();
        
        // Read existing debug data
        const debugData = this.getDebugData();
        
        // Merge current parameters with existing data
        const updatedData = { ...debugData, ...currentParams };
        
        // Save updated data back to localStorage
        this.saveDebugData(updatedData);
        
        // Log the current state to console
        this.logDebugData(updatedData);
    }
    
    private ensureDebugObject(): void {
        const existing = localStorage.getItem(this.storageKey);
        if (!existing) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
            console.log('🐱 Meow Debug: Initialized empty debug object in localStorage');
        }
    }
    
    private getCurrentUrlParams(): Record<string, string> {
        const params: Record<string, string> = {};
        const url = new URL(window.location.href);
        const timestamp = new Date().toISOString();
        
        // Add timestamp for this capture
        params[`_last_captured_${Date.now()}`] = timestamp;
        
        // Get query parameters (after ?)
        const searchParams = url.searchParams;
        for (const [key, value] of searchParams.entries()) {
            params[`query_${key}`] = value;
        }
        
        // Get fragment/hash parameters (after #)
        const hashFragment = url.hash.substring(1); // Remove the # character
        if (hashFragment) {
            // Try to parse as URLSearchParams first
            try {
                const hashParams = new URLSearchParams(hashFragment);
                for (const [key, value] of hashParams.entries()) {
                    params[`fragment_${key}`] = value;
                }
            } catch (error) {
                // If it's not valid URLSearchParams format, store the entire fragment
                params['fragment_raw'] = hashFragment;
            }
        }
        
        return params;
    }
    
    private getDebugData(): Record<string, string> {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('🐱 Meow Debug: Error parsing debug data from localStorage:', error);
            return {};
        }
    }
    
    private saveDebugData(data: Record<string, string>): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data, null, 2));
            console.log('🐱 Meow Debug: Saved updated debug data to localStorage');
        } catch (error) {
            console.error('🐱 Meow Debug: Error saving debug data to localStorage:', error);
        }
    }
    
    private logDebugData(data: Record<string, string>): void {
        console.log('🐱 Meow Debug: Current URL parameters tracking:');
        console.table(data);
        console.log('🐱 Meow Debug: Raw data:', data);
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
    public getData(): Record<string, string> {
        return this.getDebugData();
    }
}