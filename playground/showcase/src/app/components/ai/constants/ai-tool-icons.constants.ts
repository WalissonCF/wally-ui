/**
 * SVG icons for AI tools integration
 * Each icon is stored as an inline SVG string for dynamic rendering
 */
export const AI_TOOL_ICONS: Record<string, string> = {
  /**
   * Figma - Design tool
   */
  figma: `<svg class="size-5" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0 500C0 444.772 44.772 400 100 400H200V500C200 555.228 155.228 600 100 600C44.772 600 0 555.228 0 500Z" fill="#24CB71" />
    <path d="M200 0V200H300C355.228 200 400 155.228 400 100C400 44.772 355.228 0 300 0H200Z" fill="#FF7237" />
    <path d="M299.167 400C354.395 400 399.167 355.228 399.167 300C399.167 244.772 354.395 200 299.167 200C243.939 200 199.167 244.772 199.167 300C199.167 355.228 243.939 400 299.167 400Z" fill="#00B6FF" />
    <path d="M0 100C0 155.228 44.772 200 100 200H200V0H100C44.772 0 0 44.772 0 100Z" fill="#FF3737" />
    <path d="M0 300C0 355.228 44.772 400 100 400H200V200H100C44.772 200 0 244.772 0 300Z" fill="#874FFF" />
  </svg>`,

  /**
   * Notion - Note-taking and collaboration
   */
  notion: `<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
  </svg>`,

  /**
   * GitHub - Code repository
   */
  github: `<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>`,

  /**
   * Slack - Team communication
   */
  slack: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
  </svg>`,

  /**
   * Google Drive - Cloud storage
   */
  drive: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7.71 3.5L1.15 15l2.55 4.5h17.3L23.85 15 17.29 3.5H7.71z" fill="#0066DA"/>
    <path d="M7.71 3.5L1.15 15l2.55 4.5L11 8.5 7.71 3.5z" fill="#00AC47"/>
    <path d="M17.29 3.5L11 8.5l-7.3 11h17.3l2.85-4.5L17.29 3.5z" fill="#EA4335"/>
    <path d="M11 8.5L7.71 3.5H17.29L11 8.5z" fill="#00832D"/>
    <path d="M11 8.5l-7.3 11h5.1L17.29 3.5H11z" fill="#2684FC"/>
    <path d="M11 8.5l12.85 6.5-2.85 4.5H3.7L11 8.5z" fill="#FFBA00"/>
  </svg>`,

  /**
   * Jira - Project management
   */
  jira: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="jira-gradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="18%" stop-color="#0052CC"/>
        <stop offset="100%" stop-color="#2684FF"/>
      </linearGradient>
      <linearGradient id="jira-gradient-2" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="18%" stop-color="#2684FF"/>
        <stop offset="100%" stop-color="#0052CC"/>
      </linearGradient>
    </defs>
    <path fill="url(#jira-gradient-1)" d="M11.5 2.5L2.5 11.5l3.3 3.3 5.7-5.7 3.3-3.3z"/>
    <path fill="url(#jira-gradient-2)" d="M11.5 9.1l-3.3 3.3 3.3 3.3 5.7-5.7-3.3-3.3z"/>
    <path fill="#2684FF" d="M14.8 12.4l-3.3 3.3L15 19.2l5.7-5.7z"/>
  </svg>`,

  /**
   * Linear - Issue tracking
   */
  linear: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3.5 3.5l17 17M3.5 20.5l17-17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </svg>`,

  /**
   * Asana - Task management
   */
  asana: `<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="18" cy="6" r="3.5" fill="#F06A6A"/>
    <circle cx="6" cy="6" r="3.5" fill="#F06A6A"/>
    <circle cx="12" cy="18" r="3.5" fill="#F06A6A"/>
  </svg>`,

  /**
   * Trello - Kanban boards
   */
  trello: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="2" fill="#0079BF"/>
    <rect x="5" y="5" width="5" height="12" rx="1" fill="white"/>
    <rect x="14" y="5" width="5" height="7" rx="1" fill="white"/>
  </svg>`,

  /**
   * Miro - Whiteboard collaboration
   */
  miro: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#FFD02F"/>
    <path d="M8 8l8 8M16 8l-8 8" stroke="#050038" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  /**
   * Confluence - Documentation
   */
  confluence: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="confluence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0052CC"/>
        <stop offset="100%" stop-color="#2684FF"/>
      </linearGradient>
    </defs>
    <path d="M3 17c1.5-2 3.5-3 6-3s4.5 1 6 3l3 4" stroke="url(#confluence-gradient)" stroke-width="2" fill="none"/>
    <path d="M21 7c-1.5 2-3.5 3-6 3s-4.5-1-6-3L6 3" stroke="url(#confluence-gradient)" stroke-width="2" fill="none"/>
  </svg>`,

  /**
   * Google Calendar - Scheduling
   */
  calendar: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <rect x="7" y="13" width="2" height="2" fill="currentColor" rx="0.5"/>
    <rect x="11" y="13" width="2" height="2" fill="currentColor" rx="0.5"/>
    <rect x="15" y="13" width="2" height="2" fill="currentColor" rx="0.5"/>
    <rect x="7" y="17" width="2" height="2" fill="currentColor" rx="0.5"/>
    <rect x="11" y="17" width="2" height="2" fill="currentColor" rx="0.5"/>
  </svg>`,

  /**
   * Gmail - Email
   */
  gmail: `<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M24 5.5v13c0 .8-.7 1.5-1.5 1.5h-21C.7 20 0 19.3 0 18.5v-13C0 4.7.7 4 1.5 4h21c.8 0 1.5.7 1.5 1.5z" fill="#4285F4"/>
    <path d="M22.5 6L12 13.5 1.5 6v12h21V6z" fill="white"/>
    <path d="M1.5 6L12 13.5 22.5 6 12 1 1.5 6z" fill="#EA4335"/>
  </svg>`,

  /**
   * Recomendação - Recommendations and suggestions
   */
  recommendation: `<svg class="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFD700"/>
        <stop offset="50%" stop-color="#FFA500"/>
        <stop offset="100%" stop-color="#FF8C00"/>
      </linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#star-gradient)"/>
    <circle cx="12" cy="12" r="2" fill="#FFFFFF" opacity="0.8"/>
    <path d="M12 8v2M12 14v2M8 12h2M14 12h2" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </svg>`,

  /**
   * Comprar - Shopping and purchases (Phosphor Icons - Package Duotone)
   */
  shopping: `<svg class="size-5" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="package-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF9F1C"/>
        <stop offset="100%" stop-color="#FFCB69"/>
      </linearGradient>
      <linearGradient id="package-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFB84D"/>
        <stop offset="100%" stop-color="#FFA500"/>
      </linearGradient>
    </defs>
    <!-- Parte com opacidade (fundo) -->
    <path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,.7-3.25Z" fill="url(#package-gradient-1)" opacity="0.3"/>
    <!-- Parte principal -->
    <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56l80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z" fill="url(#package-gradient-2)"/>
  </svg>`,

  /**
   * Análise Ponto Comercial - Business location analytics
   */
  'business-analytics': `<svg class="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="analytics-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#11998e"/>
        <stop offset="100%" stop-color="#38ef7d"/>
      </linearGradient>
    </defs>
    <path d="M12 2C8.5 2 6 4.5 6 8c0 5.5 6 12 6 12s6-6.5 6-12c0-3.5-2.5-6-6-6z" fill="url(#analytics-gradient)"/>
    <circle cx="12" cy="8" r="2.5" fill="#FFFFFF"/>
    <path d="M9 8.5l1 2 1.5-3 1.5 2" stroke="url(#analytics-gradient)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="16" y="16" width="2" height="4" rx="0.5" fill="url(#analytics-gradient)" opacity="0.8"/>
    <rect x="19" y="14" width="2" height="6" rx="0.5" fill="url(#analytics-gradient)" opacity="0.8"/>
    <rect x="13" y="18" width="2" height="2" rx="0.5" fill="url(#analytics-gradient)" opacity="0.8"/>
  </svg>`,

  /**
   * Cotar - Price quotes and budgets (Phosphor Icons - Percent)
   */
  'quote': `<svg class="size-5" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="quote-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4FC3F7"/>
        <stop offset="50%" stop-color="#2196F3"/>
        <stop offset="100%" stop-color="#0D47A1"/>
      </linearGradient>
    </defs>
    <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.73,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.27,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.14,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.14,214.31,142.11ZM120,96a24,24,0,1,0-24,24A24,24,0,0,0,120,96ZM88,96a8,8,0,1,1,8,8A8,8,0,0,1,88,96Zm72,40a24,24,0,1,0,24,24A24,24,0,0,0,160,136Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,160,168Zm13.66-74.34-80,80a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,11.32Z" fill="url(#quote-gradient)"/>
  </svg>`
};
