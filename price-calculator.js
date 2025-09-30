// ===== PRICE CALCULATOR FOR BAUMFÄLLER24 =====

class PriceCalculator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.priceRange = { min: 0, max: 0 };
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Price calculator container not found');
            return;
        }
        
        this.render();
        this.bindEvents();
        this.loadPricingData();
    }
    
    loadPricingData() {
        // Pricing matrix based on tree characteristics
        this.pricingMatrix = {
            baumfaellung: {
                base_price: 200,
                height_multiplier: {
                    '5-8': 1.0,
                    '8-12': 1.3,
                    '12-18': 1.8,
                    '18-25': 2.5,
                    '25+': 3.5
                },
                diameter_multiplier: {
                    '20-40': 1.0,
                    '40-60': 1.2,
                    '60-80': 1.5,
                    '80-100': 1.8,
                    '100+': 2.2
                },
                tree_type_multiplier: {
                    'laubbaum': 1.0,
                    'nadelbaum': 0.9,
                    'obstbaum': 0.8,
                    'exotisch': 1.3
                },
                accessibility_multiplier: {
                    'gut': 1.0,
                    'mittel': 1.3,
                    'schwierig': 1.8,
                    'sehr_schwierig': 2.5
                },
                disposal_cost: 150,
                emergency_surcharge: 200
            },
            baumpflege: {
                base_price: 120,
                height_multiplier: {
                    '5-8': 1.0,
                    '8-12': 1.2,
                    '12-18': 1.5,
                    '18-25': 2.0,
                    '25+': 2.8
                },
                diameter_multiplier: {
                    '20-40': 1.0,
                    '40-60': 1.1,
                    '60-80': 1.3,
                    '80-100': 1.5,
                    '100+': 1.8
                },
                tree_type_multiplier: {
                    'laubbaum': 1.0,
                    'nadelbaum': 0.9,
                    'obstbaum': 1.1,
                    'exotisch': 1.2
                },
                accessibility_multiplier: {
                    'gut': 1.0,
                    'mittel': 1.2,
                    'schwierig': 1.5,
                    'sehr_schwierig': 2.0
                },
                disposal_cost: 80
            }
        };
    }
    
    render() {
        this.container.innerHTML = `
            <div class="price-calculator-wrapper">
                <div class="calculator-header">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.currentStep / this.totalSteps) * 100}%"></div>
                    </div>
                    <div class="step-indicator">
                        Schritt ${this.currentStep} von ${this.totalSteps}
                    </div>
                </div>
                
                <div class="calculator-content">
                    ${this.renderCurrentStep()}
                </div>
                
                <div class="calculator-navigation">
                    ${this.currentStep > 1 ? '<button type="button" class="btn-secondary" id="prev-step">Zurück</button>' : ''}
                    ${this.currentStep < this.totalSteps ? '<button type="button" class="btn-primary" id="next-step">Weiter</button>' : ''}
                    ${this.currentStep === this.totalSteps ? '<button type="button" class="btn-primary" id="get-quote">Angebot anfordern</button>' : ''}
                </div>
            </div>
        `;
    }
    
    renderCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.renderServiceSelection();
            case 2:
                return this.renderTreeDetails();
            case 3:
                return this.renderLocationDetails();
            case 4:
                return this.renderPriceResult();
            default:
                return '';
        }
    }
    
    renderServiceSelection() {
        return `
            <div class="calculator-step" id="step-1">
                <h3 class="step-title">Welche Leistung benötigen Sie?</h3>
                <div class="service-options">
                    <div class="service-option ${this.formData.service === 'baumfaellung' ? 'selected' : ''}" data-service="baumfaellung">
                        <div class="service-icon">
                            <svg class="icon icon-tree-cut">
                                <path d="M12 2L8 8h8l-4-6z"/>
                                <path d="M12 8v12"/>
                                <path d="M8 20h8"/>
                            </svg>
                        </div>
                        <h4>Baumfällung</h4>
                        <p>Komplette Entfernung des Baumes</p>
                        <div class="price-hint">ab 350 EUR</div>
                    </div>
                    
                    <div class="service-option ${this.formData.service === 'baumpflege' ? 'selected' : ''}" data-service="baumpflege">
                        <div class="service-icon">
                            <svg class="icon icon-tree-care">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6"/>
                                <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"/>
                            </svg>
                        </div>
                        <h4>Baumpflege</h4>
                        <p>Kronenschnitt und Pflege</p>
                        <div class="price-hint">ab 180 EUR</div>
                    </div>
                    
                    <div class="service-option ${this.formData.service === 'baumkontrolle' ? 'selected' : ''}" data-service="baumkontrolle">
                        <div class="service-icon">
                            <svg class="icon icon-search">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                        </div>
                        <h4>Baumkontrolle</h4>
                        <p>Sicherheitsprüfung und Gutachten</p>
                        <div class="price-hint">ab 120 EUR</div>
                    </div>
                    
                    <div class="service-option ${this.formData.service === 'notfall' ? 'selected' : ''}" data-service="notfall">
                        <div class="service-icon">
                            <svg class="icon icon-alert-triangle">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <line x1="12" y1="9" x2="12" y2="13"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                        </div>
                        <h4>Notfall-Service</h4>
                        <p>Sofortige Hilfe bei Sturmschäden</p>
                        <div class="price-hint">Aufpreis +200 EUR</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderTreeDetails() {
        return `
            <div class="calculator-step" id="step-2">
                <h3 class="step-title">Details zu Ihrem Baum</h3>
                
                <div class="form-group">
                    <label for="tree-type">Baumart</label>
                    <select id="tree-type" class="form-select" required>
                        <option value="">Bitte wählen...</option>
                        <option value="laubbaum" ${this.formData.tree_type === 'laubbaum' ? 'selected' : ''}>Laubbaum (Eiche, Buche, Ahorn, etc.)</option>
                        <option value="nadelbaum" ${this.formData.tree_type === 'nadelbaum' ? 'selected' : ''}>Nadelbaum (Fichte, Tanne, Kiefer, etc.)</option>
                        <option value="obstbaum" ${this.formData.tree_type === 'obstbaum' ? 'selected' : ''}>Obstbaum (Apfel, Birne, Kirsche, etc.)</option>
                        <option value="exotisch" ${this.formData.tree_type === 'exotisch' ? 'selected' : ''}>Exotischer Baum (Mammutbaum, Ginkgo, etc.)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="tree-height">Baumhöhe (geschätzt)</label>
                    <div class="slider-container">
                        <input type="range" id="tree-height" class="form-slider" min="5" max="30" value="${this.formData.height || 15}" step="1">
                        <div class="slider-labels">
                            <span>5m</span>
                            <span id="height-value">${this.formData.height || 15}m</span>
                            <span>30m</span>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="tree-diameter">Stammdurchmesser (geschätzt)</label>
                    <div class="slider-container">
                        <input type="range" id="tree-diameter" class="form-slider" min="20" max="120" value="${this.formData.diameter || 50}" step="5">
                        <div class="slider-labels">
                            <span>20cm</span>
                            <span id="diameter-value">${this.formData.diameter || 50}cm</span>
                            <span>120cm</span>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Zustand des Baumes</label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="tree-condition" value="gesund" ${this.formData.condition === 'gesund' ? 'checked' : ''}>
                            <span class="radio-label">Gesund</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="tree-condition" value="krank" ${this.formData.condition === 'krank' ? 'checked' : ''}>
                            <span class="radio-label">Krank/Beschädigt</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="tree-condition" value="tot" ${this.formData.condition === 'tot' ? 'checked' : ''}>
                            <span class="radio-label">Abgestorben</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderLocationDetails() {
        return `
            <div class="calculator-step" id="step-3">
                <h3 class="step-title">Standort und Zugänglichkeit</h3>
                
                <div class="form-group">
                    <label for="plz">Postleitzahl</label>
                    <input type="text" id="plz" class="form-input" placeholder="12345" value="${this.formData.plz || ''}" maxlength="5" pattern="[0-9]{5}" required>
                    <small class="form-hint">Für regionale Preisanpassung</small>
                </div>
                
                <div class="form-group">
                    <label>Zugänglichkeit für Fahrzeuge</label>
                    <div class="accessibility-options">
                        <div class="accessibility-option ${this.formData.accessibility === 'gut' ? 'selected' : ''}" data-accessibility="gut">
                            <div class="accessibility-icon">🚛</div>
                            <h4>Gut zugänglich</h4>
                            <p>Fahrzeug kann direkt zum Baum fahren</p>
                            <div class="price-impact">Kein Aufpreis</div>
                        </div>
                        
                        <div class="accessibility-option ${this.formData.accessibility === 'mittel' ? 'selected' : ''}" data-accessibility="mittel">
                            <div class="accessibility-icon">🚶‍♂️</div>
                            <h4>Eingeschränkt</h4>
                            <p>Kurzer Fußweg erforderlich (bis 50m)</p>
                            <div class="price-impact">+30% Aufpreis</div>
                        </div>
                        
                        <div class="accessibility-option ${this.formData.accessibility === 'schwierig' ? 'selected' : ''}" data-accessibility="schwierig">
                            <div class="accessibility-icon">🏠</div>
                            <h4>Schwierig</h4>
                            <p>Hinterhof, enge Durchgänge</p>
                            <div class="price-impact">+80% Aufpreis</div>
                        </div>
                        
                        <div class="accessibility-option ${this.formData.accessibility === 'sehr_schwierig' ? 'selected' : ''}" data-accessibility="sehr_schwierig">
                            <div class="accessibility-icon">🧗‍♂️</div>
                            <h4>Sehr schwierig</h4>
                            <p>Nur mit Spezialausrüstung erreichbar</p>
                            <div class="price-impact">+150% Aufpreis</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Besondere Umstände</label>
                    <div class="checkbox-group">
                        <label class="checkbox-option">
                            <input type="checkbox" name="circumstances" value="stromleitungen" ${this.formData.circumstances?.includes('stromleitungen') ? 'checked' : ''}>
                            <span class="checkbox-label">Stromleitungen in der Nähe</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="circumstances" value="gebaeude" ${this.formData.circumstances?.includes('gebaeude') ? 'checked' : ''}>
                            <span class="checkbox-label">Gebäude/Strukturen gefährdet</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="circumstances" value="nachbarn" ${this.formData.circumstances?.includes('nachbarn') ? 'checked' : ''}>
                            <span class="checkbox-label">Nachbargrundstück betroffen</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="circumstances" value="naturschutz" ${this.formData.circumstances?.includes('naturschutz') ? 'checked' : ''}>
                            <span class="checkbox-label">Naturschutzgebiet</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderPriceResult() {
        const price = this.calculatePrice();
        
        return `
            <div class="calculator-step" id="step-4">
                <div class="price-result">
                    <div class="price-display">
                        <div class="price-label">Geschätzter Preis</div>
                        <div class="price-amount">${this.formatCurrency(price.min)} - ${this.formatCurrency(price.max)}</div>
                        <div class="price-note">Inkl. Entsorgung, exkl. MwSt.</div>
                    </div>
                    
                    <div class="price-breakdown">
                        <h4>Preiszusammensetzung:</h4>
                        <div class="breakdown-item">
                            <span>Grundpreis (${this.getServiceName()})</span>
                            <span>${this.formatCurrency(price.basePrice)}</span>
                        </div>
                        ${price.heightSurcharge > 0 ? `
                        <div class="breakdown-item">
                            <span>Höhenzuschlag (${this.formData.height}m)</span>
                            <span>+${this.formatCurrency(price.heightSurcharge)}</span>
                        </div>
                        ` : ''}
                        ${price.accessibilitySurcharge > 0 ? `
                        <div class="breakdown-item">
                            <span>Zugänglichkeitszuschlag</span>
                            <span>+${this.formatCurrency(price.accessibilitySurcharge)}</span>
                        </div>
                        ` : ''}
                        ${price.disposalCost > 0 ? `
                        <div class="breakdown-item">
                            <span>Entsorgung</span>
                            <span>+${this.formatCurrency(price.disposalCost)}</span>
                        </div>
                        ` : ''}
                        ${price.emergencySurcharge > 0 ? `
                        <div class="breakdown-item emergency">
                            <span>Notfall-Zuschlag</span>
                            <span>+${this.formatCurrency(price.emergencySurcharge)}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="price-guarantees">
                        <div class="guarantee-item">
                            <svg class="icon icon-shield text-primary">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>Festpreisgarantie</span>
                        </div>
                        <div class="guarantee-item">
                            <svg class="icon icon-check text-primary">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                            <span>Keine versteckten Kosten</span>
                        </div>
                        <div class="guarantee-item">
                            <svg class="icon icon-shield text-primary">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>100% Versicherungsschutz</span>
                        </div>
                    </div>
                    
                    <div class="contact-form">
                        <h4>Kostenloses Angebot anfordern</h4>
                        <form id="quote-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" name="name" placeholder="Ihr Name" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" name="email" placeholder="E-Mail-Adresse" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="tel" name="phone" placeholder="Telefonnummer" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="address" placeholder="Adresse" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea name="message" placeholder="Zusätzliche Informationen (optional)" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-option">
                                    <input type="checkbox" name="privacy" required>
                                    <span class="checkbox-label">Ich stimme der <a href="/datenschutz/" target="_blank">Datenschutzerklärung</a> zu</span>
                                </label>
                            </div>
                            <button type="submit" class="btn-primary btn-lg">Kostenloses Angebot anfordern</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            // Service selection
            if (e.target.closest('.service-option')) {
                const option = e.target.closest('.service-option');
                const service = option.dataset.service;
                
                // Remove previous selection
                this.container.querySelectorAll('.service-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add new selection
                option.classList.add('selected');
                this.formData.service = service;
                
                // Enable next button
                const nextBtn = document.getElementById('next-step');
                if (nextBtn) nextBtn.disabled = false;
            }
            
            // Accessibility selection
            if (e.target.closest('.accessibility-option')) {
                const option = e.target.closest('.accessibility-option');
                const accessibility = option.dataset.accessibility;
                
                // Remove previous selection
                this.container.querySelectorAll('.accessibility-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add new selection
                option.classList.add('selected');
                this.formData.accessibility = accessibility;
            }
            
            // Navigation buttons
            if (e.target.id === 'next-step') {
                this.nextStep();
            } else if (e.target.id === 'prev-step') {
                this.prevStep();
            } else if (e.target.id === 'get-quote') {
                this.showQuoteForm();
            }
        });
        
        this.container.addEventListener('input', (e) => {
            // Slider updates
            if (e.target.id === 'tree-height') {
                const value = e.target.value;
                document.getElementById('height-value').textContent = value + 'm';
                this.formData.height = parseInt(value);
            } else if (e.target.id === 'tree-diameter') {
                const value = e.target.value;
                document.getElementById('diameter-value').textContent = value + 'cm';
                this.formData.diameter = parseInt(value);
            }
            
            // Form inputs
            if (e.target.id === 'tree-type') {
                this.formData.tree_type = e.target.value;
            } else if (e.target.id === 'plz') {
                this.formData.plz = e.target.value;
            }
            
            // Radio buttons
            if (e.target.name === 'tree-condition') {
                this.formData.condition = e.target.value;
            }
            
            // Checkboxes
            if (e.target.name === 'circumstances') {
                if (!this.formData.circumstances) {
                    this.formData.circumstances = [];
                }
                
                if (e.target.checked) {
                    this.formData.circumstances.push(e.target.value);
                } else {
                    const index = this.formData.circumstances.indexOf(e.target.value);
                    if (index > -1) {
                        this.formData.circumstances.splice(index, 1);
                    }
                }
            }
        });
        
        // Form submission
        this.container.addEventListener('submit', (e) => {
            if (e.target.id === 'quote-form') {
                e.preventDefault();
                this.submitQuoteRequest(e.target);
            }
        });
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.render();
            this.bindEvents();
            
            // Track step completion
            window.BaumfaellerApp?.trackEvent('calculator_step_completed', {
                step: this.currentStep - 1,
                service: this.formData.service
            });
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.render();
            this.bindEvents();
        }
    }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                if (!this.formData.service) {
                    this.showError('Bitte wählen Sie eine Leistung aus.');
                    return false;
                }
                break;
            case 2:
                if (!this.formData.tree_type) {
                    this.showError('Bitte wählen Sie eine Baumart aus.');
                    return false;
                }
                break;
            case 3:
                if (!this.formData.plz || !/^\d{5}$/.test(this.formData.plz)) {
                    this.showError('Bitte geben Sie eine gültige PLZ ein.');
                    return false;
                }
                if (!this.formData.accessibility) {
                    this.showError('Bitte wählen Sie die Zugänglichkeit aus.');
                    return false;
                }
                break;
        }
        return true;
    }
    
    calculatePrice() {
        const service = this.formData.service === 'notfall' ? 'baumfaellung' : this.formData.service;
        const pricing = this.pricingMatrix[service];
        
        if (!pricing) {
            return { min: 0, max: 0 };
        }
        
        let basePrice = pricing.base_price;
        
        // Height multiplier
        const height = this.formData.height || 15;
        let heightMultiplier = 1.0;
        if (height <= 8) heightMultiplier = pricing.height_multiplier['5-8'];
        else if (height <= 12) heightMultiplier = pricing.height_multiplier['8-12'];
        else if (height <= 18) heightMultiplier = pricing.height_multiplier['12-18'];
        else if (height <= 25) heightMultiplier = pricing.height_multiplier['18-25'];
        else heightMultiplier = pricing.height_multiplier['25+'];
        
        // Diameter multiplier
        const diameter = this.formData.diameter || 50;
        let diameterMultiplier = 1.0;
        if (diameter <= 40) diameterMultiplier = pricing.diameter_multiplier['20-40'];
        else if (diameter <= 60) diameterMultiplier = pricing.diameter_multiplier['40-60'];
        else if (diameter <= 80) diameterMultiplier = pricing.diameter_multiplier['60-80'];
        else if (diameter <= 100) diameterMultiplier = pricing.diameter_multiplier['80-100'];
        else diameterMultiplier = pricing.diameter_multiplier['100+'];
        
        // Tree type multiplier
        const treeTypeMultiplier = pricing.tree_type_multiplier[this.formData.tree_type] || 1.0;
        
        // Accessibility multiplier
        const accessibilityMultiplier = pricing.accessibility_multiplier[this.formData.accessibility] || 1.0;
        
        // Calculate base cost
        const calculatedPrice = basePrice * heightMultiplier * diameterMultiplier * treeTypeMultiplier * accessibilityMultiplier;
        
        // Add disposal cost
        const disposalCost = pricing.disposal_cost || 0;
        
        // Emergency surcharge
        const emergencySurcharge = this.formData.service === 'notfall' ? pricing.emergency_surcharge : 0;
        
        // Regional adjustment (simplified)
        const plz = this.formData.plz || '00000';
        const firstDigit = parseInt(plz.charAt(0));
        let regionalMultiplier = 1.0;
        if ([1, 2, 8, 9].includes(firstDigit)) { // Expensive regions
            regionalMultiplier = 1.15;
        } else if ([0, 3, 4].includes(firstDigit)) { // Cheaper regions
            regionalMultiplier = 0.9;
        }
        
        const totalPrice = (calculatedPrice + disposalCost + emergencySurcharge) * regionalMultiplier;
        
        // Return range (±15%)
        return {
            min: Math.round(totalPrice * 0.85),
            max: Math.round(totalPrice * 1.15),
            basePrice: Math.round(basePrice * heightMultiplier * diameterMultiplier * treeTypeMultiplier),
            heightSurcharge: Math.round(basePrice * (heightMultiplier - 1)),
            accessibilitySurcharge: Math.round(calculatedPrice * (accessibilityMultiplier - 1)),
            disposalCost: disposalCost,
            emergencySurcharge: emergencySurcharge
        };
    }
    
    getServiceName() {
        const serviceNames = {
            'baumfaellung': 'Baumfällung',
            'baumpflege': 'Baumpflege',
            'baumkontrolle': 'Baumkontrolle',
            'notfall': 'Notfall-Baumfällung'
        };
        return serviceNames[this.formData.service] || 'Unbekannt';
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    showError(message) {
        // Remove existing error
        const existingError = this.container.querySelector('.calculator-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'calculator-error';
        errorDiv.textContent = message;
        
        const content = this.container.querySelector('.calculator-content');
        content.insertBefore(errorDiv, content.firstChild);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    submitQuoteRequest(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Wird gesendet...';
        
        // Prepare data
        const requestData = {
            calculator_data: this.formData,
            price_estimate: this.calculatePrice(),
            contact_info: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                message: formData.get('message')
            },
            timestamp: new Date().toISOString()
        };
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            // Success
            submitButton.textContent = 'Angebot angefordert ✓';
            submitButton.classList.add('success');
            
            // Show success message
            window.BaumfaellerApp?.showNotification(
                'Vielen Dank! Wir haben Ihre Anfrage erhalten und senden Ihnen binnen 2 Stunden ein detailliertes Angebot.',
                'success'
            );
            
            // Track conversion
            window.BaumfaellerApp?.trackEvent('quote_requested', {
                service: this.formData.service,
                estimated_price: this.calculatePrice().min,
                calculator_completed: true
            });
            
            // Reset after delay
            setTimeout(() => {
                this.resetCalculator();
            }, 3000);
            
        }, 2000);
    }
    
    resetCalculator() {
        this.currentStep = 1;
        this.formData = {};
        this.render();
        this.bindEvents();
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const calculatorContainer = document.getElementById('price-calculator');
    if (calculatorContainer) {
        // Replace loading placeholder
        calculatorContainer.innerHTML = '';
        
        // Initialize calculator
        new PriceCalculator('price-calculator');
    }
});

// CSS for calculator (add to styles.css)
const calculatorStyles = `
.price-calculator-wrapper {
    max-width: 100%;
}

.calculator-header {
    margin-bottom: 2rem;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: #E5E7EB;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2D5A27, #4ADE80);
    transition: width 0.3s ease;
}

.step-indicator {
    text-align: center;
    font-weight: 500;
    color: #6B7280;
}

.calculator-content {
    margin-bottom: 2rem;
}

.step-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 2rem;
    text-align: center;
}

.service-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.service-option {
    background: #FFFFFF;
    border: 2px solid #E5E7EB;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.service-option:hover {
    border-color: #2D5A27;
    transform: translateY(-2px);
}

.service-option.selected {
    border-color: #2D5A27;
    background-color: #F0F9F0;
}

.service-option .service-icon {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #2D5A27, #4ADE80);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.service-option .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #FFFFFF;
}

.service-option h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.service-option p {
    color: #6B7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.price-hint {
    font-weight: 600;
    color: #2D5A27;
    font-size: 0.875rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
}

.form-select,
.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #E5E7EB;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-select:focus,
.form-input:focus {
    outline: none;
    border-color: #2D5A27;
}

.slider-container {
    position: relative;
}

.form-slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #E5E7EB;
    outline: none;
    appearance: none;
}

.form-slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2D5A27;
    cursor: pointer;
}

.slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #6B7280;
}

.slider-labels span:nth-child(2) {
    font-weight: 600;
    color: #2D5A27;
}

.radio-group,
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.radio-option,
.checkbox-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
}

.radio-option input,
.checkbox-option input {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #2D5A27;
}

.accessibility-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.accessibility-option {
    background: #FFFFFF;
    border: 2px solid #E5E7EB;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.accessibility-option:hover {
    border-color: #2D5A27;
}

.accessibility-option.selected {
    border-color: #2D5A27;
    background-color: #F0F9F0;
}

.accessibility-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.accessibility-option h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.accessibility-option p {
    color: #6B7280;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
}

.price-impact {
    font-weight: 600;
    color: #2D5A27;
    font-size: 0.875rem;
}

.calculator-navigation {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.calculator-error {
    background-color: #FEF2F2;
    border: 1px solid #FECACA;
    color: #DC2626;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.price-result {
    text-align: center;
}

.price-display {
    background: linear-gradient(135deg, #2D5A27, #4ADE80);
    color: #FFFFFF;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
}

.price-label {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
}

.price-amount {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.price-note {
    font-size: 0.875rem;
    opacity: 0.8;
}

.price-breakdown {
    background-color: #F9FAFB;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    text-align: left;
}

.price-breakdown h4 {
    margin-bottom: 1rem;
}

.breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #E5E7EB;
}

.breakdown-item:last-child {
    border-bottom: none;
}

.breakdown-item.emergency {
    color: #DC2626;
    font-weight: 600;
}

.price-guarantees {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.guarantee-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
}

.contact-form {
    background-color: #F9FAFB;
    padding: 2rem;
    border-radius: 1rem;
    text-align: left;
}

.contact-form h4 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

@media (max-width: 768px) {
    .service-options {
        grid-template-columns: 1fr;
    }
    
    .accessibility-options {
        grid-template-columns: 1fr;
    }
    
    .price-guarantees {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .calculator-navigation {
        flex-direction: column;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = calculatorStyles;
document.head.appendChild(styleSheet);
