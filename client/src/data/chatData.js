export const initialChatMessages = [
  {
    id: 1,
    sender: 'user',
    text: 'Which aircraft parts are predicted to run out within the next week?'
  },
  {
    id: 2,
    sender: 'ai',
    text: `Based on inventory trends and historical consumption, I identified **8 critical components** approaching minimum stock.

Immediate procurement is recommended for:
* **Hydraulic Pump HP-203**
* **Brake Assembly BA-118**
* **Fuel Filter FF-812**

Estimated shortage in **5 days**.

Recommended reorder quantity: **25 units**.`
  },
  {
    id: 3,
    sender: 'user',
    text: 'Show compatible parts for Airbus A320.'
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Found **134 certified compatible components**. Displaying highest priority maintenance items.',
    isTypingComplete: false
  }
];