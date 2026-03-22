-- Seed challenges for development

insert into public.challenges (title, slug, scenario, objective, constraints, viewport, type, template_html, template_css, active) values

(
  'Login Form for a Music Streaming App',
  'music-login',
  'You are designing the login screen for "Wavvy", a music streaming app aimed at young adults (18-30). The brand is modern, vibrant, and minimal. Users should feel invited to sign in quickly.',
  'Create a mobile login form with email and password fields, a "Sign in" button, and a "Sign up" link. Include the app logo/name at the top. The form should feel clean, modern, and on-brand.',
  'Mobile viewport only. No JavaScript. Must include: logo/app name, email input, password input, sign-in button, sign-up link. Tailwind classes encouraged.',
  'mobile',
  'daily',
  '<div class="min-h-screen flex flex-col items-center justify-center p-6">
  <h1 class="text-2xl font-bold mb-8">Wavvy</h1>
  <!-- Your login form here -->
</div>',
  '/* Add your styles here */',
  true
),

(
  'SaaS Pricing Page',
  'saas-pricing',
  'You are designing the pricing section for "Stackly", a project management SaaS. They offer three tiers: Free, Pro ($12/mo), and Team ($29/mo per seat). The brand is professional, trustworthy, and clean. The goal is to make Pro the obvious choice.',
  'Create a pricing section with three plan cards side by side. Each card should show: plan name, price, feature list (4-5 items), and a CTA button. The Pro plan should be visually highlighted as the recommended option.',
  'Desktop viewport. No JavaScript. Must include three plan cards with name, price, features, and CTA. Pro plan must be visually distinguished. Tailwind classes encouraged.',
  'desktop',
  'weekly',
  null,
  null,
  true
),

(
  'Mobile Navigation Menu for a Travel App',
  'travel-nav',
  'You are designing the mobile navigation for "Roamly", a travel planning app. The app has 5 main sections: Explore, Trips, Saved, Messages, and Profile. The brand is adventurous but clean — think warm tones and clear iconography.',
  'Create a bottom navigation bar with 5 items. Each item should have an icon (use emoji or simple shapes) and a label. One item should appear as "active". The nav should feel native and polished.',
  'Mobile viewport only. No JavaScript. Must include 5 nav items with icons and labels. One item must be visually active. Fixed to bottom of screen. Tailwind classes encouraged.',
  'mobile',
  'daily',
  null,
  null,
  true
);
