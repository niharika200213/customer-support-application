To run the project

clone this repository
create .env in backend -add PORT=5000 in env file -add MONGO_URL to connect with mongodb
open separate terminals for frontend and backend folders
run npm i
run npm start
Features implemented-

Build a messaging web application that can be used to respond to incoming questions sent by our customers. The system should allow a team of agents to respond to incoming messages from (potentially many) customers in a streamlined fashion. Design the system so that multiple agents can log in at the same time and respond to incoming messages (no need to handle authentication).
The customer messages can be sent and received through an API endpoint which you can simulate via a simple web form.
We will provide a set of real customer service messages to you in a CSV file. Store these messages in a database of your choosing. These messages should then appear on the agents portal and your application should provide a way to view and respond to these individual messages as well.
Host your application somewhere (your machine is fine as well!).
Record a video of your application’s functioning and follow it up with a small code walkthrough covering only the crucial aspects. Ensure that the video is not longer than 5 - 6 minutes.
Additional features implemented-

Figure out a scheme to help agents divide work amongst themselves, and to prevent multiple agents working on the same message at once.
Explore ways to surface messages that are more urgent and in need of immediate attention. For example, customers who are asking about the loan approval process or when their loan will be disbursed might have more urgency than those asking how to update information on their Branch account.
Implement search functionality to allow agents to search over incoming messages and / or customers
Explore ways to surface additional information about customers (e.g. external profiles or some internal information we have about them) in the UI, to provide context to agents.
Implement a canned message feature that allows agents to quickly respond to enquiries using a set of pre-configured stock messages.
Make the agent UI (and/or the customer-facing UI) more interactive by leveraging websockets or similar technology, so that new incoming messages can show up in real time.