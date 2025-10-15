// Simplified HandCash Service for Bitcoin Identity
export interface HandCashUser {
  handle: string;
  paymail: string;
  avatarUrl?: string;
  publicProfile?: {
    id: string;
    handle: string;
    paymail: string;
    displayName?: string;
    avatarUrl?: string;
  };
}

export class HandCashService {
  private currentUser: HandCashUser | null = null;
  private accessToken: string | null = null;

  constructor() {
    // Check for stored session on initialization
    this.loadSession();
  }

  // Start the login flow
  async login(): Promise<void> {
    // For now, simulate HandCash login with mock data
    // In a real implementation, this would redirect to HandCash OAuth
    console.log('Starting HandCash login...');
    
    // Simulate OAuth flow
    const mockUser: HandCashUser = {
      handle: 'bitcoinidentity',
      paymail: 'bitcoinidentity@handcash.io',
      avatarUrl: 'https://handcash.io/favicon.ico',
      publicProfile: {
        id: 'mock-handcash-id',
        handle: 'bitcoinidentity',
        paymail: 'bitcoinidentity@handcash.io',
        displayName: 'Bitcoin Identity',
        avatarUrl: 'https://handcash.io/favicon.ico'
      }
    };

    this.accessToken = 'mock-access-token';
    this.currentUser = mockUser;
    this.saveSession();
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Handle OAuth callback
  async handleCallback(authToken: string): Promise<HandCashUser> {
    console.log('HandCash callback received');
    
    this.accessToken = authToken;
    
    // In real implementation, fetch user profile with token
    const user: HandCashUser = {
      handle: 'bitcoinidentity',
      paymail: 'bitcoinidentity@handcash.io',
      avatarUrl: 'https://handcash.io/favicon.ico'
    };
    
    this.currentUser = user;
    this.saveSession();
    
    return user;
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    this.accessToken = null;
    
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      localStorage.removeItem('handcashUser');
      localStorage.removeItem('handcashToken');
    }
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.accessToken !== null;
  }

  // Get current user
  getCurrentUser(): HandCashUser | null {
    return this.currentUser;
  }

  // Get access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Save session to localStorage
  private saveSession(): void {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    if (this.currentUser) {
      localStorage.setItem('handcashUser', JSON.stringify(this.currentUser));
    }
    if (this.accessToken) {
      localStorage.setItem('handcashToken', this.accessToken);
    }
  }

  // Load session from localStorage
  private loadSession(): void {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    try {
      const storedUser = localStorage.getItem('handcashUser');
      const storedToken = localStorage.getItem('handcashToken');
      
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.accessToken = storedToken;
      }
    } catch (error) {
      console.error('Failed to load HandCash session:', error);
      // Clear invalid session data
      this.logout();
    }
  }

  // Make authenticated request (mock implementation)
  async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    // Mock API response
    return {
      success: true,
      data: 'Mock API response'
    };
  }
}