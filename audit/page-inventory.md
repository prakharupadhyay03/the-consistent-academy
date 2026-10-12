# Website Page Inventory — The Consistent Academy

**Audit Target URL:** [https://www.theconsistentacademy.in/](https://www.theconsistentacademy.in/)  
**Audit Date:** October 11, 2026  
**Auditor:** Pair Programming Assistant (Antigravity)  
**Technology Stack (Original):** React 18, Vite, Tailwind CSS (Neumorphic Design System), Framer Motion, GSAP, Firebase Auth & Firestore, Cloudinary  
**Target Redesign Stack:** React.js, Vite, Tailwind CSS, Lucide React  

---

## 1. Inventory Summary

| # | Route / Path | Page Name / Component | Accessibility | Primary Purpose | SEO Title Tag |
|---|-------------|-----------------------|---------------|-----------------|---------------|
| 1 | `/` | Home (`u_e`) | Public | Primary landing page, value proposition, featured courses, founder credibility, photo gallery, testimonials | The Consistent Academy \| IELTS & English Learning |
| 2 | `/courses` | Courses (`m_e`) | Public | Comprehensive course catalog (Adults, Kids, Educator Training) with module details and pricing | English Courses & IELTS Training \| The Consistent Academy |
| 3 | `/careers` | Careers (`pAe`) | Public | Educator & mentor recruitment portal with position cards and application form | Careers \| Join The Consistent Academy |
| 4 | `/contact` | Contact Us (`gAe`) | Public | Direct inquiry form, contact phone/email/address, and course selection dropdown | Contact Us \| The Consistent Academy |
| 5 | `/tests` | Diagnostic Tests (`TAe`) | Public (Auth-gated test submission) | Free English proficiency tests (Kids 25Q, Adults 28Q) & 60Q Leadership Style Assessment | English & Leadership Tests \| The Consistent Academy |
| 6 | `/blog` | Community Blogs (`GMe`) | Public | Community blog feed with pagination, search/categories, and authenticated blog submission | Community Blogs \| The Consistent Academy |
| 7 | `/blog/:id` | Blog Detail (`CDe`) | Public | Single blog reader with rich typography and dynamic Article schema | [Post Title] \| The Consistent Academy |
| 8 | `/club` | CC Club (`DHe`) | Public / Auth Gated | College public speaking club ("Consistent Communicators Club") landing & dashboard | Consistent Communicators Club \| TCA |
| 9 | `/login` | Authentication (`AAe`) | Public | User & Admin sign in and account creation | Login \| The Consistent Academy |
| 10 | `/admin` | Admin Dashboard (`q$e`) | Admin Only (`claims.admin`) | Lead overview, test score analytics, user management | Admin Dashboard \| TCA |
| 11 | `/admin/blogs`| Blog Moderation (`kDe`) | Admin Only (`claims.admin`) | Approval, editing, and deletion workflow for community submitted blogs | Admin Blogs \| TCA |
| 12 | `*` | Not Found 404 (`SAe`) | Fallback | Graceful handling for non-existent routes with link back to Home | 404 - Not Found |

---

## 2. Detailed Page Breakdowns

---

### Page 1: Homepage (`/`)
* **URL:** `https://www.theconsistentacademy.in/`
* **Canonical Link:** `https://www.theconsistentacademy.in/` (Head tag has fallback `https://consistentacademy.com`)
* **Title:** `The Consistent Academy | IELTS & English Learning`
* **Meta Description:** `Master English with The Consistent Academy. Expert IELTS preparation, spoken English, and writing skills courses with proven methodology.`
* **OpenGraph Image:** `https://www.theconsistentacademy.in/logo2.png`
* **Structured Data:** `@type: EducationalOrganization` (`name`, `url`, `logo`, `description`, `sameAs`)

#### Visual & Functional Sections:
1. **Interactive Preloader (`t_e`):**
   * Multi-colored expanding circular reveals (`#3C096C`, `#5A189A`, `#7B2CBF`, `#9C37FC`) powered by GSAP timeline.
   * Displays circular badge logo (`/logo2.png`) before fading into the main view.
2. **Fixed Navigation Bar (`ws`):**
   * Logo: `/logo.png` (Neumorphic square card, 40x40px).
   * Brand text: `The Consistent Academy`.
   * Desktop Navigation Links:
     * `Home` (Scrolls smoothly to `#home`)
     * `Courses` (`/courses`)
     * `Blog` (`/blog`)
     * `Careers` (`/careers`)
     * `Tests` (`/tests`)
     * `Contact` (`/contact`)
   * Primary CTA Button: `Enroll Now` (Links to `/contact`).
   * Mobile Hamburger Menu: Expandable glassmorphic drawer containing full route links.
3. **Floating Developer Credit Badge (`e_e`):**
   * Fixed left badge at top left (`z-[60]`).
   * Hover animation expanding from `88px` to `194px` revealing `/developers.png` with LinkedIn profile links for creators:
     * **Nakul Bhadade:** `https://www.linkedin.com/in/nakul-bhadade/`
     * **Siddhi Dhoke:** `https://www.linkedin.com/in/siddhi-dhoke-53b7b432b/`
4. **Hero Section (`c_e` / `#home`):**
   * Typography: Animated headline using Google Font `"Erica One"`:
     * "The" (Word split animation)
     * "Consistent" (Char split animation in vivid violet `#9738F9`)
     * "Academy" (Char split animation)
   * Primary Call to Action Button (`H4e`): Neumorphic button with SVG splash effect and animated label `"Join Today"`, navigating to `/contact`.
   * Floating Social Media Ribbon (`n_e`): Fixed on right on medium/large screens with direct links:
     * Instagram (`#E4405F`): `https://www.instagram.com/the_consistent_academy/`
     * WhatsApp (`#25D366`): `https://chat.whatsapp.com/Kw2YbntkWMqG66MVI9xSJq?mode=ac_t`
     * LinkedIn (`#0A66C2`): `https://www.linkedin.com/company/the-consistent-academy/`
   * Liquid Interactive CC Club Widget (`q4e`): Bottom-right interactive SVG gooey filter button leading to `/club`.
5. **Courses Showcase Section (`#courses`):**
   * Eyebrow: `COURSES`
   * Heading: `Learn with Clarity & Confidence` (Gradient text `#6C63FF` to `#38B2AC`).
   * Continuous Marquee Carousel (`Sve`): Displays 5 featured course titles with thumbnail images (`/courses/img1.png` through `/courses/img5.png`):
     1. IELTS | TOEFL | PTE | CELPIP
     2. Corporate Communication
     3. Crack Your Interview
     4. Communication Skill Training
     5. Courses for Kids
   * Sub-text: `and more…`
   * Section CTA: `View All Courses` button linking to `/courses`.
6. **Meet the Founder Section (`J4e` / `#founder`):**
   * Eyebrow: `MEET THE FOUNDER`
   * Heading: `Vidya Wankhade`
   * Portrait Image: `/gallery/vidya.png`
   * Biographical Highlights:
     * 19+ years of professional training experience.
     * British Council Certified IELTS Master Trainer.
     * Certified Soft Skills & Corporate Trainer; Train-the-Trainer professional.
     * Qualifications: B.Sc, B.Ed, MPM; UGC NET qualified.
     * International Certifications: TOEFL Trainer, PET Trainer, TESOL/TEFL certified.
   * Published Authorship Showcase:
     1. **Cakewalk IELTS:** Image `/books/cakewalk-ielts.jpg` (Links to Evincepub, Bspkart, Amazon, Flipkart).
     2. **Reading Detective – Solving Comprehension Mysteries for Kids:** Image `/books/the-reading-detective.jpg` (Links to Evincepub, Amazon, Flipkart, Instamojo).
     3. **101 Management Books You’ll Never Read But Should:** Image `/books/101-management.jpg` (Links to Evincepub, Amazon, Flipkart).
7. **Learning in Action Gallery Section:**
   * Heading: `Learning in Action` (Gradient text).
   * 3D Curved Interactive Gallery Carousel (`o6e`): Features 22 high-resolution photography assets (`/gallery/v1.png` to `/gallery/v22.jpeg`) displaying student mentoring sessions, workshops, interactive grammar drills, and awards.
8. **Testimonials Section (`Z4e` / `#testimonials`):**
   * Eyebrow: `TESTIMONIALS`
   * Heading: `Stories of Success`
   * Interactive Carousel: Card displaying 5-star ratings, testimonial quote, student name, current role/designation, and course taken. (10 verified testimonials detailed in checklist).
9. **Global Footer:**
   * Logo & Statement: `The Consistent Academy` — *"Empowering learners to achieve English fluency through consistent practice and expert guidance."*
   * Social Links: Instagram, WhatsApp, LinkedIn.
   * Quick Links: Home, Careers, Courses, Tests, Blog, CC Club, Testimonials.
   * Contact Information:
     * Location: `Pune, Maharashtra`
     * Phone: `+91 77091 09830`
     * Email: `theconsistentacademy@gmail.com`
   * Bottom Bar:
     * Copyright: `© [Year] The Consistent Academy. All rights reserved.`
     * Utility Links: `Admin Login` (`/login?redirect=admin`), `Privacy Policy` (`#`), `Terms of Service` (`#`).

---

### Page 2: Courses Catalog (`/courses`)
* **URL:** `https://www.theconsistentacademy.in/courses`
* **Canonical Link:** `https://www.theconsistentacademy.in/courses`
* **Title:** `English Courses & IELTS Training | The Consistent Academy`
* **Meta Description:** `Comprehensive IELTS, TOEFL, PTE preparation, corporate communication, and kids' English development courses at The Consistent Academy.`
* **Structured Data:** `@type: ItemList` (`itemListElement: Course` array for rich snippets)

#### Visual & Functional Layout:
* **Header / Hero Banner:**
  * Eyebrow: `OUR PROGRAMS`
  * Main Title: `Master Global Communication`
  * Subtitle: `Structured programs crafted for kids, professionals, and future leaders.`
* **Category Tabs / Filters:**
  1. `All Courses`
  2. `Adults & Professionals`
  3. `Kids & Young Learners`
  4. `Educators & Teachers`
* **Course Card Grid:**
  * Each card features: Course thumbnail, duration badge (e.g. `20 Hours`, `4 Weeks`), module count badge, course title, pricing tag (e.g. `₹ 12,000/-`, `₹ 3,000/-`), course description summary, and interactive `View Details` trigger opening an expansive detail modal.
* **Course Detail Modal (`d_e`):**
  * Displays complete syllabus breakdown, duration per module, comprehensive topic list, target audience profile, institutional guarantee/promise, and direct `Enroll for this Course` button redirecting to `/contact?course=[title]`.

---

### Page 3: Careers (`/careers`)
* **URL:** `https://www.theconsistentacademy.in/careers`
* **Canonical Link:** `https://www.theconsistentacademy.in/careers`
* **Title:** `Careers | Join The Consistent Academy`
* **Meta Description:** `Join The Consistent Academy as an IELTS Trainer, Spoken English Mentor, or Teaching Assistant. Build your career with us.`

#### Visual & Functional Layout:
* **Hero Banner:**
  * Title: `Join The Consistent Academy`
  * Subtitle: `We're always looking for passionate educators and mentors who believe in consistent growth and meaningful learning.`
* **Interactive Position Cards (5 Openings):**
  1. **IELTS Trainer** (Part-time / Full-time)
  2. **Spoken English Mentor** (Part-time / Full-time)
  3. **Teaching Assistant** (Part-time / Full-time)
  4. **Writing Skills Coach** (Part-time / Full-time)
  5. **Corporate Communication Trainer** (Part-time / Full-time)
  * Clicking any card automatically populates the job role into the application form and smoothly scrolls down to the form.
  * Hover popover reveals role responsibilities, required qualifications, and band criteria (e.g., IELTS Band 8+).
* **Application Form:**
  * Fields:
    * `Full Name` (Text, required)
    * `Email Address` (Email, required)
    * `Contact / WhatsApp Number` (Tel, required)
    * `Position Applied For` (Pre-filled or dropdown, required)
    * `Years of Experience` (Text/Number, required)
    * `Resume / Portfolio Link` (URL, Google Drive link)
    * `Cover Note / Message` (Textarea)
  * Submit Action: Saves record to Firestore collection `careerApplications` with timestamp `createdAt: serverTimestamp()`.
  * Success Feedback: Custom browser alert advising profile review and contact via `theconsistentacademy@gmail.com`.

---

### Page 4: Contact Us (`/contact`)
* **URL:** `https://www.theconsistentacademy.in/contact`
* **Canonical Link:** `https://www.theconsistentacademy.in/contact`
* **Title:** `Contact Us | The Consistent Academy`
* **Meta Description:** `Get in touch with The Consistent Academy. We are here to answer your questions about our English language courses and test preparation programs.`

#### Visual & Functional Layout:
* **Hero Section:** Heading: `Get In Touch`
* **Dual-Column Layout:**
  * **Column 1 — Inquiry Form:**
    * Heading: `Send us a Message`
    * Fields:
      * `Name` (Text, required)
      * `Email` (Email, required)
      * `Phone` (Tel, placeholder `+91 00000-00000`)
      * `Course Selection` (Optgroup dropdown with Adult & Kids programs)
      * `Message` (Textarea, required, 5 rows)
    * Submission Logic:
      * Saves lead payload into Firestore collection `contactRequests`.
      * Concurrently fires `POST /api/contact` (Vercel serverless function).
      * Triggers toast notification: *"Message Sent! Thank you for your inquiry. We'll get back to you soon."*
  * **Column 2 — Contact Details Cards (`mAe`):**
    * **Email Card:** `theconsistentacademy@gmail.com` (`mailto:` link)
    * **Phone Card:** `+91 77091 09830` (`tel:` link)
    * **Office Location Card:** `Pune, Maharashtra`
    * Quick CTA linking to WhatsApp group.

---

### Page 5: Diagnostic Hub & Tests (`/tests`)
* **URL:** `https://www.theconsistentacademy.in/tests`
* **Canonical Link:** `https://www.theconsistentacademy.in/tests`
* **Title:** `English & Leadership Tests | The Consistent Academy`
* **Meta Description:** `Take our free English grammar proficiency tests for kids and adults, or assess your leadership style with our psychometric test.`

#### Visual & Functional Layout:
* **Pre-Test Hub / Test Selection:**
  * Card 1: **Grammar Test for Kids** (Age 5–17 Years, 25 MCQs)
  * Card 2: **Advanced Grammar Test** (For Adults & Advanced Learners, 28 MCQs)
  * Card 3: **Leadership Style Assessment** (Comprehensive Leadership Diagnostic, 60 Psychometric items)
* **Authentication Requirement (`v`):**
  * Taking and saving tests requires quick email/password login or guest registration (creates document in `users/${uid}`).
* **Interactive Quiz Runner (`wAe` / `EAe`):**
  * Live question navigation, progress bar, radio button answer selection, previous/next controls.
* **Instant Evaluation & Results Dashboard:**
  * Grammar Tests: Displays score, percentage, correct vs. wrong breakdown, personalized guidance.
  * Leadership Assessment: Calculates scores across 10 leadership archetypes:
    * *Autocratic, Democratic, Laissez-Faire, Transformational, Transactional, Servant, Situational, Coaching, Visionary, Bureaucratic*.
    * Identifies **Dominant Style** and **Secondary Style** with tailored confidence levels and badges (`/leadership/[style].png`).
  * Submits results to Firestore collection `testResults`.

---

### Page 6: Community Blogs (`/blog`) & Single Post (`/blog/:id`)
* **URL:** `https://www.theconsistentacademy.in/blog`
* **Canonical Link:** `https://www.theconsistentacademy.in/blog`
* **Title:** `Community Blogs | The Consistent Academy`
* **Meta Description:** `Read insights, stories, and learning experiences from the community at The Consistent Academy.`

#### Visual & Functional Layout:
* **Article Listing View (`GMe`):**
  * Displays approved blog posts fetched dynamically from Firestore collection `blogs` (`where status == "approved"`).
  * Infinite scroll / pagination (`10 blogs per page` via React Query).
  * Blog card: Cover image, article title, excerpt, author name, publication date, read time.
* **Article Creation Drawer / Modal:**
  * Trigger: `Write a Blog` (prompts login if unauthenticated).
  * Form fields: `Title`, `Author`, `Cover Image Upload`, `Content` (Rich text/HTML).
  * Image compression via `browser-image-compression`.
  * Uploads cover image to **Cloudinary** (`upload_preset: tca_blogs`, cloud name `dftodlkkt`).
  * Saves to Firestore `blogs` with `status: "pending"`.
* **Single Post View (`CDe` / `/blog/:id`):**
  * Dynamic SEO title, canonical link, and JSON-LD Article schema.
  * Full article layout, cover image banner, author attribution, formatted content, "Back to Blog" navigation.

---

### Page 7: Consistent Communicators Club (`/club`)
* **URL:** `https://www.theconsistentacademy.in/club`
* **Title:** `Consistent Communicators Club | TCA`
* **Description:** `College Public Speaking Club. A systematic transformation process that equips students with lifelong communication skills.`

#### Visual & Functional Layout:
* **Unauthenticated View (`G$e` / `X$e`):**
  * Bespoke dark neumorphic aesthetic (`var(--cc-bg)` with interactive mouse-following floating gradient orbs).
  * Header button: `Back to TCA` (`/`).
  * Badge: `COLLEGE PUBLIC SPEAKING CLUB`.
  * Main Headline: `Consistent Communicators Club`.
  * Value Proposition: Foundational fluency to placement-ready mastery.
  * Multi-tier member signup & login form supporting roles: `Student / Member`, `Trainer`, `President`.
* **Authenticated Member Portal (`MHe`):**
  * Role-based access control:
    * **Student/Member View (`CHe`):** Club curriculum, scheduled speaking sessions, speech recordings, progress tracking.
    * **Trainer View (`OHe`):** Student performance evaluation, attendance, batch feedback (shows "Approval Pending" if unapproved).
    * **President View (`PHe`):** Club leadership, meeting scheduling, session agendas.

---

### Pages 8, 9, 10, 11: Authentication & Administration
* **`/login` (`AAe`):** Email and password authentication with redirect query param support (`/login?redirect=admin`).
* **`/admin` (`q$e`):** Protected dashboard for academy directors; aggregates contact inquiries, career submissions, and test results.
* **`/admin/blogs` (`kDe`):** Protected blog moderation table; allows approving, rejecting, editing, or deleting community submissions.
* **`*` (`SAe`):** 404 page featuring clean message *"Oops! Page not found"* and a return link to `/`.

---
