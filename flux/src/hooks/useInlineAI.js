// src/hooks/useInlineAI.js
import { useRef, useCallback } from 'react';
import apiClient from '@/lib/axios';

export function useInlineAI() {
  const abortControllerRef = useRef(null);

  const fetchSuggestion = useCallback(async (fimContext) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();

    try {
      const response = await apiClient.post('/api/ai/suggestions', fimContext, {
        signal: abortControllerRef.current.signal 
      });
      
      let suggestion = response.data?.suggestion || response.data?.data?.suggestion || '';
      return suggestion.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');
      
    } catch (error) {
      if (error.name !== 'CanceledError') {
        console.error("🚨 Inline AI API Error:", error);
      }
      return '';
    }
  }, []);

  return { fetchSuggestion };
}