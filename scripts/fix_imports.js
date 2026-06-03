const fs = require('fs');
const path = require('path');

const mapping = {
  "Navbar": "@/components/shared/Navbar",
  "Footer": "@/components/shared/Footer",
  "AppLayout": "@/components/shared/AppLayout",
  "MobileOptimizedNavbar": "@/components/shared/MobileOptimizedNavbar",
  "ThemeToggle": "@/components/shared/ThemeToggle",
  "PageHeader": "@/components/shared/PageHeader",
  "Preloader": "@/components/shared/Preloader",
  "CustomCursor": "@/components/shared/CustomCursor",
  "SmoothScroll": "@/components/shared/SmoothScroll",
  "GlobalWidgets": "@/components/shared/GlobalWidgets",
  "AnimatedLiquidBackground": "@/components/animations/AnimatedLiquidBackground",
  "ParticleField": "@/components/animations/ParticleField",
  "AnimatedRingProgress": "@/components/animations/AnimatedRingProgress",
  "StravedaHeroBackground": "@/components/animations/StravedaHeroBackground",
  "StravedaWebGLHero": "@/components/animations/StravedaWebGLHero",
  "StravedaAurora": "@/components/animations/StravedaAurora",
  "WaveDivider": "@/components/animations/WaveDivider",
  "TiltCard": "@/components/animations/TiltCard",
  "TextReveal": "@/components/animations/TextReveal",
  "HomePage": "@/components/features/home/HomePage",
  "AnimatedHero": "@/components/features/home/AnimatedHero",
  "AboutPage": "@/components/features/about/AboutPage",
  "CareersPage": "@/components/features/careers/CareersPage",
  "ContactPage": "@/components/features/contact/ContactPage",
  "BlogPage": "@/components/features/blog/BlogPage",
  "InsightsPage": "@/components/features/insights/InsightsPage",
  "ServicesPage": "@/components/features/services/ServicesPage",
  "ServicesSection": "@/components/features/services/ServicesSection",
  "ServiceComparison": "@/components/features/services/ServiceComparison",
  "ServicesHoverModal": "@/components/features/services/ServicesHoverModal",
  "ServiceCard": "@/components/features/services/ServiceCard",
  "TestimonialsPage": "@/components/features/common/TestimonialsPage"
};

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const srcDir = path.join(__dirname, '../src');
const allFiles = getAllFiles(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Replace specific mappings
  for (const [name, newPath] of Object.entries(mapping)) {
    const oldPathRegex = new RegExp(`@/components/straveda/${name}`, 'g');
    const oldPathPagesRegex = new RegExp(`@/components/straveda/pages/${name}`, 'g');
    
    if (content.match(oldPathRegex)) {
      content = content.replace(oldPathRegex, newPath);
      changed = true;
    }
    if (content.match(oldPathPagesRegex)) {
      content = content.replace(oldPathPagesRegex, newPath);
      changed = true;
    }
  }

  // 2. Replace the rest of @/components/straveda/ with @/components/features/common/
  if (content.includes('@/components/straveda/')) {
    content = content.replace(/@\/components\/straveda\//g, '@/components/features/common/');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in: ${file}`);
  }
});
