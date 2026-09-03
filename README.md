# Beamtro: Your Instant Room

Rebuild & Upgrade Beamtro — Real-Time Communication Platform

Rework the existing project into a polished, modern communication platform called Beamtro.

Do not rename the product.

The goal is to make Beamtro feel like a lightweight, beautifully designed alternative to complicated meeting platforms — focused on temporary rooms, conversation, voice, video, and screen sharing.

The core idea:

One room. Voice, video, screen, and everything said.

Beamtro should be fast, minimal, modern, and effortless to use.

1. Product Identity

Name

Beamtro

Keep this name consistently throughout:

Browser title

Navbar

Logo/wordmark

Metadata

Footer

About page

Help page

Room interface

Empty states

Loading states

Error states

Do not introduce "Wire" or any alternative product name.

Beamtro should feel like an actual standalone product, not a template or developer demo.

2. Design Direction

Create a distinctive visual identity for Beamtro.

The design should be:

Minimal

Premium

Modern

Technical

Calm

Dark/light balanced

Spacious

Highly readable

Responsive

Professional without feeling corporate

Avoid:

Generic SaaS dashboard styling

Excessive gradients

Stock photography

Huge decorative illustrations

Excessive rounded cards

Cluttered interfaces

Overly colorful UI

Generic Zoom/Discord clones

Use subtle motion, elegant transitions, restrained borders, good typography, and strong spacing.

The interface should feel like a communication instrument, not a traditional SaaS application.

3. Homepage

Create a strong landing page.

Navbar

Left:

Beamtro

Navigation:

About

Help

Archer

Keep the navigation extremely clean.

Include a subtle indicator such as:

No account required

or:

Patch in · no account

This should reinforce the temporary/no-registration nature of the product.

4. Hero Section

Use this headline:

One room. Voice, video, screen, and everything said.

Supporting copy:

Beamtro opens a line between two to six people. Chat runs the whole time; audio, camera and screen ride on top of it, peer to peer.

Make this the visual focus of the homepage.

Add a subtle visual representation of people connecting into one room.

It can be an abstract communication-line visualization, signal animation, connected nodes, or another original visual treatment.

Do not use stock images.

5. Room Entry

Create the main room-entry experience directly beneath the hero.

Show:

idle — no room connected

Then:

Display name

Input:

Display name

Helper text:

Temporary, and only used inside the room.

Primary CTA:

Create a room

Then:

or

Input:

Room code or link

CTA:

Join room

The entire interaction should feel extremely simple.

The user should not need to understand technical concepts.

6. Create Room Flow

When the user clicks Create a room:

Validate the display name.

Create a unique temporary room.

Generate a short room code.

Generate a shareable room URL.

Move the user directly into the room.

Show the room code and invite/share option.

Do not require registration.

Make the transition smooth and immediate.

7. Join Room Flow

Users should be able to join using:

Room code

Full room URL

Support URLs such as:

/room/ABC123

If a valid room link is opened directly, take the user to the join experience.

Ask for their temporary display name if necessary.

Do not force account creation.

8. Communication Room

The actual room should be the heart of Beamtro.

Support:

Text chat

Voice

Video

Screen sharing

Participants

Room information

Invite/share link

Leave room

Everything should exist inside one unified room.

Do not make users navigate through separate pages to use these features.

9. Room Layout

Design a professional real-time communication interface.

Main area

Display:

Video participants

Audio-only participants

Screen share

Speaking indicators

Connection status

When screen sharing is active, prioritize the shared screen.

Keep participant thumbnails visible without taking unnecessary space.

10. Bottom Control Bar

Create a clean floating or fixed control bar.

Controls:

Microphone

Camera

Screen share

Chat

Participants

More options

Leave

Each control needs clear:

Active state

Disabled state

Hover state

Loading state

Error state

The leave button should be visually distinct enough to prevent accidental confusion.

11. Chat

Chat should remain available throughout the room.

Users can:

Send messages

See display names

See timestamps

Identify their own messages

Scroll through previous messages

Make the chat feel integrated into the room rather than like a separate messaging application.

Use subtle message styling.

Avoid excessive chat bubbles and unnecessary decoration.

12. Participants

Create a participant panel showing everyone currently inside the room.

For each participant show:

Display name

Microphone status

Camera status

Speaking indicator

The current user should be clearly identifiable.

Support 2–6 people.

13. Screen Sharing

Screen sharing must be treated as a primary feature.

When someone shares their screen:

Make the shared screen the main visual

Keep participants accessible

Show who is sharing

Provide a clear stop-sharing control

Make this suitable for:

Presentations

Technical support

Collaboration

Demonstrations

Remote assistance

14. Room Information

Display the current room code.

Provide:

Copy invite link

and optionally:

Copy room code

When copied, show a small confirmation such as:

Link copied

Do not use intrusive notifications.

15. Connection States

Create polished states for:

No room

idle — no room connected

Connecting

connecting — establishing line

Connected

connected — room active

Reconnecting

reconnecting — trying to restore connection

Disconnected

offline — connection lost

These states should feel like part of Beamtro's identity.

16. About Page

Create a dedicated About page.

Heading:

A cleaner way to connect in a room.

Copy:

Beamtro is a lightweight browser-based experience for creating quick rooms where people can talk, chat, share their screen, and jump into a call without creating an account or installing anything.

Create three feature sections.

Fast to start

Open Beamtro, create a room, and share a short code or link in seconds.

Everything in one place

Text chat, voice, video, and screen sharing all live in the same room.

Simple and private

No registration, no heavy setup, and a focused experience designed for quick collaboration.

17. Built by Abdul Basit

Add a small creator section.

Built by Abdul Basit

Copy:

Beamtro was created by Abdul Basit, also known as Archer, as a practical and modern way to bring people into a shared space for conversations, support, and presentation-style sessions.

Add:

Visit the portfolio

Link:

https://abdulbasit-archer.vercel.app/

Keep this section understated.

18. Help Page

Create a simple help guide.

Sections:

Creating a room

How to create and share a room.

Joining a room

How to join using a code or link.

Camera and microphone

Explain browser permissions.

Screen sharing

Explain how screen sharing works.

Chat

Explain that chat remains available during the room.

Privacy

Explain that no account is required and display names are temporary.

Troubleshooting

Cover:

Camera unavailable

Microphone unavailable

Screen sharing unavailable

Unable to join

Connection problems

Keep the page short and easy to scan.

19. Footer

Use:

Beamtro

One room. Voice, video, screen, and everything said.

Links:

About

Help

Archer

Creator link:

Archer

→ https://abdulbasit-archer.vercel.app/

At the bottom:

Powered by Archer

20. Technical Requirements

Do not break the existing working functionality.

Before changing anything:

Inspect the existing project.

Understand the current architecture.

Identify the existing room, chat, WebRTC, authentication/session, and API logic.

Preserve working functionality.

Improve the UI around the existing functionality where possible.

Do not replace working backend logic unnecessarily.

The application should remain functional, not just visually redesigned.

If a feature already exists, improve its implementation rather than creating a duplicate system.

21. Responsive Design

Beamtro must work beautifully on:

Desktop

Laptop

Tablet

Mobile

Desktop should provide the full room experience.

Mobile should intelligently reorganize:

Video

Chat

Participants

Controls

Do not simply shrink the desktop layout.

Design an intentional mobile experience.

22. Micro-interactions

Use subtle animations for:

Joining a room

Creating a room

Connecting

Participant appearing

Participant leaving

Speaking

Chat messages

Copying invite links

Opening panels

Screen sharing

Connection status

Animations should be fast and understated.

The product should feel alive without becoming distracting.

23. Important Product Principle

Beamtro should always feel like:

Open → Create/Join → Connect → Talk

There should be almost no friction.

No unnecessary onboarding.

No account wall.

No complicated dashboard.

No unnecessary settings.

No overwhelming UI.

The product's strongest feature is its simplicity.

24. Final Quality Bar

Do not stop at making the page technically functional.

Make the result feel like a real product ready to show publicly.

Pay particular attention to:

Typography

Spacing

Hierarchy

Responsive behavior

Empty states

Loading states

Error states

Button interactions

Accessibility

Keyboard navigation

Mobile controls

Visual consistency

Performance

The final result should make someone immediately understand:

Beamtro is a simple place to create a room and connect with people — without accounts, downloads, or unnecessary complexity.

Keep the branding Beamtro and the creator branding Archer / Abdul Basit throughout.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f90da1e-5273-40c3-aa0e-716c82e13894).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
#   b e a m t r o - 2  
 