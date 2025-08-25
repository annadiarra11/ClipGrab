export interface Translation {
  // Header
  home: string;
  faq: string;
  terms: string;
  privacy: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  urlPlaceholder: string;
  download: string;
  noWatermark: string;
  hdQuality: string;
  free: string;

  // Video Preview
  hdVideo: string;
  standardVideo: string;
  audioOnly: string;
  views: string;

  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  featureNoWatermark: string;
  featureNoWatermarkDesc: string;
  featureHdQuality: string;
  featureHdQualityDesc: string;
  featureFast: string;
  featureFastDesc: string;

  // How It Works
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
  faq4Question: string;
  faq4Answer: string;

  // Footer
  footerDesc: string;
  product: string;
  support: string;
  legal: string;
  copyright: string;
}

export const translations: Record<string, Translation> = {
  en: {
    home: "Home",
    faq: "FAQ",
    terms: "Terms",
    privacy: "Privacy",
    
    heroTitle: "Download TikTok Videos",
    heroSubtitle: "Fast, free, and secure TikTok video downloader. Get your favorite TikTok videos in HD quality with just one click.",
    urlPlaceholder: "Paste TikTok video URL here...",
    download: "Download",
    noWatermark: "No Watermark",
    hdQuality: "HD Quality",
    free: "100% Free",

    hdVideo: "HD Quality",
    standardVideo: "Standard Quality",
    audioOnly: "Audio Only",
    views: "views",

    featuresTitle: "Why Choose Our TikTok Downloader?",
    featuresSubtitle: "Fast, reliable, and completely free video downloading",
    featureNoWatermark: "No Watermark",
    featureNoWatermarkDesc: "Download TikTok videos without the TikTok watermark. Get clean videos for your content.",
    featureHdQuality: "HD Quality",
    featureHdQualityDesc: "Download videos in the highest quality available, including HD and 4K resolution options.",
    featureFast: "Lightning Fast",
    featureFastDesc: "Quick processing and instant downloads. No waiting, no ads, just fast video downloads.",

    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Download any TikTok video in just 3 simple steps",
    step1: "Copy TikTok URL",
    step1Desc: "Find the TikTok video you want to download and copy its URL from the share button.",
    step2: "Paste & Process",
    step2Desc: "Paste the URL in our downloader and click the download button to process the video.",
    step3: "Download Video",
    step3Desc: "Choose your preferred quality and download the video directly to your device.",

    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about our TikTok downloader",
    faq1Question: "Is it legal to download TikTok videos?",
    faq1Answer: "Yes, downloading TikTok videos for personal use is generally legal. However, please respect copyright laws and the original creator's rights when using downloaded content.",
    faq2Question: "Do I need to create an account?",
    faq2Answer: "No account required! Our TikTok downloader is completely free and doesn't require any registration or sign-up.",
    faq3Question: "What video quality options are available?",
    faq3Answer: "We support multiple quality options including HD (720p), Standard (480p), and audio-only (MP3) downloads, depending on the original video quality.",
    faq4Question: "Is there a download limit?",
    faq4Answer: "No download limits! You can download as many TikTok videos as you want, completely free of charge.",

    footerDesc: "The fastest and most reliable TikTok video downloader. Download your favorite TikTok videos without watermark.",
    product: "Product",
    support: "Support",
    legal: "Legal",
    copyright: "© 2024 TikDownloader. All rights reserved. This service is not affiliated with TikTok Inc.",
  },

  es: {
    home: "Inicio",
    faq: "Preguntas",
    terms: "Términos",
    privacy: "Privacidad",
    
    heroTitle: "Descargar Videos de TikTok",
    heroSubtitle: "Descargador de videos de TikTok rápido, gratuito y seguro. Obtén tus videos favoritos de TikTok en calidad HD con solo un clic.",
    urlPlaceholder: "Pega la URL del video de TikTok aquí...",
    download: "Descargar",
    noWatermark: "Sin Marca de Agua",
    hdQuality: "Calidad HD",
    free: "100% Gratis",

    hdVideo: "Calidad HD",
    standardVideo: "Calidad Estándar",
    audioOnly: "Solo Audio",
    views: "vistas",

    featuresTitle: "¿Por qué elegir nuestro descargador de TikTok?",
    featuresSubtitle: "Descarga de videos rápida, confiable y completamente gratuita",
    featureNoWatermark: "Sin Marca de Agua",
    featureNoWatermarkDesc: "Descarga videos de TikTok sin la marca de agua de TikTok. Obtén videos limpios para tu contenido.",
    featureHdQuality: "Calidad HD",
    featureHdQualityDesc: "Descarga videos en la más alta calidad disponible, incluyendo opciones de resolución HD y 4K.",
    featureFast: "Súper Rápido",
    featureFastDesc: "Procesamiento rápido y descargas instantáneas. Sin esperas, sin anuncios, solo descargas rápidas.",

    howItWorksTitle: "Cómo Funciona",
    howItWorksSubtitle: "Descarga cualquier video de TikTok en solo 3 pasos simples",
    step1: "Copia la URL de TikTok",
    step1Desc: "Encuentra el video de TikTok que quieres descargar y copia su URL desde el botón compartir.",
    step2: "Pega y Procesa",
    step2Desc: "Pega la URL en nuestro descargador y haz clic en el botón de descarga para procesar el video.",
    step3: "Descarga el Video",
    step3Desc: "Elige tu calidad preferida y descarga el video directamente a tu dispositivo.",

    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesitas saber sobre nuestro descargador de TikTok",
    faq1Question: "¿Es legal descargar videos de TikTok?",
    faq1Answer: "Sí, descargar videos de TikTok para uso personal es generalmente legal. Sin embargo, respeta las leyes de derechos de autor y los derechos del creador original.",
    faq2Question: "¿Necesito crear una cuenta?",
    faq2Answer: "¡No se requiere cuenta! Nuestro descargador de TikTok es completamente gratuito y no requiere registro o inscripción.",
    faq3Question: "¿Qué opciones de calidad de video están disponibles?",
    faq3Answer: "Admitimos múltiples opciones de calidad incluyendo HD (720p), Estándar (480p) y descargas solo de audio (MP3).",
    faq4Question: "¿Hay un límite de descarga?",
    faq4Answer: "¡Sin límites de descarga! Puedes descargar tantos videos de TikTok como quieras, completamente gratis.",

    footerDesc: "El descargador de videos de TikTok más rápido y confiable. Descarga tus videos favoritos de TikTok sin marca de agua.",
    product: "Producto",
    support: "Soporte",
    legal: "Legal",
    copyright: "© 2024 TikDownloader. Todos los derechos reservados. Este servicio no está afiliado con TikTok Inc.",
  },

  fr: {
    home: "Accueil",
    faq: "FAQ",
    terms: "Conditions",
    privacy: "Confidentialité",
    
    heroTitle: "Télécharger des Vidéos TikTok",
    heroSubtitle: "Téléchargeur de vidéos TikTok rapide, gratuit et sécurisé. Obtenez vos vidéos TikTok préférées en qualité HD en un seul clic.",
    urlPlaceholder: "Collez l'URL de la vidéo TikTok ici...",
    download: "Télécharger",
    noWatermark: "Sans Filigrane",
    hdQuality: "Qualité HD",
    free: "100% Gratuit",

    hdVideo: "Qualité HD",
    standardVideo: "Qualité Standard",
    audioOnly: "Audio Seulement",
    views: "vues",

    featuresTitle: "Pourquoi choisir notre téléchargeur TikTok?",
    featuresSubtitle: "Téléchargement de vidéos rapide, fiable et entièrement gratuit",
    featureNoWatermark: "Sans Filigrane",
    featureNoWatermarkDesc: "Téléchargez des vidéos TikTok sans le filigrane TikTok. Obtenez des vidéos propres pour votre contenu.",
    featureHdQuality: "Qualité HD",
    featureHdQualityDesc: "Téléchargez des vidéos dans la plus haute qualité disponible, y compris les options de résolution HD et 4K.",
    featureFast: "Ultra Rapide",
    featureFastDesc: "Traitement rapide et téléchargements instantanés. Pas d'attente, pas de publicités, juste des téléchargements rapides.",

    howItWorksTitle: "Comment ça marche",
    howItWorksSubtitle: "Téléchargez n'importe quelle vidéo TikTok en seulement 3 étapes simples",
    step1: "Copiez l'URL TikTok",
    step1Desc: "Trouvez la vidéo TikTok que vous voulez télécharger et copiez son URL depuis le bouton partager.",
    step2: "Collez et Traitez",
    step2Desc: "Collez l'URL dans notre téléchargeur et cliquez sur le bouton télécharger pour traiter la vidéo.",
    step3: "Téléchargez la Vidéo",
    step3Desc: "Choisissez votre qualité préférée et téléchargez la vidéo directement sur votre appareil.",

    faqTitle: "Questions Fréquemment Posées",
    faqSubtitle: "Tout ce que vous devez savoir sur notre téléchargeur TikTok",
    faq1Question: "Est-il légal de télécharger des vidéos TikTok?",
    faq1Answer: "Oui, télécharger des vidéos TikTok pour un usage personnel est généralement légal. Cependant, respectez les lois sur le droit d'auteur et les droits du créateur original.",
    faq2Question: "Dois-je créer un compte?",
    faq2Answer: "Aucun compte requis! Notre téléchargeur TikTok est entièrement gratuit et ne nécessite aucune inscription.",
    faq3Question: "Quelles options de qualité vidéo sont disponibles?",
    faq3Answer: "Nous supportons plusieurs options de qualité incluant HD (720p), Standard (480p) et téléchargements audio uniquement (MP3).",
    faq4Question: "Y a-t-il une limite de téléchargement?",
    faq4Answer: "Aucune limite de téléchargement! Vous pouvez télécharger autant de vidéos TikTok que vous voulez, entièrement gratuitement.",

    footerDesc: "Le téléchargeur de vidéos TikTok le plus rapide et le plus fiable. Téléchargez vos vidéos TikTok préférées sans filigrane.",
    product: "Produit",
    support: "Support",
    legal: "Légal",
    copyright: "© 2024 TikDownloader. Tous droits réservés. Ce service n'est pas affilié à TikTok Inc.",
  }
};

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];
