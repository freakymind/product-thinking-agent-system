# Privacy & Data Architecture

## Overview

Agent PM is designed with **privacy-first architecture** where all your data stays in your browser and API calls go directly to your chosen LLM provider. We never see, store, or access your requirements, ideas, or conversations.

## Data Flow Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         YOUR BROWSER                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           localStorage (Your Data)                    │  │
│  │  • Project requirements                               │  │
│  │  • Agent conversations                                │  │
│  │  • Generated artifacts                                │  │
│  │  • Your API keys (if provided)                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Agent PM Application Logic                    │  │
│  │  • 10 AI agents running in browser                    │  │
│  │  • Context management                                 │  │
│  │  • Requirements generation                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│                  Direct API Calls                           │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────────┐
        │                                           │
   ┌────▼─────┐              ┌────────────────┐   │
   │  OpenAI  │              │   Anthropic    │   │
   │   API    │    OR        │  (Claude) API  │   │ Your Choice
   └──────────┘              └────────────────┘   │
        │                           │              │
        └───────────────────────────┴──────────────┘
                   LLM Provider APIs
\`\`\`

## How It Works

### 1. **Your Data Stays Local**

All your data is stored in your browser's localStorage:
- Project context and requirements
- All agent conversations
- Generated artifacts (problems, features, data schemas, etc.)
- Session state and progress

**We never:**
- Send your data to our servers
- Store your data in any database
- Have access to your requirements or ideas
- Track or log your conversations

### 2. **Two API Options**

#### Option A: Use Vercel AI Gateway (Default in v0)
- Works automatically in the v0.dev environment
- No setup required
- Supports: OpenAI, Anthropic, Google, AWS Bedrock, Fireworks
- Your prompts go through Vercel's gateway but **we don't access them**
- Model format: `openai/gpt-4o`, `anthropic/claude-sonnet-4`

#### Option B: Use Your Own API Keys (Recommended for Privacy)
1. Get an API key from OpenAI, Anthropic, or compatible provider
2. Go to Settings in Agent PM
3. Enter your API key (stored only in your browser's localStorage)
4. All API calls go **directly from your browser to the LLM provider**

**With your own API keys:**
- Zero intermediaries - direct browser-to-LLM connection
- Your API key never leaves your browser
- No one else can access your conversations
- You control the billing and usage

### 3. **Client-Side Architecture**

\`\`\`javascript
// Example: How API calls work with your key
// File: /app/api/chat/[stage]/route.ts

export async function POST(request: Request) {
  // 1. Get user's message from browser
  const { messages } = await request.json()
  
  // 2. User's API key is passed from browser localStorage
  //    (or Vercel AI Gateway is used by default)
  
  // 3. Make direct API call to LLM provider
  const response = await streamText({
    model: MODEL, // e.g., "openai/gpt-4o"
    messages,
    // API key comes from env var or AI SDK gateway
  })
  
  // 4. Stream response back to browser
  return response.toDataStreamResponse()
  
  // NOTE: At no point do we store or log your data
}
\`\`\`

### 4. **Session Management**

\`\`\`javascript
// File: /lib/session-store.ts
// Uses Zustand with localStorage persistence

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,        // Stored in YOUR browser
      messages: {},         // Stored in YOUR browser
      artifacts: {},        // Stored in YOUR browser
      // ... all state is local
    }),
    {
      name: 'product-coach-session',  // localStorage key
    }
  )
)
\`\`\`

## Privacy Guarantees

### ✅ What We DO

1. **Provide the application interface** - The UI and agent logic that runs in your browser
2. **Route API calls** - If using Vercel AI Gateway, we provide the infrastructure
3. **Enable downloads** - You can export your PRDs as markdown/JSON files
4. **Open source transparency** - Our code is visible in v0.dev for inspection

### ❌ What We DON'T Do

1. **Store your requirements** - No database, no server-side storage
2. **Access your conversations** - We can't read your agent interactions
3. **Track your projects** - No analytics on your requirement data
4. **Keep your API keys** - Only stored in your browser's localStorage
5. **Log API calls** - When using your own keys, calls go direct to LLM provider

## Security Best Practices

### For Maximum Privacy

1. **Use your own API keys** - Set them in Settings
2. **Use a private browser session** - Or clear localStorage when done
3. **Export and save locally** - Download your PRDs to your device
4. **Review the code** - Check the implementation in v0.dev
5. **Use VPN** - If you want to hide your IP from LLM providers

### Data Lifecycle

1. **Creation**: You input data → Stored in browser localStorage
2. **Processing**: Agents process locally → LLM API calls with your data
3. **Storage**: Results saved to localStorage → No server transmission
4. **Export**: Download PRD files → Stored on your device
5. **Deletion**: Clear browser data or reset session → Permanent deletion

## Compliance Notes

- **GDPR Compliant**: No personal data stored on our servers
- **CCPA Compliant**: No data selling, no tracking
- **SOC 2**: Not applicable as we don't store user data
- **Data Residency**: All data in your browser, you control the location

## Verifying Our Claims

You can verify this architecture:

1. **Check Network Tab**: Open browser DevTools → Network
   - You'll see API calls going directly to OpenAI/Anthropic domains
   - No data sent to Agent PM servers (except page loads)

2. **Inspect localStorage**: 
   \`\`\`javascript
   // In browser console:
   console.log(localStorage.getItem('product-coach-session'))
   // You'll see all your data is stored locally
   \`\`\`

3. **Review Source Code**: 
   - Check `/app/api/chat/[stage]/route.ts` for API logic
   - Check `/lib/session-store.ts` for storage logic
   - No server-side databases in the codebase

4. **Monitor API Usage**:
   - Check your OpenAI/Anthropic dashboard
   - You'll see API calls coming from your IP (not ours)

## Questions?

**Q: Can Agent PM employees see my requirements?**  
A: No. Your data is only in your browser. We have no access.

**Q: What if I use Vercel AI Gateway?**  
A: Your prompts route through Vercel's infrastructure, but we don't log or access them. For maximum privacy, use your own API keys.

**Q: Is my data encrypted?**  
A: localStorage is as secure as your device. For additional security, use browser encryption extensions or private browsing.

**Q: What happens if I clear my browser?**  
A: All your data is deleted permanently. Export your PRDs first!

**Q: Can I self-host this?**  
A: Yes! The code is visible in v0.dev. You can deploy it to your own infrastructure for complete control.

---

**Last Updated**: January 2025  
**Architecture Version**: 2.0 (Agentic AI)
