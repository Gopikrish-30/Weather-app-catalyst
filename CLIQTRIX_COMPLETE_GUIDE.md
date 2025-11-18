# CliqTrix 2025 - Complete Developer Guide

## 📋 Table of Contents
1. [Contest Overview](#contest-overview)
2. [Rules & Eligibility](#rules--eligibility)
3. [Zoho Cliq Platform Architecture](#zoho-cliq-platform-architecture)
4. [Building Your Extension](#building-your-extension)
5. [Integration & Authentication](#integration--authentication)
6. [Testing & Deployment](#testing--deployment)
7. [Project Ideas & Examples](#project-ideas--examples)
8. [Resources & Documentation](#resources--documentation)

---

## 🏆 Contest Overview

**CliqTrix** is Zoho's annual app-building contest for students, where participants create real-time productivity apps on Zoho's collaboration platforms.

### Contest Timeline (2025)
- **Nov 10** - Registration starts
- **Nov 15-16** - Educational webinar for contestants
- **Nov 25** - Last date to register
- **Nov 30** - App submission date
- **Dec 14** - D-day (Results)

### Prizes
- **1st Place**: ₹1,00,000 + Internship opportunity at Zoho
- **2nd Place**: ₹50,000
- **3rd Place**: ₹25,000
- **5 Runner-ups**: ₹5,000 each

**Total Prize Pool**: ₹2,00,000

---

## 📜 Rules & Eligibility

### Eligibility Criteria
- **Participants**: Individuals or teams of 2 students
- **Education**: 
  - Undergraduate engineering students (any stream), 2nd year to final year
  - B.Sc. Computer Science/IT students
- **Location**: Open to students (check official site for regional restrictions)

### App Criteria
1. **Choose One Platform**:
   - Build a **Zoho Cliq extension** (productivity app for chat)
   - OR build a **SalesIQ bot/widget** (for website engagement)

2. **For Cliq Extensions** (most relevant):
   - Must include **at least one widget OR bot**
   - Cannot duplicate existing Marketplace apps
   - Should enhance team productivity/collaboration
   - Must follow Zoho's extension guidelines

3. **Submission Rules**:
   - Only **one submission** allowed per team
   - Must be original work
   - Should be functional and tested

### What You Can Build
- Standalone Cliq extension with unique functionality
- Integration connecting Cliq with third-party applications (e.g., Trello, GitHub, Google Calendar)
- Productivity tools (task management, time tracking, reminders)
- Automation bots for team workflows
- Data visualization widgets (dashboards, analytics)

---

## 🏗️ Zoho Cliq Platform Architecture

Zoho Cliq provides a developer platform with multiple components that can be bundled into extensions.

### Core Components

#### 1. **Bots** (@mentions)
Conversational interfaces that respond to user interactions.

**What Bots Can Do**:
- Respond to @mentions and direct messages
- Execute commands and fetch data
- Send notifications and alerts
- Automate repetitive tasks

**Bot Handlers**:
- `welcome` - Triggered when user subscribes
- `message` - Handles user messages
- `mention` - Responds to @mentions
- `context` - Context-based interactions
- `webhook` - Receives external data
- `participation` - Join/leave events
- `call` - Handle call events
- `menu` - Menu interactions

**Example Use Cases**:
- Project status bot (fetches from Jira/GitHub)
- Booking bot (conference room reservations)
- FAQ bot (knowledge base lookup)
- Alert bot (server monitoring, payment notifications)

#### 2. **Slash Commands** (/command)
Quick actions triggered from chat window.

**Features**:
- Arguments (e.g., `/traffic Pleasanton`)
- Parameters (e.g., `/traffic -to Airport -from Home`)
- Suggestions (dropdown choices)
- Mentions (e.g., `/pulltasks @John`)
- Attachments (file uploads)

**Example Commands**:
- `/createtask "Task name"` - Create task in external system
- `/standup` - Start daily standup meeting
- `/expense 250 lunch` - Log expense
- `/weather London` - Get weather info

#### 3. **Widgets** (Sidebar UI)
Full-page custom interfaces displayed in Cliq's sidebar/home screen.

**Widget Structure**:
```
Widget
  └── Tabs (max 5)
      └── Sections (max 25 per tab)
          └── Elements (max 20 per section)
```

**Tab View Types**:
1. **Sections View** - Multiple elements (text, buttons, charts, tables)
2. **Info View** - Important message with single action button
3. **Web View** - Embed external webpage (iframe)
4. **Map View** - Display maps with tickers
5. **Form View** - Interactive forms (supports kiosk mode)

**Widget Elements**:
- Title, Text, Subtext, Divider
- Buttons (action triggers)
- User Activity (status indicators)
- Tables, Fields (data display)
- Cards (gallery view)
- Images, Charts, Graphs
- Forms (input collection)

**Widget Headers & Footers**:
- Fixed headers with breadcrumbs navigation
- Up to 3 buttons in header/footer
- Pagination support

**Example Widgets**:
- Team task board (Kanban view)
- Analytics dashboard (charts & metrics)
- Calendar view (upcoming events)
- Report viewer (sales performance)

#### 4. **Message Actions** (Context Menu)
Actions available via right-click on messages.

**Features**:
- Apply to text messages, attachments, or links
- Can work on single or multiple messages
- Access levels: Private, Team, Organization

**Example Actions**:
- "Add to Tasks" - Convert message to task
- "Translate" - Translate message text
- "Save to Notes" - Archive important messages
- "Create Ticket" - Generate support ticket

#### 5. **Functions** (Backend Logic)
Server-side code executed when bots/commands/widgets are triggered.

**Function Types**:
- **Button Functions** - Triggered by button clicks
- **Form Functions** - Handle form submissions
- **Widget Functions** - Support widget interactions

**Language**: Deluge (Zoho's scripting language) or Node.js

#### 6. **Schedulers** (Timed Jobs)
Automate recurring tasks at specified intervals.

**Recurring Periods**:
- **Daily** - Every N days
- **Weekly** - Specific days of week
- **Monthly** - Specific dates or day patterns
- **Yearly** - Annual recurrence

**Common Use Cases**:
- Daily standup reminders
- Weekly sales reports
- Monthly financial summaries
- Quarterly reviews

#### 7. **Databases** (Data Storage)
Cloud-based storage for extension data.

**Field Types**:
- Text (250 chars max)
- Number (19 digits max)
- Boolean (true/false)
- Encrypted-text (250 chars, secure)
- Large-text (1000 chars)

**Database Limits**:
- Free Plan: 50 databases
- Unlimited Plan: 100 databases
- Max fields: 19 per database

**Operations**: Create, Read, Update, Delete (CRUD) via Deluge or REST API

#### 8. **Forms** (Data Collection)
Interactive forms for user input within Cliq.

**Form Elements**:
- Text input, Number input
- Select (dropdown), Radio buttons, Checkboxes
- Date/Time picker
- File upload
- Custom validation

---

## 🔧 Building Your Extension

### Step-by-Step Extension Creation

#### Phase 1: Planning
1. **Identify Use Case**
   - What problem does it solve?
   - Who are the users?
   - What's the core workflow?

2. **Choose Components**
   - Bot only (conversational)?
   - Widget only (visual dashboard)?
   - Bot + Widget (hybrid)?
   - Commands, Functions, Schedulers?

3. **Design Architecture**
   ```
   Extension: "Team Task Manager"
   ├── Bot (@taskbot)
   │   ├── Create task
   │   ├── List my tasks
   │   └── Task notifications
   ├── Widget (Task Dashboard)
   │   ├── Tab 1: My Tasks
   │   ├── Tab 2: Team Tasks
   │   └── Tab 3: Analytics
   ├── Commands
   │   ├── /createtask [title]
   │   └── /mytasks
   ├── Functions
   │   ├── taskCreator()
   │   ├── taskFetcher()
   │   └── taskUpdater()
   └── Database
       └── tasks_db (fields: id, title, assignee, status, due_date)
   ```

#### Phase 2: Build Components

**1. Create Bot**
```deluge
// Bot Message Handler
response = Map();
input = message.get("content").get("text");

if(input.contains("create task")) {
    // Extract task details
    taskTitle = input.replaceFirst("create task ", "");
    
    // Store in database
    row = Map();
    row.put("title", taskTitle);
    row.put("assignee", user.get("email"));
    row.put("status", "Open");
    row.put("created_date", zoho.currentdate);
    
    result = zoho.cliq.createRecord("tasks_db", row);
    
    // Send confirmation
    response.put("text", "✅ Task created: *" + taskTitle + "*");
} else if(input.contains("my tasks")) {
    // Fetch user's tasks
    criteria = "assignee == \"" + user.get("email") + "\"";
    tasks = zoho.cliq.getRecords("tasks_db", criteria);
    
    // Format response
    taskList = "📋 *Your Tasks:*\n";
    for each task in tasks {
        taskList = taskList + "• " + task.get("title") + " (" + task.get("status") + ")\n";
    }
    response.put("text", taskList);
} else {
    response.put("text", "Hi! I can help with:\n• create task [title]\n• my tasks");
}

return response;
```

**2. Create Widget**
```deluge
// Widget Handler
tabs = {
    {"label": "My Tasks", "id": "mytasks"},
    {"label": "Team Tasks", "id": "teamtasks"},
    {"label": "Analytics", "id": "analytics"}
};

// Fetch tasks
tasks = zoho.cliq.getRecords("tasks_db");

// Build sections
elements = list();
elements.add({"type": "title", "text": "Task Dashboard"});

// Add table
headers = {"Task", "Assignee", "Status", "Due Date"};
rows = list();
for each task in tasks {
    row = {
        task.get("title"),
        task.get("assignee"),
        task.get("status"),
        task.get("due_date")
    };
    rows.add(row);
}
elements.add({"type": "table", "headers": headers, "rows": rows});

// Add action button
elements.add({
    "type": "buttons",
    "buttons": {
        {
            "label": "Create New Task",
            "type": "invoke.function",
            "name": "createTaskForm",
            "id": "new_task"
        }
    }
});

sections = {{"id": 1, "elements": elements}};

return {
    "type": "applet",
    "tabs": tabs,
    "active_tab": "mytasks",
    "sections": sections
};
```

**3. Create Command**
```deluge
// Command Handler (/createtask)
response = Map();
taskTitle = arguments.get("task_title");

if(taskTitle != null && taskTitle != "") {
    // Create task
    row = Map();
    row.put("title", taskTitle);
    row.put("assignee", user.get("email"));
    row.put("status", "Open");
    
    result = zoho.cliq.createRecord("tasks_db", row);
    
    response.put("text", "✅ Task \"" + taskTitle + "\" created successfully!");
} else {
    response.put("text", "❌ Please provide a task title: `/createtask [title]`");
}

return response;
```

**4. Create Database**
1. Navigate to: Profile → Bots & Tools → Databases
2. Click "Create Database"
3. Configure:
   - Unique Name: `tasks_db`
   - Display Name: `Tasks Database`
   - Description: `Stores all team tasks`
4. Add Fields:
   - `title` (Text, Mandatory)
   - `assignee` (Text, Mandatory)
   - `status` (Text, Default: "Open")
   - `due_date` (Text)
   - `priority` (Text, Default: "Medium")
   - `description` (Large-text)

#### Phase 3: Bundle Extension

1. **Create Extension**:
   - Profile → Bots & Tools → Extensions → Create Extension
   - Name: "Team Task Manager"
   - Description: "Manage team tasks directly in Cliq"
   - Select components: Bot, Widget, Commands, Functions, Database

2. **Configure Extension Details**:
   - Extension icon (upload 512x512 PNG)
   - Category: Productivity
   - Access level: Organization
   - Version: 1.0.0

3. **Extension Handlers** (Optional but recommended):
   - **Installation Handler**: Setup code when extension is installed
   - **Installation Validator**: Check prerequisites
   - **Incoming Webhook Handler**: Handle external callbacks
   - **Uninstallation Handler**: Cleanup code

4. **Link Handlers** (Optional):
   - Preview Handler: Custom link previews
   - Action Handler: Actions on link previews
   - Menu Handler: Context menu for links

---

## 🔐 Integration & Authentication

### Connecting Third-Party Services

#### 1. **Connections (OAuth 2.0)**

Zoho Connections simplify OAuth authentication with external services.

**Setup Steps**:
1. Navigate to: Profile → Bots & Tools → Connections
2. Click "Create Connection"
3. Choose service (or Custom OAuth)
4. Configure:
   - Client ID
   - Client Secret
   - Authorization URL
   - Token URL
   - Scopes

**Supported Services**:
- Google (Calendar, Drive, Gmail)
- GitHub
- Trello
- Slack
- Microsoft (Office 365, Teams)
- Custom OAuth 2.0 services

**Using in Code**:
```deluge
// Authenticate and call API
connection = zoho.cliq.getConnection("google_calendar");
url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
response = invokeurl
[
    url: url
    type: GET
    connection: connection
];
return response;
```

#### 2. **Incoming Webhooks**

Receive real-time updates from external services.

**Webhook URL Format**:
```
https://cliq.zoho.com/api/v2/applications/{app_id}/incoming?appkey={app_key}
```

**Authentication**:
- Include `appkey` in URL
- Optionally validate with `zapi_key`

**Webhook Handler Code**:
```deluge
// Extension Incoming Webhook Handler
payload = request.get("payload");
eventType = payload.get("event");

if(eventType == "task.created") {
    taskName = payload.get("task").get("name");
    
    // Send notification to channel
    message = "🆕 New task created: *" + taskName + "*";
    zoho.cliq.postToChannel("general", message);
    
    // Store in database
    row = Map();
    row.put("title", taskName);
    row.put("status", "Open");
    zoho.cliq.createRecord("tasks_db", row);
}

return {"text": "Webhook received"};
```

**Register Webhook with External Service**:
```javascript
// Example: Register with GitHub
POST https://api.github.com/repos/{owner}/{repo}/hooks
{
  "name": "web",
  "active": true,
  "events": ["push", "pull_request"],
  "config": {
    "url": "https://cliq.zoho.com/api/v2/applications/123456/incoming?appkey=YOUR_APP_KEY",
    "content_type": "json"
  }
}
```

#### 3. **App Keys**

Unique identifiers for authentication.

**Types**:
- **Sandbox App Key**: For testing
- **Marketplace App Key**: For published extensions

**Usage**:
```deluge
// Include in API calls
appKey = "your_app_key_here";
url = "https://cliq.zoho.com/api/v2/...?appkey=" + appKey;
```

**Generate New Keys**:
- Extension → Connectors → App Key → Generate
- Maximum 3 active keys at once

#### 4. **Zoho Catalyst vs Deluge**

**Deluge (Recommended for Beginners)**:
- Zoho's easy scripting language
- Built-in functions for Cliq operations
- No separate hosting needed
- Executes within Cliq platform

**Zoho Catalyst (Advanced)**:
- Full-stack serverless platform (PaaS)
- Supports Node.js, Java, Python
- Advanced features: AI/ML, File storage, Cron jobs
- Requires separate Catalyst project
- More powerful for complex integrations

**When to Use Each**:
- **Deluge**: Simple bots, commands, basic workflows
- **Catalyst**: Complex logic, external databases, ML models, heavy processing

**Catalyst Integration Example**:
```javascript
// Catalyst Function (Node.js)
module.exports = async function(req, res) {
    const taskTitle = req.query.title;
    
    // Process with external API or ML model
    const result = await processTask(taskTitle);
    
    // Return to Cliq
    res.json({
        text: `Task processed: ${result.summary}`
    });
};
```

---

## 🧪 Testing & Deployment

### Testing in Sandbox

**Sandbox Environment**:
- Every extension has a sandbox version
- Test before publishing to marketplace
- No impact on production users

**Testing Workflow**:
1. Create extension components (bot, widget, etc.)
2. Extension auto-creates sandbox versions
3. Test in your organization
4. Make changes in sandbox code
5. Push to production when ready

**Testing Checklist**:
- [ ] Bot responds correctly to all commands
- [ ] Widget displays data properly
- [ ] Commands execute without errors
- [ ] Forms validate input correctly
- [ ] Database operations work (CRUD)
- [ ] Schedulers run at correct times
- [ ] External API calls succeed
- [ ] Webhooks receive data correctly
- [ ] Error handling works
- [ ] Performance is acceptable
- [ ] Mobile view renders correctly

### Trial Run Feature

Test schedulers without waiting:
1. Open scheduler preview
2. Click "Trial Run" button
3. Check execution logs
4. Verify behavior

### Quality Assurance

**Code Review**:
- Check for hardcoded credentials
- Validate user inputs
- Handle edge cases
- Add error messages
- Log important events

**Security**:
- Use encrypted fields for sensitive data
- Validate webhook signatures
- Sanitize user inputs
- Limit API rate calls
- Follow OAuth best practices

**Performance**:
- Optimize database queries
- Cache frequently accessed data
- Limit API calls
- Use pagination for large datasets
- Minimize widget load time

### Packaging for Submission

**Extension Checklist**:
1. **Extension Details**:
   - Clear name and description
   - Professional icon (512x512 PNG)
   - Accurate category selection
   - Version number

2. **Documentation**:
   - User guide (how to use)
   - Installation instructions
   - Configuration steps
   - Screenshots/demo video

3. **Code Quality**:
   - Remove debug code
   - Add comments
   - Handle errors gracefully
   - Follow Deluge/JS best practices

4. **Testing**:
   - Test all features
   - Verify in different scenarios
   - Check mobile compatibility
   - Validate permissions

### Publishing to Marketplace (Post-Contest)

**Steps**:
1. Extension → Publish Extension
2. Fill marketplace listing:
   - Title, tagline, description
   - Screenshots (min 3, max 10)
   - Demo video (optional, recommended)
   - Category and tags
   - Pricing (Free or Paid)
   - Support email

3. Marketing Guidelines:
   - Extension icon: 512x512px PNG, no text
   - Screenshots: 1280x800px or 800x1280px
   - Video: MP4, max 100MB, 1-3 minutes
   - Description: Clear, concise, highlight benefits

4. Submission Review:
   - Zoho reviews (1-2 weeks)
   - May request changes
   - Approval = Live on Marketplace

### Contest Submission Checklist

- [ ] Extension is functional and tested
- [ ] At least one bot OR widget implemented
- [ ] Not a duplicate of existing Marketplace app
- [ ] Code is clean and documented
- [ ] Demo video prepared (2-3 minutes)
- [ ] User guide written
- [ ] Screenshots captured
- [ ] Team details confirmed
- [ ] Submission form completed by Nov 30
- [ ] Presentation prepared for finalists (if selected)

---

## 💡 Project Ideas & Examples

### Past Winners & Examples

#### CliqTrix 2023 Winners
1. **Razorpay Bot** - Track payments and transactions
2. **Airtable Integration** - Sync databases with Cliq

#### CliqTrix 2025 Finalists
1. **Basecamp Integration (Team: AUTOBOTS)** - Fetch and display project tasks
2. **YNAB Budgeting Bot** - Personal finance tracking
3. **AfterWork Buddy Bot** - Auto-mute notifications after hours

### Productivity App Ideas

#### 1. **Task Management**
- **Todoist Sync**: Sync tasks between Todoist and Cliq
- **Kanban Board**: Visual task board widget
- **Sprint Planner**: Agile sprint management
- **Daily Standup Bot**: Automate standup meetings

#### 2. **Time Management**
- **Time Tracker**: Log work hours via commands
- **Pomodoro Timer**: Productivity timer bot
- **Meeting Scheduler**: Book and manage meetings
- **Calendar Sync**: Integrate Google/Outlook calendars

#### 3. **Collaboration**
- **Document Collaboration**: Share and edit docs in Cliq
- **Whiteboard Widget**: Real-time brainstorming
- **Code Snippet Sharer**: Share formatted code snippets
- **Decision Maker**: Vote on team decisions

#### 4. **DevOps & Development**
- **GitHub/GitLab Bot**: PR notifications, issue tracking
- **CI/CD Status**: Build and deployment status
- **Server Monitor**: Uptime and performance alerts
- **Bug Tracker**: Log and track bugs

#### 5. **Customer Support**
- **Ticket System**: Create and manage support tickets
- **Customer Feedback**: Collect and analyze feedback
- **FAQ Bot**: Answer common questions
- **Escalation Manager**: Auto-escalate urgent issues

#### 6. **Finance & Expense**
- **Expense Tracker**: Log expenses via bot
- **Invoice Generator**: Create invoices from chat
- **Budget Monitor**: Track team/project budgets
- **Receipt Scanner**: Upload and categorize receipts

#### 7. **Health & Wellness**
- **Break Reminder**: Periodic stretch/break alerts
- **Water Intake Tracker**: Hydration reminders
- **Mental Health Check-in**: Daily mood tracker
- **Fitness Challenge**: Team fitness competitions

#### 8. **Fun & Engagement**
- **Trivia Bot**: Daily trivia questions
- **Birthday Reminder**: Celebrate team birthdays
- **Kudos Bot**: Recognize team achievements
- **Random Coffee**: Match teammates for virtual coffee

### Integration Ideas (Third-Party)

- **Monday.com** - Project management sync
- **Zenkit** - Flexible project tool integration
- **Asana** - Task and workflow sync
- **Notion** - Knowledge base integration
- **Figma** - Design file sharing
- **Jira** - Issue tracking
- **Salesforce** - CRM data access
- **Shopify** - E-commerce orders/inventory
- **Stripe** - Payment notifications
- **Twilio** - SMS integration
- **SendGrid** - Email campaign stats

### Stand-alone Extension Ideas

- **Checklist Maker**: Convert messages to actionable checklists
- **Poll Creator**: Quick polls and surveys
- **Notes Widget**: Shared team notes
- **Link Shortener**: Shorten URLs in chat
- **Translation Bot**: Translate messages on the fly
- **Weather Bot**: Daily weather updates
- **News Digest**: Curated news summaries
- **Quote of the Day**: Motivational quotes
- **Reminder Bot**: Set personal/team reminders
- **Analytics Dashboard**: Team activity insights

---

## 📚 Resources & Documentation

### Official Documentation

#### Zoho Cliq Developer Platform
- **Getting Started**: https://www.zoho.com/cliq/help/platform/getting-started-with-cliq-platform.html
- **Bots**: https://www.zoho.com/cliq/help/platform/bots.html
- **Commands**: https://www.zoho.com/cliq/help/platform/commands.html
- **Widgets**: https://www.zoho.com/cliq/help/platform/widgets.html
- **Functions**: https://www.zoho.com/cliq/help/platform/functions.html
- **Schedulers**: https://www.zoho.com/cliq/help/platform/schedulers.html
- **Databases**: https://www.zoho.com/cliq/help/platform/cliq-database.html
- **Message Actions**: https://www.zoho.com/cliq/help/platform/messageactions.html

#### Extension Development
- **Building Extensions**: https://www.zoho.com/cliq/help/platform/build-cliq-extensions.html
- **Publishing Extensions**: https://www.zoho.com/cliq/help/platform/cliq-extensions-publish.html
- **Extension Upgrades**: https://www.zoho.com/cliq/help/platform/cliq-extension-upgrades.html
- **Marketing Guidelines**: https://www.zoho.com/cliq/help/platform/extension-marketing-guidelines.html

#### API & Integration
- **REST API v2**: https://www.zoho.com/cliq/help/restapi/v2/
- **Connections**: https://www.zoho.com/cliq/help/platform/webhooktokens.html
- **Webhooks**: https://www.zoho.com/cliq/help/platform/webhook-tokens.html
- **Forms**: https://www.zoho.com/cliq/help/platform/cliq-forms.html

#### Zoho Catalyst
- **Catalyst Home**: https://catalyst.zoho.com/
- **Catalyst Docs**: https://docs.catalyst.zoho.com/
- **Catalyst CLI**: https://docs.catalyst.zoho.com/en/getting-started/installing-catalyst-cli/
- **Cliq Integration Tutorial**: https://catalyst.zoho.com/help/tutorials/githubbot/introduction.html

### Learning Resources

#### Tutorials & Webinars
- **Zoho Cliq Webinars**: https://www.zoho.com/cliq/webinars.html
- **Cliq Blog**: https://www.zoho.com/blog/cliq
- **What's New**: https://www.zoho.com/cliq/whats-new.html

#### Community
- **User Community**: https://help.zoho.com/portal/community/zoho-cliq/
- **Forum**: https://forums.catalyst.zoho.com/
- **Stack Overflow**: Tag `zoho-cliq` or `catalystbyzoho`

#### Sample Code & Examples
- **Zoho Marketplace**: https://marketplace.zoho.com/cliq
  - Study existing extensions for inspiration
  - See code patterns and UI designs
- **GitHub - Catalyst Examples**: https://github.com/catalystbyzoho

### Contest-Specific

#### CliqTrix Portal
- **Official Site**: https://www.cliqtrix.com/
- **Registration**: https://creatorapp.zohopublic.in/zohointranet/cliqtrix/form-perma/REGISTRATION_REPORT1/...
- **Terms & Conditions**: https://oweb.zohowebstatic.com/sites/oweb/images/cliqtrix/cliqtrix-terms-conditions.pdf
- **Contact**: contact@cliqtrix.com

#### Winner Case Studies
- **Basecamp Integration (Medium)**: https://williyam.medium.com/
- Search for "CliqTrix 2023", "CliqTrix 2025" winners for more examples

### Deluge Scripting
- **Deluge Documentation**: https://www.zoho.com/deluge/help/
- **Deluge Script Editor**: Built into Cliq platform
- **Deluge Tasks**: Pre-built functions for common operations

### Development Tools

#### Required Tools
- **Zoho Cliq Account** (Free): https://www.zoho.com/cliq/signup.html
- **Text Editor/IDE**: VS Code, Sublime, Atom (for planning)
- **Postman**: For testing REST APIs
- **Browser DevTools**: For debugging widgets

#### Optional Tools
- **Zoho Catalyst CLI**: For Catalyst functions
- **Git/GitHub**: For version control
- **Figma**: For UI design mockups
- **OBS Studio**: For recording demo videos

### Key Help Topics

#### Troubleshooting
- Check logs in function/bot execution history
- Use `info` statements to debug Deluge code
- Test components individually before bundling
- Verify API endpoints with Postman first
- Check webhook payload format

#### Common Issues
1. **Bot not responding**: Check handler syntax, verify bot subscription
2. **Widget not loading**: Validate JSON structure, check element limits
3. **Database errors**: Verify field names, check data types
4. **API calls failing**: Check connection setup, validate auth tokens
5. **Scheduler not running**: Verify timezone, check ends configuration

### Recommended Reading Order

**For Beginners**:
1. Getting Started with Cliq Platform
2. Creating Your First Bot
3. Creating Your First Command
4. Building a Simple Widget
5. Using Cliq Databases
6. Building Your First Extension

**For Integration Projects**:
1. Connections (OAuth Setup)
2. Incoming Webhooks
3. REST API Documentation
4. Extension Incoming Webhook Handler
5. Third-party API documentation (GitHub, Trello, etc.)

**For Advanced Developers**:
1. Catalyst Platform Overview
2. Extension Handlers (Advanced)
3. Link Unfurling
4. Catalyst Functions Integration
5. Performance Optimization

---

## 🚀 Quick Start Template

### Basic Bot + Widget Extension

```deluge
/* ==========================================
   BOT MESSAGE HANDLER
   ========================================== */
response = Map();
input = message.get("content").get("text").toLowerCase();

if(input.contains("hello") || input.contains("hi")) {
    response.put("text", "👋 Hello! I'm your assistant. How can I help?");
}
else if(input.contains("help")) {
    helpText = "📚 *Available Commands:*\n";
    helpText = helpText + "• Type 'hello' to greet\n";
    helpText = helpText + "• Type 'help' for this message\n";
    helpText = helpText + "• Type 'dashboard' to open widget";
    response.put("text", helpText);
}
else if(input.contains("dashboard")) {
    // Trigger widget opening
    response.put("text", "Opening dashboard...");
    // Widget will open in sidebar
}
else {
    response.put("text", "I didn't understand. Type 'help' for commands.");
}

return response;

/* ==========================================
   WIDGET HANDLER
   ========================================== */
tabs = {
    {"label": "Home", "id": "home"},
    {"label": "Settings", "id": "settings"}
};

elements = list();
elements.add({"type": "title", "text": "📊 Dashboard"});
elements.add({"type": "text", "text": "Welcome to your custom widget!"});
elements.add({"type": "divider"});
elements.add({
    "type": "buttons",
    "buttons": {
        {
            "label": "Action Button",
            "type": "invoke.function",
            "name": "myFunction",
            "id": "action1"
        }
    }
});

sections = {{"id": 1, "elements": elements}};

return {
    "type": "applet",
    "tabs": tabs,
    "active_tab": "home",
    "sections": sections
};

/* ==========================================
   COMMAND HANDLER (/mycommand)
   ========================================== */
response = Map();
arg = arguments.get("argument");

if(arg != null) {
    response.put("text", "✅ Command executed with: " + arg);
} else {
    response.put("text", "❌ Usage: /mycommand [argument]");
}

return response;

/* ==========================================
   FUNCTION (Button/Form Handler)
   ========================================== */
response = Map();
buttonId = target.get("id");

if(buttonId == "action1") {
    // Handle button click
    response.put("text", "Button clicked! Action completed.");
}

return response;
```

---

## 📝 Submission Preparation

### Documentation to Prepare

1. **README.md**
   ```markdown
   # Extension Name
   
   ## Description
   Brief overview of what your extension does.
   
   ## Features
   - Feature 1
   - Feature 2
   - Feature 3
   
   ## Installation
   1. Step 1
   2. Step 2
   
   ## Usage
   ### Bot Commands
   - `command1` - Description
   - `command2` - Description
   
   ### Widget
   Explain how to use widget features.
   
   ## Screenshots
   [Include screenshots]
   
   ## Technologies Used
   - Zoho Cliq Platform
   - Deluge
   - [External APIs if any]
   
   ## Team
   - Member 1 - Role
   - Member 2 - Role
   ```

2. **Demo Video Script**
   - Introduction (10s): What is the extension?
   - Problem Statement (20s): What problem does it solve?
   - Solution (30s): How does your extension solve it?
   - Demo (60-90s): Live demonstration of features
   - Conclusion (10s): Summary and call to action

3. **Presentation (If Finalist)**
   - Slide 1: Title + Team
   - Slide 2: Problem Statement
   - Slide 3: Solution Overview
   - Slide 4: Architecture
   - Slide 5: Key Features
   - Slide 6: Demo
   - Slide 7: Impact & Future Plans
   - Slide 8: Thank You

### Testing Scenarios to Cover

- [ ] Happy path (everything works)
- [ ] Invalid inputs
- [ ] Missing parameters
- [ ] API failures
- [ ] Large datasets
- [ ] Multiple concurrent users
- [ ] Mobile device view
- [ ] Different timezones
- [ ] Slow network conditions

---

## 🎯 Tips for Winning

### What Judges Look For

1. **Innovation**: Unique idea, creative solution
2. **Usefulness**: Solves real productivity problem
3. **Implementation**: Clean code, good UX
4. **Completeness**: Fully functional, polished
5. **Presentation**: Clear demo, good documentation

### Best Practices

✅ **Do**:
- Focus on ONE core problem
- Keep UI simple and intuitive
- Add helpful error messages
- Test thoroughly
- Document clearly
- Make demo video engaging
- Show real-world use case

❌ **Don't**:
- Try to build too many features
- Ignore error handling
- Forget mobile view
- Copy existing Marketplace apps
- Leave bugs unfixed
- Skip documentation
- Overcomplicate the UI

### Time Management

**Week 1 (Nov 10-16)**: Planning & Design
- Research ideas
- Design architecture
- Create wireframes
- Attend webinar

**Week 2 (Nov 17-23)**: Development
- Build core features
- Create database schema
- Implement bot/widget
- Test basic functionality

**Week 3 (Nov 24-30)**: Polish & Submit
- Fix bugs
- Improve UX
- Write documentation
- Record demo video
- Submit by Nov 30

---

## 🤝 Support & Help

### Getting Help

1. **Official Support**:
   - Email: support@zohocliq.com
   - Contest: contact@cliqtrix.com

2. **Community**:
   - Zoho Cliq Community Forum
   - Stack Overflow (tag: zoho-cliq)
   - Developer Twitter: @zohocliq

3. **Documentation**:
   - Always check official docs first
   - Search for similar issues in forums
   - Review sample code in Marketplace

### FAQ

**Q: Can I use external libraries/frameworks?**
A: Yes, especially with Catalyst functions. Deluge has some limitations.

**Q: Is there a testing environment?**
A: Yes, sandbox versions are created automatically for testing.

**Q: Can I update after submission?**
A: Check contest rules, but typically submissions are final.

**Q: Do I need to deploy on Marketplace?**
A: Not required for contest, but recommended for portfolio.

**Q: Can I use paid third-party services?**
A: Yes, but consider free tiers for demo purposes.

---

## 🎓 Final Checklist

### Before Submission
- [ ] Extension name is unique and descriptive
- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] Mobile view is functional
- [ ] Error messages are user-friendly
- [ ] Demo video recorded (2-3 min)
- [ ] Screenshots captured (min 3)
- [ ] README documentation complete
- [ ] Code is commented
- [ ] Team details confirmed
- [ ] Registration form submitted
- [ ] Extension tested by someone else
- [ ] Backup copy saved

### After Submission
- [ ] Prepare for presentation (if finalist)
- [ ] Monitor email for updates
- [ ] Keep extension accessible for judges
- [ ] Be ready to answer questions
- [ ] Plan marketing if you win

---

## 🌟 Good Luck!

Remember:
- **Start simple**, add complexity later
- **Test early and often**
- **Document everything**
- **Make it useful**, not just technically impressive
- **Have fun** building!

Your extension should solve a real problem for real teams. Focus on that, and you'll create something valuable.

For questions specific to this guide or need help brainstorming, feel free to ask!

---

**Last Updated**: November 16, 2025
**Contest Deadline**: November 30, 2025
**Results Announced**: December 14, 2025

**Official Contest Site**: https://www.cliqtrix.com/
