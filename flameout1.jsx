import React, { useState, useEffect } from 'react';
import { Circle, Check, X, Book, TrendingUp, Settings, Home, Dumbbell, Menu, Shield, Flame, ChevronRight, ChevronLeft, Clock, Calendar } from 'lucide-react';

// Premium color scheme - Stylish & Modern
const colors = {
  // Dark backgrounds with depth
  charcoal: '#0A0E27',      // Deep space blue-black
  navy: '#1A1F3A',          // Rich navy
  slate: '#2D3250',         // Elevated surfaces
  
  // Vibrant brand colors
  primary: '#FF6B35',       // Energetic coral-orange
  primaryLight: '#FF8C61',  // Lighter variant
  primaryDark: '#E8522D',   // Darker variant
  
  // Accent colors
  accent: '#FFC857',        // Warm gold
  accentLight: '#FFD678',   // Light gold
  success: '#4ECB71',       // Fresh green
  warning: '#FF9F40',       // Warm orange
  error: '#FF5757',         // Bright red
  info: '#5B9FED',          // Sky blue
  
  // Neutrals with warmth
  white: '#FFFFFF',
  grey50: '#F8F9FA',
  grey100: '#F1F3F5',
  grey200: '#E9ECEF',
  grey300: '#DEE2E6',
  grey400: '#ADB5BD',
  grey500: '#6C757D',
  grey600: '#495057',
  grey700: '#343A40',
  grey800: '#212529',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #FF6B35 0%, #FF8C61 100%)',
  gradientAccent: 'linear-gradient(135deg, #FFC857 0%, #FFD678 100%)',
  gradientDark: 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)',
  gradientSuccess: 'linear-gradient(135deg, #4ECB71 0%, #44C167 100%)',
  
  // Special effects
  glow: 'rgba(255, 107, 53, 0.3)',
  glowStrong: 'rgba(255, 107, 53, 0.5)',
  overlay: 'rgba(10, 14, 39, 0.95)'
};

// Modern design system
const design = {
  // Border radius - more pronounced
  radius: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px'
  },
  
  // Shadows - more dramatic
  shadow: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.25)',
    '2xl': '0 24px 64px rgba(0, 0, 0, 0.3)',
    glow: '0 0 24px rgba(255, 107, 53, 0.4)',
    glowStrong: '0 0 40px rgba(255, 107, 53, 0.6)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  
  // Spacing - more generous
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px'
  },
  
  // Typography - better hierarchy
  text: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '56px',
    '6xl': '72px'
  },
  
  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

// Storage helper using window.storage
const storage = {
  async get(key) {
    try {
      const result = await window.storage.get(key);
      return result ? JSON.parse(result.value) : null;
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      await window.storage.set(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};

// Phase 1 Exercises (all 14)
const exercises = [
  {
    id: 1,
    title: "What Is Burnout?",
    type: "Education",
    duration: "4 min",
    steps: [
      { title: "Burnout is not weakness", content: "Burnout isn't laziness, a lack of willpower, or a character flaw. The World Health Organization classifies it as an occupational phenomenon resulting from chronic workplace stress that hasn't been successfully managed." },
      { title: "The three dimensions", content: "Burnout has three components: Exhaustion (your energy tank is empty), Cynicism (you've emotionally checked out), and Reduced Efficacy (you feel like nothing you do matters). Most people experience all three to different degrees." },
      { title: "Burnout vs. stress", content: "Stress is too much — too many demands, too much pressure, but you still believe things will get better if you can get it under control. Burnout is not enough — not enough energy, not enough motivation, not enough caring. It's the absence of hope that things will improve." },
      { title: "Why it matters", content: "Untreated burnout doesn't just affect your work. It impacts your relationships, your physical health, your sleep, your identity. Recognizing it is the first and most important step." },
      { title: "Your first step", content: "You've already taken it by being here. Over the next 14 days, we'll help you understand YOUR specific burnout pattern — what caused it, how it shows up, and what needs to change. No rush. Your pace." }
    ]
  },
  {
    id: 2,
    title: "My Warning Signs",
    type: "Reflection",
    duration: "5 min",
    steps: [
      { title: "Your body keeps score", content: "Burnout shows up differently for everyone. Some people get headaches. Others can't sleep. Some eat too much, others can't eat at all. Some get angry; others go numb. There's no wrong way to experience it." },
      { title: "Physical signs", content: "Take a moment. What has your body been telling you lately? Common physical signs include: persistent fatigue even after rest, frequent headaches or muscle tension, changes in appetite or sleep, getting sick more often, jaw clenching or teeth grinding." },
      { title: "Emotional signs", content: "Now check in emotionally. Have you noticed: feeling detached or numb, dreading work or responsibilities, irritability over small things, loss of satisfaction in things you used to enjoy, feeling like nothing you do makes a difference?" },
      { title: "Your pattern", content: "Think about the signs you recognized. These are YOUR warning signals. In the future, when you notice them returning, they're your early alert system. Awareness is protection. Write your top 3 warning signs in your journal today." }
    ]
  },
  {
    id: 3,
    title: "Energy Audit",
    type: "CBT",
    duration: "5 min",
    steps: [
      { title: "Your energy has limits", content: "Think of your energy like a bank account. Every activity either deposits energy or withdraws it. When withdrawals consistently exceed deposits, you go bankrupt. That's burnout." },
      { title: "Energy drains", content: "List the top 5 things that drain your energy. These might include: specific work tasks, certain people, commuting, decision-making, social media, perfectionism, saying yes when you mean no." },
      { title: "Energy deposits", content: "Now list 5 things that restore your energy. These might include: a specific friend, being outdoors, exercise, creative work, cooking, silence, playing with your pet, reading." },
      { title: "The balance", content: "Look at your two lists. How many drains are you exposed to daily versus deposits? If drains outnumber deposits, that's not a you-problem — it's a design problem. Over the next days, we'll work on redesigning the balance." }
    ]
  },
  {
    id: 4,
    title: "Values Check",
    type: "Reflection",
    duration: "4 min",
    steps: [
      { title: "What actually matters to you?", content: "Burnout often happens when we spend our energy on things that don't align with what we truly value. Not what we think we should value — what we actually value." },
      { title: "Pick your top 5", content: "From this list, choose the 5 that matter MOST to you right now: Family, Health, Creativity, Freedom, Security, Achievement, Connection, Adventure, Learning, Service, Independence, Peace, Recognition, Integrity, Fun." },
      { title: "The honesty check", content: "Now ask yourself: how much of your typical week is spent on activities that serve those 5 values? If there's a gap between what you value and how you spend your time, that gap is where burnout grows." },
      { title: "One small realignment", content: "Choose one small action you could take this week that would better align your time with one of your top values. It doesn't have to be big. Even 15 minutes counts." }
    ]
  },
  {
    id: 5,
    title: "The Burnout Timeline",
    type: "Reflection",
    duration: "5 min",
    steps: [
      { title: "When did this start?", content: "Burnout rarely happens overnight. It builds gradually, often over months or years. Understanding your timeline helps you see the pattern — and avoid repeating it." },
      { title: "Trace it back", content: "Think back to when you last felt genuinely energized and engaged with your work or life. How long ago was that? 3 months? A year? Longer? What changed between then and now?" },
      { title: "The tipping points", content: "Were there specific events or changes that accelerated the burnout? A new role, a loss, a conflict, a pandemic, a life change? Most burnout has 2-3 key tipping points." },
      { title: "No blame", content: "This timeline isn't about finding fault. It's about understanding cause and effect so you can make different choices going forward. Write your burnout timeline in your journal — even a rough sketch helps." }
    ]
  },
  {
    id: 6,
    title: "Permission to Not Be Okay",
    type: "ACT",
    duration: "4 min",
    steps: [
      { title: "Stop fighting the feeling", content: "One of the most exhausting parts of burnout is pretending you're fine. The energy it takes to mask how you really feel is energy you don't have to spare." },
      { title: "Acceptance isn't giving up", content: "Acceptance means acknowledging where you are without judgment. It's not saying 'I'll be burned out forever.' It's saying 'I'm burned out right now, and that's a valid response to what I've been through.'" },
      { title: "Try this", content: "Say to yourself (out loud if you can): 'I am exhausted, and that makes sense given what I've been carrying. I don't need to fix everything today. I just need to be honest about where I am.'" },
      { title: "The paradox", content: "Here's what's counterintuitive: the moment you stop fighting the burnout, you free up energy for actual recovery. Resistance costs energy. Acceptance creates space. You've created that space today." }
    ]
  },
  {
    id: 7,
    title: "Stress Source Mapping",
    type: "CBT",
    duration: "5 min",
    steps: [
      { title: "Name them all", content: "List every source of stress in your life right now. Work, personal, financial, health, relationships — all of it. Don't filter. Just get it out of your head and onto a list." },
      { title: "Controllable vs. uncontrollable", content: "Now sort each item into two categories: things you can influence or change, and things you genuinely cannot control. Be honest — we often claim things are uncontrollable when they're actually uncomfortable to change." },
      { title: "Focus your energy", content: "For the controllable items: which one, if addressed, would have the biggest impact on your stress? That's your priority — not all of them, just one." },
      { title: "Release the rest", content: "For the uncontrollable items: practice noticing them without trying to fix them. You can acknowledge their weight without carrying it. 'I notice this is stressing me, and I can't change it right now.' That's enough." }
    ]
  },
  {
    id: 8,
    title: "Body Scan Check-In",
    type: "Breathing",
    duration: "4 min",
    steps: [
      { title: "Pause for 60 seconds", content: "Close your eyes if comfortable. Take three slow breaths. We're about to do a quick body scan — not to fix anything, just to notice." },
      { title: "Head and shoulders", content: "Bring attention to your head. Is there tension in your forehead, jaw, or temples? Notice your shoulders — are they creeping up toward your ears? Just observe. No need to change anything yet." },
      { title: "Chest and stomach", content: "Move your attention to your chest. Is your breathing shallow or deep? Notice your stomach — is it tight, churning, relaxed? These areas often hold anxiety and dread." },
      { title: "Back and hands", content: "Notice your lower back — any aching or stiffness? Check your hands — are they clenched or relaxed? Burnout often manifests as chronic tension we've stopped noticing." },
      { title: "What your body is telling you", content: "Whatever you noticed is information, not a problem to solve. Your body has been keeping score even when your mind hasn't. Check in like this regularly — it's your burnout early warning system." }
    ]
  },
  {
    id: 9,
    title: "The Cost of Burnout",
    type: "Reflection",
    duration: "4 min",
    steps: [
      { title: "What has burnout cost you?", content: "This isn't about guilt. It's about clarity. Understanding the real cost creates motivation for real change." },
      { title: "The inventory", content: "Think about what burnout has taken from you. Energy you used to have? Relationships that have suffered? Hobbies you've abandoned? Physical health? Sleep? Joy in your work? Patience with people you love?" },
      { title: "What do you want back?", content: "Pick the one thing you miss most. Not all of them — just the one that matters most to you right now. Hold it in your mind." },
      { title: "That's your why", content: "This one thing — that's why you're here. Recovery isn't abstract. It's about getting back what burnout took. Keep this in mind when the exercises feel hard or pointless. This is what you're working toward." }
    ]
  },
  {
    id: 10,
    title: "Digital Boundaries Audit",
    type: "CBT",
    duration: "4 min",
    steps: [
      { title: "Your phone is a stress pipeline", content: "For most of us, our devices deliver stress directly into our hands — notifications, emails, news, social comparison — 24 hours a day. Burnout and digital overload are deeply connected." },
      { title: "The audit", content: "Check your screen time from yesterday. How many hours? How many pickups? Which apps took the most time? No judgment — just data." },
      { title: "After-hours work contact", content: "Do you check work email after hours? Do you respond to messages at night or on weekends? Do you have work notifications enabled on your personal phone? Each yes is a boundary that doesn't exist yet." },
      { title: "One digital boundary", content: "Choose ONE change to implement today: turn off email notifications after 6pm, remove social media from your home screen, set your phone to Do Not Disturb during dinner, or unsubscribe from 5 newsletters you never read. Just one." }
    ]
  },
  {
    id: 11,
    title: "Relationship Impact",
    type: "Reflection",
    duration: "5 min",
    steps: [
      { title: "Burnout is contagious", content: "Burnout doesn't stay at work. It follows you home. It affects how you show up for the people you care about — shorter fuse, less patience, less presence, less energy for connection." },
      { title: "Who's been affected?", content: "Think about your closest relationships. Partner, kids, friends, family. How has your burnout changed the way you interact with them? Be specific." },
      { title: "What they see", content: "Sometimes the people around us notice our burnout before we do. If you asked someone close to you 'Have I seemed different lately?' — what would they say?" },
      { title: "No fixing today", content: "You don't need to repair everything right now. But awareness matters. When you're ready, letting someone know 'I'm working on recovering from burnout' can relieve pressure on both of you." }
    ]
  },
  {
    id: 12,
    title: "Identity Beyond Work",
    type: "ACT",
    duration: "4 min",
    steps: [
      { title: "Who are you without your job title?", content: "Many people who burn out have tied their identity tightly to their work. When work goes wrong, their sense of self goes with it." },
      { title: "The test", content: "If someone asks 'Tell me about yourself' — does your answer start with your job? If your career disappeared tomorrow, how would you describe yourself?" },
      { title: "You are more than your output", content: "List 5 things that are true about you that have nothing to do with work. Not accomplishments — qualities. 'I'm curious.' 'I care deeply about fairness.' 'I make people laugh.' 'I love being near water.'" },
      { title: "Rebuilding", content: "Recovery from burnout often involves rediscovering parts of yourself that got buried under productivity. This list is a starting point. You'll come back to it." }
    ]
  },
  {
    id: 13,
    title: "Sleep & Recovery Honest Check",
    type: "Education",
    duration: "4 min",
    steps: [
      { title: "Sleep is not optional", content: "If you're burned out and sleeping poorly, nothing else you try will work as well as it should. Sleep is where your brain and body actually repair. It's not a luxury — it's infrastructure." },
      { title: "Your sleep reality", content: "How many hours are you actually sleeping? Not in bed — sleeping. Do you have trouble falling asleep, staying asleep, or waking too early? Do you use your phone in bed? Do you feel rested when you wake up?" },
      { title: "The non-negotiable", content: "If you could change ONE thing about your sleep routine starting tonight, what would have the biggest impact? Common options: no screens 30 minutes before bed, same bedtime every night, cooler room temperature, no caffeine after 2pm." },
      { title: "Start tonight", content: "Pick that one change and commit to it for 7 days. Not forever — just 7 days. Track how you feel. Sleep improvements compound faster than almost any other recovery action." }
    ]
  },
  {
    id: 14,
    title: "Phase 1 Reflection",
    type: "Reflection",
    duration: "5 min",
    steps: [
      { title: "Look how far you've come", content: "You've spent 14 days doing something most people never do: honestly examining your burnout. That takes courage." },
      { title: "What you've learned", content: "Over these two weeks, you've mapped your warning signs, audited your energy, checked your values alignment, traced your timeline, assessed your digital habits, and checked in with your body. That's significant." },
      { title: "Your key insights", content: "What are the 2-3 biggest things you've learned about YOUR burnout pattern? What surprised you? What felt most true?" },
      { title: "What needs to change", content: "Based on everything you've explored, what is the single biggest change that would make the most difference in your recovery? Not 10 changes. One." },
      { title: "Ready for Phase 2", content: "Phase 2: Restoration is where the real work begins — setting boundaries, restructuring your energy, and building new patterns. You now have the self-knowledge to do it effectively. When you're ready, unlock Phase 2 to continue your recovery journey." }
    ]
  }
];

// Phase 2 Exercises (first 5 for demo - premium only)
const phase2Exercises = [
  {
    id: 15,
    title: "Setting Your First Boundary",
    type: "CBT",
    phase: 2,
    duration: "4 min",
    premium: true,
    steps: [
      { title: "What is a boundary?", content: "A boundary is not a wall. It's a door with a lock. You decide who gets a key. A boundary is simply saying: this is what I will and won't accept. It protects your energy." },
      { title: "Identify one boundary you need", content: "Think about the last week. Where did someone take more from you than you wanted to give? A colleague who always dumps last-minute work? A friend who only calls to vent? A family member who ignores your time? Pick one." },
      { title: "Script it", content: "Write a simple script: 'I care about [this relationship], and I need to [set this limit] because [reason]. Going forward, I will [specific action].' Example: 'I care about our team, and I need to stop taking on last-minute tasks because it's burning me out. Going forward, I'll need 24 hours notice for new requests.'" },
      { title: "When to say it", content: "You don't need to deliver this today. But choose when you will. Put it in your calendar. A boundary only works when it's communicated. The anxiety you feel about saying it is always worse than actually saying it." }
    ]
  },
  {
    id: 16,
    title: "The Email Boundary",
    type: "CBT",
    phase: 2,
    premium: true,
    duration: "3 min",
    steps: [
      { title: "Your inbox is not your emergency room", content: "Every email is someone else's priority, not necessarily yours. Checking email after hours means you never truly leave work. Today we fix that." },
      { title: "Set your out-of-office", content: "Create an after-hours auto-reply: 'Thanks for your email. I check messages during business hours [your hours]. I'll respond when I'm back online. If this is urgent, please [alternative contact].' You're not being difficult. You're being sustainable." },
      { title: "Turn it on tonight", content: "Set this auto-reply active from [your end time] to [your start time]. Turn off email notifications on your phone during those hours. One night. See how it feels. Most people feel guilty for exactly 20 minutes, then feel free." }
    ]
  },
  {
    id: 17,
    title: "Cognitive Distortion Spotter",
    type: "CBT",
    phase: 2,
    premium: true,
    duration: "5 min",
    steps: [
      { title: "Your brain lies to you", content: "When you're burned out, your thinking patterns get distorted. You start believing things that aren't true but feel absolutely real. These are called cognitive distortions." },
      { title: "All-or-nothing thinking", content: "Do you think in extremes? 'If I can't do it perfectly, there's no point.' 'Everything is falling apart.' 'I always mess things up.' Real life exists in the middle. Almost nothing is all good or all bad." },
      { title: "Mind reading", content: "Do you assume you know what others think? 'They think I'm incompetent.' 'Everyone can tell I'm struggling.' 'My boss is disappointed in me.' Unless someone said it directly, you're guessing — and burned-out brains guess negatively." },
      { title: "Should statements", content: "'I should be able to handle this.' 'I should be further along by now.' 'I shouldn't need help.' Every 'should' is a stick you're beating yourself with. Replace 'should' with 'would like to' and feel the pressure drop." },
      { title: "Catch one today", content: "For the rest of today, try to catch yourself using one of these patterns. Don't fix it. Just notice it and label it: 'That's all-or-nothing thinking.' Awareness breaks the autopilot." }
    ]
  },
  {
    id: 18,
    title: "Defusion: Unhooking from Thoughts",
    type: "ACT",
    phase: 2,
    premium: true,
    duration: "4 min",
    steps: [
      { title: "You are not your thoughts", content: "Acceptance and Commitment Therapy teaches a concept called defusion — creating distance between you and your thoughts. Right now, when you think 'I'm a failure,' you believe it completely. We're going to change that." },
      { title: "The technique", content: "Take a thought that's been bothering you. Something your brain keeps repeating. Now say it with this prefix: 'I notice I'm having the thought that...' So: 'I'm a failure' becomes 'I notice I'm having the thought that I'm a failure.'" },
      { title: "Feel the shift", content: "Say it again: 'I notice I'm having the thought that I'm a failure.' It's the same words, but now there's space. You're observing the thought instead of being inside it. The thought is still there — but it's not running the show." },
      { title: "Practice daily", content: "Every time a harsh thought shows up today, add the prefix. 'I notice I'm having the thought that nobody cares.' 'I notice I'm having the thought that I can't handle this.' You're not arguing with the thought. You're stepping back from it. That step back is freedom." }
    ]
  },
  {
    id: 19,
    title: "Progressive Muscle Relaxation",
    type: "Breathing",
    phase: 2,
    premium: true,
    duration: "5 min",
    steps: [
      { title: "Your muscles are holding your stress", content: "Right now, without realizing it, you're probably tensing your shoulders, clenching your jaw, or tightening your stomach. Your body stores stress as tension. We're going to release it systematically." },
      { title: "Feet and legs", content: "Tense the muscles in your feet and legs as tightly as you can. Hold for 5 seconds. Now release completely. Feel the difference between tension and relaxation. That difference is what we're after." },
      { title: "Stomach and chest", content: "Tense your core — stomach, chest, lower back. Squeeze everything tight. Hold for 5 seconds. Release. Let your breathing deepen naturally." },
      { title: "Hands and arms", content: "Make fists. Tense your forearms, biceps, all the way to your shoulders. Hold for 5 seconds. Release. Let your hands fall open." },
      { title: "Face and jaw", content: "Scrunch your face. Clench your jaw. Squeeze your eyes shut. Hold for 5 seconds. Release. Let your jaw hang slightly open. Feel the warmth." },
      { title: "Full body scan", content: "Now scan from feet to head. Notice where residual tension remains. Breathe into those spots. You just taught your nervous system the difference between stress and calm. Your body now has a reference point for relaxation. Do this before bed tonight." }
    ]
  }
];

// Assessment questions
const assessmentQuestions = [
  { id: 1, text: "I feel emotionally drained from my work", category: "exhaustion" },
  { id: 2, text: "I feel used up at the end of the workday", category: "exhaustion" },
  { id: 3, text: "I feel fatigued when I get up and have to face another day", category: "exhaustion" },
  { id: 4, text: "Working all day is really a strain for me", category: "exhaustion" },
  { id: 5, text: "I feel burned out from my work", category: "exhaustion" },
  { id: 6, text: "I feel frustrated by my work", category: "exhaustion" },
  { id: 7, text: "I feel I treat some people as if they were impersonal objects", category: "cynicism" },
  { id: 8, text: "I've become more callous toward people since I started this job", category: "cynicism" },
  { id: 9, text: "I worry this job is hardening me emotionally", category: "cynicism" },
  { id: 10, text: "I don't really care what happens to some people", category: "cynicism" },
  { id: 11, text: "I feel people blame me for some of their problems", category: "cynicism" },
  { id: 12, text: "I can easily understand how people feel about things", category: "efficacy" },
  { id: 13, text: "I deal very effectively with problems", category: "efficacy" },
  { id: 14, text: "I feel I'm positively influencing other people's lives through my work", category: "efficacy" },
  { id: 15, text: "I feel very energetic", category: "efficacy" },
  { id: 16, text: "I can easily create a relaxed atmosphere", category: "efficacy" }
];

const answerOptions = [
  { label: "Never", value: 0 },
  { label: "Few times/year", value: 1 },
  { label: "Once/month", value: 2 },
  { label: "Few times/month", value: 3 },
  { label: "Once/week", value: 4 },
  { label: "Few times/week", value: 5 },
  { label: "Every day", value: 6 }
];

export default function FlameoutApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [streak, setStreak] = useState(0);
  const [energyToday, setEnergyToday] = useState(null);
  const [energyHistory, setEnergyHistory] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalMode, setJournalMode] = useState('prompted');
  const [journalText, setJournalText] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [selectedStressors, setSelectedStressors] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [healthDataConsent, setHealthDataConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [energyBudgetItems, setEnergyBudgetItems] = useState([]);
  const [showEnergyBudget, setShowEnergyBudget] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [currency, setCurrency] = useState('EUR'); // EUR or USD
  const [flameHealth, setFlameHealth] = useState(100);
  const [flameHappiness, setFlameHappiness] = useState(100);
  const [flameName, setFlameName] = useState('Ember');
  const [lastFeedTime, setLastFeedTime] = useState(null);
  const [flameAge, setFlameAge] = useState(0); // days old
  const [signupDate, setSignupDate] = useState(null);
  const [lastCheckInDate, setLastCheckInDate] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminderTime, setDailyReminderTime] = useState('09:00');
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);
  const [themeMode, setThemeMode] = useState('dark'); // dark or light
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Enhanced Pet System States
  const [petLevel, setPetLevel] = useState(1);
  const [petExperience, setPetExperience] = useState(0);
  const [petEvolutionStage, setPetEvolutionStage] = useState(1); // 1=Spark, 2=Flame, 3=Blaze, 4=Inferno
  const [dailyPetTaskCompleted, setDailyPetTaskCompleted] = useState(false);
  const [lastPetTaskDate, setLastPetTaskDate] = useState(null);
  const [petMood, setPetMood] = useState('happy'); // happy, neutral, sad
  const [totalPetTasks, setTotalPetTasks] = useState(0);

  const journalPrompts = [
    "What drained your energy most today?",
    "Name one boundary you wish you had set this week.",
    "What would you do with an extra hour of free time?",
    "When was the last time you felt truly rested?",
    "What are you tolerating that you shouldn't be?",
    "Describe your ideal workday. How does it differ from reality?",
    "What would you tell a friend who felt the way you do right now?",
    "What did you used to enjoy that you've stopped doing?",
    "What's one thing you did today just for yourself?",
    "If burnout had a shape, what would it look like?",
    "Who in your life makes you feel safe?",
    "What's something you're proud of this week, even if it's small?",
    "What are you afraid would happen if you slowed down?",
    "What does recovery look like to you?"
  ];

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const savedName = await storage.get('userName');
      const savedEmail = await storage.get('userEmail');
      const savedEnergy = await storage.get('energyHistory');
      const savedStreak = await storage.get('streak');
      const savedDay = await storage.get('currentDay');
      const savedCompleted = await storage.get('completedExercises');
      const savedJournal = await storage.get('journalEntries');
      const savedScreen = await storage.get('currentScreen');
      const savedFlameHealth = await storage.get('flameHealth');
      const savedFlameHappiness = await storage.get('flameHappiness');
      const savedFlameName = await storage.get('flameName');
      const savedLastFeedTime = await storage.get('lastFeedTime');
      const savedFlameAge = await storage.get('flameAge');
      const savedSignupDate = await storage.get('signupDate');
      const savedLastCheckInDate = await storage.get('lastCheckInDate');
      const savedNotifications = await storage.get('notificationsEnabled');
      const savedReminderTime = await storage.get('dailyReminderTime');
      const savedCloudSync = await storage.get('cloudSyncEnabled');
      const savedTheme = await storage.get('themeMode');
      const savedPetLevel = await storage.get('petLevel');
      const savedPetExp = await storage.get('petExperience');
      const savedPetStage = await storage.get('petEvolutionStage');
      const savedLastPetTask = await storage.get('lastPetTaskDate');
      const savedPetMood = await storage.get('petMood');
      const savedTotalPetTasks = await storage.get('totalPetTasks');
      
      if (savedName) setUserName(savedName);
      if (savedEmail) setUserEmail(savedEmail);
      if (savedEnergy) setEnergyHistory(savedEnergy);
      if (savedStreak !== null) setStreak(savedStreak);
      if (savedDay) setCurrentDay(savedDay);
      if (savedCompleted) setCompletedExercises(savedCompleted);
      if (savedJournal) setJournalEntries(savedJournal);
      if (savedScreen) setCurrentScreen(savedScreen);
      if (savedFlameHealth !== null) setFlameHealth(savedFlameHealth);
      if (savedFlameHappiness !== null) setFlameHappiness(savedFlameHappiness);
      if (savedFlameName) setFlameName(savedFlameName);
      if (savedLastFeedTime) setLastFeedTime(savedLastFeedTime);
      if (savedFlameAge !== null) setFlameAge(savedFlameAge);
      if (savedSignupDate) setSignupDate(savedSignupDate);
      if (savedLastCheckInDate) setLastCheckInDate(savedLastCheckInDate);
      if (savedNotifications !== null) setNotificationsEnabled(savedNotifications);
      if (savedReminderTime) setDailyReminderTime(savedReminderTime);
      if (savedCloudSync !== null) setCloudSyncEnabled(savedCloudSync);
      if (savedTheme) setThemeMode(savedTheme);
      if (savedPetLevel !== null) setPetLevel(savedPetLevel);
      if (savedPetExp !== null) setPetExperience(savedPetExp);
      if (savedPetStage !== null) setPetEvolutionStage(savedPetStage);
      if (savedLastPetTask) setLastPetTaskDate(savedLastPetTask);
      if (savedPetMood) setPetMood(savedPetMood);
      if (savedTotalPetTasks !== null) setTotalPetTasks(savedTotalPetTasks);
      
      // Calculate current day based on signup date (ensures exercises unlock daily)
      if (savedSignupDate) {
        const now = new Date();
        const signup = new Date(savedSignupDate);
        const calculatedDay = Math.floor((now - signup) / (1000 * 60 * 60 * 24)) + 1;
        const currentRecoveryDay = Math.min(calculatedDay, 14); // Cap at 14 for Phase 1
        
        // Update currentDay if it has changed (new day)
        if (currentRecoveryDay !== savedDay) {
          setCurrentDay(currentRecoveryDay);
          await storage.set('currentDay', currentRecoveryDay);
        }
        
        // Calculate flame age in days
        const ageInDays = Math.floor((now - signup) / (1000 * 60 * 60 * 24));
        if (ageInDays !== savedFlameAge) {
          setFlameAge(ageInDays);
          await storage.set('flameAge', ageInDays);
        }
      }
      
      // Calculate daily decay based on last feed time
      if (savedLastFeedTime) {
        const now = new Date();
        const lastFeed = new Date(savedLastFeedTime);
        const hoursSinceLastFeed = (now - lastFeed) / (1000 * 60 * 60);
        
        // Decay 10 points per 12 hours
        const decayAmount = Math.floor(hoursSinceLastFeed / 12) * 10;
        const newHealth = Math.max(0, (savedFlameHealth || 100) - decayAmount);
        const newHappiness = Math.max(0, (savedFlameHappiness || 100) - decayAmount);
        
        if (decayAmount > 0) {
          setFlameHealth(newHealth);
          setFlameHappiness(newHappiness);
          await storage.set('flameHealth', newHealth);
          await storage.set('flameHappiness', newHappiness);
        }
      }
      
      // Check and update streak based on last check-in
      if (savedLastCheckInDate && savedStreak !== null) {
        const now = new Date();
        const lastCheckIn = new Date(savedLastCheckInDate);
        const daysSinceCheckIn = Math.floor((now - lastCheckIn) / (1000 * 60 * 60 * 24));
        
        // If more than 1 day has passed, reset streak
        if (daysSinceCheckIn > 1) {
          setStreak(0);
          await storage.set('streak', 0);
        }
      }
      
      // Check if pet task needs reset (new day)
      if (savedLastPetTask) {
        const now = new Date();
        const lastTask = new Date(savedLastPetTask);
        const isSameDay = now.toDateString() === lastTask.toDateString();
        
        if (!isSameDay) {
          setDailyPetTaskCompleted(false);
          // Update pet mood based on task completion
          const daysSinceTask = Math.floor((now - lastTask) / (1000 * 60 * 60 * 24));
          if (daysSinceTask > 2) {
            setPetMood('sad');
            await storage.set('petMood', 'sad');
          } else if (daysSinceTask > 1) {
            setPetMood('neutral');
            await storage.set('petMood', 'neutral');
          }
        } else {
          setDailyPetTaskCompleted(true);
        }
      }
    };
    loadData();
  }, []);

  // Calculate burnout score
  const calculateBurnoutScore = () => {
    let exhaustionScore = 0;
    let cynicismScore = 0;
    let efficacyScore = 0;
    
    assessmentQuestions.forEach((q, idx) => {
      const answer = assessmentAnswers[idx] || 0;
      if (q.category === 'exhaustion') {
        exhaustionScore += answer;
      } else if (q.category === 'cynicism') {
        cynicismScore += answer;
      } else if (q.category === 'efficacy') {
        // Reverse scoring for efficacy
        efficacyScore += (6 - answer);
      }
    });
    
    const totalScore = exhaustionScore + cynicismScore + efficacyScore;
    const percentage = Math.round((totalScore / 96) * 100);
    
    return {
      total: percentage,
      exhaustion: Math.round((exhaustionScore / 36) * 100),
      cynicism: Math.round((cynicismScore / 30) * 100),
      efficacy: Math.round((efficacyScore / 30) * 100)
    };
  };

  const getPhase = (score) => {
    if (score <= 33) return { number: 1, name: "Recognition" };
    if (score <= 66) return { number: 2, name: "Restoration" };
    return { number: 3, name: "Resilience" };
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const saveEnergyCheckin = async () => {
    const now = new Date();
    const today = now.toISOString();
    
    const newHistory = [...energyHistory, { 
      date: today, 
      energy: energyToday,
      stressors: selectedStressors 
    }];
    setEnergyHistory(newHistory);
    await storage.set('energyHistory', newHistory);
    
    // Update streak - only increment if this is the first activity of the day
    if (!hasCheckedInToday()) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      await storage.set('streak', newStreak);
      
      // Update last check-in date (for streak tracking)
      setLastCheckInDate(today);
      await storage.set('lastCheckInDate', today);
    }
    
    // Feed flame pet automatically when checking in
    feedFlame();
    
    // Reset the form for next day
    setEnergyToday(null);
    setSelectedStressors([]);
  };

  const feedFlame = async () => {
    const now = new Date();
    const newHealth = Math.min(100, flameHealth + 20);
    const newHappiness = Math.min(100, flameHappiness + 15);
    
    setFlameHealth(newHealth);
    setFlameHappiness(newHappiness);
    setLastFeedTime(now.toISOString());
    
    await storage.set('flameHealth', newHealth);
    await storage.set('flameHappiness', newHappiness);
    await storage.set('lastFeedTime', now.toISOString());
  };

  const playWithFlame = async () => {
    const newHappiness = Math.min(100, flameHappiness + 25);
    setFlameHappiness(newHappiness);
    await storage.set('flameHappiness', newHappiness);
  };

  const getFlameSize = () => {
    const healthFactor = flameHealth / 100;
    const happinessFactor = flameHappiness / 100;
    const avgFactor = (healthFactor + happinessFactor) / 2;
    return 60 + (avgFactor * 80); // Size between 60-140px
  };

  const getFlameColor = () => {
    if (flameHealth < 30 || flameHappiness < 30) return colors.error;
    if (flameHealth < 60 || flameHappiness < 60) return colors.primary;
    return '#FFB84D'; // Bright orange
  };

  const getFlameMessage = () => {
    if (flameHealth < 20) return "I'm fading... please check in today!";
    if (flameHealth < 50) return "I could use some care...";
    if (flameHappiness < 30) return "I'm feeling a bit lonely...";
    if (flameHappiness < 60) return "Play with me?";
    if (flameHealth > 80 && flameHappiness > 80) return "I'm burning bright! Thanks for taking care of me!";
    return "I'm doing okay! Keep checking in!";
  };

  const getCurrentDayOfRecovery = () => {
    // If no signup date, use streak as day counter
    if (!signupDate) {
      return Math.min(streak + 1, 14); // Streak of 2 = Day 3 (streak is 0-indexed from days)
    }
    
    const now = new Date();
    const signup = new Date(signupDate);
    const daysSinceSignup = Math.floor((now - signup) / (1000 * 60 * 60 * 24)) + 1;
    
    // Use the maximum of either days since signup OR current streak + 1
    // This ensures that if someone has a 2-day streak, they're at least on Day 2
    const dayFromStreak = streak > 0 ? streak + 1 : 1;
    const currentDay = Math.max(daysSinceSignup, dayFromStreak);
    
    return Math.min(currentDay, 14); // Cap at 14 for Phase 1
  };

  const getTodaysExercise = () => {
    const day = getCurrentDayOfRecovery();
    return exercises[day - 1]; // Day 1 = Exercise 0
  };

  const hasCheckedInToday = () => {
    if (!lastCheckInDate) return false;
    
    const today = new Date().toDateString();
    const lastCheckIn = new Date(lastCheckInDate).toDateString();
    
    return today === lastCheckIn;
  };

  const canCompleteExercise = (exerciseId) => {
    const day = getCurrentDayOfRecovery();
    const expectedExerciseId = day; // Exercise IDs are 1-14 matching days 1-14
    
    // Can only complete today's exercise or earlier ones
    return exerciseId <= expectedExerciseId;
  };

  const completeDailyPetTask = async () => {
    const today = new Date().toISOString();
    
    // Mark task as completed
    setDailyPetTaskCompleted(true);
    setLastPetTaskDate(today);
    await storage.set('lastPetTaskDate', today);
    
    // Increase total tasks
    const newTotal = totalPetTasks + 1;
    setTotalPetTasks(newTotal);
    await storage.set('totalPetTasks', newTotal);
    
    // Add experience points (20 XP per task)
    const expGain = 20;
    const newExp = petExperience + expGain;
    const expNeeded = petLevel * 100; // Level 1 needs 100 XP, Level 2 needs 200 XP, etc.
    
    if (newExp >= expNeeded) {
      // Level up!
      const newLevel = petLevel + 1;
      setPetLevel(newLevel);
      setPetExperience(newExp - expNeeded);
      await storage.set('petLevel', newLevel);
      await storage.set('petExperience', newExp - expNeeded);
      
      // Check for evolution at certain levels
      if (newLevel === 5 && petEvolutionStage === 1) {
        setPetEvolutionStage(2); // Spark → Flame
        await storage.set('petEvolutionStage', 2);
      } else if (newLevel === 15 && petEvolutionStage === 2) {
        setPetEvolutionStage(3); // Flame → Blaze
        await storage.set('petEvolutionStage', 3);
      } else if (newLevel === 30 && petEvolutionStage === 3) {
        setPetEvolutionStage(4); // Blaze → Inferno
        await storage.set('petEvolutionStage', 4);
      }
    } else {
      setPetExperience(newExp);
      await storage.set('petExperience', newExp);
    }
    
    // Improve mood
    setPetMood('happy');
    await storage.set('petMood', 'happy');
    
    // Increase health and happiness
    const newHealth = Math.min(100, flameHealth + 15);
    const newHappiness = Math.min(100, flameHappiness + 20);
    setFlameHealth(newHealth);
    setFlameHappiness(newHappiness);
    await storage.set('flameHealth', newHealth);
    await storage.set('flameHappiness', newHappiness);
  };

  const getPetStageName = () => {
    switch(petEvolutionStage) {
      case 1: return 'Spark';
      case 2: return 'Flame';
      case 3: return 'Blaze';
      case 4: return 'Inferno';
      default: return 'Spark';
    }
  };

  const getPetStageEmoji = () => {
    switch(petEvolutionStage) {
      case 1: return '🕯️'; // Spark - small candle
      case 2: return '🔥'; // Flame - fire
      case 3: return '🔆'; // Blaze - bright sun
      case 4: return '💫'; // Inferno - sparkles/stars
      default: return '🕯️';
    }
  };

  const getDailyPetTask = () => {
    const tasks = [
      { id: 1, task: "Complete today's energy check-in", action: "check-in" },
      { id: 2, task: "Finish today's exercise", action: "exercise" },
      { id: 3, task: "Write a journal entry", action: "journal" },
      { id: 4, task: "Complete a breathing exercise", action: "breathing" },
      { id: 5, task: "Review your progress", action: "progress" }
    ];
    
    // Rotate through tasks based on day
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return tasks[dayOfYear % tasks.length];
  };

  const completeExercise = async () => {
    const newCompleted = [...completedExercises, currentExercise.id];
    setCompletedExercises(newCompleted);
    await storage.set('completedExercises', newCompleted);
    
    // Increase flame happiness when completing exercises
    const newHappiness = Math.min(100, flameHappiness + 10);
    setFlameHappiness(newHappiness);
    await storage.set('flameHappiness', newHappiness);
    
    // Increase flame age
    const newAge = flameAge + 1;
    setFlameAge(newAge);
    await storage.set('flameAge', newAge);
    
    // Track that user was active today (for streak calculation)
    const today = new Date().toISOString();
    if (!hasCheckedInToday()) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      await storage.set('streak', newStreak);
      setLastCheckInDate(today);
      await storage.set('lastCheckInDate', today);
    }
    
    setCurrentExercise(null);
    setExerciseStep(0);
    setActiveTab('home');
  };

  const saveJournal = async () => {
    const entry = {
      date: new Date().toISOString(),
      mode: journalMode,
      prompt: journalMode === 'prompted' ? journalPrompts[journalEntries.length % journalPrompts.length] : null,
      content: journalText
    };
    const newEntries = [...journalEntries, entry];
    setJournalEntries(newEntries);
    await storage.set('journalEntries', newEntries);
    setJournalText('');
  };

  // Breathing exercise timer
  useEffect(() => {
    if (!breathingActive) return;
    
    const phases = ['inhale', 'hold1', 'exhale', 'hold2'];
    const durations = [4000, 4000, 4000, 4000]; // Box breathing 4-4-4-4
    
    const phaseIndex = phases.indexOf(breathingPhase);
    const timer = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % phases.length;
      setBreathingPhase(phases[nextIndex]);
      if (nextIndex === 0) setBreathingCount(prev => prev + 1);
    }, durations[phaseIndex]);
    
    return () => clearTimeout(timer);
  }, [breathingActive, breathingPhase]);

  // Welcome screen (shown to logged-out users)
  if (currentScreen === 'welcome') {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.gradientDark,
        color: colors.white,
        padding: design.space['4xl'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: colors.glow,
          filter: 'blur(80px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 200, 87, 0.2)',
          filter: 'blur(100px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        
        {/* Glassmorphism card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: design.radius['2xl'],
          padding: design.space['3xl'],
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: design.shadow['2xl'],
          marginBottom: design.space['2xl'],
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: colors.gradientPrimary,
            borderRadius: design.radius.xl,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: design.shadow.glowStrong,
            animation: 'float 3s ease-in-out infinite'
          }}>
            <Flame size={56} color={colors.white} />
          </div>
        </div>
        
        <h1 style={{ 
          fontSize: design.text['6xl'], 
          fontWeight: '900', 
          background: colors.gradientPrimary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: design.space.md,
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1
        }}>
          Flameout
        </h1>
        
        <p style={{ 
          fontSize: design.text.xl, 
          color: colors.grey300, 
          marginBottom: design.space['3xl'],
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: '1.6',
          fontWeight: '500',
          position: 'relative',
          zIndex: 1
        }}>
          Your personal companion for burnout recovery. Rebuild your energy, reclaim your life, reignite your flame.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: design.space.lg, 
          width: '100%', 
          maxWidth: '400px',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={() => setCurrentScreen('signup')}
            style={{
              background: colors.gradientPrimary,
              color: colors.white,
              border: 'none',
              padding: `${design.space.xl} ${design.space['2xl']}`,
              borderRadius: design.radius.xl,
              fontSize: design.text.lg,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              boxShadow: design.shadow.glow,
              transition: `all ${design.transition.base}`,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = design.shadow.glowStrong;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = design.shadow.glow;
            }}
          >
            Get Started Free
          </button>
          
          <button
            onClick={() => setCurrentScreen('login')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: colors.white,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: `${design.space.xl} ${design.space['2xl']}`,
              borderRadius: design.radius.xl,
              fontSize: design.text.lg,
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              transition: `all ${design.transition.base}`
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.borderColor = colors.primary;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Sign In
          </button>
          
          <button
            onClick={() => {
              setUserName('Guest');
              setCurrentScreen('onboarding');
            }}
            style={{
              background: 'transparent',
              color: colors.grey400,
              border: 'none',
              padding: design.space.md,
              fontSize: design.text.sm,
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              transition: `color ${design.transition.fast}`
            }}
            onMouseEnter={(e) => e.target.style.color = colors.white}
            onMouseLeave={(e) => e.target.style.color = colors.grey400}
          >
            Continue as Guest →
          </button>
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
      </div>
    );
  }

  // Signup screen
  if (currentScreen === 'signup') {
    const passwordValid = userPassword.length >= 8 && 
                         /[A-Z]/.test(userPassword) && 
                         /[0-9]/.test(userPassword);
    const canSignup = userName && userEmail && passwordValid && termsAccepted && healthDataConsent;
    
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.charcoal,
        color: colors.white,
        padding: '40px 20px',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <button
          onClick={() => setCurrentScreen('welcome')}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.grey100,
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'DM Sans',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
            Create Account
          </h1>
          
          <input
            type="text"
            placeholder="First Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: colors.grey100,
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontFamily: 'DM Sans',
                color: colors.navy,
                paddingRight: '50px'
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: colors.navy
              }}
            >
              👁️
            </button>
          </div>
          
          {userPassword && (
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Password requirements:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: userPassword.length >= 8 ? colors.success : colors.grey100 }}>
                  {userPassword.length >= 8 ? '✓' : '○'}
                </span>
                At least 8 characters
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: /[A-Z]/.test(userPassword) ? colors.success : colors.grey100 }}>
                  {/[A-Z]/.test(userPassword) ? '✓' : '○'}
                </span>
                At least one uppercase letter
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: /[0-9]/.test(userPassword) ? colors.success : colors.grey100 }}>
                  {/[0-9]/.test(userPassword) ? '✓' : '○'}
                </span>
                At least one number
              </div>
            </div>
          )}
          
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '16px',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ marginTop: '4px', cursor: 'pointer' }}
            />
            <span>
              I agree to the{' '}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowTermsOfUse(true);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: colors.primary,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'DM Sans',
                  padding: 0
                }}
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPrivacyPolicy(true);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: colors.primary,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'DM Sans',
                  padding: 0
                }}
              >
                Privacy Policy
              </button>
            </span>
          </label>
          
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '24px',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            <input
              type="checkbox"
              checked={healthDataConsent}
              onChange={(e) => setHealthDataConsent(e.target.checked)}
              style={{ marginTop: '4px', cursor: 'pointer' }}
            />
            <span>
              I consent to the processing of my health-related data (burnout scores, energy levels) as described in the Privacy Policy
            </span>
          </label>
          
          <button
            onClick={async () => {
              const now = new Date().toISOString();
              await storage.set('userName', userName);
              await storage.set('userEmail', userEmail);
              await storage.set('healthDataConsent', true);
              await storage.set('signupDate', now);
              setSignupDate(now);
              setCurrentScreen('onboarding');
            }}
            disabled={!canSignup}
            style={{
              width: '100%',
              background: canSignup ? colors.primary : colors.navy,
              color: canSignup ? colors.charcoal : colors.grey100,
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: canSignup ? 'pointer' : 'default',
              fontFamily: 'DM Sans',
              marginBottom: '16px'
            }}
          >
            Create Account
          </button>
          
          <p style={{ fontSize: '14px', color: colors.grey100, textAlign: 'center' }}>
            Already have an account?{' '}
            <button
              onClick={() => setCurrentScreen('login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.primary,
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
                fontFamily: 'DM Sans'
              }}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Login screen
  if (currentScreen === 'login') {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.charcoal,
        color: colors.white,
        padding: '40px 20px',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <button
          onClick={() => setCurrentScreen('welcome')}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.grey100,
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'DM Sans',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
            Welcome Back
          </h1>
          
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: colors.grey100,
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontFamily: 'DM Sans',
                color: colors.navy,
                paddingRight: '50px'
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: colors.navy
              }}
            >
              👁️
            </button>
          </div>
          
          <button
            onClick={async () => {
              await storage.set('userName', userName || 'User');
              await storage.set('currentScreen', 'main');
              setCurrentScreen('main');
              setActiveTab('home');
            }}
            style={{
              width: '100%',
              background: colors.primary,
              color: colors.charcoal,
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              marginBottom: '16px'
            }}
          >
            Log In
          </button>
          
          <p style={{ fontSize: '14px', color: colors.grey100, textAlign: 'center', marginBottom: '24px' }}>
            <a href="#" style={{ color: colors.primary, textDecoration: 'underline' }}>
              Forgot Password?
            </a>
          </p>
          
          <p style={{ fontSize: '14px', color: colors.grey100, textAlign: 'center' }}>
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentScreen('signup')}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.primary,
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
                fontFamily: 'DM Sans'
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Onboarding screens
  if (currentScreen === 'onboarding') {
    const onboardingScreens = [
      {
        title: "You're not broken.",
        subtitle: "Burnout is your body telling you something needs to change. Flameout helps you listen.",
        icon: <Flame size={80} color={colors.primary} />
      },
      {
        title: "Three phases. Your pace.",
        subtitle: "Recognition → Restoration → Resilience. A structured path back to yourself.",
        icon: <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: colors.grey100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'DM Sans',
              fontWeight: 'bold',
              color: colors.navy
            }}>{i}</div>
          ))}
        </div>
      },
      {
        title: "Start with honesty.",
        subtitle: "Take a 5-minute assessment to understand where you are. No judgment.",
        icon: <Check size={80} color={colors.success} />
      }
    ];

    const screen = onboardingScreens[onboardingStep];
    
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.charcoal,
        color: colors.white,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ marginBottom: '40px' }}>{screen.icon}</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>{screen.title}</h1>
          <p style={{ fontSize: '18px', color: colors.grey100, lineHeight: '1.6' }}>{screen.subtitle}</p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '60px',
          marginBottom: '40px'
        }}>
          {onboardingScreens.map((_, i) => (
            <div key={i} style={{
              width: i === onboardingStep ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === onboardingStep ? colors.primary : colors.grey100,
              transition: 'all 0.3s'
            }} />
          ))}
        </div>

        {onboardingStep < 2 ? (
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setOnboardingStep(2)}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.grey100,
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'DM Sans'
              }}
            >
              Skip
            </button>
            <button
              onClick={() => setOnboardingStep(prev => prev + 1)}
              style={{
                background: colors.primary,
                color: colors.charcoal,
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'DM Sans'
              }}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCurrentScreen('assessment')}
            style={{
              background: colors.primary,
              color: colors.charcoal,
              border: 'none',
              padding: '16px 48px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'DM Sans'
            }}
          >
            Take the Assessment
          </button>
        )}
      </div>
    );
  }

  // Assessment screen
  if (currentScreen === 'assessment') {
    if (assessmentStep < assessmentQuestions.length) {
      const question = assessmentQuestions[assessmentStep];
      const progress = ((assessmentStep + 1) / assessmentQuestions.length) * 100;
      
      return (
        <div style={{
          minHeight: '100vh',
          background: colors.charcoal,
          color: colors.white,
          fontFamily: 'DM Sans, sans-serif'
        }}>
          <div style={{
            height: '4px',
            background: colors.navy,
            width: '100%'
          }}>
            <div style={{
              height: '100%',
              background: colors.primary,
              width: `${progress}%`,
              transition: 'width 0.3s'
            }} />
          </div>
          
          <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              color: colors.grey100,
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              Question {assessmentStep + 1} of {assessmentQuestions.length}
            </div>
            
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '40px',
              lineHeight: '1.4'
            }}>
              {question.text}
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              {answerOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setAssessmentAnswers({ ...assessmentAnswers, [assessmentStep]: option.value });
                    setTimeout(() => setAssessmentStep(prev => prev + 1), 200);
                  }}
                  style={{
                    background: assessmentAnswers[assessmentStep] === option.value ? colors.primary : colors.grey100,
                    color: assessmentAnswers[assessmentStep] === option.value ? colors.charcoal : colors.navy,
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      // Results screen
      const scores = calculateBurnoutScore();
      const phase = getPhase(scores.total);
      const scoreColor = scores.total <= 33 ? colors.success : scores.total <= 66 ? colors.primary : colors.error;
      
      return (
        <div style={{
          minHeight: '100vh',
          background: colors.charcoal,
          color: colors.white,
          padding: '40px 20px',
          fontFamily: 'DM Sans, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Your Results</h1>
            
            <div style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              margin: '0 auto 40px'
            }}>
              <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={colors.navy}
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 80 * scores.total / 100} ${2 * Math.PI * 80}`}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '48px',
                fontWeight: 'bold',
                color: scoreColor
              }}>
                {scores.total}%
              </div>
            </div>
            
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              color: colors.navy
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Exhaustion</span>
                  <span style={{ fontWeight: 'bold' }}>{scores.exhaustion}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: colors.charcoal,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${scores.exhaustion}%`,
                    background: colors.error
                  }} />
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Cynicism</span>
                  <span style={{ fontWeight: 'bold' }}>{scores.cynicism}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: colors.charcoal,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${scores.cynicism}%`,
                    background: colors.primary
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Reduced Efficacy</span>
                  <span style={{ fontWeight: 'bold' }}>{scores.efficacy}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: colors.charcoal,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${scores.efficacy}%`,
                    background: colors.success
                  }} />
                </div>
              </div>
            </div>
            
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Phase {phase.number}: {phase.name}
              </div>
              <div style={{ fontSize: '14px', color: colors.grey100 }}>
                Your recovery journey begins here
              </div>
            </div>
            
            <button
              onClick={async () => {
                setCurrentScreen('signup');
                await storage.set('assessmentScores', scores);
              }}
              style={{
                background: colors.primary,
                color: colors.charcoal,
                border: 'none',
                padding: '16px 48px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'DM Sans',
                width: '100%'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }
  }

  // Signup screen
  if (currentScreen === 'signup') {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.charcoal,
        color: colors.white,
        padding: '40px 20px',
        fontFamily: 'DM Sans, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>
            Create Your Account
          </h1>
          
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <input
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '24px',
              background: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontFamily: 'DM Sans',
              color: colors.navy
            }}
          />
          
          <button
            onClick={async () => {
              await storage.set('userName', userName);
              await storage.set('currentScreen', 'main');
              setCurrentScreen('main');
              setActiveTab('home');
            }}
            style={{
              width: '100%',
              background: colors.primary,
              color: colors.charcoal,
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              marginBottom: '16px'
            }}
          >
            Get Started
          </button>
          
          <p style={{
            fontSize: '12px',
            color: colors.grey100,
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            By continuing you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  // Main app with tabs
  if (currentScreen === 'main') {
    const currentPrompt = journalPrompts[journalEntries.length % journalPrompts.length];
    
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.charcoal,
        color: colors.white,
        fontFamily: 'DM Sans, sans-serif',
        paddingBottom: '80px'
      }}>
        {/* SOS Button */}
        <button
          onClick={() => setActiveTab('sos')}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: colors.error,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <Shield size={24} color={colors.white} />
        </button>

        {/* Exercise Tab */}
        {activeTab === 'exercise' && !currentExercise && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Exercises</h1>
            <p style={{ fontSize: '14px', color: colors.grey100, marginBottom: '24px' }}>
              Phase 1: Recognition • Day {getCurrentDayOfRecovery()} of 14
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {exercises.map((exercise) => {
                const isUnlocked = exercise.id <= getCurrentDayOfRecovery();
                const isCompleted = completedExercises.includes(exercise.id);
                const isToday = exercise.id === getCurrentDayOfRecovery();
                
                return (
                  <div
                    key={exercise.id}
                    style={{
                      background: isUnlocked ? colors.grey100 : colors.navy,
                      borderRadius: '12px',
                      padding: '20px',
                      border: isToday && !isCompleted ? `2px solid ${colors.primary}` : 'none',
                      opacity: isUnlocked ? 1 : 0.5,
                      position: 'relative'
                    }}
                  >
                    {isToday && !isCompleted && (
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '20px',
                        background: colors.success,
                        color: colors.white,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        boxShadow: design.shadow.md,
                        animation: 'bounce 1s infinite'
                      }}>
                        UNLOCKED TODAY
                      </div>
                    )}
                    
                    {isCompleted && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: colors.success,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={20} color={colors.white} />
                      </div>
                    )}
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '12px',
                          color: isUnlocked ? colors.navy : colors.grey100,
                          marginBottom: '4px',
                          opacity: 0.7
                        }}>
                          Day {exercise.id}
                        </div>
                        
                        <div style={{
                          display: 'inline-block',
                          background: isUnlocked ? colors.primary : colors.grey100,
                          color: colors.charcoal,
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          marginBottom: '8px'
                        }}>
                          {exercise.type}
                        </div>
                        
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: isUnlocked ? colors.navy : colors.grey100,
                          marginBottom: '8px'
                        }}>
                          {exercise.title}
                        </h3>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: isUnlocked ? colors.navy : colors.grey100,
                          fontSize: '14px',
                          opacity: 0.7
                        }}>
                          <Clock size={14} />
                          {exercise.duration}
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: colors.success,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={24} color={colors.white} />
                        </div>
                      )}
                      
                      {!isCompleted && !isUnlocked && (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: colors.grey100,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          🔒
                        </div>
                      )}
                    </div>
                    
                    {isUnlocked && (
                      <button
                        onClick={() => {
                          setCurrentExercise(exercise);
                          setExerciseStep(0);
                        }}
                        disabled={isCompleted}
                        style={{
                          width: '100%',
                          background: isCompleted ? 'transparent' : colors.primary,
                          color: isCompleted ? colors.navy : colors.charcoal,
                          border: isCompleted ? `2px solid ${colors.success}` : 'none',
                          padding: '12px',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: isCompleted ? 'default' : 'pointer',
                          fontFamily: 'DM Sans'
                        }}
                      >
                        {isCompleted ? 'Completed ✓' : 'Start Exercise'}
                      </button>
                    )}
                    
                    {!isUnlocked && (
                      <div style={{
                        textAlign: 'center',
                        color: colors.grey100,
                        fontSize: '12px',
                        marginTop: '12px'
                      }}>
                        Unlocks on Day {exercise.id}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === 'home' && !currentExercise && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {getGreeting()}, {userName}
            </h1>
            
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Phase 1: Recognition
                </div>
                <div style={{ fontSize: '14px', color: colors.grey100 }}>
                  Day {getCurrentDayOfRecovery()} of 14
                </div>
              </div>
              <Flame size={32} color={colors.primary} />
            </div>
            
            {/* Energy Check-in */}
            {!hasCheckedInToday() ? (
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                border: `2px solid ${colors.primary}`,
                color: colors.navy
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                  How's your energy?
                </h3>
                
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energyToday === null ? 5 : energyToday}
                  onChange={(e) => setEnergyToday(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    marginBottom: '16px'
                  }}
                />
                <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
                  {energyToday === null ? 5 : energyToday}
                </div>
                
                <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                  What's affecting you today?
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  {['Work', 'Relationships', 'Health', 'Finances', 'Sleep', 'Other'].map(stressor => (
                    <button
                      key={stressor}
                      onClick={() => {
                        if (selectedStressors.includes(stressor)) {
                          setSelectedStressors(selectedStressors.filter(s => s !== stressor));
                        } else {
                          setSelectedStressors([...selectedStressors, stressor]);
                        }
                      }}
                      style={{
                        background: selectedStressors.includes(stressor) ? colors.primary : colors.white,
                        color: colors.navy,
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'DM Sans'
                      }}
                    >
                      {stressor}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={saveEnergyCheckin}
                  style={{
                    width: '100%',
                    background: colors.primary,
                    color: colors.charcoal,
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  Save Check-in
                </button>
              </div>
            ) : (
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                color: colors.navy,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>Today's Energy</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: colors.primary }}>
                  {energyHistory.length > 0 ? energyHistory[energyHistory.length - 1].energy : 5}
                </div>
                <div style={{ fontSize: '12px', color: colors.navy, opacity: 0.7, marginTop: '8px' }}>
                  ✓ Check-in complete! Come back tomorrow.
                </div>
              </div>
            )}
            
            {/* Today's Exercise */}
            {getTodaysExercise() && (
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                color: colors.navy,
                position: 'relative',
                border: !completedExercises.includes(getTodaysExercise().id) ? `2px solid ${colors.primary}` : 'none'
              }}>
                {!completedExercises.includes(getTodaysExercise().id) && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: colors.success,
                    color: colors.white,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    boxShadow: design.shadow.md,
                    animation: 'bounce 1s infinite'
                  }}>
                    NEW TODAY!
                  </div>
                )}
                
                <div style={{
                  display: 'inline-block',
                  background: colors.primary,
                  color: colors.charcoal,
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  {getTodaysExercise().type}
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {getTodaysExercise().title}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  color: colors.navy,
                  fontSize: '14px'
                }}>
                  <Clock size={16} />
                  {getTodaysExercise().duration}
                </div>
                
                <button
                  onClick={() => {
                    setCurrentExercise(getTodaysExercise());
                    setExerciseStep(0);
                  }}
                  disabled={completedExercises.includes(getTodaysExercise().id)}
                  style={{
                    background: completedExercises.includes(getTodaysExercise().id) ? colors.success : colors.primary,
                    color: completedExercises.includes(getTodaysExercise().id) ? colors.white : colors.charcoal,
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: completedExercises.includes(getTodaysExercise().id) ? 'default' : 'pointer',
                    fontFamily: 'DM Sans',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: !completedExercises.includes(getTodaysExercise().id) ? design.shadow.md : 'none'
                  }}
                >
                  {completedExercises.includes(getTodaysExercise().id) ? (
                    <>
                      <Check size={20} />
                      Completed
                    </>
                  ) : (
                    'Start Exercise'
                  )}
                </button>
              </div>
            )}
            
            {/* Streak Counter */}
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <Flame size={40} color={colors.primary} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{streak} day streak</div>
                <div style={{ fontSize: '14px', color: colors.grey100 }}>Keep it going!</div>
              </div>
            </div>
            
            {/* 7-Day Energy Chart */}
            {energyHistory.length > 0 && (
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '24px',
                color: colors.navy
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                  7-Day Energy
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  height: '120px'
                }}>
                  {energyHistory.slice(-7).map((day, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${day.energy * 10}%`,
                          background: colors.primary,
                          borderRadius: '4px 4px 0 0',
                          minHeight: '10px'
                        }}
                      />
                      <div style={{ fontSize: '10px', marginTop: '4px' }}>
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exercise Screen */}
        {currentExercise && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <button
              onClick={() => {
                setCurrentExercise(null);
                setExerciseStep(0);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.grey100,
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'DM Sans',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ChevronLeft size={20} />
              Back
            </button>
            
            <div style={{
              display: 'inline-block',
              background: colors.primary,
              color: colors.charcoal,
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}>
              {currentExercise.type}
            </div>
            
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {currentExercise.title}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              color: colors.grey100,
              fontSize: '14px'
            }}>
              <Clock size={16} />
              {currentExercise.duration}
            </div>
            
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '24px',
              color: colors.navy
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                {currentExercise.steps[exerciseStep].title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                {currentExercise.steps[exerciseStep].content}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
              {currentExercise.steps.map((_, i) => (
                <div key={i} style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i === exerciseStep ? colors.primary : colors.grey100
                }} />
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              {exerciseStep > 0 && (
                <button
                  onClick={() => setExerciseStep(prev => prev - 1)}
                  style={{
                    flex: 1,
                    background: colors.navy,
                    color: colors.white,
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={() => {
                  if (exerciseStep < currentExercise.steps.length - 1) {
                    setExerciseStep(prev => prev + 1);
                  } else {
                    completeExercise();
                  }
                }}
                style={{
                  flex: 1,
                  background: colors.primary,
                  color: colors.charcoal,
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans'
                }}
              >
                {exerciseStep < currentExercise.steps.length - 1 ? 'Next' : 'Complete Exercise'}
              </button>
            </div>
          </div>
        )}

        {/* Pet Tab */}
        {activeTab === 'pet' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Your Flame Companion</h1>
            <p style={{ fontSize: '14px', color: colors.grey100, marginBottom: '24px' }}>
              {flameName} • {getPetStageName()} • Level {petLevel}
            </p>

            {/* Pet Display */}
            <div style={{
              background: colors.grey100,
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '24px',
              textAlign: 'center',
              color: colors.navy,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background glow effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
                animation: 'pulse 2s infinite'
              }} />
              
              {/* Pet Character */}
              <div style={{
                fontSize: `${getPetStageEmoji() === '💫' ? 120 : 100}px`,
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1,
                animation: petMood === 'happy' ? 'bounce 1s infinite' : 'none'
              }}>
                {getPetStageEmoji()}
              </div>
              
              {/* Pet Name - Editable */}
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  value={flameName}
                  onChange={(e) => setFlameName(e.target.value)}
                  onBlur={async () => await storage.set('flameName', flameName)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `2px solid ${colors.navy}30`,
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: colors.navy,
                    fontFamily: 'DM Sans',
                    padding: '8px',
                    width: '80%'
                  }}
                />
              </div>
              
              {/* Pet Stats */}
              <div style={{ fontSize: '14px', color: colors.navy, opacity: 0.7, marginBottom: '20px' }}>
                {getPetStageName()} • Level {petLevel} • {totalPetTasks} tasks completed
              </div>
              
              {/* Mood Indicator */}
              <div style={{
                display: 'inline-block',
                background: petMood === 'happy' ? colors.success : petMood === 'neutral' ? colors.primary : colors.error,
                color: colors.white,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                {petMood === 'happy' ? '😊 Happy' : petMood === 'neutral' ? '😐 Neutral' : '😢 Needs Care'}
              </div>
              
              {/* Health & Happiness Bars */}
              <div style={{ textAlign: 'left', marginTop: '24px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>Health</span>
                    <span style={{ fontSize: '12px' }}>{flameHealth}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: colors.navy + '20',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${flameHealth}%`,
                      height: '100%',
                      background: flameHealth > 60 ? colors.success : flameHealth > 30 ? colors.primary : colors.error,
                      borderRadius: '4px',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>Happiness</span>
                    <span style={{ fontSize: '12px' }}>{flameHappiness}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: colors.navy + '20',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${flameHappiness}%`,
                      height: '100%',
                      background: flameHappiness > 60 ? colors.success : flameHappiness > 30 ? colors.primary : colors.error,
                      borderRadius: '4px',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              color: colors.navy
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Level {petLevel}</div>
                  <div style={{ fontSize: '12px', color: colors.navy, opacity: 0.7 }}>
                    {petExperience}/{petLevel * 100} XP
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: colors.navy, opacity: 0.7 }}>Next Evolution</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {petEvolutionStage === 1 ? 'Level 5' : petEvolutionStage === 2 ? 'Level 15' : petEvolutionStage === 3 ? 'Level 30' : 'Max!'}
                  </div>
                </div>
              </div>
              
              <div style={{
                width: '100%',
                height: '12px',
                background: colors.navy + '20',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(petExperience / (petLevel * 100)) * 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.error})`,
                  borderRadius: '6px',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>

            {/* Daily Task */}
            <div style={{
              background: dailyPetTaskCompleted ? colors.success : colors.grey100,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              color: dailyPetTaskCompleted ? colors.white : colors.navy,
              border: dailyPetTaskCompleted ? 'none' : `2px solid ${colors.primary}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', opacity: 0.8 }}>
                    DAILY TASK
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {getDailyPetTask().task}
                  </div>
                </div>
                {dailyPetTaskCompleted && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: colors.white + '30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={24} color={colors.white} />
                  </div>
                )}
              </div>
              
              {dailyPetTaskCompleted ? (
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                  ✓ Task completed! {flameName} gained 20 XP. Come back tomorrow for a new task!
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.8 }}>
                    Complete this task to earn 20 XP and make {flameName} happy!
                  </div>
                  <button
                    onClick={completeDailyPetTask}
                    style={{
                      width: '100%',
                      background: colors.primary,
                      color: colors.charcoal,
                      border: 'none',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans'
                    }}
                  >
                    Mark as Complete
                  </button>
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
                Quick Care
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={feedFlame}
                  style={{
                    background: colors.primary,
                    color: colors.charcoal,
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  🍃 Feed
                  <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>+20 Health</div>
                </button>
                
                <button
                  onClick={playWithFlame}
                  style={{
                    background: colors.success,
                    color: colors.white,
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  ✨ Play
                  <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '4px' }}>+25 Happiness</div>
                </button>
              </div>
            </div>

            {/* Evolution Stages */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
                Evolution Stages
              </div>
              
              {[
                { stage: 1, name: 'Spark', emoji: '🕯️', level: 1, desc: 'A tiny flame starting its journey' },
                { stage: 2, name: 'Flame', emoji: '🔥', level: 5, desc: 'Growing stronger and brighter' },
                { stage: 3, name: 'Blaze', emoji: '🔆', level: 15, desc: 'A powerful burning force' },
                { stage: 4, name: 'Inferno', emoji: '💫', level: 30, desc: 'Maximum evolution achieved!' }
              ].map(evo => (
                <div
                  key={evo.stage}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    background: petEvolutionStage === evo.stage ? colors.primary + '30' : 'transparent',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: petEvolutionStage === evo.stage ? `2px solid ${colors.primary}` : 'none'
                  }}
                >
                  <div style={{ fontSize: '32px', opacity: petEvolutionStage >= evo.stage ? 1 : 0.3 }}>
                    {evo.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '2px' }}>
                      {evo.name}
                      {petEvolutionStage === evo.stage && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontSize: '11px', 
                          background: colors.primary, 
                          color: colors.charcoal,
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      {evo.desc}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.6 }}>
                    Lv. {evo.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Journal</h1>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              background: colors.navy,
              padding: '8px',
              borderRadius: '12px'
            }}>
              <button
                onClick={() => setJournalMode('prompted')}
                style={{
                  flex: 1,
                  background: journalMode === 'prompted' ? colors.primary : 'transparent',
                  color: journalMode === 'prompted' ? colors.charcoal : colors.white,
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans'
                }}
              >
                Prompted
              </button>
              <button
                onClick={() => setJournalMode('free')}
                style={{
                  flex: 1,
                  background: journalMode === 'free' ? colors.primary : 'transparent',
                  color: journalMode === 'free' ? colors.charcoal : colors.white,
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans'
                }}
              >
                Free Write
              </button>
            </div>
            
            {journalMode === 'prompted' && (
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                color: colors.navy,
                fontSize: '16px',
                fontStyle: 'italic'
              }}>
                {currentPrompt}
              </div>
            )}
            
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder={journalMode === 'free' ? "Write whatever's on your mind..." : "Your thoughts..."}
              style={{
                width: '100%',
                minHeight: '200px',
                background: colors.grey100,
                border: 'none',
                borderRadius: '12px',
                padding: '20px',
                fontSize: '16px',
                fontFamily: 'DM Sans',
                color: colors.navy,
                marginBottom: '16px',
                resize: 'vertical'
              }}
            />
            
            <button
              onClick={saveJournal}
              disabled={!journalText.trim()}
              style={{
                width: '100%',
                background: journalText.trim() ? colors.primary : colors.navy,
                color: journalText.trim() ? colors.charcoal : colors.grey100,
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: journalText.trim() ? 'pointer' : 'default',
                fontFamily: 'DM Sans',
                marginBottom: '32px'
              }}
            >
              Save Entry
            </button>
            
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Past Entries</h2>
            {journalEntries.length === 0 ? (
              <div style={{
                background: colors.navy,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                color: colors.grey100
              }}>
                Your journal is empty. Start writing — even one sentence counts.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[...journalEntries].reverse().map((entry, i) => (
                  <div key={i} style={{
                    background: colors.grey100,
                    borderRadius: '12px',
                    padding: '16px',
                    color: colors.navy
                  }}>
                    <div style={{ fontSize: '12px', color: colors.navy, opacity: 0.7, marginBottom: '8px' }}>
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    {entry.prompt && (
                      <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '8px', opacity: 0.8 }}>
                        {entry.prompt}
                      </div>
                    )}
                    <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
                      {entry.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px' }}>Progress</h1>
            
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: completedExercises.length >= 14 ? colors.success : colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
                <div style={{ width: '40px', height: '4px', background: colors.grey100 }} />
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: isPremium && completedExercises.length >= 14 ? colors.primary : colors.navy,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  position: 'relative'
                }}>
                  2
                  {!(isPremium && completedExercises.length >= 14) && (
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      fontSize: '16px'
                    }}>🔒</div>
                  )}
                </div>
                <div style={{ width: '40px', height: '4px', background: colors.grey100 }} />
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: colors.navy,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  position: 'relative'
                }}>
                  3
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    fontSize: '16px'
                  }}>🔒</div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: colors.grey100, marginBottom: '8px' }}>
                  {completedExercises.length >= 14 ? 'Phase 1 Complete!' : `Phase 1: Recognition (${completedExercises.length}/14 exercises)`}
                </div>
                {completedExercises.length >= 14 && !isPremium && (
                  <button
                    onClick={() => setShowPaywall(true)}
                    style={{
                      background: colors.primary,
                      color: colors.charcoal,
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans',
                      marginTop: '16px'
                    }}
                  >
                    Unlock Phase 2
                  </button>
                )}
              </div>
            </div>
            
            {/* Premium Tools */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Premium Tools
                {!isPremium && (
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    color: colors.primary,
                    marginLeft: '8px',
                    background: colors.navy,
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    🔒 Premium Only
                  </span>
                )}
              </h2>
              <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <button
                  onClick={() => {
                    if (isPremium) {
                      setShowEnergyBudget(true);
                    } else {
                      setShowPaywall(true);
                    }
                  }}
                  style={{
                    background: colors.grey100,
                    color: colors.navy,
                    border: 'none',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans',
                    position: 'relative',
                    opacity: isPremium ? 1 : 0.7
                  }}
                >
                  {!isPremium && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      fontSize: '20px'
                    }}>
                      🔒
                    </div>
                  )}
                  <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Energy Budget
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    Plan your daily energy spend
                  </div>
                </button>
                
                <div style={{
                  background: colors.grey100,
                  color: colors.navy,
                  padding: '20px',
                  borderRadius: '12px',
                  opacity: 0.6,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '20px'
                  }}>
                    🔒
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Burnout Shield
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    {isPremium ? 'Unlocks after 14 days of data' : 'Premium feature'}
                  </div>
                </div>
              </div>
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Milestones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '16px',
                color: colors.navy,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Check size={32} color={colors.success} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>Completed Assessment</div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>First step taken</div>
                </div>
              </div>
              
              {streak >= 7 && (
                <div style={{
                  background: colors.grey100,
                  borderRadius: '12px',
                  padding: '16px',
                  color: colors.navy,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <Flame size={32} color={colors.primary} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>7-Day Streak</div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>Consistency builds recovery</div>
                  </div>
                </div>
              )}
              
              {journalEntries.length > 0 && (
                <div style={{
                  background: colors.grey100,
                  borderRadius: '12px',
                  padding: '16px',
                  color: colors.navy,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <Book size={32} color={colors.primary} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>First Journal Entry</div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>Words create awareness</div>
                  </div>
                </div>
              )}
              
              {completedExercises.length >= 14 && (
                <div style={{
                  background: colors.grey100,
                  borderRadius: '12px',
                  padding: '16px',
                  color: colors.navy,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <TrendingUp size={32} color={colors.success} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Phase 1 Complete</div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>Ready for restoration</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Settings</h1>
            
            {/* Profile Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                PROFILE
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: colors.charcoal,
                marginBottom: '16px'
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Name</div>
                <div style={{ fontSize: '16px' }}>{userName}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '16px', opacity: 0.7 }}>{userEmail}</div>
              </div>
            </div>
            
            {/* Subscription Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                SUBSCRIPTION
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                {isPremium ? 'Premium — Annual' : 'Free Plan'}
              </div>
              {isPremium ? (
                <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '16px' }}>
                  Renews April 10, 2027
                </div>
              ) : (
                <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '16px' }}>
                  Upgrade to unlock Phase 2 & 3
                </div>
              )}
              {!isPremium && (
                <button
                  onClick={() => setShowPaywall(true)}
                  style={{
                    background: colors.primary,
                    color: colors.charcoal,
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans',
                    marginBottom: '12px'
                  }}
                >
                  Upgrade to Premium
                </button>
              )}
              <button
                style={{
                  background: 'transparent',
                  color: colors.primary,
                  border: `1px solid ${colors.primary}`,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  marginRight: '8px'
                }}
              >
                Manage Subscription
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: colors.navy,
                  border: 'none',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  textDecoration: 'underline'
                }}
              >
                Restore Purchases
              </button>
            </div>
            
            {/* Data & Privacy Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                DATA & PRIVACY
              </div>
              
              {/* Cloud Sync Toggle */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: `1px solid ${colors.navy}20`
              }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Cloud Sync
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    Backup your data to the cloud
                  </div>
                </div>
                <button
                  onClick={async () => {
                    const newValue = !cloudSyncEnabled;
                    setCloudSyncEnabled(newValue);
                    await storage.set('cloudSyncEnabled', newValue);
                  }}
                  style={{
                    width: '50px',
                    height: '28px',
                    borderRadius: '14px',
                    background: cloudSyncEnabled ? colors.success : colors.navy,
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: colors.white,
                    position: 'absolute',
                    top: '3px',
                    left: cloudSyncEnabled ? '25px' : '3px',
                    transition: 'left 0.3s'
                  }} />
                </button>
              </div>
              
              <button
                onClick={async () => {
                  const data = {
                    userName,
                    userEmail,
                    signupDate,
                    energyHistory,
                    completedExercises,
                    journalEntries,
                    streak,
                    currentDay: getCurrentDayOfRecovery(),
                    flameHealth,
                    flameHappiness,
                    flameName,
                    flameAge,
                    petLevel,
                    petExperience,
                    petEvolutionStage,
                    petMood,
                    totalPetTasks,
                    lastPetTaskDate,
                    exportDate: new Date().toISOString()
                  };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `flameout-data-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url); // Clean up
                  alert('✅ Your data has been exported successfully!');
                }}
                style={{
                  width: '100%',
                  background: colors.primary,
                  color: colors.charcoal,
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  marginBottom: '12px'
                }}
              >
                Export My Data
              </button>
              <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.primary,
                    cursor: 'pointer',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    fontFamily: 'DM Sans',
                    padding: 0
                  }}
                >
                  Privacy Policy
                </button>
                {' • '}
                <button
                  onClick={() => setShowTermsOfUse(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.primary,
                    cursor: 'pointer',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    fontFamily: 'DM Sans',
                    padding: 0
                  }}
                >
                  Terms of Use
                </button>
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                {cloudSyncEnabled ? 'Last synced: Just now' : 'Cloud sync disabled'}
              </div>
            </div>
            
            {/* Notifications Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                NOTIFICATIONS
              </div>
              
              {/* Daily Reminder Toggle */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: `1px solid ${colors.navy}20`
              }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Daily Check-in Reminder
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    Get notified to track your energy
                  </div>
                </div>
                <button
                  onClick={async () => {
                    const newValue = !notificationsEnabled;
                    setNotificationsEnabled(newValue);
                    await storage.set('notificationsEnabled', newValue);
                  }}
                  style={{
                    width: '50px',
                    height: '28px',
                    borderRadius: '14px',
                    background: notificationsEnabled ? colors.success : colors.navy,
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: colors.white,
                    position: 'absolute',
                    top: '3px',
                    left: notificationsEnabled ? '25px' : '3px',
                    transition: 'left 0.3s'
                  }} />
                </button>
              </div>
              
              {/* Reminder Time Picker */}
              {notificationsEnabled && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Reminder Time
                  </div>
                  <input
                    type="time"
                    value={dailyReminderTime}
                    onChange={async (e) => {
                      setDailyReminderTime(e.target.value);
                      await storage.set('dailyReminderTime', e.target.value);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: `1px solid ${colors.navy}30`,
                      fontSize: '16px',
                      fontFamily: 'DM Sans',
                      background: colors.white
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* App Preferences Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                APP PREFERENCES
              </div>
              
              {/* Language */}
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${colors.navy}20` }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Language
                </div>
                <select
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.navy}30`,
                    fontSize: '16px',
                    fontFamily: 'DM Sans',
                    background: colors.white
                  }}
                >
                  <option>English</option>
                  <option>Deutsch (Coming Soon)</option>
                  <option>Español (Coming Soon)</option>
                  <option>Français (Coming Soon)</option>
                </select>
              </div>
              
              {/* Daily Goal */}
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Daily Streak Goal
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '12px' }}>
                  Current streak: {streak} days 🔥
                </div>
                <select
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.navy}30`,
                    fontSize: '16px',
                    fontFamily: 'DM Sans',
                    background: colors.white
                  }}
                >
                  <option>7 days</option>
                  <option selected>14 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
            </div>
            
            {/* Account Section */}
            <div style={{
              background: colors.grey100,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              color: colors.navy
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', opacity: 0.7 }}>
                ACCOUNT
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to log out?')) {
                    setCurrentScreen('welcome');
                    setUserName('');
                    setUserEmail('');
                  }
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: colors.navy,
                  border: `2px solid ${colors.navy}`,
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  marginBottom: '12px'
                }}
              >
                Log Out
              </button>
              <button
                onClick={() => {
                  const confirmed = window.prompt('Type DELETE to permanently delete your account and all data');
                  if (confirmed === 'DELETE') {
                    alert('Your account has been deleted. We\'re sorry to see you go.');
                    setCurrentScreen('welcome');
                    setUserName('');
                    setUserEmail('');
                    setEnergyHistory([]);
                    setCompletedExercises([]);
                    setJournalEntries([]);
                  }
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: colors.error,
                  border: 'none',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  textDecoration: 'underline'
                }}
              >
                Delete Account
              </button>
            </div>
            
            {/* About Section */}
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: colors.grey100, marginBottom: '8px' }}>
                Flameout v1.0.0
              </div>
              <div style={{ fontSize: '11px', color: colors.grey100, fontStyle: 'italic' }}>
                Made with care for people who give too much.
              </div>
            </div>
          </div>
        )}

        {/* Flame Pet Modal */}

        {/* Privacy Policy Modal */}
        {showPrivacyPolicy && (
        {showPrivacyPolicy && (
          <div style={{
          <div style={{
            position: 'fixed',
            position: 'fixed',
            top: 0,
            top: 0,
            left: 0,
            left: 0,
            right: 0,
            right: 0,
            bottom: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 3000,
            zIndex: 3000,
            display: 'flex',
            display: 'flex',
            alignItems: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            justifyContent: 'center',
            padding: '20px',
            padding: '20px',
            overflowY: 'auto'
            overflowY: 'auto'
          }}>
          }}>
            <div style={{
            <div style={{
              background: colors.charcoal,
              background: colors.charcoal,
              borderRadius: '20px',
              borderRadius: '20px',
              maxWidth: '700px',
              maxWidth: '700px',
              width: '100%',
              width: '100%',
              maxHeight: '90vh',
              maxHeight: '90vh',
              overflow: 'hidden',
              overflow: 'hidden',
              display: 'flex',
              display: 'flex',
              flexDirection: 'column'
              flexDirection: 'column'
            }}>
            }}>
              <div style={{
              <div style={{
                padding: '32px 32px 20px',
                padding: '32px 32px 20px',
                borderBottom: `1px solid ${colors.navy}`
                borderBottom: `1px solid ${colors.navy}`
              }}>
              }}>
                <button
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  onClick={() => setShowPrivacyPolicy(false)}
                  style={{
                  style={{
                    float: 'right',
                    float: 'right',
                    background: 'transparent',
                    background: 'transparent',
                    border: 'none',
                    border: 'none',
                    color: colors.grey100,
                    color: colors.grey100,
                    cursor: 'pointer',
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontSize: '24px',
                    padding: 0
                    padding: 0
                  }}
                  }}
                >
                >
                  ×
                  ×
                </button>
                </button>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                  Privacy Policy
                  Privacy Policy
                </h2>
                </h2>
              </div>
              </div>
              
              
              <div style={{
              <div style={{
                padding: '32px',
                padding: '32px',
                overflowY: 'auto',
                overflowY: 'auto',
                fontSize: '14px',
                fontSize: '14px',
                lineHeight: '1.7',
                lineHeight: '1.7',
                color: colors.white
                color: colors.white
              }}>
              }}>
                <p style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '20px' }}>
                  <strong>Effective Date:</strong> April 2026
                  <strong>Effective Date:</strong> April 2026
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  1. Introduction
                  1. Introduction
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Flameout ("we," "our," or "us") operates this mobile application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App. By using Flameout, you agree to the practices described in this policy.
                  Flameout ("we," "our," or "us") operates this mobile application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App. By using Flameout, you agree to the practices described in this policy.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  2. Information We Collect
                  2. Information We Collect
                </h3>
                </h3>
                <p style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Information You Provide:</strong>
                  <strong>Information You Provide:</strong>
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Account information: email address, display name, and password</li>
                  <li>Account information: email address, display name, and password</li>
                  <li>Burnout assessment responses and scores</li>
                  <li>Burnout assessment responses and scores</li>
                  <li>Energy check-in data (energy levels 1-10, selected stressors)</li>
                  <li>Energy check-in data (energy levels 1-10, selected stressors)</li>
                  <li>Journal entries (stored locally on your device by default)</li>
                  <li>Journal entries (stored locally on your device by default)</li>
                  <li>Exercise completion records</li>
                  <li>Exercise completion records</li>
                </ul>
                </ul>


                <p style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Information We Do NOT Collect:</strong>
                  <strong>Information We Do NOT Collect:</strong>
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Precise location data</li>
                  <li>Precise location data</li>
                  <li>Contacts or address book data</li>
                  <li>Contacts or address book data</li>
                  <li>Photos, videos, or camera access</li>
                  <li>Photos, videos, or camera access</li>
                  <li>Health data from Apple Health or Google Fit</li>
                  <li>Health data from Apple Health or Google Fit</li>
                  <li>Advertising identifiers for ad targeting</li>
                  <li>Advertising identifiers for ad targeting</li>
                </ul>
                </ul>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  3. How We Use Your Information
                  3. How We Use Your Information
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  We use your information exclusively to:
                  We use your information exclusively to:
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Create and manage your account</li>
                  <li>Create and manage your account</li>
                  <li>Deliver personalized burnout recovery content</li>
                  <li>Deliver personalized burnout recovery content</li>
                  <li>Track your progress and energy trends</li>
                  <li>Track your progress and energy trends</li>
                  <li>Process your subscription (handled by secure payment providers)</li>
                  <li>Process your subscription (handled by secure payment providers)</li>
                  <li>Send optional notifications you've enabled</li>
                  <li>Send optional notifications you've enabled</li>
                  <li>Improve app functionality and fix bugs</li>
                  <li>Improve app functionality and fix bugs</li>
                </ul>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  <strong>We do not use your information for advertising, profiling, or selling to third parties.</strong>
                  <strong>We do not use your information for advertising, profiling, or selling to third parties.</strong>
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  4. Data Storage and Security
                  4. Data Storage and Security
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Your data is encrypted both at rest (AES-256) and in transit (TLS 1.3). Journal entries are stored locally on your device by default and are not transmitted to our servers unless you enable cloud backup.
                  Your data is encrypted both at rest (AES-256) and in transit (TLS 1.3). Journal entries are stored locally on your device by default and are not transmitted to our servers unless you enable cloud backup.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  5. We Do Not Sell Your Data
                  5. We Do Not Sell Your Data
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  We never sell, rent, lease, or trade your personal information. We do not share your health-related data with any third party for advertising, marketing, or research purposes.
                  We never sell, rent, lease, or trade your personal information. We do not share your health-related data with any third party for advertising, marketing, or research purposes.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  6. Your Rights
                  6. Your Rights
                </h3>
                </h3>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li><strong>Access:</strong> Export all your data via Settings</li>
                  <li><strong>Access:</strong> Export all your data via Settings</li>
                  <li><strong>Deletion:</strong> Permanently delete your account and all data</li>
                  <li><strong>Deletion:</strong> Permanently delete your account and all data</li>
                  <li><strong>Correction:</strong> Update your account information anytime</li>
                  <li><strong>Correction:</strong> Update your account information anytime</li>
                  <li><strong>Portability:</strong> Export your data in JSON format</li>
                  <li><strong>Portability:</strong> Export your data in JSON format</li>
                  <li><strong>Withdrawal:</strong> Withdraw health data consent at any time</li>
                  <li><strong>Withdrawal:</strong> Withdraw health data consent at any time</li>
                </ul>
                </ul>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  7. GDPR Compliance
                  7. GDPR Compliance
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  For users in the European Economic Area: We process health-related data based on your explicit consent (GDPR Article 9). You may withdraw this consent at any time. Data transfers outside the EEA are protected by Standard Contractual Clauses.
                  For users in the European Economic Area: We process health-related data based on your explicit consent (GDPR Article 9). You may withdraw this consent at any time. Data transfers outside the EEA are protected by Standard Contractual Clauses.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  8. Medical Disclaimer
                  8. Medical Disclaimer
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Flameout is a wellness tool, not a medical device or substitute for professional mental health care. If you're in crisis, please contact emergency services or the 988 Suicide & Crisis Lifeline.
                  Flameout is a wellness tool, not a medical device or substitute for professional mental health care. If you're in crisis, please contact emergency services or the 988 Suicide & Crisis Lifeline.
                </p>
                </p>


                <p style={{ marginTop: '32px', fontSize: '12px', color: colors.grey100 }}>
                <p style={{ marginTop: '32px', fontSize: '12px', color: colors.grey100 }}>
                  Last Updated: April 2026
                  Last Updated: April 2026
                </p>
                </p>
              </div>
              </div>
            </div>
            </div>
          </div>
          </div>
        )}
        )}


        {/* Terms of Use Modal */}
        {/* Terms of Use Modal */}
        {showTermsOfUse && (
        {showTermsOfUse && (
          <div style={{
          <div style={{
            position: 'fixed',
            position: 'fixed',
            top: 0,
            top: 0,
            left: 0,
            left: 0,
            right: 0,
            right: 0,
            bottom: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 3000,
            zIndex: 3000,
            display: 'flex',
            display: 'flex',
            alignItems: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            justifyContent: 'center',
            padding: '20px',
            padding: '20px',
            overflowY: 'auto'
            overflowY: 'auto'
          }}>
          }}>
            <div style={{
            <div style={{
              background: colors.charcoal,
              background: colors.charcoal,
              borderRadius: '20px',
              borderRadius: '20px',
              maxWidth: '700px',
              maxWidth: '700px',
              width: '100%',
              width: '100%',
              maxHeight: '90vh',
              maxHeight: '90vh',
              overflow: 'hidden',
              overflow: 'hidden',
              display: 'flex',
              display: 'flex',
              flexDirection: 'column'
              flexDirection: 'column'
            }}>
            }}>
              <div style={{
              <div style={{
                padding: '32px 32px 20px',
                padding: '32px 32px 20px',
                borderBottom: `1px solid ${colors.navy}`
                borderBottom: `1px solid ${colors.navy}`
              }}>
              }}>
                <button
                <button
                  onClick={() => setShowTermsOfUse(false)}
                  onClick={() => setShowTermsOfUse(false)}
                  style={{
                  style={{
                    float: 'right',
                    float: 'right',
                    background: 'transparent',
                    background: 'transparent',
                    border: 'none',
                    border: 'none',
                    color: colors.grey100,
                    color: colors.grey100,
                    cursor: 'pointer',
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontSize: '24px',
                    padding: 0
                    padding: 0
                  }}
                  }}
                >
                >
                  ×
                  ×
                </button>
                </button>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                  Terms of Use
                  Terms of Use
                </h2>
                </h2>
              </div>
              </div>
              
              
              <div style={{
              <div style={{
                padding: '32px',
                padding: '32px',
                overflowY: 'auto',
                overflowY: 'auto',
                fontSize: '14px',
                fontSize: '14px',
                lineHeight: '1.7',
                lineHeight: '1.7',
                color: colors.white
                color: colors.white
              }}>
              }}>
                <p style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '20px' }}>
                  <strong>Effective Date:</strong> April 2026
                  <strong>Effective Date:</strong> April 2026
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  1. Acceptance of Terms
                  1. Acceptance of Terms
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  By downloading, installing, or using the Flameout mobile application, you agree to be bound by these Terms of Use. If you do not agree, do not use the App.
                  By downloading, installing, or using the Flameout mobile application, you agree to be bound by these Terms of Use. If you do not agree, do not use the App.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  2. Description of Service
                  2. Description of Service
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Flameout is a mobile wellness application that provides a structured burnout recovery journey consisting of three phases: Recognition, Restoration, and Resilience. The App offers:
                  Flameout is a mobile wellness application that provides a structured burnout recovery journey consisting of three phases: Recognition, Restoration, and Resilience. The App offers:
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Burnout self-assessment tools</li>
                  <li>Burnout self-assessment tools</li>
                  <li>Guided exercises based on CBT and ACT techniques</li>
                  <li>Guided exercises based on CBT and ACT techniques</li>
                  <li>Energy level tracking</li>
                  <li>Energy level tracking</li>
                  <li>Journaling features</li>
                  <li>Journaling features</li>
                  <li>Breathing exercises</li>
                  <li>Breathing exercises</li>
                  <li>Crisis resource links</li>
                  <li>Crisis resource links</li>
                </ul>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Important:</strong> Flameout is a wellness tool. It is not a medical device, diagnostic tool, or substitute for professional mental health treatment.
                  <strong>Important:</strong> Flameout is a wellness tool. It is not a medical device, diagnostic tool, or substitute for professional mental health treatment.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  3. Account Registration
                  3. Account Registration
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  To access certain features, you must create an account. You agree to:
                  To access certain features, you must create an account. You agree to:
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Provide accurate, current information</li>
                  <li>Provide accurate, current information</li>
                  <li>Maintain the security of your password</li>
                  <li>Maintain the security of your password</li>
                  <li>Be at least 13 years of age (16 in the EEA)</li>
                  <li>Be at least 13 years of age (16 in the EEA)</li>
                  <li>Notify us of unauthorized account use</li>
                  <li>Notify us of unauthorized account use</li>
                </ul>
                </ul>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  4. Subscription and Payment
                  4. Subscription and Payment
                </h3>
                </h3>
                <p style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Free Tier:</strong> Includes burnout assessment, Phase 1 exercises, daily energy check-ins, basic journaling, breathing exercises, and crisis resources.
                  <strong>Free Tier:</strong> Includes burnout assessment, Phase 1 exercises, daily energy check-ins, basic journaling, breathing exercises, and crisis resources.
                </p>
                </p>
                <p style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Premium Tier:</strong> Unlocks Phase 2 & 3 exercises, unlimited journaling, Energy Budget tool, Burnout Shield dashboard, and data export. Available as:
                  <strong>Premium Tier:</strong> Unlocks Phase 2 & 3 exercises, unlimited journaling, Energy Budget tool, Burnout Shield dashboard, and data export. Available as:
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Annual: €19.99/year or $21.99/year (includes 7-day free trial)</li>
                  <li>Annual: €19.99/year or $21.99/year (includes 7-day free trial)</li>
                  <li>Monthly: €4.99/month or $5.49/month</li>
                  <li>Monthly: €4.99/month or $5.49/month</li>
                  <li>Lifetime: €69.99 or $76.99 one-time</li>
                  <li>Lifetime: €69.99 or $76.99 one-time</li>
                </ul>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Subscriptions auto-renew unless canceled at least 24 hours before the end of the billing period. Manage subscriptions through your App Store or Google Play account.
                  Subscriptions auto-renew unless canceled at least 24 hours before the end of the billing period. Manage subscriptions through your App Store or Google Play account.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  5. User Conduct
                  5. User Conduct
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  You agree not to:
                  You agree not to:
                </p>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Use the App for any unlawful purpose</li>
                  <li>Use the App for any unlawful purpose</li>
                  <li>Attempt unauthorized access to the App or its systems</li>
                  <li>Attempt unauthorized access to the App or its systems</li>
                  <li>Reverse-engineer or decompile the App</li>
                  <li>Reverse-engineer or decompile the App</li>
                  <li>Share your account credentials</li>
                  <li>Share your account credentials</li>
                  <li>Use automated systems to access the App</li>
                  <li>Use automated systems to access the App</li>
                </ul>
                </ul>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  6. Intellectual Property
                  6. Intellectual Property
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  All content, features, and functionality of the App are owned by Flameout and protected by international copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial use only.
                  All content, features, and functionality of the App are owned by Flameout and protected by international copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial use only.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  7. User-Generated Content
                  7. User-Generated Content
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Journal entries and other content you create remain your property. We do not claim ownership and will not share your content with third parties without your explicit consent.
                  Journal entries and other content you create remain your property. We do not claim ownership and will not share your content with third parties without your explicit consent.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  8. Crisis Resources Disclaimer
                  8. Crisis Resources Disclaimer
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  The App provides links to crisis resources (988 Suicide & Crisis Lifeline, Crisis Text Line, emergency services). These resources are operated by independent third parties. We are not responsible for their availability or response times. <strong>If you are experiencing a medical or mental health emergency, call emergency services (911) immediately.</strong>
                  The App provides links to crisis resources (988 Suicide & Crisis Lifeline, Crisis Text Line, emergency services). These resources are operated by independent third parties. We are not responsible for their availability or response times. <strong>If you are experiencing a medical or mental health emergency, call emergency services (911) immediately.</strong>
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  9. Disclaimers
                  9. Disclaimers
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. FLAMEOUT IS NOT A MEDICAL DEVICE. THE APP DOES NOT DIAGNOSE, TREAT, CURE, OR PREVENT ANY DISEASE OR MEDICAL CONDITION. THE BURNOUT ASSESSMENT AND ALL EXERCISES ARE FOR INFORMATIONAL AND SELF-HELP PURPOSES ONLY. ALWAYS SEEK THE ADVICE OF A QUALIFIED HEALTHCARE PROFESSIONAL.
                  THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. FLAMEOUT IS NOT A MEDICAL DEVICE. THE APP DOES NOT DIAGNOSE, TREAT, CURE, OR PREVENT ANY DISEASE OR MEDICAL CONDITION. THE BURNOUT ASSESSMENT AND ALL EXERCISES ARE FOR INFORMATIONAL AND SELF-HELP PURPOSES ONLY. ALWAYS SEEK THE ADVICE OF A QUALIFIED HEALTHCARE PROFESSIONAL.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  10. Limitation of Liability
                  10. Limitation of Liability
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  To the maximum extent permitted by law, Flameout shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the App. Our total liability shall not exceed the amount you paid in the twelve months preceding the claim.
                  To the maximum extent permitted by law, Flameout shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the App. Our total liability shall not exceed the amount you paid in the twelve months preceding the claim.
                </p>
                </p>


                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginTop: '24px', marginBottom: '12px' }}>
                  11. Changes to Terms
                  11. Changes to Terms
                </h3>
                </h3>
                <p style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                  We may modify these Terms at any time. Material changes will be notified at least 30 days before they take effect. Continued use after changes constitutes acceptance.
                  We may modify these Terms at any time. Material changes will be notified at least 30 days before they take effect. Continued use after changes constitutes acceptance.
                </p>
                </p>


                <p style={{ marginTop: '32px', fontSize: '12px', color: colors.grey100 }}>
                <p style={{ marginTop: '32px', fontSize: '12px', color: colors.grey100 }}>
                  Last Updated: April 2026
                  Last Updated: April 2026
                </p>
                </p>
              </div>
              </div>
            </div>
            </div>
          </div>
          </div>
        )}
        )}


        {/* Paywall Modal */}
        {/* Paywall Modal */}
        {showPaywall && (
        {showPaywall && (
          <div style={{
          <div style={{
            position: 'fixed',
            position: 'fixed',
            top: 0,
            top: 0,
            left: 0,
            left: 0,
            right: 0,
            right: 0,
            bottom: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 3000,
            zIndex: 3000,
            display: 'flex',
            display: 'flex',
            alignItems: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            justifyContent: 'center',
            padding: '20px',
            padding: '20px',
            overflowY: 'auto'
            overflowY: 'auto'
          }}>
          }}>
            <div style={{
            <div style={{
              background: colors.charcoal,
              background: colors.charcoal,
              borderRadius: '20px',
              borderRadius: '20px',
              maxWidth: '500px',
              maxWidth: '500px',
              width: '100%',
              width: '100%',
              padding: '40px 32px',
              padding: '40px 32px',
              position: 'relative'
              position: 'relative'
            }}>
            }}>
              <button
              <button
                onClick={() => setShowPaywall(false)}
                onClick={() => setShowPaywall(false)}
                style={{
                style={{
                  position: 'absolute',
                  position: 'absolute',
                  top: '20px',
                  top: '20px',
                  right: '20px',
                  right: '20px',
                  background: 'transparent',
                  background: 'transparent',
                  border: 'none',
                  border: 'none',
                  color: colors.grey100,
                  color: colors.grey100,
                  cursor: 'pointer',
                  cursor: 'pointer',
                  fontSize: '24px',
                  fontSize: '24px',
                  padding: '8px'
                  padding: '8px'
                }}
                }}
              >
              >
                ×
                ×
              </button>
              </button>
              
              
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{
                <div style={{
                  width: '80px',
                  width: '80px',
                  height: '80px',
                  height: '80px',
                  background: colors.gradientPrimary,
                  background: colors.gradientPrimary,
                  borderRadius: design.radius.xl,
                  borderRadius: design.radius.xl,
                  display: 'flex',
                  display: 'flex',
                  alignItems: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  margin: '0 auto 24px',
                  boxShadow: design.shadow.glow
                  boxShadow: design.shadow.glow
                }}>
                }}>
                  <Flame size={48} color={colors.white} />
                  <Flame size={48} color={colors.white} />
                </div>
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Premium Features Coming Soon! 🚀
                  Premium Features Coming Soon! 🚀
                </h2>
                </h2>
                <p style={{ fontSize: '16px', color: colors.grey300, lineHeight: '1.6' }}>
                <p style={{ fontSize: '16px', color: colors.grey300, lineHeight: '1.6' }}>
                  We're working hard to bring you Phase 2: Restoration and Phase 3: Resilience, plus exclusive premium tools.
                  We're working hard to bring you Phase 2: Restoration and Phase 3: Resilience, plus exclusive premium tools.
                </p>
                </p>
              </div>
              </div>
              
              
              {/* Coming Soon Banner */}
              {/* Coming Soon Banner */}
              <div style={{
              <div style={{
                background: colors.gradientAccent,
                background: colors.gradientAccent,
                borderRadius: design.radius.lg,
                borderRadius: design.radius.lg,
                padding: '20px',
                padding: '20px',
                marginBottom: '24px',
                marginBottom: '24px',
                textAlign: 'center'
                textAlign: 'center'
              }}>
              }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: colors.charcoal, marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: colors.charcoal, marginBottom: '8px' }}>
                  🎉 LAUNCH TIMELINE
                  🎉 LAUNCH TIMELINE
                </div>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.charcoal }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.charcoal }}>
                  Q3 2026
                  Q3 2026
                </div>
                </div>
              </div>
              </div>
              
              
              {/* What's Coming in Premium */}
              {/* What's Coming in Premium */}
              <div style={{
              <div style={{
                background: colors.navy,
                background: colors.navy,
                borderRadius: design.radius.lg,
                borderRadius: design.radius.lg,
                padding: '24px',
                padding: '24px',
                marginBottom: '24px'
                marginBottom: '24px'
              }}>
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                  🎁 What's Included in Premium
                  🎁 What's Included in Premium
                </h3>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                  {[
                    '✨ Phase 2: Restoration (16 exercises)',
                    '✨ Phase 2: Restoration (16 exercises)',
                    '🔥 Phase 3: Resilience (30+ exercises)',
                    '🔥 Phase 3: Resilience (30+ exercises)',
                    '📊 Energy Budget Planning Tool',
                    '📊 Energy Budget Planning Tool',
                    '🛡️ Burnout Shield Dashboard',
                    '🛡️ Burnout Shield Dashboard',
                    '📈 Advanced Progress Analytics',
                    '📈 Advanced Progress Analytics',
                    '♾️ Unlimited Journal Entries',
                    '♾️ Unlimited Journal Entries',
                    '🎯 Boundary-Setting Templates',
                    '🎯 Boundary-Setting Templates',
                    '📱 Priority Support'
                    '📱 Priority Support'
                  ].map((feature, i) => (
                  ].map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Check size={18} color={colors.success} style={{ flexShrink: 0 }} />
                      <Check size={18} color={colors.success} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{feature}</span>
                      <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{feature}</span>
                    </div>
                    </div>
                  ))}
                  ))}
                </div>
                </div>
              </div>
              </div>
              
              
              {/* Free Plan is Available Now */}
              {/* Free Plan is Available Now */}
              <div style={{
              <div style={{
                background: colors.gradientSuccess,
                background: colors.gradientSuccess,
                borderRadius: design.radius.lg,
                borderRadius: design.radius.lg,
                padding: '20px',
                padding: '20px',
                marginBottom: '24px',
                marginBottom: '24px',
                textAlign: 'center'
                textAlign: 'center'
              }}>
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.white, marginBottom: '8px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.white, marginBottom: '8px' }}>
                  ✅ Free Plan Available Now!
                  ✅ Free Plan Available Now!
                </div>
                </div>
                <div style={{ fontSize: '14px', color: colors.white, opacity: 0.9 }}>
                <div style={{ fontSize: '14px', color: colors.white, opacity: 0.9 }}>
                  Complete Phase 1 (14 exercises) • Daily Pet System • Progress Tracking
                  Complete Phase 1 (14 exercises) • Daily Pet System • Progress Tracking
                </div>
                </div>
              </div>
              </div>
              
              
              {/* Close Button */}
              {/* Close Button */}
              <button
              <button
                onClick={() => setShowPaywall(false)}
                onClick={() => setShowPaywall(false)}
                style={{
                style={{
                  width: '100%',
                  width: '100%',
                  background: colors.gradientPrimary,
                  background: colors.gradientPrimary,
                  color: colors.white,
                  color: colors.white,
                  border: 'none',
                  border: 'none',
                  padding: '16px',
                  padding: '16px',
                  borderRadius: design.radius.lg,
                  borderRadius: design.radius.lg,
                  fontSize: '16px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans',
                  fontFamily: 'DM Sans',
                  boxShadow: design.shadow.glow
                  boxShadow: design.shadow.glow
                }}
                }}
              >
              >
                Continue with Free Plan
                Continue with Free Plan
              </button>
              </button>
              
              
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: colors.grey400 }}>
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: colors.grey400 }}>
                We'll notify you when Premium launches! 🚀
                We'll notify you when Premium launches! 🚀
              </div>
              </div>
            </div>
            </div>
          </div>
          </div>
        )}
        )}


        {/* Privacy Policy Modal */}
        {/* Privacy Policy Modal */}
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                border: `3px solid ${colors.primary}`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: colors.primary,
                  color: colors.charcoal,
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  BEST VALUE
                </div>
                
                <div style={{ color: colors.navy }}>
                  <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.7 }}>
                    Premium — Annual
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                      {currency === 'EUR' ? '€19.99' : '$21.99'}
                    </span>
                    <span style={{ fontSize: '18px', opacity: 0.7 }}>/year</span>
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '16px', color: colors.success, fontWeight: 'bold' }}>
                    Save 67% • Just {currency === 'EUR' ? '€1.67' : '$1.83'}/month
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsPremium(true);
                      setShowPaywall(false);
                      alert(`🎉 Premium unlocked! You now have access to all features.\n\nPlan: Annual ${currency === 'EUR' ? '€19.99' : '$21.99'}/year\n7-day free trial included`);
                    }}
                    style={{
                      width: '100%',
                      background: colors.primary,
                      color: colors.charcoal,
                      border: 'none',
                      padding: '18px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans',
                      marginBottom: '12px'
                    }}
                  >
                    Start 7-Day Free Trial
                  </button>
                  
                  <div style={{ fontSize: '12px', textAlign: 'center', opacity: 0.7 }}>
                    Cancel anytime. {currency === 'EUR' ? '€19.99' : '$21.99'}/year after trial.
                  </div>
                </div>
              </div>
              
              {/* Monthly Plan */}
              <div style={{
                background: colors.navy,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px'
              }}>
                <div style={{ color: colors.white }}>
                  <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.7 }}>
                    Or pay monthly
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {currency === 'EUR' ? '€4.99' : '$5.49'}
                    </span>
                    <span style={{ fontSize: '16px', opacity: 0.7 }}>/month</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsPremium(true);
                      setShowPaywall(false);
                      alert(`🎉 Premium unlocked! You now have access to all features.\n\nPlan: Monthly ${currency === 'EUR' ? '€4.99' : '$5.49'}/month`);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`,
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans'
                    }}
                  >
                    Subscribe Monthly
                  </button>
                </div>
              </div>
              
              {/* Lifetime Plan */}
              <div style={{
                background: colors.navy,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ color: colors.white }}>
                  <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.7 }}>
                    Lifetime Access
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {currency === 'EUR' ? '€69.99' : '$76.99'}
                    </span>
                    <span style={{ fontSize: '16px', opacity: 0.7 }}>one-time</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsPremium(true);
                      setShowPaywall(false);
                      alert(`🎉 Lifetime Premium unlocked! You now have permanent access to all features.\n\nOne-time payment: ${currency === 'EUR' ? '€69.99' : '$76.99'}`);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      color: colors.white,
                      border: `2px solid ${colors.grey100}`,
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans'
                    }}
                  >
                    Pay Once, Own Forever
                  </button>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.grey100,
                    fontSize: '14px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  Restore Purchases
                </button>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowPaywall(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.grey100,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  Not ready? Stay on the free plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Energy Budget Tool (Premium) */}
        {showEnergyBudget && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: colors.charcoal,
            zIndex: 2000,
            overflowY: 'auto',
            padding: '20px'
          }}>
            <button
              onClick={() => setShowEnergyBudget(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.grey100,
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'DM Sans',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <X size={20} />
              Close
            </button>
            
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                Energy Budget
              </h1>
              <p style={{ color: colors.grey100, marginBottom: '32px' }}>
                You have limited energy each day. Spend it wisely.
              </p>
              
              <div style={{
                background: colors.navy,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>Daily Budget</div>
                <div style={{
                  height: '32px',
                  background: colors.grey100,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(energyBudgetItems.reduce((sum, item) => sum + item.cost, 0), 100)}%`,
                    background: energyBudgetItems.reduce((sum, item) => sum + item.cost, 0) > 100 
                      ? colors.error 
                      : colors.primary,
                    transition: 'all 0.3s'
                  }} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {energyBudgetItems.reduce((sum, item) => sum + item.cost, 0)} / 100 points
                </div>
                {energyBudgetItems.reduce((sum, item) => sum + item.cost, 0) > 100 && (
                  <div style={{ color: colors.error, fontSize: '14px', marginTop: '8px' }}>
                    You've planned more than your energy allows. Something needs to go.
                  </div>
                )}
              </div>
              
              <div style={{
                background: colors.grey100,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                color: colors.navy
              }}>
                <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
                  Add Activity
                </h3>
                <input
                  type="text"
                  placeholder="Activity name"
                  id="activity-name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '12px',
                    background: colors.white,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'DM Sans',
                    color: colors.navy
                  }}
                />
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Energy Cost: <span style={{ fontWeight: 'bold' }}>15 points</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    defaultValue="15"
                    id="activity-cost"
                    style={{ width: '100%' }}
                  />
                </div>
                <button
                  onClick={() => {
                    const name = document.getElementById('activity-name').value;
                    const cost = parseInt(document.getElementById('activity-cost').value);
                    if (name) {
                      setEnergyBudgetItems([...energyBudgetItems, { name, cost, id: Date.now() }]);
                      document.getElementById('activity-name').value = '';
                    }
                  }}
                  style={{
                    width: '100%',
                    background: colors.primary,
                    color: colors.charcoal,
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans'
                  }}
                >
                  Add Activity
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {energyBudgetItems.map(item => (
                  <div key={item.id} style={{
                    background: colors.grey100,
                    borderRadius: '12px',
                    padding: '16px',
                    color: colors.navy,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.name}</div>
                      <div style={{ fontSize: '14px', opacity: 0.7 }}>{item.cost} points</div>
                    </div>
                    <button
                      onClick={() => {
                        setEnergyBudgetItems(energyBudgetItems.filter(i => i.id !== item.id));
                      }}
                      style={{
                        background: colors.error,
                        color: colors.white,
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {energyBudgetItems.length === 0 && (
                  <div style={{
                    background: colors.navy,
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    color: colors.grey100
                  }}>
                    Add your first activity to start planning your energy budget
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SOS Tab */}
        {activeTab === 'sos' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>You're not alone.</h1>
            
            <button
              onClick={() => {
                setBreathingActive(true);
                setBreathingCount(0);
                setBreathingPhase('inhale');
              }}
              style={{
                width: '100%',
                background: colors.primary,
                color: colors.charcoal,
                border: 'none',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'DM Sans',
                marginBottom: '24px'
              }}
            >
              Quick Breathing Exercise (1 min)
            </button>
            
            {breathingActive && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: colors.charcoal,
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}>
                <button
                  onClick={() => setBreathingActive(false)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: colors.grey100,
                    cursor: 'pointer'
                  }}
                >
                  <X size={32} />
                </button>
                
                <div style={{
                  width: breathingPhase === 'inhale' || breathingPhase === 'exhale' ? '250px' : '200px',
                  height: breathingPhase === 'inhale' || breathingPhase === 'exhale' ? '250px' : '200px',
                  borderRadius: '50%',
                  background: colors.primary,
                  transition: 'all 4s ease-in-out',
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.charcoal
                }}>
                  {breathingPhase === 'inhale' ? 'Breathe In' : 
                   breathingPhase === 'exhale' ? 'Breathe Out' : 'Hold'}
                </div>
                
                <div style={{ fontSize: '18px', color: colors.grey100 }}>
                  {breathingCount} breaths
                </div>
                
                {breathingCount >= 4 && (
                  <button
                    onClick={() => setBreathingActive(false)}
                    style={{
                      marginTop: '40px',
                      background: colors.success,
                      color: colors.charcoal,
                      border: 'none',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans'
                    }}
                  >
                    Complete
                  </button>
                )}
              </div>
            )}
            
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Crisis Resources</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href="tel:988"
                style={{
                  background: colors.grey100,
                  color: colors.navy,
                  padding: '20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  988 Suicide & Crisis Lifeline
                </div>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>Call or text anytime</div>
              </a>
              
              <a
                href="sms:741741&body=HOME"
                style={{
                  background: colors.grey100,
                  color: colors.navy,
                  padding: '20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  Crisis Text Line
                </div>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>Text HOME to 741741</div>
              </a>
              
              <a
                href="tel:911"
                style={{
                  background: colors.error,
                  color: colors.white,
                  padding: '20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  Emergency Services
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Call 911</div>
              </a>
            </div>
            
            <div style={{
              background: colors.navy,
              borderRadius: '12px',
              padding: '20px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: colors.grey100
            }}>
              Flameout is a wellness tool, not a substitute for professional mental health care. If you're in crisis, please reach out to the resources above.
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: colors.navy,
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.3)'
        }}>
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'exercise', icon: Dumbbell, label: 'Exercise' },
            { id: 'pet', icon: Flame, label: 'Pet' },
            { id: 'journal', icon: Book, label: 'Journal' },
            { id: 'progress', icon: TrendingUp, label: 'Progress' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? colors.primary : colors.grey100,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'DM Sans',
                  fontSize: '11px',
                  position: 'relative'
                }}
              >
                <Icon size={22} />
                <span>{tab.label}</span>
                {tab.id === 'pet' && !dailyPetTaskCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.error
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
