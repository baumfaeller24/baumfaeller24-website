import React from 'react';
import { TreePine, Scissors, Shield, Zap, Drill, Truck, ArrowRight, Building, Factory, Hammer } from 'lucide-react';

const ImprovedServices = () => {
  const services = [
    {
      id: 1,
      icon: Truck,
      title: "Großflächige Rodungen",
      description: "Professionelle Flächenräumung mit schwerem Gerät für Bauprojekte, Infrastruktur und Gewerbegebiete. Bis zu 5 Hektar täglich.",
      details: ["Schwere Maschinentechnik", "Bis 50t Krankapazität", "Komplette Flächenvorbereitung", "Baureife Übergabe"],
      color: "bg-orange-600 hover:bg-orange-700",
      iconColor: "text-orange-600",
      featured: true,
      stats: "Bis 5 ha/Tag"
    },
    {
      id: 2,
      icon: Building,
      title: "Baufeldräumung",
      description: "Komplette Rodung und Räumung von Bauflächen für Wohn-, Gewerbe- und Infrastrukturprojekte.",
      details: ["Baustellenvorbereitung", "Termingerechte Ausführung", "Entsorgung inklusive", "Vermessungsgerechte Arbeiten"],
      color: "bg-blue-600 hover:bg-blue-700",
      iconColor: "text-blue-600",
      featured: true,
      stats: "Projekte bis 10 ha"
    },
    {
      id: 3,
      icon: TreePine,
      title: "Professionelle Baumfällung",
      description: "Sichere Fällung von Bäumen jeder Größe mit modernster Technik und höchsten Sicherheitsstandards.",
      details: ["Bis 40m Baumhöhe", "Schwierige Standorte", "Vollversichert", "Fachgerechte Entsorgung"],
      color: "bg-green-600 hover:bg-green-700",
      iconColor: "text-green-600",
      stats: "Bis 40m Höhe"
    },
    {
      id: 4,
      icon: Scissors,
      title: "Spezialfällungen", 
      description: "Komplexe Fällarbeiten mit Seilklettertechnik und Kran für schwer zugängliche Bereiche und Problemfällungen.",
      details: ["Seilklettertechnik", "Kranunterstützte Fällung", "Beengte Verhältnisse", "Denkmalschutz-konform"],
      color: "bg-purple-600 hover:bg-purple-700",
      iconColor: "text-purple-600",
      stats: "Auch bei 0,5m Platz"
    },
    {
      id: 5,
      icon: Drill,
      title: "Wurzelstockentfernung",
      description: "Professionelles Stubbenfräsen und komplette Entfernung von Baumstümpfen für baubereite Flächen.",
      details: ["Stubbenfräsung", "Komplette Wurzelentfernung", "Verfüllung mit Mutterboden", "Saatbettbereitung"],
      color: "bg-amber-600 hover:bg-amber-700",
      iconColor: "text-amber-600",
      stats: "Bis 2m Durchmesser"
    },
    {
      id: 6,
      icon: Zap,
      title: "24h Sturmschaden-Notdienst",
      description: "Sofortige Hilfe bei Sturmschäden und Gefahrenbäumen. Rund um die Uhr verfügbar für Notfälle.",
      details: ["24/7 Bereitschaft", "Soforteinsatz", "Gefahrenabwehr", "Versicherungsabwicklung"],
      color: "bg-red-600 hover:bg-red-700",
      iconColor: "text-red-600",
      stats: "24/7 verfügbar"
    }
  ];

  const projectTypes = [
    {
      icon: Building,
      title: "Wohnbauprojekte",
      description: "Flächenvorbereitung für Einfamilienhäuser bis Großwohnanlagen"
    },
    {
      icon: Factory,
      title: "Gewerbeflächen",
      description: "Rodung für Industriegebiete, Logistikzentren und Gewerbeparks"
    },
    {
      icon: Hammer,
      title: "Infrastruktur",
      description: "Straßenbau, Leitungstrassen und öffentliche Bauprojekte"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unsere Leistungen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Von Einzelfällungen bis zu <span className="text-green-600">Großprojekten</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mit über 12 Jahren Erfahrung bieten wir Ihnen professionelle Baumarbeiten mit modernster Technik 
            und höchsten Sicherheitsstandards. Spezialisiert auf großflächige Rodungen und komplexe Projekte.
          </p>
        </div>

        {/* Featured Services - Large Scale Operations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🏗️ Spezialisiert auf Großprojekte
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.filter(service => service.featured).map((service) => (
              <div key={service.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Service Header */}
                <div className={`${service.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <service.icon className="w-12 h-12 text-white" />
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        {service.stats}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.details.map((detail, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${service.color.replace('hover:bg-', 'bg-').replace('bg-', 'bg-')}`}></div>
                        <span className="text-sm text-gray-700 font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full ${service.color} text-white py-3 px-6 rounded-xl font-semibold 
                                    transition-all duration-300 flex items-center justify-center space-x-2
                                    group-hover:shadow-lg transform group-hover:scale-105`}>
                    <span>Mehr erfahren</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Services Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Alle Leistungen im Überblick
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                
                {/* Service Icon & Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {service.stats}
                  </span>
                </div>

                {/* Service Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* CTA */}
                <button className="text-green-600 font-semibold text-sm flex items-center space-x-1 
                                 group-hover:text-green-700 transition-colors">
                  <span>Mehr erfahren</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Unsere Projekttypen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((type, index) => (
              <div key={index} className="text-center group">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
                               group-hover:bg-green-100 transition-colors">
                  <type.icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h4>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Nicht sicher, welche Leistung Sie benötigen?
            </h3>
            <p className="text-green-100 mb-6 text-lg">
              Rufen Sie uns an für eine kostenlose Beratung. Wir finden gemeinsam die beste Lösung für Ihr Projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = 'tel:030659400049'}
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold 
                         hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>📞 Jetzt anrufen: 030 65 94 00 49</span>
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-800 text-white px-8 py-3 rounded-xl font-bold 
                         hover:bg-green-900 transition-colors flex items-center justify-center space-x-2"
              >
                <span>✉️ Kostenloses Angebot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedServices;
