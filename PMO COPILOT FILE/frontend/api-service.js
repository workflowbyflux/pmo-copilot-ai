// PMO Copilot AI — Centralized API Service
// Replaces direct placeholder data access with backend integration hooks.
// Falls back to the simulated/localStorage response if the backend is offline.

(function() {
  const PMOAPIService = {
    async getAnalysisResult(industry, goal, description) {
      const baseUrl = (window.PMO_CONFIG && window.PMO_CONFIG.BACKEND_BASE_URL) || 'http://localhost:8000/api';
      
      const queryParams = new URLSearchParams({
        ind: industry,
        goal: goal,
        desc: description
      });

      try {
        // Attempt to fetch from Python backend
        const response = await fetch(`${baseUrl}/analysis?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Successfully retrieved AI analysis from backend.');
          return data;
        } else {
          console.warn(`Backend error response (Status: ${response.status}). Using local fallback service.`);
        }
      } catch (error) {
        console.warn('Backend server is unavailable. Utilizing offline simulation fallback. Error details:', error);
      }

      // Fallback: Read from local AIAgentService (localStorage or structured profiles)
      if (window.AIAgentService) {
        return window.AIAgentService.getAgentResponse(industry, goal, description);
      }

      return null;
    }
  };

  window.PMOAPIService = PMOAPIService;
})();
