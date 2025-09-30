import React, { useState, useEffect } from 'react';
import { Phone, Mail, CheckCircle, ChevronLeft, ChevronRight, Play, Pause, Truck, TreePine, Zap } from 'lucide-react';

// Import work scene images
import heroBackground from '../assets/hero-background.jpg';
import treeClimber from '../assets/tree-climber.jpg';
import excavatorWork from '../assets/excavator-work.jpg';
import stumpGrinder from '../assets/stump-grinder.jpg';
import treeHandler from '../assets/tree-handler.jpg';

const DynamicHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Professional work scenes with focus on large-scale operations
  const workScenes = [
    {
      image: excavatorWork,
      title: "Großflächige",
      subtitle: "Rodungsarbeiten",
      description: "Professionelle Flächenräumung mit schwerem Gerät für Bauprojekte, Infrastruktur und Landschaftsgestaltung",
      focus: "Baufeldräumung & Großrodungen",
      icon: Truck,
      stats: "Bis zu 5 Hektar täglich"
    },
    {
      image: heroBackground,
      title: "Ihr Spezialist für",
      subtitle: "Komplexe Baumarbeiten",
      description: "Von einzelnen Problemfällungen bis hin zu großangelegten Rodungsprojekten in Berlin & Brandenburg",
      focus: "Professionelle Baumarbeiten",
      icon: TreePine,
      stats: "12 Jahre Erfahrung"
    },
    {
      image: treeClimber,
      title: "Präzise",
      subtitle: "Spezialfällungen",
      description: "Sichere Baumfällung in schwer zugänglichen Bereichen mit modernster Seilklettertechnik",
      focus: "Technische Expertise",
      icon: Zap,
      stats: "Bis 40m Baumhöhe"
    },
    {
      image: stumpGrinder,
      title: "Komplette",
      subtitle: "Flächenbearbeitung",
      description: "Von der Fällung über Stubbenfräsung bis zur baureifen Flächenvorbereitung",
      focus: "Vollservice-Rodung",
      icon: Truck,
      stats: "Alles aus einer Hand"
    },
    {
      image: treeHandler,
      title: "Moderne",
      subtitle: "Maschinentechnik",
      description: "Spezialisierte Forstmaschinen und Kräne für maximale Effizienz bei Großprojekten",
      focus: "Schwere Maschinentechnik",
      icon: Truck,
      stats: "50t Krankapazität"
    }
  ];

  const trustSignals = [
    { icon: CheckCircle, text: "12 Jahre Erfahrung", detail: "Über 1000 Projekte" },
    { icon: CheckCircle, text: "Vollversichert", detail: "Bis 5 Mio. EUR" },
    { icon: CheckCircle, text: "24h Notdienst", detail: "Sturmschäden" },
    { icon: CheckCircle, text: "Schwere Technik", detail: "Bis 50t Kran" }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % workScenes.length);
    }, 6000); // Longer intervals for better reading

    return () => clearInterval(interval);
  }, [isPlaying, workScenes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % workScenes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + workScenes.length) % workScenes.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentScene = workScenes[currentSlide];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Images */}
      <div className="absolute inset-0">
        {workScenes.map((scene, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${scene.image})` }}
          >
            {/* Enhanced overlay for better text readability */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'bg-gradient-to-b from-black/50 via-black/60 to-black/80' 
                : 'bg-black/70'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110 shadow-lg"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        
        {/* Dynamic Headlines with enhanced focus on large operations */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <currentScene.icon className="w-6 h-6 text-green-400" />
            <span className="inline-block bg-green-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-bold border border-green-500/50">
              {currentScene.focus}
            </span>
            <span className="text-green-400 font-semibold text-sm">
              {currentScene.stats}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block text-white mb-2 transition-all duration-500">
              {currentScene.title}
            </span>
            <span className="block text-green-400 text-5xl md:text-7xl lg:text-8xl transition-all duration-500 font-black">
              {currentScene.subtitle}
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-500 font-medium">
            {currentScene.description}
          </p>
        </div>

        {/* Enhanced Trust Signals with more details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {trustSignals.map((signal, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm px-4 py-4 rounded-xl border border-white/20
                         hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <signal.icon className="w-6 h-6 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold">{signal.text}</div>
              <div className="text-xs text-gray-300 mt-1">{signal.detail}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          
          {/* Primary CTA - Phone with enhanced styling */}
          <button 
            onClick={() => window.location.href = 'tel:030659400049'}
            className="group bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl 
                       font-bold text-lg transition-all duration-300 flex items-center
                       hover:shadow-2xl transform hover:scale-105 min-w-[320px] justify-center
                       border-2 border-green-500 hover:border-green-400"
          >
            <Phone className="w-7 h-7 mr-4 group-hover:animate-pulse" />
            <div className="text-left">
              <div className="text-sm opacity-90 font-medium">Sofort erreichbar</div>
              <div className="font-black text-xl">030 65 94 00 49</div>
            </div>
          </button>

          {/* Secondary CTA - Contact Form with enhanced styling */}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-white/15 hover:bg-white/25 text-white px-10 py-5 rounded-xl 
                       font-bold text-lg transition-all duration-300 flex items-center
                       backdrop-blur-sm border-2 border-white/40 hover:border-white/60
                       min-w-[320px] justify-center hover:shadow-xl transform hover:scale-105"
          >
            <Mail className="w-7 h-7 mr-4 group-hover:animate-pulse" />
            <div className="text-left">
              <div className="text-sm opacity-90 font-medium">Kostenlos & unverbindlich</div>
              <div className="font-black text-xl">Angebot anfordern</div>
            </div>
          </button>
        </div>

        {/* Enhanced Emergency Notice */}
        <div className="bg-red-600/95 backdrop-blur-sm text-white px-8 py-5 rounded-xl 
                        border-2 border-red-500/70 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse"></div>
            <span className="font-black text-xl">24h Notdienst verfügbar</span>
            <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse"></div>
          </div>
          <p className="text-base font-medium opacity-95">
            Bei Sturmschäden und Gefahrenbäumen sind wir rund um die Uhr für Sie da
          </p>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          {workScenes.map((scene, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group transition-all duration-300 ${
                index === currentSlide 
                  ? 'scale-110' 
                  : 'hover:scale-105'
              }`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                  : 'bg-white/50 hover:bg-white/70'
              }`} />
              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
                              bg-black/80 text-white text-xs px-2 py-1 rounded 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              whitespace-nowrap">
                {scene.focus}
              </div>
            </button>
          ))}
        </div>
        
        {/* Enhanced Scene Description */}
        <div className="mt-4 text-center">
          <p className="text-white/90 text-base font-medium">
            {currentSlide + 1} / {workScenes.length} - {currentScene.focus}
          </p>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 shadow-lg"
          style={{ 
            width: `${((currentSlide + 1) / workScenes.length) * 100}%` 
          }}
        ></div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 cursor-pointer"
             onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-base mb-3 font-medium">Unsere Leistungen</span>
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center hover:border-white transition-colors">
            <div className="w-2 h-4 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Professional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default DynamicHero;
