# Phase 2 Testing Guide - Direct Messaging

## Setup for Testing

### Prerequisites
- Both server and client running
- Two test user accounts created and logged in (use different browsers/tabs)
- Admin can create test users via Register page

## Test Scenarios

### Scenario 1: Send Message Between Users
1. **User A:** Login on browser/tab 1, navigate to /messages
2. **User B:** Login on browser/tab 2, navigate to /messages
3. **User A:** Search for User B in conversations (won't appear yet)
4. **User A:** Open ItemDetail page of a User B's item, click "Contact"
   - *Note: Contact button should open User B in conversations*
   - Or: Create initial message through item detail page

5. **User A:** Type message "Hi, is this item still available?"
6. **Verify:** Message appears in User A's chat on left (blue, right-aligned)
7. **Verify:** User B sees new conversation in list within 5 seconds
8. **User B:** Click conversation with User A
9. **Verify:** User A's message appears in User B's chat window (gray, left-aligned)
10. **Verify:** Unread badge on User A's conversation disappears for User B

### Scenario 2: Conversation Persistence
1. **User A:** Navigate to /messages
2. **User B:** Navigate to /messages
3. **User A:** Select conversation with User B
4. **User A:** Refresh page
5. **Verify:** Conversation still visible and selected
6. **Verify:** Message history is intact
7. **Verify:** Unread count is still accurate

### Scenario 3: Real-time Unread Badges
1. **User A:** In /messages (conversations list visible, no chat open)
2. **User B:** Select User A's conversation and send message
3. **Verify:** Within 5 seconds, User A sees red badge on conversation
4. **User A:** Click conversation to open chat
5. **Verify:** Badge disappears (marked as read)
6. **Verify:** Unread count in User A's UI drops

### Scenario 4: Message Ordering
1. **User A & B:** Both in /messages with conversation open
2. **User A:** Send message "First message"
3. **User B:** Send message "Second message"
4. **User A:** Send message "Third message"
5. **Verify:** Messages appear in correct chronological order
6. **Verify:** Refresh page - order is preserved

### Scenario 5: Search Conversations
1. **Create test data:** Multiple conversations with different users
2. **Search "John":** Only conversations with John appear
3. **Search "john@":** Filters by email
4. **Clear search:** All conversations reappear

### Scenario 6: Mobile Responsiveness
1. **Open in mobile device or use browser mobile emulation**
2. **Verify:** Conversations list takes full width initially
3. **Click conversation:** List disappears, chat takes full width
4. **Verify:** Back button appears above chat header
5. **Click back:** Returns to conversations list
6. **Verify:** No horizontal scrolling needed

### Scenario 7: Timestamp Display
1. **Send messages at different times**
2. **Verify:** Each message shows time in HH:MM format
3. **Verify:** Conversations show last message date
4. **Refresh:** Timestamps recalculate correctly

### Scenario 8: Related Item Display (Future)
*Currently not visible but supported in backend:*
1. When contact form → direct message is implemented
2. Messages should show related item context
3. Can click to view item

## Edge Cases to Test

### Empty State
- [ ] New user with no conversations sees "No conversations yet" message
- [ ] New conversation with no messages shows "Start the conversation!"

### Network Conditions
- [ ] Slow network: Polling still works but delayed
- [ ] Offline: Clear error messages or graceful degradation
- [ ] Reconnection: Catches up on missed messages

### Input Validation
- [ ] Cannot send empty message (button disabled)
- [ ] Very long messages (1000+ chars) display correctly
- [ ] Special characters in messages display correctly
- [ ] Emoji support

### Concurrent Users
- [ ] Three users messaging each other simultaneously
- [ ] No race conditions or data corruption
- [ ] Correct sender/receiver identification

## Performance Testing

### Conversation Load Times
- [ ] Load time with 5 conversations: < 1 second
- [ ] Load time with 50 conversations: < 2 seconds
- [ ] Search filters instantly (no lag)

### Message Polling
- [ ] 5-second polling for conversations doesn't block UI
- [ ] 3-second polling in chat doesn't cause flicker
- [ ] No memory leaks from repeated intervals

### Large Message History
- [ ] 100 messages load and display correctly
- [ ] Scrolling is smooth
- [ ] Auto-scroll to latest works efficiently

## Bug Reports Template

If you find an issue, document it like this:

```
**Bug Title:** [Brief description]
**Severity:** Critical / High / Medium / Low
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happened]
**Environment:** Browser, OS, Network conditions
**Screenshots:** [If applicable]
```

## Success Criteria

Phase 2 is considered complete when:
- ✅ Messages send and receive correctly
- ✅ Conversations list updates with unread badges
- ✅ Message history loads and persists
- ✅ UI is responsive on mobile
- ✅ Polling works smoothly without UI lag
- ✅ No console errors
- ✅ User experience feels real-time

## Known Limitations (Phase 2)

1. Polling-based (not true real-time WebSocket)
   - Slight delay (3-5 seconds) for updates
   - Higher backend load as scale increases
   - *Upgrade plan for Phase 3*

2. No typing indicators
   - Can't see if other user is typing
   - *Feature for Phase 3*

3. No message notifications
   - Only visible when actively checking /messages
   - *integrate with notifications system*

4. No message editing/deletion UI
   - Backend supports deletion, frontend UI not built

5. No file/image sharing
   - Text-only messages for now

## Debugging Tips

### Check Backend Logs
```
npm run dev  # In server directory
```
Look for:
- Authentication errors
- Database query issues
- API endpoint issues

### Check Frontend Console
```
F12 → Console tab
```
Look for:
- API request failures
- CORS errors
- Parse errors in responses

### Test Direct API Calls
```bash
# Get conversations
curl -H "Authorization: TOKEN" http://localhost:5000/api/messages/conversations

# Send message
curl -X POST http://localhost:5000/api/messages/send \
  -H "Authorization: TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"receiverId": "USER_ID", "text": "Test"}'
```

### Database Check
```javascript
// In MongoDB shell
db.messages.find({})  // View all messages
db.messages.findOne({sender: ObjectId("...")})  // Find user's messages
```
