import type { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'NEON BUDS Pro',
    tagline: 'Ultra-low latency wireless earbuds with active hybrid noise cancellation',
    category: 'Audio',
    brand: 'CyberAudio',
    price: 149.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 8,
    isFlashDeal: true,
    dealDiscountPercent: 35,
    dealClaimedPercent: 82,
    colors: ['Neon Cyan', 'Matte Obsidian', 'Cyber Green'],
    specs: {
      'Battery Life': '36 Hours with Case',
      'Driver Size': '11mm Bio-Diaphragm',
      'ANC Depth': '-45dB Hybrid Cancellation',
      'Latency': '38ms Gaming Mode',
      'Water Resistance': 'IPX7 Certified'
    },
    description: 'Engineered for competitive gamers and audiophiles alike. Features custom-tuned dual drivers, zero-lag Bluetooth 5.3 LE audio, and an aerospace aluminum charging chassis with frosted cyber-glass lighting indicators.',
    badge: 'Deal of the Day',
    fastDelivery: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        title: 'Insane audio clarity & zero latency in games',
        comment: 'The ANC isolates jet engines and desk chatter completely. Soundstage is punchy without drowning out mids. Best earbuds I have owned.',
        verified: true,
        helpfulCount: 38
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        title: 'The cyber aesthetic is gorgeous in person',
        comment: 'Battery lasts all week with work calls and gym sessions. The case glows softly when opened. Highly recommended!',
        verified: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'AetherWatch Series Ultra',
    tagline: 'Titanium aerospace smartwatch with biometric radar & sapphire glass',
    category: 'Wearables',
    brand: 'AetherTech',
    price: 349.00,
    originalPrice: 429.00,
    rating: 4.8,
    reviewCount: 894,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 14,
    isFlashDeal: false,
    colors: ['Space Gray', 'Starlight Titanium', 'Deep Emerald'],
    specs: {
      'Display': '1.96" LTPO AMOLED 2000 nits',
      'Battery': '72 Hours Endurance',
      'Sensors': 'ECG, SpO2, Skin Temp, GPS L1/L5',
      'Case': 'Grade 5 Aerospace Titanium'
    },
    description: 'Designed for extreme endurance. Dual-frequency GPS tracks your route with meter accuracy while continuous biometric telemetry keeps you at peak performance.',
    badge: 'Amazon Choice Alternative',
    fastDelivery: true
  },
  {
    id: 'prod-3',
    name: 'Volt Strike 75 Gaming Headset',
    tagline: 'Planar magnetic spatial headset with crystal broadcast condenser mic',
    category: 'Gaming',
    brand: 'VoltGear',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 612,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 19,
    isFlashDeal: true,
    dealDiscountPercent: 24,
    dealClaimedPercent: 64,
    specs: {
      'Driver': '50mm Custom Planar Drivers',
      'Frequency': '10Hz - 45,000Hz',
      'Wireless': '2.4GHz Lossless + Bluetooth 5.3',
      'Cushions': 'Cooling Gel Memory Foam'
    },
    description: 'Hear enemy footsteps two rooms away. Ultra-fast planar transducers produce pinpoint accurate 3D spatial staging with zero harmonic distortion.',
    badge: 'Top Rated in Gaming',
    fastDelivery: true
  },
  {
    id: 'prod-4',
    name: 'NovaBook Pro 16 Max',
    tagline: 'Liquid-cooled 16-inch creator laptop with 240Hz OLED HDR display',
    category: 'Laptops',
    brand: 'NovaTech',
    price: 1899.00,
    originalPrice: 2299.00,
    rating: 4.9,
    reviewCount: 341,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 4,
    isFlashDeal: false,
    specs: {
      'Processor': '16-Core 5.4GHz Neural CPU',
      'Graphics': 'RTX 4080 12GB GDDR6',
      'Memory': '64GB LPDDR5X 7500MHz',
      'Storage': '2TB PCIe Gen5 NVMe',
      'Weight': '1.82 kg'
    },
    description: 'The ultimate powerhouse for 3D artists, machine learning researchers, and hardcore gamers. Vapour chamber cooling sustains maximum clocks with whispered fan acoustics.',
    badge: 'Editor Pick',
    fastDelivery: true
  },
  {
    id: 'prod-5',
    name: 'Nexus MagDock 4-in-1',
    tagline: '100W GaN fast charging station with ambient cyber LED status ring',
    category: 'Accessories',
    brand: 'NexusFlow',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 45,
    isFlashDeal: false,
    specs: {
      'Total Output': '100W GaN III Power Delivery',
      'Magnetic Alignment': '15W Fast Qi2 Wireless',
      'Protection': 'Active Thermal Monitoring',
      'Material': 'Frosted Zinc & Tempered Glass'
    },
    description: 'Consolidate your entire desk setup into one sleek glass station. Charges phone, smartwatch, wireless earbuds, and laptop simultaneously without heating.',
    fastDelivery: true
  },
  {
    id: 'prod-6',
    name: 'Ghost Key 75 Mechanical Keyboard',
    tagline: 'Gasket-mounted hot-swap keyboard with CNC aluminum frosted case',
    category: 'Gaming',
    brand: 'VoltGear',
    price: 139.00,
    originalPrice: 179.00,
    rating: 4.8,
    reviewCount: 418,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 12,
    isFlashDeal: true,
    dealDiscountPercent: 22,
    dealClaimedPercent: 71,
    specs: {
      'Switches': 'Custom Factory-Lubed Linear Cyber-Yellow',
      'Mount': 'Poron Gasket with Brass Weight',
      'Polling Rate': '8000Hz Ultra-Low Latency',
      'Battery': '4000mAh up to 200 hours'
    },
    description: 'Thocky sound profile straight out of the box. Multi-layer sound dampening foam, south-facing RGB, and custom programmable OLED status display.',
    badge: 'Best Seller',
    fastDelivery: true
  },
  {
    id: 'prod-7',
    name: 'AetherFlow Noise Cancelling ANC Over-Ear',
    tagline: 'Audiophile studio headphones with high-res LDAC & beryllium drivers',
    category: 'Audio',
    brand: 'CyberAudio',
    price: 299.99,
    originalPrice: 389.99,
    rating: 4.9,
    reviewCount: 789,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 7,
    isFlashDeal: false,
    specs: {
      'Battery': '55 Hours with ANC on',
      'Codecs': 'LDAC, aptX Adaptive, AAC',
      'Drivers': '40mm Custom Beryllium Coated',
      'Weight': '248 grams'
    },
    description: 'Concert hall acoustic accuracy in your room. Ultra-plush lambskin memory foam earcups conform gently for all-day listening marathons.',
    fastDelivery: true
  },
  {
    id: 'prod-8',
    name: 'AeroPulse 4K Cinematic Drone',
    tagline: 'Omnidirectional obstacle sensing folding drone with 4K HDR 60fps gimbal',
    category: 'Accessories',
    brand: 'AetherTech',
    price: 499.00,
    originalPrice: 620.00,
    rating: 4.6,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 9,
    isFlashDeal: false,
    specs: {
      'Video': '4K 60fps HDR 10-bit D-Log',
      'Flight Time': '38 Minutes per Battery',
      'Range': '15 km OcuSync 4.0 Transmission',
      'Sensors': '360-Degree Infrared Radar'
    },
    description: 'Capture Hollywood-grade aerial footage effortlessly. AI Subject Tracking locks on cars, athletes, and wildlife even at 60 km/h speeds.',
    fastDelivery: false
  },
  {
    id: 'prod-9',
    name: 'CyberBlade Pro Ergo Wireless Mouse',
    tagline: '54-gram magnesium skeleton mouse with 42K DPI optical sensor',
    category: 'Gaming',
    brand: 'VoltGear',
    price: 99.00,
    originalPrice: 129.00,
    rating: 4.8,
    reviewCount: 462,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 30,
    isFlashDeal: true,
    dealDiscountPercent: 23,
    dealClaimedPercent: 58,
    specs: {
      'Weight': '54 grams (Magnesium Alloy)',
      'Sensor': 'PAW3950 42,000 DPI',
      'Switches': 'Optical 100M Click Lifespan',
      'Battery': '80 Hours @ 4K Polling'
    },
    description: 'Featherlight precision engineered for aim gods. Zero-smoothing optical tracking keeps your crosshair pixel-perfect in clutch moments.',
    fastDelivery: true
  },
  {
    id: 'prod-10',
    name: 'Pulse Ring Smart Health Tracker',
    tagline: 'Medical-grade titanium biometric ring with sleep & recovery analytics',
    category: 'Wearables',
    brand: 'AetherTech',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 15,
    isFlashDeal: false,
    specs: {
      'Material': 'Hypoallergenic Brushed Titanium',
      'Waterproof': '100m (10 ATM)',
      'Battery': '7 Days Continuous',
      'Weight': '4 to 6 grams'
    },
    description: 'Forget bulky smartwatches while sleeping. Tracks HRV, readiness scores, deep sleep architecture, and core temperature trends silently.',
    fastDelivery: true
  },
  {
    id: 'prod-11',
    name: 'Spectra Studio 34" Curved OLED Monitor',
    tagline: 'Ultrawide 175Hz 0.03ms true black gaming display with USB-C 90W PD',
    category: 'Accessories',
    brand: 'NovaTech',
    price: 799.00,
    originalPrice: 999.00,
    rating: 4.9,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 5,
    isFlashDeal: false,
    specs: {
      'Resolution': '3440 x 1440 WQHD 21:9',
      'Refresh Rate': '175Hz 0.03ms G-Sync Ultimate',
      'Color Gamut': '99.3% DCI-P3 Factory Calibrated',
      'Curvature': '1800R Immersive Arc'
    },
    description: 'Infinite contrast ratio and mesmerizing ink-like black levels. Elevates both coding productivity and cinematic gameplay into a visual spectacle.',
    badge: 'Staff Choice',
    fastDelivery: true
  },
  {
    id: 'prod-12',
    name: 'OmniStream 4K Webcam Pro',
    tagline: 'Dual Sony STARVIS 2 sensors with auto-tracking pan-tilt gimbal and AI ring light',
    category: 'Accessories',
    brand: 'CyberAudio',
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 22,
    isFlashDeal: false,
    specs: {
      'Sensor': '1/1.8" Sony STARVIS 2 Dual Array',
      'Resolution': '4K 60fps HDR / 1080p 120fps',
      'Field of View': 'Adjustable 65° / 78° / 90°',
      'Microphone': 'Quad Stereo Beamforming Mics'
    },
    description: 'Look razor-sharp in job interviews and streaming sessions even in pitch-black rooms with intelligent edge-lit lighting.',
    fastDelivery: true
  }
];
